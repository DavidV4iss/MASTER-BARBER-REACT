import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarAdmin from '../../Components/NavbarAdmin';
import SidebarAdmin from '../../Components/SidebarAdmin';

export default function UploadCarrousel() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [Carrousel, setCarrousel] = useState({});

    useEffect(() => {
        const fetchCarrousel = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/GetCarrousel`);
                setCarrousel(res.data[0]);
                if (res.data[0].Foto) {
                    setImagePreview(`/images/imagesCarrousel/${res.data[0].Foto}`);
                }
            } catch (err) {
                console.error('Error al obtener los datos:', err);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo cargar la información',
                    icon: 'error',
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                });
            }
        };
        fetchCarrousel();
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
        const formData = new FormData();
        formData.append('image', selectedFile);
        try {
            const res = await axios.post('http://localhost:8081/CreateCarrousel', formData,)
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
            <p className='text-center  mt-5 text-white display-6 bebas col-sm-12 col'>HOLA, <span className='text-danger'>ADMINISTRADOR</span> |AQUI PODRAS SUBIR Y ELIMINAR IMAGENES AL CARRUSEL</p>
            
            
            <div className="container text-center text-white">
                <form onSubmit={handleSubmit}>
                    <img
                        src={imagePreview || 'default-avatar.png'}
                        alt="Vista Previa"
                        className="img-fluid text-center mx-5 m-5"
                        style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                    />
                    <h2 className="text-white antonparabackend mb-5">Subir Una Foto A <span className='text-success'> MASTER SHOP</span></h2>

                    <div className=" container">
                        <div className="input-group">
                            <input
                                name="file"
                                accept="image/*"
                                type="file" 
                                className="form-control bg-black text-white border-light mx-5"
                                id="inputGroupFile04"
                                onChange={handleFileChange}
                            />
                                <button
                                    type="submit"
                                    className="btn btn-outline-success mx-5 text-white"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Subiendo...' : 'Subir'}
                                </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}