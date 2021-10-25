import { IconType } from '@/components/Icon';
import {
    Anchor,
    Offset,
    Padding,
    Paint,
    Size,
    HasParent,
    HasSize,
    KLWE_ATTRIBUTE,
} from '@/interfaces';
import { kustomService } from '@/services';
import { previewStore } from '@/stores';
import { Item, Shape, Text } from 'kustom';
import {
    ITEM_ICON_MAP,
    ITEM_NAME_MAP,
    SHAPES_WITH_ANGLE,
    SHAPES_WITH_HEIGHT,
    SHAPE_NAME_MAP,
} from './defaults';

export * as Defaults from './defaults';

class DataService {
    getTextLines(item: Text, maxChars?: number) {
        const lines = item.text_expression.split('\n');

        if (maxChars) {
            const res = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                for (let j = 0; j < line.length; j += maxChars) {
                    const str = line.substr(j, maxChars);

                    res.push(str);
                }
            }
            return res;
        }

        return lines;
    }

    getPaint(item: Shape | Text): Paint {
        return {
            color: item.paint_color ?? '#FFFFFFFF',
        };
    }

    getPlaceholderTitle(item: Item): string {
        switch (item.internal_type) {
            case 'ShapeModule':
                return this.getShapeName(item);
            case 'TextModule':
                return item.text_expression;
            default:
                return this.getItemName(item);
        }
    }

    getIconType(item: Item): IconType {
        return ITEM_ICON_MAP[item.internal_type];
    }

    // TODO: figure out best option to get max chars
    getMaxChars(item: Text): number {
        const { $textCtx } = previewStore;

        const charWidth = $textCtx.measureText('M').width;
        return (item.text_width ?? 20) / charWidth;
    }

    getItemName(item: Item) {
        return ITEM_NAME_MAP[item.internal_type];
    }

    getShapeName(item: Shape) {
        return SHAPE_NAME_MAP[item.shape_type] || 'Square';
    }

    hasAnchor(item: Item) {
        const parent = kustomService.getParent(item);
        return !parent || parent.internal_type !== 'StackLayerModule';
    }

    getAnchor(item: Item): Anchor {
        if (!item.position_anchor)
            return {
                h: '',
                v: !(item as Item & HasParent)[KLWE_ATTRIBUTE].parent
                    ? 'TOP'
                    : 'CENTER',
            };

        const res = /(TOP|CENTER|BOTTOM)(LEFT|RIGHT)?/.exec(
            item.position_anchor,
        );

        return {
            h: (res[2] as Anchor['h']) || '',
            v: res[1] as Anchor['v'],
        };
    }

    getOffset(item: Item): Offset {
        return {
            x: item.position_offset_x ?? 0,
            y: item.position_offset_y ?? 0,
        };
    }

    getPadding(item: Item): Padding {
        return {
            top: item.position_padding_top ?? 0,
            right: item.position_padding_right ?? 0,
            bottom: item.position_padding_bottom ?? 0,
            left: item.position_padding_left ?? 0,
        };
    }

    getSize(item: Item & HasSize): Size {
        return item[KLWE_ATTRIBUTE].size;
    }

    hasHeight(item: Shape): boolean {
        return SHAPES_WITH_HEIGHT.includes(item.shape_type);
    }

    hasAngle(item: Shape): boolean {
        return SHAPES_WITH_ANGLE.includes(item.shape_type);
    }
}

export const dataService = new DataService();
