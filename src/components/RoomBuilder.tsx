"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../cart-context";
import { BRAND } from "../config/brand";

type Product = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  imageUrl: string | null;
  price: number;
  currency: string;
  variantId: string | null;
};

type Step = {
  label: string;
  tagQuery: string;
  products: Product[];
};

type Props = {
  roomSlug: string;
  roomMeta: Record<string, { label: string; desc: string }>;
  steps: Step[];
};

const ROOM_SLUGS = ["living-room", "bedroom", "dining-room", "office"];

function ImagePlaceholder() {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#F0EBE5",
    }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5B8B0" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

export function RoomBuilder({ roomSlug, roomMeta, steps }: Props) {
  const { addItem } = useCart();
  const [selections, setSelections] = useState<Record<number, Product>>({});
  const [cartState, setCartState] = useState<"idle" | "adding" | "done">("idle");

  const roomLabel = roomMeta[roomSlug]?.label ?? roomSlug;

  function isUnlocked(stepIndex: number): boolean {
    for (let j = 0; j < stepIndex; j++) {
      if (!selections[j]) return false;
    }
    return true;
  }

  function selectProduct(stepIndex: number, product: Product) {
    setSelections((prev) => ({ ...prev, [stepIndex]: product }));
    setCartState("idle");
  }

  function changeStep(stepIndex: number) {
    setSelections((prev) => {
      const next = { ...prev };
      for (let j = stepIndex; j < steps.length; j++) delete next[j];
      return next;
    });
    setCartState("idle");
  }

  async function addAllToCart() {
    const variantIds = Object.values(selections)
      .map((p) => p.variantId)
      .filter((id): id is string => Boolean(id));
    if (!variantIds.length) return;
    setCartState("adding");
    for (const id of variantIds) await addItem(id);
    setCartState("done");
  }

  const selectedList = Object.values(selections);
  const total = selectedList.reduce((s, p) => s + p.price, 0);
  const currency = selectedList[0]?.currency ?? "SAR";
  const allDone = steps.length > 0 && selectedList.length === steps.length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: "calc(100vh - 72px)" }}>

      {/* ── Left panel: sticky summary ── */}
      <aside style={{
        background: BRAND.colors.dark,
        position: "sticky",
        top: 0,
        height: "calc(100vh - 72px)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "40px 28px",
      }}>

        {/* Room name */}
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>
          Designing your
        </p>
        <h2 style={{ fontSize: "21px", fontWeight: 700, color: "white", margin: "0 0 32px", letterSpacing: "-0.01em" }}>
          {roomLabel}
        </h2>

        {/* Step summary rows */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => {
            const sel = selections[i];
            return (
              <div key={i} style={{ padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  fontWeight: 600,
                  margin: "0 0 3px",
                  color: sel ? BRAND.colors.terracotta : "rgba(255,255,255,0.28)",
                }}>
                  {step.label}
                </p>
                {sel ? (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                    <p style={{ fontSize: "13px", color: "white", margin: 0, lineHeight: 1.3, flex: 1 }}>
                      {sel.title}
                    </p>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", fontWeight: 600, flexShrink: 0 }}>
                      {sel.currency} {sel.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: 0, fontStyle: "italic" }}>
                    Not chosen yet
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Total + CTA */}
        {selectedList.length > 0 && (
          <div style={{ paddingTop: "24px", marginTop: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Running total</span>
              <span style={{ fontSize: "19px", fontWeight: 700, color: "white", letterSpacing: "-0.01em" }}>
                {currency} {total.toLocaleString()}
              </span>
            </div>

            {cartState === "done" ? (
              <Link
                href="/cart"
                style={{
                  display: "block", textAlign: "center",
                  background: BRAND.colors.terracotta, color: "white",
                  textDecoration: "none", padding: "13px",
                  borderRadius: "6px", fontSize: "13px", fontWeight: 600,
                }}
              >
                View cart →
              </Link>
            ) : (
              <button
                onClick={addAllToCart}
                disabled={cartState === "adding"}
                style={{
                  width: "100%",
                  background: cartState === "adding" ? "rgba(255,255,255,0.15)" : BRAND.colors.terracotta,
                  color: "white", border: "none",
                  padding: "13px", borderRadius: "6px",
                  fontSize: "13px", fontWeight: 600,
                  cursor: cartState === "adding" ? "wait" : "pointer",
                  letterSpacing: "0.01em",
                }}
              >
                {cartState === "adding" ? "Adding…" : "Add room to cart"}
              </button>
            )}
          </div>
        )}
      </aside>

      {/* ── Right panel: step picker ── */}
      <div style={{ padding: "48px 52px 80px", background: "#FDFAF7" }}>

        {/* Room switcher pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "52px" }}>
          {ROOM_SLUGS.map((slug) => {
            const meta = roomMeta[slug];
            const active = slug === roomSlug;
            return (
              <Link
                key={slug}
                href={`/design-my-home?room=${slug}`}
                style={{
                  padding: "7px 18px",
                  borderRadius: "99px",
                  border: `1.5px solid ${active ? BRAND.colors.dark : "#DDD"}`,
                  background: active ? BRAND.colors.dark : "white",
                  color: active ? "white" : "#666",
                  fontSize: "13px", fontWeight: 500,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {meta?.label ?? slug}
              </Link>
            );
          })}
        </div>

        {/* Empty state when no products are tagged for this room */}
        {steps.length === 0 && (
          <div style={{ padding: "40px 0", color: "#AAA", fontSize: "14px" }}>
            No products tagged for this room yet. Tag products in Shopify with
            subcategory tags (e.g. <code>subcategory-sofas</code>) to populate this page.
          </div>
        )}

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
          {steps.map((step, i) => {
            if (!isUnlocked(i)) return null;
            const sel = selections[i];
            const done = Boolean(sel);

            return (
              <div key={i}>
                {/* Step header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: done ? "14px" : "24px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                    background: done ? BRAND.colors.terracotta : BRAND.colors.dark,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {done ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>{i + 1}</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 600, color: BRAND.colors.dark, margin: 0, flex: 1 }}>
                    {done ? `${step.label} selected` : `Choose your ${step.label}`}
                  </h3>
                  {done && (
                    <button
                      onClick={() => changeStep(i)}
                      style={{
                        background: "none", border: "none",
                        color: BRAND.colors.terracotta, fontSize: "12px",
                        fontWeight: 500, cursor: "pointer", padding: "4px 0",
                      }}
                    >
                      Change
                    </button>
                  )}
                </div>

                {/* Selected: collapsed card */}
                {done && sel && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "16px 20px", background: "white",
                    borderRadius: "10px", border: `1.5px solid #E8DDD5`,
                  }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                      {sel.imageUrl
                        ? <img src={sel.imageUrl} alt={sel.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <ImagePlaceholder />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {sel.vendor && (
                        <p style={{ fontSize: "10px", color: BRAND.colors.terracotta, margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          {sel.vendor}
                        </p>
                      )}
                      <p style={{ fontSize: "14px", fontWeight: 500, color: BRAND.colors.dark, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {sel.title}
                      </p>
                    </div>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: BRAND.colors.dark, margin: 0, flexShrink: 0 }}>
                      {sel.currency} {sel.price.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Active: product grid */}
                {!done && (
                  step.products.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "#AAA" }}>
                      No products in this category yet.
                    </p>
                  ) : (
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                      gap: "16px",
                    }}>
                      {step.products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => selectProduct(i, product)}
                          style={{
                            background: "white",
                            border: "1.5px solid #EEE9E4",
                            borderRadius: "10px",
                            overflow: "hidden",
                            cursor: "pointer",
                            textAlign: "left",
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {/* Image */}
                          <div style={{ aspectRatio: "1", width: "100%", overflow: "hidden" }}>
                            {product.imageUrl
                              ? <img src={product.imageUrl} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              : <ImagePlaceholder />}
                          </div>

                          {/* Info */}
                          <div style={{ padding: "14px 16px 16px" }}>
                            {product.vendor && (
                              <p style={{ fontSize: "10px", color: BRAND.colors.terracotta, margin: "0 0 3px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                {product.vendor}
                              </p>
                            )}
                            <p style={{ fontSize: "13px", fontWeight: 500, color: BRAND.colors.dark, margin: "0 0 8px", lineHeight: 1.3 }}>
                              {product.title}
                            </p>
                            <p style={{ fontSize: "14px", fontWeight: 700, color: BRAND.colors.dark, margin: "0 0 12px" }}>
                              {product.currency} {product.price.toLocaleString()}
                            </p>
                            <div style={{
                              background: BRAND.colors.dark, color: "white",
                              fontSize: "12px", fontWeight: 500,
                              padding: "8px", borderRadius: "6px", textAlign: "center",
                            }}>
                              Select →
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )
                )}
              </div>
            );
          })}

          {/* Completion banner */}
          {allDone && (
            <div style={{
              padding: "28px 32px", borderRadius: "12px",
              background: "#EEF6EE", border: "1.5px solid #B8D8B8",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "11px", color: "#2E7D32", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>
                Your room is ready
              </p>
              <p style={{ fontSize: "15px", color: BRAND.colors.dark, fontWeight: 500, margin: "0 0 4px" }}>
                {steps.length} {steps.length === 1 ? "piece" : "pieces"} · {currency} {total.toLocaleString()} total
              </p>
              <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
                Click "Add room to cart" in the panel on the left.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
