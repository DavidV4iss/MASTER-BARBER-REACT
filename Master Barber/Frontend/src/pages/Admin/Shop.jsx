import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarAdmin from '../../Components/NavbarAdmin';
import SidebarAdmin from '../../Components/SidebarAdmin';
import CarrouselShopAdmin from '../../Components/CarrouselShopAdmin';

export default function Shop() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [Carrousel, setCarrousel] = useState({
        nombre_producto: '',
        descripcion: ''
    });

    useEffect(() => {
        try {
            const fetchImages = async () => {
                const res = await axios.get('http://localhost:8081/GetCarrousel');
                setCarrousel(res.data);
            };
            fetchImages();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleChange = (e) => {
        setCarrousel({ ...Carrousel, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile || !Carrousel.nombre_producto || !Carrousel.descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos antes de subir.',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('nombre_producto', Carrousel.nombre_producto);
        formData.append('descripcion', Carrousel.descripcion);
        try {
            const res = await axios.post('http://localhost:8081/CreateCarrousel', formData);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data,
                    timer: 1000,
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                }).then(() => {
                    window.location.reload(0);
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data,
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
        setIsUpdating(true);
    };

    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <p className='text-center mt-5 text-white display-6 bebas col-sm-12 col'>HOLA, <span className='text-danger'>ADMINISTRADOR</span> |AQUI PODRAS SUBIR Y ELIMINAR IMAGENES AL CARRUSEL</p>

            <div className="container text-center text-white">
                <form onSubmit={handleSubmit}>
                    <img
                        src={imagePreview || 'default-avatar.png'}
                        alt="Vista Previa"
                        className="img-fluid text-center mx-5 m-5"
                        style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                    />
                    <h2 className="text-white antonparabackend mb-5 ">Subir Una Foto A <span className='text-success'> MASTER SHOP</span></h2>

                    <div className="container">
                        <div className="input-group mb-3">
                            <input
                                name="file"
                                accept="image/*"
                                type="file"
                                className="form-control bg-black text-white border-light mx-5"
                                id="inputGroupFile04"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="input-group mb-3 text-white">
                            <p className='col-sm-12 col-12 antonparabackend'>TITULO DEL PRODUCTO</p>
                            <input
                                name="nombre_producto"
                                type="text"
                                className="form-control bg-black text-white text-center border-light mx-5"
                                value={Carrousel.nombre_producto}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <p className='col-sm-12 col-12 antonparabackend'>DESCRIPCION DEL PRODUCTO</p>
                            <textarea
                                name="descripcion"
                                className="form-control bg-black text-white text-center border-light mx-5"
                                value={Carrousel.descripcion}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-success mx-5 text-white"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Subiendo...' : 'Subir'}
                        </button>
                    </div>
                </form>
                <div className="border border-rounded shadow mt-5 m-5">
                    <h5 className='antonparabackend text-light antonparabackend mt-3'>AQUI PODARAS ELIMNAR LAS IMAGENES QUE TIENES PUBLICADAS ACTUALMENTE</h5>
                    <CarrouselShopAdmin />
                    
                </div>
            </div>
        </div>
    );
}