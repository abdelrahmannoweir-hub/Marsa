"use client";
import { useState } from "react";
import Link from "next/link";
import { getProductsWithTags } from "../../src/lib/shopify";
import { BRAND } from "../../src/config/brand";

// ── Quiz definition ──────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    key: "style" as const,
    question: "Which style speaks to you?",
    options: [
      { tag: "minimalist", label: "Minimalist", desc: "Clean lines, nothing excess" },
      { tag: "contemporary", label: "Contemporary", desc: "Refined, current, sophisticated" },
      { tag: "saudi-heritage", label: "Saudi Heritage", desc: "Rich cultural tradition" },
      { tag: "warm-eclectic", label: "Warm Eclectic", desc: "Layered, personal, worldly" },
    ],
  },
  {
    key: "color" as const,
    question: "What's your color mood?",
    options: [
      { tag: "neutral-warm", label: "Neutral & Warm", desc: "Cream, sand, warm whites" },
      { tag: "black-white", label: "Black & White", desc: "High contrast, graphic clarity" },
      { tag: "earthy-tones", label: "Earthy Tones", desc: "Terracotta, rust, forest greens" },
      { tag: "bold-accents", label: "Bold Accents", desc: "Rich jewel tones, statement hues" },
    ],
  },
  {
    key: "material" as const,
    question: "What materials feel right?",
    options: [
      { tag: "natural-wood", label: "Natural Wood", desc: "Warm grain, organic texture" },
      { tag: "marble-stone", label: "Marble & Stone", desc: "Cool elegance, timeless luxury" },
      { tag: "woven-rattan", label: "Woven & Rattan", desc: "Artisanal, relaxed, tactile" },
      { tag: "metal-glass", label: "Metal & Glass", desc: "Sleek, modern, light-reflecting" },
    ],
  },
  {
    key: "atmosphere" as const,
    question: "How should your space feel?",
    options: [
      { tag: "calm-quiet", label: "Calm & Quiet", desc: "Serene, restful, uncluttered" },
      { tag: "bold-confident", label: "Bold & Confident", desc: "Dramatic, memorable" },
      { tag: "cozy-layered", label: "Cozy & Layered", desc: "Warm, inviting, textured" },
      { tag: "open-airy", label: "Open & Airy", desc: "Bright, spacious, breezy" },
    ],
  },
];

type Answers = Partial<Record<"style" | "color" | "material" | "atmosphere", string>>;

type Product = {
  id: string;
  title: string;
  handle: string;
  tags: string[];
  imageUrl: string;
  price: string;
  currencyCode: string;
  variantId: string;
  score: number;
};

