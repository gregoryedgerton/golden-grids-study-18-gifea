/**
 * Every word and number in the study. The pieces are real designs, named as
 * their designers and makers named them, with the facts written in the
 * study's own words from the sources in `sources.ts`. Nothing is for sale:
 * where the reference sets a price, the study sets the year of the design.
 *
 * The hierarchy is the reference's: department, category, piece. Collections
 * cut across it the way the reference's series and collections do, here by
 * period; rooms are historic rooms and the pieces made for them or with them.
 */
import type { SourceKey } from "./sources";

export const BASE = import.meta.env.BASE_URL;
export const PAGES = {
  home: `${BASE}`,
  products: `${BASE}products.html`,
  department: `${BASE}department.html`,
  category: `${BASE}category.html`,
  product: `${BASE}product.html`,
  collection: `${BASE}collection.html`,
  room: `${BASE}room.html`,
  history: `${BASE}history.html`,
};
export const productHref = (id: string) => `${PAGES.product}?p=${id}`;
export const categoryHref = (id: string) => `${PAGES.category}?c=${id}`;
export const departmentHref = (id: string) => `${PAGES.department}?d=${id}`;
export const collectionHref = (id: string) => `${PAGES.collection}?c=${id}`;
export const roomHref = (id: string) => `${PAGES.room}?r=${id}`;

export type DeptId = "seating" | "tables" | "lighting";
export type CategoryId = "chairs" | "armchairs" | "chaises" | "stools" | "tables" | "storage" | "desk" | "floor";
export type CollectionId = "bentwood" | "destijl" | "machine" | "factory" | "plywood" | "organic" | "nordic" | "spaceage";
export type MaterialId = "bentwood" | "wood" | "steel" | "aluminium" | "plywood" | "plastic" | "upholstered" | "paper" | "glass";
export type RoomId = "tugendhat" | "schroder" | "paimio";

export interface Piece {
  id: string;
  /** The design's own name, as its designer or maker gave it. */
  name: string;
  /** What it is, after the reference's descriptor: kind, then materials. */
  kind: string;
  year: number;
  /** The date as written, when it is a span or approximate. */
  when?: string;
  designer: string;
  /** The first maker, where it is known. */
  madeBy?: string;
  /** Who makes it today, as the study understood it in October 2026. */
  today?: string;
  materials: string[];
  material: MaterialId;
  collection: CollectionId;
  category: CategoryId;
  photos: string[];
  /** object-position for the first photograph in a square. */
  pos?: string;
  badge?: string;
  /** Two sentences: the card's opened square and the product page's overview. */
  story: string;
  history: string[];
  source: SourceKey;
  room?: RoomId;
}

