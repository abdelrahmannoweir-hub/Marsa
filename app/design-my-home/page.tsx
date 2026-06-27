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
      <RoomBuilder
        roomSlug={roomSlug}
        roomMeta={DESIGN_ROOM_META}
        steps={hydratedSteps}
      />
    </main>
  );
}
