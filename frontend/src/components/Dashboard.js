import React, { useState } from 'react';
import './Dashboard.css';
import Weather from './Weather';
import CropRecommendations from './CropRecommendations';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('crops');

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>🌾 KrishiMitra AI</h1>
        </div>
        <div className="navbar-user">
          <span>Welcome, {user?.name}!</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'crops' ? 'active' : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            Crop Recommendations
          </button>
          <button
            className={`tab-btn ${activeTab === 'weather' ? 'active' : ''}`}
            onClick={() => setActiveTab('weather')}
          >
            Weather
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'crops' && <CropRecommendations />}
          {activeTab === 'weather' && <Weather />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
