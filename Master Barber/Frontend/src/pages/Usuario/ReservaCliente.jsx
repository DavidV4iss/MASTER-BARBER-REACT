import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

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
    const [currentStep, setCurrentStep] = useState(1);
    const [horasOcupadas, setHorasOcupadas] = useState([]);
    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded?.id || null;


    const nextStep = () => {
        if (currentStep === 1 && !service) {
            Swal.fire({
                icon: 'warning',
                title: 'Servicio no seleccionado',
                text: 'Por favor, selecciona un servicio antes de continuar.',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                }
            });
            return;
        }

        if (currentStep === 2 && !barberoId) {
            Swal.fire({
                icon: 'warning',
                title: 'Barbero no seleccionado',
                text: 'Por favor, selecciona un barbero antes de continuar.',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                }
            });
            return;
        }

        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };
    //

    //LOGICA DE API
    useEffect(() => {
        axios.get('http://localhost:8080/GetBarberos')
            .then(response => {
                setBarberos(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los barberos:', error);
            });

        if (barberoId) {
            axios.get(`http://localhost:8080/GetReservas/barbero/${barberoId}`)
                .then(response => {
                    const horasOcupadas = response.data.map(reserva => new Date(reserva.fecha));
                    setHorasOcupadas(horasOcupadas);
                })
                .catch(error => {
                    console.error('Error al obtener las reservas:', error);
                });
        }

        axios.get('http://localhost:8080/GetServicios')
            .then(response => {
                setServicios(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los servicios:', error);
            });
    }, [barberoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!service || !barberoId || !date) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, selecciona el servicio, barbero y fecha antes de continuar.',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                }
            });
            return;
        }

        const formattedSelectedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

        try {
            const response = await axios.get(`http://localhost:8080/GetReservas/barbero/${barberoId}`);
            const horasOcupadas = response.data.map(reserva => moment(reserva.fecha).format('YYYY-MM-DD HH:mm:ss'));

            if (horasOcupadas.includes(formattedSelectedDate)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Hora ocupada',
                    text: 'La hora seleccionada ya está ocupada. Por favor, elige otra hora.',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#DC3545',
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    }
                });
                return;
            }

            await axios.post('http://localhost:8080/CrearReservas', {
                cliente_id: id,
                barbero_id: barberoId,
                servicio: service,
                fecha: formattedSelectedDate,
                estado: 'Pendiente',
            });

            Swal.fire({
                icon: 'success',
                title: 'Reserva creada exitosamente',
                text: 'Espera a que el barbero vea tu solicitud, el estado de tu reserva sera notificado.',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                }
            });

            setCurrentStep(1);
            setService('');
            setBarberoId('');
            setDate(new Date());
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la reserva',
                text: 'Hubo un problema al crear tu reserva. Inténtalo nuevamente.',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                }
            });
        }
    };
    //

    return (
        <div className='text-white text-center mt-5 rounded-4 container'>

            <form onSubmit={handleSubmit} className="fade-in">
                {/* Paso 1: Servicio */}
                {currentStep === 1 && (
                    <>
                        <h3 className='antonparabackend mt-5'>
                            <i className="fas fa-scissors me-2 text-danger"></i>Selecciona el servicio que deseas
                        </h3>
                        <div className='container-fluid w-75'>
                            <div className='row mt-5 mb-5 justify-content-center'>
                                {servicios.map((servicio, index) => {
                                    const isSelected = service === servicio.id_tipo_servicio;
                                    return (
                                        <div
                                            key={servicio.id_tipo_servicio}
                                            className={`col-12 col-sm-6 col-md-4 col-lg-6 mb-4 d-flex justify-content-end mx-auto card-hover`}
                                            onClick={() => setService(servicio.id_tipo_servicio)}
                                            style={{ cursor: 'pointer', transition: 'transform 0.1s ease-in-out' }}
                                        >
                                            <div
                                                className={`card ${isSelected ? 'border border-3 border-warning shadow-lg selected-card' : 'border border-secondary'} bg-dark text-white rounded-4 w-100`}
                                            >
                                                <h5 className="card-title text-center fs-3 mt-3 text-warning UnifrakturMaguntia">
                                                    {servicio.nombre}
                                                </h5>
                                                <div className="card-body">
                                                    <img
                                                        src={index === 1 ? '/cortePremium.jpg' : '/corteBasico.jpg'}
                                                        className="card-img-top rounded-3"
                                                        alt={servicio.nombre}
                                                    />
                                                    <p className="text-light bebas fs-5 mt-4">
                                                        {servicio.descripcion_S}
                                                    </p>
                                                    {isSelected && (
                                                        <span className="badge bg-success mt-2">Seleccionado ✅</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <button className="btn btn-warning px-4 py-2 shadow rounded-4 text-white" onClick={nextStep}>
                            Siguiente <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                    </>
                )}

                {/* Paso 2: Barbero */}
                {currentStep === 2 && (
                    <>
                        <h3 className='antonparabackend mt-5'>
                            <i className="fas fa-user-alt me-2 text-danger"></i>Selecciona tu barbero preferido
                        </h3>

                        <div className="mt-5 mb-5">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    576: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                {barberos.map((barbero) => {
                                    const isSelected = barberoId === barbero.id_usuario;
                                    return (
                                        <SwiperSlide key={barbero.id_barbero}>
                                            <div
                                                onClick={() => setBarberoId(barbero.id_usuario)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div
                                                    className={`card ${isSelected
                                                        ? 'border border-3 border-warning shadow-lg selected-card'
                                                        : 'border border-secondary'
                                                        } bg-dark text-white rounded-4 h-100`}
                                                >
                                                    <h5 className="card-title text-danger text-center bebas fs-4 mt-4">
                                                        {barbero.nombre_usuario}
                                                    </h5>
                                                    <div className="card-body d-flex flex-column align-items-center text-center">
                                                        <img
                                                            src={`http://localhost:8080/imagesBarbero/${barbero.Foto}`}
                                                            className="card-img-top rounded-3 img-fluid"
                                                            alt={barbero.nombre_usuario}
                                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                                        />
                                                        <p className="text-light bebas fs-6 mt-4">
                                                            {barbero.descripcion}
                                                        </p>
                                                        {isSelected && (
                                                            <span className="badge bg-success mt-2">
                                                                Seleccionado ✅
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        <button className="btn btn-danger me-3 px-4 py-2 rounded-4" onClick={prevStep}>
                            <i className="fas fa-arrow-left me-2"></i> Anterior
                        </button>
                        <button className="btn btn-warning px-4 py-2 rounded-4 text-white" onClick={nextStep}>
                            Siguiente <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                    </>
                )}



                {/* Paso 3: Seleccionar fecha y hora */}
                {currentStep === 3 && (
                    <div>
                        <h3 className='antonparabackend mt-3 text-white'>Selecciona la fecha y hora</h3>
                        <div className="calendar-container mt-5 mb-5">
                            <StyledDatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                showTimeSelect
                                timeFormat="hh:mm aa"
                                timeIntervals={60}
                                dateFormat="d 'de' MMMM 'de' yyyy hh:mm"
                                minDate={new Date()}
                                filterTime={(time) => {
                                    const selectedTime = new Date(time);
                                    const hours = selectedTime.getHours();
                                    const isOcupada = horasOcupadas.some(
                                        (hora) => hora.getTime() === selectedTime.getTime()
                                    );
                                    return hours >= 8 && hours <= 22 && !isOcupada;
                                }}
                                placeholderText="Selecciona una fecha y hora"
                                inline
                                timeCaption="Hora"
                                renderCustomHeader={({
                                    date,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                        <button
                                            type="button"
                                            onClick={decreaseMonth}
                                            disabled={prevMonthButtonDisabled}
                                        >
                                            {"<"}
                                        </button>
                                        <span>
                                            {date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, (c) => c.toUpperCase())}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={increaseMonth}
                                            disabled={nextMonthButtonDisabled}
                                        >
                                            {">"}
                                        </button>
                                    </div>
                                )}
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
};