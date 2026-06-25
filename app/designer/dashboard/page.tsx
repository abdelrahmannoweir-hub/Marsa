"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../src/lib/supabase";
import { BRAND } from "../../../src/config/brand";

export default function DesignerDashboard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.user_metadata?.role !== "designer") {
        router.replace("/designer/login");
        return;
      }

      setName(user.user_metadata.full_name || user.email || "Designer");
      setDiscount(Number(user.user_metadata.trade_discount ?? 20));
      setLoading(false);
    }
    init();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/designer/login");
  }

  if (loading) {
    return (
      <main style={{ fontFamily: "sans-serif", padding: "32px" }}>
        <p style={{ color: "#999" }}>Loading…</p>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "32px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>
            Designer Portal
          </p>
          <h1 style={{ fontSize: "24px", fontWeight: 600, margin: 0 }}>
            Welcome, {name}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "#666",
            border: "1px solid #ddd",
            padding: "10px 20px",
            borderRadius: "6px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>

      {/* TRADE DISCOUNT CARD */}
      <div
        style={{
          background: "#FFF5F2",
          border: `1px solid ${BRAND.colors.terracotta}`,
          borderRadius: "12px",
          padding: "28px 32px",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: BRAND.colors.terracotta,
            lineHeight: 1,
          }}
        >
          {discount}%
        </div>
        <div>
          <p style={{ fontWeight: 600, margin: "0 0 4px" }}>
            Trade Discount — Active
          </p>
          <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
            Your discount is automatically shown on product pages and applied at
            checkout when you&apos;re logged in.
          </p>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Link
          href="/products"
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "24px",
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <p style={{ fontSize: "20px", marginBottom: "8px" }}>🪑</p>
          <p style={{ fontWeight: 600, margin: "0 0 4px" }}>Browse Products</p>
          <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
            Your trade price is displayed on every product
          </p>
        </Link>

        <Link
          href="/bundles"
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "24px",
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <p style={{ fontSize: "20px", marginBottom: "8px" }}>📦</p>
          <p style={{ fontWeight: 600, margin: "0 0 4px" }}>Bundle Builder</p>
          <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
            Assemble a project package and request a quote
          </p>
        </Link>
      </div>
    </main>
  );
}
