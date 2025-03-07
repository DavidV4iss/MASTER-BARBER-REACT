import React from 'react';
import axios from 'axios';

const AlertNotification = ({ reservaId, estado }) => {

    if (estado === 'aceptada') {
        alert('La reserva ha sido aceptada.');
        const sendNotification = () => {
        axios.post(`http://localhost:8081/UpdateReservasEstado/${reservaId}`, {
            estado: estado
            
        })
        .then(response => {
            console.log('Notificación enviada:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar la notificación:', error);
        });
    };

    React.useEffect(() => {
        sendNotification();
    }, [estado]);
    } else if (estado === 'cancelada') {
        alert('La reserva ha sido cancelada.');
    }
    else {
        console.log(estado)
    }
    

    return null;
};

export default AlertNotification;