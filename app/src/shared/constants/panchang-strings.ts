/**
 * Display string constants for the Panchang & Festivals screen.
 * Centralized here instead of hardcoded in components so they can be
 * swapped for i18n keys later without touching component code.
 */

export const PanchangStrings = {
  // Header
  backButton: '← Back',
  brandName: 'DharmaPath',

  // Tabs
  tabFestivals: '🚩 Upcoming Festivals',
  tabPanchang: '📜 Panchang Today',

  // Festival section
  sectionTitle: 'Upcoming Festivals 2026',
  sectionSubtitle: 'Tap card to read significance',
  lessonAvailable: '📖 Lesson Available',
  lessonComingSoon: '🔒 Lesson Coming Soon (DharmaPath Team)',

  // Featured banner
  featuredLabel: 'Featured: Guru Purnima Timings',
  featuredHeading: 'Guru Purnima on Wednesday, July 29, 2026',
  featuredTithiBegins: 'Purnima Tithi Begins -',
  featuredTithiEnds: 'Purnima Tithi Ends -',
  featuredBeginDate: 'on Jul 28, 2026',
  featuredEndDate: 'on Jul 29, 2026',
  featuredBeginTime: '06:18 PM',
  featuredEndTime: '08:05 PM',

  // Panchang panel
  panchangPanelTitle: 'Panchang Engine Data',
  format12h: '12H',
  format24h: '24H',

  // Panchang attribute labels
  attrSunrise: 'Sunrise:',
  attrSunset: 'Sunset:',
  attrTithi: 'Tithi:',
  attrNakshatra: 'Nakshatra:',
  attrYoga: 'Yoga:',
  attrKarana: 'Karana:',
  attrPaksha: 'Paksha:',
  attrWeekday: 'Weekday:',
  attrAmantaMonth: 'Amanta Month:',
  attrPurnimantaMonth: 'Purnimanta Month:',
  attrMoonsign: 'Moonsign:',
  attrSunsign: 'Sunsign:',
  attrShakaSamvat: 'Shaka Samvat:',
  attrVikramSamvat: 'Vikram Samvat:',

  // Bottom sheet
  sheetSignificanceTitle: 'What This Festival Signifies',
  sheetLearnButton: '📖 Learn About This Festival',

  // Location options
  locationOptions: [
    { label: 'New Delhi', name: 'New Delhi, India', latitude: 28.6139, longitude: 77.209 },
    { label: 'Chennai', name: 'Chennai, India', latitude: 13.0827, longitude: 80.2707 },
    { label: 'Mumbai', name: 'Mumbai, India', latitude: 19.076, longitude: 72.8777 },
    { label: 'Varanasi', name: 'Varanasi, India', latitude: 25.3176, longitude: 83.0064 },
  ],
} as const;