export const PIECES: Piece[] = [
  {
    id: "no14", name: "No. 14", kind: "Chair, steam-bent beech/cane", year: 1859, designer: "Michael Thonet", madeBy: "Gebrüder Thonet, Vienna", today: "Thonet and TON",
    materials: ["Steam-bent beech", "Cane"], material: "bentwood", collection: "bentwood", category: "chairs", photos: ["no14", "no14-2"], badge: "50 million by 1930",
    story: "Six pieces of steam-bent beech, ten screws and two nuts. The chair could be made by unskilled hands and sent out in parts, and it was the first piece of furniture made in the millions.",
    history: [
      "Michael Thonet spent years learning to bend solid beech. Slats were heated to about 100 °C, pressed into curved moulds of cast iron and dried for some twenty hours, which fixed the curve without carving it from a larger block.",
      "No. 14 was introduced in 1859. Because it came apart into its few pieces it could be packed close, sent across the world and put together where it was sold; Gebrüder Thonet sold some fifty million between 1859 and 1930.",
      "It is the chair of the Viennese café and the Parisian bistro, and the firms descended from Thonet's still make it.",
    ],
    source: "no14",
  },
  {
    id: "rocker", name: "Thonet rocker", kind: "Rocking chair, bentwood/cane", year: 1860, designer: "Michael Thonet", madeBy: "Gebrüder Thonet, Vienna",
    materials: ["Steam-bent beech", "Cane"], material: "bentwood", collection: "bentwood", category: "chaises", photos: ["rocker"], pos: "50% 60%",
    story: "Thonet's first rocking chair, of 1860, turned bent beech into a drawing of loops and scrolls. The firm made rockers in the same manner for decades; the one shown is a later example made under the name Thonet-Mundus.",
    history: [
      "A rocking chair asks more of bentwood than a side chair does: long runners, arms and a back, each a continuous curve. Thonet's Model 1 of 1860 showed how far the process could be taken.",
      "J. & J. Kohn, Thonet's rival in Vienna, merged with Mundus in 1914, and Mundus merged with Thonet in 1921. Rockers in Thonet's manner were then made as Thonet-Mundus; the chair in the photograph, in the Moravian Gallery in Brno, is one of them.",
    ],
    source: "thonet",
  },
  {
    id: "sitzmaschine", name: "Sitzmaschine", kind: "Armchair, adjustable, bent beech", year: 1905, when: "c. 1905", designer: "Josef Hoffmann", madeBy: "J. & J. Kohn, Vienna",
    materials: ["Bent beech", "Stained finish"], material: "bentwood", collection: "bentwood", category: "armchairs", photos: ["sitzmaschine"], pos: "50% 40%",
    story: "A machine for sitting: a reclining armchair whose back is set by a bar resting between knobs behind the arms. Hoffmann drew it in squares and arcs, the geometry of the Wiener Werkstätte.",
    history: [
      "Josef Hoffmann, a founder of the Vienna Secession and of the Wiener Werkstätte, designed the Sitzmaschine around 1905 for J. & J. Kohn, the bentwood firm that was Thonet's leading competitor in Vienna.",
      "It takes the industrial bentwood of the café chair into an adjustable armchair. The back reclines in steps, and its tall panel is pierced with a grid of squares.",
    ],
    source: "kohn",
  },
  {
    id: "redblue", name: "Red Blue", kind: "Armchair, painted beech/plywood", year: 1917, designer: "Gerrit Rietveld", madeBy: "Gerard van de Groenekan, Utrecht", today: "Cassina",
    materials: ["Beech", "Plywood", "Paint"], material: "wood", collection: "destijl", category: "armchairs", photos: ["redblue", "redblue-2"], room: "schroder",
    story: "A chair built as a drawing in three dimensions: square rails crossing at every joint, one board for the seat and another for the back. Rietveld painted it in the primary colours of De Stijl only in the early 1920s.",
    history: [
      "Gerrit Rietveld trained as a cabinetmaker and designed the chair in 1917, in plain wood. Its rails pass one another at the joints instead of meeting, so each part stays visible as itself.",
      "In the early 1920s, after Rietveld had joined the De Stijl group, the chair was painted: black rails with yellow ends, a red back and a blue seat. It is one of the movement's first works in three dimensions.",
      "Gerard van de Groenekan made Rietveld's furniture for decades. Cassina makes the chair today under licence.",
    ],
    source: "redblue",
  },
  {
    id: "zigzag", name: "Zig-Zag", kind: "Chair, elm boards", year: 1934, when: "1932–34", designer: "Gerrit Rietveld", today: "Cassina",
    materials: ["Elm boards", "Dovetailed and bolted joints"], material: "wood", collection: "destijl", category: "chairs", photos: ["zigzag"], room: "schroder",
    story: "Four flat boards joined in a Z with dovetails and bolts: a chair with no legs at all. Rietveld designed it in the early 1930s for the Schröder house in Utrecht.",
    history: [
      "The Zig-Zag reduces a chair to a back, a seat, a diagonal and a base, four slabs of elm in a single line. The joints, dovetailed and then bolted or screwed, carry the whole load.",
      "Rietveld designed it some time between 1932 and 1934 for the house he had built for Truus Schröder. Cassina makes it today under licence, in cherry or ash.",
    ],
    source: "zigzag",
  },
  {
    id: "crate", name: "Crate", kind: "Armchair, deal boards", year: 1934, designer: "Gerrit Rietveld", madeBy: "Metz & Co., Amsterdam",
    materials: ["Packing-case boards", "Screws"], material: "wood", collection: "destijl", category: "armchairs", photos: ["crate"], badge: "Sold flat",
    story: "Furniture from the boards of packing cases, sold in 1934 by the Amsterdam store Metz & Co. as a kit to be screwed together at home: furniture for the weekend house, for little money.",
    history: [
      "In the early 1930s Rietveld turned to cheap materials. His crate furniture of 1934 is made of the rough boards used for packing cases, cut to length and screwed together.",
      "Metz & Co. sold it as a kit of parts, so the buyer assembled it at home. It belongs to the early history of furniture sold flat for self-assembly.",
    ],
    source: "rietveld",
  },
  {
    id: "wassily", name: "Wassily", kind: "Armchair, chromed steel tube/leather", year: 1925, when: "1925–26", designer: "Marcel Breuer", today: "Knoll",
    materials: ["Chromed steel tube", "Leather straps"], material: "steel", collection: "machine", category: "armchairs", photos: ["wassily"],
    story: "Bent steel tube for the frame and taut leather for the seat, back and arms. Breuer's armchair, made in the Bauhaus cabinet workshop, was the first to use bent, polished tube as both the structure of a chair and its ornament.",
    history: [
      "Marcel Breuer designed the chair in 1925–26, while he led the cabinet-making workshop at the Bauhaus in Dessau. The frame is steel tube, bent and chromed; the seat, back and arms are straps of leather or canvas stretched across it.",
      "It was not designed for Wassily Kandinsky, though Kandinsky admired it and Breuer made one for his rooms. The name came decades later, when the Italian maker Gavina reissued the chair and found the story. Knoll makes it today.",
    ],
    source: "wassily",
  },
  {
    id: "mr10", name: "MR10", kind: "Chair, cantilevered steel tube/cane", year: 1927, designer: "Ludwig Mies van der Rohe",
    materials: ["Steel tube", "Woven cane"], material: "steel", collection: "machine", category: "chairs", photos: ["mr10"],
    story: "A chair with no back legs: one curve of steel tube carries the seat from the front. Mies showed it at the Weissenhof Estate in Stuttgart in 1927, among the first cantilever chairs.",
    history: [
      "A cantilever chair stands on a continuous runner and a pair of bent front legs; the seat hangs from the top of the curve. Mart Stam had made one from straight pipe and fittings the year before.",
      "Mies's version, shown at the Werkbund's Weissenhof Estate in 1927, bent the front into an arc, so the steel gives a little under the sitter. It came with a seat of leather, fabric or woven cane, as here.",
    ],
    source: "mr10",
  },
  {
    id: "barcelona", name: "Barcelona", kind: "Chair, steel/leather", year: 1929, designer: "Ludwig Mies van der Rohe and Lilly Reich", today: "Knoll",
    materials: ["Steel bar", "Buttoned leather cushions", "Leather straps"], material: "steel", collection: "machine", category: "armchairs", photos: ["barcelona", "barcelona-2"], room: "tugendhat",
    story: "Designed for the German Pavilion at the International Exposition of 1929 in Barcelona: crossed steel legs under buttoned leather cushions, a seat for a state occasion.",
    history: [
      "Mies van der Rohe and Lilly Reich designed the chair for the German Pavilion at the Barcelona exposition of 1929, a building of marble, glass and steel.",
      "The frame is two pairs of steel bars crossed in an X; the leather cushions are buttoned and strapped to it. Knoll has made it since 1964, and gave it the name Barcelona chair in 1987.",
      "Lilly Reich's share in the design, long credited to Mies alone, was made clear by later historians.",
    ],
    source: "barcelona",
  },
  {
    id: "lc4", name: "LC4", kind: "Chaise longue, chromed steel tube/leather", year: 1928, designer: "Charlotte Perriand, with Le Corbusier and Pierre Jeanneret", madeBy: "Thonet", today: "Cassina",
    materials: ["Chromed steel tube", "Painted steel base", "Leather"], material: "steel", collection: "machine", category: "chaises", photos: ["lc4"], pos: "40% 50%",
    story: "A curved cradle of tube resting on a separate base, so the sitter can slide it from upright to reclining. Charlotte Perriand designed it in Le Corbusier's atelier in 1928.",
    history: [
      "The chaise longue à réglage continu, model B 306, was designed by Charlotte Perriand in the atelier of Le Corbusier and Pierre Jeanneret, who took part in the design. The curved frame is not fixed: it rests on an H-shaped base and can be set at any angle.",
      "Thonet made it as the B 306. It was renamed LC4 in 1964, and Cassina makes it today.",
    ],
    source: "lc4",
  },
  {
    id: "e1027", name: "E-1027", kind: "Side table, adjustable, chromed steel tube", year: 1927, designer: "Eileen Gray", today: "ClassiCon",
    materials: ["Chromed steel tube", "Lacquered top"], material: "steel", collection: "machine", category: "tables", photos: ["e1027"],
    story: "A side table whose height adjusts and whose foot is an open ring that slides under a bed. Eileen Gray made it for E-1027, her house by the sea at Roquebrune-Cap-Martin, so her sister could breakfast in bed.",
    history: [
      "Eileen Gray designed the villa E-1027 with Jean Badovici between 1926 and 1929, and furnished it herself. The table's top rides on a telescoping tube and its base is an open ring, so it slides beneath the bed or beside a chair.",
      "The house's name is a code of their initials: E for Eileen, 10 for J, 2 for B and 7 for G.",
    ],
    source: "e1027",
  },
  {
    id: "wagenfeld", name: "Wagenfeld", kind: "Table lamp, glass/nickel-plated metal", year: 1924, designer: "Wilhelm Wagenfeld, after Carl Jakob Jucker", madeBy: "Bauhaus metal workshop, Weimar", today: "Tecnolumen",
    materials: ["Opal glass shade", "Clear glass or metal shaft", "Nickel-plated metal"], material: "glass", collection: "machine", category: "desk", photos: ["wagenfeld"], pos: "50% 30%",
    story: "A dome of opal glass on a shaft that shows its cable: the Bauhaus table lamp, made in the school's metal workshop in 1924 to look like an object of industry.",
    history: [
      "Wilhelm Wagenfeld designed the lamp as a student in the Bauhaus metal workshop in Weimar in 1924, building on a lamp by Carl Jakob Jucker. The photograph shows Jucker's lamp of 1923–24, left, beside Wagenfeld's of 1924.",
      "It was meant for industrial production but was made by hand at the school. Tecnolumen makes it today.",
    ],
    source: "wagenfeld",
  },
  {
    id: "anglepoise", name: "Anglepoise 1227", kind: "Desk lamp, steel/springs", year: 1935, designer: "George Carwardine", madeBy: "Herbert Terry & Sons, Redditch", today: "Anglepoise",
    materials: ["Steel", "Springs", "Cast base"], material: "steel", collection: "factory", category: "desk", photos: ["anglepoise"],
    story: "An engineer's lamp: springs balance the arm so the shade stays wherever it is put. George Carwardine designed the principle in 1932; the 1227 of 1935 brought it into the home.",
    history: [
      "George Carwardine, an engineer who worked on vehicle suspension, designed a balanced-arm lamp in 1932. Springs at the base counter the weight of the arm and shade, so the lamp holds any position without a clamp.",
      "Herbert Terry & Sons, spring makers in Redditch, took up the design, and in 1935 made the 1227, with three springs, for use at home.",
    ],
    source: "anglepoise",
  },
  {
    id: "tolix", name: "Tolix A", kind: "Chair, galvanised sheet steel", year: 1934, designer: "Xavier Pauchard", madeBy: "Tolix, Autun", today: "Tolix",
    materials: ["Pressed sheet steel", "Galvanised and painted finish"], material: "steel", collection: "factory", category: "chairs", photos: ["tolix"],
    story: "Pressed and galvanised sheet steel, made to stack and to stand out of doors. Xavier Pauchard's A chair for his firm in Autun became the chair of French café terraces.",
    history: [
      "Xavier Pauchard was a metalworker in Autun, in Burgundy, who took up the galvanising of sheet steel to protect it from rust. His firm, Tolix, made the A chair, which most accounts date to 1934 and some to 1927.",
      "Seat and back are pressed from sheet, the seat pierced with holes to let rain drain away, and the legs taper so the chairs stack.",
    ],
    source: "tolix",
  },
  {
    id: "navy", name: "Navy 1006", kind: "Chair, aluminium", year: 1944, designer: "Emeco", madeBy: "Emeco, Hanover, Pennsylvania", today: "Emeco",
    materials: ["Welded aluminium", "Anodised finish"], material: "aluminium", collection: "factory", category: "chairs", photos: ["navy"], badge: "Over 1 million made",
    story: "Built in 1944 for the warships of the United States Navy: an aluminium chair light enough to lift and strong enough to last at sea. More than a million have been made.",
    history: [
      "Emeco, a firm in Hanover, Pennsylvania, made the 1006 for the Navy during the Second World War. It is formed and welded in aluminium, then heat-treated and anodised, so it neither rusts nor rots.",
      "After the war it stayed in ships, offices and institutions, and later went into restaurants and interiors. It has been made without a break since the 1940s.",
    ],
    source: "navy",
  },
  {
    id: "esu", name: "ESU", kind: "Storage unit, steel/plywood/lacquered hardboard", year: 1950, designer: "Charles and Ray Eames", madeBy: "Herman Miller", today: "Vitra",
    materials: ["Zinc-plated steel frame", "Steel cross-bracing", "Plywood", "Lacquered hardboard"], material: "steel", collection: "factory", category: "storage", photos: ["esu"],
    story: "A storage system from industrial parts: a steel frame with crossed bracing, plywood drawers and panels of coloured hardboard. The Eameses designed it in 1950 to be built from stock components.",
    history: [
      "The Eames Storage Units apply to furniture the method of the Eameses' own house of 1949, built from catalogue steel parts. Zinc-plated uprights and crossed bracing hold shelves, drawers, sliding doors and panels of lacquered hardboard, perforated metal or plywood pressed with a dimpled pattern.",
      "Herman Miller sold it in several sizes and arrangements. The unit shown, in the Victoria and Albert Museum, is an ESU 421-C.",
    ],
    source: "eames",
  },
  {
    id: "paimio", name: "Paimio", kind: "Armchair, bent birch/lacquered plywood", year: 1932, when: "1931–32", designer: "Alvar and Aino Aalto", madeBy: "Huonekalu-ja Rakennustyötehdas, Turku", today: "Artek",
    materials: ["Laminated birch", "Bent plywood", "Lacquer"], material: "plywood", collection: "plywood", category: "armchairs", photos: ["paimio"], room: "paimio",
    story: "Designed for the patients of the Paimio Sanatorium: a seat of bent plywood hung between two closed loops of laminated birch, its back set at an angle said to ease breathing.",
    history: [
      "Alvar and Aino Aalto designed the sanatorium at Paimio, completed in 1933, together with its furniture and lighting, as one environment for the treatment of tuberculosis.",
      "The armchair's frame is two loops of laminated birch; the seat is a single sheet of plywood rolled into a scroll at top and bottom, which gives a little as the sitter leans back.",
      "It was made in Turku by the firm that made the Aaltos' furniture before Artek was founded in 1935. Artek makes it today.",
    ],
    source: "paimiosan",
  },
  {
    id: "stool60", name: "Stool 60", kind: "Stool, stacking, bent birch", year: 1933, designer: "Alvar Aalto", today: "Artek",
    materials: ["Solid birch legs, bent", "Birch plywood seat"], material: "plywood", collection: "plywood", category: "stools", photos: ["stool60"],
    story: "Three legs of solid birch, bent at the top into an L and screwed under a round seat. The stools stack in a spiral, and the bent leg became the basis of Aalto's furniture.",
    history: [
      "Aalto found a way to bend solid birch without a joint: the top of the leg is sawn into thin layers, glued with veneer between them and bent through a right angle.",
      "Stool 60 of 1933 stands on three such legs. It has been made by Artek since the company was founded, and is one of Aalto's best-known designs.",
    ],
    source: "stool60",
  },
  {
    id: "isokon", name: "Isokon long chair", kind: "Chaise longue, bent laminated wood/plywood", year: 1935, when: "1935–36", designer: "Marcel Breuer", madeBy: "Isokon Furniture Company, London", today: "Isokon Plus",
    materials: ["Bent laminated wood", "Moulded plywood"], material: "plywood", collection: "plywood", category: "chaises", photos: ["isokon"],
    story: "Breuer's reclining chair, remade in wood for Isokon in London: one sheet of moulded plywood for the body, hung in a frame of laminated wood.",
    history: [
      "Breuer left Germany in 1935 and worked in London for Jack Pritchard's Isokon company, which made modern furniture in plywood supplied by Venesta.",
      "The long chair adapts a reclining chair Breuer had made in aluminium to the material Isokon worked with: a frame of laminated wood and a seat of moulded plywood.",
    ],
    source: "isokon",
  },
  {
    id: "lcw", name: "LCW", kind: "Lounge chair, moulded plywood", year: 1945, designer: "Charles and Ray Eames", madeBy: "Evans Products, then Herman Miller", today: "Herman Miller and Vitra",
    materials: ["Moulded plywood", "Rubber shock mounts"], material: "plywood", collection: "plywood", category: "armchairs", photos: ["lcw", "lcw-2"],
    story: "Seat and back moulded in plywood, each in its own curve, joined to a plywood frame through rubber mounts. The Eameses' low chair in wood came out of their wartime work moulding plywood.",
    history: [
      "Charles Eames and Eero Saarinen won the Museum of Modern Art's 1940 competition Organic Design in Home Furnishings with chairs of moulded plywood that could not yet be made. During the war, Charles and Ray Eames moulded plywood in their Los Angeles apartment and then for the US Navy.",
      "The LCW of 1945 is the result: separate moulded pieces, each curved in one direction or two, joined by rubber mounts so that the chair flexes.",
    ],
    source: "lcw",
  },
  {
    id: "butterfly", name: "Butterfly", kind: "Stool, moulded plywood/brass", year: 1954, designer: "Sori Yanagi", madeBy: "Tendo Mokko, Tendō", today: "Tendo Mokko and Vitra",
    materials: ["Moulded plywood", "Brass rod"], material: "plywood", collection: "plywood", category: "stools", photos: ["butterfly"],
    story: "Two identical shapes of moulded plywood, joined back to back by a brass rod beneath the seat. Sori Yanagi's stool of 1954 gives a Western technique a Japanese form.",
    history: [
      "Sori Yanagi, an industrial designer and the son of the founder of the Japanese folk-craft movement, moulded plywood into two mirror pieces, held together by a brass stretcher and screws under the seat.",
      "Tendo Mokko, a plywood specialist in Yamagata, has made it since 1956.",
    ],
    source: "yanagi",
  },
  {
    id: "eames670", name: "Eames lounge chair", kind: "Lounge chair and ottoman, moulded plywood/leather", year: 1956, designer: "Charles and Ray Eames", madeBy: "Herman Miller", today: "Herman Miller and Vitra",
    materials: ["Moulded plywood shells", "Leather cushions", "Cast aluminium base"], material: "plywood", collection: "plywood", category: "armchairs", photos: ["eames670"],
    story: "Three shells of moulded plywood carrying leather cushions on a swivel base, with its ottoman. It was the Eameses' first chair for the high end of the market, introduced in 1956.",
    history: [
      "After a decade of chairs for low cost and mass production, the Eameses designed the 670 lounge chair and 671 ottoman for comfort and long use. Rosewood-faced plywood shells, joined by aluminium, hold the leather cushions.",
      "Herman Miller introduced it in 1956. It is in the collection of the Museum of Modern Art in New York.",
    ],
    source: "eames670",
  },
  {
    id: "noguchi", name: "Noguchi", kind: "Coffee table, walnut/plate glass", year: 1944, designer: "Isamu Noguchi", madeBy: "Herman Miller", today: "Herman Miller and Vitra",
    materials: ["Solid wood base", "Plate glass top"], material: "wood", collection: "organic", category: "tables", photos: ["noguchi"],
    story: "Two identical pieces of curved wood, one turned against the other, carry a heavy top of plate glass. Herman Miller made Isamu Noguchi's table from 1947.",
    history: [
      "Isamu Noguchi, a sculptor, made the base a sculpture of two identical parts, set against each other so that they stand without fixings and carry the glass at three points.",
      "Herman Miller introduced it in 1947.",
    ],
    source: "noguchi",
  },
  {
    id: "womb", name: "Womb", kind: "Lounge chair, fibreglass shell/upholstery", year: 1948, when: "1947–48", designer: "Eero Saarinen", madeBy: "Knoll", today: "Knoll",
    materials: ["Fibreglass-reinforced shell", "Foam and fabric", "Steel rod base"], material: "upholstered", collection: "organic", category: "armchairs", photos: ["womb"],
    story: "A shell of fibreglass and resin, upholstered all over, that holds the sitter curled up in it. Florence Knoll asked Eero Saarinen for a chair to curl up in; he designed the Womb in 1947–48.",
    history: [
      "Saarinen, who had shared the Museum of Modern Art's prize of 1940 with Charles Eames, wanted a chair that allowed more than one way of sitting. The shell is moulded in fibreglass-reinforced plastic and covered in foam and fabric, on a frame of steel rod.",
      "Knoll has made it as Model 70 since the late 1940s.",
    ],
    source: "chairs",
  },
  {
    id: "rar", name: "RAR", kind: "Rocking armchair, fibreglass/steel rod/birch", year: 1950, designer: "Charles and Ray Eames", madeBy: "Zenith Plastics, for Herman Miller", today: "Herman Miller and Vitra",
    materials: ["Fibreglass-reinforced shell", "Steel wire base", "Birch rockers"], material: "plastic", collection: "organic", category: "chaises", photos: ["rar"],
    story: "A moulded fibreglass shell on a wire base and two runners of birch: the rocking version of the Eames armchair, on sale from 1950 and among the first chairs mass-produced in plastic.",
    history: [
      "The shell came out of the Museum of Modern Art's competition for low-cost furniture of 1948, to which the Eameses sent a chair shell in stamped metal. Made instead in fibreglass-reinforced plastic by Zenith Plastics, it went on sale with Herman Miller in 1950.",
      "The shell could sit on many bases; on wire struts and birch rockers it is the RAR.",
    ],
    source: "eames",
  },
  {
    id: "akari", name: "Akari", kind: "Lamp, washi paper/bamboo/steel wire", year: 1951, designer: "Isamu Noguchi", madeBy: "Ozeki & Co., Gifu", today: "Ozeki & Co. and Vitra",
    materials: ["Mulberry washi paper", "Bamboo ribs", "Steel wire"], material: "paper", collection: "organic", category: "floor", photos: ["akari-2", "akari"], badge: "Folds flat",
    story: "The paper lantern made new: washi stretched over ribs of bamboo, on thin legs of steel wire. Noguchi began the Akari, a word meaning light, in 1951 with lantern makers in Gifu.",
    history: [
      "Visiting Gifu in 1951, a city known for paper lanterns, Noguchi began to design lamps with its craftsmen. The paper is mulberry washi, stretched over bamboo ribs, and the lamps fold flat for shipping.",
      "There are more than two hundred Akari, in shapes from spheres to tall columns, for tables, floors and ceilings.",
    ],
    source: "akari",
  },
  {
    id: "tulip", name: "Tulip", kind: "Chair, fibreglass shell/cast aluminium base", year: 1956, when: "1955–56", designer: "Eero Saarinen", madeBy: "Knoll", today: "Knoll",
    materials: ["Moulded fibreglass shell", "Cast aluminium base", "Seat cushion"], material: "plastic", collection: "organic", category: "chairs", photos: ["tulip"],
    story: "One stem instead of four legs. Saarinen's pedestal chair sets a moulded shell on a single base, to clear away the crowd of legs under a dining table.",
    history: [
      "Saarinen designed the Pedestal Group, a chair and a dining table each on one foot, for Knoll in 1955–56. The shell is moulded fibreglass and the base cast aluminium, finished to match, so chair and stem read as one form.",
      "It was named the Tulip for its likeness to the flower. Its curves and materials have made it a sign of the space age.",
    ],
    source: "tulip",
  },
  {
    id: "wishbone", name: "Wishbone", kind: "Chair, solid beech/paper cord", year: 1949, designer: "Hans J. Wegner", madeBy: "Carl Hansen & Søn", today: "Carl Hansen & Søn",
    materials: ["Solid beech", "Steam-bent top rail", "Woven paper cord"], material: "wood", collection: "nordic", category: "chairs", photos: ["wishbone"],
    story: "A steam-bent top rail, a back split into a Y and a seat woven of paper cord. Wegner's chair of 1949, after the chairs of Ming China, has been made ever since.",
    history: [
      "Hans Wegner designed more than five hundred chairs. The Wishbone, also called the CH24 or Y chair, belongs to a series based on Chinese chairs of the Ming period, with one continuous bent rail for back and arms.",
      "Carl Hansen & Søn has made it since its release. It is Wegner's best-selling design, and more than a quarter of each year's production goes to Japan.",
    ],
    source: "wishbone",
  },
  {
    id: "string", name: "String", kind: "Shelf system, plastic-coated steel wire/wood", year: 1949, designer: "Nisse and Kajsa Strinning", today: "String Furniture",
    materials: ["Plastic-coated steel wire", "Wooden shelves"], material: "steel", collection: "nordic", category: "storage", photos: ["string"],
    story: "Two ladders of plastic-coated wire on the wall and shelves of wood between them. Nisse and Kajsa Strinning's shelf won a competition held by the publisher Bonnier in 1949.",
    history: [
      "As a student, Nisse Strinning designed a dish rack of plastic-coated wire. With his wife, the designer Kajsa Strinning, he took the same material to a bookshelf for a competition run by the publisher Bonnier in 1949, and won.",
      "The side panels hang on the wall and hold the shelves; more can be added, so the shelf grows with what it holds.",
    ],
    source: "strinning",
  },
  {
    id: "ant", name: "Ant", kind: "Chair, moulded plywood/steel tube", year: 1952, designer: "Arne Jacobsen", madeBy: "Fritz Hansen", today: "Fritz Hansen",
    materials: ["Moulded plywood shell", "Steel tube legs"], material: "plywood", collection: "nordic", category: "chairs", photos: ["ant"],
    story: "Seat and back moulded in one piece of plywood, pinched at the waist, on three thin steel legs. Jacobsen designed it in 1952 for the canteen of the Danish firm Novo.",
    history: [
      "The Ant was made for the canteen of Novo, the pharmaceutical company, and is light and stacks. Its shell is a single sheet of moulded plywood narrowed at the middle.",
      "Jacobsen gave it three legs. A version with four was added after his death.",
    ],
    source: "ant",
  },
  {
    id: "series7", name: "Series 7", kind: "Chair, moulded plywood/chromed steel tube", year: 1955, designer: "Arne Jacobsen", madeBy: "Fritz Hansen", today: "Fritz Hansen",
    materials: ["Moulded plywood shell", "Chromed steel tube legs"], material: "plywood", collection: "nordic", category: "chairs", photos: ["series7", "series7-2"], badge: "Over 5 million made",
    story: "The Ant's successor on four legs, its shell broader at the shoulders. More than five million of Jacobsen's Model 3107 of 1955 have been made, all by Fritz Hansen.",
    history: [
      "Model 3107, the first of the Series 7, varies the Ant: the moulded plywood shell is wider at the top and stands on four legs of steel tube. It has been made in many veneers and colours, with and without arms.",
      "Over five million have been produced, all by Fritz Hansen.",
    ],
    source: "series7",
  },
  {
    id: "lamino", name: "Lamino", kind: "Easy chair, laminated wood/sheepskin", year: 1956, designer: "Yngve Ekström", madeBy: "ESE-möbler (Swedese)", today: "Swedese",
    materials: ["Laminated wood frame", "Sheepskin"], material: "plywood", collection: "nordic", category: "armchairs", photos: ["lamino"],
    story: "A low, reclining frame of laminated wood with a sheepskin seat. In 1999 the magazine Sköna hem named Yngve Ekström's easy chair of 1956 the Swedish furniture design of the twentieth century.",
    history: [
      "Yngve Ekström founded the maker ESE-möbler, later Swedese, with his brother Jerker and Sven Bertil Sjöqvist, and worked there for more than forty years.",
      "The Lamino's arms and legs are formed of laminated wood, glued in thin layers and bent, which keeps the frame light. It has been made without a break since 1956.",
    ],
    source: "ekstrom",
  },
  {
    id: "ph5", name: "PH5", kind: "Pendant lamp, spun metal", year: 1958, designer: "Poul Henningsen", madeBy: "Louis Poulsen", today: "Louis Poulsen",
    materials: ["Spun metal shades", "Coloured inner reflectors"], material: "aluminium", collection: "nordic", category: "floor", photos: ["ph5", "ph5-2"],
    story: "Shades nested so the bulb cannot be seen from any side: the light leaves only after it has been reflected. Poul Henningsen's PH5 of 1958 continues the three-shade lamps he began in the 1920s.",
    history: [
      "Henningsen, an author and critic as well as a designer, made a study of glare. His first three-shade lamp was shown at the Paris exhibition of 1925 and won a gold medal; Louis Poulsen made his lamps for the rest of his life.",
      "The PH5 of 1958 takes the system to a larger pendant. Its small inner reflectors are coloured to warm the light.",
    ],
    source: "ph5",
  },
  {
    id: "egg", name: "Egg", kind: "Lounge chair, upholstered shell/aluminium base", year: 1958, designer: "Arne Jacobsen", madeBy: "Fritz Hansen", today: "Fritz Hansen",
    materials: ["Moulded shell", "Leather or fabric", "Aluminium swivel base"], material: "upholstered", collection: "nordic", category: "armchairs", photos: ["egg"],
    story: "A moulded shell, upholstered all over, that closes around the sitter's shoulders on a swivel base. Jacobsen designed it for the SAS Royal Hotel in Copenhagen, a building he designed down to its cutlery.",
    history: [
      "Jacobsen designed the SAS Royal Hotel, which opened in 1960, as a whole: the tower, its furniture, lighting, textiles and cutlery. The Egg, designed in 1958–59, was made for its lobby and lounges.",
      "Fritz Hansen has made it since.",
    ],
    source: "egg",
  },
  {
    id: "panton", name: "Panton", kind: "Chair, moulded plastic", year: 1960, when: "c. 1960, made from 1967", designer: "Verner Panton", madeBy: "Vitra, for Herman Miller", today: "Vitra",
    materials: ["Moulded plastic, one piece"], material: "plastic", collection: "spaceage", category: "chairs", photos: ["panton", "panton-2"],
    story: "Seat, back and base in one cantilevered S of plastic. Verner Panton designed it around 1960, and it took until 1967 to find a way to make it.",
    history: [
      "Panton wanted a chair moulded in a single piece. With Vitra, then making furniture for Herman Miller in Europe, he worked through materials until production began in 1967. It is counted the first chair moulded in plastic.",
      "Its form is a cantilever, like the steel-tube chairs of the 1920s, carried out in a material that needs no frame. It was included in the Danish Culture Canon in 2006.",
    ],
    source: "panton",
  },
  {
    id: "arco", name: "Arco", kind: "Floor lamp, marble/stainless steel/aluminium", year: 1962, designer: "Achille and Pier Giacomo Castiglioni", madeBy: "Flos", today: "Flos",
    materials: ["Carrara marble base", "Stainless steel arc", "Spun aluminium shade"], material: "steel", collection: "spaceage", category: "floor", photos: ["arco"], pos: "50% 25%",
    story: "A ceiling light that needs no ceiling: a spun aluminium shade hung from an arc of stainless steel and held by a block of Carrara marble. The Castiglioni brothers designed it for Flos in 1962.",
    history: [
      "The arc reaches far enough from its base to hang the shade over a dining table. The marble block holds it in balance, and a hole through the block lets two people carry it on a broom handle.",
      "Flos has made it without interruption since 1962.",
    ],
    source: "arco",
  },
  {
    id: "ball", name: "Ball", kind: "Lounge chair, fibreglass/upholstery", year: 1963, designer: "Eero Aarnio", madeBy: "Asko, Lahti",
    materials: ["Fibreglass shell", "Upholstered lining", "Aluminium swivel base"], material: "plastic", collection: "spaceage", category: "armchairs", photos: ["ball"],
    story: "A sphere of fibreglass, open on one side and lined with upholstery: a room within the room, on a swivel foot. Eero Aarnio designed it in 1963 and showed it at Cologne in 1966.",
    history: [
      "Aarnio wanted a large chair for his own home and could not find one. He drew a sphere around a seated figure, made the shell in fibreglass and set it on a turning base.",
      "Shown at the Cologne furniture fair in 1966 and made by Asko, it became one of the images of the 1960s in film and print.",
    ],
    source: "ball",
  },
  {
    id: "componibili", name: "Componibili", kind: "Storage unit, injection-moulded plastic", year: 1967, designer: "Anna Castelli Ferrieri", madeBy: "Kartell", today: "Kartell",
    materials: ["Injection-moulded ABS"], material: "plastic", collection: "spaceage", category: "storage", photos: ["componibili"],
    story: "Round modules of moulded plastic that stack without screws, each with a sliding door and a finger hole. Anna Castelli Ferrieri, a founder of Kartell, designed them in 1967.",
    history: [
      "Anna Castelli Ferrieri founded Kartell with her husband, the chemical engineer Giulio Castelli, and did much to bring plastics into the home as a material in their own right.",
      "The Componibili are injection-moulded modules, round or square, that stack to any height. They have been made since the late 1960s.",
    ],
    source: "castelli",
  },
  {
    id: "plia", name: "Plia", kind: "Folding chair, chromed steel/clear plastic", year: 1967, designer: "Giancarlo Piretti", madeBy: "Anonima Castelli, Bologna", today: "Anonima Castelli",
    materials: ["Chromed steel frame", "Clear moulded plastic"], material: "plastic", collection: "spaceage", category: "chairs", photos: ["plia"],
    story: "A folding chair that closes to little more than the thickness of its hinge: seat, back and legs turn on one hub of three discs. Giancarlo Piretti designed it for Castelli in 1967.",
    history: [
      "Piretti worked for Castelli, an office-furniture maker in Bologna. The Plia's frame is steel; the seat and back are clear moulded plastic. Closed, it hangs on a wall or stacks; open, it stacks as well.",
      "It is in the collection of the Museum of Modern Art in New York.",
    ],
    source: "chairs",
  },
  {
    id: "up5", name: "Up5", kind: "Armchair, moulded polyurethane foam/stretch fabric", year: 1969, designer: "Gaetano Pesce", madeBy: "C&B Italia", today: "B&B Italia",
    materials: ["Polyurethane foam", "Stretch fabric"], material: "upholstered", collection: "spaceage", category: "armchairs", photos: ["up5"], badge: "Sold flat",
    story: "Foam pressed in a vacuum to a fraction of its size and sold flat in a box; unwrapped, the chair swells to its full form. Its ball of an ottoman is tied to it like a prisoner's ball and chain.",
    history: [
      "Gaetano Pesce's Up series of 1969 for C&B Italia, now B&B Italia, used polyurethane foam that, vacuum-packed, went into a flat package and rose to its shape when the wrapping was cut.",
      "Pesce gave Up5 the form of a woman's body and tied the Up6 ball to it, an image, he said, of women held captive by prejudice.",
    ],
    source: "pesce",
  },
  {
    id: "boby", name: "Boby", kind: "Trolley, injection-moulded ABS", year: 1970, designer: "Joe Colombo", madeBy: "Bieffeplast", today: "B-Line",
    materials: ["Injection-moulded ABS", "Castors"], material: "plastic", collection: "spaceage", category: "storage", photos: ["boby"],
    story: "A tower of trays that swing out on one pivot, on castors, moulded in ABS. Joe Colombo designed the trolley in 1970 for the drafting office, and it moved into the home.",
    history: [
      "Joe Colombo, a Milanese painter turned designer, treated furniture as mobile equipment for living. Boby has open shelves and swivelling drawers on a single axis, and rolls on castors.",
      "Bieffeplast made it in injection-moulded ABS. B-Line makes it today.",
    ],
    source: "colombo",
  },
];

