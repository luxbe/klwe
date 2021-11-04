<script lang="ts">
  import { afterUpdate } from 'svelte';
  export let open = false;

  let menuEl: HTMLDivElement;

  let mousedownInside = false;

  function onMousedown(e: MouseEvent) {
    if (document && menuEl) mousedownInside = menuEl.contains(e.target as Node);
  }

  function onMouseup() {
    if (mousedownInside) return;
    open = false;

    document.removeEventListener('mousedown', onMousedown);
    document.removeEventListener('mouseup', onMouseup);
  }

  afterUpdate(() => {
    if (open) {
      setTimeout(() => {
        document.addEventListener('mousedown', onMousedown);
        document.addEventListener('mouseup', onMouseup);
      });
    } else {
      document.removeEventListener('mousedown', onMousedown);
      document.removeEventListener('mouseup', onMouseup);
    }
  });
</script>

<div class="menu" class:open bind:this={menuEl}>
  <slot />
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .menu {
    position: absolute;
    margin-top: size(md);
    top: 100%;
    left: 0;
    right: 0;
    height: min-content;
    border-radius: border-radius(md);
    opacity: 0;
    transition: all transition(time);
    border: size(border) solid;
    border: size(border) solid themed(border, color);
    transform: translateY(-20px);
    z-index: z-index(menu);
    background: themed(menu, background);
    pointer-events: none;

    &.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }
  }
</style>
