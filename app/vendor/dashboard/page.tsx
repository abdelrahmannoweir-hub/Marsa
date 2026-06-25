"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../src/lib/supabase";
import { getProductsByVendor } from "../../../src/lib/shopify";
import { BRAND } from "../../../src/config/brand";

type Stats = {
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
};

export default function VendorDashboard() {
  const router = useRouter();
  const [vendorName, setVendorName] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const [{ data: userData }, { data: sessionData }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession(),
      ]);

      const user = userData.user;
      const session = sessionData.session;

      if (!user || !session) {
        router.replace("/vendor/login");
        return;
      }

      const name = user.user_metadata?.vendor_name as string | undefined;
      if (!name) {
        router.replace("/vendor/login");
        return;
      }

      setVendorName(name);

      const [prods, statsRes] = await Promise.all([
        getProductsByVendor(name),
        fetch("/api/vendor/stats", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        }).then((r) => r.json()),
      ]);

      setProducts(prods);
      setStats(statsRes);
      setLoading(false);
    }
    init();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/vendor/login");
  }

  if (loading) {
    return (
      <main style={{ fontFamily: "sans-serif", padding: "32px" }}>
        <p style={{ color: "#999" }}>Loading…</p>
      </main>
    );
  }

  const statCards = [
    { value: products.length, label: "Total Products" },
    { value: stats?.totalOrders ?? "—", label: "Total Orders" },
    {
      value:
        stats != null ? `${stats.revenue.toFixed(2)} SAR` : "—",
      label: "Revenue",
    },
    { value: stats?.pendingOrders ?? "—", label: "Pending Orders" },
  ];

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "32px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>
            Vendor Dashboard
          </p>
          <h1 style={{ fontSize: "24px", fontWeight: 600, margin: 0 }}>
            {vendorName}
          </h1>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            href="/vendor/dashboard/add-product"
            style={{
              background: BRAND.colors.terracotta,
              color: "white",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "13px",
            }}
          >
            + Add Product
          </Link>
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
      </div>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {statCards.map(({ value, label }) => (
          <div
            key={label}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: label === "Revenue" ? "18px" : "28px",
                fontWeight: 600,
                margin: "0 0 4px",
              }}
            >
              {value}
            </p>
            <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* PRODUCTS LIST */}
      <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
        Your Products
      </h2>

      {products.length === 0 ? (
        <p style={{ color: "#999" }}>
          No products yet.{" "}
          <Link
            href="/vendor/dashboard/add-product"
            style={{ color: BRAND.colors.terracotta }}
          >
            Add your first product
          </Link>
          .
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 100px 80px",
              gap: "16px",
              padding: "0 12px",
              fontSize: "11px",
              color: "#999",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <div />
            <div>Product</div>
            <div style={{ textAlign: "right" }}>Price</div>
            <div style={{ textAlign: "right" }}>Stock</div>
          </div>

          {products.map(({ node }: any) => {
            const qty = node.variants?.edges?.[0]?.node?.quantityAvailable;
            return (
              <div
                key={node.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 100px 80px",
                  alignItems: "center",
                  gap: "16px",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#f5f5f5",
                    borderRadius: "6px",
                    backgroundImage: node.images.edges[0]
                      ? `url(${node.images.edges[0].node.url})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      margin: "0 0 2px",
                    }}
                  >
                    {node.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
                    {node.handle}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    textAlign: "right",
                    margin: 0,
                  }}
                >
                  {node.priceRange.minVariantPrice.amount}{" "}
                  {node.priceRange.minVariantPrice.currencyCode}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "right",
                    margin: 0,
                    color:
                      qty === 0
                        ? "#e53e3e"
                        : qty == null
                        ? "#999"
                        : "inherit",
                  }}
                >
                  {qty == null ? "—" : qty === 0 ? "Out" : qty}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
