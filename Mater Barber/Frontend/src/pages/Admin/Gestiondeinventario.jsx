import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'
import { useNavigate } from 'react-router-dom'



export default function Gestiondeinventario() {
    const [inventarioVendido, setInventarioVendido] = useState([]);
    const [productoVendido, setProductoVendido] = useState({
        id_producto: "",
        id_categoria_producto: "",
        proveedor: "",
        cantidad: "",
        fecha_venta: "",
        total_venta: "",

    });

    const [productoVendidoEditar, setProductoVendidoEditar] = useState({
      id_producto: "",
      id_categoria_producto: "",
      proveedor: "",
      cantidad: "",
      fecha_venta: "",
      total_venta: "",
    });

    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `http://localhost:8081/CreateInventarioVendido`,
          productoVendido
        );
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: res.data,
            customClass: {
              popup: "dark-theme-popup bg-dark antonparabackend ",
            },
          }).then(() => {
            navigate(0);
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data,
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        });
      }
    };

    const handleSubmitEdit = async (id) => {
      try {
        const res = await axios.put(
          `http://localhost:8081/UpdateInventarioVendido/${id}`,productoVendidoEditar);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: res.data,
            customClass: {
              popup: "dark-theme-popup bg-dark antonparabackend ",
            },
          }).then(() => {
            navigate(0);
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data,
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        });
      }
    };

    const handleChangeEdit = (e) => {
      setProductoVendidoEditar(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChange = (e) => {
      setProductoVendido(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const DeleteInventarioVendido = async (id) => {
      try {
            const confirm = await Swal.fire({
                title: '¿Estas seguro de borrar este producto?',
                text: "No podrás revertir esta acción",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
            if (!confirm.isConfirmed) {
                return;
            }
            const res = await axios.delete(`http://localhost:8081/DeleteInventarioVendido/${id}`);
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data,
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                }).then(() => {
                    navigate(0);
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al borrar',
                text: error.response.data,
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
    };

    useEffect(() => {
        const fetchInventarioVendido = async () => {
            try {
                const res = await axios.get("http://localhost:8081/GetInventarioVendido");
                setInventarioVendido(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchInventarioVendido();
    }, []);

    const openEditModal = (item2) => {
        setProductoVendidoEditar(item2);
    }

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await axios.get("http://localhost:8081/GetCategorias");
                setCategorias(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategorias();
    }, []);



    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='contenido' id='Gestiondeventas'>
                <p className='text-center text-white mt-5 display-6 bebas mx-3 '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| ESTE ES EL INVENTARIO DE PRODUCTOS QUE SE VENDEN EN LA BARBERIA</p>
            </div>

            <div className="d-flex justify-content-end mx-5 mt-5">
                        <button type="button" class="btn btn-danger .col-md-4" data-bs-toggle="modal" data-bs-target="#AñadirModal" data-bs-whatever="@mdo" >Añadir</button>
                    </div>
                    <div className='container text-center'>
                        <div className="table-responsive">
                            <table class="table table-dark mt-5">
                                <thead>
                                    <tr>
                                        <th >ID Venta</th>
                                        <th >ID producto</th>
                                        <th >ID categoria producto</th>
                                        <th >Proveedor</th>
                                        <th >Cantidad</th>
                                        <th >Fecha de venta</th>
                                        <th >Total de la venta</th>
                                    </tr>
                                </thead>
                                <tbody className='p-5'>
                                    {inventarioVendido.map((item2) => (
                                        <tr key={item2.id_venta}>
                                            <th>{item2.id_venta}</th>
                                            <td>{item2.id_producto}</td>
                                            <td>{categorias.find(c => c.id_categoria_producto === item2.id_categoria_producto).categoria}</td>
                                            <td>{item2.Proveedor}</td>
                                            <td>{item2.cantidad}</td>
                                            <td>{item2.fecha_venta}</td>
                                            <td>{item2.total_venta}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <button type="button" className="btn btn-outline-warning me-3" onClick={() => openEditModal(item2)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                                        <i className='bi bi-pencil-fill text-white'></i>
                                                    </button>
                                                    <button className='btn btn-outline-danger' onClick={() => DeleteInventarioVendido(item2.id_producto)}>
                                                        <i className="bi bi-trash-fill"  ></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content bg-dark">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 text-white text-white" id="exampleModalLabel">EDITAR</h1>
                                    <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">ID Producto:</label>
                                            <select name="id_producto" value={productoVendidoEditar.id_producto} class="form-select" id="" onChange={handleChangeEdit} ></select>
                                            <option selected disabled>Producto</option>
                                            {}
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Categoria:</label>
                                            <select name="id_categoria_producto" value={productoVendidoEditar.id_categoria_producto} class="form-select" id="" onChange={handleChangeEdit}>
                                                <option selected disabled>Categoria</option>
                                                {categorias.map((item2) => (
                                                    <option key={item2.id_categoria} value={item2.id_categoria_producto}>{item2.categoria}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Proveedor:</label>
                                            <input type="text" value={productoVendidoEditar.proveedor} class="form-control" id="recipient-name" name='proveedor' onChange={handleChangeEdit} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Cantidad:</label>
                                            <input type="text" value={productoVendidoEditar.cantidad} class="form-control" id="recipient-name" name='cantidad' onChange={handleChangeEdit} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Fecha de venta:</label>
                                            <input type="text" value={productoVendidoEditar.fecha_venta} class="form-control" id="recipient-name" name='fecha_venta' onChange={handleChangeEdit} />
                                        </div >
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Total Venta:</label>
                                            <input value={productoVendidoEditar.total_venta} type="text" class="form-control" id="recipient-name" name='total_venta' onChange={handleChangeEdit} />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
                                    <button type="sumbit" class="btn btn-danger" onClick={() => handleSubmitEdit(productoEditar.id_producto)}>Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
    )
}
