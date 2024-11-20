import React from "react";

export default function NavbarBarber() {
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    // Redirige a la página de inicio de sesión
    window.location.href = "/";
  }; 
  return (
    <div className="navbar border-bottom bg-dark shadow">
      <div class="container-fluid">
        <a class="navbar-brand text-danger zoomhover2 anton fs-2 mx-4">
          Master Barber
        </a>
        <div class="d-flex ">
          <div class="dropdown position-absolute top-0 end-0 pe-2 me-2">
            <button
              class="btn dropdown text-white d-none d-sm-block"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <small className="d-none d-sm-block mt-1 mx-3 fw-bold text-white sm">
                BARBER HOMECENTER
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
              <li onClick={cerrarSesion}>
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