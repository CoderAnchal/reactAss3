import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";

const API_KEY = "f723edbcfe5d52ed374abdfa9196f53f";

const WeatherDashboard = () => {

  const [city, setCity] = useState("London");
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch weather data
  useEffect(() => {

    if (!city) return;

    const fetchWeather = async () => {
      try {

        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error("City not found");
        }

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

  }, [city]); // dependency array

  // Auto refresh every 60 seconds
  useEffect(() => {

    const interval = setInterval(() => {
      if (city) {
        setCity(prev => prev);
      }
    }, 60000);

    return () => clearInterval(interval); // cleanup

  }, [city]);

  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      setCity(searchCity);
    }
  };

  return (
    <div className="weather-container">

      <h1>Weather Dashboard</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />

        <button onClick={handleSearch}>
          Get Weather
        </button>
      </div>

      {loading && <p>Loading weather data...</p>}

      {error && <p className="error">{error}</p>}

      {weather && !loading && (
        <WeatherCard weather={weather} />
      )}

    </div>
  );
};

export default WeatherDashboard;