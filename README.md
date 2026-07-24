# DharmaPath — Mobile App & Prototypes

Welcome to the main project repository for **DharmaPath** — a structured, gamified Hindu dharma-learning application built for the next generation.

---

## 📖 About DharmaPath

DharmaPath makes Hindu mythology, philosophy, and spiritual wisdom accessible, engaging, and habitual for young Indians and the diaspora (target age group: 12–21). 

Accustomed to visual media like anime and gaming, the younger generation often finds traditional text-heavy spiritual resources inaccessible or scattered. DharmaPath resolves this by combining:
1. **Comic-style Visual Storytelling** (5–7 panel episodes with interactive MCQs/fill-in-the-blanks).
2. **Habit-Forming Gamification** (XP systems, daily streaks, hearts, and weekly competitive leagues).
3. **Panchang Integration** (Surfacing calendar-aware daily lessons, matching deity stories to specific holy days).

---

## 👥 The Team
- **Kedar Mujumdar** — Co-Founder & Product Lead
- **Vishwajeet Patil** — Co-Founder & Technology Lead
- **Pavan Fouzdar** — Co-Founder & Operations Lead

---

## 🛠️ Project Structure

This repository holds both design prototypes and the production application code side-by-side:

```text
Dharmapathapp/
├── app/               # Production React Native / Expo application code
│   ├── assets/        # Media assets (images, videos, and fonts)
│   ├── src/           # TypeScript & Expo Router source code
│   │   ├── app/       # Routing and navigation structure
│   │   ├── components # Reusable UI components
│   │   ├── screens/   # Main screens (login, onboarding, preferences)
│   │   └── context/   # React contexts (preferences, theme)
│   └── package.json   # Expo application dependencies and scripts
├── design/            # UI/UX static prototypes and raw web mockups
│   ├── screens/       # HTML/CSS/JS mockups for all views
│   └── shared-assets/ # Shared fonts, colors, and SVGs
├── scripts/           # Maintenance and asset optimization scripts
│   └── optimize-images.js
├── LICENSE            # Project license
└── README.md          # Monorepo documentation
```

---

## 🚀 Running the Components

### 1. View Design Prototypes (`/design`)
To preview the design prototype layouts, open the HTML files directly from `/design/screens/` in any modern web browser:
- **Login Mockup**: `/design/screens/login/dharmapath_login.html`
- **Dashboard**: `/design/screens/home/app_home.html`
- **Paths**: `/design/screens/paths/paths.html`
- **Mantra Practice**: `/design/screens/mantra/mantra.html`
- **Leagues**: `/design/screens/leagues/leagues.html`

### 2. Run React Native (Expo) App (`/app`)
To run the React Native app:
```bash
# Navigate to the React Native app directory
cd app

# Install dependencies
npm install

# Launch the app on your connected Android Emulator, iOS Simulator, or Web browser
npm run android # or npm run ios / npm run web
```

---

## 📈 Roadmap & Business Model

- **Product Paths**: Itihasa (Ramayana & Mahabharata), Leela (Gods & Avatars), Utsava (Festivals), and Tirtha (Sacred Places).
- **Stage**: Prototype built on React Native (Expo) + Supabase. Closed beta testing in progress. Public launch targeted for **September 2026**.
- **Monetization**: Freemium subscription model with monthly (₹99) and annual (₹799) tiers, StoreKit 2/Google Play Billing, and secondary non-intrusive ads on the free tier.

---
*Developed by [Kedar Mujumdar](https://github.com/kedarmujumdar07) in collaboration with the Vande Bharatam accelerator initiative.*
