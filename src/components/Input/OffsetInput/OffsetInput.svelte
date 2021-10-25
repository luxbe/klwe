<script lang="ts" context="module">
    import { Offset } from '@/interfaces';

    export const OFFSET_KEYS_MAP: Readonly<
        { [key in keyof Offset]: string }
    > = {
        x: 'X',
        y: 'Y',
    } as const;

    export const OFFSET_KEYS: readonly (keyof Offset)[] = ['x', 'y'] as const;
</script>

<script lang="ts">
    import Input from '../Input.svelte';
    import { Item } from 'kustom';
    import { afterUpdate } from 'svelte';
    import { dataService } from '@/services';

    export let item: Item;

    let offset = dataService.getOffset(item);

    afterUpdate(() => {
        offset = dataService.getOffset(item);
    });

    function setItemOffset() {
        item.position_offset_x = offset.x;
        item.position_offset_y = offset.y;
    }
</script>

<Input title="Offset" class="input--offset">
    {#each OFFSET_KEYS as key}
        <div class="entry">
            <label class="label" for="offset-{key}"
                >{OFFSET_KEYS_MAP[key]}</label
            >
            <input
                type="number"
                id="offset-{key}"
                class="input__element"
                value={offset[key]}
                on:input={(e) => {
                    offset[key] = +e.currentTarget.value;
                    setItemOffset();
                }}
            />
        </div>
    {/each}
</Input>

<style lang="scss">
    @use '@/styles/abstracts' as *;

    :global(.input--offset) {
        display: grid;
        width: 100%;
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
