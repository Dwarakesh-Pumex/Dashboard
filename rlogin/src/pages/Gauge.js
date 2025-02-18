import React, { useState, useEffect } from 'react';
import './Gauge'; 

const Gauge = ({ value }) => {
  const maxValue = 100;

 
  const rotationAngle = (value / maxValue) * 180;

  return (
    <div className="gauge">
      <div className="dotted-circle">
        <span id="gauge-value">{value}</span>
      </div>
      <div
        className="gauge-needle"
        style={{ transform: `rotate(${90 + rotationAngle}deg)` }}
      />
    </div>
  );
};

export default Gauge;
