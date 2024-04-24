import React, { useState } from "react";

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <img src={images[index]} alt="" />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default ImageSlider;

