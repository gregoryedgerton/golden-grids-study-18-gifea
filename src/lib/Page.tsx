import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import { Credits, FamilySignup } from "./modules";
import { Icon } from "../icons";
import { CHIPS, FOOTER, HEADER, PAGES, dateOf, piece, productHref } from "../content";
import { saved } from "./list";
import { search } from "./search";
import { Pic } from "./cards";
import { useFontsReady } from "./fonts";

/**
 * The shell, after the reference's: a black utility bar, then the header (the
 * mark, the four ways in, a search field that suggests as it is typed, and
 * the reader's list; the reference's log-in greeting is left out, see
 * CLAUDE.md), a row of chips with small photographs, a breadcrumb, the page,
 * the GIFea Family email box and a grey footer of lists. The
 * reference's own items are shown for show; the study's pages are the links,
 * and the search and the list work on the study's own catalogue. Nothing in
 * the shell leaves for the reference: it is linked only from the notice and
 * the disclosure.
 */
function Search() {
  const [q, setQ] = useState("");
  const id = useId();
  const hits = q.trim().length >= 2 ? search(q) : [];
  const go = () => { const t = q.trim(); if (t) location.href = `${PAGES.category}?q=${encodeURIComponent(t)}`; };
  return (
    <form className="search" role="search" autoComplete="off" onSubmit={(e) => { e.preventDefault(); go(); }}>
      <label className="visually-hidden" htmlFor={`${id}q`}>Search the catalogue</label>
      <span className="search__icon" aria-hidden="true"><Icon name="search" size={20} /></span>
      <input id={`${id}q`} type="search" placeholder="What are you looking for?" value={q} autoComplete="off" aria-describedby={`${id}n`} onChange={(e) => setQ(e.target.value)} />
      <button type="submit" className="search__go">Search</button>
      <span id={`${id}n`} className="visually-hidden" role="status">{q.trim().length >= 2 ? `${hits.length} ${hits.length === 1 ? "piece matches" : "pieces match"}` : ""}</span>
      {hits.length > 0 && (
        <div className="search__hits">
          <p className="search__head">Pieces</p>
          <ul>
            {hits.slice(0, 6).map((p) => (
              <li key={p.id}><a href={productHref(p.id)}><span className="search__thumb"><Pic k={p.photos[0]} sizes="48px" /></span><span><strong>{p.name}</strong> {p.kind}, {dateOf(p)}</span></a></li>
            ))}
          </ul>
          <a className="search__all" href={`${PAGES.category}?q=${encodeURIComponent(q.trim())}`}>See all {hits.length} results</a>
        </div>
      )}
    </form>
  );
}

