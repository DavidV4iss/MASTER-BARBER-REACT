import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment';

const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

const StyledDatePicker = styled(DatePicker)`
  width: 435px;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: rgb(255, 0, 0);
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  }
`;

export default function Reserva() {
    const [service, setService] = useState('');
    const [date, setDate] = useState(new Date());
    const [barberoId, setBarberoId] = useState('');
    const [barberos, setBarberos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [currentStep, setCurrentStep] = useState(1); // 1: Servicio, 2: Barbero, 3: Fecha

    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded.id;

    const nextStep = () => {
        if (currentStep === 1 && !service) {
            Swal.fire({
                icon: 'warning',
                title: 'Servicio no seleccionado',
                text: 'Por favor, selecciona un servicio antes de continuar.',
            });
            return;
        }

        if (currentStep === 2 && !barberoId) {
            Swal.fire({
                icon: 'warning',
                title: 'Barbero no seleccionado',
                text: 'Por favor, selecciona un barbero antes de continuar.',
            });
            return;
        }

        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!service) {
            Swal.fire({
                icon: 'error',
                title: 'Falta seleccionar el servicio',
                text: 'Por favor, selecciona un servicio antes de reservar.',
            });
            return;
        }

        if (!barberoId) {
            Swal.fire({
                icon: 'error',
                title: 'Falta seleccionar el barbero',
                text: 'Por favor, selecciona un barbero antes de reservar.',
            });
            return;
        }

        if (!date) {
            Swal.fire({
                icon: 'error',
                title: 'Falta seleccionar la fecha y hora',
                text: 'Por favor, selecciona una fecha y hora antes de reservar.',
            });
            return;
        }

        console.log('Reserva:', {
            cliente_id: id,
            barbero_id: barberoId,
            servicio: service,
            fecha: formattedDate,
            estado: 'Pendiente',
        });

        // Si todo está completo, realiza la reserva
        axios.post('http://localhost:8081/CrearReservas', {
            cliente_id: id,
            barbero_id: barberoId,
            servicio: service,
            fecha: formattedDate,
            estado: 'Pendiente',

        })
            
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva creada',
                    text: 'Tu reserva ha sido creada exitosamente.',
                });
                setCurrentStep(1);
                setService(null);
                setBarberoId(null);
                setDate(null);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la reserva',
                    text: 'Hubo un problema al crear tu reserva. Inténtalo nuevamente.',
                });
                console.error('Error al crear la reserva:', error);
            });
    };

    return (
        <div className='text-white text-center mt-5 rounded-4 container'>
            <h1 className='text-warning text-center mt-5 mb-5 p-5 antonparabackend'>¡Haz tu reserva ahora!</h1>

            <form onSubmit={handleSubmit}>
                {/* Paso 1: Seleccionar servicio */}
                {currentStep === 1 && (
                    <div>
                        <h3 className='antonparabackend mt-5'>Selecciona el servicio que deseas</h3>
                        <div className='container-fluid w-75'>
                            <div className='row mt-5 mb-5'>
                                {servicios.map((servicio, index) => (
                                    <div
                                        className="col text-decoration-none"
                                        key={servicio.id_tipo_servicio}
                                        onClick={() => setService(servicio.id_tipo_servicio)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div
                                            className={
                                                service === servicio.id_tipo_servicio
                                                    ? 'card bg-dark border-warning border-danger rounded-3 border-success p-3 shadow'
                                                    : 'card bg-black border-warning border-start-0 rounded-3 border-success p-3 mx-5'
                                            }
                                        >
                                            <h5 className="card-title text-danger text-center UnifrakturMaguntia fs-3 mt-4">
                                                {servicio.nombre}
                                            </h5>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img
                                                        src={
                                                            index === 1
                                                                ? '/cortePremium.jpg'
                                                                : '/corteBasico.jpg'
                                                        }
                                                        className="card-img-top rounded-2 w-75 mt-2"
                                                        alt={servicio.nombre}
                                                    />
                                                </div>
                                                <div className="text-center mt-5">
                                                    <p className="text-white bebas fs-5">{servicio.descripcion_S}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="button" className="btn btn-warning text-white" onClick={nextStep}>
                            Siguiente
                        </button>
                    </div>
                )}

                {/* Paso 2: Seleccionar barbero */}
                {currentStep === 2 && (
                    <div>
                        <h3 className='antonparabackend mt-5 text-white'>Selecciona tu barbero preferido</h3>
                        <div className='row mt-5 mb-5'>
                            {barberos.map((barbero, index) => (
                                <div
                                    className="col text-decoration-none w-50"
                                    key={barbero.id_barbero}
                                    onClick={() => setBarberoId(barbero.id_usuario)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        className={
                                            barberoId === barbero.id_usuario
                                                ? 'card bg-dark border-warning border-danger rounded-3 border-success p-3 shadow'
                                                : 'card bg-black border-warning border-start-0 rounded-3 border-success p-3 mx-5'
                                        }
                                    >
                                        <h5 className="card-title text-danger text-center bebas fs-3 mt-4">
                                            {barbero.nombre_usuario}
                                        </h5>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img
                                                    src={`/images/imagesBarbero/${barbero.Foto}`}
                                                    className="card-img-top img-fluid"
                                                    alt={barbero.nombre_usuario}
                                                />
                                            </div>
                                            <div className="text-center mt-5">
                                                <p className="text-white bebas fs-5">{barbero.descripcion}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-danger me-3 text-white" onClick={prevStep}>
                            Anterior
                        </button>
                        <button type="button" className="btn btn-warning text-white" onClick={nextStep}>
                            Siguiente
                        </button>
                    </div>
                )}

                {/* Paso 3: Seleccionar fecha y hora */}
                {currentStep === 3 && (
                    <div>
                        <h3 className='antonparabackend mt-5 text-white'>Selecciona la fecha y hora</h3>
                        <div>
                            <StyledDatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                placeholderText="Selecciona una fecha y hora"
                            />
                        </div>
                        <br />
                        <button type="button" className="btn btn-danger me-3" onClick={prevStep}>
                            Anterior
                        </button>
                        <button type="submit" className="btn btn-warning text-white" onClick={handleSubmit}>
                            Reservar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}