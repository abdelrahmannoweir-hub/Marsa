"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../src/cart-context";
import { supabase } from "../../src/lib/supabase";
import { applyCartDiscountCode } from "../../src/lib/shopify";

const DESIGNER_DISCOUNT_CODE = "MARSA-TRADE";

export default function CartPage() {
  const { cart } = useCart();
  const [isDesigner, setIsDesigner] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.user_metadata?.role === "designer") setIsDesigner(true);
    });
  }, []);

  async function handleCheckout() {
    if (!cart) return;
    setCheckingOut(true);

    let checkoutUrl = cart.checkoutUrl;

    if (isDesigner) {
      const updated = await applyCartDiscountCode(cart.id, [
        DESIGNER_DISCOUNT_CODE,
      ]);
      if (updated?.checkoutUrl) checkoutUrl = updated.checkoutUrl;
    }

    window.location.href = checkoutUrl;
  }

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <main style={{ padding: "48px 32px", fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "16px" }}>
          Your Cart
        </h1>
        <p style={{ color: "#999" }}>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "48px 32px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>
        Your Cart
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {cart.lines.edges.map(({ node }: any) => (
          <div
            key={node.id}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#f5f5f5",
                borderRadius: "6px",
                backgroundImage: node.merchandise.product.images.edges[0]
                  ? `url(${node.merchandise.product.images.edges[0].node.url})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ flex: 1 }}>
              <p
                style={{ fontSize: "14px", fontWeight: 500, margin: "0 0 4px" }}
              >
                {node.merchandise.product.title}
              </p>
              <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
                Qty: {node.quantity}
              </p>
            </div>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {node.merchandise.price.amount} {node.merchandise.price.currencyCode}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #eee",
          paddingTop: "20px",
        }}
      >
        <div>
          <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
            Total: {cart.cost.totalAmount.amount}{" "}
            {cart.cost.totalAmount.currencyCode}
          </p>
          {isDesigner && (
            <p style={{ fontSize: "12px", color: "#C4572E", margin: "4px 0 0" }}>
              Designer discount will be applied at checkout
            </p>
          )}
        </div>
        <button
          onClick={handleCheckout}
          disabled={checkingOut}
          style={{
            background: "#C4572E",
            color: "white",
            border: "none",
            padding: "14px 32px",
            borderRadius: "6px",
            fontSize: "14px",
            cursor: checkingOut ? "not-allowed" : "pointer",
            opacity: checkingOut ? 0.7 : 1,
          }}
        >
          {checkingOut ? "Preparing checkout…" : "Proceed to checkout"}
        </button>
      </div>
    </main>
  );
}
