import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function GestionarBarberos() {

  const [barberos, setBarberos] = useState([]);
  const [barbero, setBarbero] = useState({
    nombre: "",
    descripcion: "",
  });

  const [barberoEdit, setBarberoEdit] = useState({
    nombre: "",
    descripcion: "",
  });
  const navigate = useNavigate();

  //crear barberos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8081/CreateBarberos`, barbero);
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

  const handleSubmitEdit = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8081/UpdateBarberos/${id}`, barberoEdit);
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
    setBarberoEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //handle change para añadir
  const handleChange = (e) => {
    setBarbero(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const DeleteBarberos = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estas seguro de borrar este barbero?',
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
      const res = await axios.delete(`http://localhost:8081/DeleteBarberos/${id}`);
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
    const fetchBarberos = async () => {
      try {
        const res = await axios.get("http://localhost:8081/GetBarberos");
        setBarberos(res.data);
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    }
    fetchBarberos()
  }, [])

  const openEditModal = (barbero) => {
    setBarberoEdit(barbero);
  };

  return (
    <div>
      <NavbarAdmin />
      <SidebarAdmin />
      <div className='contenido2' id='GestionarBarberos'>
        <p className='text-center  mt-5 text-white display-6 bebas col-sm-12 col'>HOLA, <span className='text-danger'>ADMINISTRADOR</span> |AQUI PODRAS EDITAR, AÑADIR Y ELIMINAR BARBEROS</p>

        <div className="d-flex justify-content-end mt-3 p-5 mx-5">
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#AñadirModal" data-bs-whatever="@mdo" >Añadir</button>
        </div>

        <div className=' text-center row col col-sm-12 justify-content-end'>
          <div className="table-responsive">
            <table class="table table-dark table-hover mt-4 container p-5">
              <thead>
                <tr className='bg-white'>
                  <th scope="col" className='p-2 display-6 bebas'>Nombre</th>
                  <th scope="col" className='p-2 display-6 bebas w-50'>Descripcion</th>
                  {/* <th scope="col" className='p-2 display-6 bebas'>imagen Barbero</th> */}
                  <th scope="col" className='p-2 text-warning display-6 bebas'>Acciones</th>
                </tr>
              </thead>
              <tbody className='p-5'>
                {barberos.map((barbero) => (
                  <tr key={barbero.id_barbero}>
                    <td>{barbero.nombre}</td>
                    <td>{barbero.descripcion}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-warning me-3" onClick={() => openEditModal(barbero)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                          <i className='bi bi-pencil-fill text-white'></i>
                        </button>
                        <button className='btn btn-outline-danger' onClick={() => DeleteBarberos(barbero.id_barbero)}>
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

        {/* MODAL EDIT */}

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
                    <label aria-required for="recipient-name" class="col-form-label text-white">Nombre Barbero</label>
                    <input required type="text" class="form-control" id="recipient-name" value={barberoEdit.nombre} name='nombre' onChange={handleChangeEdit} placeholder='Escriba un nombre' />
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label text-white">Descripcion</label>
                    <input required type="text" class="form-control" id="recipient-name" value={barberoEdit.descripcion} name='descripcion' onChange={handleChangeEdit} placeholder='Escriba una Descripcion' />
                  </div>
                  {/* <div className="col-12 mb-3">
                    <label htmlFor="floatingInput" className='text-white'>Imagen</label>
                    <input className='form-control' type="file" accept='image/*' autoComplete='off' id='photo' name='photo' required />
                  </div> */}
                </form>
              </div>
              <div class="modal-footer">
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                  <button type="sumbit" class="btn btn-danger" onClick={() => handleSubmitEdit(barberoEdit.id_barbero)}>Editar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL AÑADIR */}

        <div class="modal fade" id="AñadirModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark">
              <div class="modal-header">
                <h1 class="modal-title fs-5 text-white text-white" id="exampleModalLabel">Añadir</h1>
                <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label text-white">Nombre Barbero</label>
                    <input required type="text" class="form-control" id="recipient-name" name='nombre' onChange={handleChange} placeholder='Escriba un Nombre' />
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label text-white">Descripcion</label>
                    <input required type="text" class="form-control" id="recipient-name" name='descripcion' onChange={handleChange} placeholder='Escriba una Descripcion' />
                  </div>
                  {/* <div className="col-12 mb-3">
                    <label htmlFor="floatingInput" className='text-white'>Imagen</label>
                    <input className='form-control' type="file" accept='image/*' autoComplete='off' id='photo' name='photo' required />
                  </div> */}
                </form>
              </div>
              <div class="modal-footer">
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
