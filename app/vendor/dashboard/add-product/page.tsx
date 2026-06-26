"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../src/lib/supabase";
import { BRAND } from "../../../../src/config/brand";
import { PRODUCT_CATEGORIES, TAG_GROUPS } from "../../../../src/config/tags";

export default function AddProduct() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.user_metadata?.vendor_name) {
        router.replace("/vendor/login");
      }
    }
    checkAuth();
  }, [router]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/vendor/login");
        return;
      }

      let imageBase64: string | undefined;
      if (imageFile) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataUrl = ev.target?.result as string;
            resolve(dataUrl.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }

      const res = await fetch("/api/vendor/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title,
          description,
          price,
          imageBase64,
          inventory: inventory !== "" ? Number(inventory) : undefined,
          category: category || undefined,
          tags: selectedTags.size > 0 ? Array.from(selectedTags) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create product");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSuccess(false);
    setTitle("");
    setDescription("");
    setPrice("");
    setImageFile(null);
    setImagePreview(null);
    setInventory("");
    setCategory("");
    setSelectedTags(new Set());
    setError("");
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

  if (success) {
    return (
      <main
        style={{
          fontFamily: "sans-serif",
          padding: "32px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "80px",
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
        <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
          Product created!
        </h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Your product is now live on the store.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link
            href="/vendor/dashboard"
            style={{
              background: BRAND.colors.terracotta,
              color: "white",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            Back to Dashboard
          </Link>
          <button
            onClick={resetForm}
            style={{
              background: "transparent",
              border: "1px solid #ddd",
              color: "#444",
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Add Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "32px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <Link
          href="/vendor/dashboard"
          style={{ color: "#999", fontSize: "13px", textDecoration: "none" }}
        >
          ← Back to Dashboard
        </Link>
        <h1 style={{ fontSize: "22px", fontWeight: 600, margin: "8px 0 0" }}>
          Add Product
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Image upload */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              marginBottom: "8px",
              color: "#444",
            }}
          >
            Product Image
          </label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: "2px dashed #ddd",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fafafa",
            }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxHeight: "200px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <p style={{ color: "#999", fontSize: "14px", margin: 0 }}>
                Click to upload an image
              </p>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Title */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              marginBottom: "6px",
              color: "#444",
            }}
          >
            Product Name *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Handcrafted Wool Rug"
            style={inputStyle}
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              marginBottom: "6px",
              color: "#444",
            }}
          >
            Category
          </label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{ ...inputStyle, background: "white", cursor: "pointer" }}
          >
            <option value="">Select a category…</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              marginBottom: "6px",
              color: "#444",
            }}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe your product…"
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {/* Price */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              marginBottom: "6px",
              color: "#444",
            }}
          >
            Price (SAR) *
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            style={inputStyle}
          />
        </div>

        {/* Inventory */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              marginBottom: "6px",
              color: "#444",
            }}
          >
            Initial Stock Quantity
          </label>
          <input
            type="number"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            min="0"
            step="1"
            placeholder="Leave blank to skip inventory tracking"
            style={inputStyle}
          />
        </div>

        {/* ── Style Tags ── */}
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "28px",
            marginBottom: "28px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 4px" }}
            >
              Style Tags
            </h2>
            <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
              Help customers discover this product through style matching. Select
              all that apply.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {TAG_GROUPS.map((group) => (
              <div key={group.group}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#555",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    margin: "0 0 10px",
                  }}
                >
                  {group.group}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                  }}
                >
                  {group.tags.map((tag) => {
                    const checked = selectedTags.has(tag);
                    return (
                      <label
                        key={tag}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                          padding: "8px 10px",
                          border: `1px solid ${
                            checked ? BRAND.colors.terracotta : "#e5e5e5"
                          }`,
                          borderRadius: "6px",
                          background: checked ? "#FFF5F2" : "white",
                          cursor: "pointer",
                          fontSize: "13px",
                          color: checked ? BRAND.colors.terracotta : "#444",
                          userSelect: "none",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTag(tag)}
                          style={{ accentColor: BRAND.colors.terracotta, margin: 0 }}
                        />
                        {tag}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {selectedTags.size > 0 && (
            <div
              style={{
                marginTop: "16px",
                padding: "10px 14px",
                background: "#fafafa",
                border: "1px solid #eee",
                borderRadius: "6px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              <span style={{ fontWeight: 500 }}>
                {selectedTags.size} tag{selectedTags.size !== 1 ? "s" : ""}{" "}
                selected:
              </span>{" "}
              {Array.from(selectedTags).join(", ")}
            </div>
          )}
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
          {loading ? "Creating product…" : "Create Product"}
        </button>
      </form>
    </main>
  );
}
