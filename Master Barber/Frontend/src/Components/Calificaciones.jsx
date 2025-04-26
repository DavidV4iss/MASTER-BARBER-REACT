import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default function Calificaciones() {
  const [calificaciones, setCalificaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCalificacion, setSelectedCalificacion] = useState(null);

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        const res = await axios.get("http://localhost:8080/traerCalificaciones");
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
        const res = await axios.get("http://localhost:8080/traerUsuarios");
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

  const handleClose = () => setShow(false);

  return (
    <div className='text-white container'>
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {calificaciones.map((calificacion) => (
          <div className="col" key={calificacion.id}>
            <div className="card h-100 bg-dark card-calificacion" onClick={() => handleShow(calificacion)}>
              <div className="card-body">
                <img
                  src={`http://localhost:8080/perfil/${usuarios.find((user) => user.id_usuario === calificacion.usuario_id)?.Foto}`}
                  className="img-fluid rounded-circle"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <h5 className="card-title text-danger fw-bold fs-3 mt-4">{usuarios.find((user) => user.id_usuario === calificacion.usuario_id)?.nombre_usuario}</h5>
                <p className="card-text text-white mt-3">{calificacion.comentario}</p>
              </div>
              <div className="card-footer mt-5">
                <small className="text-body-secondary">{"⭐".repeat(calificacion.puntuacion)}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCalificacion && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className='bg-dark'>
            <Modal.Title className='text-danger bebas'>Calificación de {usuarios.find((user) => user.id_usuario === selectedCalificacion.usuario_id)?.nombre_usuario}</Modal.Title>
          </Modal.Header >
          <Modal.Body className='bg-dark'>
            <img
              src={`http://localhost:8080/perfil/${usuarios.find((user) => user.id_usuario === selectedCalificacion.usuario_id)?.Foto}`}
              className="img-fluid rounded-circle mx-auto d-block mt-3"
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
            />
            <p className='text-center mt-3'>{selectedCalificacion.comentario}</p>
            <p className='text-center'>{"⭐".repeat(selectedCalificacion.puntuacion)}</p>
          </Modal.Body>
          <Modal.Footer className='bg-dark'>
            <Button variant="danger" className='bebas' onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}