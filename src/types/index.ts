export type TransportMode = 'car' | 'bus' | 'metro' | 'cycling' | 'walking';

export interface Trip {
  id: string;
  date: string; // ISO string
  distanceKm: number;
  mode: TransportMode;
  origin: string;
  destination: string;
  co2Emitted: number; // in kg
}

export interface UserStats {
  totalCo2Emitted: number; // kg
  totalCo2Saved: number; // kg (compared to if all trips were by car)
  totalDistance: number; // km
  trips: Trip[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarUrl?: string;
  co2Saved: number; // kg
  rank: number;
}
