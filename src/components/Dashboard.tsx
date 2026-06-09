import type React from 'react';
import type { UserStats } from '../types';
import { Leaf, Car, Activity, Map } from 'lucide-react';
import './Dashboard.css';

/**
 * Dashboard Component
 * Displays a high-level overview of the user's carbon footprint.
 * @param {Object} props - Component props
 * @param {UserStats} props.stats - The aggregated statistics for the user
 * @returns {React.ReactElement} The rendered dashboard
 */
export const Dashboard: React.FC<{ stats: UserStats }> = ({ stats }) => {
  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header mb-lg">
        <h2 className="text-gradient">Your Carbon Footprint</h2>
        <p className="text-secondary">Track your daily travel impact and see your savings.</p>
      </div>

      <div className="stats-grid mb-lg">
        <div className="stat-card glass-panel">
          <div className="stat-icon bg-red">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Emitted</p>
            <h3 className="stat-value">{stats.totalCo2Emitted.toFixed(1)} <span className="stat-unit">kg CO₂</span></h3>
          </div>
        </div>

        <div className="stat-card glass-panel highlight">
          <div className="stat-icon bg-green">
            <Leaf size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Saved</p>
            <h3 className="stat-value">{stats.totalCo2Saved.toFixed(1)} <span className="stat-unit">kg CO₂</span></h3>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon bg-blue">
            <Map size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Distance Logged</p>
            <h3 className="stat-value">{stats.totalDistance.toFixed(1)} <span className="stat-unit">km</span></h3>
          </div>
        </div>
      </div>

      <div className="recent-trips glass-panel">
        <h3 className="mb-md">Recent Trips</h3>
        {stats.trips.length === 0 ? (
          <p className="text-muted text-center py-lg">No trips logged yet. Start tracking your journey!</p>
        ) : (
          <div className="trip-list">
            {stats.trips.slice(0, 5).map(trip => (
              <div key={trip.id} className="trip-item">
                <div className="trip-icon">
                  <Car size={20} />
                </div>
                <div className="trip-details">
                  <p className="trip-route">{trip.origin} → {trip.destination}</p>
                  <p className="trip-meta text-muted">
                    {new Date(trip.date).toLocaleDateString()} • {trip.mode} • {trip.distanceKm} km
                  </p>
                </div>
                <div className="trip-emissions">
                  <span className={trip.co2Emitted > 0 ? "text-danger" : "text-success"}>
                    {trip.co2Emitted > 0 ? '+' : ''}{trip.co2Emitted.toFixed(2)} kg
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
