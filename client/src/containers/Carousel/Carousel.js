import React, { Component } from "react";
import "./Carousel.scss";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


export default class Carousel extends Component {

  render() {
    const renderSlides = () =>
      [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
        <div className='carousel-slide'>
          <h3>Slide {num}</h3>
          <p className='emojis'>🔬 🎦 🤡 🏦 💰</p>
          <p>********Sample Text For Display*******</p>
        </div>
      ))
    return (
      <div className='App'>
        <Slider
          dots={true}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2000}
        >
          {renderSlides()}
        </Slider>
      </div>)
  }
}
