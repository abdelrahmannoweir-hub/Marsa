export type TagGroup = {
  group: string;
  tags: string[];
  /** If set, this group is only shown when the product category is one of these values */
  onlyForCategories?: string[];
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
      "Contemporary",
      "Traditional Arabic",
      "Mid-Century Modern",
      "Minimalist",
      "Bohemian",
      "Art Deco",
      "Coastal",
      "Industrial",
      "Japandi",
    ],
  },
  {
    group: "Color",
    tags: [
      "Neutral/Beige",
      "Crisp White",
      "Warm Earth Tones",
      "Cool Grey",
      "Navy Blue",
      "Terracotta",
      "Forest Green",
      "Charcoal Black",
      "Gold/Brass",
      "Blush Rose",
    ],
  },
  {
    group: "Material",
    tags: [
      "Solid Wood",
      "Upholstered Fabric",
      "Leather",
      "Rattan/Wicker",
      "Marble",
      "Metal/Steel",
      "Glass",
      "Velvet",
      "Linen",
      "Concrete",
    ],
  },
  {
    group: "Atmosphere",
    tags: [
      "Cozy & Warm",
      "Airy & Light",
      "Bold & Dramatic",
      "Romantic",
      "Zen/Serene",
      "Eclectic",
      "Luxurious",
      "Family-Friendly",
      "Work-from-Home",
    ],
  },
  {
    group: "Lighting Mood",
    tags: [
      "Warm Ambient",
      "Cool Task",
      "Statement/Sculptural",
      "Diffused Glow",
      "Directional",
      "Natural Enhancer",
    ],
    onlyForCategories: ["Lighting"],
  },
  {
    group: "Pattern",
    tags: [
      "Geometric",
      "Floral",
      "Abstract",
      "Solid/Plain",
      "Tribal/Kilim",
      "Striped",
      "Moroccan",
      "Persian",
    ],
    onlyForCategories: ["Carpets & Rugs"],
  },
];
