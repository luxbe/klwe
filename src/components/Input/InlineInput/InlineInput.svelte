<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let placeholder: string = undefined;

  export let value: string | number;
  export let disabled = false;
  let className = '';
  export { className as class };
  export let inputEl: HTMLInputElement = undefined;

  let originalValue = value;

  function onKeydown(
    e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    if (e.key === 'Escape') {
      value = originalValue;
      e.currentTarget.blur();
    } else if (e.key === 'Tab' || e.key === 'Enter') e.currentTarget.blur();
  }

  function onChange() {
    originalValue = value;
  }
</script>

<input
  type="text"
  class="input input__element {className}"
  bind:value
  bind:this={inputEl}
  {placeholder}
  {disabled}
  on:keydown={onKeydown}
  on:change={onChange}
  on:change
  on:blur
/>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .input {
    padding: 0;
    margin: 0;
    min-height: 1rem;
    display: inline;
    border: size(border) solid transparent;
    padding: 2px 4px;
    font-size: text(size-md);

    &:disabled {
      pointer-events: none;
    }

    &:focus-within {
      border-color: themed(border, color--focus);
    }
  }
</style>
