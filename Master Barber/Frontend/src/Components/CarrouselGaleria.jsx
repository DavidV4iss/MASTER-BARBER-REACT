import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, EffectCreative } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';

export default function CarrouselBarbers() {
        return (
        <Swiper
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
                prev: {
                    translate: ['-250%', 0, -500],
                },
                next: {
                    translate: ['250%', 0, -500],
                },
            }}
            centeredSlides={true}
            modules={[Navigation, Pagination, EffectCreative]}
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
                640: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 3
                }
            }}
            className="mySwiper2 mt-5 pt-5"
        >
            <SwiperSlide>     <div className="text-center ">
                <img className='col-sm-12 col rounded' src="/MB3.JPG" alt="" />
                <h5 className="card-title text-white"></h5>
                <p className="card-text text-white"></p>
            </div></SwiperSlide>
            <SwiperSlide>     <div className="text-center ">
                <img className='col-sm-12 col rounded' src="/MB4.JPG" alt="" />
                <h5 className="card-title text-white"></h5>
                <p className="card-text text-white"></p>
            </div></SwiperSlide>
            <SwiperSlide>     <div className="text-center ">
                <img className='col-sm-12 col rounded' src="/MB5.JPG" alt="" />
                <h5 className="card-title text-white"></h5>
                <p className="card-text text-white"></p>
            </div></SwiperSlide>
            <SwiperSlide>     <div className="text-center ">
                <img className='col-sm-12 col rounded' src="/MB6.JPG" alt="" />
                <h5 className="card-title text-white"></h5>
                <p className="card-text text-white"></p>
            </div></SwiperSlide>
            <SwiperSlide>     <div className="text-center ">
                <img className='col-sm-12 col rounded' src="/MB7.JPG" alt="" />
                <h5 className="card-title text-white"></h5>
                <p className="card-text text-white"></p>
            </div></SwiperSlide>
        </Swiper>
    )
}