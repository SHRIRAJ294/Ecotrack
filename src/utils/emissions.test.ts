import { describe, it, expect } from 'vitest';
import { calculateEmissions, calculateSavings, getGreenerAlternatives } from './emissions';

describe('Emissions Engine', () => {
  it('calculates emissions correctly for a car', () => {
    // 10 km * 0.192 kg/km = 1.92 kg
    expect(calculateEmissions(10, 'car')).toBeCloseTo(1.92);
  });

  it('calculates zero direct emissions for cycling and walking', () => {
    expect(calculateEmissions(15, 'cycling')).toBe(0);
    expect(calculateEmissions(5, 'walking')).toBe(0);
  });

  it('calculates savings compared to a car', () => {
    // Car = 10 * 0.192 = 1.92
    // Metro = 10 * 0.041 = 0.41
    // Savings = 1.92 - 0.41 = 1.51
    expect(calculateSavings(10, 'metro')).toBeCloseTo(1.51);
  });

  it('returns zero savings if mode is car', () => {
    expect(calculateSavings(20, 'car')).toBe(0);
  });

  it('returns correct greener alternatives for a car', () => {
    const alternatives = getGreenerAlternatives('car');
    expect(alternatives).toContain('bus');
    expect(alternatives).toContain('metro');
    expect(alternatives).toContain('cycling');
    expect(alternatives).toContain('walking');
    
    // Should be sorted by lowest emissions first
    expect(alternatives[0]).toBe('cycling'); // cycling/walking are tied at 0
  });

  it('returns no alternatives if mode is already zero emission', () => {
    const alternatives = getGreenerAlternatives('walking');
    expect(alternatives.length).toBe(0);
  });

  it('handles extremely large distances correctly', () => {
    // 10000 km * 0.192
    expect(calculateEmissions(10000, 'car')).toBeCloseTo(1920);
  });

  it('handles negative distances gracefully by returning 0', () => {
    expect(calculateEmissions(-50, 'car')).toBe(0);
  });
});
