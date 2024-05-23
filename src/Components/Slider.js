import React, { useState, useEffect } from "react";
import "./Slider.css";

const SliderComponent = ({passwordLength,setPasswordLength}) => {


  const handleSliderChange = (event) => {
    setPasswordLength(event.target.value);
  };

  useEffect(() => {
    const slider = document.getElementById("range-slider");
    const value =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.backgroundSize = `${value}% 100%`;
  }, [passwordLength]);

  return (
    <div className="slider-wrapper">
    <div className="slider-content">
          <p className="rangeValue1">Character Length</p>
          <p className="rangeValue2">{passwordLength}</p>
        </div>
    <div className="slider">
      <input
        type="range"
        className="range-slider"
        min={0}
        max={20}
        value={passwordLength}
        onChange={handleSliderChange}
        id="range-slider"
      />
    </div>
    </div>
  );
};

export default SliderComponent;
