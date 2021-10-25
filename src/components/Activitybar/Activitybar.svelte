<script>
    import { activityStore } from '@/stores';
    import Icon from '@/components/Icon';

    const { activities, activityIcons, activity } = activityStore;
</script>

<div id="activitybar">
    {#each activities as _activity}
        {#if _activity === 'SETTINGS'}
            <div class="spacer" />
        {/if}
        <button
            class:active={$activity === _activity}
            class="btn is-icon is-lg is-transparent"
            on:click={() => activity.change(_activity)}
            aria-label={_activity}
        >
            <Icon icon={activityIcons[_activity]} />
        </button>
    {/each}
</div>

<style lang="scss">
    @use '@/styles/abstracts' as *;

    #activitybar {
        position: absolute;
        z-index: z-index(activitybar);
        display: flex;
        width: size(activitybar);
        height: 100%;
        flex-direction: column;
        border-right: size(border) solid themed(border, color);
        background: themed(activitybar, background);

        .btn {
            border-radius: 0;

            &::after {
                position: absolute;
                content: '';
                inset: 0;
            }

            &.active {
                &::after {
                    border-left: size(border) solid themed(border, color--focus);
                }
            }
        }
    }

    .spacer {
        flex: 1;
    }
</style>
