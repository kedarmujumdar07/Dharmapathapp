/**
 * Root-finding & Binary Search Solver for Tithi, Nakshatra, and Yoga Transition Times ("Upto" times)
 */

import { computeTithi, computeNakshatra, computeYoga, computeKarana } from './ephemeris-engine';

export interface TransitionResult {
  hasTransition: boolean;
  transitionTime?: string; // Formatted e.g. "04:25 PM"
  transitionDate?: Date;
  nextName?: string;
}

/**
 * Formats a Date object to local time string (e.g., "04:25 PM")
 */
export function formatTimeString(date: Date, timezoneOffsetMinutes: number = 330): string {
  // Adjust date for local timezone offset
  const localTime = new Date(date.getTime() + timezoneOffsetMinutes * 60 * 1000);
  const hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const padMin = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${displayHours.toString().padStart(2, '0')}:${padMin} ${period}`;
}

/**
 * Finds the exact timestamp when Tithi transitions during the 24-hour day window starting at sunrise or midnight.
 */
export function findTithiTransition(
  dayStartUtc: Date,
  timezoneOffsetMinutes: number = 330
): TransitionResult {
  const windowMs = 24 * 60 * 60 * 1000;
  const dayEndUtc = new Date(dayStartUtc.getTime() + windowMs);

  const startTithi = computeTithi(dayStartUtc);
  const endTithi = computeTithi(dayEndUtc);

  if (startTithi.id === endTithi.id) {
    return {
      hasTransition: false,
    };
  }

  // Binary search for transition timestamp
  let low = dayStartUtc.getTime();
  let high = dayEndUtc.getTime();

  // Bisection loop (12 iterations gives precision under 1 minute)
  for (let i = 0; i < 12; i++) {
    const mid = Math.floor((low + high) / 2);
    const midTithi = computeTithi(new Date(mid));

    if (midTithi.id === startTithi.id) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const transitionDate = new Date(high);
  const nextTithi = computeTithi(transitionDate);

  return {
    hasTransition: true,
    transitionDate,
    transitionTime: formatTimeString(transitionDate, timezoneOffsetMinutes),
    nextName: nextTithi.name,
  };
}

/**
 * Finds the exact timestamp when Nakshatra transitions during the 24-hour day window.
 */
export function findNakshatraTransition(
  dayStartUtc: Date,
  timezoneOffsetMinutes: number = 330
): TransitionResult {
  const windowMs = 24 * 60 * 60 * 1000;
  const dayEndUtc = new Date(dayStartUtc.getTime() + windowMs);

  const startNak = computeNakshatra(dayStartUtc);
  const endNak = computeNakshatra(dayEndUtc);

  if (startNak.id === endNak.id) {
    return {
      hasTransition: false,
    };
  }

  let low = dayStartUtc.getTime();
  let high = dayEndUtc.getTime();

  for (let i = 0; i < 12; i++) {
    const mid = Math.floor((low + high) / 2);
    const midNak = computeNakshatra(new Date(mid));

    if (midNak.id === startNak.id) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const transitionDate = new Date(high);
  const nextNak = computeNakshatra(transitionDate);

  return {
    hasTransition: true,
    transitionDate,
    transitionTime: formatTimeString(transitionDate, timezoneOffsetMinutes),
    nextName: nextNak.name,
  };
}

/**
 * Finds the exact timestamp when Yoga transitions during the 24-hour day window.
 */
export function findYogaTransition(
  dayStartUtc: Date,
  timezoneOffsetMinutes: number = 330
): TransitionResult {
  const windowMs = 24 * 60 * 60 * 1000;
  const dayEndUtc = new Date(dayStartUtc.getTime() + windowMs);

  const startYoga = computeYoga(dayStartUtc);
  const endYoga = computeYoga(dayEndUtc);

  if (startYoga.id === endYoga.id) {
    return {
      hasTransition: false,
    };
  }

  let low = dayStartUtc.getTime();
  let high = dayEndUtc.getTime();

  for (let i = 0; i < 12; i++) {
    const mid = Math.floor((low + high) / 2);
    const midYoga = computeYoga(new Date(mid));

    if (midYoga.id === startYoga.id) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const transitionDate = new Date(high);
  const nextYoga = computeYoga(transitionDate);

  return {
    hasTransition: true,
    transitionDate,
    transitionTime: formatTimeString(transitionDate, timezoneOffsetMinutes),
    nextName: nextYoga.name,
  };
}
