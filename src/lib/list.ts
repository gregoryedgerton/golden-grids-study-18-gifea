import { useSyncExternalStore } from "react";

/**
 * Your list: the pieces a reader has saved. The reference keeps favourites
 * on an account; the study has none, so the list lives in this browser's
 * local storage and goes nowhere else. Nothing is sent and nothing is sold.
 * Compare is the same kind of store, for up to four pieces, in the tab only.
 */
function store(key: string, storage: () => Storage, limit = Infinity) {
  let ids: string[] = [];
  try { ids = JSON.parse(storage().getItem(key) ?? "[]"); if (!Array.isArray(ids)) ids = []; } catch { ids = []; }
  const listeners = new Set<() => void>();
  const emit = () => { try { storage().setItem(key, JSON.stringify(ids)); } catch { /* keep it in memory */ } listeners.forEach((l) => l()); };
  return {
    has: (id: string) => ids.includes(id),
    toggle(id: string) { ids = ids.includes(id) ? ids.filter((i) => i !== id) : ids.length >= limit ? ids : [...ids, id]; emit(); },
    remove(id: string) { ids = ids.filter((i) => i !== id); emit(); },
    clear() { ids = []; emit(); },
    full: () => ids.length >= limit,
    use: () => useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => ids, () => ids),
  };
}

export const saved = store("gg18-list", () => localStorage);
export const compare = store("gg18-compare", () => sessionStorage, 4);
