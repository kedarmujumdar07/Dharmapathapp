/**
 * Panchang & Festivals screen design tokens.
 * Every value is extracted verbatim from the dharmapath_panchang.html :root CSS variables,
 * individual class rules, and gradient definitions. Nothing is approximated.
 */

export const PanchangColors = {
  /** Page / phone background */
  bgDark: '#242933',
  /** Inner app background */
  appAmber: '#f8df9e',
  appAmberLight: '#fef4d8',
  /** Card surfaces */
  cardAmber: '#f4d084',
  cardBorder: '#e2b458',
  /** Maroon spectrum (header gradient, buttons, badges) */
  maroonDark: '#6e1710',
  maroonMid: '#8c2016',
  maroonLight: '#a82e22',
  /** Header gradient top color */
  maroonGradientTop: '#59110a',
  /** Olive spectrum (date badges, "Featured" label) */
  oliveDark: '#5c631b',
  oliveMid: '#747d25',
  oliveBorder: '#abaf53',
  /** Accent gold (borders, text highlights) */
  goldAccent: '#fbd66d',
  /** Text */
  textDark: '#2c1a06',
  textMaroon: '#6e1710',
  textBrown: '#4a2c0f',
  textAttrValue: '#3b220c',
  textUptoTime: '#83561a',
  textSublabel: '#6e522f',
  textInfoDesc: '#fcecd7',
  textPanchangDate: '#2b611e',
  textTimingStrong: '#8c1d10',
  /** Brand logo */
  brandOrange: '#E8500A',
  /** Structural */
  white: '#ffffff',
  black: '#000000',
  /** Sheet/modal specific */
  sheetGrabber: '#d8cfc2',
  sheetOverlay: 'rgba(12, 11, 13, 0.7)',
  significanceBg: '#ffffff',
  /** Format toggle */
  fmtBtnBg: 'rgba(226, 180, 88, 0.3)',
  fmtBtnBorder: 'rgba(203, 178, 122, 0.6)',
  fmtBtnActiveBg: '#ffffff',
  /** Header back button / location pill */
  pillBg: 'rgba(255, 255, 255, 0.15)',
  pillBorder: 'rgba(251, 214, 109, 0.4)',
  /** Tab bar background */
  tabBarBg: 'rgba(0, 0, 0, 0.25)',
  tabInactiveText: 'rgba(255, 255, 255, 0.7)',
  /** Card head bottom border */
  cardHeadBorder: 'rgba(251, 214, 109, 0.3)',
  /** Date badge tag */
  badgeTagBg: 'rgba(0, 0, 0, 0.3)',
  badgeTagBorder: 'rgba(255, 255, 255, 0.2)',
  /** Close button */
  closeBtnBg: 'rgba(110, 23, 16, 0.1)',
  /** Sheet header divider */
  sheetDivider: 'rgba(140, 32, 22, 0.2)',
  panchangMetaDivider: 'rgba(140, 32, 22, 0.15)',
  /** Lesson coming-soon button (no active lesson) */
  lessonComingSoonBg: '#d4a853',
} as const;

/** Gradient presets — arrays are [start, end] for LinearGradient */
export const PanchangGradients = {
  /** App header: top → bottom */
  header: ['#59110a', '#6e1710'] as const,
  /** Card head: left → right */
  cardHead: ['#59110a', '#7a1b12'] as const,
  /** Date badge: 145deg, olive-mid → olive-dark */
  dateBadge: ['#747d25', '#5c631b'] as const,
  /** Lesson status pill: top → bottom, maroon-light → maroon-dark */
  lessonPill: ['#a82e22', '#6e1710'] as const,
  /** "Featured" badge label: 145deg, olive-mid → olive-dark (same as dateBadge) */
  featuredBadge: ['#747d25', '#5c631b'] as const,
  /** Panchang panel header: left → right */
  panchangPanelHead: ['#d38b39', '#e29c48', '#d38b39'] as const,
  /** Lesson action button: top → bottom, maroon-mid → maroon-dark */
  lessonAction: ['#8c2016', '#6e1710'] as const,
} as const;

/**
 * Font family names — these are the loaded names registered with expo-font / useFonts.
 * The HTML mockup uses:
 *   - Caveat 700 → brand logo
 *   - Baloo 2 500/600/700/800 → tab pills, section labels, sheet titles, mini-info-tithi
 *   - Nunito 400/600/700/800 → body text, sublabel, descriptions, attribute rows
 */
export const PanchangFonts = {
  caveat700: 'Caveat_700Bold',
  baloo500: 'Baloo2_500Medium',
  baloo600: 'Baloo2_600SemiBold',
  baloo700: 'Baloo2_700Bold',
  baloo800: 'Baloo2_800ExtraBold',
  nunito400: 'Nunito_400Regular',
  nunito600: 'Nunito_600SemiBold',
  nunito700: 'Nunito_700Bold',
  nunito800: 'Nunito_800ExtraBold',
} as const;

/** Spacing & radii extracted from the HTML CSS */
export const PanchangSpacing = {
  /** App-body padding */
  bodyPaddingH: 12,
  bodyPaddingTop: 14,
  bodyPaddingBottom: 30,
  bodySectionGap: 16,
  /** Header */
  headerPaddingH: 14,
  headerPaddingTop: 42,
  headerPaddingBottom: 10,
  headerGap: 8,
  /** Festival card */
  cardMinWidth: 250,
  cardBorderRadius: 14,
  cardHeadPaddingH: 12,
  cardHeadPaddingV: 6,
  cardBodyPadding: 10,
  cardBodyGap: 8,
  /** Carousel */
  carouselGap: 12,
  /** Date badge */
  badgeBorderRadius: 8,
  badgePaddingTop: 8,
  badgePaddingH: 4,
  /** Featured banner */
  bannerBorderRadius: 12,
  bannerPadding: 14,
  /** Panchang panel */
  panelBorderRadius: 14,
  panelHeadPaddingH: 14,
  panelHeadPaddingV: 10,
  panelMetaPaddingH: 14,
  panelMetaPaddingTop: 10,
  panelMetaPaddingBottom: 6,
  panelAttrPaddingH: 14,
  panelAttrPaddingTop: 10,
  panelAttrPaddingBottom: 14,
  panelAttrGap: 6,
  attrLabelWidth: 125,
  /** Sheet modal */
  sheetBorderRadius: 24,
  sheetPaddingH: 18,
  sheetPaddingTop: 16,
  sheetPaddingBottom: 24,
  sheetGap: 12,
  grabberWidth: 40,
  grabberHeight: 4,
  /** Misc */
  pillBorderRadius: 20,
  pillPaddingH: 10,
  pillPaddingV: 4,
  tabBarBorderRadius: 12,
  tabBarPadding: 3,
  tabPillBorderRadius: 10,
  tabPillPaddingV: 6,
} as const;

/** Shadow presets matching the mockup box-shadow values */
export const PanchangShadows = {
  headerShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  cardShadow: {
    shadowColor: '#6e1710',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  panelShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  tabActiveShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  lessonPillShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonActionShadow: {
    shadowColor: '#6e1710',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  fmtBtnActiveShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
} as const;
