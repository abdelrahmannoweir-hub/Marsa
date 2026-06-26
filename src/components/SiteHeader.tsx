"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { BRAND } from "../config/brand";
import { ROOM_CATEGORIES } from "../config/tags";

// ── Icons ────────────────────────────────────────────────────────────────────

function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

// Furniture rooms exclude Lighting and Rugs — those get their own nav items
const FURNITURE_ROOMS = ROOM_CATEGORIES.filter(
  (r) => r.slug !== "lighting" && r.slug !== "rugs"
);
const LIGHTING_ROOM = ROOM_CATEGORIES.find((r) => r.slug === "lighting")!;
const RUGS_ROOM = ROOM_CATEGORIES.find((r) => r.slug === "rugs")!;

type NavItem = {
  label: string;
  href: string;
  sale?: boolean;
  badge?: boolean;
  dropdown?: string;
};

const NAV: NavItem[] = [
  { label: "Sale", href: "/products", sale: true },
  { label: "New", href: "/products", badge: true },
  { label: "Furniture", href: "/products", dropdown: "furniture" },
  { label: "Lighting", href: "/products", dropdown: "lighting" },
  { label: "Rugs", href: "/products", dropdown: "rugs" },
  { label: "Beddings", href: "/products" },
  { label: "Fabrics", href: "/products" },
  { label: "Accessories", href: "/products" },
  { label: "Designers", href: "/products" },
  { label: "Inspiration", href: "/products" },
  { label: "Trade Program", href: "/designer/apply" },
];

