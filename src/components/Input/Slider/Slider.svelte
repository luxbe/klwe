<script lang="ts">
    export let min: number = 0;
    export let max: number;

    export let value: number = min;
    export let title: string;
    let className: string = '';
    export { className as class };
</script>

<div class="input {className}">
    <div class="input__label">
        <label for="slider">{title}</label>
        <span>{value}</span>
    </div>
    <input
        id="slider"
        type="range"
        class="input__element "
        {min}
        {max}
        bind:value
        on:input
    />
</div>

<style lang="scss">
    @use '@/styles/abstracts' as *;

    .input {
        padding: 0;
        margin: 0;

        &__label {
            display: flex;
            justify-content: space-between;
            margin-bottom: size(xs);
        }
        &__element {
            background: transparent;
            -webkit-appearance: none;

            &::-moz-range-track {
                height: size(lg);
                box-sizing: border-box;
                border: size(border) solid themed(border, color--light);
                background: var(
                    --slider-background,
                    themed(slider, background)
                );
                background-origin: border-box;
                border-radius: border-radius(md);
            }

            &::-moz-range-thumb {
                width: size(slider-width);
                height: size(slider-height);
                border: none;
                background: themed(slider, background-thumb);
                border-radius: border-radius(md);
            }

            &::-webkit-slider-runnable-track {
                height: size(lg);
                box-sizing: border-box;
                border: size(border) solid themed(border, color--light);
                background: var(
                    --slider-background,
                    themed(slider, background)
                );
                border-radius: border-radius(md);
                background-origin: border-box;
            }

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: size(slider-width);
                height: size(slider-height);
                border: none;
                background: themed(slider, background-thumb);
                border-radius: border-radius(md);
                margin-top: -#{size(md)};
            }
        }
    }
</style>
