"use client";
import { useEffect, useState } from "react";
import { getProducts } from "../../src/lib/shopify";
import { supabase } from "../../src/lib/supabase";
import { BRAND } from "../../src/config/brand";

type BundleItem = {
  handle: string;
  title: string;
  price: string;
  currencyCode: string;
  imageUrl: string;
  quantity: number;
};

type QuoteForm = {
  projectName: string;
  email: string;
  message: string;
};

export default function BundleBuilder() {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, BundleItem>>({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteForm, setQuoteForm] = useState<QuoteForm>({
    projectName: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  useEffect(() => {
    getProducts().then((prods) => {
      setProducts(prods);
      setLoadingProducts(false);
    });
    // Pre-fill email if designer is logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setQuoteForm((f) => ({ ...f, email: user.email! }));
      }
    });
  }, []);

  function toggleProduct(node: any) {
    const handle = node.handle;
    setSelected((prev) => {
      if (prev[handle]) {
        const next = { ...prev };
        delete next[handle];
        return next;
      }
      return {
        ...prev,
        [handle]: {
          handle,
          title: node.title,
          price: node.priceRange.minVariantPrice.amount,
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
          imageUrl: node.images.edges[0]?.node.url ?? "",
          quantity: 1,
        },
      };
    });
  }

  function setQty(handle: string, qty: number) {
    if (qty < 1) return;
    setSelected((prev) => ({
      ...prev,
      [handle]: { ...prev[handle], quantity: qty },
    }));
  }

  const items = Object.values(selected);
  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const currencyCode = items[0]?.currencyCode ?? "SAR";

  async function handleSubmitQuote(e: React.FormEvent) {
    e.preventDefault();
    setQuoteError("");
    setSubmitting(true);

    const { error } = await supabase.from("bundle_requests").insert({
      project_name: quoteForm.projectName,
      contact_email: quoteForm.email,
      products: items.map((i) => ({
        handle: i.handle,
        title: i.title,
        quantity: i.quantity,
        price: i.price,
      })),
      total_price: `${total.toFixed(2)} ${currencyCode}`,
      message: quoteForm.message || null,
    });

    if (error) {
      setQuoteError(error.message);
      setSubmitting(false);
    } else {
      setSubmitted(true);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  if (submitted) {
    return (
      <main
        style={{
          fontFamily: "sans-serif",
          padding: "80px 32px",
          textAlign: "center",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            color: BRAND.colors.terracotta,
          }}
        >
          ✓
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "12px" }}>
          Quote request sent
        </h2>
        <p style={{ color: "#666", lineHeight: 1.7 }}>
          We&apos;ll be in touch at {quoteForm.email} within 1–2 business days
          with pricing and availability for your project.
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "32px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>
          B2B / Hospitality
        </p>
        <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px" }}>
          Bundle Builder
        </h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          Select products for your project and request a quote with volume pricing.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", alignItems: "start" }}>
        {/* PRODUCT GRID */}
        <div>
          {loadingProducts ? (
            <p style={{ color: "#999" }}>Loading products…</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {products.map(({ node }: any) => {
                const isSelected = !!selected[node.handle];
                return (
                  <div
                    key={node.id}
                    onClick={() => toggleProduct(node)}
                    style={{
                      border: isSelected
                        ? `2px solid ${BRAND.colors.terracotta}`
                        : "2px solid #eee",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "border-color 0.15s",
                    }}
                  >
                    <div
                      style={{
                        height: "160px",
                        background: "#f5f5f5",
                        backgroundImage: node.images.edges[0]
                          ? `url(${node.images.edges[0].node.url})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            background: BRAND.colors.terracotta,
                            color: "white",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "12px" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          margin: "0 0 4px",
                        }}
                      >
                        {node.title}
                      </p>
                      <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
                        {node.priceRange.minVariantPrice.amount}{" "}
                        {node.priceRange.minVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BUNDLE SUMMARY */}
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "24px",
            position: "sticky",
            top: "24px",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 20px" }}>
            Bundle Summary
          </h2>

          {items.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#999" }}>
              Select products from the grid to build your bundle.
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                {items.map((item) => (
                  <div key={item.handle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4px",
                      }}
                    >
                      <p
                        style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}
                      >
                        {item.title}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected((prev) => {
                            const next = { ...prev };
                            delete next[item.handle];
                            return next;
                          });
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ccc",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: 0,
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQty(item.handle, item.quantity - 1);
                        }}
                        style={{
                          width: "24px",
                          height: "24px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          background: "white",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: "13px", minWidth: "20px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQty(item.handle, item.quantity + 1);
                        }}
                        style={{
                          width: "24px",
                          height: "24px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          background: "white",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        +
                      </button>
                      <span style={{ fontSize: "12px", color: "#999", marginLeft: "auto" }}>
                        {(parseFloat(item.price) * item.quantity).toFixed(2)}{" "}
                        {item.currencyCode}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  paddingTop: "16px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  <span>Estimate</span>
                  <span>
                    {total.toFixed(2)} {currencyCode}
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "#999", margin: "4px 0 0" }}>
                  Final pricing subject to volume & availability
                </p>
              </div>

              {!showQuote ? (
                <button
                  onClick={() => setShowQuote(true)}
                  style={{
                    width: "100%",
                    background: BRAND.colors.terracotta,
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Request Quote
                </button>
              ) : (
                <form onSubmit={handleSubmitQuote}>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", color: "#444" }}>
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={quoteForm.projectName}
                      onChange={(e) =>
                        setQuoteForm((f) => ({ ...f, projectName: e.target.value }))
                      }
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", color: "#444" }}>
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) =>
                        setQuoteForm((f) => ({ ...f, email: e.target.value }))
                      }
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", color: "#444" }}>
                      Notes
                    </label>
                    <textarea
                      value={quoteForm.message}
                      onChange={(e) =>
                        setQuoteForm((f) => ({ ...f, message: e.target.value }))
                      }
                      rows={3}
                      placeholder="Delivery timeline, special requirements…"
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                  {quoteError && (
                    <p style={{ color: "#e53e3e", fontSize: "12px", marginBottom: "12px" }}>
                      {quoteError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      background: BRAND.colors.terracotta,
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Sending…" : "Send Quote Request"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
