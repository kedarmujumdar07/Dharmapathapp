import { describe, it, expect } from '@jest/globals';
import { computeNodeStates } from '../state/computeNodeStates';
import type { Unit } from '../types/path.types';

describe('computeNodeStates', () => {
  const units: Unit[] = [
    {
      id: 'unit_1',
      title: 'Unit 1',
      lessonIds: ['l1', 'l2', 'l3'],
    },
    {
      id: 'unit_2',
      title: 'Unit 2',
      lessonIds: ['l4', 'l5'],
    },
    {
      id: 'unit_3',
      title: 'Unit 3',
      lessonIds: ['l6'],
    },
  ];

  it('marks first lesson current and rest locked when none are completed', () => {
    const states = computeNodeStates(units, []);
    expect(states).toEqual({
      l1: 'current',
      l2: 'locked',
      l3: 'locked',
      l4: 'locked',
      l5: 'locked',
      l6: 'locked',
    });
  });

  it('marks completed lessons and progresses current to next uncompleted lesson', () => {
    const states = computeNodeStates(units, ['l1']);
    expect(states).toEqual({
      l1: 'completed',
      l2: 'current',
      l3: 'locked',
      l4: 'locked',
      l5: 'locked',
      l6: 'locked',
    });
  });

  it('unlocks next unit when previous unit is fully completed', () => {
    const states = computeNodeStates(units, ['l1', 'l2', 'l3']);
    expect(states).toEqual({
      l1: 'completed',
      l2: 'completed',
      l3: 'completed',
      l4: 'current',
      l5: 'locked',
      l6: 'locked',
    });
  });

  it('marks all as completed when all lessons are finished', () => {
    const states = computeNodeStates(units, ['l1', 'l2', 'l3', 'l4', 'l5', 'l6']);
    expect(states).toEqual({
      l1: 'completed',
      l2: 'completed',
      l3: 'completed',
      l4: 'completed',
      l5: 'completed',
      l6: 'completed',
    });
    expect(Object.values(states).includes('current')).toBe(false);
  });

  it('safely ignores unknown IDs in completedIds', () => {
    const states = computeNodeStates(units, ['unknown_x', 'l1', 'random_id']);
    expect(states.l1).toBe('completed');
    expect(states.l2).toBe('current');
    expect(states.l3).toBe('locked');
    expect((states as Record<string, string>).unknown_x).toBeUndefined();
  });

  it('handles out-of-order completed IDs gracefully', () => {
    // If l2 was completed out of order, l1 is uncompleted so l1 is current, l2 is completed, l3 is locked
    const states = computeNodeStates(units, ['l2']);
    expect(states).toEqual({
      l1: 'current',
      l2: 'completed',
      l3: 'locked',
      l4: 'locked',
      l5: 'locked',
      l6: 'locked',
    });
  });

  it('keeps subsequent units locked if first unit is not completely finished', () => {
    const states = computeNodeStates(units, ['l1', 'l2']); // l3 not complete
    expect(states.l3).toBe('current');
    expect(states.l4).toBe('locked');
    expect(states.l5).toBe('locked');
    expect(states.l6).toBe('locked');
  });

  it('handles empty units array', () => {
    const states = computeNodeStates([], ['l1']);
    expect(states).toEqual({});
  });
});
