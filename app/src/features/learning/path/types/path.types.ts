import type { LessonData, LessonKind } from '@/features/home/types/lesson.types';

export type { LessonKind };

export type NodeState = 'completed' | 'current' | 'locked';

export interface Unit {
  id: string;
  title: string;
  subtitle?: string;
  accent?: string;
  lessonIds: string[];
}

export interface Path {
  id: string;
  title: string;
  subtitle: string;
  comingSoon?: boolean;
  units: Unit[];
}

export interface CurriculumData {
  path: Path;
  lessons: Record<string, LessonData>;
}

export interface CurriculumRepository {
  getPath(pathId: string): Promise<Path | null>;
  getLessons(ids: string[]): Promise<Record<string, LessonData>>;
}

export type CurriculumStatus = 'loading' | 'ready' | 'empty' | 'error';
