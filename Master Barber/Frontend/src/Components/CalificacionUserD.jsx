import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CalificacionesUserD() {
    const [calificaciones, setCalificaciones] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedCalificacion, setSelectedCalificacion] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchCalificaciones = async () => {
            try {
                const res = await axios.get("http://localhost:8081/traerCalificaciones");
                setCalificaciones(res.data);
            } catch (err) {
                console.log("Error al obtener las calificaciones:", err);
            }
        };
        fetchCalificaciones();
    }, []);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get("http://localhost:8081/traerUsuarios");
                setUsuarios(res.data);
            } catch (err) {
                console.log("Error al obtener los usuarios:", err);
            }
        };
        fetchUsuarios();
    }, []);

    const handleShow = (calificacion) => {
        setSelectedCalificacion(calificacion);
        setShow(true);
    };

    const DeleteCalificacio = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estas seguro de borrar este producto?',
                text: "No podrás revertir esta acción",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
            if (!confirm.isConfirmed) {
                return;
            }
            const res = await axios.delete(`http://localhost:8081/DeleteCalificaciones/${id}`);
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: "Calificacion borrada",
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                }).then(() => {
                    window.location.reload(0);
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al borrar',
                text: error.response.data,
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
    };


    return (
        <div className='text-white container'>
            <div className="row row-cols-1 row-cols-md-5 g-4">
                {calificaciones.map((calificacion) => (
                    <div className="col" key={calificacion.id}>
                        <div className="card h-100 bg-dark" onClick={() => handleShow(calificacion)}>
                            <div className="card-body">
                                <img
                                    src={`/images/perfil/${usuarios.find((user) => user.id_usuario === calificacion.usuario_id)?.Foto}`}
                                    className="img-fluid rounded-circle"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                                <h5 className="card-title text-warning bebas fw-bold fs-2 mt-4">{usuarios.find((user) => user.id_usuario === calificacion.usuario_id)?.nombre_usuario}</h5>
                                <p className="card-text text-white mt-3">{calificacion.comentario}</p>
                            </div>
                            <small className="text-body-secondary">{"⭐".repeat(calificacion.puntuacion)}</small>
                            <div className="card-footer mt-5">
                                <button className='btn btn-outline-danger' onClick={() => DeleteCalificacio(calificacion.id)}>
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}