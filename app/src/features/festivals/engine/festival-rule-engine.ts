/**
 * Festival Rule Engine
 * Evaluates rule-based lunar events (Ekadashi, Pradosha, Sankashti, Amavasya, Purnima)
 * and matches fixed/lunar festival calendar items to daily Panchang output.
 */

import { FestivalItem } from '@/types/festivals';
import { DailyPanchang } from '@/types/panchang';
import festivalsDataRaw from '@/data/festivals-data.json';

const festivalsDatabase = festivalsDataRaw as FestivalItem[];

/**
 * Returns all festivals active on a given DailyPanchang day.
 */
export function getFestivalsForDay(panchang: DailyPanchang): FestivalItem[] {
  const activeFestivals: FestivalItem[] = [];

  const tithiId = panchang.tithi.id;
  const paksha = panchang.tithi.paksha;
  const dateStr = panchang.date;

  for (const item of festivalsDatabase) {
    // 1. Check explicit fixed date match
    if (item.fixedDate2026 && item.fixedDate2026 === dateStr) {
      activeFestivals.push(item);
      continue;
    }

    // 2. Check rule-based recurring monthly events
    if (item.category === 'monthly_vrat' || item.category === 'lunar_marker') {
      if (item.id === 'ekadashi_vrat' && (tithiId === 11 || tithiId === 26)) {
        activeFestivals.push(item);
      } else if (item.id === 'pradosham_vrat' && (tithiId === 13 || tithiId === 28)) {
        activeFestivals.push(item);
      } else if (item.id === 'sankashti_chaturthi' && tithiId === 19) {
        activeFestivals.push(item);
      } else if (item.id === 'purnima_vrat' && tithiId === 15) {
        activeFestivals.push(item);
      } else if (item.id === 'amavasya_marker' && tithiId === 30) {
        activeFestivals.push(item);
      }
    }
  }

  return activeFestivals;
}

/**
 * Returns all registered festivals in the database.
 */
export function getAllFestivals(): FestivalItem[] {
  return festivalsDatabase;
}
