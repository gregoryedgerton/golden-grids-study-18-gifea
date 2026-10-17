import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon, type IconName } from "../icons";
import { seen, photo } from "../photos";
import { SOURCES, cited, type SourceKey } from "../sources";
import { COLLECTIONS, MATERIALS, collection, dateOf, piece, productHref, type CollectionId, type MaterialId, type Piece } from "../content";
import { compare } from "./list";

/** Flat modules: bars, lists, tables and forms. They are not grids because their content has no hierarchy to descend. */

/**
 * The email box that ends every page, after the reference's loyalty
 * programme. One field, autofill off; it sends nothing and says so (Safe
 * Browsing remediation, see CLAUDE.md).
 */
export function FamilySignup() {
  const [sent, setSent] = useState(false);
  const id = useId();
  return (
    <section className="family" aria-labelledby={`${id}t`}>
      <div className="wrap family__row">
        <div className="family__text">
          <h2 id={`${id}t`}>GIFea Family</h2>
          <p>A note by email when a collection is added to the archive, and early word of new rooms.</p>
        </div>
        <form className="family__form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className="visually-hidden" htmlFor={`${id}e`}>Email address</label>
          <input id={`${id}e`} type="email" required placeholder="Email address" autoComplete="off" />
          <button type="submit" className="btn btn--dark">Subscribe</button>
          <p className="note" role="status">{sent ? "Nothing was sent: this is a layout study, and there is no list." : "Nothing you type here is sent or stored."}</p>
        </form>
      </div>
    </section>
  );
}

/** A bar that sticks under the notice tells the page its height, so an opened square's head and in-page links clear it. It reports 0 when it is not sticking. */
export function useBarHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const set = () => document.documentElement.style.setProperty("--bar-h", getComputedStyle(el).position === "sticky" ? `${Math.round(el.getBoundingClientRect().height)}px` : "0px");
    set();
    const ro = new ResizeObserver(set); ro.observe(el);
    window.addEventListener("resize", set);
    return () => { ro.disconnect(); window.removeEventListener("resize", set); document.documentElement.style.removeProperty("--bar-h"); };
  }, []);
  return ref;
}

export type Sort = "old" | "new" | "name";
export function FilterBar({ pieces, cols, toggleCol, mats, toggleMat, sort, setSort, count, clear }: {
  pieces: Piece[]; cols: CollectionId[]; toggleCol: (c: CollectionId) => void; mats: MaterialId[]; toggleMat: (m: MaterialId) => void; sort: Sort; setSort: (s: Sort) => void; count: number; clear: () => void;
}) {
  const ref = useBarHeight<HTMLDivElement>();
  const colN = (c: CollectionId) => pieces.filter((p) => p.collection === c).length;
  const matN = (m: MaterialId) => pieces.filter((p) => p.material === m).length;
  const any = cols.length + mats.length > 0;
  return (
    <div className="filterbar" ref={ref}>
      <div className="wrap filterbar__in">
        <div className="filterbar__row">
          <div className="fchips" role="group" aria-label="Collection">
            {COLLECTIONS.filter((c) => colN(c.id)).map((c) => <button key={c.id} type="button" className="fchip" aria-pressed={cols.includes(c.id)} onClick={() => toggleCol(c.id)}>{c.name} <span className="fchip__n">({colN(c.id)})</span></button>)}
          </div>
        </div>
        <div className="filterbar__row">
          <div className="fchips" role="group" aria-label="Material">
            {(Object.keys(MATERIALS) as MaterialId[]).filter((m) => matN(m)).map((m) => <button key={m} type="button" className="fchip fchip--mat" aria-pressed={mats.includes(m)} onClick={() => toggleMat(m)}><span className={`swatch swatch--${m}`} aria-hidden="true" />{MATERIALS[m].name} <span className="fchip__n">({matN(m)})</span></button>)}
          </div>
          <label className="sortby"><span>Sort</span>
            <select autoComplete="off" value={sort} onChange={(e) => setSort(e.target.value as Sort)}><option value="old">Oldest first</option><option value="new">Newest first</option><option value="name">Name, A to Z</option></select>
          </label>
          <p className="filterbar__count" role="status" aria-live="polite">{count} {count === 1 ? "item" : "items"}</p>
          {any && <button type="button" className="textbtn" onClick={clear}>Clear filters</button>}
        </div>
      </div>
    </div>
  );
}

