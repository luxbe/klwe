import { writable } from 'svelte/store';

const ALL_THEMES = ['light', 'dark'] as const;
export type ThemeType = typeof ALL_THEMES[number];

class ThemeStore {
    themes = ALL_THEMES;
    theme = writable<ThemeType>('dark');
}

export const themeStore = new ThemeStore();
