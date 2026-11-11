export type RowType = 'unit-header' | 'node' | 'end-cap';
export type NodeSide = 'left' | 'right';

export interface Point2D {
  x: number;
  y: number;
}

export interface Rect2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RowGeometryBase {
  offset: number;
  height: number;
  svgPathD: string;
  analyticLength: number;
  cumulativeLengthStart: number;
  startPoint: Point2D;
  endPoint: Point2D;
}

export interface NodeRowData extends RowGeometryBase {
  type: 'node';
  globalIndex: number;
  lessonId: string;
  unitId: string;
  unitIndex: number;
  side: NodeSide;
  circle: {
    cx: number;
    cy: number;
    r: number;
  };
  R: number;
  textBox: Rect2D;
  travelerAnchor: Point2D;
  progressMarkerLength: number;
}

export interface UnitHeaderRowData extends RowGeometryBase {
  type: 'unit-header';
  unitId: string;
  unitIndex: number;
  title: string;
  subtitle?: string;
  totalLessons: number;
  textBox: Rect2D;
}

export interface EndCapRowData extends RowGeometryBase {
  type: 'end-cap';
  dot: {
    cx: number;
    cy: number;
    r: number;
  };
  textBox: Rect2D;
}

export type TimelineRow = NodeRowData | UnitHeaderRowData | EndCapRowData;

export interface PathLayoutResult {
  rows: TimelineRow[];
  totalHeight: number;
  totalLength: number;
}
