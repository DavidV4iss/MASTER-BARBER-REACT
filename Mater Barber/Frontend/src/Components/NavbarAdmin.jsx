import React from 'react'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function NavbarAdmin() {
    const navigate = useNavigate();

    const handleLogout = () => {


        Swal.fire({
            title: "¿Estas Seguro Que Deseas Cerrar Sesion?",
            text: "Tu sesión será cerrada.",
            imageUrl: "/LOGO.png", 
            imageWidth: 200, 
            imageHeight: 200, 
            showCancelButton: true,
            confirmButtonColor: "",
            cancelButtonColor: "",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: 'dark-theme-popup bg-dark antonparabackend ', 
            },


      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          navigate("/login");


          Swal.fire({
            title: "Sesión Cerrada",
            text: "Has cerrado sesión exitosamente.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    };
    return (
        <div className='navbar border-bottom bg-dark shadow'>
            <div class="container-fluid">
                <a class="navbar-brand text-warning anton fs-2 "><img src="LOGO.png" alt="" width="40" height="40" class="d-inline-block align-text-top mx-4 mt-1" />
                    Master Barber</a>
                <div class="d-flex ">
                    <div class="dropdown position-absolute top-0 end-0 pe-2 me-2 " >
                        <button class="btn dropdown text-white d-none d-sm-block" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <small className='d-none d-sm-block mt-1 mx-3 fw-bold text-white sm zoomhover2'>BIENVENIDO ADMINISTRADOR </small>
                            <i class="bi bi-person-circle fs-3"></i>
                        </button>
                        <ul class="dropdown-menu bg-dark">
                            <li>
                                <a class="dropdown-item bebas text-danger" href="/PerfilAdmin">Perfil</a>
                            </li>
                            <li>
                                <a class="dropdown-item bebas text-danger" href="/ConfiguracionAdmin">Configuración</a>
                            </li>
                            <li onClick={handleLogout}>
                                <button class="dropdown-item text-warning bebas">
                                    <i class="bi bi-box-arrow-right mx-1">
                                    </i> Cerrar sesión</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
