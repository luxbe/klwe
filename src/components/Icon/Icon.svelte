<script lang="ts">
    import { IconType, ICON_PATHS } from './iconPaths';
    export let icon: IconType;
    let className: string = '';
    export { className as class };

    $: path = ICON_PATHS[icon];
</script>

<svg
    class="icon {className}"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={`icon-${icon}`}
>
    <path class="icon__path" d={path} />
</svg>

<style lang="scss">
    @use '@/styles/abstracts' as *;

    .icon {
        width: size(icon);
        height: size(icon);
        fill: themed(text, color);

        path {
            fill: inherit;
            transition: all 150ms;
        }
    }
</style>
