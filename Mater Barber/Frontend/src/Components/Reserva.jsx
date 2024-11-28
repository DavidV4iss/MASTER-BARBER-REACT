import React, { useState, useEffect } from "react";
import axios from "axios";

const Reserva = () => {
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [fecha, setFecha] = useState("");
  const [barberoId, setBarberoId] = useState("");
  const [servicioId, setServicioId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/api/barberos").then((response) => {
      setBarberos(response.data);
    });
    axios.get("http://localhost:8081/api/servicios").then((response) => {
      setServicios(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/reservas", {
        fecha: fecha,
        usuario_id: 9, // Suponiendo que el cliente tiene ID 1
        barbero_id: barberoId,
        tipo_servicio_id: servicioId,
      })
      .then((response) => {
        alert("Reserva creada con éxito");
      })
      .catch((error) => {
        console.error("Error creando la reserva", error);
      });
  };

  return (
    <div>
      <h2>Hacer Reserva</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <select onChange={(e) => setBarberoId(e.target.value)} required>
          <option value="">Seleccione un barbero</option>
          {barberos.map((barbero) => (
            <option key={barbero.id_usuario} value={barbero.id_usuario}>
              {barbero.nombre_usuario}
            </option>
          ))}
        </select>
        <select onChange={(e) => setServicioId(e.target.value)} required>
          <option value="">Seleccione un servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio.id} value={servicio.id}>
              {servicio.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default Reserva;
