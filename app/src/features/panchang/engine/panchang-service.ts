/**
 * Panchang Engine Master Service
 * Aggregates Ephemeris, Transitions, Solar position, and Muhurats into a unified DailyPanchang object.
 */

import { DailyPanchang, LocationInput } from '@/types/panchang';
import {
  computeTithi,
  computeNakshatra,
  computeYoga,
  computeKarana,
  computeSamvatsara,
  computeSauMasaAndRitu,
} from './ephemeris-engine';
import {
  findTithiTransition,
  findNakshatraTransition,
  findYogaTransition,
} from './transition-finder';
import { calculateSolarTimes, calculateMuhurats } from './muhurat-calculator';

export const DEFAULT_LOCATION: LocationInput = {
  latitude: 28.6139, // New Delhi
  longitude: 77.209,
  timezoneOffsetMinutes: 330, // IST (+5:30)
  name: 'New Delhi, India',
};

/**
 * Returns comprehensive Daily Panchang calculations for a given Date and Geolocation.
 */
export function getDailyPanchang(
  date: Date = new Date(),
  location: LocationInput = DEFAULT_LOCATION
): DailyPanchang {
  const tzOffset = location.timezoneOffsetMinutes ?? 330;

  // 1. Compute Base Solar Times
  const solarTimes = calculateSolarTimes(date, location);

  // 2. Base Ephemeris Computations at Sunrise (or input time)
  const tithi = computeTithi(date);
  const nakshatra = computeNakshatra(date);
  const yoga = computeYoga(date);
  const karana = computeKarana(date);
  const samvatsara = computeSamvatsara(date);
  const { sauMasa, ritu } = computeSauMasaAndRitu(date);

  // 3. Compute Transitions ("upto" times)
  const tithiTrans = findTithiTransition(date, tzOffset);
  if (tithiTrans.hasTransition && tithiTrans.transitionTime) {
    tithi.endTimestamp = `Until ${tithiTrans.transitionTime}`;
  } else {
    tithi.endTimestamp = 'Spans full day';
  }

  const nakTrans = findNakshatraTransition(date, tzOffset);
  if (nakTrans.hasTransition && nakTrans.transitionTime) {
    nakshatra.endTimestamp = `Until ${nakTrans.transitionTime}`;
  } else {
    nakshatra.endTimestamp = 'Spans full day';
  }

  const yogaTrans = findYogaTransition(date, tzOffset);
  if (yogaTrans.hasTransition && yogaTrans.transitionTime) {
    yoga.endTimestamp = `Until ${yogaTrans.transitionTime}`;
  } else {
    yoga.endTimestamp = 'Spans full day';
  }

  // 4. Compute Muhurats & Choghadiya
  const muhurat = calculateMuhurats(date, location, solarTimes);

  // 5. Format ISO date string YYYY-MM-DD
  const dateStr = date.toISOString().split('T')[0];

  return {
    date: dateStr,
    location,
    solarTimes,
    tithi,
    nakshatra,
    yoga,
    karana,
    samvatsara,
    ritu,
    sauMasa,
    muhurat,
  };
}
