# DharmaPath — Mobile App & Prototypes

Welcome to the main project repository for **DharmaPath** — a structured, gamified Hindu dharma-learning application (Duolingo-style) built for the next generation.

---

## 📖 About DharmaPath

DharmaPath makes Hindu mythology, philosophy, and spiritual wisdom accessible, engaging, and habitual for young Indians and the diaspora (target age group: 12–21). 

Accustomed to visual media like anime and gaming, the younger generation often finds traditional text-heavy spiritual resources inaccessible or scattered. DharmaPath resolves this by combining:
1. **Comic-style Visual Storytelling** (5–7 panel episodes with interactive MCQs/fill-in-the-blanks).
2. **Habit-Forming Gamification** (XP systems, daily streaks, hearts, and weekly competitive leagues).
3. **Panchang Integration** (Surfacing calendar-aware daily lessons, matching deity stories to specific holy days).

---

## 👥 The Team
- **Kedar Mujumdar** — Co-Founder & Product Lead (Product vision, content strategy, comic lesson engine design).
- **Vishwajeet Patil** — Co-Founder & Technology Lead (Stack architect, auth systems, in-app purchases).
- **Pavan Fouzdar** — Co-Founder & Operations Lead (Content production, cultural educator & beta community coordinator).

---

## 🛠️ Project Structure

This monorepo is structured to hold both design prototypes and the production application code side-by-side:

```
Dharmapathapp/
  ├── design/              (UI/UX prototypes and raw assets)
  │     ├── screens/       (HTML/CSS/JS mockups for all views)
  │     │     ├── login/   (Vibrant background photo reel login view)
  │     │     ├── home/    (Curved nav layout & Panchang dashboard cards)
  │     │     ├── paths/   (Learning paths selection screen)
  │     │     ├── mantra/  (Interactive Japa mantra practice counter)
  │     │     └── leagues/ (Competitive user leaderboards)
  │     └── shared-assets/ (shared fonts, colors, and SVGs)
  └── app/                 (Production Flutter application code)
        ├── lib/           (Dart implementation of mockups)
        └── assets/        (images, videos, and fonts)
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

## 📈 Roadmap & Business Model

- **Product Paths**: Itihasa (Ramayana & Mahabharata), Leela (Gods & Avatars), Utsava (Festivals), and Tirtha (Sacred Places).
- **Stage**: Prototype built on Flutter + Supabase. Closed beta testing in progress. Public launch targeted for **September 2026**.
- **Monetization**: Freemium subscription model with monthly (₹99) and annual (₹799) tiers, StoreKit 2/Google Play Billing, and secondary non-intrusive ads on the free tier.
- **Future Vision**: Scaling to regional languages (Marathi, Tamil, Telugu), introducing advanced Vidya paths (Vedanta & Upanishads), and expanding diaspora outreach.

---
*Developed by [Kedar Mujumdar](https://github.com/kedarmujumdar07) in collaboration with the Vande Bharatam accelerator initiative.*
