<script lang="ts" context="module">
    import { ColorInput, Option, Select } from '@/components/Input';
    import { RootTabsType } from '@/interfaces';
    import { Root } from 'kustom';
    import { beforeUpdate } from 'svelte';

    const RootTabs: { [key in RootTabsType]: string } = {
        BACKGROUND: 'Background',
        LAYER: 'Layer',
        POSITION: 'Position',
        GLOBALS: 'Globals',
        SHORTCUTS: 'Shortcuts',
    } as const;
</script>

<script lang="ts">
    export let root: Root;

    let value: RootTabsType = 'BACKGROUND',
        text = RootTabs[value];

    beforeUpdate(() => {
        root.background_color ??= '#FF000000';
    });
</script>

<Select bind:value {text}>
    {#each Object.keys(RootTabs) as key}
        <Option value={key}>{RootTabs[key]}</Option>
    {/each}
</Select>
{#if value === 'BACKGROUND'}
    <ColorInput bind:color={root.background_color} />
{:else}
    <p style="text-align: center;">Under Construction!</p>
{/if}
