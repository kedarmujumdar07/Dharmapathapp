import { useLocalSearchParams } from 'expo-router';
import { ComingSoonScreen } from '@/shared/components/ComingSoonScreen';

export default function LessonIntroRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ComingSoonScreen title={`Lesson Intro: ${id ?? ''}`} ticketNumber="2.1" />;
}
