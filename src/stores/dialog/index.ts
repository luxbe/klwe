import { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

class DialogStore {
  component = writable<typeof SvelteComponent>();
  isOpen = writable<boolean>(false);

  show(component: typeof SvelteComponent) {
    this.component.set(component);
    this.isOpen.set(true);
  }

  hide() {
    this.isOpen.set(false);
  }
}

export const dialogStore = new DialogStore();
