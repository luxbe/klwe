<script lang="ts">
  import { getContext } from 'svelte';
  import { Writable } from 'svelte/store';
  import { SELECT_SELECTED_TEXT, SELECT_SELECTED_VALUE } from './context';

  export let value: string;
  let optionEl: HTMLElement;

  let selectedText = getContext<Writable<string>>(SELECT_SELECTED_TEXT);
  let selectedValue = getContext<Writable<string>>(SELECT_SELECTED_VALUE);

  function setSelected() {
    const text = optionEl.textContent;

    $selectedText = text;
    $selectedValue = value;
  }
</script>

<button
  class="option"
  class:active={selectedValue && value === $selectedValue}
  on:click={setSelected}
  bind:this={optionEl}
>
  <slot />
</button>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .option {
    padding: size(sm) size(lg);
    width: 100%;
    margin: 0;
    background: themed(option, background);
    text-align: start;
    outline: none;
    border: none;
    color: inherit;
    cursor: pointer;
    transition: all transition(time);
    min-height: 2rem;

    &:hover {
      background: themed(option, background--hover);
    }

    &.active {
      background: themed(option, background--active);
    }
  }
</style>
