import type { Path } from '../types/path.types';
import { LESSONS_DATA } from '@/features/home/data/lessonsData';
import type { LessonData } from '@/features/home/types/lesson.types';

export const PATHS_CURRICULUM_DATA: Record<string, Path> = {
  itihasa: {
    id: 'itihasa',
    title: '1. ITIHASA PATH',
    subtitle: 'Ramayana, Mahabharata & Vishnu Avatars',
    units: [
      {
        id: 'itihasa_unit_1',
        title: 'RAMAYANA',
        subtitle: 'The Epic of Righteousness',
        lessonIds: ['lesson_ramayana_ayodhya_12'],
      },
      {
        id: 'itihasa_unit_2',
        title: 'MAHABHARATA',
        subtitle: 'The Field of Dharma & Bhagavad Gita',
        lessonIds: ['lesson_gita_sankhya_yoga'],
      },
    ],
  },
  leela: {
    id: 'leela',
    title: '2. LEELA PATH',
    subtitle: 'Krishna, Shiva, Devi & Ganesha Stories',
    units: [
      {
        id: 'leela_unit_1',
        title: 'KRISHNA LEELA',
        subtitle: 'Divine Play & Pastimes',
        lessonIds: ['lesson_krishna_leela_kalia'],
      },
      {
        id: 'leela_unit_2',
        title: 'SHIVA LEELA',
        subtitle: 'Cosmic Compassion & Self-Sacrifice',
        lessonIds: ['lesson_shiva_neelkanth'],
      },
    ],
  },
  tirtha: {
    id: 'tirtha',
    title: '3. TIRTHA PATH',
    subtitle: 'Char Dham, 12 Jyotirlingas & Shakti Peethas',
    units: [
      {
        id: 'tirtha_unit_1',
        title: 'CHAR DHAM YATRA',
        subtitle: 'Himalayan Sanctuaries of Peace',
        lessonIds: ['lesson_chardham_kedarnath'],
      },
    ],
  },
  utsava: {
    id: 'utsava',
    title: '4. UTSAVA PATH',
    subtitle: 'Diwali, Shivaratri, Navratri & Fasts',
    units: [
      {
        id: 'utsava_unit_1',
        title: 'DEEPAWALI',
        subtitle: 'The Festival of Light & Prosperity',
        lessonIds: ['lesson_diwali_lakshmi'],
      },
    ],
  },
};

export const LESSONS_MAP: Record<string, LessonData> = LESSONS_DATA.reduce<Record<string, LessonData>>(
  (acc, lesson) => {
    acc[lesson.id] = lesson;
    return acc;
  },
  {},
);
