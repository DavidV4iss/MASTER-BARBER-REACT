import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarBarber from '../../Components/SidebarBarber';
import NavbarBarber from '../../Components/NavbarBarber';

export default function GestionReservas() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/GetReservas')
            .then(response => {
                setReservas(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las reservas:', error);
            });
    }, []);

    const handleAccept = (id) => {
        axios.patch(`http://localhost:8081/UpdateReservasEstado/${id}`, { estado: 'aceptada' })
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'aceptada' } : reserva));
            })
            .catch(error => {
                console.error('Hubo un error al aceptar la reserva:', error);
            });
    };

    const handleCancel = (id) => {
        axios.patch(`http://localhost:8081/UpdateReservasEstado/${id}`, { estado: 'cancelada' })
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'cancelada' } : reserva));
            })
            .catch(error => {
                console.error('Hubo un error al cancelar la reserva:', error);
            });
    };

    return (
        <div className='text-white'>
            <NavbarBarber />
            <SidebarBarber />
            <div className='text-center mt-5 anton'>
            <h2>Gestión de Reservas </h2>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id_reserva}>
                        {reserva.cliente_id} - {reserva.servicio} - {new Date(reserva.fecha).toLocaleString()} - {reserva.estado}
                        <button onClick={() => handleAccept(reserva.id_reserva)}>Aceptar</button>
                        <button onClick={() => handleCancel(reserva.id_reserva)}>Cancelar</button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}