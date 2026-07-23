# DharmaPath — Mobile App & Prototypes

Welcome to the main project repository for **DharmaPath** — a Duolingo-style learning application for Hindu Dharma with a modern, dark tech-chip aesthetic.

This repository is structured to hold both design prototypes and the production application code side-by-side.

---

## Getting Started: Cloning the Repository

To clone the repository and get all directories locally on your machine, choose one of the options below:

### Option A: Using Standard Git CLI
Open your terminal (PowerShell, Command Prompt, or Bash) and run:
```bash
git clone https://github.com/kedarmujumdar07/Dharmapathapp.git
cd Dharmapathapp
```

### Option B: Using GitHub CLI (`gh`)
If you have GitHub CLI installed, you can clone using:
```bash
gh repo clone kedarmujumdar07/Dharmapathapp
cd Dharmapathapp
```

---

## Project Structure

```
Dharmapathapp/
  ├── design/              (UI/UX prototypes and raw assets)
  │     ├── screens/       (HTML/CSS/JS mockups for all views)
  │     └── shared-assets/ (shared fonts, colors, and SVGs)
  └── app/                 (Production Flutter application code)
        ├── lib/           (Dart implementation of mockups)
        └── assets/        (images, videos, and fonts)
```

---

## Running the Components

### 1. View Design Prototypes (`/design`)
To preview the design prototype layouts, open the HTML files directly from `/design/screens/` in any modern web browser.
- Login Mockup: `/design/screens/login/dharmapath_login.html`
- Dashboard: `/design/screens/home/app_home.html`
- Paths: `/design/screens/paths/paths.html`
- Mantra Practicing: `/design/screens/mantra/mantra.html`
- Leagues & Leaderboard: `/design/screens/leagues/leagues.html`

### 2. Run Flutter App (`/app`)
To run the Flutter production app, ensure you have the Flutter SDK installed, then navigate into the `/app` folder and run the setup commands:
```bash
# Navigate to the Flutter app directory
cd app

# Fetch all production dependencies
flutter pub get

# Launch the app on your connected device/simulator
flutter run
```

---
*Developed by [Kedar Mujumdar](https://github.com/kedarmujumdar07).*
