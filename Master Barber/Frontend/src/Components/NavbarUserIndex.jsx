import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavbarUserIndex() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [notificaciones, setNotificaciones] = useState([]);

  const fetchNotificaciones = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/GetNotificaciones/${user.id_usuario}`);
      setNotificaciones(res.data);
    } catch (err) {
      console.error("Error al obtener las notificaciones:", err);
    }
  };

  useEffect(() => {
    if (user.id_usuario) {
      fetchNotificaciones();
    }
  }, [user.id_usuario]);

  const token = localStorage.getItem("token");

  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/traerUsuario/${email}`);
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
    if (notificaciones.length === 0) {
      Swal.fire({
        position: "top-end",
        title: "TUS NOTIFICACIONES",
        text: "No tienes notificaciones nuevas.",
        confirmButtonColor: "#DC3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    } else {
      Swal.fire({
        position: "top-end",
        title: "TUS NOTIFICACIONES",
        html: `<ul id="notification-list" style="text-align-center; padding-left: 20px;"></ul>`,
        confirmButtonColor: "#DC3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
        didOpen: () => {
          const notificationList = document.getElementById("notification-list");
          notificaciones.forEach((notificacion) => {
            const li = document.createElement("li");
            li.style.marginBottom = "10px";
            li.style.marginTop = "10px";
            li.innerHTML = `
            ${notificacion.mensaje} 
            <i 
              class="bi bi-trash3-fill" 
              style="margin-left: 10px; color: red; cursor: pointer; border: none; background: none;"
              data-id="${notificacion.id_notificacion}">
              Eliminar
            </i>
          `;
            li.querySelector("i").addEventListener("click", () => {
              deleteNotification(notificacion.id_notificacion);
            });
            notificationList.appendChild(li);
          });
        },
      });
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/DeleteNotificacion/${id}`);
      Swal.fire({
        title: "Notificación eliminada",
        text: "La notificación ha sido eliminada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
      fetchNotificaciones();
    } catch (err) {
      console.error("Error al eliminar la notificación:", err);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la notificación.",
        icon: "error",
        confirmButtonColor: "#DC3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    }
  };





  return (
    <div className="navbar navbar-expand-md shadow border-bottom border-1">
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

          <button
            className="btn btn-dark mt-3 position-fixed top-0 end-0 translate-middle-x"
            onClick={handleNotification}
          >
            <i className="bi bi-alarm-fill"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
              {notificaciones.length > 0 ? notificaciones.length : ""}
            </span>

          </button>

          <div class="dropdown me-2 pe-5">
            <button
              class=" btn dropdown-toggle text-white mx-2 "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >

              <img
                src={imagePreview || "default-avatar.png"}
                alt="Imagen de perfil"
                className="img-fluid rounded-circle contenido3 "
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
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