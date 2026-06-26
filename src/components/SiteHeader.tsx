"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { BRAND } from "../config/brand";

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

// ── Furniture dropdown items ──────────────────────────────────────────────────

const FURNITURE_COLS = [
  {
    heading: "Seating",
    links: ["Sofas", "Armchairs", "Dining Chairs", "Ottomans & Poufs"],
  },
  {
    heading: "Tables",
    links: ["Dining Tables", "Coffee Tables", "Side Tables", "Desks"],
  },
  {
    heading: "Storage",
    links: ["Sideboards", "Shelving", "Wardrobes", "Cabinets"],
  },
  {
    heading: "Bedroom",
    links: ["Beds", "Headboards", "Bedside Tables", "Dressers"],
  },
];

// ── Nav definition ────────────────────────────────────────────────────────────

const NAV = [
  { label: "Sale", href: "/products", sale: true },
  { label: "New", href: "/products", badge: "New" },
  { label: "Furniture", href: "/products", dropdown: true },
  { label: "Lighting", href: "/products" },
  { label: "Carpets", href: "/products" },
  { label: "Beddings", href: "/products" },
  { label: "Fabrics", href: "/products" },
  { label: "Accessories", href: "/products" },
  { label: "Designers", href: "/products" },
  { label: "Inspiration", href: "/products" },
  { label: "Trade Program", href: "/designer/apply" },
] as const;

// ── Component ────────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  }

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>

      {/* ── 1. Promo strip ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: BRAND.colors.dark,
          color: "white",
          textAlign: "center",
          padding: "9px 24px",
          fontSize: "12px",
          letterSpacing: "0.04em",
        }}
      >
        Free delivery over SAR 1,500&nbsp;&nbsp;·&nbsp;&nbsp;Split payments with Tabby &amp; Tamara
      </div>

      {/* ── 2. Header bar ──────────────────────────────────────────────────── */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #eee",
          padding: "0 40px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: "22px",
            color: BRAND.colors.dark,
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}
        >
          {BRAND.name}
        </Link>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", color: BRAND.colors.dark }}>
          {/* Language */}
          <button
            style={{
              border: "1px solid #ddd",
              background: "transparent",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer",
              color: BRAND.colors.dark,
              letterSpacing: "0.03em",
            }}
          >
            EN&nbsp;|&nbsp;ع
          </button>

          {/* Wishlist */}
          <button
            aria-label="Wishlist"
            style={{ background: "none", border: "none", cursor: "pointer", color: BRAND.colors.dark, padding: 0, display: "flex" }}
          >
            <HeartIcon />
          </button>

          {/* Account */}
          <Link
            href="/vendor/login"
            aria-label="Account"
            style={{ color: BRAND.colors.dark, display: "flex" }}
          >
            <UserIcon />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            style={{ color: BRAND.colors.dark, display: "flex", position: "relative" }}
          >
            <BagIcon />
          </Link>
        </div>
      </header>

      {/* ── 3. Nav bar ─────────────────────────────────────────────────────── */}
      <nav
        style={{
          background: "white",
          borderBottom: "1px solid #eee",
          padding: "0 40px",
          display: "flex",
          alignItems: "stretch",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {NAV.map((item) => {
          const isFurniture = "dropdown" in item && item.dropdown;
          return (
            <div
              key={item.label}
              style={{ position: "relative" }}
              onMouseEnter={isFurniture ? openDropdown : undefined}
              onMouseLeave={isFurniture ? scheduleClose : undefined}
            >
              <Link
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "14px 14px",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "sale" in item && item.sale ? BRAND.colors.terracotta : BRAND.colors.dark,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isFurniture)
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = BRAND.colors.terracotta;
                }}
                onMouseLeave={(e) => {
                  if (!isFurniture)
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                }}
              >
                {item.label}
                {"badge" in item && item.badge && (
                  <span
                    style={{
                      background: BRAND.colors.dark,
                      color: "white",
                      fontSize: "9px",
                      padding: "1px 5px",
                      borderRadius: "3px",
                      letterSpacing: "0.04em",
                      fontWeight: 600,
                    }}
                  >
                    NEW
                  </span>
                )}
                {isFurniture && (
                  <span style={{ fontSize: "10px", opacity: 0.5 }}>▾</span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* ── Furniture mega-dropdown ─────────────────────────────────────────── */}
      {dropdownOpen && (
        <div
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleClose}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            borderBottom: "1px solid #eee",
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            padding: "32px 40px 36px",
            zIndex: 200,
          }}
        >
          {FURNITURE_COLS.map((col) => (
            <div key={col.heading} style={{ padding: "0 16px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#999",
                  margin: "0 0 12px",
                }}
              >
                {col.heading}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link) => (
                  <Link
                    key={link}
                    href="/products"
                    style={{
                      fontSize: "14px",
                      color: BRAND.colors.dark,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = BRAND.colors.terracotta)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = BRAND.colors.dark)
                    }
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Shop all link at bottom */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Link
              href="/products"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: BRAND.colors.terracotta,
                textDecoration: "none",
              }}
            >
              Shop all furniture →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
