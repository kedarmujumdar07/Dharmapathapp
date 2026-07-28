export type PathId = 'itihasa' | 'leela' | 'tirtha' | 'utsava';

export interface PathSubItem {
  id: string;
  pathId: PathId;
  title: string;
  subtitle: string;
  emoji: string;
  actionLabel: 'START' | 'EXPLORE' | 'READ' | 'PRACTICE';
}

export interface PathData {
  id: PathId;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  subItems: PathSubItem[];
}

export interface LessonData {
  id: string;
  pathId: PathId;
  subItemId: string;
  /** Display title shown on the card */
  title: string;
  /** e.g. "LESSON 12 • DUTY & DHARMA IN EXILE" */
  subtitle: string;
  /** Category chip label e.g. "ITIHASA • AYODHYA KANDA" */
  categoryLabel: string;
  pointsAwarded: number;
  /** Exactly one lesson should have isFeatured=true; becomes today's lesson */
  isFeatured: boolean;
  contentPreview: string;
}

export interface ScriptureItem {
  id: string;
  emoji: string;
  titleEnglish: string;
  subtitle: string;
  actionLabel: string;
}
