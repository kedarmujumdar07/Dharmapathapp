import { useLocalSearchParams } from 'expo-router';
import { ComingSoonScreen } from '@/shared/components/ComingSoonScreen';

export default function ScriptureDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ComingSoonScreen title={`Scripture: ${id ?? ''}`} ticketNumber="5.6" />;
}
