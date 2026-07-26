/**
 * Diagnostic & Quality Assurance Suite for Panchang Engine Validation
 * Cross-checks calculated outputs against expected mathematical boundaries.
 */

import { getDailyPanchang, DEFAULT_LOCATION } from './panchang-service';

export interface ValidationReport {
  isValid: boolean;
  checksCount: number;
  failures: string[];
  samplePanchang: ReturnType<typeof getDailyPanchang>;
}

export function validatePanchangEngine(testDate: Date = new Date()): ValidationReport {
  const failures: string[] = [];
  let checksCount = 0;

  const panchang = getDailyPanchang(testDate, DEFAULT_LOCATION);

  // Check 1: Tithi range (1 to 30)
  checksCount++;
  if (panchang.tithi.id < 1 || panchang.tithi.id > 30) {
    failures.push(`Tithi ID out of range [1-30]: ${panchang.tithi.id}`);
  }

  // Check 2: Nakshatra range (1 to 27)
  checksCount++;
  if (panchang.nakshatra.id < 1 || panchang.nakshatra.id > 27) {
    failures.push(`Nakshatra ID out of range [1-27]: ${panchang.nakshatra.id}`);
  }

  // Check 3: Yoga range (1 to 27)
  checksCount++;
  if (panchang.yoga.id < 1 || panchang.yoga.id > 27) {
    failures.push(`Yoga ID out of range [1-27]: ${panchang.yoga.id}`);
  }

  // Check 4: Solar times non-empty
  checksCount++;
  if (!panchang.solarTimes.sunrise || !panchang.solarTimes.sunset) {
    failures.push('Sunrise or Sunset string is empty');
  }

  // Check 5: Muhurat timings existence
  checksCount++;
  if (!panchang.muhurat.rahuKalam.start || !panchang.muhurat.abhijit.start) {
    failures.push('Rahu Kalam or Abhijit timing is missing');
  }

  // Check 6: Choghadiya slots (8 slots)
  checksCount++;
  if (panchang.muhurat.choghadiya.length !== 8) {
    failures.push(`Expected 8 Choghadiya slots, got ${panchang.muhurat.choghadiya.length}`);
  }

  return {
    isValid: failures.length === 0,
    checksCount,
    failures,
    samplePanchang: panchang,
  };
}
