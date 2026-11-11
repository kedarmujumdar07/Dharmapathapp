import { useLocalSearchParams } from 'expo-router';
import { ComingSoonScreen } from '@/shared/components/ComingSoonScreen';

export default function LessonResultsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ComingSoonScreen title={`Lesson Results: ${id ?? ''}`} ticketNumber="2.7" />;
}
