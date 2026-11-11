import type { CurriculumRepository, Path } from '../types/path.types';
import type { LessonData } from '@/features/home/types/lesson.types';
import { PATHS_CURRICULUM_DATA, LESSONS_MAP } from './curriculumData';
import { syntheticCurriculum } from './syntheticCurriculum';

export class LocalCurriculumRepository implements CurriculumRepository {
  private syntheticCache: { path: Path; lessons: Record<string, LessonData> } | null = null;

  private isFixtureMode(): boolean {
    return process.env.EXPO_PUBLIC_PATH_FIXTURE === '1';
  }

  private getSyntheticData() {
    if (!this.syntheticCache) {
      this.syntheticCache = syntheticCurriculum(12, 10);
    }
    return this.syntheticCache;
  }

  async getPath(pathId: string): Promise<Path | null> {
    if (this.isFixtureMode()) {
      return this.getSyntheticData().path;
    }

    const path = PATHS_CURRICULUM_DATA[pathId];
    return path ? JSON.parse(JSON.stringify(path)) : null;
  }

  async getLessons(ids: string[]): Promise<Record<string, LessonData>> {
    if (this.isFixtureMode()) {
      const synthetic = this.getSyntheticData();
      const result: Record<string, LessonData> = {};
      for (const id of ids) {
        if (synthetic.lessons[id]) {
          result[id] = synthetic.lessons[id];
        }
      }
      return result;
    }

    const result: Record<string, LessonData> = {};
    for (const id of ids) {
      const lesson = LESSONS_MAP[id];
      if (lesson) {
        result[id] = JSON.parse(JSON.stringify(lesson));
      }
    }
    return result;
  }
}

export const defaultCurriculumRepository: CurriculumRepository = new LocalCurriculumRepository();
