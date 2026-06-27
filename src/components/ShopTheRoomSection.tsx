import Link from "next/link";
import { getRooms } from "../lib/supabase";
import { getProductByHandle } from "../lib/shopify";
import { BRAND } from "../config/brand";

const IMAGE_PLACEHOLDER = (
  <div style={{
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3,
  }}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.dark} strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  </div>
);

export async function ShopTheRoomSection() {
  const rooms = await getRooms();

  return (
    <section style={{ padding: "80px 40px", background: "#FDFAF7" }}>

      {/* Section header */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "40px",
      }}>
        <div>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: BRAND.colors.terracotta,
            fontWeight: 500,
            margin: "0 0 8px",
          }}>
            Curated spaces
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 2.8vw, 38px)",
            fontWeight: 700,
            margin: 0,
            color: BRAND.colors.dark,
            letterSpacing: "-0.02em",
          }}>
            Shop the room
          </h2>
        </div>
      </div>

      {rooms.length === 0 ? (
        <p style={{ color: "#AAA", fontSize: "14px" }}>
          No curated rooms yet — add rows to the <code>rooms</code> table in Supabase to populate this section.
        </p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "28px",
        }}>
          {await Promise.all(rooms.slice(0, 4).map(async (room) => {
            const products = (
              await Promise.all(room.product_handles.map((h) => getProductByHandle(h)))
            ).filter(Boolean);

            const total = products.reduce((sum, p) => {
              return sum + parseFloat(p?.variants?.edges?.[0]?.node?.price?.amount ?? "0");
            }, 0);
            const currency = products[0]?.variants?.edges?.[0]?.node?.price?.currencyCode ?? "SAR";

            return (
              <div
                key={room.slug}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #EEE9E4",
                }}
              >
                {/* Photo area */}
                <div style={{
                  position: "relative",
                  height: "400px",
                  background: room.image_url
                    ? `url(${room.image_url}) center/cover no-repeat`
                    : "linear-gradient(135deg, #E8DDD5 0%, #D4C8BD 100%)",
                  overflow: "hidden",
                }}>
                  {!room.image_url && IMAGE_PLACEHOLDER}

                  {/* Hotspot dots */}
                  {room.hotspots.map(({ n, x, y }) => (
                    <div
                      key={n}
                      style={{
                        position: "absolute",
                        top: `${y}%`,
                        left: `${x}%`,
                        transform: "translate(-50%, -50%)",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "white",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: BRAND.colors.dark,
                        cursor: "default",
                      }}
                    >
                      {n}
                    </div>
                  ))}

                  {/* Room label badge */}
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "6px",
                    padding: "5px 12px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: BRAND.colors.dark,
                    letterSpacing: "0.04em",
                  }}>
                    {room.title}
                  </div>
                </div>

                {/* Card footer */}
                <div style={{
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}>
                  <div>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      margin: "0 0 4px",
                      color: BRAND.colors.dark,
                    }}>
                      {room.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
                      {products.length} {products.length === 1 ? "piece" : "pieces"}
                      {total > 0 && (
                        <span> · Complete look from {currency} {total.toLocaleString()}</span>
                      )}
                    </p>
                  </div>
                  <Link
                    href={`/look/${room.slug}`}
                    style={{
                      background: BRAND.colors.dark,
                      color: "white",
                      textDecoration: "none",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Shop this room
                  </Link>
                </div>
              </div>
            );
          }))}
        </div>
      )}
    </section>
  );
}
