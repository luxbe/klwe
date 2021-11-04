<script lang="ts">
  import { outsideClick } from '@/actions';
  import NewItemDialog from '@/components/Dialog/NewItemDialog/NewItemDialog.svelte';
  import Icon from '@/components/Icon';
  import { kustomService } from '@/services';
  import { dialogStore, kustomStore } from '@/stores';
  import ItemEntry from './ItemEntry';

  const { flatItems, selectedItem } = kustomStore;
  let hasFocus = false,
    currentIndex = -1;

  const itemElList: { focus(): Promise<void> }[] = [];

  function moveCurIndex(backward = false) {
    currentIndex += backward ? -1 : 1;
    if (currentIndex >= $flatItems.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = $flatItems.length - 1;

    selectedItem.set($flatItems[currentIndex]);
  }

  function onKeydown(e: KeyboardEvent) {
    if (!hasFocus) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      moveCurIndex(e.shiftKey);
    } else if ($selectedItem) {
      if (e.key === 'Delete') kustomService.removeItem($selectedItem);
      else if (e.key === 'F2')
        currentIndex >= 0 && itemElList[currentIndex].focus();
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div
  class="tree"
  on:click|stopPropagation={() => (hasFocus = true)}
  use:outsideClick={() => {
    hasFocus = false;
    currentIndex = -1;
  }}
>
  {#each $flatItems as item, i}
    <ItemEntry
      {item}
      active={currentIndex === i}
      on:click={() => {
        currentIndex = i;
        selectedItem.set($flatItems[i]);
      }}
      bind:itemEl={itemElList[i]}
    />
  {/each}
  <div class="spacer" on:click={() => ($selectedItem = undefined)} />
  <button class="btn is-icon" on:click={() => dialogStore.show(NewItemDialog)}
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
