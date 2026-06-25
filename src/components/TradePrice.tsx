"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { BRAND } from "../config/brand";

type Props = {
  amount: string;
  currencyCode: string;
};

export function TradePrice({ amount, currencyCode }: Props) {
  const [discountPct, setDiscountPct] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.user_metadata?.role === "designer") {
        setDiscountPct(Number(user.user_metadata.trade_discount ?? 20));
      }
    });
  }, []);

  if (discountPct === null) return null;

  const original = parseFloat(amount);
  const discounted = (original * (1 - discountPct / 100)).toFixed(2);

  return (
    <div
      style={{
        background: "#FFF5F2",
        border: `1px solid ${BRAND.colors.terracotta}`,
        borderRadius: "6px",
        padding: "10px 14px",
        marginTop: "8px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          color: BRAND.colors.terracotta,
          fontWeight: 600,
          margin: "0 0 2px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Designer Trade Price — {discountPct}% off
      </p>
      <p style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
        {discounted} {currencyCode}
      </p>
    </div>
  );
}
