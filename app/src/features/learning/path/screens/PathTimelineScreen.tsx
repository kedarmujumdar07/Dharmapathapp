import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { usePathCurriculum } from '../state/usePathCurriculum';
import { useUserProgress } from '@/features/home/state/useUserProgress';
import { computeNodeStates } from '../state/computeNodeStates';
import { buildPathLayout } from '../layout/buildPathLayout';
import { PATH_LAYOUT_CONFIG } from '../layout/pathLayoutConfig';
import { getUnitAccent, PathColors, PathFonts } from '../pathTheme';
import { TimelineRowRenderer } from '../components/TimelineRowRenderer';
import { PathJumpPill } from '../components/PathJumpPill';
import type { TimelineRow, NodeRowData } from '../types/layout.types';
import { routes } from '@/shared/navigation/routes';

interface PathTimelineScreenProps {
  pathId: string;
}

export const PathTimelineScreen: React.FC<PathTimelineScreenProps> = ({ pathId }) => {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const flatListRef = useRef<FlatList<TimelineRow>>(null);

  const { status, data, error } = usePathCurriculum(pathId);
  const { progress } = useUserProgress();

  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Compute progression state
  const nodeStates = useMemo(() => {
    if (!data?.path) return {};
    return computeNodeStates(data.path.units, progress.completedLessons);
  }, [data?.path, progress.completedLessons]);

  // Compute continuous timeline geometry (pure, memoized)
  const layout = useMemo(() => {
    if (!data?.path || !data?.lessons) {
      return { rows: [], totalHeight: 0, totalLength: 0 };
    }
    return buildPathLayout(data.path, data.lessons, windowWidth, PATH_LAYOUT_CONFIG);
  }, [data?.path, data?.lessons, windowWidth]);

  // Find index of current row for scrolling & jump pill
  const currentRowIndex = useMemo(() => {
    return layout.rows.findIndex((row) => {
      if (row.type === 'node') {
        const nodeRow = row as NodeRowData;
        return nodeStates[nodeRow.lessonId] === 'current';
      }
      return false;
    });
  }, [layout.rows, nodeStates]);

  // Check if all lessons are complete
  const isPathComplete = useMemo(() => {
    if (!data?.path) return false;
    const allIds = data.path.units.flatMap((u) => u.lessonIds);
    if (allIds.length === 0) return false;
    return allIds.every((id) => nodeStates[id] === 'completed');
  }, [data?.path, nodeStates]);

  // Calculate cumulative progress distance along the line up to the traveler marker
  const progressLength = useMemo(() => {
    if (isPathComplete) {
      return layout.totalLength;
    }
    if (currentRowIndex >= 0) {
      const currentRow = layout.rows[currentRowIndex] as NodeRowData;
      return currentRow.cumulativeLengthStart + currentRow.progressMarkerLength;
    }
    return 0;
  }, [isPathComplete, currentRowIndex, layout.totalLength, layout.rows]);

  // Initial auto-scroll so current lesson sits ~35% from the top
  const initialScrolledRef = useRef(false);
  useEffect(() => {
    if (currentRowIndex >= 0 && !initialScrolledRef.current && layout.rows.length > 0) {
      initialScrolledRef.current = true;
      const timeout = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentRowIndex,
          viewPosition: 0.35,
          animated: false,
        });
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [currentRowIndex, layout.rows.length]);

  // Jump pill visibility and direction
  const isCurrentVisible = useMemo(() => {
    if (currentRowIndex < 0 || viewportHeight === 0) return true;
    const currentRow = layout.rows[currentRowIndex];
    if (!currentRow) return true;
    const currentTop = currentRow.offset;
    const currentBottom = currentRow.offset + currentRow.height;
    return currentBottom >= scrollY && currentTop <= scrollY + viewportHeight;
  }, [currentRowIndex, layout.rows, scrollY, viewportHeight]);

  const jumpDirection: 'up' | 'down' = useMemo(() => {
    if (currentRowIndex < 0) return 'down';
    const currentRow = layout.rows[currentRowIndex];
    if (!currentRow) return 'down';
    return currentRow.offset < scrollY ? 'up' : 'down';
  }, [currentRowIndex, layout.rows, scrollY]);

  const handleJumpToCurrent = useCallback(() => {
    if (currentRowIndex >= 0) {
      flatListRef.current?.scrollToIndex({
        index: currentRowIndex,
        viewPosition: 0.35,
        animated: true,
      });
    }
  }, [currentRowIndex]);

  const handleLessonPress = useCallback(
    (lessonId: string) => {
      // Use centralized routes helper (ticket 3.3)
      router.push(routes.lesson(lessonId));
    },
    [router],
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  }, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<TimelineRow> | null | undefined, index: number) => {
      const row = layout.rows[index];
      return {
        length: row?.height ?? 100,
        offset: row?.offset ?? 0,
        index,
      };
    },
    [layout.rows],
  );

  // Map unit completed counts
  const unitCompletedCounts = useMemo(() => {
    if (!data?.path) return {};
    const counts: Record<string, number> = {};
    for (const unit of data.path.units) {
      counts[unit.id] = unit.lessonIds.filter((id) => nodeStates[id] === 'completed').length;
    }
    return counts;
  }, [data?.path, nodeStates]);

  // Map previous lesson titles for locked hints
  const previousLessonTitles = useMemo(() => {
    if (!data?.path || !data?.lessons) return {};
    const result: Record<string, string> = {};
    const allLessonIds = data.path.units.flatMap((u) => u.lessonIds);
    for (let i = 1; i < allLessonIds.length; i++) {
      const prevLesson = data.lessons[allLessonIds[i - 1]];
      result[allLessonIds[i]] = prevLesson?.title ?? 'previous lesson';
    }
    return result;
  }, [data?.path, data?.lessons]);

  const renderRow = useCallback(
    ({ item }: { item: TimelineRow }) => {
      const unitIndex =
        item.type === 'unit-header'
          ? item.unitIndex
          : item.type === 'node'
            ? item.unitIndex
            : 0;

      const unit = data?.path?.units[unitIndex] ?? { accent: undefined };
      const accent = getUnitAccent(unit, unitIndex);

      if (item.type === 'unit-header') {
        return (
          <TimelineRowRenderer
            row={item}
            width={windowWidth}
            accent={accent}
            completedCountInUnit={unitCompletedCounts[item.unitId] ?? 0}
            isPathComplete={isPathComplete}
            progressLength={progressLength}
            onLessonPress={handleLessonPress}
          />
        );
      }

      if (item.type === 'end-cap') {
        return (
          <TimelineRowRenderer
            row={item}
            width={windowWidth}
            accent={accent}
            completedCountInUnit={0}
            isPathComplete={isPathComplete}
            progressLength={progressLength}
            onLessonPress={handleLessonPress}
          />
        );
      }

      const nodeRow = item as NodeRowData;
      const lesson = data?.lessons[nodeRow.lessonId];
      const state = nodeStates[nodeRow.lessonId] ?? 'locked';

      return (
        <TimelineRowRenderer
          row={nodeRow}
          width={windowWidth}
          lesson={lesson}
          previousLessonTitle={previousLessonTitles[nodeRow.lessonId]}
          state={state}
          accent={accent}
          completedCountInUnit={unitCompletedCounts[nodeRow.unitId] ?? 0}
          isPathComplete={isPathComplete}
          progressLength={progressLength}
          onLessonPress={handleLessonPress}
        />
      );
    },
    [
      data?.path?.units,
      data?.lessons,
      windowWidth,
      unitCompletedCounts,
      isPathComplete,
      progressLength,
      nodeStates,
      previousLessonTitles,
      handleLessonPress,
    ],
  );

  if (status === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={PathColors.ink} />
        <Text style={styles.loadingText}>Loading sacred path...</Text>
      </View>
    );
  }

  if (status === 'empty' || !data?.path) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Path not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>RETURN TO ALL PATHS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Error loading path</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={styles.screen}
      onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
    >
      {/* Top Swiss-style Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.navBackBtn}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Back to all paths"
        >
          <Text style={styles.navBackText}>◀  BACK</Text>
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.pathHeaderTitle}>
          {data.path.title}
        </Text>
      </View>

      {/* Single Continuous Vertical FlatList */}
      <FlatList
        ref={flatListRef}
        data={layout.rows}
        keyExtractor={(item) =>
          item.type === 'node'
            ? `node_${(item as NodeRowData).lessonId}`
            : item.type === 'unit-header'
              ? `unit_header_${item.unitId}`
              : 'end_cap'
        }
        renderItem={renderRow}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews={false}
        onScroll={onScroll}
        scrollEventThrottle={32}
        contentContainerStyle={[styles.listContent, { minHeight: layout.totalHeight }]}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Jump to Current Pill */}
      <PathJumpPill
        visible={!isCurrentVisible && currentRowIndex >= 0}
        direction={jumpDirection}
        onPress={handleJumpToCurrent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PathColors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(26, 25, 20, 0.1)',
    backgroundColor: PathColors.background,
    zIndex: 20,
    gap: 12,
  },
  navBackBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: PathColors.white,
    borderWidth: 1.5,
    borderColor: PathColors.borderDark,
    borderRadius: 8,
  },
  navBackText: {
    fontFamily: PathFonts.displayExtraBold,
    fontSize: 11,
    color: PathColors.ink,
  },
  pathHeaderTitle: {
    flex: 1,
    fontFamily: PathFonts.display,
    fontSize: 15,
    color: PathColors.ink,
    letterSpacing: -0.2,
  },
  listContent: {
    paddingBottom: 48,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PathColors.background,
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontFamily: PathFonts.sans,
    fontSize: 14,
    color: PathColors.inkMuted,
  },
  errorTitle: {
    fontFamily: PathFonts.display,
    fontSize: 18,
    color: PathColors.ink,
    marginBottom: 8,
  },
  errorMessage: {
    fontFamily: PathFonts.sans,
    fontSize: 13,
    color: PathColors.inkMuted,
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: PathColors.white,
    borderWidth: 2,
    borderColor: PathColors.borderDark,
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: PathFonts.displayExtraBold,
    fontSize: 12,
    color: PathColors.ink,
  },
});