export const piece = (id: string) => PIECES.find((p) => p.id === id);
/** The first sentence of a passage, with its full stop. */
export const firstSentence = (s: string) => { const i = s.indexOf(". "); return i < 0 ? s : s.slice(0, i + 1); };
export const byYear = (a: Piece, b: Piece) => a.year - b.year || a.name.localeCompare(b.name);
/** The date as written on a card: the span or approximation where there is one. */
export const dateOf = (p: Piece) => p.when ?? String(p.year);

export interface Dept { id: DeptId; name: string; blurb: string; photo: string; pos?: string }
export const DEPARTMENTS: Dept[] = [
  { id: "seating", name: "Seating", blurb: "Chairs, armchairs, chaise longues and stools, from Thonet's bentwood to the moulded plastics of the 1960s.", photo: "museum" },
  { id: "tables", name: "Tables & storage", blurb: "Side tables and coffee tables of few parts, and storage built as systems: frames, ladders, drums and trolleys.", photo: "esu" },
  { id: "lighting", name: "Lighting", blurb: "Lamps to read and work by, and light that is hung, reflected and diffused.", photo: "akari" },
];
export const dept = (id: string) => DEPARTMENTS.find((d) => d.id === id);

export interface Category { id: CategoryId; dept: DeptId; name: string; short: string; photo: string; intro: string; more: string }
export const CATEGORIES: Category[] = [
  {
    id: "chairs", dept: "seating", name: "Dining & side chairs", short: "Side chairs", photo: "series7-2",
    intro: "The side chair is where furniture first met industry. Thonet's No. 14 was the first chair made in the millions; a century later Panton's was the first moulded in plastic.",
    more: "Between them come the cantilever in steel tube, the café chair in sheet steel, the chair built for warships in aluminium, and the moulded plywood shells of Denmark. Several stack, and several were designed for rooms where many people sit at once: the café, the canteen, the warship.",
  },
  {
    id: "armchairs", dept: "seating", name: "Armchairs & lounge chairs", short: "Armchairs", photo: "eames670",
    intro: "An armchair carries a designer's idea at full size: Rietveld's planes, Breuer's tube, Mies and Reich's leather for a state occasion, the Aaltos' plywood for a sanatorium.",
    more: "After the war the lounge chair turned into a shell that closes around the sitter: fibreglass for Saarinen, foam for Jacobsen, a sphere for Aarnio, and in 1969 a block of foam that left the factory flat and rose when it was unwrapped.",
  },
  {
    id: "chaises", dept: "seating", name: "Chaise longues & rockers", short: "Chaises & rockers", photo: "isokon",
    intro: "To recline, a chair needs a long curve: steam-bent beech on runners, a steel cradle that can be set at any angle on its base, plywood bent into one sweep, a fibreglass shell on rockers.",
    more: "Each of the four takes the material of its period to its longest curve. The Thonet rocker draws bentwood into loops and runners; the LC4 separates the cradle from its stand; the Isokon chair is one long sheet of plywood; the RAR puts the mass-produced shell on birch runners.",
  },
  {
    id: "stools", dept: "seating", name: "Stools", short: "Stools", photo: "stool60",
    intro: "Two answers to the simplest seat: Aalto's legs of bent solid birch, which stack in a spiral, and Yanagi's two mirror shapes of moulded plywood.",
    more: "Both are made of very few parts. Stool 60 is a round seat and three identical legs; the Butterfly is two identical pieces and the brass rod that joins them.",
  },
  {
    id: "tables", dept: "tables", name: "Side & coffee tables", short: "Tables", photo: "noguchi",
    intro: "Two tables of few parts: Eileen Gray's tube and open ring, adjustable to the height of a bed, and Noguchi's two identical pieces of wood under plate glass.",
    more: "Gray's table is a piece of equipment for one room in one house, made again in quantity only decades later; Noguchi's is a sculpture that went into production with Herman Miller in 1947.",
  },
  {
    id: "storage", dept: "tables", name: "Shelving & storage", short: "Storage", photo: "componibili",
    intro: "Storage made as systems: a steel frame from stock parts, ladders of wire on the wall, stacking plastic drums and a trolley of swivelling trays.",
    more: "Each can be added to. The ESU is assembled from a kit of parts, String from panels and shelves, the Componibili from modules; Boby rolls to wherever it is needed.",
  },
  {
    id: "desk", dept: "lighting", name: "Desk & table lamps", short: "Desk lamps", photo: "anglepoise",
    intro: "Lamps to read and work by: the Bauhaus table lamp in glass and metal, and an engineer's lamp balanced on springs.",
    more: "The first was made by hand to look like an object of industry; the second came from industry, designed by an engineer and made by a spring maker.",
  },
  {
    id: "floor", dept: "lighting", name: "Floor & pendant lamps", short: "Floor & pendant", photo: "ph5",
    intro: "Light hung, reflected and diffused: a pendant of nested shades, an arc weighted with marble, and lanterns of paper.",
    more: "Henningsen worked on glare for forty years; the Castiglionis put a ceiling light on the floor; Noguchi made a traditional lantern into a family of more than two hundred lamps.",
  },
];
export const category = (id: string) => CATEGORIES.find((c) => c.id === id);
export const categoriesOf = (d: DeptId) => CATEGORIES.filter((c) => c.dept === d);
export const piecesIn = (c: CategoryId) => PIECES.filter((p) => p.category === c).sort(byYear);
export const piecesOfDept = (d: DeptId) => PIECES.filter((p) => category(p.category)!.dept === d).sort(byYear);

