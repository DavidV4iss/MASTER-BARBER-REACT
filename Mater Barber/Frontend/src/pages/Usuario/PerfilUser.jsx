import React , { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function PerfilUser() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/traerUsuario/${email}`);
        setUser(res.data[0]);
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    };
    fetchUser();
  }, [email]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      await axios.put(`http://localhost:8081/actualizarUsuario/${email}`, formData);
      navigate('/iniciousuario');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Perfil Actualizado",
        showConfirmButton: false,
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Ocurrio un error al actualizar tu perfil. Por favor, intenta de nuevo.",
        icon: "error",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="min-vh-100 align-content-center mx-5 justify-content-end">
        <div className="container p-sm-5  border border-2 shadow border-white rounded-4 ">
          <a href="/iniciousuario">
            <i className="bi bi-arrow-left-circle-fill text-white fs-2"></i>
          </a>
          <div className="row justify-content-center align-items-center">
            <div className="col col-lg-6 bi-text-lg-center ">
              <i className="bi bi-person-circle icono mt-5"></i>
            </div>
            <div className="col-12 col-lg-6 container">
              <h1 className="text-warning text-center anton mb-4">¡Perfil!</h1>

              <form onSubmit={handleClick} id="form" className="row g-1 mb-5">
                <div className="mb-1 row">
                  <label
                    for="staticNombre"
                    className="col-sm-2 col-form-label text-white antonparabackend"
                  >
                    Nombre:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      onChange={handleChange}
                      readonly
                      className="form-control-plaintext text-white antonparabackend "
                      id="staticEmail"
                      value={user.nombre_usuario}
                    />
                  </div>
                </div>
                <div className="form-floating mb-3 mx-2">
                  <input
                    type="text"
                    className="form-control bg-dark text-white mt-2"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    name='nombre'
                  />
                  <label for="floatingInput" className="text-dark">
                    Nombre
                  </label>
                </div>
                <div className=" container row mt-3">
                  <p className="text-white antonparabackend">
                    Actualizar Foto De Perfil
                  </p>
                  <div className="input-group">
                    <input
                      name="file"
                      accept="image/*"
                      type="file"
                      className="form-control bg-dark text-white"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                    />
                    <button
                      type="submit"
                      className="btn btn-outline-danger mx-1"
                      id="inputGroupFileAddon04"
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
