"use client";
import { useState } from "react";
import { BRAND } from "../config/brand";

const FAQS = [
  {
    q: "Where do your products ship from?",
    a: "All products are sourced from verified Saudi and Egyptian designers and manufacturers. Most orders ship from within the Kingdom, with select pieces arriving from Egypt within 5–10 business days.",
  },
  {
    q: "Do you offer free delivery?",
    a: "Yes — orders over SAR 1,500 qualify for free standard delivery within Saudi Arabia. For orders below that threshold, a flat delivery fee of SAR 99 applies.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Absolutely. We support Tabby and Tamara at checkout, letting you split any purchase into 4 interest-free payments. Simply select your preferred option when you check out.",
  },
  {
    q: "What is the return policy?",
    a: "We accept returns within 14 days of delivery for items in their original condition and packaging. Custom or made-to-order pieces are non-refundable. Contact our team to initiate a return.",
  },
  {
    q: "How does the Trade Program work?",
    a: "Interior designers and architects can apply for our Trade Program to access exclusive pricing (up to 20% off), a dedicated bundle builder, and priority support. Apply at marsahome.com/trade and we'll review your application within 48 hours.",
  },
  {
    q: "How does the AI Style Quiz work?",
    a: "Our quiz asks 4 questions about your preferred style, colours, materials, and atmosphere. Your answers are matched against our catalogue tags so we can surface the products most likely to feel like home to you — no account needed.",
  },
  {
    q: "Can I visit a showroom?",
    a: "We're an online-first marketplace, but several of our vendor brands have showrooms in Riyadh and Jeddah. Check individual product pages for vendor contact details and showroom locations.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              borderBottom: "1px solid #EEEAE5",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                padding: "22px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{
                fontSize: "15px",
                fontWeight: 500,
                color: BRAND.colors.dark,
                lineHeight: 1.4,
              }}>
                {faq.q}
              </span>
              <span style={{
                flexShrink: 0,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: `1.5px solid ${isOpen ? BRAND.colors.terracotta : "#DDD"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isOpen ? BRAND.colors.terracotta : "#AAA",
                fontSize: "16px",
                fontWeight: 300,
                transition: "all 0.2s",
              }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <p style={{
                fontSize: "14px",
                color: "#6B6360",
                lineHeight: 1.75,
                margin: "0 0 22px",
                paddingRight: "52px",
              }}>
                {faq.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
