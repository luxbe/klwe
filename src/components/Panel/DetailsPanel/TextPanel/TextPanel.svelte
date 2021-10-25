<script lang="ts" context="module">
    import {
        AnchorInput,
        ColorInput,
        OffsetInput,
        Option,
        PaddingInput,
        Select,
        SimpleInput,
    } from '@/components/Input';
    import { TextTabsType, KLWE_ATTRIBUTE } from '@/interfaces';
    import { dataService } from '@/services';
    import { Text } from 'kustom';
    import { beforeUpdate } from 'svelte';

    const TextTabs: { [key in TextTabsType]: string } = {
        TEXT: 'Text',
        PAINT: 'Paint',
        POSITION: 'Position',
        ANIMATION: 'Animation',
        TOUCH: 'Touch',
    } as const;
</script>

<script lang="ts">
    export let item: Text;

    let value: TextTabsType = 'TEXT',
        text = TextTabs[value];

    beforeUpdate(() => {
        item.paint_color ??= '#FFFFFFFF';
    });
</script>

<Select bind:value {text}>
    {#each Object.keys(TextTabs) as key}
        <Option value={key}>{TextTabs[key]}</Option>
    {/each}
</Select>
{#if value === 'TEXT'}
    <SimpleInput title="Content" bind:value={item.text_expression} multiline />
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
