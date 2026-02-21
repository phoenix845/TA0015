import React, { useState } from 'react';
import { cropAPI } from '../api';
import { FaLeaf, FaCloudSun, FaMapMarkerAlt } from 'react-icons/fa';

const CropRecommendations = () => {
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await cropAPI.getCropWithWeather(city);
      setRecommendations(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white/80 backdrop-blur border border-emerald-50 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <FaLeaf className="text-emerald-600" />
        <h2 className="heading-sm">Smart Crop &amp; Weather Match</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-base flex items-center gap-2">
              <FaLeaf /> Soil Type
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              required
              className="select-base border-2 border-gray-200 focus:border-emerald-500"
            >
              <option value="">Select Soil Type</option>
              <option value="black">Black Soil</option>
              <option value="red">Red Soil</option>
              <option value="loam">Loam</option>
            </select>
          </div>

          <div>
            <label className="label-base flex items-center gap-2">
              <FaCloudSun className="text-yellow-500" /> Season
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
              className="select-base border-2 border-gray-200 focus:border-emerald-500"
            >
              <option value="">Select Season</option>
              <option value="kharif">Kharif (Monsoon)</option>
              <option value="rabi">Rabi (Winter)</option>
              <option value="summer">Summer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-base flex items-center gap-2">
              <FaMapMarkerAlt /> Location
            </label>
            <input
              type="text"
              placeholder="Village / District"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="input-base"
            />
          </div>

          <div>
            <label className="label-base flex items-center gap-2">
              <FaCloudSun /> City (for weather)
            </label>
            <input
              type="text"
              placeholder="Nearest city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="input-base"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-2"
        >
          {loading ? 'Getting Recommendations...' : 'Get Smart Recommendations'}
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {recommendations && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((crop, index) => (
            <div
              key={index}
              className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4"
            >
              <h3 className="text-sm font-semibold text-emerald-800 mb-1">
                Recommendation #{index + 1}
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Crops: </span>
                {crop.recommendedCrops?.join(', ') || 'N/A'}
              </p>
              {crop.weather && (
                <div className="mt-2 text-xs text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Weather: </span>
                    {crop.weather.temperature}°C, {crop.weather.humidity}% humidity
                  </p>
                  <p>
                    <span className="font-semibold">Advice: </span>
                    {crop.advice}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropRecommendations;