export const MATERIALS: Record<MaterialId, { name: string; photo: string }> = {
  bentwood: { name: "Bentwood", photo: "no14" },
  wood: { name: "Solid wood", photo: "wishbone" },
  steel: { name: "Steel", photo: "wassily" },
  aluminium: { name: "Aluminium", photo: "navy" },
  plywood: { name: "Plywood", photo: "lcw" },
  plastic: { name: "Plastic", photo: "panton" },
  upholstered: { name: "Upholstered", photo: "womb" },
  paper: { name: "Paper", photo: "akari-2" },
  glass: { name: "Glass", photo: "wagenfeld" },
};

export interface Collection { id: CollectionId; name: string; years: string; photo: string; pos?: string; tagline: string; intro: string; more: string; tone: "blue" | "yellow" | "ink" | "grey" }
export const COLLECTIONS: Collection[] = [
  {
    id: "bentwood", name: "Bentwood", years: "1859–1905", photo: "rocker", tone: "ink",
    tagline: "Steam, beech and a chair in six parts",
    intro: "Steam made the first furniture of industry. Michael Thonet bent solid beech in moulds, cut a chair down to a handful of parts and sent it out in pieces.",
    more: "The process needed no carving and could be worked by unskilled hands, and it made curves that cabinetmaking could not. Thonet took it into rocking chairs, and his rivals in Vienna, among them J. & J. Kohn, into adjustable armchairs drawn by the architects of the Secession.",
  },
  {
    id: "destijl", name: "De Stijl", years: "1917–1934", photo: "redblue-2", tone: "blue",
    tagline: "Straight lines and primary colours",
    intro: "A Dutch movement of painters and architects that worked in straight lines and primary colours. Gerrit Rietveld, a cabinetmaker, built its ideas in wood.",
    more: "From the Red Blue chair, a drawing of crossing rails, to the Zig-Zag of four boards and the crate furniture sold as a kit, Rietveld kept reducing the chair to its planes and its joints.",
  },
  {
    id: "machine", name: "Machine age", years: "1924–1929", photo: "wassily", tone: "grey",
    tagline: "Tube, glass and leather come home",
    intro: "In five years steel tube and bar, glass and leather came into the house. At the Bauhaus and in Paris, designers took the methods of industry to the chair, the table and the lamp.",
    more: "Breuer bent tube in the Bauhaus workshop; Mies and Stam took away the back legs; Perriand set a chaise longue on a stand; Eileen Gray made a table that adjusts to a bed; Wagenfeld's lamp showed its parts.",
  },
  {
    id: "factory", name: "Factory floor", years: "1932–1950", photo: "tolix", tone: "yellow",
    tagline: "Made by engineers and metalworkers",
    intro: "Furniture made by engineers and metalworkers, or built from the catalogue: a lamp balanced on springs, a chair of galvanised sheet, a chair for warships and a cabinet of stock steel parts.",
    more: "None of these began as a statement of style. Each answered a working problem, light that stays where it is put, a chair that survives the weather or the sea, storage that can be ordered by the part, and each is made today.",
  },
  {
    id: "plywood", name: "Bent plywood", years: "1932–1956", photo: "paimio", tone: "ink",
    tagline: "Wood in layers, bent and moulded",
    intro: "Layers of veneer glued and bent under pressure made a material that curves in more than one direction. From the Aaltos' sanatorium chair to the Eameses' lounge chair, plywood gave modern furniture curved form in wood.",
    more: "Alvar Aalto bent solid birch and laminated it; Breuer moved from aluminium to plywood in London; the Eameses moulded it in their apartment, then for the US Navy, then for Herman Miller; Sori Yanagi gave the technique a Japanese form.",
  },
  {
    id: "organic", name: "Organic modern", years: "1944–1956", photo: "tulip", tone: "blue",
    tagline: "Shaped to the body",
    intro: "After the Museum of Modern Art's 1940 competition Organic Design in Home Furnishings, designers working in America shaped furniture to the body in fibreglass, cast aluminium, glass and paper.",
    more: "Saarinen made a shell to curl up in and then a chair on one stem; the Eameses put a plastic shell on rockers; Noguchi, a sculptor, made a table of two identical parts and lamps of paper made in Gifu.",
  },
  {
    id: "nordic", name: "Nordic", years: "1949–1958", photo: "series7-2", tone: "grey",
    tagline: "Wood and metal, made to last",
    intro: "In Denmark and Sweden after the war, workshops and factories worked together on furniture of solid wood, plywood and spun metal, made for daily use and made to last.",
    more: "Wegner's chairs were made by hand in quantity; Jacobsen's were moulded by Fritz Hansen in the millions; Henningsen spent forty years on glare; String came out of a publisher's competition and the Lamino out of a small firm, and both are made today.",
  },
  {
    id: "spaceage", name: "Space age", years: "1960–1970", photo: "panton-2", tone: "yellow",
    tagline: "Plastic in one piece",
    intro: "Plastics moulded in one piece, foam packed flat, and colour: in the 1960s furniture took shapes that no frame could make.",
    more: "Panton's chair needed seven years to reach production. Kartell made plastic a material for the home; Aarnio closed a sphere around the sitter; Pesce's foam left the factory in a flat box; Colombo put storage on castors.",
  },
];
export const collection = (id: string) => COLLECTIONS.find((c) => c.id === id);
export const piecesOfCollection = (c: CollectionId) => PIECES.filter((p) => p.collection === c).sort(byYear);

