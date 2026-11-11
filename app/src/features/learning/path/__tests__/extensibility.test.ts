import { describe, it, expect } from '@jest/globals';
import { buildPathLayout } from '../layout/buildPathLayout';
import { getUnitAccent, PATH_ACCENT_PALETTE } from '../pathTheme';
import type { Path } from '../types/path.types';
import type { LessonData } from '@/features/home/types/lesson.types';

describe('Extensibility Proof: Pure JSON content addition', () => {
  it('picks up 3rd unit (7 lessons) and 4th unit (1 lesson) with new colors without code changes', () => {
    // Original path: 2 units (1 lesson each)
    // Extended path: add 3rd unit (7 lessons) and 4th unit (1 lesson)
    const extendedPath: Path = {
      id: 'extensibility_path',
      title: 'EXTENSIBLE DHARMA PATH',
      subtitle: 'Demonstrating zero-code layout adaptation',
      units: [
        {
          id: 'unit_1',
          title: 'FOUNDATION',
          lessonIds: ['ext_l1'],
        },
        {
          id: 'unit_2',
          title: 'AWAKENING',
          lessonIds: ['ext_l2'],
        },
        {
          id: 'unit_3',
          title: 'DEEP MEDITATION (7 LESSONS)',
          lessonIds: ['ext_l3_1', 'ext_l3_2', 'ext_l3_3', 'ext_l3_4', 'ext_l3_5', 'ext_l3_6', 'ext_l3_7'],
        },
        {
          id: 'unit_4',
          title: 'INTEGRATION (1 LESSON)',
          lessonIds: ['ext_l4_1'],
        },
      ],
    };

    const mockLessons: Record<string, LessonData> = {
      ext_l1: { id: 'ext_l1', pathId: 'itihasa', subItemId: 's1', title: 'Lesson 1', subtitle: '', categoryLabel: '', pointsAwarded: 50, isFeatured: false, contentPreview: '', kind: 'lesson' },
      ext_l2: { id: 'ext_l2', pathId: 'itihasa', subItemId: 's2', title: 'Lesson 2', subtitle: '', categoryLabel: '', pointsAwarded: 50, isFeatured: false, contentPreview: '', kind: 'milestone' },
      ext_l3_1: { id: 'ext_l3_1', pathId: 'itihasa', subItemId: 's3', title: 'Meditation 1', subtitle: '', categoryLabel: '', pointsAwarded: 40, isFeatured: false, contentPreview: '', kind: 'lesson' },
      ext_l3_2: { id: 'ext_l3_2', pathId: 'itihasa', subItemId: 's3', title: 'Meditation 2', subtitle: '', categoryLabel: '', pointsAwarded: 40, isFeatured: false, contentPreview: '', kind: 'practice' },
      ext_l3_3: { id: 'ext_l3_3', pathId: 'itihasa', subItemId: 's3', title: 'Meditation 3', subtitle: '', categoryLabel: '', pointsAwarded: 40, isFeatured: false, contentPreview: '', kind: 'lesson' },
      ext_l3_4: { id: 'ext_l3_4', pathId: 'itihasa', subItemId: 's3', title: 'Meditation 4', subtitle: '', categoryLabel: '', pointsAwarded: 40, isFeatured: false, contentPreview: '', kind: 'practice' },
      ext_l3_5: { id: 'ext_l3_5', pathId: 'itihasa', subItemId: 's3', title: 'Meditation 5', subtitle: '', categoryLabel: '', pointsAwarded: 40, isFeatured: false, contentPreview: '', kind: 'lesson' },
      ext_l3_6: { id: 'ext_l3_6', pathId: 'itihasa', subItemId: 's3', title: 'Meditation 6', subtitle: '', categoryLabel: '', pointsAwarded: 40, isFeatured: false, contentPreview: '', kind: 'lesson' },
      ext_l3_7: { id: 'ext_l3_7', pathId: 'itihasa', subItemId: 's3', title: 'Meditation 7', subtitle: '', categoryLabel: '', pointsAwarded: 70, isFeatured: false, contentPreview: '', kind: 'milestone' },
      ext_l4_1: { id: 'ext_l4_1', pathId: 'itihasa', subItemId: 's4', title: 'Final Integration', subtitle: '', categoryLabel: '', pointsAwarded: 100, isFeatured: false, contentPreview: '', kind: 'milestone' },
    };

    const layout = buildPathLayout(extendedPath, mockLessons, 390);

    // Total rows = 4 unit headers + 10 nodes + 1 end-cap = 15 rows
    expect(layout.rows).toHaveLength(15);

    // Unit accents:
    // Unit 0 (index 0) = Red (#C32826)
    // Unit 1 (index 1) = Ochre (#D97706)
    // Unit 2 (index 2, 7 lessons) = Deep Teal (#0D9488)
    // Unit 3 (index 3, 1 lesson) = Indigo (#4338CA)
    expect(getUnitAccent(extendedPath.units[0], 0)).toBe(PATH_ACCENT_PALETTE[0]);
    expect(getUnitAccent(extendedPath.units[1], 1)).toBe(PATH_ACCENT_PALETTE[1]);
    expect(getUnitAccent(extendedPath.units[2], 2)).toBe(PATH_ACCENT_PALETTE[2]); // Deep Teal
    expect(getUnitAccent(extendedPath.units[3], 3)).toBe(PATH_ACCENT_PALETTE[3]); // Indigo

    // Node count in Unit 3:
    const unit3Nodes = layout.rows.filter(
      (r) => r.type === 'node' && (r as any).unitId === 'unit_3'
    );
    expect(unit3Nodes).toHaveLength(7);

    // Node count in Unit 4:
    const unit4Nodes = layout.rows.filter(
      (r) => r.type === 'node' && (r as any).unitId === 'unit_4'
    );
    expect(unit4Nodes).toHaveLength(1);
  });
});
