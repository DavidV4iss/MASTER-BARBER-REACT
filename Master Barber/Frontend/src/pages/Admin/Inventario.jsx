import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Inventario() {

    const [inventario, setInventario] = useState([]);
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion_P: '',
        cantidad: '',
        id_categoria_producto: '',
        PrecioUnitario: ''
    });

        const [productoEditar, setProductoEditar] = useState({
            nombre: '',
            descripcion_P: '',
            cantidad: '',
            id_categoria_producto: '',
            PrecioUnitario: ''
        });

    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();

    // Crear los Productos

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8081/CreateInventario`, producto);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data,
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    }
                }).then(() => {
                    navigate(0);
                })
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data,
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
    };

    const handleSubmitEdit = async (id) => {
        try {
            const res = await axios.put(`http://localhost:8081/UpdateInventario/${id}`, productoEditar);
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
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data,
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
    };

    const handleChangeEdit = (e) => {
        setProductoEditar(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle change para añadir
    const handleChange = (e) => {
        setProducto(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const DeleteInventario = async (id) => {
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
            const res = await axios.delete(`http://localhost:8081/DeleteInventario/${id}`);
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
      const fetchData = async () => {
        try {
          const [inventarioRes, categoriasRes] = await Promise.all([
            axios.get(`http://localhost:8081/GetInventario`),
            axios.get(`http://localhost:8081/categorias`),
          ]);
          setInventario(inventarioRes.data);
          setCategorias(categoriasRes.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    const openEditModal = (item) => {
        setProductoEditar(item);
    };


    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='mt-5'>
                <div className='contenido ' id='Inventario'>
                    <p className='text-center text-white mt-5 display-6 bebas mx-3 '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| ESTE ES EL INVENTARIO DE PRODUCTOS QUE LLEGAN A LA BARBERIA</p>

                    <div className="d-flex justify-content-end mx-5 mt-5">
                        <button type="button" class="btn btn-danger .col-md-4" data-bs-toggle="modal" data-bs-target="#AñadirModal" data-bs-whatever="@mdo" >Añadir</button>
                    </div>
                    <div className='container text-center'>
                        <div className="table-responsive">
                            <table class="table table-dark mt-5">
                                <thead>
                                    <tr>
                                        <th >ID Producto</th>
                                        <th >Nombre</th>
                                        <th >Descripcion</th>
                                        <th >Cantidad</th>
                                        <th >Categoria producto</th>
                                        <th >Precio unitario</th>
                                        <th >Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='p-5'>
                                    {inventario.map((item) => (
                                        <tr key={item.id_producto}>
                                            <th>{item.id_producto}</th>
                                            <td>{item.nombre}</td>
                                            <td>{item.descripcion_P}</td>
                                            <td>{item.cantidad}</td>
                                            <td>{categorias.find(c => c.id_categoria_producto === item.id_categoria_producto).categoria}</td>
                                            <td>{item.PrecioUnitario}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <button type="button" className="btn btn-outline-warning me-3" onClick={() => openEditModal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                                        <i className='bi bi-pencil-fill text-white'></i>
                                                    </button>
                                                    <button className='btn btn-outline-danger' onClick={() => DeleteInventario(item.id_producto)}>
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

                    {/* MODAL EDITAR */}

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
                                            <label for="recipient-name" class="col-form-label text-white">Nombre:</label>
                                            <input type="text" value={productoEditar.nombre} class="form-control" id="recipient-name" name='nombre' onChange={handleChangeEdit} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Descripcion:</label>
                                            <input type="text" value={productoEditar.descripcion_P} class="form-control" id="recipient-name" name='descripcion_P' onChange={handleChangeEdit} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Cantidad:</label>
                                            <input type="text" value={productoEditar.cantidad} class="form-control" id="recipient-name" name='cantidad' onChange={handleChangeEdit} />
                                        </div >
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Categoria:</label>
                                            <select name="id_categoria_producto" value={productoEditar.id_categoria_producto} class="form-select" id="" onChange={handleChangeEdit}>
                                                <option selected disabled>Seleccione una categoria</option>
                                                {categorias.map((item) => (
                                                    <option key={item.id_categoria} value={item.id_categoria_producto}>{item.categoria}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Precio unitario:</label>
                                            <input value={productoEditar.PrecioUnitario} type="text" class="form-control" id="recipient-name" name='PrecioUnitario' onChange={handleChangeEdit} />
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

                    {/* MODAL DE AÑADIR */}

                    <div class="modal fade" id="AñadirModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content bg-dark">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 text-white text-white" id="exampleModalLabel" >AÑADIR</h1>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Nombre:</label>
                                            <input type="text" class="form-control" id="recipient-name" name='nombre' onChange={handleChange} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Descripcion:</label>
                                            <input type="text" class="form-control" id="recipient-name" name='descripcion_P' onChange={handleChange} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Cantidad:</label>
                                            <input type="text" class="form-control" id="recipient-name" name='cantidad' onChange={handleChange} />
                                        </div >
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Categoria:</label>
                                            <select name="id_categoria_producto" class="form-select" id="" onChange={handleChange}>
                                                <option selected disabled>Seleccione una categoria</option>
                                                {categorias.map((item) => (
                                                    <option key={item.id_categoria} value={item.id_categoria_producto}>{item.categoria}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white">Precio unitario:</label>
                                            <input type="text" class="form-control" id="recipient-name" name='PrecioUnitario' onChange={handleChange} />
                                        </div>

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-danger" onClick={handleSubmit}>Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