/** A dot on a room photograph, at a share of its width and height, naming what is there. */
export interface Spot { x: number; y: number; label: string; piece?: string; note?: string }
export interface Room { id: RoomId; name: string; place: string; years: string; by: string; photos: string[]; intro: string; more: string; pieces: string[]; spots: Spot[]; source: SourceKey; facts: { line: string; label: string }[] }
export const ROOMS: Room[] = [
  {
    id: "tugendhat", name: "Villa Tugendhat", place: "Brno", years: "1928–1930", by: "Ludwig Mies van der Rohe and Lilly Reich", photos: ["room-tugendhat", "room-tugendhat-2"],
    intro: "Built for Fritz and Greta Tugendhat on a slope above Brno, the villa's main floor is one open room, divided only by free-standing walls of onyx and of wood, with a wall of glass that can be lowered into the floor.",
    more: "Mies and Reich designed its furniture with it, among them the Tugendhat and Brno chairs; the Barcelona chairs of 1929 stand in the living area. The house, of reinforced concrete and steel, has been on the UNESCO World Heritage List since 2001.",
    pieces: ["barcelona", "mr10", "wassily", "lc4"],
    spots: [
      { x: 55, y: 62, label: "Barcelona chair", piece: "barcelona" },
      { x: 91, y: 78, label: "Barcelona stool", note: "Designed with the chair for the German Pavilion of 1929." },
      { x: 37, y: 66, label: "Barcelona chair", piece: "barcelona" },
    ],
    source: "tugendhat",
    facts: [{ line: "2001", label: "UNESCO World Heritage List" }, { line: "1928–30", label: "Built" }, { line: "Brno", label: "Czech Republic" }],
  },
  {
    id: "schroder", name: "Rietveld Schröder House", place: "Utrecht", years: "1924", by: "Gerrit Rietveld, with Truus Schröder-Schräder", photos: ["room-schroder"],
    intro: "Truus Schröder asked for a house with as few walls as possible. Rietveld's upper floor is one space that sliding panels divide into rooms when they are wanted, and colour marks the planes as it does on his furniture.",
    more: "Rietveld worked on the design side by side with Schröder, who lived in the house until her death. The Zig-Zag chair was designed for it, and the house is one of the best-known works of De Stijl architecture.",
    pieces: ["redblue", "zigzag", "crate"],
    spots: [],
    source: "schroder",
    facts: [{ line: "1924", label: "Built" }, { line: "Utrecht", label: "Prins Hendriklaan 50" }],
  },
  {
    id: "paimio", name: "Paimio Sanatorium", place: "Paimio", years: "1929–1933", by: "Alvar and Aino Aalto", photos: ["room-paimio"],
    intro: "The Aaltos won the competition for the sanatorium in 1929, and it was completed in 1933 as a building for the treatment of tuberculosis, with rooms facing the sun and furniture, lights and colours made for it.",
    more: "The Paimio chair was designed for its patients. The building later became a general hospital; in 2026 plans were announced to make it a hotel and meeting place while restoring the Aaltos' design.",
    pieces: ["paimio", "stool60"],
    spots: [{ x: 58, y: 18, label: "Ceiling light", note: "The hall's lights were designed with the building." }],
    source: "paimiosan",
    facts: [{ line: "1933", label: "Completed" }, { line: "1929", label: "Competition won" }],
  },
];
export const room = (id: string) => ROOMS.find((r) => r.id === id);

