"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createCart, addToCart as addToCartAPI, getCart } from "./lib/shopify";

type CartContextType = {
  cart: any;
  loading: boolean;
  addItem: (variantId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      getCart(cartId).then((c) => setCart(c));
    }
  }, []);

  async function addItem(variantId: string) {
    setLoading(true);
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      const newCart = await createCart();
      cartId = newCart.id;
      localStorage.setItem("cartId", cartId as string);
    }

    const updatedCart = await addToCartAPI(cartId as string, variantId);
    setCart(updatedCart);
    setLoading(false);
  }

  return (
    <CartContext.Provider value={{ cart, loading, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}