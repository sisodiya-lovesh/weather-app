import React, { useState } from 'react';
import axios from 'axios';
import './WeatherSearch.css';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '7ad2425e5186449e865173835242803';

  const fetchWeatherData = async () => {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
      loadingElement.style.display = 'block'; // Show loading indicator
    }

    setWeatherData(null);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    }
  };

  return (
    <div className="weather-app">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeatherData}>Search</button>
      <p className="loading" style={{ display: 'none' }}>Loading data…</p>
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <div><strong>Temperature</strong><br />{weatherData.current.temp_c}°C</div>
          </div>
          <div className="weather-card">
            <div><strong>Humidity</strong><br />{weatherData.current.humidity}%</div>
          </div>
          <div className="weather-card">
            <div><strong>Condition</strong><br />{weatherData.current.condition.text}</div>
          </div>
          <div className="weather-card">
            <div><strong>Wind Speed</strong><br />{weatherData.current.wind_kph} kph</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
