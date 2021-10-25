<script lang="ts">
    import { outsideClick } from '@/actions';
    import NewItemDialog from '@/components/Dialog/NewItemDialog/NewItemDialog.svelte';
    import Icon from '@/components/Icon';
    import { kustomService } from '@/services';
    import { dialogStore, kustomStore } from '@/stores';
    import ItemEntry from './ItemEntry';

    const { flatItems, selectedItem } = kustomStore;
    let hasFocus = false;

    function onAddButtonClick() {
        dialogStore.show(NewItemDialog);
    }

    function onTreeClick() {
        hasFocus = true;
    }

    function onTreeOutsideClick() {
        hasFocus = false;
    }

    function onKeyup(e: KeyboardEvent) {
        if (hasFocus && $selectedItem && e.key === 'Delete') {
            kustomService.removeItem($selectedItem);
        }
    }
</script>

<svelte:window on:keyup={onKeyup} />

<div class="tree" on:click={onTreeClick} use:outsideClick={onTreeOutsideClick}>
    {#each $flatItems as item}
        <ItemEntry {item} />
    {/each}
    <div class="spacer" on:click={() => ($selectedItem = undefined)} />
    <button class="btn is-icon" on:click={onAddButtonClick}
        ><Icon icon="add" /></button
    >
</div>

<style lang="scss">
    .tree {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .spacer {
        flex: 1;
    }
</style>
