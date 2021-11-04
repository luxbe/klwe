<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@/components/Icon';
  import {
    snackbarStore,
    kustomStore,
    DEFAULT_PRESET,
    KLWE_STORAGE_KEY,
  } from '@/stores';
  import { onMount } from 'svelte';

  import init, { parseKLWPFile } from 'kustom';
  import { kustomService } from '@/services';

  let fileInputEl: HTMLInputElement, fileReader: FileReader;

  function onCreateNewClick() {
    kustomStore.preset.set(DEFAULT_PRESET);
    goto('/editor');
  }

  function onContinueClick() {
    kustomService.loadPreset();
    goto('/editor');
  }

  function onFileInputChange() {
    if (!fileInputEl.files || !fileInputEl.files.length)
      return snackbarStore.show('Error uploading files!', 'danger');

    const file = fileInputEl.files[0];
    if (!/\.(klwp)$/.test(file.name))
      return snackbarStore.show(`Invalid file type: '${file.name}'!`, 'danger');

    fileReader.readAsArrayBuffer(file);
  }

  async function onLoadEnd(e: ProgressEvent<FileReader>) {
    await init();

    const buf = new Uint8Array(e.target.result as ArrayBuffer);
    const preset = parseKLWPFile(buf);

    kustomService.initPreset(preset);
    kustomStore.preset.store();

    await goto('/editor');
    snackbarStore.show(`Loading complete!`, 'success');
  }

  let presetExists = false;

  onMount(() => {
    fileReader = new FileReader();
    fileReader.onloadend = onLoadEnd;

    presetExists = !!localStorage.getItem(KLWE_STORAGE_KEY);
  });
</script>

<svelte:head>
  <title>KLWE</title>
</svelte:head>

<div class="actions">
  <button class="btn" on:click={onCreateNewClick}>
    <Icon icon="add" />
    Create new
  </button>
  <button class="btn" on:click={() => fileInputEl.click()}>
    <Icon icon="import" />
    Import
    <input
      id="file-input"
      type="file"
      bind:this={fileInputEl}
      on:change={onFileInputChange}
      accept=".klwp"
    />
  </button>
  <button disabled={!presetExists} class="btn" on:click={onContinueClick}>
    <Icon icon="arrow-forward" />
    Continue
  </button>
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  :global(#app) {
    display: grid;
    align-items: center;
    justify-content: center;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: size(gap);
    min-width: 15vw;
  }

  #file-input {
    display: none;
  }
</style>
