<script lang="ts">
    import Icon from '@/components/Icon';
    import { InlineInput } from '@/components/Input';
    import { kustomService, dataService } from '@/services';
    import { kustomStore } from '@/stores';
    import { Item, Overlap, Stack } from 'kustom';
    import { tick } from 'svelte';

    import { HasLevel, KLWE_ATTRIBUTE } from '@/interfaces';

    const { selectedItem } = kustomStore;

    export let item: Item & HasLevel;

    $: placeholder = dataService.getPlaceholderTitle(item);
    $: isFolder = !!(item as Overlap | Stack).viewgroup_items;
    $: icon = dataService.getIconType(item);
    $: isOpen = isFolder && (item as Overlap | Stack)[KLWE_ATTRIBUTE].isOpen;

    let inputEl: HTMLInputElement,
        titleInputIsDisabled = true;

    async function onNodeDoubleClick() {
        titleInputIsDisabled = false;
        await tick();
        inputEl.select();
    }
</script>

<div
    class="tree__node"
    class:open={isOpen}
    class:active={$selectedItem === item}
    style="padding-left: {item[KLWE_ATTRIBUTE].level}rem;"
    on:click={() => ($selectedItem = item)}
    on:dblclick={onNodeDoubleClick}
>
    <div class="node__info">
        {#if isFolder}
            <button
                class="btn is-icon is-transparent"
                disabled={!item.viewgroup_items}
                on:click={() => kustomService.toggleIsOpen(item)}
            >
                <Icon icon="chevron-{isOpen ? 'down' : 'right'}" />
            </button>
        {/if}
        <Icon {icon} />
        <InlineInput
            {placeholder}
            bind:value={item.internal_title}
            disabled={titleInputIsDisabled}
            on:blur={() => (titleInputIsDisabled = true)}
            bind:inputEl
        />
    </div>
</div>
