/**
 * useUserProgress — persisted progress state using AsyncStorage.
 *
 * Justification for AsyncStorage over zustand:
 * - AsyncStorage is already installed (@react-native-async-storage/async-storage ^3.1.1)
 * - zustand is NOT in package.json
 * - Simple enough state to manage with a custom hook + JSON serialisation
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProgress } from '@/features/home/types/progress.types';

const STORAGE_KEY = 'dharmapath_progress';

const DEFAULT_PROGRESS: UserProgress = {
  punyaPoints: 0,
  dayStreak: 0,
  lastActiveDate: '',
  completedLessons: [],
  weeklyStreakDays: [false, false, false, false, false, false, false],
  badges: [],
};

/** Returns YYYY-MM-DD string for a Date */
function toDateString(d: Date): string {
  return d.toISOString().split('T')[0];
}

/** Returns Mon=0 … Sun=6 index for a given Date */
function weekdayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

/** Difference in calendar days between two YYYY-MM-DD strings */
function daysDiff(a: string, b: string): number {
  const msPerDay = 86_400_000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

interface UseUserProgressReturn {
  progress: UserProgress;
  isLoading: boolean;
  completeLesson: (lessonId: string, pointsAwarded: number) => Promise<void>;
}

export function useUserProgress(): UseUserProgressReturn {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw) as UserProgress;
          setProgress(saved);
        }
      })
      .catch(() => {
        // Storage unavailable — use defaults silently
      })
      .finally(() => setIsLoading(false));
  }, []);

  /** Persist the new progress state */
  const save = useCallback(async (updated: UserProgress): Promise<void> => {
    setProgress(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  /**
   * Increments streak if today is a new day.
   * - Same day: no change
   * - Yesterday: streak + 1, mark today's weekday slot
   * - Older / empty: reset streak to 1, mark today's weekday slot
   * Returns the mutated progress (does NOT call save — callers do that).
   */
  const incrementStreakIfNewDay = useCallback(
    (current: UserProgress): UserProgress => {
      const today = toDateString(new Date());
      if (current.lastActiveDate === today) {
        return current; // already recorded today
      }

      const diff = current.lastActiveDate
        ? daysDiff(current.lastActiveDate, today)
        : -1;

      const newStreak = diff === 1 ? current.dayStreak + 1 : 1;
      const todayIdx = weekdayIndex(new Date());
      const updatedWeekly = [...current.weeklyStreakDays] as boolean[];

      // Reset weekly array if this is a new week (Mon index and diff > 1 on Mon, or fresh start)
      if (diff > 7 || diff < 0) {
        updatedWeekly.fill(false);
      }
      updatedWeekly[todayIdx] = true;

      return {
        ...current,
        dayStreak: newStreak,
        lastActiveDate: today,
        weeklyStreakDays: updatedWeekly,
      };
    },
    []
  );

  /** Unlock badges based on current state thresholds */
  const checkAndUnlockBadges = useCallback(
    (current: UserProgress): UserProgress => {
      const earned = new Set(current.badges);

      if (current.completedLessons.length >= 1) earned.add('first_lesson');
      if (current.dayStreak >= 7) earned.add('streak_7');
      if (current.punyaPoints >= 100) earned.add('punya_100');
      if (current.completedLessons.length >= 5) earned.add('scholar');

      return { ...current, badges: Array.from(earned) };
    },
    []
  );

  /**
   * Mark a lesson as complete — awards points, updates streak, unlocks badges.
   * Idempotent: re-completing the same lesson does not double-award points.
   */
  const completeLesson = useCallback(
    async (lessonId: string, pointsAwarded: number): Promise<void> => {
      setProgress((prev) => {
        const alreadyDone = prev.completedLessons.includes(lessonId);
        let updated: UserProgress = alreadyDone
          ? prev
          : {
              ...prev,
              completedLessons: [...prev.completedLessons, lessonId],
              punyaPoints: prev.punyaPoints + pointsAwarded,
            };

        updated = incrementStreakIfNewDay(updated);
        updated = checkAndUnlockBadges(updated);

        // Persist asynchronously (fire-and-forget from setState)
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {});

        return updated;
      });
    },
    [incrementStreakIfNewDay, checkAndUnlockBadges]
  );

  return { progress, isLoading, completeLesson };
}
