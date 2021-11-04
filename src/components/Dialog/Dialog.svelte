<script lang="ts">
  import { dialogStore } from '@/stores';
  const { component, isOpen } = dialogStore;

  let dialogEl: HTMLDivElement;

  function onClick(e: MouseEvent) {
    if (e.target === dialogEl) isOpen.set(false);
  }
</script>

<div id="dialog" class:open={$isOpen} on:click={onClick} bind:this={dialogEl}>
  <div class="card">
    <svelte:component this={$component} />
  </div>
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  #dialog {
    display: grid;
    position: absolute;
    inset: 0;
    background: themed(dialog, background);
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity transition(time);
    pointer-events: none;
    z-index: z-index(dialog);

    &.open {
      opacity: 1;
      backdrop-filter: blur(4px);
      pointer-events: all;
    }
  }
</style>
