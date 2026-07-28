import type { ScriptureItem } from '@/features/home/types/lesson.types';

/** Scripture cards shown in the Learning tab → Shlokas & Mantras sub-tab */
export const SCRIPTURES_DATA: ScriptureItem[] = [
  {
    id: 'gayatri_mantra',
    emoji: '🪔',
    titleEnglish: 'GAYATRI MANTRA',
    subtitle: '24 SYLLABLES • DAILY RECITING',
    actionLabel: 'PRACTICE',
  },
  {
    id: 'mahamrityunjaya',
    emoji: '🌿',
    titleEnglish: 'MAHAMRITYUNJAYA MANTRA',
    subtitle: 'SHIVA SADHANA • RECITATION',
    actionLabel: 'PRACTICE',
  },
  {
    id: 'hanuman_chalisa',
    emoji: '🚩',
    titleEnglish: 'HANUMAN CHALISA',
    subtitle: '40 CHAUPAIS • AUDIO & TEXT',
    actionLabel: 'PRACTICE',
  },
  {
    id: 'gita_daily_shloka',
    emoji: '📖',
    titleEnglish: 'BHAGAVAD GITA DAILY SHLOKA',
    subtitle: 'ROTATING VERSE • DAILY REVISION',
    actionLabel: 'REVISE',
  },
];