/** Four lines of descent through the catalogue. Each is a band whose largest square is the earliest piece. */
export interface Lineage { id: string; name: string; intro: string; pieces: string[] }
export const LINEAGES: Lineage[] = [
  { id: "cantilever", name: "The cantilever", intro: "Breuer's tube frame, then a chair with no back legs, then the same idea in one piece of plastic.", pieces: ["wassily", "mr10", "panton"] },
  { id: "plywood", name: "Bending wood in layers", intro: "Laminated birch at Paimio, plywood in London and Los Angeles, and a stool of two mirror shapes in Japan.", pieces: ["paimio", "stool60", "isokon", "lcw", "butterfly", "eames670"] },
  { id: "shell", name: "The shell", intro: "Once a seat and back could be moulded as one, the chair became a shell on a base: fibreglass, plywood, foam.", pieces: ["rar", "ant", "series7", "tulip", "egg", "ball"] },
  { id: "flat", name: "Sent flat", intro: "Furniture made to travel in pieces or to fold: a chair in six parts, a kit of boards, a paper lamp, a block of foam.", pieces: ["no14", "crate", "akari", "up5"] },
];
export const lineageOf = (id: string) => LINEAGES.find((l) => l.pieces.includes(id));

/** Materials in the order they came into furniture, for the home page's timeline of squares. */
export const MATERIAL_TIMELINE = [
  { line: "1859", label: "Steam-bent beech", body: "Thonet's moulds made curves without carving and a chair of six parts.", piece: "no14" },
  { line: "1925", label: "Steel tube", body: "Breuer took the bent tube of industry into the house, and the cantilever followed in two years.", piece: "wassily" },
  { line: "1932", label: "Bent plywood", body: "Layers of birch glued and bent at Paimio; moulded in two directions by the Eameses in 1945.", piece: "paimio" },
  { line: "1950", label: "Fibreglass", body: "The Eameses' shell, made by Zenith Plastics, was among the first chairs mass-produced in plastic.", piece: "rar" },
  { line: "1967", label: "Moulded plastic", body: "Panton's chair in one piece reached production; Kartell made plastic a material for the home.", piece: "panton" },
];

