<script lang="ts">
    import Input from '../Input.svelte';
    import Menu from '../Menu';
    import { Slider } from '../Slider';
    import { afterUpdate, onMount } from 'svelte';
    import { colorService, HSLA } from '@/services';
    import Select from '../Select/Select.svelte';
    import Option from '../Select/Option.svelte';
    import InlineInput from '../InlineInput/InlineInput.svelte';

    export let color: string;
    let canvasEl: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        bounds: DOMRect,
        prevColor: string = color,
        hsla: HSLA = colorService.hexToHsla(color);
    let open = false,
        cursorPos = { x: 0, y: 0 };

    onMount(() => {
        ctx = canvasEl.getContext('2d');
        bounds = canvasEl.getBoundingClientRect();
        fillCanvas();
        positionCursor();
    });

    afterUpdate(() => {
        bounds = canvasEl.getBoundingClientRect();
    });

    function positionCursor() {
        cursorPos = {
            y: bounds.height * ((100 - hsla[2]) / 100),
            x: bounds.width * (hsla[1] / 100),
        };
    }

    function fillCanvas() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        for (let row = 0; row < canvasEl.height; row++) {
            const gradient = ctx.createLinearGradient(0, 0, canvasEl.width, 0);

            const l = 100 - (row / canvasEl.height) * 100;

            gradient.addColorStop(0, `hsl(${hsla[0]}, 0%, ${l}%)`);
            gradient.addColorStop(1, `hsl(${hsla[0]}, 100%, ${l}%)`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, row, canvasEl.width, 1);
        }
    }
    function updateColor(e: MouseEvent) {
        // find cursor position
        let x = e.pageX - bounds.left;
        let y = e.pageY - bounds.top;

        // clamp cursor position
        if (x > bounds.width) x = bounds.width;
        if (x < 0) x = 0;

        if (y > bounds.height) y = bounds.height;
        if (y < 0) y = 0.1;

        // calculate color
        const xRatio = (x / bounds.width) * 100;
        const yRatio = (1 - y / bounds.height) * 100;

        hsla[1] = xRatio;
        hsla[2] = yRatio;

        color = colorService.hslaToHex(hsla);
        prevColor = color;
        cursorPos = { x, y };
        calculateAdditionalColors();
    }

    function removeMoseMove() {
        document.removeEventListener('mousemove', updateColor);
        document.removeEventListener('mouseup', removeMoseMove);
    }

    async function onSliderChange() {
        fillCanvas();
        color = colorService.hslaToHex(hsla);
        prevColor = color;
        calculateAdditionalColors();
    }

    function onCanvasMousedown(e: MouseEvent) {
        updateColor(e);
        document.addEventListener('mousemove', updateColor);
        document.addEventListener('mouseup', removeMoseMove);
    }

    afterUpdate(() => {
        if (prevColor === color) return;
        hsla = colorService.hexToHsla(color);
        prevColor = color;
        calculateAdditionalColors();
        fillCanvas();
        positionCursor();
    });

    let colors = [];
    let recentColors = () => {
        colors = [
            '#FF90B217',
            '#FF5E6587',
            '#FFCC9020',
            '#FF30052C',
            '#FFC4300F',
            '#FF0C818C',
            '#FFE81EB2',
            '#FFE8AB1E',
            '#FF2F3D3C',
        ];
    };

    let analogousColors = () => {
        const [h, s, l, a] = hsla;
        colors = [
            colorService.hslaToHex([h - 30, s, l, a]),
            colorService.hslaToHex([h - 15, s, l, a]),
            colorService.hslaToHex([h + 15, s, l, a]),
            colorService.hslaToHex([h + 30, s, l, a]),
        ];
    };

    let complementaryColors = () => {
        const [h, s, l, a] = hsla;
        colors = [colorService.hslaToHex([(h + 180) % 360, s, l, a])];
    };

    let calculateAdditionalColors: () => void = recentColors;

    function onSelectTypeChange(
        e: CustomEvent<'analogous' | 'recent' | 'complementary'>,
    ) {
        switch (e.detail) {
            case 'recent': {
                calculateAdditionalColors = recentColors;
                break;
            }
            case 'analogous': {
                calculateAdditionalColors = analogousColors;
                break;
            }
            case 'complementary': {
                calculateAdditionalColors = complementaryColors;
                break;
            }
        }
        calculateAdditionalColors();
    }

    function onColorLabelChange(
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) {
        color = `#${e.currentTarget.value}`;
    }
