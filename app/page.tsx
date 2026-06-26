import Link from "next/link";
import { getProducts } from "../src/lib/shopify";
import { BRAND } from "../src/config/brand";
import { SiteHeader } from "../src/components/SiteHeader";
import { FaqAccordion } from "../src/components/FaqAccordion";

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

      {/* AI STYLE QUIZ BAND */}
      <section style={{
        background: BRAND.colors.dark,
        padding: "72px 40px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "40px",
        alignItems: "center",
      }}>
        {/* Left — copy */}
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
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
              Powered by AI
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 700,
            color: "#F2EDE4",
            margin: "0 0 14px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}>
            Find your style in 4 questions.
          </h2>

          <p style={{
            fontSize: "15px",
            color: "rgba(242,237,228,0.55)",
            margin: "0 0 36px",
            lineHeight: 1.65,
            maxWidth: "480px",
          }}>
            Tell us how you like to live and we'll match you with furniture and accessories that actually feel like you.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "40px" }}>
            {[
              { num: "4", label: "Questions" },
              { num: "2 min", label: "Average time" },
              { num: "100%", label: "Personalised" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#F2EDE4",
                  margin: "0 0 2px",
                }}>
                  {num}
                </p>
                <p style={{
                  fontSize: "12px",
                  color: "rgba(242,237,228,0.45)",
                  margin: 0,
                  letterSpacing: "0.04em",
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — CTA card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "36px 32px",
          width: "280px",
          textAlign: "center",
        }}>
          {/* Quiz preview dots */}
          <div style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "24px",
          }}>
            {["Style", "Colour", "Material", "Atmosphere"].map((step, i) => (
              <div key={step} style={{
                width: i === 0 ? "24px" : "8px",
                height: "8px",
                borderRadius: "99px",
                background: i === 0
                  ? BRAND.colors.terracotta
                  : "rgba(255,255,255,0.2)",
                transition: "width 0.3s",
              }} />
            ))}
          </div>

          <p style={{
            fontSize: "13px",
            color: "rgba(242,237,228,0.5)",
            margin: "0 0 8px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Step 1 of 4
          </p>
          <p style={{
            fontSize: "17px",
            fontWeight: 600,
            color: "#F2EDE4",
            margin: "0 0 28px",
            lineHeight: 1.3,
          }}>
            Which style speaks to you?
          </p>

          <Link
            href="/quiz"
            style={{
              display: "block",
              background: BRAND.colors.terracotta,
              color: "white",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Take the quiz →
          </Link>
        </div>
      </section>

      {/* COMMUNITY */}
      <section style={{ background: "white", padding: "80px 40px" }}>

        {/* Centered header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: BRAND.colors.terracotta,
            fontWeight: 500,
            margin: "0 0 10px",
          }}>
            #MarsaHome
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 2.8vw, 40px)",
            fontWeight: 700,
            color: BRAND.colors.dark,
            margin: "0 0 14px",
            letterSpacing: "-0.02em",
          }}>
            Homes we love
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#888",
            margin: "0 auto",
            maxWidth: "440px",
            lineHeight: 1.65,
          }}>
            Share your space and tag <strong style={{ color: BRAND.colors.dark }}>@marsahome</strong> to be featured in our community gallery.
          </p>
        </div>

        {/* Photo grid — 6 tiles, two rows of 3 with size variation */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.4fr",
          gridTemplateRows: "220px 220px",
          gap: "10px",
          marginBottom: "40px",
        }}>
          {[
            { bg: "#E8DDD5", row: "1 / 3", col: "1", label: "Living room" },
            { bg: "#C9B5A0", row: "1",     col: "2", label: "Dining" },
            { bg: "#D4CADA", row: "1",     col: "3", label: "Bedroom" },
            { bg: "#B5C0B8", row: "2",     col: "2", label: "Office" },
            { bg: "#D5C8BA", row: "2",     col: "3", label: "Entryway" },
            { bg: "#C8B5A8", row: "1 / 3", col: "4", label: "Kitchen" },
          ].map(({ bg, row, col, label }) => (
            <div
              key={label}
              style={{
                gridRow: row,
                gridColumn: col,
                background: bg,
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Placeholder icon */}
              <div style={{ opacity: 0.3, textAlign: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.dark} strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>

              {/* Label chip */}
              <div style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                background: "rgba(255,255,255,0.88)",
                borderRadius: "5px",
                padding: "3px 10px",
                fontSize: "11px",
                fontWeight: 600,
                color: BRAND.colors.dark,
                letterSpacing: "0.03em",
              }}>
                {label}
              </div>

              {/* Heart chip */}
              <div style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(255,255,255,0.88)",
                borderRadius: "5px",
                padding: "3px 8px",
                fontSize: "11px",
                color: BRAND.colors.terracotta,
              }}>
                ♡
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="https://instagram.com/marsahome"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: BRAND.colors.dark,
              color: "white",
              textDecoration: "none",
              padding: "13px 28px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            Follow @marsahome
          </a>
        </div>

      </section>

      {/* FAQ */}
      <section style={{ background: "#FDFAF7", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: BRAND.colors.terracotta,
            fontWeight: 500,
            margin: "0 0 10px",
          }}>
            Got questions?
          </p>
          <h2 style={{
            fontSize: "clamp(26px, 2.6vw, 36px)",
            fontWeight: 700,
            color: BRAND.colors.dark,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Frequently asked
          </h2>
        </div>
        <FaqAccordion />
      </section>

      {/* TRADE PROGRAM BAND */}
      <section style={{
        background: BRAND.colors.terracotta,
        padding: "72px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "center",
      }}>

        {/* Left — copy */}
        <div>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            fontWeight: 500,
            margin: "0 0 14px",
          }}>
            For design professionals
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 2.8vw, 42px)",
            fontWeight: 700,
            color: "white",
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}>
            The Marsa Trade Program
          </h2>
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            margin: "0 0 36px",
            maxWidth: "400px",
          }}>
            Interior designers and architects get exclusive access to trade pricing, a dedicated bundle builder, and a direct line to our vendor network.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/designer/apply"
              style={{
                background: "white",
                color: BRAND.colors.terracotta,
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Apply for trade access
            </Link>
            <Link
              href="/designer/login"
              style={{
                background: "transparent",
                color: "white",
                textDecoration: "none",
                padding: "14px 28px",
                border: "1.5px solid rgba(255,255,255,0.45)",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Sign in to trade portal
            </Link>
          </div>
        </div>

        {/* Right — benefit cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            {
              title: "Up to 20% off",
              desc: "Exclusive trade pricing on the full catalogue",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              ),
            },
            {
              title: "Bundle builder",
              desc: "Build full-room quotes in minutes",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              ),
            },
            {
              title: "Priority support",
              desc: "Dedicated account manager for large projects",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              ),
            },
            {
              title: "Tabby & Tamara",
              desc: "Flexible payment terms for large orders",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              ),
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.85)", marginBottom: "10px" }}>
                {icon}
              </div>
              <p style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "white",
                margin: "0 0 4px",
              }}>
                {title}
              </p>
              <p style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                lineHeight: 1.5,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* FOOTER */}
      <footer style={{
        background: BRAND.colors.dark,
        color: "rgba(255,255,255,0.55)",
        fontFamily: "sans-serif",
      }}>

        {/* Main footer grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          padding: "64px 40px 48px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>

          {/* Brand column */}
          <div>
            <p style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.06em",
              margin: "0 0 14px",
            }}>
              {BRAND.name}
            </p>
            <p style={{
              fontSize: "13px",
              lineHeight: 1.7,
              margin: "0 0 24px",
              maxWidth: "260px",
            }}>
              Curated furniture and home accessories from Saudi and Egyptian designers — made to last.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                {
                  label: "Instagram",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "Snapchat",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M12 2C8 2 5 5 5 9v1c0 1-1 2-2 2.5.5.5 1.5.5 2 .5-.5 1-2 2-2 3 0 .5.5 1 2 1 .5 0 1 .5 2 1 .5.5 1.5 1 3 1s2.5-.5 3-1c1-.5 1.5-1 2-1 1.5 0 2-.5 2-1 0-1-1.5-2-2-3 .5 0 1.5 0 2-.5C19 12 18 11 18 10V9c0-4-3-7-6-7z" />
                    </svg>
                  ),
                },
                {
                  label: "TikTok",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop column */}
          <div>
            <p style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 18px",
            }}>
              Shop
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {["New Arrivals", "Best Sellers", "Furniture", "Lighting", "Carpets", "Beddings", "Sale"].map((item) => (
                <Link
                  key={item}
                  href="/products"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div>
            <p style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 18px",
            }}>
              Explore
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {[
                { label: "Style Quiz", href: "/quiz" },
                { label: "Designers", href: "/products" },
                { label: "Inspiration", href: "/" },
                { label: "Shop by Room", href: "/products" },
                { label: "Trade Program", href: "/designer/apply" },
                { label: "Become a Vendor", href: "/vendor/login" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help column */}
          <div>
            <p style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 18px",
            }}>
              Help
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {["Delivery & Returns", "Payment Options", "Track My Order", "Contact Us", "FAQs", "Privacy Policy", "Terms of Service"].map((item) => (
                <Link
                  key={item}
                  href="/"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
          fontSize: "12px",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <span>© 2025 {BRAND.name}. All rights reserved. · Riyadh, Saudi Arabia</span>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {/* Payment icons text */}
            <span style={{ fontSize: "11px", letterSpacing: "0.04em" }}>
              Visa · Mastercard · Mada · Tabby · Tamara · Apple Pay
            </span>
            <span style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "4px",
              padding: "3px 10px",
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.04em",
            }}>
              عربي
            </span>
          </div>
        </div>

      </footer>

    </main>
  );
}