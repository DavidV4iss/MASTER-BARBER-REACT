import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarBarber from '../../Components/NavbarBarber';

export default function GestionReservas() {
    const [reservas, setReservas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFinal, setIsLoadingFinal] = useState(false);
    const [isLoadingCancel, setIsLoadingCancel] = useState(false);
    const [isLoadingAccept, setIsLoadingAccept] = useState(false);
    const [finalizedReservations, setFinalizedReservations] = useState([]);
    const [cancelTimers, setCancelTimers] = useState({}); // Estado para manejar temporizadores
    const [Barber, setBarber] = useState({});
    
    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded.id;
    const usuario = JSON.parse(atob(token.split(".")[1]));
    const email = usuario.email;

    useEffect(() => {
        axios.get(`http://localhost:8080/GetReservas/barbero/${id}`)
            .then(response => {
                setReservas(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las reservas:', error);
            });

        axios.get(`http://localhost:8080/traerUsuario/${email}`)
            .then(response => {
                setBarber(response.data[0]);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los datos del barbero:', error);
            });
        axios.get('http://localhost:8080/GetServicios')
            .then(response => {
                setServicios(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los servicios:', error);
            });

        axios.get('http://localhost:8080/GetClientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los clientes:', error);
            });
    }, []);

    const handleAccept = (id) => {
        setIsLoadingAccept(true);
        axios.patch(`http://localhost:8080/UpdateReservasEstado/${id}`, { estado: 'Aceptada' })
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'Aceptada' } : reserva));
                // Limpiar temporizador si existe
                if (cancelTimers[id]) {
                    clearTimeout(cancelTimers[id]);
                    setCancelTimers(prev => {
                        const updatedTimers = { ...prev };
                        delete updatedTimers[id];
                        return updatedTimers;
                    });
                }
            })
            .catch(error => {
                console.error('Hubo un error al aceptar la reserva:', error);
            })
            .finally(() => {
                setIsLoadingAccept(false);
            });
    };

    const handleCancel = (id) => {
        setIsLoadingCancel(true);
        axios.patch(`http://localhost:8080/UpdateReservasEstado/${id}`, { estado: 'Cancelada' })
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'Cancelada' } : reserva));

                // Iniciar temporizador de 1 hora
                const timer = setTimeout(() => {
                    handleDelete(id);
                }, 60 * 60 * 1000); s

                setCancelTimers(prev => ({ ...prev, [id]: timer }));
            })
            .catch(error => {
                console.error('Hubo un error al cancelar la reserva:', error);
            })
            .finally(() => {
                setIsLoadingCancel(false);
            });
    };

    const handleFinalize = (id) => {
        setIsLoadingFinal(true);
        axios.patch(`http://localhost:8080/UpdateReservasEstado/${id}`, { estado: 'finalizada' })
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'finalizada' } : reserva));
                setFinalizedReservations([...finalizedReservations, id]);
            })
            .catch(error => {
                console.error('Hubo un error al finalizar la reserva:', error);
            })
            .finally(() => {
                setIsLoadingFinal(false);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/DeleteReserva/${id}`)
            .then(response => {
                console.log(response.data);
                setReservas(reservas.filter(reserva => reserva.id_reserva !== id));
                // Limpiar temporizador si existe
                if (cancelTimers[id]) {
                    clearTimeout(cancelTimers[id]);
                    setCancelTimers(prev => {
                        const updatedTimers = { ...prev };
                        delete updatedTimers[id];
                        return updatedTimers;
                    });
                }
            })
            .catch(error => {
                console.error('Hubo un error al eliminar la reserva:', error);
            });
    };

    const getServiceName = (id) => {
        const servicio = servicios.find(servicio => servicio.id_tipo_servicio === id);
        return servicio ? servicio.nombre : 'Desconocido';
    };

    const getClientName = (id) => {
        const cliente = clientes.find(cliente => cliente.id_usuario === id);
        return [{
            nombre: cliente ? cliente.nombre_usuario : 'Desconocido',
            IMG: cliente ? <img src={`http://localhost:8080/perfil/${cliente.Foto}`} alt="Foto de Perfil" style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px' }} /> : 'Desconocido'
        }];
    };

    return (
        <div className='text-white mb-5'>
            <NavbarBarber />
            <div className='text-center mt-5 pt-5 contenido'>
                <h2 className='fw-bold text-light  display-5 anton'>HOLA <span className="text-warning">{Barber.nombre_usuario}</span>, TIENES LAS SIGUIENTES RESERVAS PENDIENTES</h2>

                {isLoadingFinal && (<div className='text-center mt-5 fs-4 UnifrakturMaguntia text-danger'>Finalizando...</div>)}
                {isLoadingCancel && (<div className='text-center mt-5 fs-4 UnifrakturMaguntia text-warning'>Cancelando...</div>)}
                {isLoadingAccept && (<div className='text-center mt-5 fs-4 UnifrakturMaguntia text-success'>Aceptando...</div>)}

                <div className="row container row-cols-1 row-cols-md-2 g-4 mt-5 pt-5 contenido6">
                    {reservas.map((reserva) => (
                        <div className="col mb-5" key={reserva.id_reserva}>
                            <div className="card bg-dark border border text-white w-75 container">
                                <div className="card-body mb-5">
                                    <div className="mt-5">
                                        <div className=" align-items-center">{getClientName(reserva.cliente_id)[0].IMG} </div>
                                        <div className="mt-5">
                                            <strong className='text-warning '>Cliente:</strong> {getClientName(reserva.cliente_id)[0].nombre}<br />
                                            <strong className='text-warning'>Servicio:</strong> {getServiceName(reserva.servicio)} <br />
                                            <strong className='text-warning'>Fecha Y Hora:</strong> {new Date(reserva.fecha).toLocaleString()} <br />
                                            <strong className='text-warning'>Estado De La Reserva:</strong><strong className="text-primary mx-2">{reserva.estado}</strong>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        {finalizedReservations.includes(reserva.id_reserva) ? (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(reserva.id_reserva)}
                                            >
                                                Eliminar
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-success mx-3"
                                                    onClick={() => handleAccept(reserva.id_reserva)}
                                                >
                                                    Aceptar
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleFinalize(reserva.id_reserva)}
                                                >
                                                    {isLoadingFinal ? 'Finalizando...' : 'Finalizar'}
                                                </button>
                                                <button
                                                    className="btn btn-warning mx-3"
                                                    onClick={() => handleCancel(reserva.id_reserva)}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}