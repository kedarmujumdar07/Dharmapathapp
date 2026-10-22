/**
 * DharmaPath Dark Theme — Premium warm-dark cinematic aesthetic.
 * Primary language: saffron / crimson on deep warm black.
 *
 * Use DT tokens for new components.
 * HomeColors aliases are kept for backward compatibility during migration.
 */

// ─── Primary Design Tokens ───────────────────────────────────────────────────

export const DT = {
  // Backgrounds
  bg:             '#0D0A07',  // Screen background — deep warm black
  surface:        '#1C1410',  // Card base
  surfaceRaised:  '#251A12',  // Elevated / active card
  glass:          'rgba(255, 235, 200, 0.06)',  // Glassmorphism fill
  glassBorder:    'rgba(255, 235, 200, 0.14)',  // Glassmorphism stroke

  // Accents
  saffron:        '#FF6F00',
  saffronLight:   '#FF9800',
  saffronGlow:    'rgba(255, 111, 0, 0.28)',
  crimson:        '#C0392B',
  crimsonLight:   '#E74C3C',
  gold:           '#D4A843',
  goldLight:      '#F0C040',
  emerald:        '#27AE60',
  emeraldBg:      'rgba(39, 174, 96, 0.12)',

  // Text
  textPrimary:    '#F5EDD8',  // Warm white
  textSecondary:  '#A89060',  // Warm muted
  textMuted:      '#6A5A4A',  // Placeholder / disabled

  // Borders & lines
  border:         'rgba(255, 235, 200, 0.12)',
  divider:        'rgba(255, 235, 200, 0.07)',
} as const;

// ─── Shadow Tokens ───────────────────────────────────────────────────────────

export const SHADOW = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.40,
    shadowRadius: 8,
    elevation: 4,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 16,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.60,
    shadowRadius: 24,
    elevation: 16,
  },
  saffron: {
    shadowColor: '#FF6F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

// ─── Legacy Aliases (backward compat) ────────────────────────────────────────

export const HomeColors = {
  bgSandalwood:   DT.bg,
  cardBg:         DT.surface,
  borderDark:     DT.border,
  textMain:       DT.textPrimary,
  textMuted:      DT.textMuted,
  saffronPrimary: DT.saffron,
  saffronDark:    '#E65100',
  crimsonAccent:  DT.crimson,
  crimsonDark:    '#A93226',
  goldPrimary:    DT.gold,
  goldLight:      'rgba(212, 168, 67, 0.18)',
  emeraldGreen:   DT.emerald,
  emeraldLight:   DT.emeraldBg,
  darkCard:       DT.surface,
  sunburstBg:     DT.surfaceRaised,
  sectionLine:    DT.divider,
} as const;

export const HARD_SHADOW_OFFSET = 4; // kept for component compat

export type HomeColor = keyof typeof HomeColors;
