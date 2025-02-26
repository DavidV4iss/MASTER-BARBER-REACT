import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { use } from 'react';

export default function Calificaciones() {
  const [calificaciones, setCalificaciones] = useState([]);
  const[usuarios, setUsuarios] = useState([]);
  

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

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:8081/traerUsuarios");
        setUsuarios(res.data);
      } catch (err) {
        console.log("Error al obtener los usuarios:", err);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div className='text-white'>
      {calificaciones.map((calificacion) => (
        <div key={calificacion.id}>
          <p>{"⭐".repeat(calificacion.puntuacion)}</p>
          <p>{calificacion.comentario}</p>
          <p>{usuarios.find((user) => user.id_usuario === calificacion.usuario_id)?.nombre_usuario}</p>
        </div>
      ))}
    </div>
  )
}
