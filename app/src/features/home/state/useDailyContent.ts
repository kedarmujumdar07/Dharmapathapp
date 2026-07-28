/**
 * useDailyContent — derives daily lesson, shloka, league info, and recent learnings
 * from the user's persisted progress + static data catalogues.
 *
 * All values are memoised with useMemo so they only recompute when progress changes.
 */

import { useMemo } from 'react';
import { getScripturesByCategory } from '@/features/scriptures/services/scripture-service';
import { LESSONS_DATA } from '@/features/home/data/lessonsData';
import type { UserProgress, LeagueInfo } from '@/features/home/types/progress.types';
import type { LessonData } from '@/features/home/types/lesson.types';
import type { ShlokaItem } from '@/features/scriptures/types/scripture.types';

// ---------- League tier helpers ----------

const TIERS = [
  { name: 'BRONZE', min: 0, max: 99 },
  { name: 'SILVER', min: 100, max: 249 },
  { name: 'GOLD', min: 250, max: 499 },
  { name: 'PLATINUM', min: 500, max: Infinity },
];

function computeLeague(punyaPoints: number): LeagueInfo {
  const tier = TIERS.find((t) => punyaPoints <= t.max) ?? TIERS[TIERS.length - 1];
  const tierMin = tier.min;
  const tierMax = tier.max === Infinity ? tierMin + 499 : tier.max;
  const tierRange = tierMax - tierMin;
  const progressPercent = Math.min(100, Math.round(((punyaPoints - tierMin) / tierRange) * 100));
  const pointsToNext = tier.max === Infinity ? 0 : tier.max - punyaPoints + 1;
  const daysToPromotion = pointsToNext > 0 ? Math.ceil(pointsToNext / 10) : 0;
  const rank = Math.max(1, 50 - Math.floor(punyaPoints / 10));
  return {
    tier: tier.name,
    rank,
    totalScholars: 50,
    progressPercent,
    pointsToNext,
    daysToPromotion,
  };
}

// ---------- Day-of-year helper ----------

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

// ---------- Hook ----------

interface DailyContent {
  /** Today's featured lesson — null if all lessons completed */
  featuredLesson: LessonData | null;
  /**
   * In-progress lesson (next after last completed).
   * STUB: full in-progress tracking needs a 'startedLessons' state.
   * Current approach: if some lessons are done, the next uncompleted is "in progress".
   */
  continueLesson: LessonData | null;
  /** Today's shloka — rotated by day-of-year */
  dailyShloka: ShlokaItem | null;
  /** League info derived from punyaPoints */
  leagueInfo: LeagueInfo;
  /** Last 4 completed lesson titles for the checklist */
  recentLearnings: Array<{ id: string; title: string; completed: true }>;
}

export function useDailyContent(progress: UserProgress): DailyContent {
  const gitaItems = useMemo(() => getScripturesByCategory('gita'), []);

  const featuredLesson = useMemo<LessonData | null>(() => {
    const { completedLessons } = progress;
    // 1. Try the lesson with isFeatured=true
    const featured = LESSONS_DATA.find((l) => l.isFeatured);
    if (featured && !completedLessons.includes(featured.id)) return featured;
    // 2. Fallback: first uncompleted lesson in sequence
    return LESSONS_DATA.find((l) => !completedLessons.includes(l.id)) ?? null;
  }, [progress]);

  const continueLesson = useMemo<LessonData | null>(() => {
    const { completedLessons } = progress;
    if (completedLessons.length === 0) return null;
    // Next lesson after the last completed one
    const lastCompletedIdx = LESSONS_DATA.findIndex(
      (l) => l.id === completedLessons[completedLessons.length - 1]
    );
    if (lastCompletedIdx === -1) return null;
    const next = LESSONS_DATA[lastCompletedIdx + 1];
    return next && !completedLessons.includes(next.id) ? next : null;
  }, [progress]);

  const dailyShloka = useMemo<ShlokaItem | null>(() => {
    if (gitaItems.length === 0) return null;
    const idx = dayOfYear(new Date()) % gitaItems.length;
    return gitaItems[idx];
  }, [gitaItems]);

  const leagueInfo = useMemo<LeagueInfo>(
    () => computeLeague(progress.punyaPoints),
    [progress.punyaPoints]
  );

  const recentLearnings = useMemo(() => {
    const recent = progress.completedLessons.slice(-4);
    return recent
      .map((id) => {
        const lesson = LESSONS_DATA.find((l) => l.id === id);
        return lesson ? { id, title: lesson.title, completed: true as const } : null;
      })
      .filter((item): item is { id: string; title: string; completed: true } => item !== null)
      .reverse();
  }, [progress.completedLessons]);

  return { featuredLesson, continueLesson, dailyShloka, leagueInfo, recentLearnings };
}
