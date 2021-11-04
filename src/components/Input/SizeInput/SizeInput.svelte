<script lang="ts">
  import Input from '../Input.svelte';

  export let width: number = undefined;
  export let height: number = undefined;
</script>

<Input title="Size" class="input--size">
  {#if width}
    <div class="entry">
      <label class="label" for="size-width">W</label>
      <input
        type="number"
        id="size-width"
        class="input__element"
        bind:value={width}
      />
    </div>
  {/if}
  {#if height}
    <div class="entry">
      <label class="label" for="size-width">H</label>
      <input
        type="number"
        id="size-width"
        class="input__element"
        bind:value={height}
      />
    </div>
  {/if}
</Input>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  :global(.input--size) {
    display: flex;
    gap: size(gap);
  }

  .entry {
    display: flex;
    align-items: center;
    flex: 1;

    .label {
      color: themed(text, color--blur);
      min-width: 1rem;
    }
  }
</style>
