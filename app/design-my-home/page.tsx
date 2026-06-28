import { SiteHeader } from "../../src/components/SiteHeader";
import { RoomBuilder } from "../../src/components/RoomBuilder";
import { getProductsByTag } from "../../src/lib/shopify";
import { DESIGN_ROOM_STEPS, DESIGN_ROOM_META } from "../../src/config/homepage";

export default async function DesignMyHomePage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const { room } = await searchParams;
  const roomSlug = room && DESIGN_ROOM_STEPS[room] ? room : "living-room";
  const steps = DESIGN_ROOM_STEPS[roomSlug];

  // Fetch up to 4 products for every step in parallel, server-side
  const stepProducts = await Promise.all(
    steps.map(async (step) => {
      const raw = await getProductsByTag(step.tagQuery);
      return raw.slice(0, 4).map(({ node }) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        vendor: node.vendor,
        imageUrl: node.images.edges[0]?.node.url ?? null,
        price: parseFloat(node.priceRange.minVariantPrice.amount),
        currency: node.priceRange.minVariantPrice.currencyCode,
        variantId: node.variants.edges[0]?.node.id ?? null,
      }));
    })
  );

  // Only pass steps that have at least one product
  const hydratedSteps = steps
    .map((step, i) => ({ ...step, products: stepProducts[i] }))
    .filter((step) => step.products.length > 0);

  return (
    <main style={{ fontFamily: "sans-serif", color: "#1A1614" }}>
      <SiteHeader />

      {/* ── Design consultation banner ───────────────────────────────────── */}
      <section style={{
        background: "#1A1614",
        padding: "52px 40px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: "40px",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(196,87,46,0.2)", borderRadius: "4px",
            padding: "4px 12px", marginBottom: "16px",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4572E" }}>
              Free Design Consultation
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 2.8vw, 38px)",
            fontWeight: 700,
            color: "white",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}>
            Let our designers do it for you
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", margin: "0 0 8px", lineHeight: 1.6, maxWidth: "480px" }}>
            Share your room dimensions and we'll deliver a fully-sourced room plan — furniture, lighting, rugs and all.
            Prices start from <strong style={{ color: "white" }}>SAR 150 per m²</strong>.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>
            Includes 3 revision rounds · Sourced entirely from the Marsa catalogue
          </p>
          <a
            href="mailto:design@marsa.sa?subject=Design Consultation Request"
            style={{
              display: "inline-block",
              background: "#C4572E",
              color: "white",
              textDecoration: "none",
              padding: "13px 28px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            Get in touch →
          </a>
        </div>

        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: "0 0 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Or</p>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0 }}>Design it yourself below ↓</p>
        </div>
      </section>

      <RoomBuilder
        roomSlug={roomSlug}
        roomMeta={DESIGN_ROOM_META}
        steps={hydratedSteps}
      />
    </main>
  );
}
