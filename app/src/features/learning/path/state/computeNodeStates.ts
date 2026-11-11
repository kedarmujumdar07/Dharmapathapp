import type { Unit } from '../types/path.types';

export type NodeState = 'completed' | 'current' | 'locked';
export type ProgressionPolicy = 'sequential';

/**
 * Pure function: computes the progression state ('completed' | 'current' | 'locked')
 * for each lesson in the path.
 *
 * Rules:
 * - Unknown IDs in completedIds are safely ignored.
 * - Under 'sequential' policy, a unit unlocks only when all lessons in preceding units are completed.
 * - In an unlocked unit, completed lessons are 'completed'.
 * - The first uncompleted lesson in the path becomes 'current'.
 * - All subsequent uncompleted lessons remain 'locked'.
 */
export function computeNodeStates(
  units: Unit[],
  completedIds: string[] | Set<string>,
  _policy: ProgressionPolicy = 'sequential',
): Record<string, NodeState> {
  const completedSet = completedIds instanceof Set ? completedIds : new Set(completedIds);
  const result: Record<string, NodeState> = {};

  let currentAssigned = false;
  let unitUnlocked = true;

  for (let u = 0; u < units.length; u++) {
    const unit = units[u];
    let allLessonsInUnitCompleted = true;

    for (let i = 0; i < unit.lessonIds.length; i++) {
      const lessonId = unit.lessonIds[i];
      const isCompleted = completedSet.has(lessonId);

      if (isCompleted) {
        result[lessonId] = 'completed';
      } else {
        allLessonsInUnitCompleted = false;

        if (unitUnlocked && !currentAssigned) {
          result[lessonId] = 'current';
          currentAssigned = true;
        } else {
          result[lessonId] = 'locked';
        }
      }
    }

    // The next unit is only unlocked if this unit was unlocked AND all its lessons were completed
    unitUnlocked = unitUnlocked && allLessonsInUnitCompleted;
  }

  return result;
}
