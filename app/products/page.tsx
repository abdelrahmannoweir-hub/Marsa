import Link from "next/link";
import { SiteHeader } from "../../src/components/SiteHeader";
import { FilterSidebar } from "../../src/components/FilterSidebar";
import { getFilteredProducts, getProducts } from "../../src/lib/shopify";
import { ROOM_CATEGORIES } from "../../src/config/tags";
import { BRAND } from "../../src/config/brand";

// ── Helpers ───────────────────────────────────────────────────────────────────

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function buildQuery(f: {
  category?: string;
  subcategory?: string;
  style?: string;
  material?: string;
  color?: string;
  brand?: string;
  inStock?: boolean;
}): string {
  const parts: string[] = [];
  if (f.category)    parts.push(`tag:category-${f.category}`);
  if (f.subcategory) parts.push(`tag:subcategory-${f.subcategory}`);
  if (f.style)       parts.push(`tag:${f.style}`);
  if (f.material)    parts.push(`tag:${f.material}`);
  if (f.color)       parts.push(`tag:${f.color}`);
  if (f.brand)       parts.push(`vendor:"${f.brand}"`);
  if (f.inStock)     parts.push(`available_for_sale:true`);
  return parts.join(" AND ");
}

function parseSortKey(sort?: string): { sortKey: string; reverse: boolean } {
  if (sort === "price-asc")  return { sortKey: "PRICE",      reverse: false };
  if (sort === "price-desc") return { sortKey: "PRICE",      reverse: true  };
  if (sort === "newest")     return { sortKey: "CREATED_AT", reverse: true  };
  return                            { sortKey: "RELEVANCE",  reverse: false };
}

// Remove one key from current search params → URL string for active-filter chips
function urlWithout(sp: Record<string, string>, removeKey: string): string {
  const params = new URLSearchParams();
  Object.entries(sp).forEach(([k, v]) => { if (k !== removeKey) params.set(k, v); });
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  const category   = str(sp.category);
  const subcategory = str(sp.subcategory);
  const style      = str(sp.style);
  const material   = str(sp.material);
  const color      = str(sp.color);
  const brand      = str(sp.brand);
  const sort       = str(sp.sort);
  const inStock    = sp.inStock === "true";

  const { sortKey, reverse } = parseSortKey(sort);
  const query = buildQuery({ category, subcategory, style, material, color, brand, inStock });

  // Run both fetches in parallel
  const [filteredRaw, allRaw] = await Promise.all([
    getFilteredProducts({ query, sortKey, reverse }),
    getProducts(),
  ]);

  const products = filteredRaw.map(({ node }) => ({
    id:       node.id,
    title:    node.title,
    handle:   node.handle,
    vendor:   node.vendor,
    imageUrl: node.images.edges[0]?.node.url ?? "",
    price:    node.priceRange.minVariantPrice.amount,
    currency: node.priceRange.minVariantPrice.currencyCode,
  }));

  // Unique vendors from ALL products (not filtered) so brand list never disappears
  const brands = [...new Set((allRaw as any[]).map(({ node }) => node.vendor as string))]
    .filter(Boolean)
    .sort();

  // Active filter chips — stringified params (single values only)
  const stringifiedSp: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") stringifiedSp[k] = v;
  }

  type Chip = { key: string; label: string; removeUrl: string };
  const chips: Chip[] = [];

  if (category) {
    const roomLabel = ROOM_CATEGORIES.find((r) => r.slug === category)?.label ?? category;
    chips.push({ key: "category", label: roomLabel, removeUrl: urlWithout(stringifiedSp, "category") });
  }
  if (subcategory) {
    const room = ROOM_CATEGORIES.find((r) => r.slug === category);
    const subLabel = room?.subcategories.find((s) => s.slug === subcategory)?.label ?? subcategory;
    chips.push({ key: "subcategory", label: subLabel, removeUrl: urlWithout(stringifiedSp, "subcategory") });
  }
  if (style)    chips.push({ key: "style",    label: style,    removeUrl: urlWithout(stringifiedSp, "style") });
  if (material) chips.push({ key: "material", label: material, removeUrl: urlWithout(stringifiedSp, "material") });
  if (color)    chips.push({ key: "color",    label: color,    removeUrl: urlWithout(stringifiedSp, "color") });
  if (brand)    chips.push({ key: "brand",    label: brand,    removeUrl: urlWithout(stringifiedSp, "brand") });
  if (inStock)  chips.push({ key: "inStock",  label: "In stock", removeUrl: urlWithout(stringifiedSp, "inStock") });

  return (
    <>
      <SiteHeader />
      <div style={{ display: "flex", fontFamily: "sans-serif", minHeight: "100vh" }}>

        {/* ── Filter sidebar ─────────────────────────────────────────────── */}
        <FilterSidebar brands={brands} />

        {/* ── Main content ───────────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, padding: "32px 36px 60px" }}>

          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: BRAND.colors.dark,
                margin: 0,
              }}
            >
              {category
                ? ROOM_CATEGORIES.find((r) => r.slug === category)?.label ?? "Products"
                : "All Products"}
            </h1>
            <span style={{ fontSize: "13px", color: "#AAA" }}>
              {products.length} product{products.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Active filter chips */}
          {chips.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {chips.map((chip) => (
                <Link
                  key={chip.key}
                  href={chip.removeUrl}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "99px",
                    border: `1px solid ${BRAND.colors.terracotta}`,
                    color: BRAND.colors.terracotta,
                    fontSize: "12px",
                    textDecoration: "none",
                    background: "#FFF5F2",
                  }}
                >
                  {chip.label}
                  <span style={{ fontWeight: 700, opacity: 0.7 }}>×</span>
                </Link>
              ))}
              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "5px 12px",
                  borderRadius: "99px",
                  border: "1px solid #DDD",
                  color: "#888",
                  fontSize: "12px",
                  textDecoration: "none",
                }}
              >
                Clear all
              </Link>
            </div>
          )}

          {/* Product grid */}
          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#BBB",
              }}
            >
              <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                No products match these filters.
              </p>
              <Link
                href="/products"
                style={{
                  fontSize: "13px",
                  color: BRAND.colors.terracotta,
                  textDecoration: "none",
                }}
              >
                Clear filters →
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: "20px",
              }}
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
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

        <div style={{ padding: "12px 14px 16px" }}>
          <p style={{ fontSize: "11px", color: "#AAA", margin: "0 0 4px" }}>
            {product.vendor}
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: BRAND.colors.dark,
              margin: "0 0 8px",
              lineHeight: 1.3,
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
