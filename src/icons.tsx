/**
 * The study's own line icons on a 24-unit grid with a round stroke. None is
 * copied from the reference. `Icon` is inline and takes the text colour;
 * `Imprint` is the same drawing set large and faint behind a square's text.
 */
const PATHS = {
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21",
  heart: "M12 20s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z",
  list: "M8 6h12M8 12h12M8 18h8M4 6h.01M4 12h.01M4 18h.01",
  user: "M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20a7 7 0 0 1 14 0",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  up: "M12 19V5M6 11l6-6 6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  compare: "M4 5h7v14H4zM13 5h7v14h-7z",
  book: "M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4zM5 17a3 3 0 0 1 3-3h10",
  tag: "M3.5 12.5V4h8.5l8.5 8.5-8 8-9-8zM8 8.5h.01",
  chair: "M7 3v9h10V3M6 12h12v2H6zM7 14v7M17 14v7",
  lamp: "M8 3h8l3 8H5zM12 11v8M8 21h8",
  shelf: "M4 3v18M20 3v18M4 8h16M4 14h16M4 20h16",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  layers: "M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  box: "M3.5 8.5 12 4l8.5 4.5v8L12 21l-8.5-4.5v-8zM3.5 8.5 12 13l8.5-4.5M12 13v8",
} as const;
export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 24, className, filled }: { name: IconName; size?: number; className?: string; filled?: boolean }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ""}`} viewBox="0 0 24 24" width={size} height={size} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Imprint({ name }: { name: IconName }) {
  return (
    <svg className="box__imprint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}
