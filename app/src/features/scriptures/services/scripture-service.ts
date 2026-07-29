/**
 * Scripture Library Master Service
 * Provides filtering, searching, and category-indexed retrieval across Bhagavad Gita, Stotras, and Veda Mantras.
 */

import { ShlokaItem, ScriptureCategory, ScriptureDeity, Translation } from '@/features/scriptures/types/scripture.types';
import gitaDataRaw from '@/features/scriptures/data/gita-data.json';
import stotrasDataRaw from '@/features/scriptures/data/stotras-data.json';
import mantrasDataRaw from '@/features/scriptures/data/mantras-data.json';

const gitaItems = gitaDataRaw as ShlokaItem[];
const stotraItems = stotrasDataRaw as ShlokaItem[];
const mantraItems = mantrasDataRaw as ShlokaItem[];

const allScriptureItems: ShlokaItem[] = [...gitaItems, ...stotraItems, ...mantraItems];

/**
 * Returns all scripture items.
 */
export function getAllScriptures(): ShlokaItem[] {
  return allScriptureItems;
}

/**
 * Filters scriptures by category ('gita' | 'stotra' | 'mantra')
 */
export function getScripturesByCategory(category: ScriptureCategory): ShlokaItem[] {
  return allScriptureItems.filter((item) => item.category === category);
}

/**
 * Filters scriptures by deity ('shiva' | 'vishnu' | 'devi' | 'ganesha' | etc.)
 */
export function getScripturesByDeity(deity: ScriptureDeity): ShlokaItem[] {
  return allScriptureItems.filter((item) => item.deity === deity);
}

/**
 * Full-text search across Sanskrit text, IAST transliteration, and English/Hindi titles.
 */
export function searchScriptures(query: string): ShlokaItem[] {
  if (!query.trim()) return allScriptureItems;

  const q = query.toLowerCase();
  return allScriptureItems.filter((item) => {
    const titleMatch =
      item.title.english.toLowerCase().includes(q) ||
      item.title.iast.toLowerCase().includes(q) ||
      item.title.sanskrit.includes(q);

    const textMatch =
      item.sanskrit_text.includes(q) ||
      item.iast_transliteration.toLowerCase().includes(q);

    const transMatch = item.translations.some((t: Translation) => t.text.toLowerCase().includes(q));

    return titleMatch || textMatch || transMatch;
  });
}
