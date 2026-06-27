export const CAMPAIGN_BANNER = {
  label: "3 DAYS ONLY",
  headline: "Up to 40% off\n+ free delivery",
  subtext: "On selected furniture, lighting and accessories. Ends Sunday.",
  ctaText: "Shop the sale",
  ctaHref: "/products",
  active: true,
};

export type DesignStep = {
  label: string;
  tagQuery: string;
};

export const DESIGN_ROOM_STEPS: Record<string, DesignStep[]> = {
  "living-room": [
    { label: "Sofa",         tagQuery: "tag:subcategory-sofas" },
    { label: "Coffee Table", tagQuery: "tag:subcategory-coffee-tables" },
    { label: "Rug",          tagQuery: "tag:category-rugs" },
    { label: "Lighting",     tagQuery: "tag:category-lighting" },
    { label: "Accent Chair", tagQuery: "tag:subcategory-accent-chairs" },
  ],
  "bedroom": [
    { label: "Bed",        tagQuery: "tag:subcategory-beds" },
    { label: "Nightstand", tagQuery: "tag:subcategory-nightstands" },
    { label: "Dresser",    tagQuery: "tag:subcategory-dressers" },
    { label: "Lighting",   tagQuery: "tag:category-lighting" },
  ],
  "dining-room": [
    { label: "Dining Table", tagQuery: "tag:subcategory-dining-tables" },
    { label: "Chairs",       tagQuery: "tag:subcategory-dining-chairs" },
    { label: "Sideboard",    tagQuery: "tag:subcategory-sideboards" },
  ],
  "office": [
    { label: "Desk",     tagQuery: "tag:subcategory-desks" },
    { label: "Chair",    tagQuery: "tag:subcategory-office-chairs" },
    { label: "Storage",  tagQuery: "tag:subcategory-office-storage" },
    { label: "Lighting", tagQuery: "tag:category-lighting" },
  ],
};

export const DESIGN_ROOM_META: Record<string, { label: string; desc: string }> = {
  "living-room": { label: "Living Room",  desc: "Sofas, tables, lighting & more" },
  "bedroom":     { label: "Bedroom",      desc: "Beds, storage & bedside essentials" },
  "dining-room": { label: "Dining Room",  desc: "Tables, chairs & sideboards" },
  "office":      { label: "Home Office",  desc: "Desks, shelving & task lighting" },
};

export const EDITORIAL_BLOCKS: {
  category: string;
  slug: string;
  moodHeadline: string;
  subtext: string;
  placeholderLabel: string;
  bg: string;
}[] = [
  {
    category: "Dining",
    slug: "dining-room",
    moodHeadline: "Lingering is encouraged.",
    subtext: "Spacious dining, plush seating.",
    placeholderLabel: "Dining mood image",
    bg: "linear-gradient(160deg, #C9B5A0 0%, #A8917A 100%)",
  },
  {
    category: "Living Room",
    slug: "living-room",
    moodHeadline: "Just, relax.",
    subtext: "Sofas made for real afternoons.",
    placeholderLabel: "Living room mood image",
    bg: "linear-gradient(160deg, #B5C0B8 0%, #8D9E94 100%)",
  },
];
