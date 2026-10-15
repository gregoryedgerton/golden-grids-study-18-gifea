/**
 * Where the facts come from. Each piece and room names one source by key; the
 * product page links it beside the facts, and the disclosure lists every
 * source the page drew on. The copy is the study's own, written from these
 * articles and checked against them; where an article does not cover a point
 * (a current maker, a first maker), the study says so in its disclosure.
 */
const W = (title: string, path: string) => ({ short: `Wikipedia, “${title}”`, full: `Wikipedia, “${title}”, read October 15, 2026`, url: `https://en.wikipedia.org/wiki/${path}` });
export const SOURCES = {
  no14: W("No. 14 chair", "No._14_chair"),
  thonet: W("Michael Thonet", "Michael_Thonet"),
  kohn: W("Jacob & Josef Kohn", "Jacob_%26_Josef_Kohn"),
  redblue: W("Red and Blue Chair", "Red_and_Blue_Chair"),
  zigzag: W("Zig-Zag Chair", "Zig-Zag_Chair"),
  rietveld: W("Gerrit Rietveld", "Gerrit_Rietveld"),
  wassily: W("Wassily chair", "Wassily_chair"),
  mr10: W("Cantilever chair", "Cantilever_chair"),
  barcelona: W("Barcelona chair", "Barcelona_chair"),
  lc4: W("Chaise Longue (Le Corbusier)", "Chaise_Longue_(Le_Corbusier)"),
  e1027: W("E-1027", "E-1027"),
  wagenfeld: W("Wilhelm Wagenfeld", "Wilhelm_Wagenfeld"),
  anglepoise: W("Anglepoise lamp", "Anglepoise_lamp"),
  tolix: W("List of chairs", "List_of_chairs"),
  navy: W("Emeco 1006", "Emeco_1006"),
  eames: W("Charles and Ray Eames", "Charles_and_Ray_Eames"),
  paimiosan: W("Paimio Sanatorium", "Paimio_Sanatorium"),
  stool60: W("Model 60 stacking stool", "Model_60_stacking_stool"),
  isokon: W("Isokon", "Isokon"),
  lcw: W("Eames Lounge Chair Wood", "Eames_Lounge_Chair_Wood"),
  yanagi: W("Sori Yanagi", "Sori_Yanagi"),
  eames670: W("Eames Lounge Chair", "Eames_Lounge_Chair"),
  noguchi: W("Noguchi table", "Noguchi_table"),
  chairs: W("List of chairs", "List_of_chairs"),
  akari: W("Akari (lamp)", "Akari_(lamp)"),
  tulip: W("Tulip chair", "Tulip_chair"),
  wishbone: W("Wishbone chair", "Wishbone_chair"),
  strinning: W("Nisse Strinning", "Nisse_Strinning"),
  ant: W("Ant (chair)", "Ant_(chair)"),
  series7: W("Model 3107 chair", "Model_3107_chair"),
  ekstrom: W("Yngve Ekström", "Yngve_Ekstr%C3%B6m"),
  ph5: W("PH-lamp", "PH-lamp"),
  egg: W("Egg (chair)", "Egg_(chair)"),
  panton: W("Panton Chair", "Panton_Chair"),
  arco: W("Arco (lamp)", "Arco_(lamp)"),
  ball: W("Ball Chair", "Ball_Chair"),
  castelli: W("Anna Castelli Ferrieri", "Anna_Castelli_Ferrieri"),
  pesce: W("Gaetano Pesce", "Gaetano_Pesce"),
  colombo: W("Joe Colombo (designer)", "Joe_Colombo_(designer)"),
  tugendhat: W("Villa Tugendhat", "Villa_Tugendhat"),
  schroder: W("Rietveld Schröder House", "Rietveld_Schr%C3%B6der_House"),
} as const;
export type SourceKey = keyof typeof SOURCES;
export const cited = new Set<SourceKey>();
export const cite = (k: SourceKey) => { cited.add(k); return SOURCES[k]; };
