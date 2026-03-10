import React from "react";

const WeatherCard = ({ weather }) => {

  const temp = weather.main.temp;
  const condition = weather.weather[0].description;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;

  return (
    <div className="weather-card">

      <h2>{weather.name}</h2>

      <p><strong>Temperature:</strong> {temp} °C</p>
      <p><strong>Condition:</strong> {condition}</p>
      <p><strong>Humidity:</strong> {humidity}%</p>
      <p><strong>Wind Speed:</strong> {wind} m/s</p>

    </div>
  );
};

export default WeatherCard;