<script lang="ts" context="module">
    import {
        AnchorInput,
        OffsetInput,
        Option,
        PaddingInput,
        Select,
    } from '@/components/Input';
    import { KLWE_ATTRIBUTE, OverlapTabsType } from '@/interfaces';
    import { dataService } from '@/services';
    import { Overlap } from 'kustom';

    const OverlapTabs: { [key in OverlapTabsType]: string } = {
        LAYER: 'Layer',
        POSITION: 'Position',
        ANIMATION: 'Animation',
        TOUCH: 'Touch',
    } as const;
</script>

<script lang="ts">
    export let item: Overlap;

    let value: OverlapTabsType = 'LAYER',
        text = OverlapTabs[value];
</script>

<Select bind:value {text}>
    {#each Object.keys(OverlapTabs) as key}
        <Option value={key}>{OverlapTabs[key]}</Option>
    {/each}
</Select>
{#if value === 'POSITION'}
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
