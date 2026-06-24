import { getProductByHandle } from "../../../src/lib/shopify";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return <main style={{ padding: "48px" }}>Product not found.</main>;
  }

  const price = product.variants.edges[0]?.node.price;

  return (
    <main style={{ fontFamily: "sans-serif", padding: "48px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
      <div style={{
        background: "#f5f5f5", height: "500px", borderRadius: "8px",
        backgroundImage: product.images.edges[0] ? `url(${product.images.edges[0].node.url})` : "none",
        backgroundSize: "cover", backgroundPosition: "center"
      }} />
      <div>
        <p style={{ fontSize: "12px", color: "#C4572E", marginBottom: "8px" }}>{product.vendor}</p>
        <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "12px" }}>{product.title}</h1>
        <p style={{ fontSize: "20px", marginBottom: "20px" }}>
          {price?.amount} {price?.currencyCode}
        </p>
        <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7, marginBottom: "24px" }}>
          {product.description}
        </p>
        <button style={{
          background: "#C4572E", color: "white", border: "none",
          padding: "14px 32px", borderRadius: "6px", fontSize: "14px", cursor: "pointer"
        }}>
          Add to cart
        </button>
      </div>
    </main>
  );
}