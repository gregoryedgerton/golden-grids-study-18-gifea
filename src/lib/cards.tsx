import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ExpandedCell, type ExpandGroup } from "./expand";
import { Fact as FactBox } from "./boxes";
import { Fit } from "./fit";
import { Icon, Imprint, type IconName } from "../icons";
import { photo, seen } from "../photos";
import { compare, saved } from "./list";
import { cite } from "../sources";
import { collection, collectionHref, dateOf, piece, productHref, type Piece, type Spot } from "../content";

/**
 * What goes in a square. The reference's product card is a photograph on a
 * pale ground, a name in capitals, a one-line descriptor, a price set large
 * with its cents raised, a blue round button that adds it to the bag, and
 * green dots for availability. Here the price is the year of the design,
 * the blue button saves the piece to the reader's list, and the dots say who
 * made it first and who makes it today. The card takes whatever square the
 * grid gives it, its type scaled to that square (`--u`, from the square's
 * side); what a square cannot hold it leaves out whole, in steps. The
 * photograph is the control that opens the square to the rest.
 */

export function Pic({ k, sizes = "(min-width: 1100px) 50vw, 100vw", eager, pos }: { k: string; sizes?: string; eager?: boolean; pos?: string }) {
  const p = photo(k);
  seen.add(k);
  return <img src={p.src} srcSet={p.srcSet} sizes={sizes} alt={p.alt} loading={eager ? "eager" : "lazy"} decoding="async" style={pos ? { objectPosition: pos } : undefined} />;
}

export function Credit({ k }: { k: string }) {
  const p = photo(k);
  return <figcaption className="credit">Photograph: <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}.</figcaption>;
}

/** The year where the reference sets a price: large and bold, with a small "c." when it is approximate. */
export function Year({ p, big }: { p: Piece; big?: boolean }) {
  const d = dateOf(p);
  const m = d.match(/^(c\. )?(\d{4})(.*)$/);
  return (
    <span className={`year${big ? " year--big" : ""}`}>
      <span className="visually-hidden">Designed </span>
      {m?.[1] && <span className="year__c">c.</span>}
      <span className="year__n">{m ? m[2] : d}</span>
      {m?.[3] && <span className="year__rest">{m[3]}</span>}
    </span>
  );
}

