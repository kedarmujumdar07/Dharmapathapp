import { useLocalSearchParams } from 'expo-router';
import { ComingSoonScreen } from '@/shared/components/ComingSoonScreen';

export default function FestivalDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ComingSoonScreen title={`Festival: ${id ?? ''}`} ticketNumber="5.5" />;
}
