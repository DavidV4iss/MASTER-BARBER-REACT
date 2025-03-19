import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Gestiondeinventario() {
    const [inventario, setInventario] = useState([]);

    useEffect(() => {
        const getInventario = async () => {
            try {
                const res = await axios.get("http://localhost:8081/GetInventario");
                setInventario(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        }
        getInventario();
    }, [])

    const [venta, setVenta] = useState([]);

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
                text: `Has superado la cantidad de productos del inventario, no hay mas ${producto.nombre} en stock `,
                confirmButtonColor: "#DC3545",
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },

            });
        }
    }


    const calcularTotal = () => {
        return venta.reduce((total, item) => total + (item.PrecioUnitario * item.cantidad), 0);
    }

    const handleSubmit = async () => {
        try {
            for (const producto of venta) {
                const res = await axios.put(`http://localhost:8081/RestarInventario/${producto.id_producto}`, {
                    cantidad: producto.cantidad,
                });
            }
            Swal.fire({
                icon: 'success',
                title: 'Venta Exitosa',
                html: `El Producto <span style="color: yellow">${venta[0].nombre}</span> Fue Restado Del Inventario Correctamente, Realizaste Una Venta Por Un Valor De: <span style="color: yellow">${calcularTotal()}</span>`,
                confirmButtonColor: "#DC3545",
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend",
                },
            }).then(() => {
                setVenta([]);
            });
        } catch (err) {
            console.log("Error al restar del inventario:", err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error Al Restar Del Inventario, No Se Selecciono Ningun Producto A Vender',
                confirmButtonColor: "#DC3545",
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
    }

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
                    <div class="col">
                        <table class="table-responsive table table-dark table-striped mt-5 mx-5">
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
                            <div className="col row">
                                <button onClick={handleSubmit} className="btn btn-warning bebas">
                                    Restar Del Inventario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}