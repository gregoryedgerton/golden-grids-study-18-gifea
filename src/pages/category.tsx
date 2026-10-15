import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Chips, Page, type Crumb } from "../lib/Page";
import { GridBand, deal, type Cell } from "../bands/bands";
import { ProductCard, TextTile } from "../lib/cards";
import { CompareTray, FilterBar, Prose, ReadMore, type Sort } from "../lib/modules";
import { search } from "../lib/search";
import { MATERIALS, PAGES, PIECES, REFERENCE, byYear, categoriesOf, category, categoryHref, dept, departmentHref, piecesIn, piecesOfDept, type CollectionId, type MaterialId, type Piece } from "../content";
import "../styles.css";

/**
 * A category, after the reference's Armchairs & accent chairs: chips for the
 * neighbouring categories, the title and breadcrumb, an introduction with Read
 * more, filters with counts, a count of items, and the results with a Compare
 * box on each card and a promotion set among them. Here the results are
 * bands of five, and the filters are the catalogue's own: collection and
 * material, sorted by date. The same page shows a whole department (`?d=`),
 * a material within it (`&m=`) and the results of a search (`?q=`).
 */
const q = new URLSearchParams(location.search);
const C = category(q.get("c") ?? "");
const Dp = C ? dept(C.dept)! : dept(q.get("d") ?? "");
const query = q.get("q")?.trim() ?? "";
const m0 = q.get("m") as MaterialId | null;
const base: Piece[] = query ? search(query) : C ? piecesIn(C.id) : Dp ? piecesOfDept(Dp.id) : [...PIECES].sort(byYear);
const title = query ? `Results for “${query}”` : C ? C.name : Dp ? `All ${Dp.name.toLowerCase()}` : "All pieces";
const crumbs: Crumb[] = [{ label: "Products", href: PAGES.products }, ...(Dp ? [{ label: Dp.name, href: departmentHref(Dp.id) }] : []), ...(C ? [{ label: C.name }] : query ? [{ label: "Search" }] : Dp ? [{ label: "All" }] : [{ label: "All pieces" }])];
const SHAPES: { variant: number; lead?: boolean }[] = [{ variant: 1 }, { variant: 2, lead: true }, { variant: 4 }, { variant: 3, lead: true }, { variant: 0 }];

function App() {
  const [cols, setCols] = useState<CollectionId[]>([]);
  const [mats, setMats] = useState<MaterialId[]>(m0 && MATERIALS[m0] ? [m0] : []);
  const [sort, setSort] = useState<Sort>("old");
  const list = useMemo(() => {
    let l = base.filter((p) => (!cols.length || cols.includes(p.collection)) && (!mats.length || mats.includes(p.material)));
    if (sort === "new") l = [...l].sort((a, b) => b.year - a.year);
    if (sort === "name") l = [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [cols, mats, sort]);
  const toggle = <T,>(v: T[], set: (x: T[]) => void, x: T) => set(v.includes(x) ? v.filter((i) => i !== x) : [...v, x]);
  const clear = () => { setCols([]); setMats([]); };

  // The reference sets one promotion among the first results; the study's is a square of type that points to Compare.
  const cells: Cell[] = list.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} withCompare />);
  if (cells.length >= 4) cells.splice(3, 0, () => <TextTile title="Compare pieces side by side" body="Tick Compare on up to four cards, then press Compare in the bar below the filters." />);
  if (cells.length === 1) cells.push(() => <TextTile title={`1 of ${base.length} pieces`} body="One piece matches these filters. Clear them to see the rest." />);
  const groups = deal(cells);
  const siblings = Dp ? categoriesOf(Dp.id) : [];

  return (
    <Page current={PAGES.products} source={[REFERENCE.category]} crumbs={crumbs}
      chips={siblings.length ? <Chips up={{ href: Dp ? departmentHref(Dp.id) : PAGES.products, label: `Up to ${Dp ? Dp.name : "Products"}` }} items={siblings.map((c) => ({ label: c.name, href: categoryHref(c.id), photo: piecesIn(c.id)[0].photos[0], current: c.id === C?.id }))} /> : undefined}>
      <div className="wrap titlerow">
        <h1 className="pagetitle">{title}</h1>
        {C ? <ReadMore intro={C.intro} more={C.more} /> : Dp ? <p className="lede">{Dp.blurb}</p> : query ? <p className="lede">{base.length ? `Pieces whose name, designer, date, materials, category or collection include every word of the search.` : "Nothing in the catalogue matches every word of the search. Try a designer's name, a year or a material."}</p> : null}
      </div>
      {base.length > 0 && <FilterBar pieces={base} cols={cols} toggleCol={(c) => toggle(cols, setCols, c)} mats={mats} toggleMat={(m) => toggle(mats, setMats, m)} sort={sort} setSort={setSort} count={list.length} clear={clear} />}
      <CompareTray />
      {base.length > 0 && list.length === 0 && <p className="wrap none">No pieces match these filters. <button type="button" className="textbtn" onClick={clear}>Clear filters</button></p>}
      {groups.map((g, i) => {
        const s = SHAPES[i % SHAPES.length];
        return <GridBand key={`${cols.join()}|${mats.join()}|${sort}|${i}`} id={`results-${i + 1}`} title={`Results, part ${i + 1} of ${groups.length}`} quiet variant={s.variant} lead={s.lead} cells={g} />;
      })}
      {base.length > 1 && <Prose title={`About ${C ? C.name.toLowerCase() : "these pieces"}`} paras={[
        `The ${base.length} pieces here were designed between ${Math.min(...base.map((p) => p.year))} and ${Math.max(...base.map((p) => p.year))}, by ${[...new Set(base.map((p) => p.designer))].join("; ")}.`,
        "Each is listed with its date, its first maker and, where the study knows it, the firm that makes it today. The dates are of the design; several pieces were first made some years later, and the product page says so where it matters.",
      ]} />}
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
