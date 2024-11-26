import React , { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function NavbarBarber() {

   const navigate = useNavigate();

   const [barber, setBarber] = useState({});

   const token = localStorage.getItem("token");
 
   const usuario = JSON.parse(atob(token.split(".")[1]));
   const email = usuario.email;
 
   useEffect(() => {
     const fetchBarber = async () => {
       try {
         const res = await axios.get(`http://localhost:8081/traerUsuario/${email}`);
         setBarber(res.data[0]);
       } catch (err) {
         console.log("Error al obtener los datos:", err);
       }
     };
     fetchBarber();
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
    <div className="navbar border-bottom bg-dark shadow">
      <div class="container-fluid">
        <a class="navbar-brand text-danger zoomhover2 anton fs-2 mx-4">
          Master Barber
        </a>
        <div class="d-flex ">
          <div class="dropdown position-absolute top-0 end-0 pe-4 me-4">
            <button
              class="btn dropdown-toggle text-white d-none d-sm-block"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className='d-none d-sm-block text-white fw-bold '>{barber.nombre_usuario}</div>

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