import { HomeColors } from '@/features/home/constants/homeTheme';
import type { Unit } from './types/path.types';

export const PATH_ACCENT_PALETTE = [
  '#C32826', // Unit 1: Red from reference image
  '#D97706', // Unit 2: Warm Ochre / Amber
  '#0D9488', // Unit 3: Deep Teal
  '#4338CA', // Unit 4: Royal Indigo
  '#831843', // Unit 5: Rich Plum
  '#15803D', // Unit 6: Forest Green
] as const;

export const PathColors = {
  // Sampled directly from design/screens/path/reference.jpg
  background: '#F3F0E7',
  line: '#788C81',
  lineProgress: '#2B443B',
  ink: '#1A1914',
  inkMuted: '#6E6A60',
  inkSubtle: '#9E9A90',

  // Complementary tokens from existing HomeColors
  cardBg: HomeColors.cardBg ?? '#FFFFFF',
  borderDark: HomeColors.borderDark ?? '#231F20',
  white: '#FFFFFF',
  lockedMutedText: '#8A867E',
} as const;

export const PathFonts = {
  display: 'SpaceGrotesk_700Bold',
  displayExtraBold: 'Baloo2_800ExtraBold',
  sans: 'SpaceGrotesk_400Regular',
  sansSemiBold: 'Nunito_600SemiBold',
  mono: 'JetBrainsMono_400Regular',
} as const;

/**
 * Returns the unit accent color. Respects explicit unit.accent override
 * or cycles predictably through PATH_ACCENT_PALETTE.
 */
export function getUnitAccent(unit: Pick<Unit, 'accent'>, unitIndex: number): string {
  if (unit.accent && unit.accent.trim().length > 0) {
    return unit.accent;
  }
  return PATH_ACCENT_PALETTE[Math.abs(unitIndex) % PATH_ACCENT_PALETTE.length];
}

/**
 * Converts a hex color (#RRGGBB or #RGB) into an rgba string with the specified opacity.
 */
export function withAlpha(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '').trim();
  const clampedAlpha = Math.max(0, Math.min(1, alpha));

  let r = 0;
  let g = 0;
  let b = 0;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length >= 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return hex;
  }

  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}
