import type { LessonData } from '@/features/home/types/lesson.types';

/**
 * Lesson catalogue — 6 lessons across the 4 paths.
 * Strategy: the lesson with isFeatured=true is today's featured lesson.
 * If already completed, useDailyContent picks the next uncompleted in order.
 */
export const LESSONS_DATA: LessonData[] = [
  {
    id: 'lesson_ramayana_ayodhya_12',
    pathId: 'itihasa',
    subItemId: 'itihasa_ramayana',
    title: "RAMA'S VOW & THE FOREST JOURNEY",
    subtitle: 'LESSON 12 • DUTY & DHARMA IN EXILE',
    categoryLabel: 'ITIHASA • AYODHYA KANDA',
    pointsAwarded: 60,
    isFeatured: true,
    contentPreview:
      'When Kaikeyi demands the two boons from Dasharatha, Rama accepts exile without hesitation. This lesson explores how Rama embodies the dharma of a son and a prince — choosing righteousness over personal comfort.',
  },
  {
    id: 'lesson_gita_sankhya_yoga',
    pathId: 'itihasa',
    subItemId: 'itihasa_mahabharata',
    title: 'SANKHYA YOGA: ACTION WITHOUT ATTACHMENT',
    subtitle: 'BHAGAVAD GITA • CHAPTER 2 VERSE 47',
    categoryLabel: 'ITIHASA • MAHABHARATA',
    pointsAwarded: 50,
    isFeatured: false,
    contentPreview:
      'Arjuna stands paralysed on the battlefield. Krishna reveals the eternal wisdom of the Atman and teaches the art of performing duty without attachment to results — the cornerstone of Karma Yoga.',
  },
  {
    id: 'lesson_krishna_leela_kalia',
    pathId: 'leela',
    subItemId: 'leela_krishna',
    title: 'THE KALIA SERPENT & DIVINE PLAY',
    subtitle: 'KRISHNA LEELA • VRINDAVAN PASTIME',
    categoryLabel: 'LEELA • VRINDAVAN',
    pointsAwarded: 45,
    isFeatured: false,
    contentPreview:
      'Young Krishna dives into the Yamuna and defeats the many-headed serpent Kalia, forcing him to leave the river. This leela reveals how the divine playfully restores cosmic order.',
  },
  {
    id: 'lesson_shiva_neelkanth',
    pathId: 'leela',
    subItemId: 'leela_shiva',
    title: 'NEELKANTH: THE BLUE-THROATED ONE',
    subtitle: 'SHIVA LEELA • SAMUDRA MANTHAN',
    categoryLabel: 'LEELA • SHIVA PURANA',
    pointsAwarded: 55,
    isFeatured: false,
    contentPreview:
      'During the churning of the cosmic ocean, the deadly poison Halahala emerges. Shiva drinks it to save creation — his throat turns blue. This story reveals the nature of self-sacrifice and cosmic compassion.',
  },
  {
    id: 'lesson_chardham_kedarnath',
    pathId: 'tirtha',
    subItemId: 'tirtha_chardham',
    title: 'KEDARNATH: THE LORD OF THE FIELD',
    subtitle: 'TIRTHA PATH • CHAR DHAM YATRA',
    categoryLabel: 'TIRTHA • UTTARAKHAND',
    pointsAwarded: 70,
    isFeatured: false,
    contentPreview:
      'Situated at 3,583 metres in the Himalayas, Kedarnath is one of the 12 Jyotirlingas. The Pandavas sought Shiva here for atonement. Learn the significance, history, and proper way to conduct this pilgrimage.',
  },
  {
    id: 'lesson_diwali_lakshmi',
    pathId: 'utsava',
    subItemId: 'utsava_diwali',
    title: 'DIWALI: THE FESTIVAL OF LIGHT & PROSPERITY',
    subtitle: 'UTSAVA PATH • DEEPAWALI SIGNIFICANCE',
    categoryLabel: 'UTSAVA • KARTIK AMAVASYA',
    pointsAwarded: 40,
    isFeatured: false,
    contentPreview:
      'Diwali marks the return of Rama to Ayodhya, the victory of light over darkness. Learn the Lakshmi Puja Vidhi, the significance of the 5-day celebration, and auspicious Deepawali rituals.',
  },
];
