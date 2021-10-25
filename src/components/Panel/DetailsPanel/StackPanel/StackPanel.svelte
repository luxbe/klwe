<script lang="ts" context="module">
    import {
        AnchorInput,
        OffsetInput,
        Option,
        PaddingInput,
        Select,
    } from '@/components/Input';
    import { KLWE_ATTRIBUTE, StackTabsType } from '@/interfaces';
    import { dataService } from '@/services';
    import { Stack } from 'kustom';

    const StackTabs: { [key in StackTabsType]: string } = {
        LAYER: 'Layer',
        POSITION: 'Position',
        ANIMATION: 'Animation',
        TOUCH: 'Touch',
    } as const;
</script>

<script lang="ts">
    export let item: Stack;

    let value: StackTabsType = 'LAYER',
        text = StackTabs[value];
</script>

<Select bind:value {text}>
    {#each Object.keys(StackTabs) as key}
        <Option value={key}>{StackTabs[key]}</Option>
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
