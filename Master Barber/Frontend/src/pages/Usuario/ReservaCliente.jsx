import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)`
  width: 435px;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color:rgb(255, 0, 0);
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  }
`;

export default function Reserva() {
    const [service, setService] = useState('');
    const [date, setDate] = useState(new Date());
    const [barberoId, setBarberoId] = useState('');
    const [clienteId, setClienteId] = useState(''); // Asume que tienes el ID del cliente de alguna manera
    const [barberos, setBarberos] = useState([]);
    const [servicios, setServicios] = useState([]);

    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded.id;

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

        // Verificar disponibilidad
        axios.post('http://localhost:8081/VerificarDisponibilidad', {
            barbero_id: barberoId,
            fecha: date
        })
            .then(response => {
                if (response.data.disponible) {
                    // Crear la reserva si está disponible
                    const reserva = {
                        cliente_id: id,
                        barbero_id: barberoId,
                        servicio: service,
                        fecha: date,
                        estado: 'pendiente'
                    };

                    axios.post('http://localhost:8081/CrearReservas', reserva)
                        .then(response => {
                            console.log(response.data);
                            alert('Reserva creada exitosamente');
                        })
                        .catch(error => {
                            console.error('Hubo un error al crear la reserva:', error);
                        });
                } else {
                    alert('La hora seleccionada ya está ocupada. Por favor, elige otra hora.');
                }
            })
            .catch(error => {
                console.error('Hubo un error al verificar la disponibilidad:', error);
            });
    };

    return (
        <div className='text-white text-center mt-5 border border-4 rounded-4 w-50 container '>
            <h2 className='text-white text-center mt-5 antonparabackend'>¡ Reserva Aqui !</h2>
            
            <form onSubmit={handleSubmit}>
                <label className='text-white mt-4 mb-4 w-50'>
                    <label className='antonparabackend' htmlFor="">Tipo de Servicio:</label> 
                    <select className='form-select' value={service} onChange={(e) => setService(e.target.value)}>
                        <option value=''>Seleccione un servicio</option>
                        {servicios.map(servicio => (
                            <option key={servicio.id_tipo_servicio} value={servicio.id_tipo_servicio}>
                                {servicio.nombre}
                            </option>
                        ))}
                    </select>
                </label>
                <br />


                <label className="text-white  ">
                    <label className='antonparabackend' htmlFor="">Fecha y hora: </label>
                    <div>
                    <StyledDatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Selecciona una fecha y hora"
                        />
                    </div>
                </label>
                <br />

                <label className='antonparabackend mt-4' htmlFor="">Barbero: </label>
                <select className="form-select w-50 container " aria-label="Default select example" value={barberoId} onChange={(e) => setBarberoId(e.target.value)}>            
                    <option value=''>Seleccione su barbero</option>
                    {barberos.map(barbero => (
                        <option key={barbero.id_usuario} value={barbero.id_usuario}>
                            {barbero.nombre_usuario}
                        </option>
                    ))}
                </select>

                <br />
                <div className='container mb-5 mt-3'>
                    <button type='submit'>Reservar</button>
                </div>
            </form>

            
        </div>

        
    );
}