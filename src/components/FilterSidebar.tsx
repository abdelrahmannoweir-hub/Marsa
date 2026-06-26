"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { BRAND } from "../config/brand";
import { ROOM_CATEGORIES, TAG_GROUPS } from "../config/tags";

type Props = { brands: string[] };

export function FilterSidebar({ brands }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const get = (key: string) => searchParams.get(key) ?? "";
  const activeCategory   = get("category");
  const activeSubcategory = get("subcategory");
  const activeStyle      = get("style");
  const activeMaterial   = get("material");
  const activeColor      = get("color");
  const activeBrand      = get("brand");
  const activeSort       = get("sort");
  const inStock          = searchParams.get("inStock") === "true";

  // Build updated URL, optionally clearing a key when toggled off
  function push(overrides: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(overrides)) {
      if (v === null) params.delete(k);
      else params.set(k, v);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  // Single-select toggle: click active value → clear it
  function toggle(key: string, value: string) {
    if (key === "category") {
      // Switching category clears subcategory
      push({ category: get("category") === value ? null : value, subcategory: null });
    } else {
      push({ [key]: get(key) === value ? null : value });
    }
  }

  const styleGroup    = TAG_GROUPS.find((g) => g.group === "Style")!;
  const materialGroup = TAG_GROUPS.find((g) => g.group === "Material")!;
  const colorGroup    = TAG_GROUPS.find((g) => g.group === "Color")!;

  const hasAnyFilter = searchParams.toString() !== "";

  return (
    <aside
      style={{
        width: "220px",
        flexShrink: 0,
        borderRight: "1px solid #EEEAE5",
        padding: "28px 20px 40px",
        position: "sticky",
        top: "128px",
        maxHeight: "calc(100vh - 128px)",
        overflowY: "auto",
        scrollbarWidth: "thin",
      }}
    >
      {hasAnyFilter && (
        <button
          onClick={() => router.push("/products", { scroll: false })}
          style={{
            background: "none", border: "none", padding: 0,
            fontSize: "12px", color: BRAND.colors.terracotta,
            cursor: "pointer", marginBottom: "20px", display: "block",
          }}
        >
          Clear all filters ×
        </button>
      )}

      {/* ── Sort ────────────────────────────────────────────────────────── */}
      <FilterSection label="Sort">
        {[
          { label: "Featured", value: "" },
          { label: "Price: Low → High", value: "price-asc" },
          { label: "Price: High → Low", value: "price-desc" },
          { label: "Newest", value: "newest" },
        ].map((opt) => (
          <RadioRow
            key={opt.value}
            label={opt.label}
            active={activeSort === opt.value}
            onClick={() => push({ sort: opt.value || null })}
          />
        ))}
      </FilterSection>

      {/* ── Category ────────────────────────────────────────────────────── */}
      <FilterSection label="Category">
        <RadioRow
          label="All categories"
          active={!activeCategory}
          onClick={() => push({ category: null, subcategory: null })}
        />
        {ROOM_CATEGORIES.map((room) => (
          <div key={room.slug}>
            <RadioRow
              label={room.label}
              active={activeCategory === room.slug}
              onClick={() => toggle("category", room.slug)}
            />
            {activeCategory === room.slug &&
              room.subcategories.map((sub) => (
                <CheckRow
                  key={sub.slug}
                  label={sub.label}
                  checked={activeSubcategory === sub.slug}
                  onChange={() => toggle("subcategory", sub.slug)}
                  indent
                />
              ))}
          </div>
        ))}
      </FilterSection>

      {/* ── Style ───────────────────────────────────────────────────────── */}
      <FilterSection label="Style">
        {styleGroup.tags.map((tag) => (
          <CheckRow
            key={tag}
            label={tag}
            checked={activeStyle === tag}
            onChange={() => toggle("style", tag)}
          />
        ))}
      </FilterSection>

      {/* ── Material ────────────────────────────────────────────────────── */}
      <FilterSection label="Material">
        {materialGroup.tags.map((tag) => (
          <CheckRow
            key={tag}
            label={tag}
            checked={activeMaterial === tag}
            onChange={() => toggle("material", tag)}
          />
        ))}
      </FilterSection>

      {/* ── Color ───────────────────────────────────────────────────────── */}
      <FilterSection label="Color">
        {colorGroup.tags.map((tag) => (
          <CheckRow
            key={tag}
            label={tag}
            checked={activeColor === tag}
            onChange={() => toggle("color", tag)}
          />
        ))}
      </FilterSection>

      {/* ── Brand ───────────────────────────────────────────────────────── */}
      {brands.length > 0 && (
        <FilterSection label="Brand">
          {brands.map((b) => (
            <CheckRow
              key={b}
              label={b}
              checked={activeBrand === b}
              onChange={() => toggle("brand", b)}
            />
          ))}
        </FilterSection>
      )}

      {/* ── Availability ────────────────────────────────────────────────── */}
      <FilterSection label="Availability">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "13px", color: "#555" }}>In stock only</span>
          <Toggle
            on={inStock}
            onToggle={() => push({ inStock: inStock ? null : "true" })}
          />
        </div>
      </FilterSection>
    </aside>
  );
}

// ── Primitives ────────────────────────────────────────────────────────────────

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #F0EDE8" }}>
      <p style={{
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.09em",
        textTransform: "uppercase", color: "#BBB", margin: "0 0 10px",
      }}>
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {children}
      </div>
    </div>
  );
}

function RadioRow({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none", border: "none", padding: "3px 0",
        cursor: "pointer", textAlign: "left", width: "100%",
        fontSize: "13px",
        color: active ? BRAND.colors.terracotta : "#444",
        fontWeight: active ? 600 : 400,
        display: "flex", alignItems: "center", gap: "8px",
      }}
    >
      <span style={{
        width: "13px", height: "13px", borderRadius: "50%", flexShrink: 0,
        border: `1.5px solid ${active ? BRAND.colors.terracotta : "#CCC"}`,
        background: active ? BRAND.colors.terracotta : "transparent",
        display: "inline-block",
      }} />
      {label}
    </button>
  );
}

function CheckRow({
  label, checked, onChange, indent = false,
}: { label: string; checked: boolean; onChange: () => void; indent?: boolean }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: "8px",
      paddingLeft: indent ? "18px" : "0",
      cursor: "pointer", fontSize: "13px",
      color: checked ? BRAND.colors.terracotta : "#444",
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ accentColor: BRAND.colors.terracotta, margin: 0, flexShrink: 0 }}
      />
      {label}
    </label>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      style={{
        width: "38px", height: "21px", borderRadius: "99px",
        background: on ? BRAND.colors.terracotta : "#DDD",
        border: "none", cursor: "pointer", position: "relative",
        transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute", top: "3px",
        left: on ? "20px" : "3px",
        width: "15px", height: "15px",
        borderRadius: "50%", background: "white",
        transition: "left 0.2s",
      }} />
    </button>
  );
}
