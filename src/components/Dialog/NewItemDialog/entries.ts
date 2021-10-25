import { IconType } from '@/components/Icon';
import { Item } from 'kustom';

interface EntryType {
    title: string;
    description: string;
    icon: IconType;
    type: Item['internal_type'];
}

export const entries: EntryType[] = [
    {
        title: 'Text',
        description: 'This item allows you to enter any text',
        icon: 'text',
        type: 'TextModule',
    },
    {
        title: 'Shape',
        description: 'Create a rectangle, a circle and more',
        icon: 'shape',
        type: 'ShapeModule',
    },
    {
        title: 'Stack',
        description: 'A conainer to stack items horizontally or vertically',
        icon: 'stack',
        type: 'StackLayerModule',
    },
    {
        title: 'Overlap',
        description: 'A container to group items together',
        icon: 'folder',
        type: 'OverlapLayerModule',
    },
];
