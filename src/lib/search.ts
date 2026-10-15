import { CATEGORIES, COLLECTIONS, MATERIALS, PIECES, byYear, type Piece } from "../content";

/**
 * Search over the study's own catalogue: a piece matches when every word of
 * the query is found in its name, designer, year, kind, materials, category
 * or collection. Accents are ignored, so "schroder" finds Schröder.
 */
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function haystack(p: Piece) {
  const c = CATEGORIES.find((x) => x.id === p.category)!;
  const k = COLLECTIONS.find((x) => x.id === p.collection)!;
  return fold([p.name, p.designer, p.kind, String(p.year), p.when ?? "", p.madeBy ?? "", p.today ?? "", ...p.materials, MATERIALS[p.material].name, c.name, k.name].join(" "));
}

export function search(q: string): Piece[] {
  const words = fold(q).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return PIECES.filter((p) => { const h = haystack(p); return words.every((w) => h.includes(w)); }).sort(byYear);
}
