import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

export default function MisReservas() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(false);

    // Obtener el id del usuario desde el token
    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded?.id || null;

    // Traer las reservas del usuario
    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.get(`http://localhost:8080/GetReservas/cliente/${id}`)
                .then(res => setReservas(res.data))
                .catch(() => setReservas([]))
                .finally(() => setLoading(false));
        }
    }, [id]);

    // Cancelar reserva solo si está aceptada
    const cancelarReserva = async (idReserva) => {
        try {
            await axios.patch(`http://localhost:8080/CancelarReservaCliente/${idReserva}`);
            Swal.fire('Cancelada', 'Tu reserva fue cancelada.', 'success');
            setReservas(reservas => reservas.map(r =>
                r.id_reserva === idReserva ? { ...r, estado: 'Cancelada' } : r
            ));
        } catch (err) {
            Swal.fire('Error', err.response?.data?.error || 'No se pudo cancelar.', 'error');
        }
    };

    return (
        <div className="container mt-5 text-white">
            <h2 className="mb-4">Mis Reservas</h2>
            {loading && <p>Cargando reservas...</p>}
            {!loading && reservas.length === 0 && <p>No tienes reservas.</p>}
            <div className="row">
                {reservas.map(reserva => (
                    <div className="col-md-6 mb-4" key={reserva.id_reserva}>
                        <div className="card bg-dark text-white p-3 rounded-4">
                            <p><b>Servicio:</b> {reserva.servicio}</p>
                            <p><b>Fecha:</b> {moment(reserva.fecha).format('DD/MM/YYYY HH:mm')}</p>
                            <p><b>Estado:</b> {reserva.estado}</p>
                            {reserva.estado === 'Aceptada' && (
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => cancelarReserva(reserva.id_reserva)}
                                >
                                    Cancelar Reserva
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}