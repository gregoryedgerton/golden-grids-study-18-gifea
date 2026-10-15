import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { BluePromo, FactStrip, FactTile, PhotoTile, ProductCard, type Fact } from "../lib/cards";
import { Prose, Services } from "../lib/modules";
import { COLLECTIONS, MATERIAL_TIMELINE, PAGES, PIECES, REFERENCE, ROOMS, collectionHref, piece, productHref, roomHref, type Piece } from "../content";
import "../styles.css";

const card = (id: string): Cell => (x, key) => <ProductCard p={piece(id) as Piece} x={x} slotKey={key} />;
const fact = (f: Fact): Cell => (_x, _k, flat) => (flat ? <FactStrip f={f} /> : <FactTile f={f} />);
const coll = (i: number): Cell => () => { const c = COLLECTIONS[i]; return <PhotoTile k={c.photo} pos={c.pos} title={`${c.name}, ${c.years}`} href={collectionHref(c.id)} />; };
const designers = new Set(PIECES.map((p) => p.designer)).size;

function App() {
  return (
    <Page current={PAGES.home} source={[REFERENCE.home]}>
      <h1 className="visually-hidden">GIFea: iconic furniture, 1859 to 1970</h1>
      <GridBand id="hero" title="Iconic furniture, 1859 to 1970" quiet lead variant={0}
        cells={[
          () => <PhotoTile k="museum" eager title="Iconic furniture, 1859 to 1970: forty-one pieces in eight collections" href={PAGES.products} />,
          () => <PhotoTile k="panton-2" eager title="Space age: plastic in one piece" href={collectionHref("spaceage")} badge="New in the archive" />,
          () => <PhotoTile k="room-tugendhat" eager title="Three rooms and the furniture made with them" href={PAGES.room} />,
          () => <PhotoTile k="no14" title="No. 14: the first chair made in the millions" href={productHref("no14")} />,
        ]} />
      <p className="wrap terms">Every piece is a real design, credited to the people who made it. Nothing here is for sale; where a price would be, the year is.</p>

      <GridBand id="lounging" title="Lounging, 1928 to 1969" sub="Five ways to lean back, in steel, plywood, leather and foam" variant={2} from={3}
        cells={[card("eames670"), card("lc4"), card("egg"), card("isokon"), card("up5")]}
        strip={fact({ line: "5", label: "Lounge chairs, 1928 to 1969", short: "Lounge chairs", tone: "yellow" })} />

      <GridBand id="machine" title="Machine age" quiet variant={1}
        cells={[
          (x, key) => <ProductCard p={piece("wassily") as Piece} x={x} slotKey={key} />,
          () => <BluePromo title="Steel tube, glass and leather came into the house in five years, 1924 to 1929" body="Breuer, Mies and Reich, Perriand, Gray and Wagenfeld: the Machine age collection." href={collectionHref("machine")} label="The Machine age collection" />,
        ]} />

      <GridBand id="millions" title="Made by the million" sub="Three pieces whose histories give a count: fifty million, five million, one million" variant={3} from={2}
        cells={[card("no14"), card("series7"), card("navy"), fact({ line: "50,000,000", spoken: "fifty million", label: "No. 14 chairs sold by Gebrüder Thonet, 1859 to 1930", tone: "yellow" })]}
        strip={fact({ line: "6 + 10 + 2", spoken: "six, ten and two", label: "Parts of a No. 14: pieces of wood, screws, nuts", short: "Wood, screws, nuts", tone: "tile" })} />

      <GridBand id="collections" title="Discover the collections" sub="Eight periods, from bentwood to the space age" aside={{ href: PAGES.collection, label: "All collections" }} variant={4} cells={[0, 1, 2, 3].map(coll)} />
      <GridBand id="collections-2" title="More collections" quiet variant={5} cells={[4, 5, 6, 7].map(coll)} />

      <GridBand id="rooms" title="Inspiration from historic rooms" sub="Three buildings of the modern movement and the furniture made for them or in their years" aside={{ href: PAGES.room, label: "All rooms" }} variant={0}
        cells={ROOMS.map((r): Cell => () => <PhotoTile k={r.photos[0]} title={`${r.name}, ${r.place}, ${r.years}`} href={roomHref(r.id)} />)} />

      <GridBand id="materials" title="Materials that changed furniture" sub="Five materials in the order they came into furniture" variant={2}
        cells={MATERIAL_TIMELINE.map((m, i): Cell => () => <FactTile f={{ line: m.line, label: m.label, body: m.body, tone: i === 0 ? "blue" : "tile" }} />)} />

      <Services title="Discover how GIFea works" items={[
        { icon: "heart", title: "Save to your list", body: "The heart on every piece keeps it in a list in this browser. Nothing is sent anywhere." },
        { icon: "compare", title: "Compare up to four", body: "Tick Compare on a category page to see designers, makers, dates and materials side by side.", href: `${PAGES.category}?c=chairs` },
        { icon: "search", title: "Search by name, designer or year", body: "Type a name, a designer, a year or a material in the search field at the top of any page." },
        { icon: "book", title: "Read the design history guide", body: "Four lines of descent through the catalogue, and every piece in the order it was designed.", href: PAGES.history },
      ]} />

      <Prose title="Furniture that shaped the everyday" paras={[
        `GIFea is an archive of ${PIECES.length} pieces of furniture and lighting by ${designers} designers and partnerships, from Michael Thonet's bentwood chair of 1859 to Joe Colombo's plastic trolley of 1970. Each is shown as the reference shows its products: a name, a line saying what it is, a figure set large, and who makes it.`,
        "The pieces are arranged by department and category, and by collection: eight periods in which a material or an idea changed what furniture could be. Historic rooms show some of them where they were first used.",
      ]} />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
