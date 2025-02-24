import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Calificaciones = () => {
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
      const res = await axios.post("http://localhost:8081/calificaciones", nuevaCalificacion);
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
  };

  return (
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
  );
};

export default Calificaciones;