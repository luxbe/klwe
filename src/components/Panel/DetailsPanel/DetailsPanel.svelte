<script lang="ts">
    import { kustomStore } from '@/stores';
    import OverlapPanel from './OverlapPanel';
    import RootPanel from './RootPanel';
    import ShapePanel from './ShapePanel';
    import StackPanel from './StackPanel';
    import TextPanel from './TextPanel';

    const { selectedItem, preset } = kustomStore;
</script>

{#if $selectedItem}
    {#if $selectedItem.internal_type === 'OverlapLayerModule'}
        <OverlapPanel item={$selectedItem} />
    {:else if $selectedItem.internal_type === 'StackLayerModule'}
        <StackPanel item={$selectedItem} />
    {:else if $selectedItem.internal_type === 'ShapeModule'}
        <ShapePanel item={$selectedItem} />
    {:else if $selectedItem.internal_type === 'TextModule'}
        <TextPanel item={$selectedItem} />
    {/if}
{:else}
    <RootPanel root={$preset.preset_root} />
{/if}
