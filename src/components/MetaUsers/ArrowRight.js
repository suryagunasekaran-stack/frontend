import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ArrowRight = ({ nextSlide }) => (
  <FaArrowRight onClick={nextSlide} className="carousel-arrow-right" />
);

export default ArrowRight;