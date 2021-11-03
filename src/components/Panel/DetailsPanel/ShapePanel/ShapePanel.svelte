<script lang="ts" context="module">
    import {
        AnchorInput,
        ColorInput,
        OffsetInput,
        Option,
        PaddingInput,
        Select,
        SizeInput,
    } from '@/components/Input';
    import SimpleInput from '@/components/Input/SimpleInput/SimpleInput.svelte';
    import { KLWE_ATTRIBUTE, ShapeTabsType } from '@/interfaces';
    import { dataService, Defaults } from '@/services';
    import { Shape } from 'kustom';
    import { beforeUpdate } from 'svelte';

    const ShapeTabs: { [key in ShapeTabsType]: string } = {
        SHAPE: 'Shape',
        PAINT: 'Paint',
        POSITION: 'Position',
        ANIMATION: 'Animation',
        TOUCH: 'Touch',
    } as const;
</script>

<script lang="ts">
    export let item: Shape;

    let hasHeight = dataService.hasHeight(item),
        hasAngle = dataService.hasAngle(item);

    let value: ShapeTabsType = 'SHAPE',
        text = ShapeTabs[value];

    function onShapeTypeChange() {
        if ((hasHeight = dataService.hasHeight(item))) item.shape_height ??= 20;
        if ((hasAngle = dataService.hasAngle(item))) item.shape_angle ??= 45;
    }

    beforeUpdate(() => {
        onShapeTypeChange();
        item.shape_width ??= 20;
        hasHeight && (item.shape_height ??= 20);
        item.paint_color ??= '#FFFFFFFF';
    });
</script>

<Select bind:value {text}>
    {#each Object.keys(ShapeTabs) as key}
        <Option value={key}>{ShapeTabs[key]}</Option>
    {/each}
</Select>
{#if value === 'SHAPE'}
    <Select
        title="Type"
        bind:value={item.shape_type}
        text={dataService.getShapeName(item)}
        on:change={onShapeTypeChange}
    >
        {#each [undefined, ...Object.keys(Defaults.SHAPE_NAME_MAP)] as key}
            <Option value={key}
                >{Defaults.SHAPE_NAME_MAP[key] ?? 'Square'}</Option
            >
        {/each}
    </Select>
    {#if hasHeight}
        <SizeInput
            bind:width={item.shape_width}
            bind:height={item.shape_height}
        />
    {:else}
        <SizeInput bind:width={item.shape_width} />
    {/if}
    {#if hasAngle}
        <SimpleInput title="Angle" bind:value={item.shape_angle} number />
    {/if}
{:else if value === 'PAINT'}
    <ColorInput bind:color={item.paint_color} />
{:else if value === 'POSITION'}
    {#if dataService.hasAnchor(item)}
        <AnchorInput {item} />
    {/if}
    {#if item[KLWE_ATTRIBUTE].parent}
        <PaddingInput {item} />
    {:else}
        <OffsetInput {item} />
    {/if}
{:else}
    <p style="text-align: center;">Under Construction!</p>
{/if}
