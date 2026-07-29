/**
 * High-Precision Astronomical & Ephemeris Engine for Hindu Calendar (Panchang)
 * Computes planetary positions, Lahiri Ayanamsa, Tithi, Nakshatra, Yoga, Karana, Samvatsara, and Ritu.
 */

import {
  Paksha,
  TithiInfo,
  NakshatraInfo,
  YogaInfo,
  KaranaInfo,
  SamvatsaraInfo,
  RituInfo,
  SauMasaInfo,
} from '@/features/panchang/types/panchang.types';

// Names Arrays
export const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya',
];

export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati',
];

export const NAKSHATRA_RULERS = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',
  'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Ketu',
  'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
  'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus',
  'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter',
  'Saturn', 'Mercury',
];

export const YOGA_NAMES = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shoola', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti',
];

export const SAMVATSARA_NAMES_60 = [
  'Prabhava', 'Vibhava', 'Shukla', 'Pramoda', 'Prajapati',
  'Angira', 'Shrimukha', 'Bhava', 'Yuva', 'Dhatri',
  'Eshwara', 'Bahudhanya', 'Pramathi', 'Vikrama', 'Vrushaprajna',
  'Chitrabanu', 'Subhanu', 'Tarana', 'Parthiva', 'Vyaya',
  'Sarvajit', 'Sarvadhari', 'Virodhi', 'Vikruthi', 'Khara',
  'Nandana', 'Vijaya', 'Jaya', 'Manmatha', 'Durmukhi',
  'Hevilambi', 'Vilambi', 'Vikari', 'Sharvari', 'Plava',
  'Shubhakrut', 'Shobhakrut', 'Krodhi', 'Visvavasu', 'Paridhavi',
  'Pramadicha', 'Ananda', 'Rakshasa', 'Nala', 'Pingala',
  'Kalayukti', 'Siddharthi', 'Roudri', 'Durmati', 'Dundubhi',
  'Rudhrodgari', 'Raktakshi', 'Krodhana', 'Kshaya', 'Akshaya',
  'Srimukha', 'Bhava', 'Yuva', 'Dhatri', 'Eshwara',
];

export const SAU_MASA_NAMES = [
  { name: 'Mesha', sign: 'Aries' },
  { name: 'Vrishabha', sign: 'Taurus' },
  { name: 'Mithuna', sign: 'Gemini' },
  { name: 'Karka', sign: 'Cancer' },
  { name: 'Simha', sign: 'Leo' },
  { name: 'Kanya', sign: 'Virgo' },
  { name: 'Tula', sign: 'Libra' },
  { name: 'Vrishchika', sign: 'Scorpio' },
  { name: 'Dhanu', sign: 'Sagittarius' },
  { name: 'Makara', sign: 'Capricorn' },
  { name: 'Kumbha', sign: 'Aquarius' },
  { name: 'Meena', sign: 'Pisces' },
];

export const RITU_LIST: Array<{ id: number; name: string; englishName: string }> = [
  { id: 1, name: 'Vasanta', englishName: 'Spring' },
  { id: 2, name: 'Grishma', englishName: 'Summer' },
  { id: 3, name: 'Varsha', englishName: 'Monsoon' },
  { id: 4, name: 'Sharad', englishName: 'Autumn' },
  { id: 5, name: 'Hemanta', englishName: 'Pre-Winter' },
  { id: 6, name: 'Shishira', englishName: 'Winter' },
];

// Helper Math utilities
function rad(deg: number): number {
  return (deg * Math.PI) / 180.0;
}

function deg(radVal: number): number {
  return (radVal * 180.0) / Math.PI;
}

function normalizeDeg(degrees: number): number {
  let mod = degrees % 360;
  if (mod < 0) mod += 360;
  return mod;
}

/**
 * Calculates Julian Day Number from a Date instance in UTC.
 */
export function getJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const dayFraction = (hours + minutes / 60 + seconds / 3600) / 24;

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);

  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + dayFraction + B - 1524.5;
  return JD;
}

/**
 * Calculates Lahiri Ayanamsa in degrees for a given Julian Day.
 */
export function getLahiriAyanamsa(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  // Lahiri Ayanamsa at J2000 is approx 23.85694 degrees (23° 51' 25")
  const ayanamsa = 23.856944 + 1.3960416 * T + 0.000308 * T * T;
  return ayanamsa;
}

/**
 * Calculates Apparent Tropical Longitude of Sun in degrees.
 */
export function getSunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mrad = rad(M);

  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
    0.000289 * Math.sin(3 * Mrad);

  const trueLong = L0 + C;
  return normalizeDeg(trueLong);
}

/**
 * Calculates Apparent Tropical Longitude of Moon in degrees.
 */
export function getMoonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  const Lpr = normalizeDeg(218.3165 + 481267.8813 * T);
  const M = normalizeDeg(357.5291 + 35999.0503 * T);
  const Mpr = normalizeDeg(134.9634 + 477198.8675 * T);
  const F = normalizeDeg(93.2721 + 483202.0175 * T);
  const D = normalizeDeg(297.8502 + 445267.1114 * T);

  // Periodic perturbation terms
  const l =
    6.288774 * Math.sin(rad(Mpr)) +
    1.274027 * Math.sin(rad(2 * D - Mpr)) +
    0.658314 * Math.sin(rad(2 * D)) +
    0.213618 * Math.sin(rad(2 * Mpr)) -
    0.185119 * Math.sin(rad(M)) -
    0.114332 * Math.sin(rad(2 * F)) +
    0.058793 * Math.sin(rad(2 * D - 2 * Mpr)) +
    0.057066 * Math.sin(rad(2 * D - M - Mpr)) +
    0.05332 * Math.sin(rad(2 * D + Mpr));

  return normalizeDeg(Lpr + l);
}

