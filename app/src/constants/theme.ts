/**
 * Colors and typography tokens for DharmaPath
 */

import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  // DharmaPath Palette Tokens
  saffron: '#E07B39',
  saffronDark: '#D84B16',
  accentRed: '#E2472F',
  accentRedDark: '#BF3A24',
  gold: '#C8960C',
  goldBright: '#FFE066',
  navyDark: '#1C2536',
  bgCream: '#FFF8F2',
  cardCream: '#EDE7DA',
  creamInk: '#14171D',
  bgDark: '#F4F6F8',
  bgDark2: '#E2E8F0',
  cardDark: '#FFFFFF',
  cardDarkBorder: '#E2E8F0',
  textLight: '#1E293B',
  textMuted: '#64748B',
  textMutedCream: '#8A8172',

  light: {
    text: '#1E293B',
    background: '#FFF8F2',
    backgroundElement: '#EDE7DA',
    backgroundSelected: '#E2472F',
    textSecondary: '#64748B',
    border: '#E2E8F0',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0A0C0F',
    backgroundElement: '#1C2536',
    backgroundSelected: '#E2472F',
    textSecondary: '#64748B',
    border: '#24211D',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'SpaceGrotesk-Regular',
    serif: 'PlayfairDisplay-Regular',
    mono: 'JetBrainsMono-Regular',
    display: 'SpaceGrotesk-Bold',
  },
  android: {
    sans: 'SpaceGrotesk_400Regular',
    serif: 'PlayfairDisplay_700Bold',
    mono: 'JetBrainsMono_400Regular',
    display: 'SpaceGrotesk_700Bold',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    mono: 'monospace',
    display: 'sans-serif',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

