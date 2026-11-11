import { describe, it, expect } from '@jest/globals';
import { syntheticCurriculum } from '../content/syntheticCurriculum';
import { buildPathLayout } from '../layout/buildPathLayout';

describe('syntheticCurriculum fixture generator', () => {
  it('generates exact unit and lesson counts for 12 units x 10 lessons', () => {
    const { path, lessons } = syntheticCurriculum(12, 10);
    expect(path.units).toHaveLength(12);
    expect(Object.keys(lessons)).toHaveLength(120);

    const allLessonIds = path.units.flatMap((u) => u.lessonIds);
    expect(allLessonIds).toHaveLength(120);
    const uniqueIds = new Set(allLessonIds);
    expect(uniqueIds.size).toBe(120);
  });

  it('generates a variety of lesson kinds (lesson, practice, milestone)', () => {
    const { lessons } = syntheticCurriculum(12, 10);
    const kinds = new Set(Object.values(lessons).map((l) => l.kind));
    expect(kinds.has('lesson')).toBe(true);
    expect(kinds.has('practice')).toBe(true);
    expect(kinds.has('milestone')).toBe(true);
  });

  it('runs layout engine smoothly on 12x10 benchmark with 133 rows', () => {
    const start = Date.now();
    const { path, lessons } = syntheticCurriculum(12, 10);
    const layout = buildPathLayout(path, lessons, 390);
    const elapsedMs = Date.now() - start;

    // 12 units headers + 120 nodes + 1 end-cap = 133 rows
    expect(layout.rows).toHaveLength(133);
    expect(layout.totalHeight).toBeGreaterThan(15000);
    expect(layout.totalLength).toBeGreaterThan(15000);
    // Computation of 133 complex geometric rows should be fast (< 250ms)
    expect(elapsedMs).toBeLessThan(250);
  });
});
