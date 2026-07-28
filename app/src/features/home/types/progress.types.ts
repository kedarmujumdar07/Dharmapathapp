export interface UserProgress {
  punyaPoints: number;
  dayStreak: number;
  /** ISO date string YYYY-MM-DD of last active session */
  lastActiveDate: string;
  /** Array of completed lesson IDs */
  completedLessons: string[];
  /** 7 booleans: [Mon, Tue, Wed, Thu, Fri, Sat, Sun] — true if active that day this week */
  weeklyStreakDays: boolean[];
  /** Array of unlocked badge IDs */
  badges: string[];
}

export interface LeagueInfo {
  tier: string;
  rank: number;
  totalScholars: number;
  progressPercent: number;
  pointsToNext: number;
  daysToPromotion: number;
}