/** The compare tray and table: up to four pieces, side by side, as a table. */
export function CompareTray() {
  const ids = compare.use();
  const [open, setOpen] = useState(false);
  const id = useId();
  const ps = ids.map((i) => piece(i)).filter(Boolean) as Piece[];
  useEffect(() => { if (ps.length < 2) setOpen(false); }, [ps.length]);
  if (!ps.length) return null;
  const rows: [string, (p: Piece) => ReactNode][] = [
    ["Designed", (p) => dateOf(p)], ["Designer", (p) => p.designer], ["What it is", (p) => p.kind], ["Materials", (p) => p.materials.join(", ")],
    ["First made by", (p) => p.madeBy ?? "Not recorded here"], ["Made today by", (p) => p.today ?? "Not recorded here"], ["Collection", (p) => collection(p.collection)!.name],
  ];
  return (
    <section className="compare" aria-labelledby={`${id}t`}>
      <div className="wrap compare__bar">
        <h2 id={`${id}t`} className="compare__title">Compare ({ps.length} of 4)</h2>
        <ul className="compare__picked">{ps.map((p) => <li key={p.id}>{p.name}<button type="button" className="compare__x" aria-label={`Take ${p.name} out of the comparison`} onClick={() => compare.remove(p.id)}>×</button></li>)}</ul>
        <button type="button" className="btn btn--blue" aria-expanded={open} aria-controls={`${id}tbl`} disabled={ps.length < 2} onClick={() => setOpen(!open)}>{open ? "Hide the comparison" : "Compare"}</button>
        <button type="button" className="textbtn" onClick={() => compare.clear()}>Clear</button>
      </div>
      {open && (
        <div className="wrap compare__table" id={`${id}tbl`}>
          <table className="specs specs--compare">
            <thead><tr><td />{ps.map((p) => <th key={p.id} scope="col"><a href={productHref(p.id)}>{p.name}</a></th>)}</tr></thead>
            <tbody>{rows.map(([k, f]) => <tr key={k}><th scope="row">{k}</th>{ps.map((p) => <td key={p.id}>{f(p)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/** Tabs, as the reference's product page has them: a tablist with arrow keys, one panel at a time. */
export function Tabs({ tabs }: { tabs: { id: string; label: string; body: ReactNode }[] }) {
  const [on, setOn] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: KeyboardEvent) => {
    const n = tabs.length; let i = on;
    if (e.key === "ArrowRight") i = (on + 1) % n; else if (e.key === "ArrowLeft") i = (on - 1 + n) % n; else if (e.key === "Home") i = 0; else if (e.key === "End") i = n - 1; else return;
    e.preventDefault(); setOn(i); refs.current[i]?.focus();
  };
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="About this piece" onKeyDown={key}>
        {tabs.map((t, i) => <button key={t.id} ref={(el) => { refs.current[i] = el; }} type="button" role="tab" id={`${base}${t.id}`} aria-selected={on === i} aria-controls={`${base}${t.id}p`} tabIndex={on === i ? 0 : -1} onClick={() => setOn(i)}>{t.label}</button>)}
      </div>
      {tabs.map((t, i) => <div key={t.id} role="tabpanel" id={`${base}${t.id}p`} aria-labelledby={`${base}${t.id}`} hidden={on !== i} tabIndex={0} className="tabs__panel">{t.body}</div>)}
    </div>
  );
}

/** The reference's row of service tiles, as a flat list: an icon, a title, a line. */
export function Services({ title, items }: { title: string; items: { icon: IconName; title: string; body: string; href?: string }[] }) {
  const id = useId();
  return (
    <section className="flat" aria-labelledby={`${id}t`}>
      <div className="wrap">
        <h2 id={`${id}t`} className="flat__title">{title}</h2>
        <ul className="services">
          {items.map((s) => (
            <li key={s.title}>
              <span className="services__icon"><Icon name={s.icon} size={28} /></span>
              <h3>{s.href ? <a href={s.href}>{s.title}</a> : s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Paragraphs under a heading, at reading width: the reference's closing text. */
export function Prose({ title, paras, id }: { title: string; paras: ReactNode[]; id?: string }) {
  const h = useId();
  return (
    <section className="flat" id={id} aria-labelledby={`${h}t`}>
      <div className="wrap prose">
        <h2 id={`${h}t`} className="flat__title">{title}</h2>
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </section>
  );
}

/** An intro that shows its first lines and a Read more, as the reference's category pages do. */
export function ReadMore({ intro, more }: { intro: string; more: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="readmore">
      <p>{intro}</p>
      <p id={id} hidden={!open}>{more}</p>
      <button type="button" className="textbtn textbtn--ink" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>{open ? "Read less" : "Read more"}</button>
    </div>
  );
}

/** Every photograph and every source on the page, for the disclosure. Rendered after the page has drawn. */
export function Credits() {
  const [keys, setKeys] = useState<string[]>([]);
  const [src, setSrc] = useState<SourceKey[]>([]);
  useEffect(() => {
    const read = () => {
      const k = [...seen], s = [...cited];
      setKeys((old) => (old.join() === k.join() ? old : k));
      setSrc((old) => (old.join() === s.join() ? old : s));
    };
    read();
    const t = setInterval(read, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {keys.length > 0 && (
        <details>
          <summary>Photographs on this page ({keys.length})</summary>
          <ul>{keys.map((k) => { const p = photo(k); return <li key={k}>{p.alt} <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}.</li>; })}</ul>
        </details>
      )}
      {src.length > 0 && (
        <details>
          <summary>Sources for the facts on this page ({src.length})</summary>
          <ul>{src.map((k) => <li key={k}><a href={SOURCES[k].url}>{SOURCES[k].full}</a></li>)}</ul>
        </details>
      )}
    </>
  );
}
