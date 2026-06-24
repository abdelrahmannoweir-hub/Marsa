import { getProductsByVendor } from "../../../src/lib/shopify";
import Link from "next/link";

export default async function BrandPage({ params }: { params: Promise<{ vendor: string }> }) {
  const { vendor } = await params;
  const vendorName = decodeURIComponent(vendor);
  const products = await getProductsByVendor(vendorName);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "48px 32px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>{vendorName}</h1>
      <p style={{ color: "#777", marginBottom: "24px" }}>{products.length} products</p>

      {products.length === 0 ? (
        <p style={{ color: "#999" }}>No products found for this brand.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {products.map(({ node }: any) => (
            <Link key={node.id} href={`/products/${node.handle}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{
                  background: "#f5f5f5", height: "180px",
                  backgroundImage: node.images.edges[0] ? `url(${node.images.edges[0].node.url})` : "none",
                  backgroundSize: "cover", backgroundPosition: "center"
                }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontSize: "14px", margin: "0 0 6px", fontWeight: 500 }}>{node.title}</h3>
                  <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
                    {node.priceRange.minVariantPrice.amount} {node.priceRange.minVariantPrice.currencyCode}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}