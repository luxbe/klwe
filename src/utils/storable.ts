import { get, Writable, writable } from 'svelte/store';

export function storable<T>(
  key: string,
  value?: T,
  defaultValue?: T,
): Writable<T> & { store(): void; load(): T; clear(): void } {
  const raw = writable<T>(value);
  const { set, update, subscribe } = raw;

  return {
    set,
    update,
    subscribe,
    store() {
      const value = get(raw);
      localStorage.setItem(key, JSON.stringify(value));
    },
    load() {
      const valueRaw = localStorage.getItem(key);
      const value = valueRaw ? JSON.parse(valueRaw) : defaultValue;
      return value;
    },
    clear() {
      localStorage.removeItem(key);
    },
  };
}