function ListButton() {
  const ids = saved.use();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); ref.current?.focus(); } }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [open]);
  const n = ids.length;
  return (
    <>
      <button type="button" ref={ref} className="hbtn" aria-expanded={open} aria-controls="list-panel" onClick={() => setOpen(!open)}>
        <span className="hbtn__icon"><Icon name="heart" size={24} filled={n > 0} />{n > 0 && <span className="hbtn__count" aria-hidden="true">{n}</span>}</span>
        <span className="hbtn__word">Your list<span className="visually-hidden">, {n} {n === 1 ? "piece" : "pieces"}</span></span>
      </button>
      {open && (
        <section className="listpanel" id="list-panel" aria-label="Your list">
          <div className="wrap listpanel__in">
            <header className="listpanel__head"><h2>Your list ({n})</h2><button type="button" className="btn btn--outline" onClick={() => { setOpen(false); ref.current?.focus(); }}>Close</button></header>
            {n === 0 ? <p>Your list is empty. Save a piece with its heart and it shows here.</p> : (
              <>
                <ul className="listpanel__lines">
                  {ids.map((i) => { const p = piece(i); if (!p) return null; return (
                    <li key={i}>
                      <span className="listpanel__thumb"><Pic k={p.photos[0]} sizes="64px" /></span>
                      <span className="listpanel__name"><a href={productHref(p.id)}>{p.name}</a><small>{p.kind}, {dateOf(p)} · {p.designer}</small></span>
                      <button type="button" className="textbtn" aria-label={`Remove ${p.name}`} onClick={() => saved.remove(i)}>Remove</button>
                    </li>
                  ); })}
                </ul>
                <p className="listpanel__actions"><button type="button" className="btn btn--outline" onClick={() => saved.clear()}>Clear the list</button><span className="note">The list stays in this browser and is sent nowhere.</span></p>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export function Chips({ items, up }: { items: { label: string; href: string; photo?: string; current?: boolean }[]; up?: { href: string; label: string } }) {
  return (
    <nav className="wrap chips" aria-label="Browse">
      <ul>
        {up && <li><a className="chip chip--up" href={up.href} aria-label={up.label}><Icon name="up" size={18} /></a></li>}
        {items.map((c) => (
          <li key={c.label}><a className="chip" href={c.href} aria-current={c.current ? "page" : undefined}>{c.photo && <span className="chip__pic"><Pic k={c.photo} sizes="40px" /></span>}<span>{c.label}</span></a></li>
        ))}
      </ul>
    </nav>
  );
}

export interface Crumb { label: string; href?: string }

export function Page({ current, source, crumbs, chips, children }: { current: string; source: { label: string; url: string }[]; crumbs?: Crumb[]; chips?: ReactNode | false; children: ReactNode }) {
  useFontsReady(["400 1em 'Noto Sans'", "700 1em 'Noto Sans'"]);
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <StudyBanner />
      <Tools />
      <header className="top">
        <div className="utility">
          <div className="wrap utility__row">
            <span><Icon name="globe" size={16} />US <span aria-hidden="true">|</span> English</span>
            <span>Nothing here is for sale</span>
          </div>
        </div>
        <div className="wrap top__row">
          <a className="mark" href={PAGES.home} aria-label="GIFea home"><span className="mark__oval">GIFea</span></a>
          <nav className="hnav" aria-label="Main">
            <ul>{HEADER.nav.map((h) => <li key={h.label}><a href={h.href} aria-current={h.href === current ? "page" : undefined}>{h.label}</a></li>)}</ul>
          </nav>
          <Search />
          <div className="hacts">
            <ListButton />
          </div>
        </div>
      </header>
      {chips === undefined ? <Chips items={CHIPS} /> : chips}
      {crumbs && <nav className="wrap crumbs" aria-label="Breadcrumb"><ol>{crumbs.map((c, i) => <li key={`${c.label}${i}`}>{i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : c.href ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}</li>)}</ol></nav>}
      <main id="content">{children}</main>
      <FamilySignup />
      <footer className="foot">
        <div className="wrap foot__cols">
          {FOOTER.map(([title, items]) => (
            <div key={title}><h2>{title}</h2><ul>{items.map((i) => <li key={i}>{i === "This is a layout study" || i === "Sources" || i === "Photo credits" ? <a href="#about-this-study">{i}</a> : <span>{i}</span>}</li>)}</ul></div>
          ))}
          <div><h2>Browse</h2><ul>{[["Home", PAGES.home], ["Products", PAGES.products], ["Rooms", PAGES.room], ["Collections", PAGES.collection], ["Design history", PAGES.history]].map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul></div>
        </div>
        <p className="wrap foot__legal">© GIFea 2026. A layout study: every piece shown is a real design by the people named, and none is sold here.</p>
      </footer>
      <StudyDisclosure>
        <p>This page follows {source.map((s, i) => <span key={s.url}>{i > 0 && (i === source.length - 1 ? " and " : ", ")}<a href={s.url}>{s.label}</a></span>)}, as shown on October 15, 2026.</p>
        <Credits />
      </StudyDisclosure>
    </>
  );
}
