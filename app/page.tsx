import { getProducts } from "../src/lib/shopify";

export default async function Home() {
  const products = await getProducts();

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Marsa — Foundation Live ✅</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Shopify connected. Products found: {products.length}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map(({ node }: any) => (
          <div key={node.id} style={{ border: "1px solid #eee", padding: "16px" }}>
            <h3>{node.title}</h3>
            <p>{node.priceRange.minVariantPrice.amount} {node.priceRange.minVariantPrice.currencyCode}</p>
          </div>
        ))}
      </div>
    </main>
  );
}