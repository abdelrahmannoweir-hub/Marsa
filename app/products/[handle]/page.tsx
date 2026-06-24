"use client";
import { useEffect, useState } from "react";
import { getProductByHandle } from "../../../src/lib/shopify";
import { useCart } from "../../../src/cart-context";

export default function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const [product, setProduct] = useState<any>(null);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    async function load() {
      const { handle } = await params;
      const data = await getProductByHandle(handle);
      setProduct(data);
    }
    load();
  }, [params]);

  if (!product) {
    return <main style={{ padding: "48px" }}>Loading...</main>;
  }

  const variant = product.variants.edges[0]?.node;
  const price = variant?.price;

  async function handleAddToCart() {
    if (!variant?.id) return;
    setAdding(true);
    await addItem(variant.id);
    setAdding(false);
  }

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
        <button
          onClick={handleAddToCart}
          disabled={adding}
          style={{
            background: "#C4572E", color: "white", border: "none",
            padding: "14px 32px", borderRadius: "6px", fontSize: "14px", cursor: "pointer",
            opacity: adding ? 0.6 : 1
          }}
        >
          {adding ? "Adding..." : "Add to cart"}
        </button>
      </div>
    </main>
  );
}