// ── Component ────────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openPanel(name: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  function hoverLink(e: React.MouseEvent, enter: boolean) {
    (e.currentTarget as HTMLElement).style.color = enter
      ? BRAND.colors.terracotta
      : BRAND.colors.dark;
  }

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>

      {/* ── 1. Promo strip ─────────────────────────────────────────────────── */}
      <div style={{ background: BRAND.colors.dark, color: "white", textAlign: "center", padding: "9px 24px", fontSize: "12px", letterSpacing: "0.04em" }}>
        Free delivery over SAR 1,500&nbsp;&nbsp;·&nbsp;&nbsp;Split payments with Tabby &amp; Tamara
      </div>

      {/* ── 2. Header bar ──────────────────────────────────────────────────── */}
      <header style={{ background: "white", borderBottom: "1px solid #eee", padding: "0 40px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: "22px", color: BRAND.colors.dark, textDecoration: "none", letterSpacing: "0.06em" }}>
          {BRAND.name}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px", color: BRAND.colors.dark }}>
          <button style={{ border: "1px solid #ddd", background: "transparent", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", color: BRAND.colors.dark, letterSpacing: "0.03em" }}>
            EN&nbsp;|&nbsp;ع
          </button>
          <button aria-label="Wishlist" style={{ background: "none", border: "none", cursor: "pointer", color: BRAND.colors.dark, padding: 0, display: "flex" }}>
            <HeartIcon />
          </button>
          <Link href="/vendor/login" aria-label="Account" style={{ color: BRAND.colors.dark, display: "flex" }}>
            <UserIcon />
          </Link>
          <Link href="/cart" aria-label="Cart" style={{ color: BRAND.colors.dark, display: "flex", position: "relative" }}>
            <BagIcon />
          </Link>
        </div>
      </header>

      {/* ── 3. Nav bar ─────────────────────────────────────────────────────── */}
      <nav
        style={{ background: "white", borderBottom: "1px solid #eee", padding: "0 40px", display: "flex", alignItems: "stretch", overflowX: "auto", scrollbarWidth: "none" }}
        onMouseLeave={scheduleClose}
      >
        {NAV.map((item) => {
          const hasDropdown = !!item.dropdown;
          const isOpen = hasDropdown && openDropdown === item.dropdown;
          const isCompact = item.dropdown === "lighting" || item.dropdown === "rugs";
          const compactRoom =
            item.dropdown === "lighting" ? LIGHTING_ROOM
            : item.dropdown === "rugs" ? RUGS_ROOM
            : null;

          return (
            <div
              key={item.label}
              style={{ position: "relative" }}
              onMouseEnter={hasDropdown ? () => openPanel(item.dropdown!) : undefined}
            >
              <Link
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "14px 14px", fontSize: "13px", fontWeight: 400,
                  color: item.sale ? BRAND.colors.terracotta : BRAND.colors.dark,
                  textDecoration: "none", whiteSpace: "nowrap",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!hasDropdown)
                    (e.currentTarget as HTMLElement).style.borderBottomColor = BRAND.colors.terracotta;
                }}
                onMouseLeave={(e) => {
                  if (!hasDropdown)
                    (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                }}
              >
                {item.label}
                {item.badge && (
                  <span style={{ background: BRAND.colors.dark, color: "white", fontSize: "9px", padding: "1px 5px", borderRadius: "3px", letterSpacing: "0.04em", fontWeight: 600 }}>
                    NEW
                  </span>
                )}
                {hasDropdown && <span style={{ fontSize: "10px", opacity: 0.5 }}>▾</span>}
              </Link>

              {/* ── Compact dropdown — Lighting / Rugs ─────────────────────── */}
              {isCompact && isOpen && compactRoom && (
                <div
                  onMouseEnter={() => openPanel(item.dropdown!)}
                  onMouseLeave={scheduleClose}
                  style={{
                    position: "absolute", top: "100%", left: 0, zIndex: 200,
                    background: "white", border: "1px solid #eee",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
                    borderRadius: "0 0 8px 8px",
                    padding: "20px 24px 24px",
                    minWidth: "200px",
                  }}
                >
                  <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 12px" }}>
                    {compactRoom.label}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {compactRoom.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/products?category=${compactRoom.slug}&subcategory=${sub.slug}`}
                        style={{ fontSize: "14px", color: BRAND.colors.dark, textDecoration: "none", padding: "5px 0", display: "block" }}
                        onMouseEnter={(e) => hoverLink(e, true)}
                        onMouseLeave={(e) => hoverLink(e, false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                    <Link
                      href={`/products?category=${compactRoom.slug}`}
                      style={{ fontSize: "13px", fontWeight: 500, color: BRAND.colors.terracotta, textDecoration: "none", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #f0f0f0", display: "block" }}
                    >
                      Shop all {compactRoom.label.toLowerCase()} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Furniture mega-dropdown — full width ───────────────────────────── */}
      {openDropdown === "furniture" && (
        <div
          onMouseEnter={() => openPanel("furniture")}
          onMouseLeave={scheduleClose}
          style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200,
            background: "white", borderBottom: "1px solid #eee",
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            padding: "32px 40px 36px",
            display: "grid",
            gridTemplateColumns: `repeat(${FURNITURE_ROOMS.length}, 1fr)`,
          }}
        >
          {FURNITURE_ROOMS.map((room, i) => (
            <div
              key={room.slug}
              style={{
                padding: "0 20px",
                borderRight: i < FURNITURE_ROOMS.length - 1 ? "1px solid #f2f2f2" : "none",
              }}
            >
              {/* Room heading links to /rooms/[slug] — built in Step 3 */}
              <Link
                href={`/rooms/${room.slug}`}
                style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#aaa", marginBottom: "14px", display: "block", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BRAND.colors.terracotta)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#aaa")}
              >
                {room.label}
              </Link>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {room.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/products?category=${room.slug}&subcategory=${sub.slug}`}
                    style={{ fontSize: "14px", color: BRAND.colors.dark, textDecoration: "none" }}
                    onMouseEnter={(e) => hoverLink(e, true)}
                    onMouseLeave={(e) => hoverLink(e, false)}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div style={{ gridColumn: "1 / -1", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f0f0f0" }}>
            <Link href="/products" style={{ fontSize: "13px", fontWeight: 500, color: BRAND.colors.terracotta, textDecoration: "none" }}>
              Shop all furniture →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
