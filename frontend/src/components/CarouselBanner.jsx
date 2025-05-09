// src/components/CarouselBanner.jsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '300px',
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const images = [
  './Article-img2-1024x576.png',
  '/V-blog-7-advetrisers-mistakes-blog-post-2023-02-10-cover.jpg',
];

const CarouselBanner = () => (
  <Carousel autoplay dotPosition="bottom" autoplaySpeed={3000} effect="scrollx">
    {images.map((img, i) => (
      <div key={i}>
        <img
          src={img}
          alt={`Ad ${i + 1}`}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
      </div>
    ))}
  </Carousel>
);

export default CarouselBanner;