import React, { useState } from 'react';
import { weatherAPI } from '../api';
import { FaCloudSun, FaTint, FaWind } from 'react-icons/fa';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await weatherAPI.getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white/80 backdrop-blur border border-sky-50 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaCloudSun className="text-sky-500" />
        <h2 className="heading-sm">Quick Weather Check</h2>
      </div>

      <form onSubmit={fetchWeather} className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="flex-1 input-base"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary sm:w-auto w-full"
        >
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>
      </form>

      {error && (
        <div className="mb-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {weather && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-sky-50 p-3">
            <p className="text-xs text-gray-600">Location</p>
            <p className="text-lg font-semibold text-gray-900">{weather.city}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">
              {weather.description}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 flex items-center gap-3">
            <span className="text-2xl">🌡️</span>
            <div>
              <p className="text-xs text-gray-600">Temperature</p>
              <p className="text-xl font-bold text-emerald-700">
                {weather.temperature}°C
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-indigo-50 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <FaTint className="text-sky-500" />
              <div>
                <p className="text-xs text-gray-600">Humidity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {weather.humidity}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaWind className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-600">Wind (approx)</p>
                <p className="text-sm font-semibold text-gray-900">12 km/h</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
