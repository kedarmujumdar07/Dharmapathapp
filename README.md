# DharmaPath

[![Build Status](https://img.shields.io/github/actions/workflow/status/<USER>/<REPO>/build.yml?branch=main&style=flat-square)](https://github.com/<USER>/<REPO>/actions)
[![License](https://img.shields.io/github/license/<USER>/<REPO>?style=flat-square)](./LICENSE)
[![Release Version](https://img.shields.io/github/v/release/<USER>/<REPO>?style=flat-square&color=blue)](https://github.com/<USER>/<REPO>/releases)
[![Stars](https://img.shields.io/github/stars/<USER>/<REPO>?style=flat-square&color=gold)](https://github.com/<USER>/<REPO>/stargazers)

DharmaPath is a gamified, interactive portal for modern learners to explore Hindu dharma, philosophy, and historical epics through structured learning paths.

---

## 📖 Why DharmaPath Exists

For younger generations (ages 12–21) and the diaspora, traditional texts and spiritual resources are often scattered, text-heavy, or culturally disconnected. Accustomed to visual mediums like anime and immersive gaming, readers struggle to engage with traditional mediums. 

DharmaPath bridges this gap. It reframes centuries-old history and philosophy into bite-sized, interactive visual paths—connecting ancient wisdom with daily digital routines.

---

## 🚀 Core Features

- **Structured Learning Maps** — Navigate progress-tracked trees for *Itihasa* (Ramayana & Mahabharata), *Leela* (Divine Play), *Utsav* (Festivals), and *Tirtha* (Pilgrimage) instead of parsing unorganized articles.
- **Micro-Learning & Visual Panels** — Absorb complex lessons via 5–7 panel comic stories and interactive multiple-choice checkpoints.
- **Panchang (Calendar-Aware) Surfacing** — Study relevant historical events and deity narratives mapped automatically to active solar-lunar dates.
- **Habit-Building Gamification** — Stay consistent through experience points (XP), daily streaks, heart/health levels, and weekly competitive leagues.
- **Modern Blueprint Aesthetic** — Engage with a premium, light-themed blueprint interface featuring dynamic SVG layouts and floating mascot micro-animations.

---

## ⚡ Quick Start

Get the app running locally on your web browser in under 60 seconds:

```bash
# Clone the repository
git clone https://github.com/<USER>/Dharmapathapp.git
cd Dharmapathapp/app

# Install dependencies
npm install

# Run the Expo development server (Web default)
npm run web
```

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Optional: Android Studio (for Android Emulator) or Xcode (for iOS Simulator)

### Full Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/<USER>/Dharmapathapp.git
   cd Dharmapathapp
   ```
2. **Install application dependencies:**
   ```bash
   cd app
   npm install
   ```
3. **Launch the development server:**
   ```bash
   # Run with Expo CLI
   npm run dev
   ```
4. **Target Platform Selection:**
   - Press **`w`** in the terminal to run the web interface.
   - Press **`a`** to load the Android emulator.
   - Press **`i`** to load the iOS simulator.

---

## 💻 Developer Usage Examples

### 1. Consuming Global Preferences Context
DharmaPath manages user onboarding and customization states globally. Developers can easily read or write state variables (e.g., current daily learning goals or user cohorts):

```tsx
import { usePreferences } from '@/context/preferences-context';

export default function ProfileWidget() {
  const { name, learningGoal, setLearningGoal } = usePreferences();

  return (
    <View>
      <Text>Welcome, {name}!</Text>
      <Button 
        title="Switch to Sacred Goal" 
        onPress={() => setLearningGoal('Sacred')} // 15 min/day
      />
    </View>
  );
}
```

### 2. Dotted Slideshow Active-Indicator
The custom paths slideshow leverages pill-stretching indicators based on active indices:

```tsx
<View style={styles.slideIndicators}>
  {SLIDES.map((_, idx) => {
    const isDotActive = idx === activeIdx;
    return (
      <Pressable
        key={idx}
        onPress={() => setActiveIdx(idx)}
        style={[
          styles.dot,
          isDotActive ? styles.dotActive : styles.dotInactive,
        ]}
      />
    );
  })}
</View>
```

---

## 🏛️ System Architecture

DharmaPath is structured as a monorepo holding design specifications and React Native code:

```
Dharmapathapp/
├── app/                     # Production React Native/Expo app
│   ├── assets/              # App assets (icons, mascot, path graphics)
│   │   ├── images/
│   │   └── videos/          # Local video files used for animated onboarding
│   ├── src/                 # Application codebase
│   │   ├── app/             # Expo router file-based paths
│   │   ├── components/      # Common custom widgets (ChoiceCard, BlueprintBackground)
│   │   ├── context/         # User preference contexts and persistence
│   │   └── screens/         # High-fidelity user screens
│   └── package.json
├── design/                  # Raw UI/UX design mockups (HTML/CSS/JS)
│   ├── screens/             # Step-by-step layout prototype files
│   └── shared-assets/       # Raw fonts, styling guidelines, and SVG structures
└── LICENSE                  # Project licensing
```

---

## 🗺️ Roadmap

- [x] Animated onboarding flow with `expo-video` integration
- [x] Custom blueprint-themed onboarding survey (Preferences)
- [x] High-fidelity continuous scrolling login grid
- [ ] Supabase backend database integration
- [ ] Panchang API daily lesson triggers
- [ ] Gamified leagues and weekly leaderboard systems

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and build. If you'd like to contribute, please check out our [Contributing Guidelines](./CONTRIBUTING.md) to get started.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.
