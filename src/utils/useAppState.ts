import { useLocalStorage } from '../utils/useLocalStorage';
import type { Trip, UserStats } from '../types';
import { calculateSavings, calculateEmissions } from '../utils/emissions';

const INITIAL_STATS: UserStats = {
  totalCo2Emitted: 0,
  totalCo2Saved: 0,
  totalDistance: 0,
  trips: []
};

export const useAppState = () => {
  const [stats, setStats] = useLocalStorage<UserStats>('eco_tracker_stats', INITIAL_STATS);

  const addTrip = (trip: Omit<Trip, 'id' | 'co2Emitted'>) => {
    const { distanceKm, mode } = trip;
    
    // Calculate emissions and savings
    const co2Emitted = calculateEmissions(distanceKm, mode);
    const co2Saved = calculateSavings(distanceKm, mode);

    const newTrip: Trip = {
      ...trip,
      id: crypto.randomUUID(),
      co2Emitted
    };

    setStats(prev => ({
      totalCo2Emitted: prev.totalCo2Emitted + co2Emitted,
      totalCo2Saved: prev.totalCo2Saved + co2Saved,
      totalDistance: prev.totalDistance + distanceKm,
      trips: [newTrip, ...prev.trips]
    }));
  };

  const deleteTrip = (id: string) => {
    setStats(prev => {
      const tripToRemove = prev.trips.find(t => t.id === id);
      if (!tripToRemove) return prev;

      const co2SavedForTrip = calculateSavings(tripToRemove.distanceKm, tripToRemove.mode);

      return {
        totalCo2Emitted: prev.totalCo2Emitted - tripToRemove.co2Emitted,
        totalCo2Saved: prev.totalCo2Saved - co2SavedForTrip,
        totalDistance: prev.totalDistance - tripToRemove.distanceKm,
        trips: prev.trips.filter(t => t.id !== id)
      };
    });
  };

  return { stats, addTrip, deleteTrip };
};
