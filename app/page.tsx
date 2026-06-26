import Link from "next/link";
import { getProducts } from "../src/lib/shopify";
import { BRAND } from "../src/config/brand";
import { SiteHeader } from "../src/components/SiteHeader";

export default async function Home() {
  const products = await getProducts();

  return (
    <main style={{ fontFamily: "sans-serif", color: "#1A1614" }}>

      <SiteHeader />

      {/* CAMPAIGN HERO */}
      <section style={{ display: "grid", gridTemplateColumns: "2fr 3fr", minHeight: "88vh" }}>

        {/* Left — editorial text */}
        <div style={{
          background: "#FDFAF7",
          padding: "0 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0",
        }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}>
            <div style={{ width: "32px", height: "1px", background: BRAND.colors.terracotta }} />
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: BRAND.colors.terracotta,
              fontWeight: 500,
            }}>
              New Collection · Summer 2025
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(36px, 3.6vw, 54px)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: BRAND.colors.dark,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}>
            {BRAND.tagline_en}
          </h1>

          {/* Arabic subline */}
          <p style={{
            fontSize: "18px",
            color: "#9A8880",
            direction: "rtl",
            textAlign: "right",
            margin: "0 0 12px",
            fontWeight: 400,
          }}>
            {BRAND.tagline_ar}
          </p>

          {/* Description */}
          <p style={{
            fontSize: "14px",
            color: "#888",
            lineHeight: 1.65,
            margin: "0 0 40px",
            maxWidth: "320px",
          }}>
            Curated furniture and home accessories from Saudi and Egyptian designers — made to last.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/products"
              style={{
                background: BRAND.colors.terracotta,
                color: "white",
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Shop the collection
            </Link>
            <Link
              href="/quiz"
              style={{
                background: "transparent",
                color: BRAND.colors.dark,
                textDecoration: "none",
                padding: "14px 28px",
                border: `1.5px solid ${BRAND.colors.dark}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Take the style quiz →
            </Link>
          </div>
        </div>

        {/* Right — hero image placeholder */}
        <div style={{
          background: "#E8DDD5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative grain texture feel */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #EDE5DC 0%, #D9CDBF 100%)",
          }} />
          <div style={{ position: "relative", textAlign: "center" }}>
            <div style={{
              width: "48px",
              height: "48px",
              border: "1.5px solid rgba(0,0,0,0.15)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "12px", margin: 0, letterSpacing: "0.06em" }}>
              Campaign lifestyle image
            </p>
          </div>
        </div>

      </section>

      {/* EDITORIAL MOOD BLOCKS */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* Block 1 — Dining */}
        <div style={{
          position: "relative",
          height: "68vh",
          background: "linear-gradient(160deg, #C9B5A0 0%, #A8917A 100%)",
          overflow: "hidden",
        }}>
          {/* Image placeholder icon */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{ textAlign: "center", opacity: 0.25 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p style={{ color: "white", fontSize: "11px", margin: "8px 0 0", letterSpacing: "0.06em" }}>
                Dining mood image
              </p>
            </div>
          </div>

          {/* Gradient scrim */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,22,20,0.75) 0%, rgba(26,22,20,0.1) 55%, transparent 100%)",
          }} />

          {/* Text */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "36px 40px",
            color: "white",
          }}>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              margin: "0 0 10px",
              fontWeight: 500,
            }}>
              Dining
            </p>
            <h2 style={{
              fontSize: "clamp(26px, 2.8vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
            }}>
              Lingering is encouraged.
            </h2>
            <p style={{
              fontSize: "13px",
              opacity: 0.75,
              margin: "0 0 22px",
              lineHeight: 1.5,
              maxWidth: "280px",
            }}>
              Dining spaces that make every meal an occasion worth staying for.
            </p>
            <Link
              href="/products"
              style={{
                color: "white",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
                borderBottom: "1px solid rgba(255,255,255,0.5)",
                paddingBottom: "2px",
              }}
            >
              Shop dining →
            </Link>
          </div>
        </div>

        {/* Block 2 — Living */}
        <div style={{
          position: "relative",
          height: "68vh",
          background: "linear-gradient(160deg, #B5C0B8 0%, #8D9E94 100%)",
          overflow: "hidden",
        }}>
          {/* Image placeholder icon */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{ textAlign: "center", opacity: 0.25 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p style={{ color: "white", fontSize: "11px", margin: "8px 0 0", letterSpacing: "0.06em" }}>
                Living room mood image
              </p>
            </div>
          </div>

          {/* Gradient scrim */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,22,20,0.75) 0%, rgba(26,22,20,0.1) 55%, transparent 100%)",
          }} />

          {/* Text */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "36px 40px",
            color: "white",
          }}>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              margin: "0 0 10px",
              fontWeight: 500,
            }}>
              Living Room
            </p>
            <h2 style={{
              fontSize: "clamp(26px, 2.8vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
            }}>
              Just, relax.
            </h2>
            <p style={{
              fontSize: "13px",
              opacity: 0.75,
              margin: "0 0 22px",
              lineHeight: 1.5,
              maxWidth: "280px",
            }}>
              Living rooms designed for real life — and the rare afternoon with nowhere to be.
            </p>
            <Link
              href="/products"
              style={{
                color: "white",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
                borderBottom: "1px solid rgba(255,255,255,0.5)",
                paddingBottom: "2px",
              }}
            >
              Shop living →
            </Link>
          </div>
        </div>

      </section>

      {/* PRODUCTS FROM SHOPIFY */}
      <section style={{ padding: "48px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Best Sellers</h2>
          <span style={{ fontSize: "13px", color: "var(--terracotta-dark)" }}>View all →</span>
        </div>
        {products.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>
            No products yet — add products in Shopify to see them here.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {products.map(({ node }: any) => (
              <div key={node.id} style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ background: "#f5f5f5", height: "180px" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "14px", margin: "0 0 6px", fontWeight: 500 }}>{node.title}</h3>
                  <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
                    {node.priceRange.minVariantPrice.amount} {node.priceRange.minVariantPrice.currencyCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AI QUIZ BAND */}
      <section style={{
        background: "var(--dark)", padding: "32px", display: "flex",
        justifyContent: "space-between", alignItems: "center", color: "#F2EDE4"
      }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 500 }}>AI Style Quiz</div>
          <div style={{ fontSize: "12px", opacity: 0.6 }}>Find your aesthetic in 6 questions</div>
        </div>
        <button style={{
          background: "var(--terracotta)", color: "white", border: "none",
          padding: "10px 20px", borderRadius: "6px", fontSize: "13px", cursor: "pointer"
        }}>
          Take the quiz →
        </button>
      </section>

      {/* B2B BAND */}
      <section style={{
        background: "var(--terracotta)", padding: "28px 32px", display: "flex",
        justifyContent: "space-between", alignItems: "center", color: "white"
      }}>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 500 }}>For design professionals</div>
          <div style={{ fontSize: "12px", opacity: 0.85 }}>Trade pricing · Bundle builder · Project tools</div>
        </div>
        <button style={{
          background: "white", color: "var(--terracotta-dark)", border: "none",
          padding: "10px 20px", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer"
        }}>
          Apply for trade
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "24px 32px", display: "flex", justifyContent: "space-between",
        borderTop: "1px solid #eee", fontSize: "12px", color: "#999"
      }}>
        <span>© {BRAND.name} · Riyadh, Saudi Arabia</span>
        <span>Instagram · Snapchat · عربي</span>
      </footer>

    </main>
  );
}