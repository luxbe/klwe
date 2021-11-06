import { Item, Overlap, Stack } from 'kustom';

export interface Point {
  x: number;
  y: number;
}

export interface Width {
  width: number;
}

export interface Height {
  height: number;
}

export type Size = Width & Height;

export interface Anchor {
  h: '' | 'LEFT' | 'RIGHT';
  v: 'TOP' | 'CENTER' | 'BOTTOM';
}

export interface Offset {
  x: number;
  y: number;
}

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Paint {
  color: string;
}

export const KLWE_ATTRIBUTE = Symbol('__klwe');

export interface KLWE {
  [KLWE_ATTRIBUTE]: {};
}

export interface HasPosition {
  [KLWE_ATTRIBUTE]: {
    position: Point;
  };
}

export interface HasSize {
  [KLWE_ATTRIBUTE]: {
    size: Size;
  };
}

export interface HasPadding {
  [KLWE_ATTRIBUTE]: {
    padding: Padding;
  };
}

export type HasBox = HasPosition & HasPadding & HasSize;

export interface HasLevel {
  [KLWE_ATTRIBUTE]: {
    level: number;
  };
}

export interface HasParent {
  [KLWE_ATTRIBUTE]: {
    parent?: Stack | Overlap;
  };
}

export interface HasChildren {
  [KLWE_ATTRIBUTE]: {
    isOpen?: boolean;
  };
  viewgroup_items: (Item & HasParent)[];
}

export type RootTabsType =
  | 'BACKGROUND'
  | 'LAYER'
  | 'POSITION'
  | 'GLOBALS'
  | 'SHORTCUTS';

export type ItemTabsType = 'POSITION' | 'ANIMATION' | 'TOUCH';
export type PaintTabType = 'PAINT';
export type FXTabType = 'PAINT';
export type ColorTabType = 'COLOR';
export type StyleTabType = 'STYLE';

export type TextTabsType = 'TEXT' | PaintTabType | FXTabType | ItemTabsType;
export type ShapeTabsType = 'SHAPE' | PaintTabType | FXTabType | ItemTabsType;
export type OverlapTabsType = 'LAYER' | ItemTabsType;
export type StackTabsType = 'LAYER' | ItemTabsType;

export type TabsType =
  | RootTabsType
  | TextTabsType
  | ShapeTabsType
  | OverlapTabsType
  | StackTabsType;
