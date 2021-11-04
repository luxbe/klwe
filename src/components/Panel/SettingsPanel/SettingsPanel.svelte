<script lang="ts">
  import Icon from '@/components/Icon';

  import { kustomStore, themeStore } from '@/stores';
  import init, { exportKLWPFile } from 'kustom';

  const { themes, theme } = themeStore;
  const { preset } = kustomStore;

  function download(path: string, filename: string) {
    // create new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();

    // remove link
    document.body.removeChild(anchor);
  }

  async function onExportClick() {
    await init();
    const buf = exportKLWPFile($preset);
    const blob = new Blob([buf]);
    const url = URL.createObjectURL(blob);
    download(url, $preset.preset_info.title + '.klwp');
  }
</script>

<div class="content">
  <div class="btn is-group">
    {#each themes as t}
      <button
        class="btn"
        class:active={$theme === t}
        on:click={() => theme.set(t)}
        aria-label="theme {t}"
      >
        {t.charAt(0).toUpperCase() + t.slice(1)}
      </button>
    {/each}
  </div>
  <div class="spacer" />

  <button
    id="btn--export"
    class="btn"
    on:click={onExportClick}
    aria-label="export"
    ><Icon icon="export" />
    Export</button
  >
</div>

<style lang="scss">
  @use '@/styles/abstracts' as *;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: size(gap);
  }

  .spacer {
    flex: 1;
  }

  #btn--export {
    justify-content: center;
  }
</style>
