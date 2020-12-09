import React from "react";
import { Carousel, Image } from "react-bootstrap";

const CarouselSite = () => {
  return (
    <Carousel pause="hover" className="bg-black">
      <Carousel.Item>
        <Image src="/images/imgCarousel1.jpg" alt="img1" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>AAAA AAAAAAAAAAA AAAAAA</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/imgCarousel2.jpg" alt="img2" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>AAAA AAAAAAAAAAA AAAAAA</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/imgCarousel3.jpg" alt="img3" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>AAAA AAAAAAAAAAA AAAAAA</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselSite;
