import { HasBox, KLWE_ATTRIBUTE, Size } from '@/interfaces';
import { kustomStore, previewStore } from '@/stores';
import { Item, Overlap, Stack } from 'kustom';
import { colorService } from '..';
import { compositor } from './compositor';
import { painter } from './painter';

export class PreviewService {
    scaleFromBounds(bounds: DOMRect): void {
        const { $preset } = kustomStore;
        const { $ctx } = previewStore;

        const scale = (bounds.height * 0.8) / $preset.preset_info.height;
        const w = $preset.preset_info.width * scale,
            h = $preset.preset_info.height * scale;

        $ctx.translate((bounds.width - w) / 2, (bounds.height - h) / 2);
        $ctx.scale(scale, scale);
    }

    resetCtx(size: Size): void {
        const { $ctx } = previewStore;

        $ctx.setTransform(1, 0, 0, 1, 0, 0);
        $ctx.clearRect(0, 0, size.width, size.height);
    }

    draw(): void {
        const { $ctx } = previewStore;
        const { $preset, $selectedItem } = kustomStore;

        const preset = compositor.composite($preset);

        painter.drawScreen(
            colorService.kustomColorToHex(preset.preset_root.background_color),
            preset.preset_info,
            $ctx,
        );

        drawItems(preset.preset_root.viewgroup_items);

        function drawItems(items: (Item & HasBox)[]) {
            items.forEach((item) => {
                if ((item as Overlap | Stack).viewgroup_items)
                    drawItems(
                        (item as Overlap | Stack).viewgroup_items as (Item &
                            HasBox)[],
                    );
                drawItem(item);
            });
        }

        function itemHasBox(item: Item): item is Item & HasBox {
            return !!(
                item[KLWE_ATTRIBUTE] &&
                (item as Item & HasBox)[KLWE_ATTRIBUTE].position &&
                (item as Item & HasBox)[KLWE_ATTRIBUTE].padding &&
                (item as Item & HasBox)[KLWE_ATTRIBUTE].size
            );
        }

        function drawItem(item: Item) {
            if (!itemHasBox(item)) {
                return console.warn(
                    `Skipping item because it has no box information!`,
                    item,
                );
            }

            painter.drawItem(item, $ctx);
            if (item === $selectedItem) painter.highlight(item, $ctx);
        }
    }
}

export const previewService = new PreviewService();
