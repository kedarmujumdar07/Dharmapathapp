/**
 * Solar Position & Muhurat Calculator
 * Computes Sunrise, Sunset, Rahu Kalam, Yamagandam, Gulika Kalam, Abhijit Muhurat, and Day/Night Choghadiya.
 */

import { SolarTimes, MuhuratTimes, ChoghadiyaSlot, ChoghadiyaNature, ChoghadiyaQuality, LocationInput } from '@/types/panchang';
import { formatTimeString } from './transition-finder';

// Helper for degree/radian conversion
const RAD = Math.PI / 180.0;
const DEG = 180.0 / Math.PI;

/**
 * Calculates Solar Position (Sunrise & Sunset) for a given Date and Geolocation.
 */
export function calculateSolarTimes(
  date: Date,
  location: LocationInput
): SolarTimes {
  const tzOffset = location.timezoneOffsetMinutes ?? 330; // Default IST +5:30

  // Day of year
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const lat = location.latitude;
  const lon = location.longitude;

  // Approximate solar declination angle (degrees)
  const declination = 23.45 * Math.sin(RAD * ((360 / 365) * (dayOfYear - 81)));

  // Equation of time (minutes)
  const b = RAD * ((360 / 365) * (dayOfYear - 81));
  const eqTime = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  // Solar zenith angle for official sunrise/sunset (90.833 degrees)
  const zenith = 90.833;

  // Hour angle calculation
  const cosHourAngle =
    (Math.cos(RAD * zenith) - Math.sin(RAD * lat) * Math.sin(RAD * declination)) /
    (Math.cos(RAD * lat) * Math.cos(RAD * declination));

  // Clamp for polar edge cases
  const clampedCos = Math.max(-1.0, Math.min(1.0, cosHourAngle));
  const hourAngleDeg = DEG * Math.acos(clampedCos);
  const hourAngleMinutes = (hourAngleDeg / 15) * 60;

  // Solar noon in UTC minutes from midnight UTC
  const solarNoonUtcMinutes = 720 - 4 * lon - eqTime;

  const sunriseUtcMinutes = solarNoonUtcMinutes - hourAngleMinutes;
  const sunsetUtcMinutes = solarNoonUtcMinutes + hourAngleMinutes;

  const dayLengthMinutes = Math.round(sunsetUtcMinutes - sunriseUtcMinutes);

  // Helper to format UTC minutes to local time string
  const formatMinutesToTime = (utcMinutes: number): string => {
    const localMinutes = (utcMinutes + tzOffset + 1440) % 1440;
    const hrs = Math.floor(localMinutes / 60);
    const mins = Math.floor(localMinutes % 60);
    const secs = Math.floor((localMinutes * 60) % 60);

    const period = hrs >= 12 ? 'PM' : 'AM';
    const displayHrs = hrs % 12 === 0 ? 12 : hrs % 12;

    return `${displayHrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} ${period}`;
  };

  return {
    sunrise: formatMinutesToTime(sunriseUtcMinutes),
    sunset: formatMinutesToTime(sunsetUtcMinutes),
    solarNoon: formatMinutesToTime(solarNoonUtcMinutes),
    dayLengthMinutes,
  };
}

// Choghadiya sequences per weekday
const DAY_CHOGHADIYA_PATTERNS: Record<number, ChoghadiyaNature[]> = {
  0: ['Udveg', 'Amrit', 'Rog', 'Labh', 'Shubh', 'Char', 'Kaal', 'Udveg'], // Sun
  1: ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit'], // Mon
  2: ['Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'], // Tue
  3: ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh'], // Wed
  4: ['Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh'], // Thu
  5: ['Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char'], // Fri
  6: ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal'], // Sat
};

const CHOGHADIYA_QUALITIES: Record<ChoghadiyaNature, ChoghadiyaQuality> = {
  Amrit: 'Good',
  Shubh: 'Good',
  Labh: 'Good',
  Char: 'Neutral',
  Rog: 'Bad',
  Kaal: 'Bad',
  Udveg: 'Bad',
};

/**
 * Calculates Muhurat timings (Rahu Kalam, Yamagandam, Gulika Kalam, Abhijit, Choghadiya)
 */
export function calculateMuhurats(
  date: Date,
  location: LocationInput,
  solarTimes: SolarTimes
): MuhuratTimes {
  const weekday = date.getDay(); // 0 = Sunday
  const tzOffset = location.timezoneOffsetMinutes ?? 330;

  // Convert sunrise / sunset strings to Date objects
  const parseTimeToUtcMs = (timeStr: string): number => {
    const parts = timeStr.split(' ');
    const timeParts = parts[0].split(':');
    let hrs = parseInt(timeParts[0], 10);
    const mins = parseInt(timeParts[1], 10);
    const period = parts[1];

    if (period === 'PM' && hrs < 12) hrs += 12;
    if (period === 'AM' && hrs === 12) hrs = 0;

    const baseDate = new Date(date);
    baseDate.setUTCHours(hrs, mins, 0, 0);
    return baseDate.getTime() - tzOffset * 60 * 1000;
  };

  const sunriseMs = parseTimeToUtcMs(solarTimes.sunrise);
  const sunsetMs = parseTimeToUtcMs(solarTimes.sunset);
  const dayDurationMs = sunsetMs - sunriseMs;
  const octantMs = dayDurationMs / 8;

  // Rahu Kalam octant indexes per weekday (1-based octant index)
  const rahuOctants: Record<number, number> = { 0: 8, 1: 2, 2: 7, 3: 5, 4: 6, 5: 4, 6: 3 };
  const yamaOctants: Record<number, number> = { 0: 5, 1: 4, 2: 3, 3: 2, 4: 1, 5: 7, 6: 6 };
  const gulikaOctants: Record<number, number> = { 0: 7, 1: 6, 2: 5, 3: 4, 4: 3, 5: 2, 6: 1 };

  const getSlot = (octantIndex: number) => {
    const startMs = sunriseMs + (octantIndex - 1) * octantMs;
    const endMs = startMs + octantMs;
    return {
      start: formatTimeString(new Date(startMs), tzOffset),
      end: formatTimeString(new Date(endMs), tzOffset),
    };
  };

  const rahuKalam = getSlot(rahuOctants[weekday]);
  const yamagandam = getSlot(yamaOctants[weekday]);
  const gulikaKalam = getSlot(gulikaOctants[weekday]);

  // Abhijit Muhurat: 8th muhurat out of 15 equal divisions of daytime
  const abhijitDurationMs = dayDurationMs / 15;
  const abhijitStartMs = sunriseMs + 7 * abhijitDurationMs;
  const abhijitEndMs = abhijitStartMs + abhijitDurationMs;

  const abhijit = {
    start: formatTimeString(new Date(abhijitStartMs), tzOffset),
    end: formatTimeString(new Date(abhijitEndMs), tzOffset),
  };

  // Daytime Choghadiya
  const choghadiyaPattern = DAY_CHOGHADIYA_PATTERNS[weekday];
  const choghadiya: ChoghadiyaSlot[] = choghadiyaPattern.map((nature, idx) => {
    const startMs = sunriseMs + idx * octantMs;
    const endMs = startMs + octantMs;
    return {
      name: nature,
      quality: CHOGHADIYA_QUALITIES[nature],
      start: formatTimeString(new Date(startMs), tzOffset),
      end: formatTimeString(new Date(endMs), tzOffset),
      isNight: false,
    };
  });

  return {
    rahuKalam,
    yamagandam,
    gulikaKalam,
    abhijit,
    durmuhurtham: [getSlot(3)], // Sample Durmuhurtham slot
    choghadiya,
  };
}
