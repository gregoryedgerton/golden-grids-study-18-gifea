import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { Dots, FactStrip, FactTile, PhotoCard, ProductCard, RoomPhoto, SaveButton, TextTile, Year } from "../lib/cards";
import { Tabs } from "../lib/modules";
import { Icon } from "../icons";
import { cite } from "../sources";
import { MATERIALS, PAGES, PIECES, REFERENCE, byYear, category, categoryHref, collection, collectionHref, dateOf, dept, departmentHref, lineageOf, piece, piecesIn, piecesOfCollection, piecesOfDept, room, roomHref, type Piece } from "../content";
import "../styles.css";

/**
 * A product page, after the reference's: a five-level breadcrumb, the
 * photographs beside a buy box (series link, name, descriptor, price, rating,
 * options, how to get it, the blue button, services and guarantees), tabs for
 * the overview, the details, the measurements and what is included, then
 * Get the look, more from the series and related products. Here the gallery
 * is a golden grid of the photographs with the date and the designer in the
 * smaller squares; the buy box carries the year and the makers; the tabs are
 * the overview, the design history, the materials and the makers; Get the
 * look is a historic room; and the lineage the piece belongs to is a band of
 * its own, its largest square the earliest design. Every piece has a page,
 * chosen by `?p=`.
 */
const P: Piece = piece(new URLSearchParams(location.search).get("p") ?? "") ?? piece("no14")!;
const C = category(P.category)!;
const D = dept(C.dept)!;
const K = collection(P.collection)!;
const R = P.room ? room(P.room) : undefined;
const L = lineageOf(P.id);
const S = cite(P.source);
if (R) cite(R.source);

function BuyBox() {
  return (
    <section className="buy" aria-labelledby="buy-title">
      <p className="buy__series"><a href={collectionHref(K.id)}>More from the {K.name} collection</a></p>
      <div className="buy__head">
        <div>
          <h1 id="buy-title" className="buy__name">{P.name}</h1>
          <p className="buy__kind">{P.kind}</p>
        </div>
        <SaveButton p={P} />
      </div>
      <p className="buy__year"><Year p={P} big /></p>
      <p className="buy__by">Designed by {P.designer}</p>
      {P.badge && <p className="buy__badge">{P.badge}</p>}
      <div className="buy__block">
        <h2 className="buy__h">Materials</h2>
        <ul className="buy__chips">{P.materials.map((m) => <li key={m}>{m}</li>)}</ul>
      </div>
      <div className="buy__block">
        <h2 className="buy__h">Who made it</h2>
        <Dots p={P} />
      </div>
      <SaveButton p={P} wide />
      <div className="infobox">
        <p><Icon name="book" size={20} /><span><strong>Where the facts come from</strong> The dates, makers and history on this page are from <a href={S.url}>{S.short}</a>{R ? <> and the article on the {R.name}</> : null}, in the study's own words.</span></p>
        <p><Icon name="tag" size={20} /><span><strong>Nothing here is for sale</strong> The year stands where a price would be. Saving a piece keeps it in a list in this browser only.</span></p>
      </div>
    </section>
  );
}

