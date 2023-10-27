import React from "react";
export default function WeatherBox({ weather }) {
    
  return (
    <div className="weather-box">
    
      <div> {weather !== null ? weather.name : ""} </div>
      <h2>
        {" "}
        {weather !== null ? weather.main.temp : ""}'C/{" "}
        {weather.main.temp * 1.8 + 32}'F{" "}
      </h2>
      <h3>{weather.weather[0].description}</h3>
    </div>
  );
}
