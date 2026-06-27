import { notFound } from "next/navigation";
import Link from "next/link";
import { getRoomBySlug } from "../../../src/lib/supabase";
import { getProductByHandle } from "../../../src/lib/shopify";
import { SiteHeader } from "../../../src/components/SiteHeader";
import { AddRoomToCart } from "../../../src/components/AddRoomToCart";
import { BRAND } from "../../../src/config/brand";

export default async function RoomLookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) notFound();

  const products = (
    await Promise.all(room.product_handles.map((h) => getProductByHandle(h)))
  ).filter(Boolean);

  const total = products.reduce((sum, p) => {
    return sum + parseFloat(p?.variants?.edges?.[0]?.node?.price?.amount ?? "0");
  }, 0);
  const currency = products[0]?.variants?.edges?.[0]?.node?.price?.currencyCode ?? "SAR";

  const variantIds = products
    .map((p) => p?.variants?.edges?.[0]?.node?.id)
    .filter((id): id is string => Boolean(id));

  return (
    <main style={{ fontFamily: "sans-serif", color: BRAND.colors.dark, background: "#FDFAF7", minHeight: "100vh" }}>
      <SiteHeader />

      {/* Breadcrumb */}
      <div style={{ padding: "20px 40px 0" }}>
        <Link
          href="/#shop-the-room"
          style={{
            fontSize: "13px",
            color: "#999",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Curated rooms
        </Link>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 40px 80px" }}>

        {/* Page header */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: BRAND.colors.terracotta,
            fontWeight: 500,
            margin: "0 0 10px",
          }}>
            Curated look
          </p>
          <h1 style={{
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 700,
            margin: "0 0 10px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}>
            {room.title}
          </h1>
          <p style={{ fontSize: "14px", color: "#999", margin: 0 }}>
            {products.length} {products.length === 1 ? "piece" : "pieces"}
            {total > 0 && <span> · Complete look from {currency} {total.toLocaleString()}</span>}
          </p>
        </div>

        {/* Two-col layout: image left, products right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}>

          {/* Left — room image with hotspot overlay */}
          <div style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            aspectRatio: "4/3",
            background: room.image_url
              ? `url(${room.image_url}) center/cover no-repeat`
              : "linear-gradient(135deg, #E8DDD5 0%, #D4C8BD 100%)",
            border: "1px solid #EEE9E4",
          }}>
            {!room.image_url && (
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: 0.3,
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.dark} strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p style={{ fontSize: "12px", margin: 0, letterSpacing: "0.06em" }}>Room image</p>
              </div>
            )}

            {/* Hotspot dots */}
            {room.hotspots.map(({ n, x, y }) => (
              <div
                key={n}
                title={products[n - 1]?.title}
                style={{
                  position: "absolute",
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: "translate(-50%, -50%)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "white",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: BRAND.colors.dark,
                  zIndex: 1,
                }}
              >
                {n}
              </div>
            ))}
          </div>

          {/* Right — product list + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

            {/* Product rows */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              marginBottom: "32px",
              border: "1px solid #EEE9E4",
              borderRadius: "12px",
              overflow: "hidden",
              background: "white",
            }}>
              {products.map((product, i) => {
                const imageUrl = product?.images?.edges?.[0]?.node?.url;
                const price = product?.variants?.edges?.[0]?.node?.price;
                return (
                  <div
                    key={product?.handle ?? i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "20px 24px",
                      borderBottom: i < products.length - 1 ? "1px solid #F0EBE5" : "none",
                    }}
                  >
                    {/* Number badge */}
                    <div style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "#F0EBE5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: BRAND.colors.dark,
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>

                    {/* Product image */}
                    <div style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#F5F0EC",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product?.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5B8B0" strokeWidth="1.2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      )}
                    </div>

                    {/* Title + vendor */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        margin: "0 0 3px",
                        color: BRAND.colors.dark,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {product?.title}
                      </p>
                      {product?.vendor && (
                        <p style={{
                          fontSize: "11px",
                          color: BRAND.colors.terracotta,
                          margin: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          fontWeight: 500,
                        }}>
                          {product.vendor}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    {price && (
                      <p style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: BRAND.colors.dark,
                        margin: 0,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}>
                        {price.currencyCode} {parseFloat(price.amount).toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total row */}
            {total > 0 && (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 4px 24px",
                borderBottom: "1px solid #EEE9E4",
                marginBottom: "28px",
              }}>
                <span style={{ fontSize: "14px", color: "#999" }}>Complete look total</span>
                <span style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: BRAND.colors.dark,
                  letterSpacing: "-0.01em",
                }}>
                  {currency} {total.toLocaleString()}
                </span>
              </div>
            )}

            {/* Add all to cart */}
            <AddRoomToCart
              variantIds={variantIds}
              total={total}
              currency={currency}
            />

          </div>
        </div>
      </div>
    </main>
  );
}
