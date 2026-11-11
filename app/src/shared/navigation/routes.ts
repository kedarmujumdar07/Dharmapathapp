import type { Href } from 'expo-router';

/**
 * Centralized route helpers for DharmaPath navigation.
 *
 * Every helper returns a value typed as Href so it can be passed directly
 * to router.push(), router.replace(), or <Link href={...} />.
 *
 * The `.expo/types/router.d.ts` file must include all these pathnames.
 * Run `npx expo start` once after adding new route files to regenerate it,
 * or update it manually as done in ticket 3.3.
 */
export const routes = {
  // ── Tab shortcuts ─────────────────────────────────────────────────────────

  /** Home tab */
  home: '/' as Href,

  /** Learning tab */
  learning: '/(tabs)/learning' as Href,

  /** Panchang & Festivals tab (hidden from tab bar; also reachable as standalone) */
  panchang: '/(tabs)/panchang' as Href,

  /** Scriptures tab (hidden from tab bar) */
  scriptures: '/(tabs)/scriptures' as Href,

  /** Profile tab */
  profile: '/(tabs)/profile' as Href,

  // ── Learning stack ────────────────────────────────────────────────────────

  /** Learning-path detail screen (existing). Pass pathId as a param. */
  pathDetail: (pathId: string): Href => ({
    pathname: '/learning/path-detail',
    params: { pathId },
  }),

  /**
   * Legacy lesson-runner screen (existing, /learning/lesson-runner).
   * Kept for backward compatibility; new code should prefer routes.lessonPlay.
   */
  lessonRunner: (lessonId: string): Href => ({
    pathname: '/learning/lesson-runner',
    params: { lessonId },
  }),

  // ── Lesson stack (new, ticket 3.3) ────────────────────────────────────────

  /** Lesson intro screen — ticket 2.1 */
  lesson: (id: string): Href => ({
    pathname: '/lesson/[id]',
    params: { id },
  }),

  /** Quiz runner screen — tickets 1.2 / 2.2 */
  lessonPlay: (id: string): Href => ({
    pathname: '/lesson/[id]/play',
    params: { id },
  }),

  /** Results screen — ticket 2.7 */
  lessonResults: (id: string): Href => ({
    pathname: '/lesson/[id]/results',
    params: { id },
  }),

  // ── Content detail screens (new, ticket 3.3) ──────────────────────────────

  /** Scripture reader — ticket 5.6 */
  scripture: (id: string): Href => ({
    pathname: '/scripture/[id]',
    params: { id },
  }),

  /** Festival detail — ticket 5.5 */
  festival: (id: string): Href => ({
    pathname: '/festival/[id]',
    params: { id },
  }),

  // ── Utility screens ───────────────────────────────────────────────────────

  /** Settings screen — ticket 6.1 */
  settings: '/settings' as Href,
};