function App() {
  const photos = P.photos;
  const others = piecesOfCollection(K.id).filter((p) => p.id !== P.id);
  // The rest of the category; where that is fewer than two, the department's pieces nearest in date make it up.
  const nearest = (a: Piece, b: Piece) => Math.abs(a.year - P.year) - Math.abs(b.year - P.year);
  const fresh = (p: Piece) => p.id !== P.id && !others.includes(p);
  let related = piecesIn(C.id).filter(fresh);
  if (related.length < 2) related = [...related, ...piecesOfDept(D.id).filter((p) => fresh(p) && !related.includes(p)).sort(nearest)];
  related = related.slice(0, 5);
  const lineage = L ? L.pieces.map((id) => piece(id)!).sort(byYear) : [];
  const fact = (line: string, label: string, tone: "tile" | "blue" | "yellow" = "tile", spoken?: string): Cell => (_x, _k, flat) => (flat ? <FactStrip f={{ line, label, tone, spoken }} /> : <FactTile f={{ line, label, tone, spoken }} />);
  const gallery: Cell[] = [
    ...photos.map((k, i): Cell => (x, key) => <PhotoCard k={k} title={i === 0 ? P.name : `${P.name}, a second photograph`} pos={i === 0 ? P.pos : undefined} x={x} slotKey={key} />),
    fact(dateOf(P), "Designed", "yellow"),
    fact(String(P.materials.length), P.materials.length === 1 ? "Material" : "Materials"),
  ];
  return (
    <Page current={PAGES.products} source={[REFERENCE.product, REFERENCE.series]} crumbs={[{ label: "Products", href: PAGES.products }, { label: D.name, href: departmentHref(D.id) }, { label: C.name, href: categoryHref(C.id) }, { label: P.name }]} chips={false}>
      <div className="wrap pdp">
        <div className="pdp__gallery">
          <GridBand id="gallery" title={`Photographs of ${P.name}`} quiet lead variant={1} cells={gallery} />
        </div>
        <BuyBox />
      </div>

      <section className="flat flat--tabs" aria-label="About this piece">
        <div className="wrap">
          <Tabs tabs={[
            { id: "overview", label: "Overview", body: <div className="prose"><p className="pdp__id"><strong>{P.name}</strong> <span className="pdp__num">{dateOf(P)}</span> <a href={categoryHref(C.id)}>{C.name}</a></p><p className="pdp__lead">{P.story}</p></div> },
            { id: "history", label: "Design history", body: <div className="prose">{P.history.map((h, i) => <p key={i}>{h}</p>)}<p className="note">Source: <a href={S.url}>{S.full}</a>.</p></div> },
            { id: "materials", label: "Materials", body: <div className="prose"><ul className="bullets">{P.materials.map((m) => <li key={m}>{m}</li>)}</ul><p>Filed under {MATERIALS[P.material].name.toLowerCase()} in the catalogue's filters. <a href={`${PAGES.category}?m=${P.material}`}>See every piece in {MATERIALS[P.material].name.toLowerCase()}</a>.</p></div> },
            { id: "makers", label: "Makers", body: <table className="specs"><tbody>
              <tr><th scope="row">Designer</th><td>{P.designer}</td></tr>
              <tr><th scope="row">Designed</th><td>{dateOf(P)}</td></tr>
              <tr><th scope="row">First made by</th><td>{P.madeBy ?? "Not recorded here"}</td></tr>
              <tr><th scope="row">Made today by</th><td>{P.today ?? "Not recorded here"}</td></tr>
              <tr><th scope="row">Collection</th><td><a href={collectionHref(K.id)}>{K.name}, {K.years}</a></td></tr>
            </tbody></table> },
          ]} />
        </div>
      </section>

      {R && (
        <GridBand id="look" title="Get the look" sub={`${R.name}, ${R.place}, ${R.years}`} aside={{ href: roomHref(R.id), label: `See the ${R.name}` }} variant={2} lead
          cells={[
            (x, key) => <RoomPhoto k={R.photos[0]} title={`${R.name}, ${R.place}`} spots={R.spots} x={x} slotKey={key} />,
            () => <TextTile title={R.name} body={R.intro} href={roomHref(R.id)} label={`The ${R.name}`} />,
            ...R.pieces.filter((id) => id !== P.id).slice(0, 2).map((id): Cell => (x, key) => <ProductCard p={piece(id)!} x={x} slotKey={key} />),
          ]} />
      )}

      {L && (
        <GridBand id="lineage" title={`Lineage: ${L.name.toLowerCase()}`} sub={`${L.intro} This piece is marked.`} aside={{ href: `${PAGES.history}#${L.id}`, label: "Design history guide" }} variant={3}
          cells={lineage.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} mark={p.id === P.id ? "This piece" : undefined} />)} />
      )}

      {others.length > 0 && (
        <GridBand id="series" title={`More from the ${K.name} collection`} sub={K.years} aside={{ href: collectionHref(K.id), label: `${K.name} collection` }} variant={4}
          cells={others.slice(0, 5).map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />)} />
      )}
      {related.length > 0 && (
        <GridBand id="related" title="Related products" sub={related.every((p) => p.category === C.id) ? `More ${C.name.toLowerCase()}` : `More ${C.name.toLowerCase()} and ${D.name.toLowerCase()}`} variant={5}
          cells={related.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />)} />
      )}
      <nav className="wrap prevnext" aria-label="Previous and next piece, by date">
        {(() => { const all = [...PIECES].sort(byYear); const i = all.indexOf(P); const a = all[i - 1], b = all[i + 1]; return <>
          {a ? <a className="btn btn--outline" href={`${PAGES.product}?p=${a.id}`}>Earlier: {a.name}, {dateOf(a)}</a> : <span />}
          {b && <a className="btn btn--outline" href={`${PAGES.product}?p=${b.id}`}>Later: {b.name}, {dateOf(b)}</a>}
        </>; })()}
      </nav>
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