/**
 * Compute Tithi from Date
 */
export function computeTithi(date: Date): TithiInfo {
  const jd = getJulianDay(date);
  const sunLong = getSunLongitude(jd);
  const moonLong = getMoonLongitude(jd);

  const diffAngle = normalizeDeg(moonLong - sunLong);
  const tithiIndex = Math.floor(diffAngle / 12) + 1; // 1 to 30

  const name = TITHI_NAMES[tithiIndex - 1];
  const paksha: Paksha = tithiIndex <= 15 ? 'Shukla' : 'Krishna';
  const indexInPaksha = tithiIndex <= 15 ? tithiIndex : tithiIndex - 15;

  return {
    id: tithiIndex,
    name,
    paksha,
    indexInPaksha,
  };
}

/**
 * Compute Nakshatra from Date
 */
export function computeNakshatra(date: Date): NakshatraInfo {
  const jd = getJulianDay(date);
  const ayanamsa = getLahiriAyanamsa(jd);
  const moonTropical = getMoonLongitude(jd);
  const moonSidereal = normalizeDeg(moonTropical - ayanamsa);

  const nakshatraArc = 360 / 27; // 13.333333 degrees (13° 20')
  const index = Math.floor(moonSidereal / nakshatraArc) + 1; // 1 to 27
  const safeIndex = Math.min(Math.max(index, 1), 27);

  const posInNakshatra = moonSidereal % nakshatraArc;
  const pada = Math.floor(posInNakshatra / (nakshatraArc / 4)) + 1;

  return {
    id: safeIndex,
    name: NAKSHATRA_NAMES[safeIndex - 1],
    ruler: NAKSHATRA_RULERS[safeIndex - 1],
    pada,
  };
}

/**
 * Compute Yoga from Date
 */
export function computeYoga(date: Date): YogaInfo {
  const jd = getJulianDay(date);
  const ayanamsa = getLahiriAyanamsa(jd);

  const sunSidereal = normalizeDeg(getSunLongitude(jd) - ayanamsa);
  const moonSidereal = normalizeDeg(getMoonLongitude(jd) - ayanamsa);

  const sumSidereal = normalizeDeg(sunSidereal + moonSidereal);
  const yogaArc = 360 / 27;
  const index = Math.floor(sumSidereal / yogaArc) + 1;
  const safeIndex = Math.min(Math.max(index, 1), 27);

  return {
    id: safeIndex,
    name: YOGA_NAMES[safeIndex - 1],
  };
}

/**
 * Compute Karana from Date
 */
export function computeKarana(date: Date): KaranaInfo {
  const jd = getJulianDay(date);
  const sunLong = getSunLongitude(jd);
  const moonLong = getMoonLongitude(jd);

  const diffAngle = normalizeDeg(moonLong - sunLong);
  const karanaIndex = Math.floor(diffAngle / 6) + 1; // 1 to 60

  const movableKaranas = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];

  let name = '';
  let type: 'Movable' | 'Fixed' = 'Movable';

  if (karanaIndex === 1) {
    name = 'Kintughna';
    type = 'Fixed';
  } else if (karanaIndex >= 58) {
    if (karanaIndex === 58) name = 'Shakuni';
    else if (karanaIndex === 59) name = 'Chatushpada';
    else name = 'Naga';
    type = 'Fixed';
  } else {
    name = movableKaranas[(karanaIndex - 2) % 7];
    type = 'Movable';
  }

  return {
    id: karanaIndex,
    name,
    type,
  };
}

/**
 * Compute Samvatsara (60-year Jupiter cycle) and Vikram/Saka Samvat
 */
export function computeSamvatsara(date: Date): SamvatsaraInfo {
  const year = date.getFullYear();
  // Vikram Samvat is approx Year + 57 (after Chaitra Shukla Pratipada)
  const vikramSamvat = year + 57;
  const sakaSamvat = year - 78;

  // 60-year Samvatsara index
  const index = (vikramSamvat + 9) % 60;
  const safeIndex = index === 0 ? 60 : index;

  return {
    id: safeIndex,
    name: SAMVATSARA_NAMES_60[safeIndex - 1],
    vikramSamvat,
    sakaSamvat,
  };
}

/**
 * Compute Sau Māsa (Solar Month) & Ritu (Season)
 */
export function computeSauMasaAndRitu(date: Date): { sauMasa: SauMasaInfo; ritu: RituInfo } {
  const jd = getJulianDay(date);
  const ayanamsa = getLahiriAyanamsa(jd);
  const sunSidereal = normalizeDeg(getSunLongitude(jd) - ayanamsa);

  const signIndex = Math.floor(sunSidereal / 30); // 0 to 11
  const sauMasaData = SAU_MASA_NAMES[signIndex];

  const rituIndex = Math.floor(signIndex / 2); // 0 to 5
  const rituData = RITU_LIST[rituIndex];

  return {
    sauMasa: {
      id: signIndex + 1,
      name: sauMasaData.name,
      zodiacSign: sauMasaData.sign,
    },
    ritu: rituData,
  };
}
