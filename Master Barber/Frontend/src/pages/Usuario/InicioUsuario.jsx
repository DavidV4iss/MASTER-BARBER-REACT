import React, { useState, useEffect } from 'react';
import NavbarUserIndex from '../../Components/NavbarUserIndex'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



export default function InicioUsuario() {
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

  const [calificaciones, setCalificaciones] = useState([]);
  const [nuevaCalificacion, setNuevaCalificacion] = useState({
    nombre_usuario: "",
    puntuacion: "",
    comentario: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/calificaciones")
      .then(res => res.json())
      .then(data => setCalificaciones(data))
      .catch(err => console.error("Error:", err));
  }, []);

  const handleChange = (e) => {
    setNuevaCalificacion(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Obtén el token de autenticación
      const res = await axios.post("http://localhost:8081/calificaciones", nuevaCalificacion, {
        headers: {
          Authorization: `Bearer ${token}` // Incluye el token en los encabezados
        }
      });
      if (res.status === 200) {
        Swal.fire({
          title: 'Tu calificación ha sido enviada',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
        navigate("/Gracias");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          title: error.response.data || 'Algo salió mal al enviar la calificación',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    }
  }

  return (
    <div>
      <NavbarUserIndex />
      <div className="img position-fixed top-50 start-50 translate-middle row h-100 col-1 col-sm-12  mt-5 p-5 m-2">
        <img src="/LOGO.png" alt="" className="" />
      </div>
      <div
        className="container-fluid p-5 nab table-responsive col col-sm-12"
        id="homeuser"
      >
        <h1 className=" mt-5  pt-2  text-white text-center display-1 anton fw-bold">
          Hola, {user.nombre_usuario}
        </h1>
        {/* <h1 className="text-danger text-center mt-3 pt-5 anton fw-bold">
          BIENVENIDO
        </h1> */}

        <div>
          <h2>Calificaciones</h2>
          {calificaciones.map((calificacion) => (
            <div key={calificacion.id}>
              <h4>{calificacion.nombre_usuario}</h4>
              <p>{"⭐".repeat(calificacion.puntuacion)}</p>
              <p>{calificacion.comentario}</p>
            </div>
          ))}

          <h2>Enviar Calificación</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre de Usuario:</label>
              <input type="text" name="nombre_usuario" value={nuevaCalificacion.nombre_usuario} onChange={handleChange} required />
            </div>
            <div>
              <label>Puntuación (1-5):</label>
              <input type="number" name="puntuacion" value={nuevaCalificacion.puntuacion} onChange={handleChange} required min="1" max="5" />
            </div>
            <div>
              <label>Comentario:</label>
              <textarea name="comentario" value={nuevaCalificacion.comentario} onChange={handleChange} required />
            </div>
            <button type="submit">Enviar Calificación</button>
          </form>
        </div>
      </div>
    </div>



  );
}