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
            reserva.id_reserva === id_reserva ? { ...reserva, estado } : reserva
          )
        );
      });
  };

  return (
    <div className="container text-white text-center mt-5">
      <div className="container col border border mt-4 bg-dark row col contenido mt-5">
          <h4 className="text-center text-white display-3 bebas mx-1 mt-5">
            Reservas de clientes
          </h4>
          <ul className="list-unstyled">
        {reservas.map((reserva) => (
          <li key={reserva.id_reserva}>
            {reserva.fecha} - {reserva.estado}
            <button
              onClick={() => cambiarEstado(reserva.id_reserva, "Aceptada")}
            >
              Aceptar
            </button>
            <button
              onClick={() => cambiarEstado(reserva.id_reserva, "Cancelada")}
            >
              Cancelar
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Barbero;
