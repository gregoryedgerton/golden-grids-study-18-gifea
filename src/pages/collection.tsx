import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Chips, Page } from "../lib/Page";
import { GridBand, deal, type Cell } from "../bands/bands";
import { BluePromo, FactStrip, FactTile, PhotoCard, PhotoTile, ProductCard } from "../lib/cards";
import { Prose, ReadMore } from "../lib/modules";
import { COLLECTIONS, PAGES, PIECES, REFERENCE, category, collection, collectionHref, piecesOfCollection, type CategoryId, type Collection } from "../content";
import "../styles.css";

/**
 * A collection, after the reference's series and collection pages: a banner
 * of a photograph and a statement, a pair of pieces under a headline, Sort
 * and Filter, the results, and other ranges. Here a collection is a period,
 * and its banner is a golden grid: the photograph in the largest square, the
 * statement in the next, the span of years and the count in the smaller
 * ones. Without `?c=` the page lists the eight collections.
 */
const K = collection(new URLSearchParams(location.search).get("c") ?? "");

function Overview() {
  return (
    <Page current={PAGES.collection} source={[REFERENCE.collection, REFERENCE.series]} crumbs={[{ label: "Products", href: PAGES.products }, { label: "Collections" }]}
      chips={<Chips items={COLLECTIONS.map((c) => ({ label: c.name, href: collectionHref(c.id), photo: c.photo }))} />}>
      <div className="wrap titlerow"><h1 className="pagetitle">Collections</h1><p className="lede">Eight periods, from 1859 to 1970, in which a material or an idea changed what furniture could be. Each piece belongs to one.</p></div>
      {[0, 2, 4, 6].map((n, i) => (
        <GridBand key={n} id={`collections-${i + 1}`} title={`${COLLECTIONS[n].name} and ${COLLECTIONS[n + 1].name}`} quiet variant={i} lead={i % 2 === 1}
          cells={[COLLECTIONS[n], COLLECTIONS[n + 1]].flatMap((c, j): Cell[] => [
            () => <PhotoTile k={c.photo} pos={c.pos} title={`${c.name}, ${c.years}`} href={collectionHref(c.id)} />,
            () => <BluePromo tone={j === 0 ? "blue" : "ink"} kicker={`${piecesOfCollection(c.id).length} pieces · ${c.years}`} title={c.tagline} href={collectionHref(c.id)} label={`The ${c.name} collection`} />,
          ])} />
      ))}
    </Page>
  );
}

function One({ K }: { K: Collection }) {
  const all = piecesOfCollection(K.id);
  const [cat, setCat] = useState<CategoryId | null>(null);
  const list = useMemo(() => (cat ? all.filter((p) => p.category === cat) : all), [cat, all]);
  const cats = [...new Set(all.map((p) => p.category))];
  const groups = list.length === 1 ? [list] : deal(list);
  const i = COLLECTIONS.indexOf(K);
  const next = COLLECTIONS[(i + 1) % COLLECTIONS.length], prev = COLLECTIONS[(i + COLLECTIONS.length - 1) % COLLECTIONS.length];
  const designers = new Set(all.map((p) => p.designer)).size;
  const fact = (line: string, label: string, tone: "tile" | "yellow" | "blue" = "tile"): Cell => (_x, _k, flat) => (flat ? <FactStrip f={{ line, label, tone }} /> : <FactTile f={{ line, label, tone }} />);
  return (
    <Page current={PAGES.collection} source={[REFERENCE.collection, REFERENCE.series]} crumbs={[{ label: "Products", href: PAGES.products }, { label: "Collections", href: PAGES.collection }, { label: K.name }]}
      chips={<Chips up={{ href: PAGES.collection, label: "Up to Collections" }} items={COLLECTIONS.map((c) => ({ label: c.name, href: collectionHref(c.id), photo: c.photo, current: c.id === K.id }))} />}>
      <div className="wrap titlerow"><h1 className="pagetitle">{K.name} collection</h1><ReadMore intro={K.intro} more={K.more} /></div>
      <GridBand id="banner" title={`${K.name}, ${K.years}`} quiet lead variant={i} from={2}
        cells={[
          (x, key) => <PhotoCard k={K.photo} pos={K.pos} title={`${K.name} collection`} x={x} slotKey={key} />,
          () => <BluePromo tone={K.tone} kicker={K.years} title={K.more.split("; ")[0].split(". ")[0].replace(/[.,]$/, "") + "."} href="#in-this-collection" label={`See the ${all.length} pieces`} />,
          fact(String(all.length), all.length === 1 ? "Piece" : "Pieces", "yellow"),
        ]}
        strip={fact(String(designers), designers === 1 ? "Designer" : "Designers and partnerships")} />
      <section className="flat flat--bar" id="in-this-collection" aria-labelledby="in-title">
        <div className="wrap">
          <h2 id="in-title" className="flat__title">In this collection</h2>
          <div className="fchips" role="group" aria-label="Category">
            <button type="button" className="fchip" aria-pressed={cat === null} onClick={() => setCat(null)}>All <span className="fchip__n">({all.length})</span></button>
            {cats.map((c) => <button key={c} type="button" className="fchip" aria-pressed={cat === c} onClick={() => setCat(c)}>{category(c)!.name} <span className="fchip__n">({all.filter((p) => p.category === c).length})</span></button>)}
          </div>
          <p className="filterbar__count" role="status" aria-live="polite">{list.length} {list.length === 1 ? "item" : "items"}</p>
        </div>
      </section>
      {groups.map((g, n) => <GridBand key={`${cat}-${n}`} id={`pieces-${n + 1}`} title={`${K.name}, part ${n + 1} of ${groups.length}`} quiet variant={n + 2} lead={n % 2 === 1} cells={g.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />)} />)}
      <GridBand id="others" title="Other collections" variant={i + 3}
        cells={[prev, next].map((c): Cell => () => <PhotoTile k={c.photo} pos={c.pos} title={`${c.name}, ${c.years}`} href={collectionHref(c.id)} />)} />
      <Prose title={`About the ${K.name} collection`} paras={[
        `The collection holds ${all.length} of the archive's ${PIECES.length} pieces, designed between ${all[0].year} and ${all[all.length - 1].year}.`,
        `Its designers: ${[...new Set(all.map((p) => p.designer))].join("; ")}.`,
      ]} />
    </Page>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode>{K ? <One K={K} /> : <Overview />}</StrictMode>);
