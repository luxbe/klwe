import { IconType } from '@/components/Icon';
import { Item, Shape } from 'kustom';

export const ITEM_NAME_MAP: Readonly<
    { [key in Item['internal_type']]: string }
> = {
    OverlapLayerModule: 'Overlap',
    StackLayerModule: 'Stack',
    ShapeModule: 'Shape',
    TextModule: 'Text',
} as const;

export const ITEM_ICON_MAP: Readonly<
    { [key in Item['internal_type']]: IconType }
> = {
    OverlapLayerModule: 'folder',
    StackLayerModule: 'stack',
    ShapeModule: 'shape',
    TextModule: 'text',
} as const;

// undefined -> 'Square',
export const SHAPE_NAME_MAP: Readonly<
    { [key in Shape['shape_type']]: string }
> = {
    RECT: 'Rectangle',
    CIRCLE: 'Circle',
    OVAL: 'Oval',
    TRIANGLE: 'Triangle',
    RTRIANGLE: 'Right Triangle',
    EXAGON: 'Hexagon',
    SLICE: 'Slice',
    ARC: 'Arc',
    SQUIRCLE: 'Squircle',
} as const;

export const SHAPES_WITH_HEIGHT: Readonly<Shape['shape_type'][]> = [
    'SLICE',
    'ARC',
    'RECT',
    'OVAL',
    'TRIANGLE',
    'RTRIANGLE',
    'SQUIRCLE',
] as const;

export const SHAPES_WITH_ANGLE: Readonly<Shape['shape_type'][]> = [
    'SLICE',
    'ARC',
] as const;