// ── Component ────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0-3 = questions, 4 = loading, 5 = results
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string | null>(null); // flash feedback

  async function handleSelect(tag: string) {
    const q = QUESTIONS[step];
    setSelected(tag);

    // Brief visual confirmation before advancing
    await new Promise((r) => setTimeout(r, 220));

    const newAnswers = { ...answers, [q.key]: tag };
    setAnswers(newAnswers);
    setSelected(null);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Last question — fetch and score results
      setStep(4); // loading
      const chosenTags = Object.values(newAnswers).filter(Boolean) as string[];
      const products = await getProductsWithTags();

      const scored: Product[] = products
        .map(({ node }) => {
          const productTags = node.tags.map((t) => t.toLowerCase());
          const score = chosenTags.filter((t) => productTags.includes(t)).length;
          return {
            id: node.id,
            title: node.title,
            handle: node.handle,
            tags: node.tags,
            imageUrl: node.images.edges[0]?.node.url ?? "",
            price: node.priceRange.minVariantPrice.amount,
            currencyCode: node.priceRange.minVariantPrice.currencyCode,
            variantId: node.variants.edges[0]?.node.id ?? "",
            score,
          };
        })
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score);

      setResults(scored);
      setStep(5);
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResults([]);
    setSelected(null);
  }

  // ── Screens ───────────────────────────────────────────────────────────────

  if (step === 4) return <LoadingScreen />;
  if (step === 5) return <ResultsScreen results={results} answers={answers} onRestart={restart} />;

  const q = QUESTIONS[step];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FAFAF8",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 24px 80px",
      }}
    >
      {/* Header */}
      <Link
        href="/"
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: BRAND.colors.dark,
          textDecoration: "none",
          marginBottom: "40px",
          letterSpacing: "0.04em",
        }}
      >
        {BRAND.name}
      </Link>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "48px" }}>
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === step ? "28px" : "8px",
              height: "8px",
              borderRadius: "99px",
              background: i < step
                ? BRAND.colors.terracotta
                : i === step
                ? BRAND.colors.dark
                : "#ddd",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Question */}
      <div style={{ width: "100%", maxWidth: "540px" }}>
        <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {step + 1} of {QUESTIONS.length}
        </p>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 600,
            color: BRAND.colors.dark,
            margin: "0 0 32px",
            lineHeight: 1.3,
          }}
        >
          {q.question}
        </h1>

        {/* Options grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {q.options.map((opt) => {
            const isSelected = selected === opt.tag;
            return (
              <button
                key={opt.tag}
                onClick={() => handleSelect(opt.tag)}
                disabled={selected !== null}
                style={{
                  background: isSelected ? BRAND.colors.dark : "white",
                  border: `2px solid ${isSelected ? BRAND.colors.dark : "#e8e8e8"}`,
                  borderRadius: "12px",
                  padding: "24px 20px",
                  textAlign: "left",
                  cursor: selected !== null ? "default" : "pointer",
                  transition: "all 0.15s ease",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!selected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = BRAND.colors.terracotta;
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8e8e8";
                    (e.currentTarget as HTMLButtonElement).style.transform = "none";
                  }
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "15px",
                    margin: "0 0 6px",
                    color: isSelected ? "white" : BRAND.colors.dark,
                  }}
                >
                  {opt.label}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    margin: 0,
                    color: isSelected ? "rgba(255,255,255,0.75)" : "#888",
                    lineHeight: 1.4,
                  }}
                >
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

// ── Loading screen ────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        background: "#FAFAF8",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: `3px solid #eee`,
          borderTopColor: BRAND.colors.terracotta,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: "#999", fontSize: "14px" }}>Finding your matches…</p>
    </main>
  );
}

// ── Results screen ────────────────────────────────────────────────────────────

function ResultsScreen({
  results,
  answers,
  onRestart,
}: {
  results: Product[];
  answers: Answers;
  onRestart: () => void;
}) {
  const styleLabel = QUESTIONS[0].options.find((o) => o.tag === answers.style)?.label ?? "";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FAFAF8",
        fontFamily: "sans-serif",
        padding: "48px 24px 80px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <Link
          href="/"
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: BRAND.colors.dark,
            textDecoration: "none",
            display: "block",
            marginBottom: "32px",
            letterSpacing: "0.04em",
          }}
        >
          {BRAND.name}
        </Link>
        <h1 style={{ fontSize: "26px", fontWeight: 600, margin: "0 0 8px", color: BRAND.colors.dark }}>
          Your style matches
        </h1>
        <p style={{ fontSize: "14px", color: "#888", margin: "0 0 24px" }}>
          {styleLabel && `${styleLabel} · `}
          {results.length > 0
            ? `${results.length} product${results.length !== 1 ? "s" : ""} matched your taste`
            : "No products matched yet — vendors are still tagging their catalogue."}
        </p>

        {/* Answer summary pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {Object.values(answers).map((tag) => (
            <span
              key={tag}
              style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "99px",
                padding: "4px 14px",
                fontSize: "12px",
                color: "#555",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Product grid */}
      {results.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: "#bbb",
            fontSize: "14px",
          }}
        >
          Check back soon — products are being added.
        </div>
      )}

      {/* Restart */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={onRestart}
          style={{
            background: "transparent",
            border: `2px solid ${BRAND.colors.dark}`,
            color: BRAND.colors.dark,
            padding: "12px 32px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Retake the quiz
        </button>
      </div>
    </main>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const matchLabel =
    product.score === 4
      ? "Perfect match"
      : product.score === 3
      ? "Strong match"
      : product.score === 2
      ? "Good match"
      : "Possible match";

  const matchColor =
    product.score === 4
      ? BRAND.colors.terracotta
      : product.score === 3
      ? "#166534"
      : product.score === 2
      ? "#b45309"
      : "#888";

  return (
    <Link
      href={`/products/${product.handle}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #eee",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "none";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div
          style={{
            aspectRatio: "1",
            background: "#f5f5f5",
            overflow: "hidden",
          }}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ccc",
                fontSize: "13px",
              }}
            >
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: matchColor,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "block",
              marginBottom: "4px",
            }}
          >
            {matchLabel}
          </span>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              margin: "0 0 6px",
              color: BRAND.colors.dark,
              lineHeight: 1.3,
            }}
          >
            {product.title}
          </p>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
            {parseFloat(product.price).toLocaleString()} {product.currencyCode}
          </p>
        </div>
      </div>
    </Link>
  );
}
