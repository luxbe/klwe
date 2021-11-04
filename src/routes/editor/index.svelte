<script lang="ts">
  import Activitybar from '@/components/Activitybar';
  import Panel, {
    DetailsPanel,
    EditorPanel,
    InfoPanel,
    SettingsPanel,
  } from '@/components/Panel';
  import Preview from '@/components/Preview';
  import { kustomService } from '@/services';
  import { activityStore, kustomStore, snackbarStore } from '@/stores';
  import { onMount } from 'svelte';

  const { preset } = kustomStore;
  const { activity, open } = activityStore;

  let loading = true;

  onMount(() => {
    kustomService.loadPreset();
    loading = false;
  });

  $: panel = {
    left: {
      open: $open,
      component:
        $activity === 'INFO'
          ? InfoPanel
          : $activity === 'EDITOR'
          ? EditorPanel
          : SettingsPanel,
    },
    right: {
      open: $open && $activity === 'EDITOR',
      component: DetailsPanel,
    },
  };

  function onKeydown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      kustomStore.preset.store();
      snackbarStore.show('Saved preset successfully!', 'success');
    }
  }
</script>

<svelte:head>
  <title>{$preset.preset_info.title || 'New Project'}</title>
</svelte:head>
<svelte:window
  on:unload={() => kustomStore.preset.store()}
  on:keydown={onKeydown}
/>

{#if !loading}
  <Preview />
  <Panel open={panel.left.open} side="left">
    <svelte:component this={panel.left.component} />
  </Panel>
  <Activitybar />
  <Panel open={panel.right.open} side="right">
    <svelte:component this={panel.right.component} />
  </Panel>
  <Activitybar />
{/if}
