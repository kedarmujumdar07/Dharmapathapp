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

export type LessonKind = 'lesson' | 'practice' | 'milestone';

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

  /** Optional short 1-2 line summary for timeline / cards */
  summary?: string;
  /** Lesson kind factor for timeline circle sizing: lesson (1.0), practice (0.72), milestone (1.15) */
  kind?: LessonKind;
  /** Estimated duration in minutes */
  minutes?: number;
  /** Number of quiz / interactive questions */
  questionCount?: number;
}

export interface ScriptureItem {
  id: string;
  emoji: string;
  titleEnglish: string;
  subtitle: string;
  actionLabel: string;
}
