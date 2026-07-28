/**
 * Home feature theme — extracted from the DharmaPath mockup :root variables.
 * Use these instead of the shared theme where the mockup specifies exact values.
 */

export const HomeColors = {
  bgSandalwood: '#FAF5EE',
  cardBg: '#FFFFFF',
  borderDark: '#231F20',
  textMain: '#1C1917',
  textMuted: '#6B635B',
  saffronPrimary: '#FF6F00',
  saffronDark: '#E65100',
  crimsonAccent: '#D32F2F',
  crimsonDark: '#B71C1C',
  goldPrimary: '#FFC107',
  goldLight: '#FFECB3',
  emeraldGreen: '#2E7D32',
  emeraldLight: '#E8F5E9',
  darkCard: '#1C1917',
  sunburstBg: '#FFF9F2',
  sectionLine: '#D5C8B5',
} as const;

/**
 * The neobrutalist "hard shadow" offset (px).
 * Implemented as a solid View offset behind the card — not a blurred shadow.
 */
export const HARD_SHADOW_OFFSET = 4;

export type HomeColor = keyof typeof HomeColors;
