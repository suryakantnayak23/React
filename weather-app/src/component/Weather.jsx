import React, { useState } from 'react';
import axios from 'axios';
import '../Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_KEY = '4e9fe76498b844543f3ae1cfc70e5224';

    const getWeather = async () => {
        if (!city.trim()) {
            setError('Please enter a valid city name');
            setWeather(null);
            return;
        }

        setLoading(true);
        setError(null);
        setWeather(null);

        for (let i = 0; i < 3; i++) { // Retry 3 times
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                );
                setWeather(response.data);
                return; // Exit if successful
            } catch (err) {
                if (i < 2) { // Don't delay on the last attempt
                    await new Promise(res => setTimeout(res, 1000)); // 1-second delay between retries
                } else {
                    setError('Failed to fetch data after multiple attempts');
                }
            }
        }

        setLoading(false); // Stop the loading indicator
    };

    const getEmoji = (temp) => {
        if (temp > 35) return '🌞';
        if (temp > 30) return '😎';
        if (temp > 20) return '🌤️';
        return '🌧️';
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <button className="btn btn-primary btn-block" onClick={getWeather}>
                Get Weather
            </button>
            {error && <p className="mt-3 text-danger">{error}</p>}
            {weather && (
                <div className="mt-4">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp} °C {getEmoji(weather.main.temp)}</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity} %</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
