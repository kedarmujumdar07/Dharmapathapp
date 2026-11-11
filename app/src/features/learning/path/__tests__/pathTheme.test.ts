import { getUnitAccent, withAlpha, PATH_ACCENT_PALETTE } from '../pathTheme';

describe('pathTheme', () => {
  describe('getUnitAccent', () => {
    it('returns exact red from reference for unit 0', () => {
      expect(getUnitAccent({}, 0)).toBe('#C32826');
    });

    it('cycles predictably through the palette', () => {
      expect(getUnitAccent({}, 1)).toBe(PATH_ACCENT_PALETTE[1]);
      expect(getUnitAccent({}, 2)).toBe(PATH_ACCENT_PALETTE[2]);
      expect(getUnitAccent({}, 5)).toBe(PATH_ACCENT_PALETTE[5]);
      expect(getUnitAccent({}, 6)).toBe(PATH_ACCENT_PALETTE[0]); // cycle back to 0
      expect(getUnitAccent({}, 13)).toBe(PATH_ACCENT_PALETTE[1]);
    });

    it('respects explicit unit.accent override over palette', () => {
      expect(getUnitAccent({ accent: '#990000' }, 0)).toBe('#990000');
      expect(getUnitAccent({ accent: '#123456' }, 4)).toBe('#123456');
    });

    it('falls back to palette if accent is empty string', () => {
      expect(getUnitAccent({ accent: '' }, 2)).toBe(PATH_ACCENT_PALETTE[2]);
    });
  });

  describe('withAlpha', () => {
    it('converts 6-digit hex to rgba with alpha', () => {
      expect(withAlpha('#FFFFFF', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
      expect(withAlpha('#000000', 0.18)).toBe('rgba(0, 0, 0, 0.18)');
    });

    it('converts 3-digit shorthand hex', () => {
      expect(withAlpha('#FFF', 0.8)).toBe('rgba(255, 255, 255, 0.8)');
    });

    it('clamps alpha between 0 and 1', () => {
      expect(withAlpha('#000000', -0.5)).toBe('rgba(0, 0, 0, 0)');
      expect(withAlpha('#000000', 1.5)).toBe('rgba(0, 0, 0, 1)');
    });
  });
});