</script>

<svelte:window on:resize={() => (bounds = canvasEl.getBoundingClientRect())} />

<div class="input-wrapper">
    <Input title="Color" class="input--color">
        <div class="color" on:click={() => (open = !open)}>
            <div class="color__label">
                <input
                    type="text"
                    class="input input__element"
                    value={color.substr(1)}
                    on:change={onColorLabelChange}
                />
            </div>
            <div
                class="color__preview"
                style="background: {colorService.hslaToString(hsla)};"
            />
        </div>
    </Input>
    <Menu bind:open>
        <div class="menu__content">
            <div class="map">
                <canvas
                    class="map__canvas"
                    bind:this={canvasEl}
                    height="100"
                    on:mousedown={onCanvasMousedown}
                />
                <button
                    class="map__cursor"
                    style="left: {cursorPos.x}px; top: {cursorPos.y}px; background: hsl({hsla[0]}, {hsla[1]}%, {hsla[2]}%)"
                />
            </div>

            <Slider
                title="Hue"
                min={0}
                max={360}
                class="slider--hue"
                bind:value={hsla[0]}
                on:input={onSliderChange}
            />
            <div
                style="--slider-background: linear-gradient(90deg, {colorService.hslaToString(
                    [hsla[0], hsla[1], hsla[2], 0],
                )}, {colorService.hslaToString([hsla[0], hsla[1], hsla[2], 1])}"
            >
                <Slider
                    title="Alpha"
                    min={0}
                    max={100}
                    class="slider--alpha"
                    bind:value={hsla[3]}
                    on:input={onSliderChange}
                />
            </div>

            <div class="color-wrapper">
                <Select
                    title="Type"
                    value="RECENT"
                    text="Recent"
                    on:change={onSelectTypeChange}
                >
                    <Option value="RECENT">Recent</Option>
                    <Option value="ANALOGOUS">Analogous</Option>
                    <Option value="COMPLEMENTARY">Complementary</Option>
                </Select>

                <div class="colors">
                    {#each colors as _color}
                        <button
                            class="colors__entry"
                            style="background: {colorService.kustomColorToHex(
                                _color,
                            )};"
                            on:click={() => {
                                color = _color;
                            }}
                        />
                    {/each}
                </div>
            </div>
        </div>
    </Menu>
</div>

<style lang="scss">
    @use '@/styles/abstracts' as *;

    .input-wrapper {
        position: relative;
    }

    :global(.slider--hue) {
        --slider-background: linear-gradient(
            90deg,
            #ff0000,
            #ffff00,
            #00ff00,
            #00ffff,
            #0000ff,
            #ff00ff,
            #ff0000
        );
    }

    .menu__content {
        display: flex;
        flex-direction: column;
        padding: size(md);
        gap: size(gap);
    }

    .color-wrapper {
        width: 100%;
    }

    .colors {
        display: grid;
        grid-template-columns: repeat(auto-fill, 2rem);
        gap: size(gap);
        justify-content: space-between;
        margin: size(md) size(xs);

        &__entry {
            width: 2rem;
            height: 2rem;
            border-radius: border-radius(sm);
            cursor: pointer;
            border: size(border) solid themed(border, color--light);
        }
    }

    .map {
        position: relative;
        grid-area: 1 / 1 / 5 / 1;
        aspect-ratio: 2 / 1;

        &__canvas {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: border-radius(sm);
        }

        &__cursor {
            position: absolute;
            width: 1.5rem;
            height: 1.5rem;
            border: size(border) solid themed(border, color--light);
            background: transparent;
            border-radius: 1rem;
            cursor: pointer;
            pointer-events: none;
            transform: translate(-50%, -50%);
            padding: 0;
        }
    }

    .color {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        &__label {
            display: flex;
            align-items: center;
            gap: size(xs);

            &::before {
                content: '#';
                font-size: text(size-sm);
                color: themed(text, color--blur);
            }

            .input {
                padding: 0;
                min-height: 1rem;
            }
        }

        &__preview {
            width: 1.75rem;
            height: 1.75rem;
            border: size(border) solid themed(border, color--light);
            border-radius: border-radius(sm);
        }
    }
</style>
