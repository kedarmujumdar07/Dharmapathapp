# DharmaPath Mobile Application (React Native)

Welcome to the **DharmaPath** React Native application codebase. This folder contains the frontend mobile implementation built using Expo and React Native, tailored with premium, high-fidelity user flows, rich animations, and blueprint aesthetics.

---

## 🚀 Key Features Implemented

1. **Animated Onboarding Flow:**
   - Powered by `expo-video` playing local MP4 videos (`app/assets/videos/`).
   - Featuring a bouncing "+10 XP" badge with floating micro-animations.
   - Fully customizable screen slide pagination.

2. **Premium Login Experience:**
   - Multi-column scrolling photo grid layout matching high-fidelity HTML mockups.
   - Smooth continuous list scrolling animations utilizing `react-native-reanimated`.
   - Sleek SVG authentication actions and layout.

3. **Blueprint-Themed Preferences Flow:**
   - 5-step preference tailoring flow using a cohesive, light-themed blueprint aesthetic.
   - Interactive, auto-cycling **Paths Slideshow** with cross-fade scale transitions showcasing:
     - **Itihasa** (Epics)
     - **Leela** (Mythology)
     - **Utsav** (Festivals)
     - **Tirtha** (Pilgrimage)
   - Dynamic slide indicators with expanding active-pill styles.
   - persistent user states managed globally via `PreferencesContext`.

4. **Global State & Persistence:**
   - Unified state management using React Context.
   - Onboarding and selection preferences persisted locally using `@react-native-async-storage/async-storage` to ensure a smooth, gated user routing experience.

---

## 📂 Codebase Directory Structure

```filepath
Dharmapathapp/app/
├── assets/                    # Static media files
│   ├── images/                # App icons, mascot assets, and extracted slideshow images
│   └── videos/                # Local MP4 videos for onboarding
├── src/                       # Application source code
│   ├── app/                   # File-based router configurations (_layout, index, etc.)
│   ├── components/            # Reusable UI components
│   ├── constants/             # Theme tokens and style constants
│   ├── context/               # PreferencesContext and persistence layers
│   └── screens/               # High-fidelity flows (Onboarding, Login, Preferences)
├── package.json               # Dependency manifests and scripts
└── tsconfig.json              # TypeScript compiler configurations
```

---

## 🛠️ Technology Stack

- **Core Framework:** React Native with [Expo SDK 51+](https://expo.dev)
- **Routing:** Expo Router (File-based navigation)
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Graphics:** React Native Svg
- **Media Player:** Expo Video
- **Storage:** React Native Async Storage
- **Typography:** Google Fonts integration:
  - *Space Grotesk* (Headers/Sleek elements)
  - *JetBrains Mono* (Code style/Technical subtexts)
  - *Caveat* & *Baloo 2* (Accent copy)

---

## 🚀 Getting Started

### 1. Install Dependencies
Make sure you are inside the `app` directory and install the packages:
```bash
npm install
```

### 2. Run the Development Server
Start the Metro bundler server:
```bash
npm run dev
# or
npx expo start
```

### 3. Open the Application
Once the Metro bundler server starts, press the respective key in your terminal output to launch the app:
- **`w`**: Open in Web Browser (Default port `http://localhost:8081`)
- **`a`**: Open in Android Emulator
- **`i`**: Open in iOS Simulator
