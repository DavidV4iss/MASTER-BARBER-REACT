import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reserva() {
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [barberoId, setBarberoId] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [barberos, setBarberos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/GetBarberos')
            .then(response => {
                setBarberos(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los barberos:', error);
            });

        axios.get('http://localhost:8081/GetServicios')
            .then(response => {
                setServicios(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los servicios:', error);
            });

        axios.get('http://localhost:8081/GetClientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los clientes:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const reserva = {
            cliente_id: clienteId,
            barbero_id: barberoId,
            servicio: service, // Asegúrate de que este sea el id_tipo_servicio
            fecha: date,
            estado: 'pendiente'
        };

        console.log(reserva);

        axios.post('http://localhost:8081/CrearReservas', reserva)
            .then(response => {
                console.log(response.data);
                alert('Reserva creada exitosamente');
            })
            .catch(error => {
                console.error('Hubo un error al crear la reserva:', error);
            });
    };

    return (
        <div className='text-white'>
            <h2>Hacer una Reserva</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tipo de Servicio:
                    <select value={service} onChange={(e) => setService(e.target.value)}>
                        <option value=''>Seleccione un servicio</option>
                        {servicios.map(servicio => (
                            <option key={servicio.id_tipo_servicio} value={servicio.id_tipo_servicio}>
                                {servicio.nombre}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Fecha y Hora:
                    <input type='datetime-local' value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <br />
                <label>
                    Barbero:
                    <select value={barberoId} onChange={(e) => setBarberoId(e.target.value)}>
                        <option value=''>Seleccione un barbero</option>
                        {barberos.map(barbero => (
                            <option key={barbero.id_usuario} value={barbero.id_usuario}>
                                {barbero.nombre_usuario}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Cliente:
                    <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
                        <option value=''>Seleccione un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id_usuario} value={cliente.id_usuario}>
                                {cliente.nombre_usuario}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <button type='submit'>Reservar</button>
            </form>
        </div>
    );
}