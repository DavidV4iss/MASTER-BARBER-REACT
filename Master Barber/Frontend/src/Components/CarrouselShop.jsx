import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';
import axios from 'axios';

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

    return (
        <Swiper
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
                prev: {
                    translate: ['-100%', 0, -500],
                },
                next: {
                    translate: ['100%', 0, -500],
                },
            }}
            centeredSlides={true}
            modules={[Navigation, Pagination, EffectCreative]}
            navigation={{ clickable: true }}
            loop={true}
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
                            <img src={`/images/imagescarrousel/${carrousel.Foto}`} className='img-fluid' alt="" />
                            <h5 className="card-title text-white"></h5>
                            <p className="card-text text-white"></p>
                            <a href="#" className="btn btn-danger">Ver</a>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}