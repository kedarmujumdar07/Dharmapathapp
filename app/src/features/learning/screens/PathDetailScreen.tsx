import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { PathTimelineScreen } from '../path/screens/PathTimelineScreen';

export const PathDetailScreen: React.FC = () => {
  const { pathId } = useLocalSearchParams<{ pathId: string }>();
  return <PathTimelineScreen pathId={pathId || 'itihasa'} />;
};

export default PathDetailScreen;
