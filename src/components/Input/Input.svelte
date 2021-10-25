<script lang="ts">
    export let title = '';
    export let isEmpty = false;

    let className = '';
    export { className as class };
</script>

<div
    class="input {className}"
    class:empty={isEmpty}
    class:has-no-title={!title}
>
    <slot />
    <fieldset class="input__fieldset">
        <legend class="input__title">{title}</legend>
    </fieldset>
    <p class="input__placeholder">{title}</p>
</div>
