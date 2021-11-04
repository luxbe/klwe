<script lang="ts">
  export let side: 'left' | 'right' = 'left';

  export let open = true;
</script>

<div class:open class={`panel panel--${side}`}>
  <slot />
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .panel {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    gap: size(gap);
    width: size(panel);
    height: 100%;
    flex-direction: column;
    background: themed(panel, background);
    transition: margin 150ms;
    padding: size(md) size(sm);
    z-index: z-index(panel);

    &--left {
      left: size(activitybar);
      margin-left: -#{size(panel)};
      border-right: size(border) solid themed(border, color);
    }

    &--right {
      right: 0;
      margin-right: -#{size(panel)};
      border-left: size(border) solid themed(border, color);
    }

    &--left.open {
      margin-left: 0;
    }

    &--right.open {
      margin-right: 0;
    }
  }
</style>
