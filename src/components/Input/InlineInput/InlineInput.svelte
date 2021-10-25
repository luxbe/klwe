<script lang="ts">
    export let placeholder: string = undefined;

    export let value: string | number;
    export let disabled = false;
    let className = '';
    export { className as class };

    export let inputEl: HTMLInputElement = undefined;
</script>

<input
    type="text"
    class="input input__element {className}"
    bind:value
    bind:this={inputEl}
    {placeholder}
    {disabled}
    on:change
    on:blur
/>

<style lang="scss">
    .input {
        padding: 0;
        margin: 0;
        min-height: 1rem;
        display: inline;

        &:disabled {
            pointer-events: none;
        }
    }
</style>
