import { getProducts } from "../src/lib/shopify";
import { BRAND } from "../src/config/brand";
import { SiteHeader } from "../src/components/SiteHeader";

export default async function Home() {
  const products = await getProducts();

  return (
    <main style={{ fontFamily: "sans-serif", color: "#1A1614" }}>

      <SiteHeader />

      {/* HERO */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px" }}>
        <div style={{
          padding: "60px", display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "16px", borderRight: "1px solid #eee"
        }}>
          <div style={{ fontSize: "11px", color: "#999", letterSpacing: "0.05em" }}>
            SAUDI &amp; EGYPTIAN BRANDS · CURATED
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: 600, lineHeight: 1.2, margin: 0 }}>
            {BRAND.tagline_en}
          </h1>
          <div style={{ fontSize: "18px", color: "#777", direction: "rtl", textAlign: "right" }}>
            {BRAND.tagline_ar}
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <button style={{
              background: "var(--terracotta)", color: "white", border: "none",
              padding: "12px 24px", borderRadius: "6px", fontSize: "13px", cursor: "pointer"
            }}>
              Shop the collection
            </button>
            <button style={{
              background: "transparent", border: "1px solid #ccc",
              padding: "12px 24px", borderRadius: "6px", fontSize: "13px", cursor: "pointer"
            }}>
              Take the style quiz
            </button>
          </div>
        </div>
        <div style={{
          background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ color: "#aaa", fontSize: "13px" }}>Hero lifestyle image</span>
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