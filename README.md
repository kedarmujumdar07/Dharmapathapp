# DharmaPath — Mobile App & Prototypes

Welcome to the main project repository for **DharmaPath** — a Duolingo-style learning application for Hindu Dharma with a modern, dark tech-chip aesthetic.

## Project Structure

This repository is structured to hold both design prototypes and the production application code:

```
Dharmapathapp/
  ├── design/              (UI/UX prototypes and raw assets)
  │     ├── screens/       (HTML/CSS/JS mockups for all views)
  │     └── shared-assets/ (shared fonts, colors, and SVGs)
  └── app/                 (Production Flutter application code)
        ├── lib/           (Dart implementation of mockups)
        └── assets/        (images, videos, and fonts)
```

## Running the Components

### 1. View Design Prototypes (`/design`)
To preview the design prototype layouts, open the HTML files directly from `/design/screens/` in any modern web browser.
- Login Mockup: `/design/screens/login/dharmapath_login.html`
- Dashboard: `/design/screens/home/app_home.html`
- Paths: `/design/screens/paths/paths.html`
- Mantra Practicing: `/design/screens/mantra/mantra.html`
- Leagues & Leaderboard: `/design/screens/leagues/leagues.html`

### 2. Run Flutter App (`/app`)
Navigate into the `/app` folder and run the standard Flutter tooling:
```bash
cd app
flutter pub get
flutter run
```

---
*Developed by [Kedar Mujumdar](https://github.com/kedarmujumdar07).*
