import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import SidebarBarber from '../../Components/SidebarBarber';
import NavbarBarber from '../../Components/NavbarBarber';

const socket = io('http://localhost:8081');

export default function GestionReservas() {
    const [reservas, setReservas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [clientes, setClientes] = useState([]);

    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded.id;

    useEffect(() => {
        axios.get( `http://localhost:8081/GetReservas/barbero/${id}`)
            .then(response => {
                setReservas(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las reservas:', error);
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

        socket.on('reservaActualizada', (data) => {
            alert(`Tu reserva ha sido ${data.estado}`);
        });

        return () => {
            socket.off('reservaActualizada');
        };
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

    const getServiceName = (id) => {
        const servicio = servicios.find(servicio => servicio.id_tipo_servicio === id);
        return servicio ? servicio.nombre : 'Desconocido';
    };

    const getClientName = (id) => {
        const cliente = clientes.find(cliente => cliente.id_usuario === id);
        return cliente ? cliente.nombre_usuario : 'Desconocido';
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
                            {getClientName(reserva.cliente_id)} - {getServiceName(reserva.servicio)} - {new Date(reserva.fecha).toLocaleString()} - {reserva.estado}
                            <button onClick={() => handleAccept(reserva.id_reserva)}>Aceptar</button>
                            <button onClick={() => handleCancel(reserva.id_reserva)}>Cancelar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}