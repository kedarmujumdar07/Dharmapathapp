import { useLocalSearchParams } from 'expo-router';
import { ComingSoonScreen } from '@/shared/components/ComingSoonScreen';

export default function LessonPlayRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ComingSoonScreen title={`Lesson Play: ${id ?? ''}`} ticketNumber="1.2 / 2.2" />;
}
