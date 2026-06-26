import Link from "next/link";
import { getProducts } from "../src/lib/shopify";
import { BRAND } from "../src/config/brand";
import { SiteHeader } from "../src/components/SiteHeader";

export default async function Home() {
  const products = await getProducts();

  return (
    <main style={{ fontFamily: "sans-serif", color: "#1A1614" }}>

      <SiteHeader />

      {/* CAMPAIGN HERO */}
      <section style={{ display: "grid", gridTemplateColumns: "2fr 3fr", minHeight: "88vh" }}>

        {/* Left — editorial text */}
        <div style={{
          background: "#FDFAF7",
          padding: "0 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0",
        }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}>
            <div style={{ width: "32px", height: "1px", background: BRAND.colors.terracotta }} />
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: BRAND.colors.terracotta,
              fontWeight: 500,
            }}>
              New Collection · Summer 2025
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(36px, 3.6vw, 54px)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: BRAND.colors.dark,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}>
            {BRAND.tagline_en}
          </h1>

          {/* Arabic subline */}
          <p style={{
            fontSize: "18px",
            color: "#9A8880",
            direction: "rtl",
            textAlign: "right",
            margin: "0 0 12px",
            fontWeight: 400,
          }}>
            {BRAND.tagline_ar}
          </p>

          {/* Description */}
          <p style={{
            fontSize: "14px",
            color: "#888",
            lineHeight: 1.65,
            margin: "0 0 40px",
            maxWidth: "320px",
          }}>
            Curated furniture and home accessories from Saudi and Egyptian designers — made to last.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/products"
              style={{
                background: BRAND.colors.terracotta,
                color: "white",
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Shop the collection
            </Link>
            <Link
              href="/quiz"
              style={{
                background: "transparent",
                color: BRAND.colors.dark,
                textDecoration: "none",
                padding: "14px 28px",
                border: `1.5px solid ${BRAND.colors.dark}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Take the style quiz →
            </Link>
          </div>
        </div>

        {/* Right — hero image placeholder */}
        <div style={{
          background: "#E8DDD5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative grain texture feel */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #EDE5DC 0%, #D9CDBF 100%)",
          }} />
          <div style={{ position: "relative", textAlign: "center" }}>
            <div style={{
              width: "48px",
              height: "48px",
              border: "1.5px solid rgba(0,0,0,0.15)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "12px", margin: 0, letterSpacing: "0.06em" }}>
              Campaign lifestyle image
            </p>
          </div>
        </div>

      </section>

      {/* EDITORIAL MOOD BLOCKS */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* Block 1 — Dining */}
        <div style={{
          position: "relative",
          height: "68vh",
          background: "linear-gradient(160deg, #C9B5A0 0%, #A8917A 100%)",
          overflow: "hidden",
        }}>
          {/* Image placeholder icon */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{ textAlign: "center", opacity: 0.25 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p style={{ color: "white", fontSize: "11px", margin: "8px 0 0", letterSpacing: "0.06em" }}>
                Dining mood image
              </p>
            </div>
          </div>

          {/* Gradient scrim */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,22,20,0.75) 0%, rgba(26,22,20,0.1) 55%, transparent 100%)",
          }} />

          {/* Text */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "36px 40px",
            color: "white",
          }}>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              margin: "0 0 10px",
              fontWeight: 500,
            }}>
              Dining
            </p>
            <h2 style={{
              fontSize: "clamp(26px, 2.8vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
            }}>
              Lingering is encouraged.
            </h2>
            <p style={{
              fontSize: "13px",
              opacity: 0.75,
              margin: "0 0 22px",
              lineHeight: 1.5,
              maxWidth: "280px",
            }}>
              Dining spaces that make every meal an occasion worth staying for.
            </p>
            <Link
              href="/products"
              style={{
                color: "white",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
                borderBottom: "1px solid rgba(255,255,255,0.5)",
                paddingBottom: "2px",
              }}
            >
              Shop dining →
            </Link>
          </div>
        </div>

        {/* Block 2 — Living */}
        <div style={{
          position: "relative",
          height: "68vh",
          background: "linear-gradient(160deg, #B5C0B8 0%, #8D9E94 100%)",
          overflow: "hidden",
        }}>
          {/* Image placeholder icon */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{ textAlign: "center", opacity: 0.25 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p style={{ color: "white", fontSize: "11px", margin: "8px 0 0", letterSpacing: "0.06em" }}>
                Living room mood image
              </p>
            </div>
          </div>

          {/* Gradient scrim */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,22,20,0.75) 0%, rgba(26,22,20,0.1) 55%, transparent 100%)",
          }} />

          {/* Text */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "36px 40px",
            color: "white",
          }}>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              margin: "0 0 10px",
              fontWeight: 500,
            }}>
              Living Room
            </p>
            <h2 style={{
              fontSize: "clamp(26px, 2.8vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
            }}>
              Just, relax.
            </h2>
            <p style={{
              fontSize: "13px",
              opacity: 0.75,
              margin: "0 0 22px",
              lineHeight: 1.5,
              maxWidth: "280px",
            }}>
              Living rooms designed for real life — and the rare afternoon with nowhere to be.
            </p>
            <Link
              href="/products"
              style={{
                color: "white",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.04em",
                borderBottom: "1px solid rgba(255,255,255,0.5)",
                paddingBottom: "2px",
              }}
            >
              Shop living →
            </Link>
          </div>
        </div>

      </section>

      {/* SHOP THE ROOM */}
      <section style={{ padding: "80px 40px", background: "#FDFAF7" }}>

        {/* Section header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}>
          <div>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BRAND.colors.terracotta,
              fontWeight: 500,
              margin: "0 0 8px",
            }}>
              Curated spaces
            </p>
            <h2 style={{
              fontSize: "clamp(28px, 2.8vw, 38px)",
              fontWeight: 700,
              margin: 0,
              color: BRAND.colors.dark,
              letterSpacing: "-0.02em",
            }}>
              Shop the room
            </h2>
          </div>
          <Link
            href="/products"
            style={{
              fontSize: "13px",
              color: BRAND.colors.terracotta,
              textDecoration: "none",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            View all rooms →
          </Link>
        </div>

        {/* Two room cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

          {/* Room card 1 — The Calm Living Room */}
          <div style={{
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #EEE9E4",
          }}>
            {/* Photo area */}
            <div style={{
              position: "relative",
              height: "400px",
              background: "linear-gradient(135deg, #E8DDD5 0%, #D4C8BD 100%)",
              overflow: "hidden",
            }}>
              {/* Placeholder */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.3,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.dark} strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>

              {/* Hotspot dots */}
              {[
                { top: "38%", left: "28%", n: 1 },
                { top: "60%", left: "55%", n: 2 },
                { top: "25%", left: "65%", n: 3 },
              ].map(({ top, left, n }) => (
                <div
                  key={n}
                  style={{
                    position: "absolute",
                    top,
                    left,
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: BRAND.colors.dark,
                    cursor: "pointer",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {n}
                </div>
              ))}

              {/* Room label badge */}
              <div style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(4px)",
                borderRadius: "6px",
                padding: "5px 12px",
                fontSize: "11px",
                fontWeight: 600,
                color: BRAND.colors.dark,
                letterSpacing: "0.04em",
              }}>
                Living Room
              </div>
            </div>

            {/* Card footer */}
            <div style={{
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: "0 0 4px",
                  color: BRAND.colors.dark,
                }}>
                  The Calm Living Room
                </h3>
                <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
                  3 pieces · Starting from SAR 1,200
                </p>
              </div>
              <Link
                href="/products"
                style={{
                  background: BRAND.colors.dark,
                  color: "white",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Shop this room
              </Link>
            </div>
          </div>

          {/* Room card 2 — The Bold Dining Room */}
          <div style={{
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #EEE9E4",
          }}>
            {/* Photo area */}
            <div style={{
              position: "relative",
              height: "400px",
              background: "linear-gradient(135deg, #C9B5A0 0%, #B09A87 100%)",
              overflow: "hidden",
            }}>
              {/* Placeholder */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.3,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.dark} strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>

              {/* Hotspot dots */}
              {[
                { top: "45%", left: "35%", n: 1 },
                { top: "30%", left: "60%", n: 2 },
                { top: "65%", left: "70%", n: 3 },
                { top: "20%", left: "25%", n: 4 },
              ].map(({ top, left, n }) => (
                <div
                  key={n}
                  style={{
                    position: "absolute",
                    top,
                    left,
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: BRAND.colors.dark,
                    cursor: "pointer",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {n}
                </div>
              ))}

              {/* Room label badge */}
              <div style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(4px)",
                borderRadius: "6px",
                padding: "5px 12px",
                fontSize: "11px",
                fontWeight: 600,
                color: BRAND.colors.dark,
                letterSpacing: "0.04em",
              }}>
                Dining Room
              </div>
            </div>

            {/* Card footer */}
            <div style={{
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: "0 0 4px",
                  color: BRAND.colors.dark,
                }}>
                  The Bold Dining Room
                </h3>
                <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
                  4 pieces · Starting from SAR 2,800
                </p>
              </div>
              <Link
                href="/products"
                style={{
                  background: BRAND.colors.dark,
                  color: "white",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Shop this room
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* DESIGN MY HOME */}
      <section style={{
        background: "#F5EDE4",
        padding: "80px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "64px",
        alignItems: "center",
      }}>

        {/* Left — copy */}
        <div>
          {/* NEW badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}>
            <span style={{
              background: BRAND.colors.terracotta,
              color: "white",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "3px 9px",
              borderRadius: "4px",
            }}>
              NEW
            </span>
            <span style={{
              fontSize: "12px",
              color: BRAND.colors.terracotta,
              fontWeight: 500,
              letterSpacing: "0.06em",
            }}>
              AI-powered
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(32px, 3.2vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.12,
            color: BRAND.colors.dark,
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}>
            Design my home.
          </h2>

          <p style={{
            fontSize: "15px",
            color: "#7A6A60",
            lineHeight: 1.7,
            margin: "0 0 36px",
            maxWidth: "400px",
          }}>
            Tell us which room you want to furnish, answer a few quick questions about your taste, and we'll build a curated shortlist just for you.
          </p>

          <Link
            href="/quiz"
            style={{
              display: "inline-block",
              background: BRAND.colors.dark,
              color: "white",
              textDecoration: "none",
              padding: "15px 32px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Start designing →
          </Link>
        </div>

        {/* Right — room type selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9A8880",
            margin: "0 0 4px",
            fontWeight: 500,
          }}>
            Which room?
          </p>

          {[
            { label: "Living Room", desc: "Sofas, tables, lighting & more", icon: "⬜" },
            { label: "Bedroom",     desc: "Beds, storage & bedside essentials", icon: "⬜" },
            { label: "Dining Room", desc: "Tables, chairs & sideboards", icon: "⬜" },
            { label: "Home Office", desc: "Desks, shelving & task lighting", icon: "⬜" },
          ].map(({ label, desc }) => (
            <Link
              key={label}
              href="/quiz"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "white",
                border: "1.5px solid #E8DDD5",
                borderRadius: "10px",
                padding: "18px 22px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <p style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  margin: "0 0 3px",
                  color: BRAND.colors.dark,
                }}>
                  {label}
                </p>
                <p style={{
                  fontSize: "12px",
                  color: "#9A8880",
                  margin: 0,
                }}>
                  {desc}
                </p>
              </div>
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke={BRAND.colors.terracotta}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>

      </section>

      {/* SHOP BY ROOM */}
      <section style={{ padding: "72px 0 80px", background: "white" }}>

        {/* Header */}
        <div style={{
          padding: "0 40px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}>
          <div>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BRAND.colors.terracotta,
              fontWeight: 500,
              margin: "0 0 8px",
            }}>
              Every space
            </p>
            <h2 style={{
              fontSize: "clamp(26px, 2.6vw, 36px)",
              fontWeight: 700,
              margin: 0,
              color: BRAND.colors.dark,
              letterSpacing: "-0.02em",
            }}>
              Shop by room
            </h2>
          </div>
          <Link
            href="/products"
            style={{
              fontSize: "13px",
              color: BRAND.colors.terracotta,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Browse all →
          </Link>
        </div>

        {/* Horizontal scroll track */}
        <div style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          padding: "4px 40px 16px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {[
            { label: "Living Room",  bg: "#E8DDD5", text: "#6B5A50" },
            { label: "Dining Room",  bg: "#C9B5A0", text: "#5C4535" },
            { label: "Bedroom",      bg: "#D4CADA", text: "#4A3F55" },
            { label: "Home Office",  bg: "#C5CFCA", text: "#354540" },
            { label: "Outdoor",      bg: "#BDC9B0", text: "#3D4D35" },
            { label: "Kids Room",    bg: "#E8D5BE", text: "#6B4E30" },
            { label: "Bathroom",     bg: "#C8D5D8", text: "#354850" },
            { label: "Entryway",     bg: "#D5C8BA", text: "#5C4D40" },
          ].map(({ label, bg, text }) => (
            <Link
              key={label}
              href="/products"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              <div style={{
                width: "180px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
              }}>
                {/* Photo area */}
                <div style={{
                  height: "200px",
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}>
                  <svg
                    width="28" height="28" viewBox="0 0 24 24"
                    fill="none" stroke={text} strokeWidth="1.2"
                    style={{ opacity: 0.35 }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>

                {/* Label */}
                <div style={{
                  padding: "14px 16px",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: BRAND.colors.dark,
                  }}>
                    {label}
                  </span>
                  <svg
                    width="13" height="13" viewBox="0 0 24 24"
                    fill="none" stroke={BRAND.colors.terracotta}
                    strokeWidth="2.5" strokeLinecap="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* BEST SELLERS */}
      <section style={{ padding: "72px 40px 80px", background: "#FAFAF8" }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}>
          <div>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BRAND.colors.terracotta,
              fontWeight: 500,
              margin: "0 0 8px",
            }}>
              Most loved
            </p>
            <h2 style={{
              fontSize: "clamp(26px, 2.6vw, 36px)",
              fontWeight: 700,
              margin: 0,
              color: BRAND.colors.dark,
              letterSpacing: "-0.02em",
            }}>
              Best Sellers
            </h2>
          </div>
          <Link
            href="/products"
            style={{
              fontSize: "13px",
              color: BRAND.colors.terracotta,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>
            No products yet — add products in Shopify to see them here.
          </p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}>
            {products.map(({ node }: any) => {
              const imageUrl = node.images?.edges?.[0]?.node?.url;
              const price = node.priceRange?.minVariantPrice;
              return (
                <Link
                  key={node.id}
                  href={`/products/${node.handle}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{
                    background: "white",
                    border: "1px solid #EEE9E4",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}>
                    {/* Image */}
                    <div style={{
                      aspectRatio: "1",
                      background: "#F0EBE5",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={node.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5B8B0" strokeWidth="1.2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: "14px 16px" }}>
                      {node.vendor && (
                        <p style={{
                          fontSize: "11px",
                          color: BRAND.colors.terracotta,
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                          margin: "0 0 4px",
                          textTransform: "uppercase",
                        }}>
                          {node.vendor}
                        </p>
                      )}
                      <h3 style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        margin: "0 0 8px",
                        color: BRAND.colors.dark,
                        lineHeight: 1.3,
                      }}>
                        {node.title}
                      </h3>
                      <p style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: BRAND.colors.dark,
                        margin: 0,
                      }}>
                        {price
                          ? `${parseFloat(price.amount).toLocaleString()} ${price.currencyCode}`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* AI QUIZ BAND */}
      <section style={{
        background: "var(--dark)", padding: "32px", display: "flex",
        justifyContent: "space-between", alignItems: "center", color: "#F2EDE4"
      }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 500 }}>AI Style Quiz</div>
          <div style={{ fontSize: "12px", opacity: 0.6 }}>Find your aesthetic in 6 questions</div>
        </div>
        <button style={{
          background: "var(--terracotta)", color: "white", border: "none",
          padding: "10px 20px", borderRadius: "6px", fontSize: "13px", cursor: "pointer"
        }}>
          Take the quiz →
        </button>
      </section>

      {/* B2B BAND */}
      <section style={{
        background: "var(--terracotta)", padding: "28px 32px", display: "flex",
        justifyContent: "space-between", alignItems: "center", color: "white"
      }}>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 500 }}>For design professionals</div>
          <div style={{ fontSize: "12px", opacity: 0.85 }}>Trade pricing · Bundle builder · Project tools</div>
        </div>
        <button style={{
          background: "white", color: "var(--terracotta-dark)", border: "none",
          padding: "10px 20px", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer"
        }}>
          Apply for trade
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "24px 32px", display: "flex", justifyContent: "space-between",
        borderTop: "1px solid #eee", fontSize: "12px", color: "#999"
      }}>
        <span>© {BRAND.name} · Riyadh, Saudi Arabia</span>
        <span>Instagram · Snapchat · عربي</span>
      </footer>

    </main>
  );
}