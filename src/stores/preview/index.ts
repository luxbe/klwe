import { get, writable } from 'svelte/store';

class PreviewStore {
    ctx = writable<CanvasRenderingContext2D>();

    get $ctx() {
        return get(this.ctx);
    }

    textCtx = writable<CanvasRenderingContext2D>();

    get $textCtx() {
        return get(this.textCtx);
    }
}

export const previewStore = new PreviewStore();
