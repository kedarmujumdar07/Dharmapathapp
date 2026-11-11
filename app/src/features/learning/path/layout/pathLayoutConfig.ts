export const PATH_LAYOUT_CONFIG = {
  maxContentWidth: 480,
  marginX: 24,
  lineWidth: 3,
  lineGap: 9,
  baseDiameterRatio: 0.27,
  baseDiameterMin: 92,
  baseDiameterMax: 132,
  kindFactors: {
    lesson: 1.0,
    practice: 0.72,
    milestone: 1.15,
  } as const,
  textGutter: 16,
  bandPadY: 14,
  headerHeight: 132,
  cornerRadius: 24,
  endCapHeight: 160,
  endDotRadius: 6,
  jitterPercent: 0.04,
  textMetrics: {
    indexFontSize: 22,
    indexLineHeight: 26,
    titleFontSize: 16,
    titleLineHeight: 20,
    summaryFontSize: 13,
    summaryLineHeight: 18,
    metaFontSize: 12,
    metaLineHeight: 16,
    maxFontSizeMultiplier: 1.2,
  },
  // Budget: (26 + 2*20 + 2*18 + 16) * 1.2 = (26 + 40 + 36 + 16) * 1.2 = 118 * 1.2 = 141.6 -> 142
  estimatedTextHeight: 142,
} as const;

export type PathLayoutConfig = typeof PATH_LAYOUT_CONFIG;
