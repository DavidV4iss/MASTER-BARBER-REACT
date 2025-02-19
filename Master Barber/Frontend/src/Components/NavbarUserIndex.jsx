import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavbarUserIndex() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const token = localStorage.getItem("token");

  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/traerUsuario/${email}`);
        setUser(res.data[0]);
        if (res.data[0].Foto) {
          setImagePreview(`/images/perfil/${res.data[0].Foto}`);
        }
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    };
    fetchUser();
  }, [email]);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estas seguro que deseas cerrar sesion?",
      text: "Tu sesión será cerrada.",
      imageUrl: "/LOGO.png",
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: "#DC3545",
      cancelButtonColor: "",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "dark-theme-popup bg-dark antonparabackend ",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");

        Swal.fire({
          title: "Sesión Cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          iconColor: "#1bf30b",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        });
      }
    });
  };

  const handleNotification = () => {
    Swal.fire({
      position: "top-end",
      title: "NOTIFICACIONES",
      confirmButtonColor: "#DC3545",
      customClass: {
        popup: "dark-theme-popup bg-dark antonparabackend ",
      },
    });
  };


  return (
    <div className="navbar navbar-expand-md shadow-lg">
      <div class="container-fluid justify-content-end">
        <button
          class="navbar-toggler bg-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <p className='position-absolute top-0 start-50 translate-middle-x  fw-bold mt-4 anton fs-5 text-uppercase text-danger'>¡Bienvenido!</p>
        <div className="collapse navbar-collapse" id="menu">
       
          <button className='btn btn-dark mt-3 position-fixed top-0 end-0 translate-middle-x' onClick={handleNotification}>
            <i class="bi bi-alarm-fill"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
              {/* <span class="visually-hidde"></span> */}
            </span>
          </button>

          <div class="dropdown me-2 pe-5">
            <button
              class=" btn dropdown-toggle text-white mx-2 "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <div className="d-none d-sm-block text-white fw-bold small ">
                {user.nombre_usuario}
              </div> */}
              <img
                src={imagePreview || "default-avatar.png"}
                alt="Imagen de perfil"
                className="img-fluid rounded-circle contenido3 "
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            </button>
            <ul class="dropdown-menu dropdown-menu-start bg-dark">
              <li>
                <a
                  class="dropdown-item bebas text-warning "
                  href="/PerfilUser"
                >
                  Perfil
                </a>
              </li>
              <li>
                <a class="dropdown-item bebas text-warning" href="#">
                  Configuración
                </a>
              </li>
              <li onClick={handleLogout}>
                <div class="box-2">
                  <div class="btn btn-two text-white">
                    <i><i class="bi bi-box-arrow-right mx-1">
                    </i> Cerrar sesión</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}