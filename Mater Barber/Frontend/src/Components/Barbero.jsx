import React, { useState, useEffect } from "react";
import axios from "axios";

const Barbero = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/reservas").then((response) => {
      setReservas(response.data);
    });
  }, []);

  const cambiarEstado = (id_reserva, estado) => {
    axios
      .put(`http://localhost:8081/api/reservas/${id_reserva}`, { estado: estado })
      .then((response) => {
        setReservas(
          reservas.map((reserva) =>
            reserva.id_reserva === id ? { ...reserva, estado } : reserva
          )
        );
      });
  };

  return (
    <div className="container text-white">
      <h2>Reservas</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.fecha} - {reserva.estado}
            <button onClick={() => cambiarEstado(reserva.id_reserva, "Aceptada")}>
              Aceptar
            </button>
            <button onClick={() => cambiarEstado(reserva.id_reserva, "Cancelada")}>
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Barbero;
