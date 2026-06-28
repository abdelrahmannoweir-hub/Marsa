// Run with: node scripts/seed-products.js
// Requires Node 18+ (built-in fetch). Creates 38 test products in Shopify
// with real images from C:\Users\user\Desktop\Testing products

const fs = require("fs");
const path = require("path");

// ── Load credentials from .env.local ──────────────────────────────────────
const envPath = path.join(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const DOMAIN = env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const TOKEN  = env.SHOPIFY_ADMIN_API_TOKEN;
const IMG_DIR = "C:\\Users\\user\\Desktop\\Testing products";

if (!DOMAIN || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_SHOPIFY_DOMAIN or SHOPIFY_ADMIN_API_TOKEN in .env.local");
  process.exit(1);
}

// ── Product definitions ────────────────────────────────────────────────────
const PRODUCTS = [
  // SOFAS
  {
    filename: "modern sofa.webp",
    title: "Haven 3-Seater Sofa",
    description: "A clean-lined three-seater with deep cushioning and solid oak legs. 220cm × 90cm × 80cm.",
    vendor: "loft",
    price: 2900,
    tags: ["category-living-room","subcategory-sofas","contemporary","neutral-warm","natural-wood","open-airy"],
  },
  {
    filename: "rattan modern sofa.webp",
    title: "Rattan 2-Seater Sofa",
    description: "Woven rattan frame with plush linen cushions — effortlessly warm. 165cm × 85cm × 78cm.",
    vendor: "rawaa",
    price: 3200,
    tags: ["category-living-room","subcategory-sofas","warm-eclectic","earthy-tones","woven-rattan","cozy-layered"],
  },
  {
    filename: "comfy lshape.jpg",
    title: "Comfy L-Shape Sofa — Grey",
    description: "Generous sectional in soft grey microfibre, built for long evenings. 280cm × 200cm × 82cm.",
    vendor: "rawaa",
    price: 4200,
    tags: ["category-living-room","subcategory-sofas","contemporary","neutral-warm","woven-rattan","cozy-layered"],
  },
  {
    filename: "modern lshape.jpg",
    title: "Zara L-Shape Sectional",
    description: "Sleek modular sectional with tight upholstery and tapered oak feet. 300cm × 180cm × 80cm.",
    vendor: "loft",
    price: 3800,
    tags: ["category-living-room","subcategory-sofas","minimalist","neutral-warm","natural-wood","open-airy"],
  },

  // ACCENT CHAIRS
  {
    filename: "modern arm chair.jpg",
    title: "Modern Arm Chair — Sand",
    description: "Statement armchair in sand-toned fabric with angular wooden arms. 72cm × 75cm × 86cm.",
    vendor: "rawaa",
    price: 1100,
    tags: ["category-living-room","subcategory-accent-chairs","contemporary","neutral-warm","natural-wood","open-airy"],
  },
  {
    filename: "modern armchair.jpg",
    title: "Boucle Accent Chair",
    description: "Cloud-soft boucle upholstery on a slender brass base. 68cm × 70cm × 82cm.",
    vendor: "loft",
    price: 1350,
    tags: ["category-living-room","subcategory-accent-chairs","minimalist","neutral-warm","woven-rattan","calm-quiet"],
  },

  // COFFEE TABLES
  {
    filename: "center table set.jpg",
    title: "Centro Coffee Table Set",
    description: "Nesting trio in natural oak with staggered heights for flexible styling. Largest: 100cm × 55cm × 42cm.",
    vendor: "loft",
    price: 1800,
    tags: ["category-living-room","subcategory-coffee-tables","contemporary","earthy-tones","natural-wood","open-airy"],
  },
  {
    filename: "coffee table set.webp",
    title: "Marble & Steel Coffee Table",
    description: "White marble top with a powder-coated steel frame — clean and considered. 110cm × 60cm × 40cm.",
    vendor: "rawaa",
    price: 2400,
    tags: ["category-living-room","subcategory-coffee-tables","minimalist","neutral-warm","marble-stone","calm-quiet"],
  },
  {
    filename: "wood and marble coffee table.jpg",
    title: "Wood & Marble Coffee Table",
    description: "Bookmatched marble inlay set in a solid walnut frame. 120cm × 65cm × 42cm.",
    vendor: "rawaa",
    price: 1650,
    tags: ["category-living-room","subcategory-coffee-tables","contemporary","neutral-warm","marble-stone","open-airy"],
  },

  // SIDE TABLES
  {
    filename: "Atwood Side Table.jpg",
    title: "Atwood Side Table",
    description: "Compact solid wood side table with a lower shelf for storage. 45cm × 45cm × 58cm.",
    vendor: "loft",
    price: 680,
    tags: ["category-living-room","subcategory-side-tables","contemporary","neutral-warm","natural-wood","calm-quiet"],
  },
  {
    filename: "metal side table.jpg",
    title: "Noir Metal Side Table",
    description: "Powder-coated steel in matte black — minimal and versatile. 40cm × 40cm × 55cm.",
    vendor: "loft",
    price: 320,
    tags: ["category-living-room","subcategory-side-tables","minimalist","black-white","metal-glass","open-airy"],
  },
  {
    filename: "oak side table set.webp",
    title: "Oak Side Table Set (2-piece)",
    description: "A coordinated pair of solid oak side tables in two complementary heights. Tall: 50cm × 50cm × 65cm.",
    vendor: "rawaa",
    price: 980,
    tags: ["category-living-room","subcategory-side-tables","contemporary","earthy-tones","natural-wood","cozy-layered"],
  },

  // DÉCOR
  {
    filename: "abstract sculpture.jpg",
    title: "Sculptural Stone Object",
    description: "Hand-carved abstract form in natural limestone — every piece is unique. H28cm × W15cm.",
    vendor: "rawaa",
    price: 420,
    tags: ["category-living-room","saudi-heritage","earthy-tones","marble-stone","calm-quiet"],
  },
  {
    filename: "pottery accessories.webp",
    title: "Handmade Ceramic Set",
    description: "A trio of wheel-thrown ceramics in complementary earth tones — vase, bowl, and tray. Largest H22cm.",
    vendor: "rawaa",
    price: 280,
    tags: ["category-living-room","saudi-heritage","earthy-tones","marble-stone","cozy-layered"],
  },

  // DINING ROOM
  {
    filename: "wood and marble dining table.jpg",
    title: "Wood & Marble Dining Table",
    description: "Carrara marble top on solid turned wood legs. Seats 6. 180cm × 90cm × 75cm.",
    vendor: "rawaa",
    price: 3200,
    tags: ["category-dining-room","subcategory-dining-tables","contemporary","neutral-warm","marble-stone","open-airy"],
  },
  {
    filename: "dining chair.jpg",
    title: "Boucle Dining Chair",
    description: "Soft boucle seat on an ash wood frame — comfortable enough for long dinners. 52cm × 56cm × 88cm.",
    vendor: "loft",
    price: 390,
    tags: ["category-dining-room","subcategory-dining-chairs","minimalist","neutral-warm","natural-wood","calm-quiet"],
  },
  {
    filename: "dining chair wooden.webp",
    title: "Solid Oak Dining Chair",
    description: "Hand-finished solid oak with a contoured back for posture support. 50cm × 55cm × 92cm.",
    vendor: "rawaa",
    price: 460,
    tags: ["category-dining-room","subcategory-dining-chairs","contemporary","earthy-tones","natural-wood","open-airy"],
  },
  {
    filename: "wooden armchair.webp",
    title: "Wooden Dining Armchair",
    description: "Solid beech armchair with an upholstered seat — dining or accent use. 58cm × 60cm × 90cm.",
    vendor: "loft",
    price: 620,
    tags: ["category-dining-room","subcategory-dining-chairs","contemporary","earthy-tones","natural-wood","open-airy"],
  },

  // BEDROOM — BEDS
  {
    filename: "upholstered bed.webp",
    title: "Upholstered Platform Bed",
    description: "Low-profile platform bed in sage performance fabric with a padded headboard. King: 200cm × 200cm.",
    vendor: "rawaa",
    price: 3500,
    tags: ["category-bedroom","subcategory-beds","contemporary","neutral-warm","natural-wood","calm-quiet"],
  },
  {
    filename: "upholstered round bed.webp",
    title: "Velvet Round Bed",
    description: "A bold circular bed in deep velvet with a solid wood base — made to be the room. Diameter: 220cm.",
    vendor: "loft",
    price: 4800,
    tags: ["category-bedroom","subcategory-beds","warm-eclectic","bold-accents","natural-wood","bold-confident"],
  },
  {
    filename: "wooden bed.webp",
    title: "Solid Wood Bed Frame",
    description: "Chunky solid acacia construction with a slatted headboard — timeless and built to last. King: 200cm × 200cm.",
    vendor: "rawaa",
    price: 2800,
    tags: ["category-bedroom","subcategory-beds","contemporary","earthy-tones","natural-wood","cozy-layered"],
  },

  // BEDROOM — NIGHTSTANDS
  {
    filename: "rattan night stand.webp",
    title: "Rattan Nightstand",
    description: "Open-weave rattan body with a solid oak top and a single drawer. 50cm × 40cm × 55cm.",
    vendor: "rawaa",
    price: 580,
    tags: ["category-bedroom","subcategory-nightstands","warm-eclectic","earthy-tones","woven-rattan","cozy-layered"],
  },

  // BEDROOM — BEDDINGS
  {
    filename: "comfy mattress.jpg",
    title: "Cloud Comfort Mattress",
    description: "Medium-firm hybrid with a breathable knit cover and responsive foam core. 200cm × 180cm × 28cm.",
    vendor: "loft",
    price: 1100,
    tags: ["category-bedroom","subcategory-beddings","minimalist","neutral-warm","woven-rattan","calm-quiet"],
  },
  {
    filename: "mattress.jpg",
    title: "Pillow-Top Spring Mattress",
    description: "Pocket spring system with a plush pillow-top layer for pressure relief. 200cm × 180cm × 32cm.",
    vendor: "loft",
    price: 1400,
    tags: ["category-bedroom","subcategory-beddings","minimalist","neutral-warm","woven-rattan","calm-quiet"],
  },
  {
    filename: "mattress (2).jpg",
    title: "Ortho Support Mattress",
    description: "Firm orthopaedic mattress with zoned support and a cooling gel memory foam layer. 200cm × 180cm × 30cm.",
    vendor: "rawaa",
    price: 1800,
    tags: ["category-bedroom","subcategory-beddings","minimalist","neutral-warm","woven-rattan","calm-quiet"],
  },
  {
    filename: "duvet covers.webp",
    title: "Washed Linen Duvet Cover Set",
    description: "Pre-washed linen in warm oat — gets softer with every wash. Includes 2 pillowcases. King.",
    vendor: "rawaa",
    price: 340,
    tags: ["category-bedroom","subcategory-beddings","minimalist","neutral-warm","woven-rattan","calm-quiet"],
  },
  {
    filename: "duvet.jpg",
    title: "Cotton Cloud Duvet",
    description: "All-season hollow-fibre duvet with a 300-thread-count cotton shell. King: 240cm × 220cm.",
    vendor: "loft",
    price: 260,
    tags: ["category-bedroom","subcategory-beddings","minimalist","neutral-warm","woven-rattan","calm-quiet"],
  },

  // LIGHTING — FLOOR LAMPS
  {
    filename: "burgundy floor lamp.webp",
    title: "Burgundy Arc Floor Lamp",
    description: "Arching metal lamp in deep burgundy with a fabric shade — warm and theatrical. H170cm.",
    vendor: "rawaa",
    price: 890,
    tags: ["category-lighting","subcategory-floor-lamps","warm-eclectic","bold-accents","metal-glass","cozy-layered"],
  },
  {
    filename: "metal floor lamp.jpg",
    title: "Arc Metal Floor Lamp — Black",
    description: "Slender arching floor lamp in matte black — minimal presence, maximum reach. H165cm.",
    vendor: "loft",
    price: 760,
    tags: ["category-lighting","subcategory-floor-lamps","minimalist","black-white","metal-glass","open-airy"],
  },

  // LIGHTING — TABLE LAMPS
  {
    filename: "marble table lamp.jpg",
    title: "Marble Column Table Lamp",
    description: "Solid marble base with a white drum shade — cool, grounded, and tactile. H45cm × Ø25cm shade.",
    vendor: "rawaa",
    price: 420,
    tags: ["category-lighting","subcategory-table-lamps","contemporary","neutral-warm","marble-stone","calm-quiet"],
  },

  // LIGHTING — PENDANTS
  {
    filename: "modern chandilier.jpg",
    title: "Brass Cluster Chandelier",
    description: "Sculptural cluster of brushed brass orbs on adjustable cables. Ø65cm × adjustable drop.",
    vendor: "rawaa",
    price: 2200,
    tags: ["category-lighting","subcategory-pendants","contemporary","earthy-tones","metal-glass","bold-confident"],
  },
  {
    filename: "modern chandilier.webp",
    title: "Matte Black Chandelier",
    description: "Geometric matte black frame with exposed Edison bulbs. Ø60cm × H50cm.",
    vendor: "loft",
    price: 1900,
    tags: ["category-lighting","subcategory-pendants","minimalist","black-white","metal-glass","open-airy"],
  },
  {
    filename: "modern pending light.jpg",
    title: "Minimal Pendant Light",
    description: "Single spun metal dome in matte black on a braided cable. Ø28cm × H20cm.",
    vendor: "rawaa",
    price: 640,
    tags: ["category-lighting","subcategory-pendants","minimalist","black-white","metal-glass","calm-quiet"],
  },

  // LIGHTING — WALL LIGHTS
  {
    filename: "night shade wall lamp.webp",
    title: "Nightshade Wall Sconce",
    description: "Warm-toned metal sconce with a directional shade — ideal for reading corners. W18cm × H30cm.",
    vendor: "rawaa",
    price: 380,
    tags: ["category-lighting","subcategory-wall-lights","warm-eclectic","earthy-tones","metal-glass","cozy-layered"],
  },
  {
    filename: "wall lamp.webp",
    title: "Slim Wall Sconce",
    description: "Ultra-slim cylindrical sconce in brushed nickel — quietly architectural. W8cm × H25cm.",
    vendor: "loft",
    price: 290,
    tags: ["category-lighting","subcategory-wall-lights","minimalist","neutral-warm","metal-glass","calm-quiet"],
  },

  // RUGS
  {
    filename: "abstract rug.jpg",
    title: "Zafra Abstract Rug",
    description: "Hand-tufted abstract design in warm terracotta and off-white — each piece slightly unique. 200cm × 300cm.",
    vendor: "rawaa",
    price: 1200,
    tags: ["category-rugs","subcategory-hand-knotted","contemporary","earthy-tones","woven-rattan","cozy-layered"],
  },
  {
    filename: "abstract rug (2).jpg",
    title: "Zafra Abstract Rug — Slate",
    description: "The same abstract pattern in a cooler slate and ivory palette, machine-woven for durability. 200cm × 300cm.",
    vendor: "loft",
    price: 850,
    tags: ["category-rugs","subcategory-machine-made","minimalist","black-white","woven-rattan","calm-quiet"],
  },
  {
    filename: "colorful rug.jpg",
    title: "Layali Colourful Rug",
    description: "Flatweave in a hand-drawn multicolour pattern — playful and hard-wearing. 160cm × 230cm.",
    vendor: "loft",
    price: 680,
    tags: ["category-rugs","subcategory-machine-made","warm-eclectic","bold-accents","woven-rattan","cozy-layered"],
  },
];

// ── Shopify API call ───────────────────────────────────────────────────────
async function createProduct(product) {
  const imgPath = path.join(IMG_DIR, product.filename);
  if (!fs.existsSync(imgPath)) {
    throw new Error(`Image not found: ${imgPath}`);
  }
  const imgBase64 = fs.readFileSync(imgPath).toString("base64");

  const body = {
    product: {
      title: product.title,
      body_html: `<p>${product.description}</p>`,
      vendor: product.vendor,
      tags: product.tags.join(", "),
      variants: [{ price: product.price.toFixed(2) }],
      images: [{ attachment: imgBase64 }],
    },
  };

  const res = await fetch(
    `https://${DOMAIN}/admin/api/2024-01/products.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": TOKEN,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    const msg = typeof data.errors === "string"
      ? data.errors
      : JSON.stringify(data.errors);
    throw new Error(msg);
  }
  return data.product;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nCreating ${PRODUCTS.length} products in ${DOMAIN}...\n`);
  let ok = 0, fail = 0;

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    process.stdout.write(`[${i + 1}/${PRODUCTS.length}] ${p.title}... `);
    try {
      const created = await createProduct(p);
      console.log(`✓  /${created.handle}`);
      ok++;
    } catch (err) {
      console.log(`✗  ${err.message}`);
      fail++;
    }
    // Shopify REST API: 2 req/s per plan — 600ms gap keeps us safe
    if (i < PRODUCTS.length - 1) await new Promise((r) => setTimeout(r, 600));
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✓ ${ok} created   ✗ ${fail} failed`);
  console.log(`─────────────────────────────\n`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
