"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Book, CartItem } from "./types";

type CartCtx = {
  cart: CartItem[];
  add: (book: Book) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const add = useCallback((book: Book) => {
    setCart(prev => {
      const ex = prev.find(i => i.bookId === book.bookId);
      if (ex) return prev.map(i => i.bookId === book.bookId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...book, quantity: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => setCart(prev => prev.filter(i => i.bookId !== id)), []);

  const update = useCallback((id: string, qty: number) => {
    if (qty < 1) { remove(id); return; }
    setCart(prev => prev.map(i => i.bookId === id ? { ...i, quantity: qty } : i));
  }, [remove]);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  return <Ctx.Provider value={{ cart, add, remove, update, total, count }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
