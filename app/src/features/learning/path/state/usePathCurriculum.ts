import { useState, useEffect } from 'react';
import type { CurriculumStatus, CurriculumData, CurriculumRepository } from '../types/path.types';
import { defaultCurriculumRepository } from '../content/localCurriculumRepository';

export interface UsePathCurriculumReturn {
  status: CurriculumStatus;
  data: CurriculumData | null;
  error?: string;
}

export function usePathCurriculum(
  pathId: string,
  repository: CurriculumRepository = defaultCurriculumRepository,
): UsePathCurriculumReturn {
  const [status, setStatus] = useState<CurriculumStatus>('loading');
  const [data, setData] = useState<CurriculumData | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setStatus('loading');
        setError(undefined);

        const path = await repository.getPath(pathId);
        if (isCancelled) return;

        if (!path) {
          setData(null);
          setStatus('empty');
          return;
        }

        const allLessonIds = path.units.flatMap((u) => u.lessonIds);
        if (allLessonIds.length === 0) {
          setData({ path, lessons: {} });
          setStatus('empty');
          return;
        }

        const lessons = await repository.getLessons(allLessonIds);
        if (isCancelled) return;

        setData({ path, lessons });
        setStatus('ready');
      } catch (err) {
        if (isCancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load curriculum');
        setStatus('error');
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [pathId, repository]);

  return { status, data, error };
}
