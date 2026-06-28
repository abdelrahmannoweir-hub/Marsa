import Link from "next/link";
import { getProducts, getProductsByTag } from "../src/lib/shopify";
import { BRAND } from "../src/config/brand";
import { SiteHeader } from "../src/components/SiteHeader";

// ── Room cards shown in "Shop by Room" ────────────────────────────────────────
const SHOP_BY_ROOM = [
  { slug: "living-room", label: "Living Room" },
  { slug: "bedroom",     label: "Bedroom" },
  { slug: "dining-room", label: "Dining Room" },
  { slug: "lighting",    label: "Lighting" },
  { slug: "rugs",        label: "Rugs" },
  { slug: "office",      label: "Home Office" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Home() {
  // Parallel fetch: general products + one product per room category (for images)
  const [generalRaw, ...roomProductsRaw] = await Promise.all([
    getProducts(),
    ...SHOP_BY_ROOM.map((r) => getProductsByTag(`tag:category-${r.slug}`)),
  ]);

  const allProducts = generalRaw.map(({ node }) => ({
    id:       node.id,
    title:    node.title,
    handle:   node.handle,
    vendor:   node.vendor,
    imageUrl: node.images.edges[0]?.node.url ?? null,
    price:    parseFloat(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
  }));

  // Room cards — image comes from first tagged product in that category
  const roomCards = SHOP_BY_ROOM.map((room, i) => ({
    ...room,
    imageUrl: roomProductsRaw[i]?.[0]?.node.images.edges[0]?.node.url ?? null,
  }));

  // Hero image: first living room product photo
  const heroImageUrl = roomProductsRaw[0]?.[0]?.node.images.edges[0]?.node.url ?? null;

  // Best sellers: first 6 products
  const bestSellers = allProducts.slice(0, 6);

  // In stock: next 6 (all our seeded products are available)
  const inStock = allProducts.slice(6, 12);

  // Design My Home teaser background: a bedroom product photo
  const designBgUrl = roomProductsRaw[1]?.[0]?.node.images.edges[0]?.node.url ?? null;

  // Your Style quiz teaser: a colourful/rug product photo
  const quizImageUrl = roomProductsRaw[4]?.[0]?.node.images.edges[0]?.node.url ?? null;

  return (
    <main style={{ fontFamily: "sans-serif", color: BRAND.colors.dark }}>
      <SiteHeader />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "2fr 3fr", minHeight: "88vh" }}>

        {/* Left — copy */}
        <div style={{
          background: "#FDFAF7", padding: "0 56px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "32px", height: "1px", background: BRAND.colors.terracotta }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: BRAND.colors.terracotta, fontWeight: 500 }}>
              New Collection · Summer 2025
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 3.6vw, 54px)", fontWeight: 700, lineHeight: 1.15, color: BRAND.colors.dark, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            {BRAND.tagline_en}
          </h1>
          <p style={{ fontSize: "18px", color: "#9A8880", direction: "rtl", textAlign: "right", margin: "0 0 12px", fontWeight: 400 }}>
            {BRAND.tagline_ar}
          </p>
          <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.65, margin: "0 0 40px", maxWidth: "320px" }}>
            Curated furniture and home accessories from Saudi and Egyptian designers — made to last.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/products" style={{ background: BRAND.colors.terracotta, color: "white", textDecoration: "none", padding: "14px 28px", borderRadius: "6px", fontSize: "13px", fontWeight: 500 }}>
              Shop the collection
            </Link>
            <Link href="/quiz" style={{ background: "transparent", color: BRAND.colors.dark, textDecoration: "none", padding: "14px 28px", border: `1.5px solid ${BRAND.colors.dark}`, borderRadius: "6px", fontSize: "13px", fontWeight: 500 }}>
              Take the style quiz →
            </Link>
          </div>
        </div>

        {/* Right — hero product image */}
        <div style={{ position: "relative", overflow: "hidden", background: "#E8DDD5" }}>
          {heroImageUrl ? (
            <img src={heroImageUrl} alt="Featured product" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #EDE5DC 0%, #D9CDBF 100%)" }} />
          )}
        </div>
      </section>

      {/* ── 2. SHOP BY ROOM ──────────────────────────────────────────────── */}
      <section style={{ padding: "64px 40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: BRAND.colors.dark, margin: 0, letterSpacing: "-0.01em" }}>
            Shop by Room
          </h2>
          <Link href="/products" style={{ fontSize: "13px", color: BRAND.colors.terracotta, textDecoration: "none", fontWeight: 500 }}>
            View all →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
          {roomCards.map((room) => (
            <Link
              key={room.slug}
              href={`/rooms/${room.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div style={{ borderRadius: "10px", overflow: "hidden", background: "#F0EBE5", position: "relative", aspectRatio: "3/4" }}>
                {room.imageUrl ? (
                  <img src={room.imageUrl} alt={room.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #E8DDD5 0%, #D5C9BF 100%)" }} />
                )}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(26,22,20,0.75) 0%, transparent 100%)",
                  padding: "24px 14px 14px",
                }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "white", margin: 0, letterSpacing: "0.01em" }}>
                    {room.label}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. BEST SELLERS ──────────────────────────────────────────────── */}
      <section style={{ padding: "0 40px 72px", background: "#FDFAF7" }}>
        <div style={{ paddingTop: "64px", display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: BRAND.colors.dark, margin: 0, letterSpacing: "-0.01em" }}>
            Best Sellers
          </h2>
          <Link href="/products" style={{ fontSize: "13px", color: BRAND.colors.terracotta, textDecoration: "none", fontWeight: 500 }}>
            Shop all →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "20px" }}>
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── 4. DESIGN MY HOME ────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px" }}>
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", background: "#1A1614" }}>
          {designBgUrl ? (
            <img src={designBgUrl} alt="Design My Home" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.6 }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#1A1614" }} />
          )}
        </div>
        {/* Copy */}
        <div style={{ background: BRAND.colors.dark, padding: "60px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND.colors.terracotta, margin: "0 0 16px" }}>
            Interactive Room Builder
          </p>
          <h2 style={{ fontSize: "clamp(24px, 2.8vw, 38px)", fontWeight: 700, color: "white", margin: "0 0 14px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Design your room,<br />piece by piece
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", margin: "0 0 32px", lineHeight: 1.65, maxWidth: "340px" }}>
            Pick a room, choose your pieces step by step, and add everything to cart in one click.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
            {[{ label: "Living Room", slug: "living-room" }, { label: "Bedroom", slug: "bedroom" }, { label: "Dining Room", slug: "dining-room" }, { label: "Office", slug: "office" }].map((r) => (
              <Link
                key={r.slug}
                href={`/design-my-home?room=${r.slug}`}
                style={{
                  padding: "6px 16px", borderRadius: "99px",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.7)", fontSize: "12px",
                  textDecoration: "none", fontWeight: 500,
                }}
              >
                {r.label}
              </Link>
            ))}
          </div>
          <Link
            href="/design-my-home"
            style={{
              display: "inline-block", alignSelf: "flex-start",
              background: BRAND.colors.terracotta, color: "white",
              textDecoration: "none", padding: "13px 28px",
              borderRadius: "6px", fontSize: "13px", fontWeight: 600,
            }}
          >
            Start designing →
          </Link>
        </div>
      </section>

      {/* ── 5. IN STOCK ──────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 40px 72px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: BRAND.colors.dark, margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              In Stock Now
            </h2>
            <p style={{ fontSize: "13px", color: "#AAA", margin: 0 }}>Ready to ship — no waiting</p>
          </div>
          <Link href="/products?inStock=true" style={{ fontSize: "13px", color: BRAND.colors.terracotta, textDecoration: "none", fontWeight: 500 }}>
            See all in-stock →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "20px" }}>
          {inStock.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── 6. YOUR STYLE ────────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "380px" }}>
        {/* Copy */}
        <div style={{ background: "#F5EDE5", padding: "60px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND.colors.terracotta, margin: "0 0 16px" }}>
            Style Quiz
          </p>
          <h2 style={{ fontSize: "clamp(24px, 2.8vw, 38px)", fontWeight: 700, color: BRAND.colors.dark, margin: "0 0 14px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            What's your<br />interior style?
          </h2>
          <p style={{ fontSize: "14px", color: "#888", margin: "0 0 32px", lineHeight: 1.65, maxWidth: "320px" }}>
            Answer 5 quick questions and we'll curate a personalised product selection just for you.
          </p>
          <Link
            href="/quiz"
            style={{
              display: "inline-block", alignSelf: "flex-start",
              background: BRAND.colors.dark, color: "white",
              textDecoration: "none", padding: "13px 28px",
              borderRadius: "6px", fontSize: "13px", fontWeight: 600,
            }}
          >
            Take the quiz →
          </Link>
        </div>
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", background: "#E8DDD5" }}>
          {quizImageUrl ? (
            <img src={quizImageUrl} alt="Style quiz" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #E8DDD5 0%, #CCBCB0 100%)" }} />
          )}
        </div>
      </section>

    </main>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({
  product,
}: {
  product: {
    id: string;
    title: string;
    handle: string;
    vendor: string;
    imageUrl: string | null;
    price: number;
    currency: string;
  };
}) {
  return (
    <Link href={`/products/${product.handle}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ background: "white", border: "1px solid #EEEAE5", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ aspectRatio: "1", background: "#F5F5F2", overflow: "hidden" }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#CCC", fontSize: "13px" }}>
              No image
            </div>
          )}
        </div>
        <div style={{ padding: "12px 14px 16px" }}>
          <p style={{ fontSize: "11px", color: "#AAA", margin: "0 0 4px" }}>{product.vendor}</p>
          <p style={{ fontSize: "14px", fontWeight: 500, color: BRAND.colors.dark, margin: "0 0 8px", lineHeight: 1.3 }}>{product.title}</p>
          <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>{product.price.toLocaleString()} {product.currency}</p>
        </div>
      </div>
    </Link>
  );
}
