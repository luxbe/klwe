import { writable } from 'svelte/store';

export type SnackbarType = 'info' | 'success' | 'warning' | 'danger';

const SNACKBAR_OPEN_TIME = 3000 as const;
// defined in '@/styles/abstracts/_variables.scss' + 50ms
const SNACKBAR_TRANSITION_TIME = 200 as const;

class SnackbarStore {
    text = writable('Default Text');
    type = writable<SnackbarType>('info');
    isOpen = writable(false);

    private timeout;

    async show(text: string, type: SnackbarType) {
        if (this.timeout) await this.hide();

        this.text.set(text);
        this.type.set(type);

        this.isOpen.set(true);

        this.timeout = setTimeout(() => {
            this.isOpen.set(false);
            this.timeout = undefined;
        }, SNACKBAR_OPEN_TIME);
    }

    hide(): Promise<void> {
        return new Promise((resolve) => {
            this.isOpen.set(false);
            clearTimeout(this.timeout);

            setTimeout(() => resolve(), SNACKBAR_TRANSITION_TIME);
        });
    }
}

export const snackbarStore = new SnackbarStore();
