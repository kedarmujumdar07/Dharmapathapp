import { describe, it, expect } from '@jest/globals';
import { buildPathLayout } from '../layout/buildPathLayout';
import { PATH_LAYOUT_CONFIG } from '../layout/pathLayoutConfig';
import { syntheticCurriculum } from '../content/syntheticCurriculum';
import type { NodeRowData } from '../types/layout.types';

describe('buildPathLayout Engine', () => {
  const testWidths = [320, 390, 412, 600];
  const testScenarios = [
    { units: 1, lessonsPerUnit: 1, description: '1 lesson, 1 unit' },
    { units: 1, lessonsPerUnit: 2, description: '2 lessons, 1 unit' },
    { units: 1, lessonsPerUnit: 3, description: '3 lessons, 1 unit' },
    { units: 2, lessonsPerUnit: 3, description: '6 lessons (many units)' },
    { units: 7, lessonsPerUnit: 1, description: '7 units of 1 lesson' },
    { units: 5, lessonsPerUnit: 10, description: '50 lessons across 5 units' },
  ];

  testScenarios.forEach(({ units, lessonsPerUnit, description }) => {
    testWidths.forEach((width) => {
      describe(`${description} at width ${width}`, () => {
        const { path, lessons } = syntheticCurriculum(units, lessonsPerUnit);
        const layout = buildPathLayout(path, lessons, width, PATH_LAYOUT_CONFIG);

        it('rows tile exactly with zero gaps (offset + height = next offset)', () => {
          for (let i = 0; i < layout.rows.length - 1; i++) {
            const current = layout.rows[i];
            const next = layout.rows[i + 1];
            expect(current.offset + current.height).toBeCloseTo(next.offset, 3);
          }
          const last = layout.rows[layout.rows.length - 1];
          expect(last.offset + last.height).toBeCloseTo(layout.totalHeight, 3);
        });

        it('line is strictly continuous across all row boundaries (end of row i = start of row i+1)', () => {
          for (let i = 0; i < layout.rows.length - 1; i++) {
            const current = layout.rows[i];
            const next = layout.rows[i + 1];

            // In global coordinates:
            const currentGlobalEndY = current.offset + current.endPoint.y;
            const nextGlobalStartY = next.offset + next.startPoint.y;

            // X coordinate must match seamlessly
            expect(current.endPoint.x).toBeCloseTo(next.startPoint.x, 2);
            // Y coordinate must align seamlessly at the row boundary
            expect(currentGlobalEndY).toBeCloseTo(nextGlobalStartY, 2);
          }
        });

        it('node sides alternate strictly by global index across units (first node = left)', () => {
          const nodeRows = layout.rows.filter((r): r is NodeRowData => r.type === 'node');
          nodeRows.forEach((node, idx) => {
            const expectedSide = idx % 2 === 0 ? 'left' : 'right';
            expect(node.side).toBe(expectedSide);
            expect(node.globalIndex).toBe(idx);
          });
        });

        it('text boxes stay inside their band and never overlap the circle', () => {
          const nodeRows = layout.rows.filter((r): r is NodeRowData => r.type === 'node');
          nodeRows.forEach((node) => {
            const { circle, textBox, side } = node;

            // Vertical: text box sits inside band
            expect(textBox.y).toBeGreaterThanOrEqual(0);
            expect(textBox.y + textBox.height).toBeLessThanOrEqual(node.height);

            // Horizontal non-overlap with circle
            if (side === 'left') {
              // Circle is on left, text box is to its right
              const circleRightEdge = circle.cx + circle.r;
              expect(textBox.x).toBeGreaterThan(circleRightEdge);
            } else {
              // Circle is on right, text box is to its left
              const circleLeftEdge = circle.cx - circle.r;
              expect(textBox.x + textBox.width).toBeLessThan(circleLeftEdge);
            }
          });
        });

        it('is completely deterministic (repeated calls return identical result)', () => {
          const secondRun = buildPathLayout(path, lessons, width, PATH_LAYOUT_CONFIG);
          expect(secondRun.totalHeight).toBe(layout.totalHeight);
          expect(secondRun.totalLength).toBe(layout.totalLength);
          expect(secondRun.rows.length).toBe(layout.rows.length);
          for (let i = 0; i < layout.rows.length; i++) {
            expect(secondRun.rows[i].svgPathD).toBe(layout.rows[i].svgPathD);
            expect(secondRun.rows[i].offset).toBe(layout.rows[i].offset);
          }
        });

        it('totalLength equals the exact sum of analytic lengths of all rows', () => {
          const sumOfRows = layout.rows.reduce((acc, row) => acc + row.analyticLength, 0);
          expect(layout.totalLength).toBeCloseTo(sumOfRows, 3);
        });
      });
    });
  });
});
