"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../cart-context";
import { BRAND } from "../config/brand";

type Props = {
  variantIds: string[];
  total: number;
  currency: string;
};

export function AddRoomToCart({ variantIds, total, currency }: Props) {
  const { addItem } = useCart();
  const [state, setState] = useState<"idle" | "adding" | "done">("idle");

  async function handleAddAll() {
    setState("adding");
    for (const id of variantIds) {
      await addItem(id);
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#2E7D32",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {variantIds.length} items added to cart
        </span>
        <Link
          href="/cart"
          style={{
            background: BRAND.colors.terracotta,
            color: "white",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          View cart →
        </Link>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddAll}
      disabled={state === "adding" || variantIds.length === 0}
      style={{
        background: variantIds.length === 0 ? "#CCC" : BRAND.colors.dark,
        color: "white",
        border: "none",
        padding: "15px 36px",
        borderRadius: "6px",
        fontSize: "15px",
        fontWeight: 500,
        cursor: state === "adding" || variantIds.length === 0 ? "default" : "pointer",
        letterSpacing: "0.02em",
        opacity: state === "adding" ? 0.7 : 1,
        transition: "opacity 0.15s",
      }}
    >
      {state === "adding"
        ? "Adding to cart…"
        : variantIds.length === 0
        ? "No items available"
        : `Add room to cart · ${currency} ${total.toLocaleString()}`}
    </button>
  );
}
