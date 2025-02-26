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
  const id = usuario.id;

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






  //CODIGO PARA CALIFICACIONES
  
    
  const [nuevaCalificacion, setNuevaCalificacion] = useState({
    id: id,
    puntuacion: "",
    comentario: ""
  });


  const navigate = useNavigate();
  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        const res = await axios.get("http://localhost:8081/traerCalificaciones");
        setCalificaciones(res.data);
      } catch (err) {
        console.log("Error al obtener las calificaciones:", err);
      }
    };
    fetchCalificaciones();
  }, []);

  const handleChange = (e) => {
    setNuevaCalificacion(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/Createcalificaciones", nuevaCalificacion);
      if (res.status === 200) {
        Swal.fire({
          title: 'Tu calificación ha sido enviada',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
        navigate("/inicioUsuario");
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

        <div className="container-fluid p-5 mt-5">

          <h2>Enviar Calificación</h2>
          <form onSubmit={handleSubmit}>

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