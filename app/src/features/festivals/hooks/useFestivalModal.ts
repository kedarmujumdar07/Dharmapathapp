/**
 * Hook to manage the festival detail bottom sheet modal state.
 * Tracks which festival is currently selected and whether the sheet is open.
 */

import { useState, useCallback } from 'react';
import type { FestivalCardData } from '@/types/festival-screen.types';

interface UseFestivalModalReturn {
  /** Whether the bottom sheet is currently visible */
  isOpen: boolean;
  /** The currently selected festival (null when closed) */
  selectedFestival: FestivalCardData | null;
  /** Open the sheet with a specific festival */
  openSheet: (festival: FestivalCardData) => void;
  /** Close the sheet */
  closeSheet: () => void;
}

export function useFestivalModal(): UseFestivalModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<FestivalCardData | null>(null);

  const openSheet = useCallback((festival: FestivalCardData) => {
    setSelectedFestival(festival);
    setIsOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    setIsOpen(false);
    // Keep selectedFestival set during the close animation;
    // it will be overwritten on the next open.
  }, []);

  return { isOpen, selectedFestival, openSheet, closeSheet };
}
