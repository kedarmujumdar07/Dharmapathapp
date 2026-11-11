import type { Path, Unit, CurriculumData } from '../types/path.types';
import type { LessonData, LessonKind } from '@/features/home/types/lesson.types';

export function syntheticCurriculum(unitCount: number, lessonsPerUnit: number): CurriculumData {
  const units: Unit[] = [];
  const lessons: Record<string, LessonData> = {};
  let globalIndex = 0;

  for (let u = 0; u < unitCount; u++) {
    const unitId = `synthetic_unit_${u + 1}`;
    const lessonIds: string[] = [];

    for (let l = 0; l < lessonsPerUnit; l++) {
      globalIndex++;
      const lessonId = `synth_lesson_${u + 1}_${l + 1}`;
      lessonIds.push(lessonId);

      const kind: LessonKind =
        globalIndex % 5 === 3 ? 'practice' : globalIndex % 5 === 0 ? 'milestone' : 'lesson';

      lessons[lessonId] = {
        id: lessonId,
        pathId: 'itihasa',
        subItemId: `subitem_${u + 1}`,
        title: `SACRED DISCOURSE ${globalIndex}`,
        subtitle: `UNIT ${u + 1} • STEP ${l + 1}`,
        categoryLabel: `DHARMA • SECTION ${u + 1}`,
        pointsAwarded: 50 + (l % 4) * 10,
        isFeatured: globalIndex === 1,
        summary: `Reflective exploration of core tenets and timeless insight for journey step ${globalIndex}.`,
        kind,
        minutes: 4 + (globalIndex % 5),
        questionCount: 4 + (globalIndex % 6),
        contentPreview: `In-depth contemplation on chapter ${u + 1}, verse ${l + 1} of eternal philosophical wisdom.`,
      };
    }

    units.push({
      id: unitId,
      title: `CHAPTER ${u + 1}: PATH OF WISDOM`,
      subtitle: `Essential teachings & foundational practices (${lessonsPerUnit} lessons)`,
      lessonIds,
    });
  }

  const path: Path = {
    id: 'synthetic_path',
    title: 'SYNTHETIC GRAND PATH',
    subtitle: 'High-volume performance and stress test curriculum',
    units,
  };

  return { path, lessons };
}
