'use client';


import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slideshow.css'

interface Props {
  images: string[],
  title: string;
  className?: string;
}



export const ProductMobileSlideShow = ({ images, title, className }: Props) => {


  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          width: '100vw',
          height: '500px'
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        pagination
        modules={[FreeMode, Navigation, Pagination]}
        className="mySwiper2"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                width={600}
                height={500}
                alt={title}
                className='object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
