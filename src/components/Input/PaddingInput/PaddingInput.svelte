<script lang="ts" context="module">
    import { Padding } from '@/interfaces';

    export const PADDING_KEYS_MAP: Readonly<
        { [key in keyof Padding]: string }
    > = {
        top: 'T',
        right: 'R',
        bottom: 'B',
        left: 'L',
    } as const;

    export const PADDING_KEYS: readonly (keyof Padding)[] = [
        'top',
        'right',
        'bottom',
        'left',
    ] as const;
</script>

<script lang="ts">
    import Input from '../Input.svelte';
    import { Item } from 'kustom';
    import { dataService } from '@/services';
    import { afterUpdate } from 'svelte';

    export let item: Item;

    let padding = dataService.getPadding(item);

    afterUpdate(() => {
        padding = dataService.getPadding(item);
    });

    function setItemPadding() {
        item.position_padding_top = padding.top;
        item.position_padding_right = padding.right;
        item.position_padding_bottom = padding.bottom;
        item.position_padding_left = padding.left;
    }
    function onInput(
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
        key: keyof Padding,
    ) {
        let value = Number(e.currentTarget.value);
        if (value < 0) e.currentTarget.value = '0';

        padding[key] = value;
        setItemPadding();
    }
</script>

<Input title="Padding" class="input--padding">
    {#each PADDING_KEYS as key}
        <div class="entry">
            <label class="label" for="padding-{key}"
                >{PADDING_KEYS_MAP[key]}</label
            >
            <input
                type="number"
                id="padding-{key}"
                class="input__element"
                value={padding[key]}
                on:input={(e) => onInput(e, key)}
                min="0"
            />
        </div>
    {/each}
</Input>

<style lang="scss">
    @use '@/styles/abstracts' as *;

    :global(.input--padding) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: size(gap);
    }

    .entry {
        display: flex;
        align-items: center;

        .label {
            color: themed(text, color--blur);
            min-width: 1rem;
        }
    }
</style>
