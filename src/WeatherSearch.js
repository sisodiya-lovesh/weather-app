import React, { useState } from 'react';
import axios from 'axios';
import './WeatherSearch.css';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '7ad2425e5186449e865173835242803';

  const fetchWeatherData = async () => {
    setLoading(true);
    setWeatherData(null);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (error) {
     alert('Failed to fetch weather data');
    }
    setLoading(false);
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
      {loading && <p className="loading">Loading data…</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p><strong>Temperature</strong><br />{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p><strong>Humidity</strong><br />{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p><strong>Condition</strong><br />{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p><strong>Wind Speed</strong><br />{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
