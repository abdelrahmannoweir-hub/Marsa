"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../src/lib/supabase";
import { BRAND } from "../../../src/config/brand";

export default function DesignerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user?.user_metadata?.role !== "designer") {
      await supabase.auth.signOut();
      setError("This account does not have designer access.");
      setLoading(false);
      return;
    }

    router.push("/designer/dashboard");
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
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #eee",
          borderRadius: "12px",
          padding: "48px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>
          Designer Portal
        </p>
        <h1 style={{ fontSize: "22px", fontWeight: 600, margin: "0 0 32px" }}>
          {BRAND.name}
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "6px",
                color: "#444",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "6px",
                color: "#444",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#e53e3e",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
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
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ fontSize: "13px", color: "#999", marginTop: "24px", textAlign: "center" }}>
          Not yet approved?{" "}
          <Link
            href="/designer/apply"
            style={{ color: BRAND.colors.terracotta, textDecoration: "none" }}
          >
            Apply for trade access
          </Link>
        </p>
      </div>
    </main>
  );
}
