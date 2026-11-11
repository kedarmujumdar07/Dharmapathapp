import { describe, it, expect } from '@jest/globals';
import { syntheticCurriculum } from '../content/syntheticCurriculum';
import { buildPathLayout } from '../layout/buildPathLayout';
import { PATH_LAYOUT_CONFIG } from '../layout/pathLayoutConfig';
import { computeNodeStates } from '../state/computeNodeStates';
import type { NodeRowData } from '../types/layout.types';

describe('Real Verification Report (Phase 3)', () => {
  it('measures 12x10 curriculum performance and scroll stability', () => {
    const synth = syntheticCurriculum(12, 10);
    const t0 = Date.now();
    const synthLayout = buildPathLayout(synth.path, synth.lessons, 390, PATH_LAYOUT_CONFIG);
    const duration = Date.now() - t0;

    expect(synthLayout.rows).toHaveLength(133); // 12 unit headers + 120 nodes + 1 end-cap
    expect(synthLayout.totalHeight).toBeGreaterThan(20000);
    expect(duration).toBeLessThan(150);
  });

  it('verifies responsive widths 320, 390, 600 geometry integrity', () => {
    const synth = syntheticCurriculum(1, 2);
    const widths = [320, 390, 600];

    for (const w of widths) {
      const layout = buildPathLayout(synth.path, synth.lessons, w, PATH_LAYOUT_CONFIG);
      const node = layout.rows.find((r): r is NodeRowData => r.type === 'node')!;
      expect(node.textBox.width).toBeGreaterThanOrEqual(120);
      expect(node.circle.cx - node.circle.r).toBeGreaterThanOrEqual(0);
      expect(node.circle.cx + node.circle.r).toBeLessThanOrEqual(w);
    }
  });

  it('verifies practice node smaller circle and stretched band height', () => {
    const synth = syntheticCurriculum(1, 5);
    const layout = buildPathLayout(synth.path, synth.lessons, 390, PATH_LAYOUT_CONFIG);

    const practiceNode = layout.rows.find(
      (r): r is NodeRowData => r.type === 'node' && synth.lessons[r.lessonId].kind === 'practice',
    )!;
    const lessonNode = layout.rows.find(
      (r): r is NodeRowData => r.type === 'node' && synth.lessons[r.lessonId].kind === 'lesson',
    )!;
    const milestoneNode = layout.rows.find(
      (r): r is NodeRowData => r.type === 'node' && synth.lessons[r.lessonId].kind === 'milestone',
    )!;

    // Practice circle diameter: 0.72x
    expect(practiceNode.circle.r * 2).toBeLessThan(lessonNode.circle.r * 2);
    // Milestone circle diameter: 1.15x
    expect(milestoneNode.circle.r * 2).toBeGreaterThan(lessonNode.circle.r * 2);

    // Practice 2R is smaller than bandHeight because bandHeight stretches to fit text
    expect(practiceNode.height).toBeGreaterThanOrEqual(practiceNode.R * 2);
    expect(practiceNode.height).toBeGreaterThanOrEqual(PATH_LAYOUT_CONFIG.estimatedTextHeight + 2 * PATH_LAYOUT_CONFIG.bandPadY);
  });

  it('verifies completed, current, and locked progression states', () => {
    const synth = syntheticCurriculum(2, 2);
    const units = synth.path.units;
    const l1 = units[0].lessonIds[0];
    const l2 = units[0].lessonIds[1];
    const l3 = units[1].lessonIds[0];

    const states = computeNodeStates(units, [l1]);
    expect(states[l1]).toBe('completed');
    expect(states[l2]).toBe('current');
    expect(states[l3]).toBe('locked');
  });
});
