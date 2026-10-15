import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, deal, type Cell } from "../bands/bands";
import { FactStrip, FactTile, Pic, ProductCard } from "../lib/cards";
import { Prose } from "../lib/modules";
import { CATEGORIES, DEPARTMENTS, PAGES, PIECES, REFERENCE, categoriesOf, category, categoryHref, dept, departmentHref, piecesIn, piecesOfDept, type CategoryId, type DeptId } from "../content";
import { useReducedMotion } from "../lib/motion";
import "../styles.css";

/**
 * Products, as a descent. The reference lists its departments and their
 * categories on one page; here each level is a band of its own. Choosing a
 * department opens a band of its categories beneath the row, and choosing a
 * category opens the band, or bands, of its pieces beneath that: three
 * golden grids stacked, never nested, one for each level of the hierarchy.
 * The choice is kept in the address, so a level can be linked to.
 */
function Tile({ name, count, photo, pressed, onPick, label }: { name: string; count: number; photo: string; pressed: boolean; onPick: () => void; label: string }) {
  return (
    <button type="button" className="cattile" aria-pressed={pressed} aria-label={label} onClick={onPick}>
      <span className="cattile__pic"><Pic k={photo} sizes="(min-width: 1100px) 40vw, 80vw" /></span>
      <span className="cattile__text"><span className="cattile__name">{name}</span><span className="cattile__n">{count} {count === 1 ? "piece" : "pieces"}</span></span>
    </button>
  );
}

function read(): { d: DeptId; c: CategoryId | null } {
  const q = new URLSearchParams(location.search);
  const d = (dept(q.get("d") ?? "")?.id ?? "seating") as DeptId;
  const c = category(q.get("c") ?? "");
  return { d, c: c && c.dept === d ? c.id : q.has("d") ? null : "chairs" };
}

function App() {
  const first = useRef(read());
  const [d, setD] = useState<DeptId>(first.current.d);
  const [c, setC] = useState<CategoryId | null>(first.current.c);
  const [said, setSaid] = useState("");
  const reduced = useReducedMotion();
  const moved = useRef(false);
  useEffect(() => {
    const q = new URLSearchParams({ d, ...(c ? { c } : {}) });
    history.replaceState(null, "", `${location.pathname}?${q}`);
    if (!moved.current) { moved.current = true; return; }
    const el = document.getElementById(c ? "level-3" : "level-2");
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [d, c, reduced]);

  const pickDept = (id: DeptId) => { setD(id); setC(null); const n = categoriesOf(id).length; setSaid(`${dept(id)!.name}: ${n} categories, shown below.`); };
  const pickCat = (id: CategoryId) => { setC(id); setSaid(`${category(id)!.name}: ${piecesIn(id).length} pieces, shown below.`); };

  const D = dept(d)!;
  const cats = categoriesOf(d);
  const C = c ? category(c)! : null;
  const list = C ? piecesIn(C.id) : [];
  const groups = deal(list);
  const deptCell = (i: number): Cell => () => { const x = DEPARTMENTS[i]; const n = piecesOfDept(x.id).length; return <Tile name={x.name} count={n} photo={x.photo} pressed={d === x.id} onPick={() => pickDept(x.id)} label={`${x.name}, ${n} pieces: show its categories`} />; };
  const catCell = (i: number): Cell => () => { const x = cats[i]; const n = piecesIn(x.id).length; return <Tile name={x.name} count={n} photo={x.photo} pressed={c === x.id} onPick={() => pickCat(x.id)} label={`${x.name}, ${n} pieces: show them`} />; };

  return (
    <Page current={PAGES.products} source={[REFERENCE.products]} crumbs={[{ label: "Products" }]} chips={false}>
      <div className="wrap titlerow"><h1 className="pagetitle">Products</h1><p className="lede">{PIECES.length} pieces in {DEPARTMENTS.length} departments and {CATEGORIES.length} categories. Choose a department, then a category; each opens beneath the one before.</p></div>
      <p className="visually-hidden" role="status" aria-live="polite">{said}</p>
      <GridBand id="level-1" title="Departments" variant={1} from={2}
        cells={DEPARTMENTS.map((_, i) => deptCell(i))}
        strip={(_x, _k, flat) => { const f = { line: String(PIECES.length), label: "Pieces in the archive", short: "Pieces", tone: "blue" as const }; return flat ? <FactStrip f={f} /> : <FactTile f={f} />; }} />
      <div id="level-2" className="level">
        <nav className="wrap pathbar" aria-label="Where you are"><ol><li><a href={PAGES.products}>Products</a></li><li><a href={departmentHref(D.id)}>{D.name}</a></li></ol></nav>
        <GridBand key={d} id={`cats-${d}`} title={`${D.name}: categories`} sub={D.blurb} aside={{ href: departmentHref(D.id), label: `Visit ${D.name}` }} variant={d === "seating" ? 3 : 0} from={cats.length < 4 ? 2 : 1}
          cells={cats.map((_, i) => catCell(i))}
          strip={cats.length < 4 ? (_x, _k, flat) => { const f = { line: String(piecesOfDept(d).length), label: `Pieces in ${D.name}`, short: "Pieces", tone: "tile" as const }; return flat ? <FactStrip f={f} /> : <FactTile f={f} />; } : undefined} />
      </div>
      {C && (
        <div id="level-3" className="level">
          <nav className="wrap pathbar" aria-label="Where you are, in full"><ol><li><a href={PAGES.products}>Products</a></li><li><a href={departmentHref(D.id)}>{D.name}</a></li><li><a href={categoryHref(C.id)}>{C.name}</a></li></ol></nav>
          {groups.map((g, i) => (
            <GridBand key={`${C.id}-${i}`} id={`pieces-${C.id}-${i + 1}`} title={i === 0 ? C.name : `${C.name}, part ${i + 1} of ${groups.length}`} sub={i === 0 ? C.intro : undefined} quiet={i > 0}
              aside={i === 0 ? { href: categoryHref(C.id), label: `Filter and compare ${C.short.toLowerCase()}` } : undefined} variant={i + 2} lead={i % 2 === 1}
              cells={g.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />)} />
          ))}
        </div>
      )}
      <Prose title="How the catalogue is arranged" paras={[
        "Every piece has one place in the hierarchy, a department and a category, as a product has on the reference's site. The categories follow use: chairs for dining and work, armchairs and lounge chairs, chaise longues and rockers, stools; tables, storage; desk lamps, floor and pendant lamps.",
        "The same pieces are also gathered by collection, eight periods from bentwood to the space age, and some by the historic rooms they were made for.",
      ]} />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
