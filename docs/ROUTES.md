# DharmaPath Route Map

> Generated for Ticket 3.3 · Last updated: 2026-11-11

Expo Router typed routes are **enabled** (`experiments.typedRoutes: true` in `app.json`).  
Route types live in `app/.expo/types/router.d.ts` and are included by `tsconfig.json`.  
All navigation must use helpers from [`src/shared/navigation/routes.ts`](../app/src/shared/navigation/routes.ts).

---

## Tab Group — `/(tabs)`

| Route path | Route file | Screen file | Ticket | Params | Status |
|---|---|---|---|---|---|
| `/` | `app/src/app/(tabs)/index.tsx` | `features/home/screens/HomeScreen.tsx` | 1.1 | — | **Real** |
| `/learning` | `app/src/app/(tabs)/learning.tsx` | `features/learning/screens/LearningScreen.tsx` | 1.3 | — | **Real** |
| `/panchang` *(tab, hidden)* | `app/src/app/(tabs)/panchang.tsx` | `features/panchang/screens/PanchangFestivalsScreen.tsx` | 5.1 | — | **Real** |
| `/scriptures` *(tab, hidden)* | `app/src/app/(tabs)/scriptures.tsx` | `features/scriptures/screens/ScriptureLibraryScreen.tsx` | 5.x | — | **Real** |
| `/profile` | `app/src/app/(tabs)/profile.tsx` | `features/profile/screens/ProfileScreen.tsx` | 6.x | — | **Real** |

> [!NOTE]
> `panchang` and `scriptures` tabs have `href: null` in the tab bar — they are hidden from the tab strip but navigable via `routes.panchang` / `routes.scriptures`.

---

## Learning Stack

| Route path | Route file | Screen file | Ticket | Params | Status |
|---|---|---|---|---|---|
| `/learning/path-detail` | `app/src/app/learning/path-detail.tsx` | `features/learning/screens/PathDetailScreen.tsx` | 1.3 | `pathId: string` | **Real** |
| `/learning/lesson-runner` | `app/src/app/learning/lesson-runner.tsx` | `features/learning/screens/LessonRunnerScreen.tsx` | 1.2 | `lessonId: string` | **Real** |

---

## Lesson Stack (new — Ticket 3.3)

| Route path | Route file | Screen file | Ticket | Params | Status |
|---|---|---|---|---|---|
| `/lesson/[id]` | `app/src/app/lesson/[id]/index.tsx` | *(ComingSoonScreen placeholder)* | 2.1 | `id: string` | 🚧 Placeholder |
| `/lesson/[id]/play` | `app/src/app/lesson/[id]/play.tsx` | *(ComingSoonScreen placeholder)* | 1.2 / 2.2 | `id: string` | 🚧 Placeholder |
| `/lesson/[id]/results` | `app/src/app/lesson/[id]/results.tsx` | *(ComingSoonScreen placeholder)* | 2.7 | `id: string` | 🚧 Placeholder |

---

## Content Detail Screens (new — Ticket 3.3)

| Route path | Route file | Screen file | Ticket | Params | Status |
|---|---|---|---|---|---|
| `/panchang` *(standalone)* | `app/src/app/panchang.tsx` | `features/panchang/screens/PanchangFestivalsScreen.tsx` | 5.1 | — | **Real** |
| `/festival/[id]` | `app/src/app/festival/[id].tsx` | *(ComingSoonScreen placeholder)* | 5.5 | `id: string` | 🚧 Placeholder |
| `/scripture/[id]` | `app/src/app/scripture/[id].tsx` | *(ComingSoonScreen placeholder)* | 5.6 | `id: string` | 🚧 Placeholder |

---

## Utility Screens

| Route path | Route file | Screen file | Ticket | Params | Status |
|---|---|---|---|---|---|
| `/settings` | `app/src/app/settings.tsx` | *(ComingSoonScreen placeholder)* | 6.1 | — | 🚧 Placeholder |

---

## Route Helpers (`routes.ts`)

```ts
import { routes } from '@/shared/navigation/routes';

// Tabs
routes.home            // '/'
routes.learning        // '/(tabs)/learning'
routes.panchang        // '/(tabs)/panchang'
routes.scriptures      // '/(tabs)/scriptures'
routes.profile         // '/(tabs)/profile'

// Learning stack
routes.pathDetail(pathId)       // { pathname: '/learning/path-detail', params: { pathId } }
routes.lessonRunner(lessonId)   // { pathname: '/learning/lesson-runner', params: { lessonId } }

// Lesson stack
routes.lesson(id)               // { pathname: '/lesson/[id]', params: { id } }
routes.lessonPlay(id)           // { pathname: '/lesson/[id]/play', params: { id } }
routes.lessonResults(id)        // { pathname: '/lesson/[id]/results', params: { id } }

// Content detail
routes.scripture(id)            // { pathname: '/scripture/[id]', params: { id } }
routes.festival(id)             // { pathname: '/festival/[id]', params: { id } }

// Utility
routes.settings                 // '/settings'
```

---

## Placeholder Screens

The following routes render `ComingSoonScreen` from `src/shared/components/ComingSoonScreen.tsx`
until their owning ticket builds the real screen:

| Route | Title shown | Owning ticket |
|---|---|---|
| `/lesson/[id]` | `Lesson Intro: <id>` | 2.1 |
| `/lesson/[id]/play` | `Lesson Play: <id>` | 1.2 / 2.2 |
| `/lesson/[id]/results` | `Lesson Results: <id>` | 2.7 |
| `/festival/[id]` | `Festival: <id>` | 5.5 |
| `/scripture/[id]` | `Scripture: <id>` | 5.6 |
| `/settings` | `Settings` | 6.1 |

---

## Onboarding / Splash Flow

The root `app/src/app/_layout.tsx` controls splash and onboarding:

1. Fonts load → splash stays visible via `AnimatedSplashOverlay`  
2. `usePreferences()` reads `isOnboarded` and `hasCompletedPreferences` from `AsyncStorage`  
3. If `!isOnboarded` → `OnboardingScreen` (full-screen, no route change)  
4. If `!hasCompletedPreferences` → `PreferencesScreen` (full-screen, no route change)  
5. Otherwise → `<Slot />` renders the matched route normally  

Routing changes in this ticket do **not** affect the splash/onboarding flow.

---

## TypeScript Verification

```bash
cd app
node_modules/.bin/tsc --noEmit   # must exit 0
```

A wrong route string (e.g. `router.push('/does-not-exist')`) produces:  
`TS2345: Argument of type '"/does-not-exist"' is not assignable to parameter of type 'Href'`
