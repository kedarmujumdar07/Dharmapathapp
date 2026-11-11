import type { Path } from '../types/path.types';
import type { LessonData } from '@/features/home/types/lesson.types';
import type {
  PathLayoutResult,
  TimelineRow,
  NodeRowData,
  UnitHeaderRowData,
  EndCapRowData,
  NodeSide,
} from '../types/layout.types';
import { PATH_LAYOUT_CONFIG, type PathLayoutConfig } from './pathLayoutConfig';

/**
 * Deterministic hash to generate a pseudo-random jitter between -1 and 1
 * seeded by lessonId (never Math.random).
 */
function deterministicJitter(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return ((Math.abs(hash) % 1000) / 500) - 1;
}

const layoutCache = new Map<string, PathLayoutResult>();

/**
 * Pure layout engine for the continuous timeline snake line and row elements.
 * Fully deterministic; independent of user progress state.
 */
export function buildPathLayout(
  path: Path,
  lessons: Record<string, LessonData>,
  width: number,
  config: PathLayoutConfig = PATH_LAYOUT_CONFIG,
): PathLayoutResult {
  const cacheKey = `${path.id}_${path.units.map((u) => u.id + ':' + u.lessonIds.join(',')).join(';')}_${width}`;
  const cached = layoutCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const contentWidth = Math.min(width, config.maxContentWidth);
  const contentOffsetX = (width - contentWidth) / 2;
  const xL = contentOffsetX + config.marginX;
  const xR = contentOffsetX + contentWidth - config.marginX;

  const baseDiameter = Math.max(
    config.baseDiameterMin,
    Math.min(config.baseDiameterMax, config.baseDiameterRatio * contentWidth),
  );

  const rows: TimelineRow[] = [];
  let currentOffset = 0;
  let cumulativeLength = 0;
  let globalIndex = 0;

  // Track the previous node's horizontal center and outer edge
  let prevNodeCx: number | null = null;
  let prevNodeExt: number | null = null;

  // Flatten lessons to know the absolute total count and last lesson
  const allLessonIds = path.units.flatMap((u) => u.lessonIds);
  const totalLessonsCount = allLessonIds.length;

  for (let u = 0; u < path.units.length; u++) {
    const unit = path.units[u];
    const unitLessonCount = unit.lessonIds.length;
    if (unitLessonCount === 0) continue;

    // Precalculate next node's geometry so the header line knows where to connect
    const nextLessonId = unit.lessonIds[0];
    const nextLesson = lessons[nextLessonId];
    const nextKind = nextLesson?.kind || 'lesson';
    const nextFactor = config.kindFactors[nextKind] ?? 1.0;
    const nextR = (baseDiameter * nextFactor) / 2 + config.lineGap;
    const nextSide: NodeSide = globalIndex % 2 === 0 ? 'left' : 'right';
    const nextJitterVal =
      deterministicJitter(nextLessonId) * config.jitterPercent * (xR - xL);
    const nextCx =
      nextSide === 'left'
        ? xL + nextR + Math.max(0, nextJitterVal)
        : xR - nextR - Math.max(0, -nextJitterVal);
    const nextExt = nextSide === 'left' ? nextCx - nextR : nextCx + nextR;

    // ─────────────────────────────────────────────────────────────────────────
    // 1. UNIT HEADER ROW
    // ─────────────────────────────────────────────────────────────────────────
    const headerHeight = config.headerHeight;
    let headerSvgPath = '';
    let headerAnalyticLength = 0;
    let headerStartPoint = { x: nextExt, y: 0 };
    let headerEndPoint = { x: nextExt, y: headerHeight };

    if (u === 0 || prevNodeCx === null) {
      // First unit: vertical tail from the top at next node's outer edge
      headerSvgPath = `M ${nextExt} 0 L ${nextExt} ${headerHeight}`;
      headerAnalyticLength = headerHeight;
      headerStartPoint = { x: nextExt, y: 0 };
      headerEndPoint = { x: nextExt, y: headerHeight };
    } else {
      // Later units: horizontal run from prevNodeCx, corner arc, vertical tail down
      const cr = Math.min(config.cornerRadius, Math.abs(nextExt - prevNodeCx) / 2);
      headerStartPoint = { x: prevNodeCx, y: 0 };

      if (nextExt < prevNodeCx) {
        // Turning down towards left edge
        headerSvgPath = `M ${prevNodeCx} 0 L ${nextExt + cr} 0 A ${cr} ${cr} 0 0 0 ${nextExt} ${cr} L ${nextExt} ${headerHeight}`;
      } else {
        // Turning down towards right edge
        headerSvgPath = `M ${prevNodeCx} 0 L ${nextExt - cr} 0 A ${cr} ${cr} 0 0 1 ${nextExt} ${cr} L ${nextExt} ${headerHeight}`;
      }
      headerAnalyticLength =
        Math.abs(nextExt - prevNodeCx) - cr + (cr * Math.PI) / 2 + (headerHeight - cr);
      headerEndPoint = { x: nextExt, y: headerHeight };
    }

    // Header text box sits on side opposite the tail
    const isTailOnLeft = nextExt <= (xL + xR) / 2;
    const headerTextBox = isTailOnLeft
      ? {
          x: nextExt + 28,
          y: (headerHeight - 80) / 2,
          width: xR - (nextExt + 28),
          height: 80,
        }
      : {
          x: xL,
          y: (headerHeight - 80) / 2,
          width: nextExt - 28 - xL,
          height: 80,
        };

    const headerRow: UnitHeaderRowData = {
      type: 'unit-header',
      unitId: unit.id,
      unitIndex: u,
      title: unit.title,
      subtitle: unit.subtitle,
      totalLessons: unitLessonCount,
      offset: currentOffset,
      height: headerHeight,
      svgPathD: headerSvgPath,
      analyticLength: headerAnalyticLength,
      cumulativeLengthStart: cumulativeLength,
      startPoint: headerStartPoint,
      endPoint: headerEndPoint,
      textBox: headerTextBox,
    };

    rows.push(headerRow);
    currentOffset += headerHeight;
    cumulativeLength += headerAnalyticLength;

    // ─────────────────────────────────────────────────────────────────────────
    // 2. LESSON NODES IN UNIT
    // ─────────────────────────────────────────────────────────────────────────
    for (let l = 0; l < unitLessonCount; l++) {
      const lessonId = unit.lessonIds[l];
      const lesson = lessons[lessonId];
      const kind = lesson?.kind || 'lesson';
      const factor = config.kindFactors[kind] ?? 1.0;
      const diameter = baseDiameter * factor;
      const r = diameter / 2;
      const R = r + config.lineGap;
      const bandHeight = Math.max(2 * R, config.estimatedTextHeight + 2 * config.bandPadY);

      const side: NodeSide = globalIndex % 2 === 0 ? 'left' : 'right';
      const jitterVal =
        deterministicJitter(lessonId) * config.jitterPercent * (xR - xL);

      const cx =
        side === 'left'
          ? xL + R + Math.max(0, jitterVal)
          : xR - R - Math.max(0, -jitterVal);
      const cy = bandHeight / 2;
      const xExt = side === 'left' ? cx - R : cx + R;

      const isFirstInUnit = l === 0;
      const isLastInWholePath = globalIndex === totalLessonsCount - 1;

      let nodeSvgPath = '';
      let nodeAnalyticLength = 0;
      let startPoint = { x: 0, y: 0 };
      let endPoint = { x: 0, y: bandHeight };
      let travelerAnchor = { x: 0, y: 0 };
      let progressMarkerLength = 0;

      const vertStraight = bandHeight - 2 * R;

      if (isFirstInUnit && !isLastInWholePath) {
        // Entry tail: starts at (xExt, 0), vertical to bandHeight - R, bottom arc to cx
        startPoint = { x: xExt, y: 0 };
        endPoint = { x: cx, y: bandHeight };
        const sweep = side === 'left' ? 0 : 1;
        nodeSvgPath = `M ${xExt} 0 L ${xExt} ${bandHeight - R} A ${R} ${R} 0 0 ${sweep} ${cx} ${bandHeight}`;
        nodeAnalyticLength = bandHeight - R + (R * Math.PI) / 2;
        travelerAnchor = {
          x: xExt + (side === 'left' ? 32 : -32),
          y: Math.max(30, bandHeight * 0.35),
        };
        progressMarkerLength = bandHeight * 0.35;
      } else if (!isFirstInUnit && !isLastInWholePath) {
        // Standard middle node: entry horizontal run from prevNodeCx, top arc, straight, bottom arc
        const prevCx = prevNodeCx ?? (side === 'left' ? xR - R : xL + R);
        startPoint = { x: prevCx, y: 0 };
        endPoint = { x: cx, y: bandHeight };
        const sweep = side === 'left' ? 0 : 1;

        if (vertStraight > 0.01) {
          nodeSvgPath = `M ${prevCx} 0 L ${cx} 0 A ${R} ${R} 0 0 ${sweep} ${xExt} ${R} L ${xExt} ${bandHeight - R} A ${R} ${R} 0 0 ${sweep} ${cx} ${bandHeight}`;
        } else {
          nodeSvgPath = `M ${prevCx} 0 L ${cx} 0 A ${R} ${R} 0 0 ${sweep} ${cx} ${bandHeight}`;
        }
        nodeAnalyticLength = Math.abs(cx - prevCx) + R * Math.PI + Math.max(0, vertStraight);
        travelerAnchor = {
          x: (prevCx + cx) / 2,
          y: 0,
        };
        progressMarkerLength = Math.abs(cx - prevCx) / 2;
      } else if (!isFirstInUnit && isLastInWholePath) {
        // Exit tail: horizontal run from prevNodeCx, top arc, continue straight to bandHeight at xExt
        const prevCx = prevNodeCx ?? (side === 'left' ? xR - R : xL + R);
        startPoint = { x: prevCx, y: 0 };
        endPoint = { x: xExt, y: bandHeight };
        const sweep = side === 'left' ? 0 : 1;

        nodeSvgPath = `M ${prevCx} 0 L ${cx} 0 A ${R} ${R} 0 0 ${sweep} ${xExt} ${R} L ${xExt} ${bandHeight}`;
        nodeAnalyticLength = Math.abs(cx - prevCx) + (R * Math.PI) / 2 + (bandHeight - R);
        travelerAnchor = {
          x: (prevCx + cx) / 2,
          y: 0,
        };
        progressMarkerLength = Math.abs(cx - prevCx) / 2;
      } else {
        // Single-lesson path (isFirstInUnit && isLastInWholePath)
        startPoint = { x: xExt, y: 0 };
        endPoint = { x: xExt, y: bandHeight };
        nodeSvgPath = `M ${xExt} 0 L ${xExt} ${bandHeight}`;
        nodeAnalyticLength = bandHeight;
        travelerAnchor = {
          x: xExt + (side === 'left' ? 32 : -32),
          y: bandHeight / 2,
        };
        progressMarkerLength = bandHeight / 2;
      }

      // Text box sits on side opposite the circle & outer turn
      const textBoxWidth = side === 'left' ? xR - (cx + r + config.textGutter) : cx - r - config.textGutter - xL;
      const textBoxX = side === 'left' ? cx + r + config.textGutter : xL;
      const textBoxY = Math.max(config.bandPadY, (bandHeight - config.estimatedTextHeight) / 2);

      const nodeRow: NodeRowData = {
        type: 'node',
        globalIndex,
        lessonId,
        unitId: unit.id,
        unitIndex: u,
        side,
        circle: { cx, cy, r },
        R,
        offset: currentOffset,
        height: bandHeight,
        svgPathD: nodeSvgPath,
        analyticLength: nodeAnalyticLength,
        cumulativeLengthStart: cumulativeLength,
        startPoint,
        endPoint,
        textBox: {
          x: textBoxX,
          y: textBoxY,
          width: Math.max(120, textBoxWidth),
          height: config.estimatedTextHeight,
        },
        travelerAnchor,
        progressMarkerLength,
      };

      rows.push(nodeRow);
      currentOffset += bandHeight;
      cumulativeLength += nodeAnalyticLength;

      prevNodeCx = cx;
      prevNodeExt = xExt;
      globalIndex++;
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 3. END-CAP ROW
  // ─────────────────────────────────────────────────────────────────────────
  const endCapHeight = config.endCapHeight;
  const lastExt = prevNodeExt ?? xL;
  const dotY = 56;
  const endCapPath = `M ${lastExt} 0 L ${lastExt} ${dotY}`;
  const endCapLength = dotY;

  const isLastOnLeft = lastExt <= (xL + xR) / 2;
  const endCapTextBox = isLastOnLeft
    ? {
        x: lastExt + 32,
        y: dotY - 20,
        width: xR - (lastExt + 32),
        height: 60,
      }
    : {
        x: xL,
        y: dotY - 20,
        width: lastExt - 32 - xL,
        height: 60,
      };

  const endCapRow: EndCapRowData = {
    type: 'end-cap',
    offset: currentOffset,
    height: endCapHeight,
    svgPathD: endCapPath,
    analyticLength: endCapLength,
    cumulativeLengthStart: cumulativeLength,
    startPoint: { x: lastExt, y: 0 },
    endPoint: { x: lastExt, y: dotY },
    dot: {
      cx: lastExt,
      cy: dotY,
      r: config.endDotRadius,
    },
    textBox: endCapTextBox,
  };

  rows.push(endCapRow);
  currentOffset += endCapHeight;
  cumulativeLength += endCapLength;

  const result: PathLayoutResult = {
    rows,
    totalHeight: currentOffset,
    totalLength: cumulativeLength,
  };

  layoutCache.set(cacheKey, result);
  return result;
}
