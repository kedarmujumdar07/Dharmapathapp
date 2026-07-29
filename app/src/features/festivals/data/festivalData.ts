/**
 * Festival display data for the carousel and bottom sheet.
 * Matches the five festivals in the HTML mockup exactly,
 * with significance text from the mockup's JS festivalData array.
 */

import type { FestivalCardData } from '@/features/panchang/types/panchang-screen.types';
import type { FestivalItem } from '@/features/festivals/types/festivals.types';
import festivalsDataRaw from '@/features/festivals/data/festivals-data.json';

const allFestivals = festivalsDataRaw as FestivalItem[];

/** Helper to find a FestivalItem by id, with fallback */
function findFestival(id: string): FestivalItem {
  const found = allFestivals.find((f) => f.id === id);
  if (!found) {
    throw new Error(`Festival "${id}" not found in festivals-data.json`);
  }
  return found;
}

/**
 * Pre-built festival cards for the carousel.
 * The display strings match the HTML mockup verbatim.
 * In production, these would be computed from the panchang engine;
 * for now they're static to match the reference design.
 */
export const festivalCarouselData: FestivalCardData[] = [
  {
    index: 0,
    dateFormatted: 'Jul 29, 2026',
    shortName: 'Guru Purnima',
    dayNumber: '29',
    daySuffix: 'th',
    monthYear: 'July 2026',
    weekday: 'Wednesday',
    tithiLabel: 'Ashadha Purnima',
    shortDescription: 'Honors spiritual Gurus & Maharishi Veda Vyasa',
    hasLesson: true,
    significance:
      'Guru Purnima honors spiritual and academic teachers (Gurus) who guide seekers from darkness (Gu) to light (Ru). It celebrates the birth anniversary of Maharishi Veda Vyasa, compiler of the Vedas, Puranas, and Mahabharata. Devotees fast, recite Guru Gita, and seek blessings for spiritual progress.',
    sheetSubtitle: 'Ashadha Shukla Purnima • Jul 29, 2026',
    source: findFestival('guru_purnima'),
  },
  {
    index: 1,
    dateFormatted: 'Aug 28, 2026',
    shortName: 'Raksha Bandhan',
    dayNumber: '28',
    daySuffix: 'th',
    monthYear: 'August 2026',
    weekday: 'Friday',
    tithiLabel: 'Shravana Purnima',
    shortDescription: 'Sacred bond of protection between siblings',
    hasLesson: true,
    significance:
      'Raksha Bandhan celebrates the sacred bond of protection and unconditional love between brothers and sisters. Sisters tie the sacred thread (Rakhi) on their brothers\' wrists, praying for their long life and well-being, while brothers pledge lifelong protection.',
    sheetSubtitle: 'Shravana Shukla Purnima • Aug 28, 2026',
    source: findFestival('raksha_bandhan'),
  },
  {
    index: 2,
    dateFormatted: 'Sep 04, 2026',
    shortName: 'Janmashtami',
    dayNumber: '04',
    daySuffix: 'th',
    monthYear: 'Sept 2026',
    weekday: 'Friday',
    tithiLabel: 'Bhadrapada Ashtami',
    shortDescription: 'Birth anniversary of Bhagavan Shri Krishna',
    hasLesson: true,
    significance:
      'Janmashtami marks the auspicious birth of Lord Krishna, the 8th avatar of Lord Vishnu and divine speaker of the Bhagavad Gita. Celebrated with midnight pujas, devotional bhajans, Dahi Handi processions, and fasts until midnight.',
    sheetSubtitle: 'Bhadrapada Krishna Ashtami • Sep 04, 2026',
    source: findFestival('krishna_janmashtami'),
  },
  {
    index: 3,
    dateFormatted: 'Sep 14, 2026',
    shortName: 'Ganesh Chaturthi',
    dayNumber: '14',
    daySuffix: 'th',
    monthYear: 'Sept 2026',
    weekday: 'Monday',
    tithiLabel: 'Bhadrapada Chaturthi',
    shortDescription: 'Arrival of Lord Ganesha, remover of obstacles',
    hasLesson: true,
    significance:
      'Ganesh Chaturthi celebrates the arrival of Lord Ganesha, the lord of wisdom, prosperity, and remover of obstacles. Devotees install handcrafted clay Ganesha idols, offer Modak, chant Atharvashirsha, and observe 10 days of devotion.',
    sheetSubtitle: 'Bhadrapada Shukla Chaturthi • Sep 14, 2026',
    source: findFestival('ganesh_chaturthi'),
  },
  {
    index: 4,
    dateFormatted: 'Nov 08, 2026',
    shortName: 'Diwali',
    dayNumber: '08',
    daySuffix: 'th',
    monthYear: 'Nov 2026',
    weekday: 'Sunday',
    tithiLabel: 'Kartika Amavasya',
    shortDescription: 'Festival of lights & Lakshmi Puja',
    hasLesson: true,
    significance:
      'Diwali is the festival of lights celebrating the victory of light over darkness, wisdom over ignorance, and Lord Rama\'s triumphant return to Ayodhya. Devotees perform Lakshmi Puja, light diyas, and exchange sweets.',
    sheetSubtitle: 'Kartika Krishna Amavasya • Nov 08, 2026',
    source: findFestival('diwali'),
  },
];
