import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../Components/NavbarAdmin';
import SidebarAdmin from '../../Components/SidebarAdmin';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import GraficaVenta from '../../Components/GraficaVenta';

export default function Gestiondeinventario() {
    const [inventario, setInventario] = useState([]);
    const [venta, setVenta] = useState([]);
    const [ventasProcesadas, setVentasProcesadas] = useState([]); // Estado para almacenar todas las ventas procesadas
    const [rango, setRango] = useState('mensual'); // Estado para el rango de tiempo

    useEffect(() => {
        const getInventario = async () => {
            try {
                const res = await axios.get("http://localhost:8081/GetInventario");
                setInventario(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        };
        getInventario();
    }, []);

    function agregarProducto(producto) {
        const productoExistente = venta.find(item => item.id_producto === producto.id_producto);
        const productoInventario = inventario.find(item => item.id_producto === producto.id_producto);

        if (productoInventario && productoInventario.cantidad > 0) {
            if (productoExistente) {
                setVenta(venta.map(item =>
                    item.id_producto === producto.id_producto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                ));
            } else {
                setVenta([...venta, { ...producto, cantidad: 1 }]); // No asignamos fecha aquí
            }

            setInventario(inventario.map(item =>
                item.id_producto === producto.id_producto
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            ));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Has superado la cantidad de productos del inventario, no hay más ${producto.nombre} en stock`,
                confirmButtonColor: "#DC3545",
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend",
                },
            });
        }
    }

    const calcularTotal = () => {
        return venta.reduce((total, item) => total + (item.PrecioUnitario * item.cantidad), 0);
    };


    const handleSubmit = async () => {
        try {
            // Agregar la fecha actual a cada venta
            const ventasConFecha = venta.map((producto) => ({
                ...producto,
                fecha: new Date(), // Asignar la fecha actual
            }));

            // Actualizar el inventario en el backend
            for (const producto of ventasConFecha) {
                await axios.put(`http://localhost:8081/RestarInventario/${producto.id_producto}`, {
                    cantidad: producto.cantidad,
                });
            }

            // Guardar las ventas en el backend
            await axios.post('http://localhost:8081/GuardarVentas', ventasConFecha);

            // Recuperar las ventas actualizadas desde el backend
            const res = await axios.get(`http://localhost:8081/GetVentas?rango=${rango}`);
            setVentasProcesadas(res.data);

            Swal.fire({
                icon: 'success',
                title: 'Venta Exitosa',
                html: `El Producto <span style="color: yellow">${ventasConFecha[0].nombre}</span> Fue Restado Del Inventario Correctamente, Realizaste Una Venta Por Un Valor De: <span style="color: yellow">${calcularTotal()}</span>`,
                confirmButtonColor: '#DC3545',
                customClass: {
                    popup: 'dark-theme-popup bg-dark antonparabackend',
                },
            }).then(() => {
                setVenta([]); // Limpiar las ventas después de procesarlas
            });
        } catch (err) {
            console.error('Error al procesar la venta:', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al procesar la venta',
                confirmButtonColor: '#DC3545',
                customClass: {
                    popup: 'dark-theme-popup bg-dark antonparabackend',
                },
            });
        }
    };

    useEffect(() => {
        const getVentas = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/GetVentas?rango=${rango}`);
                setVentasProcesadas(res.data);
            } catch (err) {
                console.error('Error al obtener las ventas:', err);
            }
        };
        getVentas();
    }, [rango]); // Recuperar las ventas cada vez que cambie el rango


    const filtrarVentasPorRango = () => {
        const ahora = new Date();
        return ventasProcesadas.filter((item) => {
            const fechaVenta = new Date(item.fecha); // Asegúrate de que sea un objeto Date
            if (rango === 'diario') {
                return (
                    fechaVenta.getDate() === ahora.getDate() &&
                    fechaVenta.getMonth() === ahora.getMonth() &&
                    fechaVenta.getFullYear() === ahora.getFullYear()
                );
            } else if (rango === 'mensual') {
                return (
                    fechaVenta.getMonth() === ahora.getMonth() &&
                    fechaVenta.getFullYear() === ahora.getFullYear()
                );
            } else if (rango === 'semanal') {
                const inicioSemana = new Date(ahora.setDate(ahora.getDate() - ahora.getDay()));
                const finSemana = new Date(inicioSemana);
                finSemana.setDate(finSemana.getDate() + 6);
                return fechaVenta >= inicioSemana && fechaVenta <= finSemana;
            } else if (rango === 'anual') {
                return fechaVenta.getFullYear() === ahora.getFullYear();
            }
            return false;
        });
    };

    const ventasFiltradas = filtrarVentasPorRango(); // Ventas filtradas según el rango seleccionado


    const generarPDF = () => {
        const doc = new jsPDF();

        // Agrupar las ventas por producto
        const ventasAgrupadas = ventasFiltradas.reduce((acc, venta) => {
            const key = venta.id_producto; // Agrupar por id_producto
            if (!acc[key]) {
                acc[key] = { ...venta, cantidad: 0 }; // Inicializar el producto en el acumulador
            }
            acc[key].cantidad += venta.cantidad; // Sumar la cantidad vendida
            return acc;
        }, {});

        const ventasAgrupadasArray = Object.values(ventasAgrupadas); // Convertir el objeto en un array

        // Configuración del PDF
        doc.setFontSize(18);
        doc.text('Reporte De Ventas' , 10, 10 );
        doc.setFontSize(12);
        doc.text(`Rango: ${rango.charAt(0).toUpperCase() + rango.slice(1)}`, 10, 20);

        let y = 30;
        if (ventasAgrupadasArray.length === 0) {
            doc.text("No hay ventas en este rango.", 10, y);
        } else {
            ventasAgrupadasArray.forEach((venta, index) => {
                doc.text(
                    `${index + 1}. Producto: ${venta.nombre}, Cantidad: ${venta.cantidad}, Total: $${(venta.PrecioUnitario * venta.cantidad).toFixed(2)}`,
                    10,
                    y
                );
                y += 10;
            });

            const totalGeneral = ventasAgrupadasArray.reduce(
                (total, item) => total + item.PrecioUnitario * item.cantidad,
                0
            );
            doc.text(`Total General: $${totalGeneral.toFixed(2)}`, 10, y + 10);
        }

        doc.save(`Reporte_Ventas_${rango}.pdf`);
    };




    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='mt-5 container mb-5'>
                <p className='text-center text-white mt-5 display-6 bebas contenido '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| ESTE ES EL INVENTARIO DE LOS PRODUCTOS QUE SALEN DE LA BARBERIA</p>
                <div className="col container d-flex justify-content-end mx-5 mt-5 pt-5">    
                    <select
                        className="form-select bg-dark text-white mx-5"
                        value={rango}
                        onChange={(e) => setRango(e.target.value)}
                    >
                        <option value="diario">Diario</option>
                        <option value="mensual">Mensual</option>
                        <option value="semanal">Semanal</option>
                        <option value="anual">Anual</option>
                    </select>
                </div>
                <div className="container d-flex justify-content-end mx-1 mt-2">
                    
                    <button onClick={generarPDF} className="btn btn-success bebas mt-3">
                        Generar PDF
                    </button>
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-4 mt-5 contenido">
                    <div className="col row row-cols-1 row-cols-md-2 g-3">
                        {inventario.map((item) => (
                            <Link onClick={() => agregarProducto(item)} className="col text-decoration-none" key={item.id_producto}>
                                <div className="col ">
                                    <div className="card bg-dark">
                                        <img src={`/images/imagesInventario/${item.Foto}`} alt="..." className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title text-danger bebas text-center">{item.nombre}</h5>
                                            <p className="card-text text-white text-center">{item.PrecioUnitario}</p>
                                            <p className="card-text text-warning bebas text-center">{item.cantidad} Unidades</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="col">
                        <table className="table-responsive table table-dark table-striped mt-5 mx-5">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center text-warning'>Cantidad</th>
                                    <th scope="col" className='text-center text-warning'>ID</th>
                                    <th scope="col" className='text-center text-warning'>Nombre Producto</th>
                                    <th scope="col" className='text-center text-warning'>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    venta.length > 0 ?
                                        venta.map((item) => (
                                            <tr key={item.id_producto}>
                                                <th scope="row" className='text-center'>{item.cantidad}</th>
                                                <td className='text-center'>{item.id_producto}</td>
                                                <td className='text-center'>{item.nombre}</td>
                                                <td className='text-center'>{item.PrecioUnitario}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr className="text-center ">
                                            <td colSpan="4" >No hay productos</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        
                        <div className="container row mx-5 mt-4">
                          
                            <div className="col">
                                <button className="btn btn-warning bebas">
                                    Total: ${calcularTotal().toFixed(2)}
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={handleSubmit} className="btn btn-warning bebas">
                                    Restar Del Inventario
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="mt-5 pt-5 row container mx-5 justify-content-center mx-5">
                    <div className="col col-10 col-sm-10 col-md-10 mx-5">
                        <GraficaVenta ventas={ventasFiltradas} />

                    </div>
                </div>
            </div>
        </div>
    );
}