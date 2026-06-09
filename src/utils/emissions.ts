import type { TransportMode } from '../types';

// Emission factors in kg CO2 per passenger-kilometer
// Approximate values based on typical averages
export const EMISSION_FACTORS: Record<TransportMode, number> = {
  car: 0.192,     // Average petrol/diesel car
  bus: 0.105,     // Average local bus
  metro: 0.041,   // Electric rail / Metro
  cycling: 0,     // Zero direct emissions
  walking: 0,     // Zero direct emissions
};

/**
 * Calculates CO2 emissions for a given trip.
 * @param distanceKm Distance in kilometers
 * @param mode Transport mode used
 * @returns CO2 emitted in kg
 */
export const calculateEmissions = (distanceKm: number, mode: TransportMode): number => {
  return distanceKm * EMISSION_FACTORS[mode];
};

/**
 * Calculates potential CO2 saved compared to driving a car.
 * @param distanceKm Distance in kilometers
 * @param actualMode Transport mode used
 * @returns CO2 saved in kg
 */
export const calculateSavings = (distanceKm: number, actualMode: TransportMode): number => {
  if (actualMode === 'car') return 0;
  
  const carEmissions = calculateEmissions(distanceKm, 'car');
  const actualEmissions = calculateEmissions(distanceKm, actualMode);
  
  return Math.max(0, carEmissions - actualEmissions);
};

/**
 * Suggests greener alternatives based on the selected mode.
 */
export const getGreenerAlternatives = (currentMode: TransportMode): TransportMode[] => {
  const currentFactor = EMISSION_FACTORS[currentMode];
  
  return (Object.keys(EMISSION_FACTORS) as TransportMode[])
    .filter(mode => EMISSION_FACTORS[mode] < currentFactor)
    .sort((a, b) => EMISSION_FACTORS[a] - EMISSION_FACTORS[b]);
};
