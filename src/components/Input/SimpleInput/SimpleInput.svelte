<script lang="ts">
  import Input from '../Input.svelte';

  export let title: string;
  export let multiline = false;
  export let number = false;
  export let value: string | number = number ? 0 : '';
</script>

<Input {title} isEmpty={value === ''}>
  {#if multiline}
    <textarea class="input__element" rows="4" bind:value />
  {:else if number}
    <input class="input__element" bind:value type="number" />
  {:else}
    <input class="input__element" bind:value type="text" />
  {/if}
</Input>