export const HEADER = {
  nav: [
    { label: "Products", href: PAGES.products },
    { label: "Rooms", href: PAGES.room },
    { label: "Collections", href: PAGES.collection },
    { label: "Design history", href: PAGES.history },
  ],
};
export const CHIPS: { label: string; href: string; photo: string }[] = [
  { label: "Seating", href: departmentHref("seating"), photo: "no14" },
  { label: "Armchairs & lounge chairs", href: categoryHref("armchairs"), photo: "egg" },
  { label: "Dining & side chairs", href: categoryHref("chairs"), photo: "series7" },
  { label: "Tables & storage", href: departmentHref("tables"), photo: "componibili" },
  { label: "Lighting", href: departmentHref("lighting"), photo: "ph5" },
  { label: "Collections", href: PAGES.collection, photo: "panton" },
  { label: "Rooms", href: PAGES.room, photo: "room-tugendhat" },
];

export const FOOTER: [string, string[]][] = [
  ["Help", ["Customer service", "Frequently asked questions", "Accessibility", "Contact us"]],
  ["Services", ["Lists", "Compare", "Search by designer", "Design history guide"]],
  ["About GIFea", ["This is a layout study", "Sources", "Photo credits", "Newsroom"]],
];

export const REFERENCE = {
  home: { label: "the home page of ikea.com (United States)", url: "https://www.ikea.com/us/en/" },
  products: { label: "the product departments of ikea.com", url: "https://www.ikea.com/us/en/cat/products-products/" },
  department: { label: "a department page of ikea.com, Sofas & armchairs", url: "https://www.ikea.com/us/en/cat/sofas-armchairs-700640/" },
  category: { label: "a category page of ikea.com, Armchairs & accent chairs", url: "https://www.ikea.com/us/en/cat/armchairs-chaises-fu006/" },
  product: { label: "a product page of ikea.com, the POÄNG armchair", url: "https://www.ikea.com/us/en/p/poaeng-armchair-birch-veneer-knisa-light-beige-s59305928/" },
  series: { label: "a series page of ikea.com, POÄNG", url: "https://www.ikea.com/us/en/cat/poaeng-series-07472/" },
  collection: { label: "a collection page of ikea.com, ALPTALL", url: "https://www.ikea.com/us/en/cat/alptall-collection-700810/" },
  room: { label: "a room page of ikea.com, Living room", url: "https://www.ikea.com/us/en/rooms/living-room/" },
  history: { label: "the style guide of ikea.com", url: "https://www.ikea.com/us/en/ideas/styles/" },
};
