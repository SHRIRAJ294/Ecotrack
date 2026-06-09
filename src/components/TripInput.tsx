import { useState } from 'react';
import type { TransportMode, Trip } from '../types';
import { Car, Bus, Train, Bike, Footprints, ArrowRight, Zap } from 'lucide-react';
import { getGreenerAlternatives, calculateEmissions } from '../utils/emissions';
import './TripInput.css';

interface TripInputProps {
  onAddTrip: (trip: Omit<Trip, 'id' | 'co2Emitted'>) => void;
}

const MODES: { value: TransportMode; label: string; icon: React.ReactNode }[] = [
  { value: 'car', label: 'Car', icon: <Car size={20} /> },
  { value: 'bus', label: 'Bus', icon: <Bus size={20} /> },
  { value: 'metro', label: 'Metro', icon: <Train size={20} /> },
  { value: 'cycling', label: 'Cycling', icon: <Bike size={20} /> },
  { value: 'walking', label: 'Walking', icon: <Footprints size={20} /> },
];

export const TripInput = ({ onAddTrip }: TripInputProps) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distanceKm, setDistanceKm] = useState<number | ''>('');
  const [mode, setMode] = useState<TransportMode>('car');
  
  // Real-time calculation state
  const currentEmissions = distanceKm ? calculateEmissions(Number(distanceKm), mode) : 0;
  const alternatives = getGreenerAlternatives(mode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !distanceKm) return;
    
    onAddTrip({
      origin,
      destination,
      distanceKm: Number(distanceKm),
      mode,
      date: new Date().toISOString()
    });

    // Reset form
    setOrigin('');
    setDestination('');
    setDistanceKm('');
    setMode('car');
  };

  return (
    <div className="trip-input-container animate-fade-in">
      <div className="glass-panel p-lg mb-lg">
        <h3 className="mb-md">Log a Trip</h3>
        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-group row">
            <div className="input-wrapper">
              <label>Origin</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Home"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label>Destination</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Office"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-lg">
            <label>Distance (km)</label>
            <input 
              type="number" 
              className="input-field" 
              placeholder="e.g. 5.2"
              step="0.1"
              min="0.1"
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value ? Number(e.target.value) : '')}
              required
            />
          </div>

          <div className="form-group mb-lg">
            <label>Transport Mode</label>
            <div className="mode-selector">
              {MODES.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  className={`mode-btn ${mode === m.value ? 'active' : ''}`}
                  onClick={() => setMode(m.value)}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Save Trip & Track Emissions <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {distanceKm && alternatives.length > 0 && (
        <div className="glass-panel p-lg suggestion-panel">
          <div className="suggestion-header">
            <Zap className="text-accent" size={24} />
            <h4>Greener Alternatives Available!</h4>
          </div>
          <p className="text-secondary mb-md">
            Consider switching your mode of transport to save more CO₂ on this route:
          </p>
          <div className="alternatives-list">
            {alternatives.map(alt => {
              const saved = currentEmissions - calculateEmissions(Number(distanceKm), alt);
              const altInfo = MODES.find(m => m.value === alt);
              return (
                <div key={alt} className="alternative-card" onClick={() => setMode(alt)}>
                  <div className="alt-icon">{altInfo?.icon}</div>
                  <div className="alt-details">
                    <p className="alt-name">{altInfo?.label}</p>
                    <p className="alt-savings text-success">Save {saved.toFixed(2)} kg CO₂</p>
                  </div>
                  <button type="button" className="btn btn-secondary btn-sm">Switch</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
