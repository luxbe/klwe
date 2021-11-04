<script lang="ts" context="module">
  import { Anchor } from '@/interfaces';

  interface ButtonEntry<T> {
    type: T;
    icon: IconType;
  }

  const horizontalButtons: readonly ButtonEntry<Anchor['h']>[] = [
    {
      type: 'LEFT',
      icon: 'align-horizontal-left',
    },
    {
      type: '',
      icon: 'align-horizontal-center',
    },
    {
      type: 'RIGHT',
      icon: 'align-horizontal-right',
    },
  ] as const;

  const verticalButtons: readonly ButtonEntry<Anchor['v']>[] = [
    { type: 'TOP', icon: 'align-vertical-top' },
    { type: 'CENTER', icon: 'align-vertical-center' },
    { type: 'BOTTOM', icon: 'align-vertical-bottom' },
  ] as const;
</script>

<script lang="ts">
  import Icon, { IconType } from '@/components/Icon';
  import { dataService } from '@/services';
  import { Item, PositionAnchor } from 'kustom';
  import { afterUpdate } from 'svelte';

  export let item: Item;

  let anchor = dataService.getAnchor(item);

  afterUpdate(() => {
    anchor = dataService.getAnchor(item);
  });

  function setItemAnchor() {
    item.position_anchor = (anchor.v + anchor.h) as PositionAnchor;
  }
</script>

<div class="input--anchor">
  <button class="btn is-group">
    {#each horizontalButtons as btn}
      <button
        class="btn btn is-icon"
        class:active={anchor.h === btn.type}
        on:click={() => {
          anchor.h = btn.type;
          setItemAnchor();
        }}
      >
        <Icon icon={btn.icon} />
      </button>
    {/each}
  </button>
  <button class="btn is-group">
    {#each verticalButtons as btn}
      <button
        class="btn btn is-icon"
        class:active={anchor.v === btn.type}
        on:click={() => {
          anchor.v = btn.type;
          setItemAnchor();
        }}
      >
        <Icon icon={btn.icon} />
      </button>
    {/each}
  </button>
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .input--anchor {
    display: flex;
    gap: size(gap);
  }
</style>
