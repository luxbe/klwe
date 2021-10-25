import {
    HasBox,
    HasPadding,
    HasSize,
    KLWE_ATTRIBUTE,
    Padding,
    Point,
    Size,
} from '@/interfaces';
import { previewStore } from '@/stores';
import { Item, Overlap, Preset, Root, Stack } from 'kustom';
import { dataService } from '../data';

class Compositor {
    composite(
        preset: Preset,
    ): Preset & { preset_root: Root & { viewgroup_items: (Item & HasBox)[] } } {
        const bounds = { ...preset.preset_info, x: 0, y: 0 };

        preset.preset_root.viewgroup_items.forEach(this.initItem.bind(this));

        this.compositeItems(
            bounds,
            preset.preset_root.viewgroup_items as (Item &
                HasSize &
                HasPadding)[],
            preset.preset_root,
        );

        return preset as Preset & {
            preset_root: Root & { viewgroup_items: (Item & HasBox)[] };
        };
    }

    private initItem(item: Item): { size: Size; padding: Padding } {
        let size: Size = {
            width: 0,
            height: 0,
        };

        const padding = dataService.getPadding(item);

        switch (item.internal_type) {
            case 'OverlapLayerModule': {
                item.viewgroup_items.forEach((item) => {
                    const {
                        size: itemSize,
                        padding: itemPadding,
                    } = this.initItem(item);

                    const totalItemSize: Size = {
                        width:
                            itemSize.width + itemPadding.left + padding.right,
                        height:
                            itemSize.height +
                            itemPadding.top +
                            itemPadding.bottom,
                    };

                    if (totalItemSize.width > size.width)
                        size.width = totalItemSize.width;
                    if (totalItemSize.height > size.height)
                        size.height = totalItemSize.height;
                });
                break;
            }
            case 'StackLayerModule': {
                item.viewgroup_items.forEach((item) => {
                    const {
                        size: itemSize,
                        padding: itemPadding,
                    } = this.initItem(item);

                    const totalItemSize: Size = {
                        width:
                            itemSize.width + itemPadding.left + padding.right,
                        height:
                            itemSize.height +
                            itemPadding.top +
                            itemPadding.bottom,
                    };

                    if (totalItemSize.width > size.width)
                        size.width = totalItemSize.width;

                    size.height += totalItemSize.height;
                });
                break;
            }
            case 'ShapeModule':
                size = {
                    width: item.shape_width ?? 20,
                    height: dataService.hasHeight(item)
                        ? item.shape_height ?? 20
                        : item.shape_width ?? 20,
                };
                break;
            case 'TextModule': {
                const { $textCtx } = previewStore;
                switch (item.text_size_type) {
                    case 'FIXED_WIDTH': {
                        // TODO: fix family
                        $textCtx.font = `${item.text_size ?? 20}px Inconsolata`;

                        const maxChars = dataService.getMaxChars(item);
                        const lines = dataService.getTextLines(item, maxChars);

                        size = {
                            width: item.text_width ?? 20,
                            height: lines.length * item.text_size ?? 20,
                        };
                        break;
                    }
                    case 'FIT_TO_BOX': {
                        size = {
                            width: item.text_width ?? 20,
                            height: item.text_height ?? 20,
                        };
                        break;
                    }
                    case 'FIT_WIDTH': {
                        size = {
                            width: item.text_width ?? 20,
                            height: 0,
                        };
                        break;
                    }
                    default: {
                        // TODO: fix family
                        $textCtx.font = `${item.text_size ?? 20}px Inconsolata`;

                        const lines = item.text_expression.split('\n');

                        let width = -Infinity;

                        for (let i = 0; i < lines.length; i++) {
                            const lineWidth = $textCtx.measureText(lines[i])
                                .width;

                            if (lineWidth > width) width = lineWidth;
                        }

                        const height = lines.length * item.text_size;

                        size = {
                            width,
                            height,
                        };
                        break;
                    }
                }
                break;
            }
        }

        (item as Item & HasPadding)[KLWE_ATTRIBUTE].padding = padding;
        (item as Item & HasSize)[KLWE_ATTRIBUTE].size = size;

        return { size, padding };
    }

    private compositeItems(
        parentBounds: Size & Point,
        items: (Item & HasSize & HasPadding)[],
        root: Root,
        parentStack?: Stack,
    ): void {
        let totalHeight = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i] as Item & HasBox;

            const size = item[KLWE_ATTRIBUTE].size;
            const padding = item[KLWE_ATTRIBUTE].padding;
            const anchor = dataService.getAnchor(item);
            const offset = dataService.getOffset(item);

            const position: Point = {
                x:
                    parentBounds.x +
                    padding.left +
                    (parentStack || anchor.h === 'LEFT'
                        ? offset.x
                        : anchor.h === 'RIGHT'
                        ? parentBounds.width - size.width - offset.x
                        : (parentBounds.width -
                              (size.width + padding.left + padding.right)) /
                              2 +
                          offset.x),
                y:
                    parentBounds.y +
                    totalHeight +
                    padding.top +
                    (parentStack
                        ? 0
                        : anchor.v === 'TOP'
                        ? offset.y
                        : anchor.v === 'BOTTOM'
                        ? parentBounds.height - size.height - offset.y
                        : (parentBounds.height -
                              (size.height + padding.top + padding.bottom)) /
                              2 +
                          offset.y),
            };

            if (parentStack)
                totalHeight += size.height + padding.top + padding.bottom;

            if ((item as Overlap | Stack).viewgroup_items) {
                this.compositeItems(
                    { ...position, ...size },
                    (item as Overlap | Stack).viewgroup_items as (Item &
                        HasSize &
                        HasPadding)[],
                    root,
                    item.internal_type === 'StackLayerModule' && item,
                );
            }

            item[KLWE_ATTRIBUTE].padding = padding;
            item[KLWE_ATTRIBUTE].position = position;
        }
    }
}

export const compositor = new Compositor();
