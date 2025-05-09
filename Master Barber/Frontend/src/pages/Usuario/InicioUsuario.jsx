import React, { useState, useEffect } from 'react';
import NavbarUserIndex from '../../Components/NavbarUserIndex';
import axios from 'axios';
import Swal from 'sweetalert2';
import Rating from 'react-rating-stars-component';
import ReservaCliente from './ReservaCliente';
import CalificacionesUserD from '../../Components/CalificacionUserD';


export default function InicioUsuario() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;
  const id = usuario.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/traerUsuario/${email}`);
        setUser(res.data[0]);
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    };
    fetchUser();
  }, [email]);

  const [nuevaCalificacion, setNuevaCalificacion] = useState({
    id: id,
    puntuacion: 0,
    comentario: ""
  });

  const handleChange = (e) => {
    setNuevaCalificacion(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleRatingChange = (newRating) => {
    setNuevaCalificacion(prev => ({ ...prev, puntuacion: newRating }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/Createcalificaciones", nuevaCalificacion);
      if (res.status === 200) {
        Swal.fire({
          title: "Calificación enviada",
          text: "GRACIAS POR TU CALIFICACIÓN",
          icon: "success",
          iconColor: "#1bf30b",
          confirmButtonColor: "#DC3545",
          confirmButtonText: "Continuar",
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
          timer: 9000,
        });
        window.location.reload(0);
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error al enviar la calificación",
          text: "Por favor, intenta nuevamente",
          icon: "error",
          iconColor: "#1bf30b",
          confirmButtonColor: "#DC3545",
          confirmButtonText: "Continuar",
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        });
      }
    }
  }

  return (
    <div className='Registro'>
      <NavbarUserIndex />

      <div
        className="container-fluid p-5 nab table-responsive col col-sm-12"
        id="homeuser"
      >
        <h1 className=" mt-5  pt-2  text-white text-center display-1 anton fw-bold">
          Hola, {user.nombre_usuario}
        </h1>

        <ReservaCliente />


        <div className="container text-white text-center">
          <div className="container-fluid  p-5 mt-5 ">
            <h2 className="text-center antonparabackend fw-bold mt-5 pt-5">
              <p>
                <span className="text-danger display-5">CALIFICACIONES </span>
                <span className="text-light  display-5"> || </span>
                <span className="text-warning display-5"> VIP</span>

              </p>

            </h2>
            <form onSubmit={handleSubmit} className='text-white'>
              <div className='contenido4'>
                <Rating
                  count={5}
                  value={nuevaCalificacion.puntuacion}
                  onChange={handleRatingChange}
                  size={80}  // Cambia el tamaño de las estrellas aquí
                  activeColor="#ffd700"
                  min={1}
                  max={5}
                  name="puntuacion"
                />
              </div>
              <label className='mx-3 fw-bold mb-3 fs-3 bebas text-warning'>Comentario</label>
              <div>
                <textarea type="text" name="comentario" className='form-control bg-dark text-white w-50 contenido5 p-5 border-light border-1 fw-bold text-center' value={nuevaCalificacion.comentario} onChange={handleChange} />
              </div>
              <button type="submit" className='btn btn-danger mt-3 '>Enviar Calificación</button>
            </form>
            <div className='mt-5 pt-5'>
              <h5 className='fw-bold fs-3 bebas text-warning'>Mis calificaciones</h5>
              <div className="mt-5">
                <CalificacionesUserD />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
