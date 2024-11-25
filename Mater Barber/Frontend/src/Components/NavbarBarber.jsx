import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function NavbarBarber() {
   const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "¿Estas Seguro Que Deseas Cerrar Sesion?",
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
          text: "Has cerrado sesión exitosamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <div className="navbar border-bottom bg-dark shadow">
      <div class="container-fluid">
        <a class="navbar-brand text-danger zoomhover2 anton fs-2 mx-4">
          Master Barber
        </a>
        <div class="d-flex ">
          <div class="dropdown position-absolute top-0 end-0 pe-2 me-4">
            <button
              class="btn dropdown text-white d-none d-sm-block"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <small className="d-none d-sm-block mt-1 mx-3 fw-bold text-white sm zoomhover2">
                HOME BARBER
              </small>
              <i class="bi bi-person-circle fs-3"></i>
            </button>
            <ul class="dropdown-menu bg-dark">
              <li>
                <a class="dropdown-item bebas text-danger" href="/PerfilBarber">
                  Perfil
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item bebas text-danger"
                  href="/ConfiguracionBarber"
                >
                  Configuración
                </a>
              </li>
              <li onClick={handleLogout}>
                <a class="dropdown-item text-warning bebas" href="#">
                  <i class="bi bi-box-arrow-right mx-1"></i> Cerrar sesión
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}