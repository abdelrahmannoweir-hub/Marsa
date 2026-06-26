import { notFound } from "next/navigation";
import Link from "next/link";
import { ROOM_CATEGORIES } from "../../../src/config/tags";
import { getProductsByTag } from "../../../src/lib/shopify";
import { BRAND } from "../../../src/config/brand";
import { SiteHeader } from "../../../src/components/SiteHeader";

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const sp = await searchParams;
  const activeSubcategory = typeof sp.subcategory === "string" ? sp.subcategory : undefined;

  const room = ROOM_CATEGORIES.find((r) => r.slug === category);
  if (!room) notFound();

  // Query Shopify for products in this room (optionally narrowed by subcategory)
  const tagQuery = activeSubcategory
    ? `tag:category-${category} AND tag:subcategory-${activeSubcategory}`
    : `tag:category-${category}`;

  const raw = await getProductsByTag(tagQuery);
  const products = raw.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    vendor: node.vendor,
    imageUrl: node.images.edges[0]?.node.url ?? "",
    price: node.priceRange.minVariantPrice.amount,
    currency: node.priceRange.minVariantPrice.currencyCode,
  }));

  const activeSub = room.subcategories.find((s) => s.slug === activeSubcategory);

  return (
    <>
      <SiteHeader />
      <main style={{ fontFamily: "sans-serif", minHeight: "100vh" }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "#FAFAF8",
            borderBottom: "1px solid #EEEAE5",
            padding: "48px 40px 40px",
          }}
        >
          {/* Breadcrumb */}
          <p style={{ fontSize: "12px", color: "#AAA", margin: "0 0 16px" }}>
            <Link href="/" style={{ color: "#AAA", textDecoration: "none" }}>Home</Link>
            {" / "}
            <Link href="/products" style={{ color: "#AAA", textDecoration: "none" }}>Furniture</Link>
            {" / "}
            <span style={{ color: BRAND.colors.dark }}>{room.label}</span>
            {activeSub && (
              <>
                {" / "}
                <span style={{ color: BRAND.colors.dark }}>{activeSub.label}</span>
              </>
            )}
          </p>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              color: BRAND.colors.dark,
              margin: "0 0 8px",
              letterSpacing: "-0.01em",
            }}
          >
            {activeSub ? activeSub.label : room.label}
          </h1>
          <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </section>

        {/* ── Subcategory pills ─────────────────────────────────────────────── */}
        <section
          style={{
            padding: "20px 40px",
            borderBottom: "1px solid #EEEAE5",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {/* "All" pill */}
          <PillLink
            href={`/rooms/${category}`}
            label="All"
            active={!activeSubcategory}
          />
          {room.subcategories.map((sub) => (
            <PillLink
              key={sub.slug}
              href={`/rooms/${category}?subcategory=${sub.slug}`}
              label={sub.label}
              active={activeSubcategory === sub.slug}
            />
          ))}
        </section>

        {/* ── Product grid ─────────────────────────────────────────────────── */}
        <section style={{ padding: "40px" }}>
          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#BBB",
              }}
            >
              <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                No products here yet.
              </p>
              <p style={{ fontSize: "13px" }}>
                Vendors are adding products — check back soon.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "24px",
              }}
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

// ── Pill link (server-renderable — no client state needed) ────────────────────

function PillLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "8px 18px",
        borderRadius: "99px",
        border: `1.5px solid ${active ? BRAND.colors.terracotta : "#DDD"}`,
        background: active ? BRAND.colors.terracotta : "white",
        color: active ? "white" : "#555",
        fontSize: "13px",
        fontWeight: active ? 600 : 400,
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "all 0.15s",
      }}
    >
      {label}
    </Link>
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
    imageUrl: string;
    price: string;
    currency: string;
  };
}) {
  return (
    <Link
      href={`/products/${product.handle}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #EEEAE5",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <div
          style={{
            aspectRatio: "1",
            background: "#F5F5F2",
            overflow: "hidden",
          }}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#CCC",
                fontSize: "13px",
              }}
            >
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px 18px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#AAA",
              margin: "0 0 4px",
              letterSpacing: "0.03em",
            }}
          >
            {product.vendor}
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: BRAND.colors.dark,
              margin: "0 0 8px",
              lineHeight: 1.35,
            }}
          >
            {product.title}
          </p>
          <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>
            {parseFloat(product.price).toLocaleString()} {product.currency}
          </p>
        </div>
      </div>
    </Link>
  );
}
