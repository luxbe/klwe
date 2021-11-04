<script lang="ts">
  import Dialog from '@/components/Dialog';
  import Snackbar from '@/components/Snackbar';
  import { themeStore, ThemeType } from '@/stores';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import '../app.scss';

  let theme: ThemeType = get(themeStore.theme),
    target: HTMLElement;

  onMount(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    themeStore.theme.set(mql.matches ? 'dark' : 'light');

    mql.addEventListener('change', (e) => {
      themeStore.theme.set(e.matches ? 'dark' : 'light');
    });

    target = document.getElementById('app');

    themeStore.theme.subscribe((v) => {
      target.classList.replace(`theme--${theme}`, `theme--${v}`);
      theme = v;
    });
  });
</script>

<slot />
<Dialog />
<Snackbar />
