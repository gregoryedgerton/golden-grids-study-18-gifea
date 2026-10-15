GIFcommit00019

# Layout study — IKEA, as GIFea

**Live:** [`https://gregoryedgerton.github.io/golden-grids-study-18-ikea/`](https://gregoryedgerton.github.io/golden-grids-study-18-ikea/)

An unaffiliated layout study. It rebuilds the home page, the product
departments, a department, a category, a product page, a series and a
collection page, a room page and the style guide of
[ikea.com](https://www.ikea.com/us/en/) as stacked golden grids under a parody
name, GIFea. GIFea is not a shop and sells nothing. In place of the reference's
products it holds a catalogue of forty-one real designs of furniture and
lighting, from Michael Thonet's No. 14 chair of 1859 to Joe Colombo's Boby
trolley of 1970, each credited to its designers and makers. None of the
reference's sentences, photographs or marks is reproduced, and its product
names appear only to name the pages that were reviewed. Built
with [Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

Read on 2026-10-15 in a desktop browser at 390, 820 and 1,440px wide, signed
out; the order of the headings and the text of each page were taken, and
screenshots were used for reference only and are not kept in the repository.

- **Home:** a black utility bar, the header (the mark, a search field, a
  greeting, favourites and the bag), a row of chips each with a small
  photograph, a mosaic of photographs (one large, three smaller) each with a
  line of white type and an arrow, a rail led by a grey square of type, a wide
  blue promotion beside a photograph, rows of product cards, food offers,
  rooms, services, sustainability, recalls and a closing passage.
- **Products and a department (Sofas & armchairs):** chips for the categories,
  the title, two blue promotion blocks under photographs, a rail of photographs
  with a white pill naming each kind, a mosaic of rooms marked with dots, an
  orange promotion square, and further promotions.
- **A category (Armchairs & accent chairs):** chips, the title and breadcrumb,
  an introduction with Read more, colour filters with counts, the count of
  items, product cards with a Compare box above each, a promotion among the
  cards, and a closing passage.
- **A product page (the POÄNG armchair):** a five-level breadcrumb, the
  photographs beside a buy box (the series link, the name in capitals, a
  descriptor, the price with its cents raised, a rating, cover and frame
  options, how to get it, the blue Add to bag, services, a loyalty line,
  guarantees, ways to pay), then tabs (Overview, Product details,
  Measurements, What's included), reviews, accessories, related products, Get
  the look and More from the series.
- **A series (POÄNG) and a collection (ALPTALL):** a banner, sort and filter,
  the results and recommendations.
- **A room (Living room):** grey tiles to its categories, a mosaic of room
  photographs, a rail of articles, a blue promotion, and photographs with dots
  that name what is in them.
- **The style guide:** a title and statement, a colour of the year with a row
  of products in it, an archive and more styles.

**Measured register:** white ground, ink `#111` and `#484848`, the blue
`#0058a3` of the buttons and promotions and the yellow `#ffdb00` of the mark,
a sans in two weights (Noto Sans stands in for the reference's own Noto-based
face), pill buttons and chips, and flat squares with no corners for
photographs, product cards and promotions. The reference has one scheme on the
web; dark is the study's own: the same blue and yellow, the greys turned over.

## Approach

The reference lays out its pages in rows of equal cards and in mosaics of one
large photograph beside smaller ones. The study sets every such module as one
golden grid: the first thing in the largest square, the rest in descending
squares, and figures from the catalogue as large type among them. A card's
type is set from its square's side (`9.5px + 1.5%`, held between 12 and 19px),
and what a square cannot hold it leaves out whole: the collection line and the
maker's dots first, then the designer, the descriptor's second line, and in the
smallest squares the photograph with the name on a white pill.

The catalogue is real, so the card changes what it carries: the year of the
design sits where the price would be, the round blue button saves the piece to
the reader's list instead of adding it to a bag, and the coloured dots say who
made it first and who makes it today.

Four uses of the grid are particular to this study:

- **The hierarchy as a descent.** On Products, each level of the catalogue is
  its own band: departments, then the chosen department's categories beneath,
  then the chosen category's pieces beneath that. Three grids stacked, one per
  level, never nested; the choice is kept in the address.
- **The room taken apart.** On a room page and in a product's Get the look, the
  room's photograph is the largest square, marked with dots on what is in it,
  and the pieces made for the room or in its years take the squares beside it.
- **Time as the spiral.** In the design history guide, in each product's
  lineage and in the home page's materials, the earliest piece or material
  takes the largest square and each later one a smaller square, so the order of
  the squares is the order of the dates.
- **The mosaic.** The reference's home mosaic (one large photograph, one
  medium, two small) is already the shape of a four-square golden grid; the
  study uses that grid wherever the reference uses a mosaic.

## The pages

Eight Vite entries, plain relative links, no router; the product, category,
department, collection and room pages take a query (`?p=`, `?c=`, `?d=`,
`?m=`, `?q=`, `?r=`). `GridBand` ([`src/bands/bands.tsx`](src/bands/bands.tsx))
draws every band from cells; `lib/plan.ts` chooses each grid. Long lists are
dealt into bands of at most five, as evenly as possible (eleven become four,
four and three). Below 1100px a band of five or six is dealt into two grids,
and a skip grid that would leave a square under 104px falls back to a plain one.

| Page | Band | Cells |
| --- | --- | --- |
| Home | Mosaic | four photographs, each a line of type and an arrow |
| | Lounging, 1928 to 1969 | five lounge chairs, a figure in the strip |
| | Machine age | a product and a blue promotion |
| | Made by the million | three products and a figure, a figure in the strip |
| | Collections | eight periods, in two bands of four photographs |
| | Historic rooms | three room photographs |
| | Materials | five materials as large type, earliest first |
| Products | Departments | three tiles to choose from, a figure in the strip |
| | Categories | the chosen department's categories (a figure in the strip when there are fewer than four) |
| | Pieces | the chosen category's pieces, in bands of at most five |
| Department | Collections | two blue promotions |
| | By material | up to five photographs with a pill, the most pieces first |
| | A room of its time | a dotted room photograph, a square of type and two products |
| | By category | the categories as pill photographs |
| | The earliest | five products |
| Category | Results | the pieces, filtered and sorted, with a square of type among them |
| Product | Gallery | the photographs and two figures, beside the buy box |
| | Get the look | a dotted room photograph, a square of type, two products |
| | Lineage | the pieces of the line of descent, earliest first, this one marked |
| | More from the collection | up to five products |
| | Related products | the rest of the category, up to five |
| Collection | Banner | the photograph, a blue promotion and a figure, a figure in the strip |
| | In this collection | the pieces, filtered by category |
| | Other collections | the periods before and after |
| Room | The room and its pieces | the dotted photograph and the pieces |
| | The building | a second photograph or a square of type, and figures |
| | The period | a photograph and a blue promotion |
| Design history | Statement | a photograph and three figures |
| | Four lineages | the cantilever, bent plywood, the shell, sent flat |
| | Collections | eight photographs in two bands |

Flat modules stay flat: the header and its search, the chips, the filter bar
and the compare table, the buy box, the tabs, the services, the timeline of
every piece, the sign-up and the footer.

**What answers back.** Every product card and photograph opens its square in
place; a card's name links to its product page. The heart saves a piece to
Your list, a panel in the header that keeps it in the browser's local storage.
The search suggests pieces as it is typed and its results page searches name,
designer, year, materials, category and collection. On a category page, the
collection and material filters re-deal the bands from the new count, the sort
orders by date or name, and Compare puts up to four pieces side by side in a
table. On Products, choosing a department or a category opens its band
beneath. A dot on a room photograph opens a label that links to the piece.

## Content and provenance

- **The structure is the reference's; the catalogue is real.** Every piece is
  a real design, named as its designer or maker named it. Its date, designer,
  materials and history come from the Wikipedia article named on its product
  page (listed in [`src/sources.ts`](src/sources.ts)), written in the study's
  own words. First makers and current makers are as the study understood them
  in October 2026; they were not checked with each maker, and where a first
  maker is not recorded the page says so.
- **The arrangement is the study's own:** the departments, categories, eight
  collections (periods such as Machine age and Factory floor) and four lines
  of descent are a grouping made for this study, not a historian's.
- **Photographs** are in [`src/photos.json`](src/photos.json), each with its
  author, licence, page and alt text: all from Wikimedia Commons, under CC BY,
  CC BY-SA or CC0 or in the public domain. Each shows the design it is set
  beside, or the room. A photograph of a photograph (an exhibition print of
  the Eames House) was left out. [`captures/hunt.py`](captures/hunt.py) found
  the candidates and [`captures/pick.py`](captures/pick.py) downloaded and
  recorded the ones chosen.
- **Not used:** IKEA's products, photographs, mark and text, and its product
  names except to name the pages that were reviewed.
  The parody mark is the name on a yellow oval in a blue field.
- **Icons** are the study's own drawings. **Text** is the study's own.

## Notes for review

Observations for whoever reviews this study, recorded without a verdict.
Whether the layout suits the page is assessed separately, after every study
has been reviewed.

- **The year in the price's place.** The reference's card leads with a price;
  the study's leads with a date, set in the same weight and size.
- **Card sizes.** In a band of five at 1440 the squares are about 830, 510,
  320, 190 and 190px; the two smallest show a photograph and a name pill.
- **Bands of six.** Two lineages in the design history guide have six pieces;
  at 1440 their smallest squares are about 100px and show a name pill.
- **Dots on a cropped photograph.** A room photograph is cropped to its square,
  so a dot is placed on the cropped picture and a dot whose thing is cropped
  away is not drawn; the Barcelona stool's dot shows only when the square is
  wide enough.
- **Not rebuilt.** Sign-in, the bag and checkout, ratings and reviews (the
  pieces are real designs, and invented reviews of them would be opinions put
  in other people's mouths), measurements, assembly documents, food offers and
  recalls.
- **Accessibility.** `captures/scan.cjs` reports no overflow, no fitted line
  under 12px and no axe violations in Chrome and WebKit at 390, 820 and 1440,
  light and dark, on all eight pages. `captures/cells.cjs` opens every
  expandable square at 390 in WebKit and Chrome. No screen-reader user has
  tested it.

## Disclosure

Every page says it is a study in three places, all read from
[`src/study.json`](src/study.json): the page's metadata, a sticky notice at the
top, and "About this layout study", the last element on the page.

## Running it

```bash
npm install
npm run dev
NODE_PATH=<a node_modules with playwright> node captures/scan.cjs http://localhost:5173/ index products "department?d=seating" "category?c=chairs" "product?p=barcelona" "collection?c=nordic" "room?r=tugendhat" history
```

Pushing to `main` deploys to GitHub Pages.
