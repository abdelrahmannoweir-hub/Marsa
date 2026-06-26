export type TagGroup = {
  group: string;
  tags: string[];
};

export type RoomCategory = {
  label: string;
  slug: string;
  subcategories: { label: string; slug: string }[];
};

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    label: "Living Room",
    slug: "living-room",
    subcategories: [
      { label: "Sofas", slug: "sofas" },
      { label: "Coffee Tables", slug: "coffee-tables" },
      { label: "Accent Chairs", slug: "accent-chairs" },
      { label: "Side Tables", slug: "side-tables" },
      { label: "TV Units", slug: "tv-units" },
    ],
  },
  {
    label: "Bedroom",
    slug: "bedroom",
    subcategories: [
      { label: "Beds", slug: "beds" },
      { label: "Nightstands", slug: "nightstands" },
      { label: "Dressers", slug: "dressers" },
      { label: "Wardrobes", slug: "wardrobes" },
    ],
  },
  {
    label: "Dining Room",
    slug: "dining-room",
    subcategories: [
      { label: "Dining Tables", slug: "dining-tables" },
      { label: "Dining Chairs", slug: "dining-chairs" },
      { label: "Sideboards", slug: "sideboards" },
      { label: "Bar Stools", slug: "bar-stools" },
    ],
  },
  {
    label: "Outdoor",
    slug: "outdoor",
    subcategories: [
      { label: "Outdoor Sofas", slug: "outdoor-sofas" },
      { label: "Outdoor Dining", slug: "outdoor-dining" },
      { label: "Outdoor Chairs", slug: "outdoor-chairs" },
    ],
  },
  {
    label: "Office",
    slug: "office",
    subcategories: [
      { label: "Desks", slug: "desks" },
      { label: "Office Chairs", slug: "office-chairs" },
      { label: "Storage", slug: "office-storage" },
    ],
  },
  {
    label: "Lighting",
    slug: "lighting",
    subcategories: [
      { label: "Pendants", slug: "pendants" },
      { label: "Table Lamps", slug: "table-lamps" },
      { label: "Floor Lamps", slug: "floor-lamps" },
      { label: "Wall Lights", slug: "wall-lights" },
    ],
  },
  {
    label: "Rugs",
    slug: "rugs",
    subcategories: [
      { label: "Hand-knotted", slug: "hand-knotted" },
      { label: "Machine-made", slug: "machine-made" },
      { label: "Outdoor Rugs", slug: "outdoor-rugs" },
    ],
  },
];

export const PRODUCT_CATEGORIES = [
  "Sofas & Seating",
  "Tables & Desks",
  "Storage & Shelving",
  "Beds & Bedroom",
  "Lighting",
  "Carpets & Rugs",
  "Décor & Accessories",
  "Outdoor",
] as const;

export const TAG_GROUPS: TagGroup[] = [
  {
    group: "Style",
    tags: [
      "minimalist",
      "contemporary",
      "saudi-heritage",
      "warm-eclectic",
    ],
  },
  {
    group: "Color",
    tags: [
      "neutral-warm",
      "black-white",
      "earthy-tones",
      "bold-accents",
    ],
  },
  {
    group: "Material",
    tags: [
      "natural-wood",
      "marble-stone",
      "woven-rattan",
      "metal-glass",
    ],
  },
  {
    group: "Atmosphere",
    tags: [
      "calm-quiet",
      "bold-confident",
      "cozy-layered",
      "open-airy",
    ],
  },
];
