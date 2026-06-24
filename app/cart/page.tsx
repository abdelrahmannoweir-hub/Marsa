"use client";
import { useCart } from "../../src/cart-context";

export default function CartPage() {
  const { cart, loading } = useCart();

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <main style={{ padding: "48px 32px", fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "16px" }}>Your Cart</h1>
        <p style={{ color: "#999" }}>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "48px 32px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>Your Cart</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
        {cart.lines.edges.map(({ node }: any) => (
          <div key={node.id} style={{
            display: "flex", gap: "16px", alignItems: "center",
            border: "1px solid #eee", borderRadius: "8px", padding: "12px"
          }}>
            <div style={{
              width: "80px", height: "80px", background: "#f5f5f5", borderRadius: "6px",
              backgroundImage: node.merchandise.product.images.edges[0] ? `url(${node.merchandise.product.images.edges[0].node.url})` : "none",
              backgroundSize: "cover", backgroundPosition: "center"
            }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: 500, margin: "0 0 4px" }}>{node.merchandise.product.title}</p>
              <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>Qty: {node.quantity}</p>
            </div>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {node.merchandise.price.amount} {node.merchandise.price.currencyCode}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid #eee", paddingTop: "20px"
      }}>
        <p style={{ fontSize: "16px", fontWeight: 600 }}>
          Total: {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
        </p>
        <a href={cart.checkoutUrl}>
          <button style={{
            background: "#C4572E", color: "white", border: "none",
            padding: "14px 32px", borderRadius: "6px", fontSize: "14px", cursor: "pointer"
          }}>
            Proceed to checkout
          </button>
        </a>
      </div>
    </main>
  );
}