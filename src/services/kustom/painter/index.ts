import { HasBox, KLWE_ATTRIBUTE, Point, Size } from '@/interfaces';
import { colorService } from '@/services';
import { Item } from 'kustom';
import { dataService } from '../data';

class Painter {
    drawScreen(color: string, size: Size, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size.width, size.height);
    }

    highlight(item: Item & HasBox, ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#FF000080';

        const { position, padding, size } = item[KLWE_ATTRIBUTE];

        ctx.strokeRect(
            position.x - padding.left,
            position.y - padding.top,
            size.width + padding.left + padding.right,
            size.height + padding.top + padding.bottom,
        );
    }

    drawItem(item: Item & HasBox, ctx: CanvasRenderingContext2D) {
        const { position } = item[KLWE_ATTRIBUTE];
        switch (item.internal_type) {
            case 'ShapeModule': {
                ctx.save();
                ctx.translate(position.x, position.y);
                ctx.fillStyle = colorService.kustomColorToHex(
                    dataService.getPaint(item).color,
                );
                ctx.beginPath();
                switch (item.shape_type) {
                    case 'RECT':
                        this.drawRectangle(
                            ctx,
                            item.shape_width ?? 20,
                            item.shape_height ?? 20,
                            item.shape_corners,
                        );
                        break;
                    case 'CIRCLE': {
                        const r = (item.shape_width ?? 20) * 0.5;
                        this.drawCircleSlice(ctx, r, r, 360);
                        break;
                    }
                    case 'OVAL': {
                        this.drawCircleSlice(
                            ctx,
                            (item.shape_width ?? 20) * 0.5,
                            (item.shape_height ?? 20) * 0.5,
                            360,
                        );
                        break;
                    }
                    case 'SLICE': {
                        this.drawCircleSlice(
                            ctx,
                            (item.shape_width ?? 20) * 0.5,
                            (item.shape_height ?? 20) * 0.5,
                            item.shape_angle ?? 45,
                        );
                        break;
                    }
                    case 'TRIANGLE': {
                        const c = (item.shape_width ?? 20) * 0.5;
                        ctx.moveTo(c, 0);
                        ctx.lineTo(
                            item.shape_width ?? 20,
                            item.shape_height ?? 20,
                        );
                        ctx.lineTo(0, item.shape_height ?? 20);
                        break;
                    }
                    case 'RTRIANGLE': {
                        ctx.moveTo(0, 0);
                        ctx.lineTo(
                            item.shape_width ?? 20,
                            item.shape_height ?? 20,
                        );
                        ctx.lineTo(0, item.shape_height ?? 20);
                        break;
                    }
                    case 'EXAGON': {
                        this.drawRegularPolygon(ctx, item.shape_width ?? 20, 6);
                        break;
                    }
                    // TODO: Implement drawing of Squircle and Arc
                    case 'SQUIRCLE':
                    case 'ARC': {
                        throw new Error('Not implemented yet!');
                    }
                    default: {
                        this.drawRectangle(
                            ctx,
                            item.shape_width ?? 20,
                            item.shape_width ?? 20,
                            item.shape_corners,
                        );
                        break;
                    }
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
                break;
            }
            case 'TextModule': {
                // TODO: fix text size for other text size types
                const fontSize =
                    !item.text_size_type ||
                    item.text_size_type === 'FIXED_WIDTH'
                        ? item.text_size ?? 20
                        : 0;
                // TODO: fix text family
                ctx.font = `${fontSize}px` + ' Inconsolata';
                ctx.fillStyle = colorService.kustomColorToHex(
                    dataService.getPaint(item).color,
                );
                const maxChars =
                    item.text_size_type === 'FIXED_WIDTH'
                        ? dataService.getMaxChars(item)
                        : undefined;
                const lines = dataService.getTextLines(item, maxChars);

                for (let i = 0; i < lines.length; i++) {
                    ctx.fillText(
                        lines[i],
                        position.x,
                        position.y + fontSize * (i + 1),
                    );
                }
            }
        }
    }

    private drawRectangle(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        corners = 0,
    ): void {
        const cSize = corners > width * 0.5 ? width * 0.5 : corners;

        ctx.moveTo(cSize, 0);
        ctx.lineTo(width - cSize, 0);
        ctx.arcTo(width, 0, width, cSize, cSize);

        ctx.lineTo(width, height - cSize);
        ctx.arcTo(width, height, width - cSize, height, cSize);

        ctx.lineTo(cSize, height);
        ctx.arcTo(0, height, 0, height - cSize, cSize);

        ctx.lineTo(0, cSize);
        ctx.arcTo(0, 0, cSize, 0, cSize);
    }

    private drawCircleSlice(
        ctx: CanvasRenderingContext2D,
        radiusX: number,
        radiusY: number,
        endAngle: number,
    ): void {
        ctx.ellipse(radiusX, radiusY, radiusX, radiusY, 0, 0, endAngle);
    }

    private polarToCartesian(
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number,
    ): Point {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
            x: +(centerX + radius * Math.cos(angleInRadians)).toFixed(4),
            y: +(centerY + radius * Math.sin(angleInRadians)).toFixed(4),
        };
    }

    private drawRegularPolygon(
        ctx: CanvasRenderingContext2D,
        width: number,
        points: number,
    ): void {
        const c = width * 0.5;
        ctx.moveTo(c, 0);

        const slice = 360 / points;
        for (let i = 1; i < points; i++) {
            const { x, y } = this.polarToCartesian(c, c, c, slice * i);

            ctx.lineTo(x, y);
        }
    }
}

export const painter = new Painter();
