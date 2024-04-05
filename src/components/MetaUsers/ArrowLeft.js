import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ArrowLeft = ({ previousSlide }) => (
  <FaArrowLeft onClick={previousSlide} className="carousel-arrow-left" />
);

export default ArrowLeft;
