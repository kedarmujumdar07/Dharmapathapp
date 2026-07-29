/**
 * Types for the Panchang & Festivals screen.
 * Extends the existing FestivalItem and DailyPanchang types from the project
 * with screen-specific display-ready shapes.
 */

import type { FestivalItem } from '@/features/festivals/types/festivals.types';

/** A festival card in the carousel — adds display-formatted fields on top of FestivalItem. */
export interface FestivalCardData {
  /** Index in the array, used as key and for sheet selection */
  index: number;
  /** Display date string, e.g. "Jul 29, 2026" */
  dateFormatted: string;
  /** Short name for the card header, e.g. "Guru Purnima" */
  shortName: string;
  /** Day number for the date badge, e.g. "29" */
  dayNumber: string;
  /** Ordinal suffix for the day, e.g. "th" */
  daySuffix: string;
  /** Month + year for badge, e.g. "July 2026" */
  monthYear: string;
  /** Full weekday name, e.g. "Wednesday" */
  weekday: string;
  /** Tithi name for the card info, e.g. "Ashadha Purnima" */
  tithiLabel: string;
  /** Short description line, e.g. "Honors spiritual Gurus & Maharishi Veda Vyasa" */
  shortDescription: string;
  /** Whether a DharmaPath lesson is available */
  hasLesson: boolean;
  /** Full significance text for the bottom sheet */
  significance: string;
  /** Subtitle for the sheet, e.g. "Ashadha Shukla Purnima • Jul 29, 2026" */
  sheetSubtitle: string;
  /** Original FestivalItem for any downstream needs */
  source: FestivalItem;
}

/** A single row in the panchang breakdown panel. */
export interface PanchangAttribute {
  /** Label, e.g. "Sunrise:" */
  label: string;
  /** Primary value text, e.g. "Trayodashi" or "05:40 AM" */
  value: string;
  /** Optional "upto" timestamp string, e.g. "upto 04:15 PM" */
  uptoTime?: string;
  /** Whether this value is a time that should respond to 12h/24h toggle */
  isTimeValue: boolean;
  /** Whether the primary value should be highlighted (hl class in CSS) */
  isHighlighted: boolean;
}

/** Active tab type */
export type PanchangTab = 'festival' | 'panchang';

/** Time format preference */
export type TimeFormatMode = '12h' | '24h';

/** Location option for the picker */
export interface LocationOption {
  label: string;
  name: string;
  latitude: number;
  longitude: number;
}