/** The blue round button: saves the piece to the reader's list, and says so. */
export function SaveButton({ p, wide }: { p: Piece; wide?: boolean }) {
  const ids = saved.use();
  const on = ids.includes(p.id);
  if (wide) {
    return (
      <button type="button" className={`btn btn--blue btn--wide${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => saved.toggle(p.id)}>
        <Icon name="heart" size={20} filled={on} />{on ? "Saved to your list" : "Save to your list"}
      </button>
    );
  }
  return (
    <button type="button" className={`roundbtn${on ? " is-on" : ""}`} aria-pressed={on} aria-label={`Save to your list: ${p.name}`} onClick={() => saved.toggle(p.id)}>
      <Icon name="heart" size={18} filled={on} />
    </button>
  );
}

export function CompareBox({ p }: { p: Piece }) {
  const ids = compare.use();
  const on = ids.includes(p.id);
  const full = !on && ids.length >= 4;
  return (
    <label className={`comparebox${full ? " is-full" : ""}`}>
      <input type="checkbox" checked={on} disabled={full} onChange={() => compare.toggle(p.id)} />
      <span>Compare<span className="visually-hidden"> {p.name}</span></span>
    </label>
  );
}

/** Who made it: a filled dot for a maker that still makes it, a ring for the first maker. */
export function Dots({ p, short }: { p: Piece; short?: boolean }) {
  return (
    <ul className="dots">
      {p.today && <li><span className="dot dot--on" aria-hidden="true" />Made today by {p.today}</li>}
      {p.madeBy && !(short && p.today) && <li><span className="dot" aria-hidden="true" />First made by {p.madeBy}</li>}
      {!p.today && !p.madeBy && <li><span className="dot" aria-hidden="true" />Designed by {p.designer}</li>}
    </ul>
  );
}

export function ProductCard({ p, x, slotKey, withCompare, mark }: { p: Piece; x: ExpandGroup; slotKey: string; withCompare?: boolean; mark?: string }) {
  const c = collection(p.collection)!;
  return (
    <>
      <article className={`card card--product${mark ? " card--marked" : ""}`}>
        {withCompare && <p className="card__compare card__line--more"><CompareBox p={p} /></p>}
        <div className="card__media">
          <Pic k={p.photos[0]} pos={p.pos} sizes="(min-width: 1100px) 40vw, 90vw" />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {p.name}</span></button>
          {mark ? <span className="card__badge card__badge--mark">{mark}</span> : p.badge && <span className="card__badge">{p.badge}</span>}
          <span className="card__pill" aria-hidden="true">{p.name}</span>
        </div>
        <div className="card__text">
          <div className="card__row">
            <div className="card__id">
              <h3 className="card__name"><a href={productHref(p.id)}>{p.name}</a></h3>
              <p className="card__kind">{p.kind}</p>
            </div>
            <SaveButton p={p} />
          </div>
          <p className="card__year"><Year p={p} /></p>
          <p className="card__designer card__line--more">{p.designer}</p>
          <div className="card__dots card__line--most"><Dots p={p} short /></div>
          <p className="card__coll card__line--most">{c.name} collection</p>
        </div>
      </article>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={p.name} onClose={x.close} closeRef={x.closeRef}>
          <PieceDetail p={p} />
        </ExpandedCell>
      )}
    </>
  );
}

/** What an opened card shows: the photograph, the facts, the story and the way to the product page. */
export function PieceDetail({ p }: { p: Piece }) {
  const c = collection(p.collection)!;
  const s = cite(p.source);
  return (
    <div className="cell__split">
      <figure className="cell__photo"><Pic k={p.photos[0]} sizes="(min-width: 1100px) 60vw, 100vw" pos={p.pos} /><Credit k={p.photos[0]} /></figure>
      <div className="detail">
        <p className="detail__kicker"><a href={collectionHref(c.id)}>{c.name} collection</a> · {c.years}</p>
        <p className="detail__name">{p.name}</p>
        <p className="detail__kind">{p.kind}</p>
        <p className="detail__year"><Year p={p} big /></p>
        <p className="detail__by">Designed by {p.designer}</p>
        <p className="detail__lead">{p.story}</p>
        <Dots p={p} />
        <p className="detail__actions"><SaveButton p={p} wide /><a className="btn btn--outline" href={productHref(p.id)}>See the product page</a></p>
        <p className="note">Facts from <a href={s.url}>{s.short}</a>, in the study's own words. Nothing here is for sale.</p>
      </div>
    </div>
  );
}

/** A photograph with a line of type over its foot and an arrow: the reference's mosaic tile. It links to a page. */
export function PhotoTile({ k, title, href, badge, pos, eager }: { k: string; title: string; href: string; badge?: string; pos?: string; eager?: boolean }) {
  return (
    <a className="phototile" href={href}>
      <Pic k={k} pos={pos} eager={eager} sizes="(min-width: 1100px) 60vw, 100vw" />
      {badge && <span className="phototile__badge">{badge}</span>}
      <span className="phototile__foot"><span className="phototile__title">{title}</span><span className="arrowcircle arrowcircle--ghost" aria-hidden="true"><Icon name="arrow" size={18} /></span></span>
    </a>
  );
}

/** A photograph with its name in a white pill at the foot: the reference's "find it by" tile. */
export function PillTile({ k, label, href, count, pos }: { k: string; label: string; href: string; count?: number; pos?: string }) {
  return (
    <a className="pilltile" href={href}>
      <Pic k={k} pos={pos} sizes="(min-width: 1100px) 30vw, 50vw" />
      <span className="pilltile__pill">{label}{count != null && <span className="pilltile__n"> {count}</span>}</span>
    </a>
  );
}

/** The flat blue block with a headline and a round arrow: the reference's promotion. */
export function BluePromo({ title, body, href, label, tone = "blue", kicker }: { title: string; body?: string; href: string; label: string; tone?: "blue" | "yellow" | "ink" | "grey"; kicker?: string }) {
  return (
    <a className={`box promo promo--${tone}`} href={href} aria-label={label}>
      {kicker && <p className="box__label">{kicker}</p>}
      <div className="box__fit"><Fit as="p" className="fit--title" min={12} max={64}>{title}</Fit></div>
      {body && <div className="box__body"><Fit as="div" className="fit--body" min={12} max={22}><p>{body}</p></Fit></div>}
      <div className="box__foot"><span className="arrowcircle" aria-hidden="true"><Icon name="arrow" size={18} /></span></div>
    </a>
  );
}

/** A photograph on its own, opening to itself. */
export function PhotoCard({ k, title, x, slotKey, pos, children }: { k: string; title: string; x: ExpandGroup; slotKey: string; pos?: string; children?: ReactNode }) {
  return (
    <>
      <figure className="card card--photo">
        <div className="card__media">
          <Pic k={k} pos={pos} sizes="(min-width: 1100px) 60vw, 100vw" />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">Open the photograph: {title}</span></button>
          {children}
        </div>
      </figure>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={title} onClose={x.close} closeRef={x.closeRef}>
          <figure className="cell__photo cell__photo--full"><Pic k={k} sizes="100vw" /><Credit k={k} /></figure>
        </ExpandedCell>
      )}
    </>
  );
}

/**
 * A room photograph with dots on what is in it, as the reference marks its
 * shoppable rooms. A dot opens a small label naming the thing and, when it
 * is in the catalogue, linking to it. The photograph itself still opens.
 * Spots are recorded as shares of the whole photograph; the square crops it
 * (object-fit: cover), so each dot is placed on the cropped picture and a
 * dot whose thing is cropped away is not drawn.
 */
export function RoomPhoto({ k, title, spots, x, slotKey }: { k: string; title: string; spots: Spot[]; x: ExpandGroup; slotKey: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const ph = photo(k);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const place = (s: Spot) => {
    if (!box || !box.w) return null;
    const scale = Math.max(box.w / ph.w, box.h / ph.h);
    const left = (s.x / 100) * ph.w * scale - (ph.w * scale - box.w) / 2;
    const top = (s.y / 100) * ph.h * scale - (ph.h * scale - box.h) / 2;
    if (left < 18 || top < 18 || left > box.w - 18 || top > box.h - 18) return null;
    return { left, top, right: left > box.w * 0.55, low: top > box.h * 0.55 };
  };
  return (
    <PhotoCard k={k} title={title} x={x} slotKey={slotKey}>
      <span className="spots" ref={ref}>
        {spots.map((s, i) => {
          const at = place(s);
          if (!at) return null;
          const p = s.piece ? piece(s.piece) : undefined;
          return (
            <span key={i} className="spot" style={{ left: at.left, top: at.top }}>
              <button type="button" className="spot__dot" aria-expanded={open === i} aria-label={s.label} onClick={() => setOpen(open === i ? null : i)}><span aria-hidden="true" /></button>
              {open === i && (
                <span className={`spot__card${at.right ? " spot__card--left" : ""}${at.low ? " spot__card--up" : ""}`} role="group" aria-label={s.label}>
                  <strong>{s.label}</strong>
                  {p ? <><span>{p.kind}, {dateOf(p)}</span><a href={productHref(p.id)}>See {p.name}</a></> : <span>{s.note}</span>}
                </span>
              )}
            </span>
          );
        })}
      </span>
    </PhotoCard>
  );
}

export interface Fact { line: string; label?: string; body?: string; tone?: "tile" | "blue" | "yellow" | "ink"; icon?: IconName; short?: string; spoken?: string }

/** A figure as large type on a flat tile. */
export function FactTile({ f }: { f: Fact }) {
  return (
    <FactBox imprint={f.icon ? <Imprint name={f.icon} /> : undefined} label={f.label} fitClass="fit--display fit--num" max={150} tone={`${f.tone ?? "tile"}${(f.body?.length ?? 0) > 110 ? " box--wordy" : ""}`} body={f.body ? <p>{f.body}</p> : undefined} spoken={f.spoken}>
      {f.line}
    </FactBox>
  );
}

/** The collapsed strip of a skipped range: a figure and its label. */
export function FactStrip({ f }: { f: Fact }) {
  return (
    <div className={`box box--strip box--${f.tone ?? "tile"}`} role="group" aria-label={`${f.spoken ?? f.line}: ${f.label}`}>
      {f.label && <p className="box__label">{f.short ?? f.label}</p>}
      <div className="box__fit"><Fit as="span" className="fit--display fit--num" min={8} max={150}>{f.line}</Fit></div>
    </div>
  );
}

/** A grey square of type with a round arrow: the reference's lead tile in a rail. */
export function TextTile({ title, body, href, label }: { title: string; body?: string; href?: string; label?: string }) {
  const inner = (
    <>
      <div className="box__fit box__fit--top"><Fit as="p" className="fit--title" min={12} max={48}>{title}</Fit></div>
      {body && <div className="box__body"><Fit as="div" className="fit--body" min={12} max={20}><p>{body}</p></Fit></div>}
      {href && <div className="box__foot"><span className="arrowcircle arrowcircle--line" aria-hidden="true"><Icon name="arrow" size={18} /></span></div>}
    </>
  );
  return href ? <a className="box box--tile textile" href={href} aria-label={label}>{inner}</a> : <div className="box box--tile textile">{inner}</div>;
}
