import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { BluePromo, FactStrip, FactTile, Pic, PhotoCard, PhotoTile, ProductCard, RoomPhoto, TextTile } from "../lib/cards";
import { Prose } from "../lib/modules";
import { cite } from "../sources";
import { PAGES, REFERENCE, ROOMS, collection, collectionHref, piece, room, roomHref, type Room, firstSentence } from "../content";
import "../styles.css";

/**
 * A room, after the reference's Living room: the breadcrumb and title, a row
 * of grey tiles to the neighbouring rooms, a mosaic of room photographs, a
 * blue promotion, and photographs with dots that name what is in them. Here
 * the rooms are historic, and the mosaic is the room taken apart: the
 * photograph in the largest square, and the pieces made for it or with it in
 * the squares that turn inward from it. Without `?r=` the page lists the
 * rooms.
 */
const R = room(new URLSearchParams(location.search).get("r") ?? "");

function RoomTiles({ current }: { current?: string }) {
  return (
    <nav className="wrap roomtiles" aria-label="Rooms">
      <ul>
        {ROOMS.map((r) => (
          <li key={r.id}><a className="roomtile" href={roomHref(r.id)} aria-current={r.id === current ? "page" : undefined}><span className="roomtile__pic"><Pic k={r.photos[0]} sizes="160px" /></span><span>{r.name}</span></a></li>
        ))}
      </ul>
    </nav>
  );
}

function Overview() {
  return (
    <Page current={PAGES.room} source={[REFERENCE.room]} crumbs={[{ label: "Rooms" }]} chips={false}>
      <div className="wrap titlerow"><h1 className="pagetitle">Rooms</h1><p className="lede">Three buildings of the modern movement, each furnished with pieces made for it or in the same years.</p></div>
      <RoomTiles />
      <GridBand id="rooms" title="Historic rooms" quiet lead variant={1}
        cells={[...ROOMS.map((r): Cell => () => <PhotoTile k={r.photos[0]} title={`${r.name}, ${r.place}, ${r.years}`} href={roomHref(r.id)} />),
          () => <PhotoTile k="museum" title="Chairs at Designmuseum Denmark" href={PAGES.products} />]} />
      <Prose title="Furniture and its rooms" paras={[
        "Much of the furniture in this archive was designed for a particular building: the Barcelona chair for a pavilion, the Zig-Zag for a house in Utrecht, the Paimio chair for a sanatorium, the Egg for a hotel. Seen in its room, a piece shows the proportions and the light it was drawn for.",
        "Each room page shows the room, the pieces associated with it and the dates of both.",
      ]} />
    </Page>
  );
}

function One({ R }: { R: Room }) {
  const s = cite(R.source);
  const pieces = R.pieces.map((id) => piece(id)!);
  const k = collection(pieces[0].collection)!;
  const fact = (f: { line: string; label: string }, tone: "tile" | "yellow" | "blue" = "tile"): Cell => (_x, _k, flat) => (flat ? <FactStrip f={{ ...f, tone }} /> : <FactTile f={{ ...f, tone }} />);
  const look: Cell[] = [
    (x, key) => <RoomPhoto k={R.photos[0]} title={`${R.name}, ${R.place}`} spots={R.spots} x={x} slotKey={key} />,
    ...pieces.map((p): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} />),
  ];
  return (
    <Page current={PAGES.room} source={[REFERENCE.room]} crumbs={[{ label: "Rooms", href: PAGES.room }, { label: R.name }]} chips={false}>
      <div className="wrap titlerow"><h1 className="pagetitle">{R.name}</h1><p className="lede">{R.place}, {R.years}. {R.by}.</p></div>
      <RoomTiles current={R.id} />
      <GridBand id="look" title={`${R.name} and its pieces`} sub={R.spots.length ? "The dots name what is in the photograph. Beside it, the pieces made for the room or in its years." : "The pieces made for the room or in its years."} lead variant={1} cells={look} />
      <GridBand id="facts" title="The building" sub={R.intro} variant={2} from={R.facts.length >= 3 ? 1 : 2}
        cells={[
          ...(R.photos[1] ? [(x, key) => <PhotoCard k={R.photos[1]} title={`${R.name}, a second view`} x={x} slotKey={key} />] as Cell[] : [() => <TextTile title={R.by} body={R.more} />] as Cell[]),
          ...R.facts.map((f, i) => fact(f, i === 0 ? "yellow" : "tile")),
        ]}
        strip={R.facts.length >= 3 ? undefined : fact({ line: String(pieces.length), label: pieces.length === 1 ? "Piece in the archive" : "Pieces in the archive" }, "blue")} />
      <GridBand id="promo" title={`The ${k.name} collection`} quiet variant={3}
        cells={[
          () => <PhotoTile k={k.photo} pos={k.pos} title={`${k.name}, ${k.years}`} href={collectionHref(k.id)} />,
          () => <BluePromo title={firstSentence(k.intro)} kicker={`${k.name} · ${k.years}`} href={collectionHref(k.id)} label={`The ${k.name} collection`} />,
        ]} />
      <Prose title={`About the ${R.name}`} paras={[R.intro, R.more, <>Source: <a href={s.url}>{s.full}</a>.</>]} />
    </Page>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode>{R ? <One R={R} /> : <Overview />}</StrictMode>);
