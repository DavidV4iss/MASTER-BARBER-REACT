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
    const [ventasProcesadas, setVentasProcesadas] = useState([]);
    const [rango, setRango] = useState('Diario');

    useEffect(() => {
        const getInventario = async () => {
            try {
                const res = await axios.get("http://localhost:8080/GetInventario");
                setInventario(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        };
        getInventario();
    }, []);

    useEffect(() => {
        const getVentas = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/GetVentas?rango=${rango}`);
                setVentasProcesadas(res.data);
            } catch (err) {
                console.error('Error al obtener las ventas:', err);
            }
        };
        getVentas();
    }, [rango]);

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
                setVenta([...venta, { ...producto, cantidad: 1 }]);
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
                text: `No hay más ${producto.nombre} en stock`,
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
            const ventasConFecha = venta.map(producto => ({ ...producto, fecha: new Date().toISOString().slice(0, 19).replace('T', ' ') }));
            for (const producto of ventasConFecha) {
                await axios.put(`http://localhost:8080/RestarInventario/${producto.id_producto}`, {
                    cantidad: producto.cantidad,
                });
            }
            await axios.post('http://localhost:8080/GuardarVentas', ventasConFecha);
            const res = await axios.get(`http://localhost:8080/GetVentas?rango=${rango}`);
            setVentasProcesadas(res.data);

            Swal.fire({
                icon: 'success',
                title: 'Venta Exitosa',
                html: `Productos vendidos:<br>${ventasConFecha.map(p => `<span style="color: yellow">${p.nombre} (x${p.cantidad})</span>`).join('<br>')}<br><br>Total: <span style="color: yellow">$${calcularTotal()}</span>`,
                confirmButtonColor: '#DC3545',
                customClass: {
                    popup: 'dark-theme-popup bg-dark antonparabackend',
                },
            }).then(() => setVenta([]));
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

    const generarPDF = async () => {
        const doc = new jsPDF();
        const ventasAgrupadas = ventasProcesadas.reduce((acc, venta) => {
            const key = venta.id_producto;
            if (!acc[key]) acc[key] = { ...venta, cantidad: 0 };
            acc[key].cantidad += venta.cantidad;
            return acc;
        }, {});

        const ventasAgrupadasArray = Object.values(ventasAgrupadas);
        doc.setFontSize(18);
        doc.text('Reporte De Ventas', 10, 10);
        doc.setFontSize(12);
        doc.text(`Rango: ${rango}`, 10, 20);

        let y = 30;
        if (ventasAgrupadasArray.length === 0) {
            doc.text("No hay ventas en este rango.", 10, y);
        } else {
            ventasAgrupadasArray.forEach((venta, index) => {
                doc.text(`${index + 1}. Producto: ${venta.nombre}, Cantidad: ${venta.cantidad}, Total: $${(venta.PrecioUnitario * venta.cantidad).toFixed(2)}`, 10, y);
                y += 10;
            });
            const total = ventasAgrupadasArray.reduce((acc, item) => acc + item.PrecioUnitario * item.cantidad, 0);
            doc.text(`Total General: $${total.toFixed(2)}`, 10, y + 10);
        }

        doc.save(`Reporte_Ventas_${rango}.pdf`);
    };

    const ventasFiltradas = ventasProcesadas;

    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='container mt-5 mb-5 p-5'>
                <p className='text-center text-white display-6 bebas contenido'>Hola, <span className='text-danger'>Administrador</span> | Inventario de productos</p>
                <div className="d-flex justify-content-end my-3">
                    <select className="form-select bg-dark text-white w-auto" value={rango} onChange={(e) => setRango(e.target.value)}>
                        <option value="diario">Diario</option>
                        <option value="mensual">Mensual</option>
                        <option value="semanal">Semanal</option>
                        <option value="anual">Anual</option>
                    </select>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={generarPDF} className="btn btn-success bebas">Generar PDF</button>
                </div>

                <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
                    <div className="col">
                        <div className="row row-cols-1 row-cols-md-2 g-3">
                            {inventario.map(item => (
                                <Link key={item.id_producto} onClick={() => agregarProducto(item)} className="text-decoration-none col">
                                    <div className="card bg-dark shadow-lg rounded-4">
                                        <img src={`http://localhost:8080/ImagesInventario/${item.Foto}`} alt={item.nombre} className="card-img-top rounded-top-4 border border-light" />
                                        <div className="card-body text-center">
                                            <h5 className="text-warning bebas">{item.nombre}</h5>
                                            <p className="text-white">${item.PrecioUnitario}</p>
                                            <p className="text-success bebas">{item.cantidad} Unidades</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="col">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                    <th className='text-warning'>Cantidad</th>
                                    <th className='text-warning'>ID</th>
                                    <th className='text-warning'>Nombre Producto</th>
                                    <th className='text-warning'>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venta.length > 0 ? venta.map(item => (
                                    <tr key={item.id_producto}>
                                        <td>{item.cantidad}</td>
                                        <td>{item.id_producto}</td>
                                        <td>{item.nombre}</td>
                                        <td>${item.PrecioUnitario}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4">No hay productos</td></tr>
                                )}
                            </tbody>
                        </table>

                        <div className="d-flex gap-2 justify-content-between">
                            <button className="btn btn-warning bebas">Total: ${calcularTotal().toFixed(2)}</button>
                            <button onClick={handleSubmit} className="btn btn-warning bebas">Restar Del Inventario</button>
                            <button onClick={() => setVenta([])} className="btn btn-danger bebas">Limpiar Productos</button>
                        </div>
                    </div>
                </div>

                <div className="mt-5 row justify-content-center">
                    <div className="col-12 col-md-10">
                        <GraficaVenta ventas={ventasFiltradas} />
                    </div>
                </div>
            </div>
        </div>
    );
}