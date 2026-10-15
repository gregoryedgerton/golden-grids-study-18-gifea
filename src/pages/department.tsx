import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Chips, Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { BluePromo, FactStrip, FactTile, PillTile, ProductCard, RoomPhoto, TextTile } from "../lib/cards";
import { Prose, Services } from "../lib/modules";
import { COLLECTIONS, MATERIALS, PAGES, REFERENCE, ROOMS, categoriesOf, categoryHref, collectionHref, dept, piece, piecesIn, piecesOfDept, roomHref, type DeptId, type MaterialId, firstSentence } from "../content";
import "../styles.css";

/**
 * A department, after the reference's Sofas & armchairs: chips for its
 * categories, two promotion blocks, a row of photographs to find a piece by
 * material, a mosaic with a room whose dots name what is in it, the
 * categories as tiles, and the earliest pieces as cards. One page serves the
 * three departments, chosen by `?d=`.
 */
const D = dept(new URLSearchParams(location.search).get("d") ?? "") ?? dept("seating")!;
const ROOM_FOR: Record<DeptId, string> = { seating: "tugendhat", tables: "schroder", lighting: "paimio" };

function App() {
  const cats = categoriesOf(D.id);
  const all = piecesOfDept(D.id);
  // Five materials at most, those with the most pieces first; the rest are in the category page's filters.
  const mats = (Object.keys(MATERIALS) as MaterialId[]).filter((m) => all.some((p) => p.material === m)).sort((a, b) => all.filter((p) => p.material === b).length - all.filter((p) => p.material === a).length).slice(0, 5);
  const cols = COLLECTIONS.filter((c) => all.some((p) => p.collection === c.id));
  const promos = [...cols].sort((a, b) => all.filter((p) => p.collection === b.id).length - all.filter((p) => p.collection === a.id).length).slice(0, 2);
  const r = ROOMS.find((x) => x.id === ROOM_FOR[D.id])!;
  const firsts = all.slice(0, 5);
  // Two of this department's pieces for the room: those made for it, else those nearest it in date.
  const built = Number(r.years.slice(0, 4));
  const own = r.pieces.map((id) => piece(id)!).filter((p) => all.includes(p));
  const near = [...own, ...[...all].filter((p) => !own.includes(p)).sort((a, b) => Math.abs(a.year - built) - Math.abs(b.year - built))].slice(0, 2);
  const span = `${all[0].year} to ${all[all.length - 1].year}`;
  return (
    <Page current={PAGES.products} source={[REFERENCE.department]} crumbs={[{ label: "Products", href: PAGES.products }, { label: D.name }]}
      chips={<Chips up={{ href: PAGES.products, label: "Up to Products" }} items={cats.map((c) => ({ label: c.name, href: categoryHref(c.id), photo: piecesIn(c.id)[0].photos[0] }))} />}>
      <div className="wrap titlerow"><h1 className="pagetitle">{D.name}</h1><p className="lede">{D.blurb}</p></div>

      <GridBand id="promos" title={`Collections with ${D.name.toLowerCase()}`} aside={{ href: PAGES.collection, label: "All collections" }} variant={1}
        cells={promos.map((c, i): Cell => () => <BluePromo tone={i === 0 ? "blue" : "ink"} kicker={`${c.name} · ${c.years}`} title={firstSentence(c.intro)} href={collectionHref(c.id)} label={`The ${c.name} collection`} />)} />

      {mats.length > 1 && (
        <GridBand id="materials" title={`Find ${D.id === "seating" ? "a seat" : D.id === "lighting" ? "a lamp" : "a piece"} by material`} variant={2}
          cells={mats.map((m): Cell => () => { const ps = all.filter((p) => p.material === m); return <PillTile k={ps[0].photos[0]} pos={ps[0].pos} label={MATERIALS[m].name} count={ps.length} href={`${PAGES.category}?d=${D.id}&m=${m}`} />; })} />
      )}

      <GridBand id="room" title="A room of its time" sub={`${r.name}, ${r.place}, ${r.years}. ${r.intro.split(". ")[0]}.`} variant={3} lead
        cells={[
          (x, key) => <RoomPhoto k={r.photos[0]} title={`${r.name}, ${r.place}`} spots={r.spots} x={x} slotKey={key} />,
          () => <TextTile title={`See the ${r.name}`} body={firstSentence(r.more)} href={roomHref(r.id)} label={`The ${r.name}`} />,
          ...near.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />),
        ]} />

      <GridBand id="categories" title={`${D.name} by category`} variant={4} from={cats.length < 4 ? 2 : 1}
        cells={cats.map((c): Cell => () => <PillTile k={c.photo} label={c.name} count={piecesIn(c.id).length} href={categoryHref(c.id)} />)}
        strip={cats.length < 4 ? (_x, _k, flat) => { const f = { line: String(all.length), label: `Pieces in ${D.name}`, short: "Pieces", tone: "yellow" as const }; return flat ? <FactStrip f={f} /> : <FactTile f={f} />; } : undefined} />

      <GridBand id="earliest" title={`The earliest ${D.name.toLowerCase()}`} sub={`${all.length} pieces, ${span}`} aside={{ href: `${PAGES.category}?d=${D.id}`, label: `All ${D.name.toLowerCase()}` }} variant={5}
        cells={firsts.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />)} />

      <Services title="More ways to browse" items={[
        { icon: "layers", title: "Collections", body: "Eight periods, each with the pieces that defined it.", href: PAGES.collection },
        { icon: "box", title: "Rooms", body: "Historic rooms and the furniture made with them.", href: PAGES.room },
        { icon: "clock", title: "Design history", body: "Lines of descent and every piece in order of its date.", href: PAGES.history },
        { icon: "compare", title: "Compare", body: "Up to four pieces side by side, on any category page.", href: `${PAGES.category}?d=${D.id}` },
      ]} />
      <Prose title={`About ${D.name.toLowerCase()} in the archive`} paras={cats.map((c) => <><strong>{c.name}.</strong> {c.intro} {c.more}</>)} />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
