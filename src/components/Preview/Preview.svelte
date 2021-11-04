<script lang="ts">
  import { previewService } from '@/services/kustom/preview';

  import { kustomStore, previewStore, snackbarStore } from '@/stores';
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement,
    canvasTextEl: HTMLCanvasElement,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    textCtx: CanvasRenderingContext2D;

  const FRAMERATE = 33.3333 as const; // = 1000ms / 30 fps;

  const { selectedItem } = kustomStore;

  onMount(() => {
    ctx = canvasEl.getContext('2d');
    textCtx = canvasTextEl.getContext('2d');
    if (!ctx || !textCtx)
      return snackbarStore.show('Failed to initiate preview!', 'danger');

    ctx.textBaseline = textCtx.textBaseline = 'top';

    previewStore.ctx.set(ctx);
    previewStore.textCtx.set(textCtx);

    setInterval(draw, FRAMERATE);
  });

  function draw() {
    if (!canvasEl) return;
    const bounds = canvasEl.getBoundingClientRect();
    canvasEl.width = bounds.width;
    canvasEl.height = bounds.height;

    requestAnimationFrame(() => {
      ctx.save();
      previewService.resetCtx(bounds);
      previewService.scaleFromBounds(bounds);
      previewService.draw();
      ctx.restore();
    });
  }
</script>

<div id="preview" on:click={() => ($selectedItem = undefined)}>
  <canvas id="canvas" bind:this={canvasEl} {width} {height} />
  <canvas id="canvas--text" bind:this={canvasTextEl} />
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  #preview {
    position: absolute;
    inset: 0;
    background: themed(preview, background);
    z-index: z-index(preview);
  }

  #canvas {
    width: 100%;
    height: 100%;

    &--text {
      display: none;
    }
  }
</style>
