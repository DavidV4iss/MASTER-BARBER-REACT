import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative } from 'swiper/modules';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CarrouselShop() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get("http://localhost:8081/GetCarrousel");
                setImages(res.data);
            } catch (err) {
                console.log("Error al obtener las calificaciones:", err);
            }
        };
        fetchImages();
    }, []);



    const DeleteCarrousel = async (id) => {
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
            const res = await axios.delete(`http://localhost:8081/DeleteCarrousel/${id}`);
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data,
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
        <>
            <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        translate: ['-100%', 0, -5000],
                    },
                    next: {
                        translate: ['1000%', 0, -500],
                    },
                }}
                centeredSlides={true}
                modules={[Navigation, Pagination, EffectCreative]}
                navigation={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 3
                    }
                }}
                className="mySwiper2 mt-5 pt-5 "
            >
                {images.map((carrousel) => (
                    <SwiperSlide key={carrousel.id}>
                        <div className="card text-center bg-dark">
                            <div className="card-body">
                                <img src={`/images/imagescarrousel/${carrousel.Foto}`} className='img-fluid ' alt="" />
                                <h5 className="card-title mt-4 antonparabackend text-danger">{carrousel.nombre_producto}</h5>
                                <p className="card-text text-white mt-4">{carrousel.descripcion}</p>
                                <button type="button" className="btn btn-danger" onClick={() => DeleteCarrousel(carrousel.id)} >
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </>
    );
}