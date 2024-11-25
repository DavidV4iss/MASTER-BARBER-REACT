import React from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function NavbarUserIndex() {
    const navigate = useNavigate();
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
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: "dark-theme-popup bg-dark antonparabackend ",
            },
          });
        }
      });
    };

    return (
        <div className='navbar navbar-expand-md'>
            <div class="container-fluid justify-content-end">
                <button class="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="menu">
                    <ul class="navbar-nav nav-underline me-auto position-fixed mx-4 mt-3 position-absolute top-0 start-50 translate-middle-x ">
                        <li class="nav-item">
                            <a class="nav-link mx-5 text-primary " href="#homeuser">Inicio</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link  mx-5 text-primary" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mx-5 text-primary" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mx-5 text-primary" href="#">Link</a>
                        </li>

                    </ul>
                    <button type="button" class="btn btn-dark border-light  mt-3 position-fixed top-0 end-0 translate-middle-x" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                        <i class="bi bi-alarm-fill"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span class="visually-hidden">unread messages</span></span>
                    </button>

                    <div class="dropdown pe-4 me-4" >
                        <button class=" btn dropdown text-white mx-2 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle fs-2"></i>
                        </button>
                        <ul class="dropdown-menu bg-dark">
                            <li>
                                <a class="dropdown-item bebas text-warning " href="/PerfilUser">Perfil</a>
                            </li>
                            <li>
                                <a class="dropdown-item bebas text-warning" href="#">Configuración</a>
                            </li>
                            <li onClick={handleLogout}>
                                <a class="dropdown-item text-danger bebas" href="#">
                                    <i class="bi bi-box-arrow-right mx-1">
                                    </i> Cerrar sesión</a>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>

        </div>


    )
}