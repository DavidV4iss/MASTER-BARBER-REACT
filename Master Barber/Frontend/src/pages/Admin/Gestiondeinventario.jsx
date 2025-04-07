import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../Components/NavbarAdmin';
import SidebarAdmin from '../../Components/SidebarAdmin';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

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

            // Actualizar el estado de las ventas procesadas
            setVentasProcesadas((prevVentas) => [...prevVentas, ...ventasConFecha]);

            Swal.fire({
                icon: 'success',
                title: 'Venta Exitosa',
                html: `El Producto <span style="color: yellow">${ventasConFecha[0].nombre}</span> Fue Restado Del Inventario Correctamente, Realizaste Una Venta Por Un Valor De: <span style="color: yellow">${calcularTotal()}</span>`,
                confirmButtonColor: "#DC3545",
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend",
                },
            }).then(() => {
                setVenta([]); // Limpiar las ventas después de procesarlas
            });
        } catch (err) {
            console.log("Error al restar del inventario:", err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error Al Restar Del Inventario, No Se Seleccionó Ningún Producto A Vender',
                confirmButtonColor: "#DC3545",
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend",
                },
            });
        }
    };

    const filtrarVentasPorRango = () => {
        const ahora = new Date();
        console.log("Ventas procesadas:", ventasProcesadas); // Depuración: Verifica las ventas procesadas
        return ventasProcesadas.filter((item) => {
            const fechaVenta = new Date(item.fecha); // Asegúrate de que sea un objeto Date
            console.log("Fecha de la venta:", fechaVenta); // Depuración: Verifica la fecha de cada venta
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

    const generarPDF = () => {
        const doc = new jsPDF();
        const ventasFiltradas = filtrarVentasPorRango();
        console.log("Ventas filtradas para el PDF:", ventasFiltradas); // Depuración: Verifica las ventas filtradas

        doc.setFontSize(18);
        doc.text('Reporte de Ventas', 10, 10);
        doc.setFontSize(12);
        doc.text(`Rango: ${rango.charAt(0).toUpperCase() + rango.slice(1)}`, 10, 20);

        let y = 30;
        if (ventasFiltradas.length === 0) {
            doc.text("No hay ventas en este rango.", 10, y);
        } else {
            ventasFiltradas.forEach((venta, index) => {
                doc.text(`${index + 1}. Producto: ${venta.nombre}, Cantidad: ${venta.cantidad}, Total: $${(venta.PrecioUnitario * venta.cantidad).toFixed(2)}`, 10, y);
                y += 10;
            });

            doc.text(`Total General: $${ventasFiltradas.reduce((total, item) => total + (item.PrecioUnitario * item.cantidad), 0).toFixed(2)}`, 10, y + 10);
        }

        doc.save(`Reporte_Ventas_${rango}.pdf`);
    };

    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='mt-5 container mb-5'>
                <p className='text-center text-white mt-5 display-6 bebas contenido '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| ESTE ES EL INVENTARIO DE LOS PRODUCTOS QUE SALEN DE LA BARBERIA</p>

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
                                <select
                                    className="form-select"
                                    value={rango}
                                    onChange={(e) => setRango(e.target.value)}
                                >
                                    <option value="diario">Diario</option>
                                    <option value="mensual">Mensual</option>
                                    <option value="semanal">Semanal</option>
                                    <option value="anual">Anual</option>
                                </select>
                            </div>
                            <div className="col">
                                <button onClick={generarPDF} className="btn btn-success bebas">
                                    Generar PDF
                                </button>
                            </div>
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
            </div>
        </div>
    );
}