<script lang="ts">
    import { SimpleInput } from '@/components/Input';
    import { kustomStore } from '@/stores';

    const { preset } = kustomStore;
</script>

<SimpleInput title="Title" bind:value={$preset.preset_info.title} />
<SimpleInput
    title="Description"
    multiline
    bind:value={$preset.preset_info.description}
/>
<SimpleInput title="Author" bind:value={$preset.preset_info.author} />
<SimpleInput title="E-Mail" bind:value={$preset.preset_info.email} />
<SimpleInput title="Width" number bind:value={$preset.preset_info.width} />
<SimpleInput title="Height" number bind:value={$preset.preset_info.height} />
