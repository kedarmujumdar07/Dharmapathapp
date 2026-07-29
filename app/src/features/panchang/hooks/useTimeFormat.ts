/**
 * Hook for 12h/24h time format toggling.
 * Provides the current format preference and a formatter function
 * that converts "HH:MM AM/PM" strings accordingly.
 */

import { useState, useCallback, useMemo } from 'react';
import type { TimeFormatMode } from '@/features/panchang/types/panchang-screen.types';

interface UseTimeFormatReturn {
  /** Current format mode */
  format: TimeFormatMode;
  /** Toggle to 12h */
  set12h: () => void;
  /** Toggle to 24h */
  set24h: () => void;
  /** Format a time string. Accepts "HH:MM AM/PM" 12h input or "HH:MM" 24h input. */
  formatTime: (timeStr: string) => string;
}

/**
 * Converts a 12-hour time string like "05:40 AM" or "07:15 PM" to 24-hour "17:15".
 */
function to24h(timeStr: string): string {
  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) {
    // Already 24h or unrecognized — return as-is
    return trimmed;
  }
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[4].toUpperCase();

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

/**
 * Converts a 24-hour time string like "17:15" to 12-hour "05:15 PM".
 */
function to12h(timeStr: string): string {
  const trimmed = timeStr.trim();
  // Check if already in 12h format
  if (/AM|PM/i.test(trimmed)) return trimmed;

  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return trimmed;

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = hours >= 12 ? 'PM' : 'AM';

  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;

  return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
}

export function useTimeFormat(initialFormat: TimeFormatMode = '12h'): UseTimeFormatReturn {
  const [format, setFormat] = useState<TimeFormatMode>(initialFormat);

  const set12h = useCallback(() => setFormat('12h'), []);
  const set24h = useCallback(() => setFormat('24h'), []);

  const formatTime = useCallback(
    (timeStr: string): string => {
      if (format === '24h') {
        return to24h(timeStr);
      }
      return to12h(timeStr);
    },
    [format]
  );

  return useMemo(
    () => ({ format, set12h, set24h, formatTime }),
    [format, set12h, set24h, formatTime]
  );
}
