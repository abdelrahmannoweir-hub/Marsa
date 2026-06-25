"use client";
import { useState } from "react";
import { BRAND } from "../../../src/config/brand";

export default function DesignerApply() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    licenseNumber: "",
    website: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/designer/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
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

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    marginBottom: "6px",
    color: "#444",
  };

  if (submitted) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          background: "#fafafa",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px", padding: "32px" }}>
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
            Application received
          </h2>
          <p style={{ color: "#666", lineHeight: 1.7 }}>
            Thank you for applying to the {BRAND.name} Trade Program. We review
            applications within 2–3 business days and will email you once your
            account is approved.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        fontFamily: "sans-serif",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #eee",
          borderRadius: "12px",
          padding: "48px",
          width: "100%",
          maxWidth: "540px",
        }}
      >
        <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>
          {BRAND.name} Trade Program
        </p>
        <h1 style={{ fontSize: "22px", fontWeight: 600, margin: "0 0 8px" }}>
          Apply for Designer Access
        </h1>
        <p style={{ fontSize: "14px", color: "#666", margin: "0 0 32px", lineHeight: 1.6 }}>
          Approved interior designers and architects receive exclusive trade
          pricing on all products.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Company / Studio</label>
              <input
                type="text"
                value={form.company}
                onChange={set("company")}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Design License No.</label>
              <input
                type="text"
                value={form.licenseNumber}
                onChange={set("licenseNumber")}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Website / Portfolio</label>
            <input
              type="url"
              value={form.website}
              onChange={set("website")}
              placeholder="https://"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>Tell us about your practice</label>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={4}
              placeholder="What kind of projects do you work on? Where are you based?"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {error && (
            <p style={{ color: "#e53e3e", fontSize: "13px", marginBottom: "16px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: BRAND.colors.terracotta,
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </div>
    </main>
  );
}
