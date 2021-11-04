<script lang="ts">
  import Icon from '@/components/Icon';
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import Input from '../Input.svelte';
  import Menu from '../Menu';
  import { SELECT_SELECTED_TEXT, SELECT_SELECTED_VALUE } from './context';

  export let value: string = undefined;
  export let text: string = undefined;
  export let title: string = undefined;
  let open = false;
  let className: string = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  const selectedTextStore = writable<string>(text);
  const selectedValueStore = writable<string>(value);

  selectedValueStore.subscribe((v) => {
    open = false;
    value = v;
    dispatch('change', v);
  });

  setContext(SELECT_SELECTED_TEXT, selectedTextStore);
  setContext(SELECT_SELECTED_VALUE, selectedValueStore);
</script>

<Input bind:title isEmpty={$selectedTextStore === undefined} class={className}>
  <Menu bind:open>
    <slot />
  </Menu>
  <button class="btn is-icon" class:open on:click={() => (open = !open)}>
    <Icon icon="chevron-down" />
  </button>
  {#if $selectedTextStore}
    <div class="select__value">
      <p>{$selectedTextStore}</p>
    </div>
  {/if}
</Input>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;

    &.open :global(.icon) {
      transform: rotate(180deg);
    }

    :global(.icon) {
      transition: transform transition(time);
    }
  }

  .select__value {
    display: flex;
    height: 100%;
    align-items: center;

    p {
      margin: 0;
    }
  }
</style>
