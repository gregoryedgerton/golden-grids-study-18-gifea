import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { FactStrip, FactTile, Pic, PhotoTile, ProductCard } from "../lib/cards";
import { Prose } from "../lib/modules";
import { COLLECTIONS, LINEAGES, PAGES, PIECES, REFERENCE, byYear, collection, collectionHref, dateOf, piece, productHref } from "../content";
import "../styles.css";

/**
 * The design history guide, after the reference's style guide: a title and
 * a statement, a headline announcing the colour of the year with a row of
 * products in it, an archive of past guides and more styles to explore. Here
 * the statement is the material of each period, and each "line of descent"
 * is a golden grid read as time: the earliest piece in the largest square,
 * each later design a smaller square turning inward. The archive is the
 * whole catalogue in the order it was designed, as a list.
 */
const DECADES = [...new Set(PIECES.map((p) => Math.floor(p.year / 10) * 10))].sort((a, b) => a - b);

function App() {
  const all = [...PIECES].sort(byYear);
  return (
    <Page current={PAGES.history} source={[REFERENCE.history]} crumbs={[{ label: "Design history" }]} chips={false}>
      <div className="wrap titlerow"><h1 className="pagetitle">The GIFea design history guide</h1><p className="lede">Four lines of descent through the catalogue, then every piece in the order it was designed, from {all[0].year} to {all[all.length - 1].year}.</p></div>
      <GridBand id="statement" title="A century of furniture" quiet lead variant={0} from={2}
        cells={[
          () => <PhotoTile k="museum" title="A century of furniture in one wall" href="#every-piece" eager />,
          () => <FactTile f={{ line: "111", label: "Years from the first piece to the last", body: `${all[0].name}, ${all[0].year}, to ${all[all.length - 1].name}, ${all[all.length - 1].year}.`, tone: "blue" }} />,
          () => <FactTile f={{ line: String(DECADES.length), label: "Decades with a piece in the archive", tone: "yellow" }} />,
        ]}
        strip={(_x, _k, flat) => { const f = { line: String(PIECES.length), label: "Pieces", tone: "tile" as const }; return flat ? <FactStrip f={f} /> : <FactTile f={f} />; }} />
      {LINEAGES.map((l, i) => {
        const ps = l.pieces.map((id) => piece(id)!).sort(byYear);
        return (
          <div key={l.id} id={l.id} className="lineage-wrap">
            <GridBand id={`lineage-${l.id}`} title={l.name} sub={`${l.intro} ${ps[0].year} to ${ps[ps.length - 1].year}.`} variant={i + 1} lead={i % 2 === 0}
              cells={ps.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />)} />
          </div>
        );
      })}
      <GridBand id="explore" title="Explore the collections" aside={{ href: PAGES.collection, label: "All collections" }} variant={2}
        cells={COLLECTIONS.slice(0, 4).map((c): Cell => () => <PhotoTile k={c.photo} pos={c.pos} title={`${c.name}, ${c.years}`} href={collectionHref(c.id)} />)} />
      <GridBand id="explore-2" title="More collections to explore" quiet variant={3}
        cells={COLLECTIONS.slice(4).map((c): Cell => () => <PhotoTile k={c.photo} pos={c.pos} title={`${c.name}, ${c.years}`} href={collectionHref(c.id)} />)} />
      <section className="flat" id="every-piece" aria-labelledby="every-title">
        <div className="wrap">
          <h2 id="every-title" className="flat__title">Every piece, in the order it was designed</h2>
          {DECADES.map((d) => (
            <div key={d} className="decade">
              <h3 className="decade__title">{d}s</h3>
              <ol className="timeline">
                {all.filter((p) => Math.floor(p.year / 10) * 10 === d).map((p) => (
                  <li key={p.id}><a href={productHref(p.id)}><span className="timeline__pic"><Pic k={p.photos[0]} sizes="56px" pos={p.pos} /></span><span className="timeline__year">{dateOf(p)}</span><span className="timeline__name">{p.name}</span><span className="timeline__by">{p.designer} · {collection(p.collection)!.name}</span></a></li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
      <Prose title="About the dates" paras={[
        "The dates are of the design. Where a piece was made only later, as the Panton chair was, or reached its final form over several years, as the Red Blue chair did, the product page gives both.",
        "A line of descent follows one idea or one material from piece to piece. It is not a claim that each designer knew the work before; the history on each product page says where one did.",
      ]} />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
