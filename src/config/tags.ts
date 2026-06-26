export type TagGroup = {
  group: string;
  tags: string[];
};

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
