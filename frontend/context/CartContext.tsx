"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CartItem = {
  bookId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  total: number;
  count: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addItem: (bookId: string, quantity?: number) => Promise<{ ok: boolean; error?: string }>;
  updateQuantity: (bookId: string, quantity: number) => Promise<{ ok: boolean; error?: string }>;
  removeItem: (bookId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setItems(data.items ?? []);
    setTotal(data.total ?? 0);
  };

  useEffect(() => {
    refreshCart().finally(() => setLoading(false));
  }, []);

  const addItem = async (bookId: string, quantity = 1) => {
    const res = await fetch("/api/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, quantity }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems(data.items);
      setTotal(data.total);
      return { ok: true };
    }
    return { ok: false, error: res.status === 401 ? "Please log in to add items to your cart." : data.error };
  };

  const updateQuantity = async (bookId: string, quantity: number) => {
    const res = await fetch(`/api/cart/items/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems(data.items);
      setTotal(data.total);
      return { ok: true };
    }
    return { ok: false, error: data.error };
  };

  const removeItem = async (bookId: string) => {
    const res = await fetch(`/api/cart/items/${bookId}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      setItems(data.items);
      setTotal(data.total);
    }
  };

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, count, loading, refreshCart, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}