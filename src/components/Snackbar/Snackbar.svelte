<script>
    import Icon from '../Icon';

    import { snackbarStore } from '@/stores';
    const { text, type, isOpen } = snackbarStore;
</script>

<div id="snackbar" class:open={$isOpen}>
    <div class="card snackbar snackbar--{$type}">
        <div class="card__content">
            <Icon icon={$type} class="snackbar__icon" />
            <p class="is-size-5">{$text}</p>
        </div>
    </div>
</div>

<style lang="scss">
    @use '@/styles/abstracts' as *;

    $types: info, success, warning, danger;

    #snackbar {
        display: grid;
        position: absolute;
        inset: 0;
        align-items: flex-end;
        justify-content: center;
        z-index: z-index(snackbar);
        margin-bottom: size(lg);
        opacity: 0;
        transform: translateY(5rem);
        transition: all transition(time);
        pointer-events: none;

        &.open {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .snackbar {
        background: themed(snackbar, background);
        border: size(border) solid themed(border, color);
        padding: size(lg);
        pointer-events: all;

        @each $type in $types {
            &--#{$type} {
                color: themed(snackbar, color--#{$type});

                :global(.snackbar__icon) {
                    fill: themed(snackbar, color--#{$type});
                }
            }
        }
    }

    .card__content {
        display: flex;
        align-items: center;
        gap: size(gap);
        padding: size(xs) size(md);

        p {
            margin: 0;
        }
    }
</style>
