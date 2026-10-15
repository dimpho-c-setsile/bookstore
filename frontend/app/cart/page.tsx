"use client";
import { useEffect, useState } from "react";

type CartItem = {
  bookId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCart = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setItems(data.items ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (bookId: string, quantity: number) => {
    if (quantity < 1) return;
    const res = await fetch(`/api/cart/items/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems(data.items);
      setTotal(data.total);
      setError(null);
    } else {
      setError(data.error ?? "Could not update quantity.");
    }
  };

  const removeItem = async (bookId: string) => {
    const res = await fetch(`/api/cart/items/${bookId}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      setItems(data.items);
      setTotal(data.total);
    }
  };

  const makePayment = async () => {
    setError(null);
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      if (!response.ok) throw new Error(`Checkout session request failed (${response.status})`);

      const session = await response.json();
      if (!session.url) throw new Error("Checkout session response is missing a redirect url.");

      window.location.href = session.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong during checkout.");
      setIsCheckingOut(false);
    }
  };

  if (loading) return null;

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: "42rem", marginLeft: "auto", marginRight: "auto", paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" }}>
        <p style={{ color: "#4b5563", marginBottom: "1.5rem" }}>Your cart is empty.</p>
        <a href="/" style={{ textDecoration: "underline" }}>Browse books</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "42rem", margin: "0 auto", paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>Your Cart</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map((item) => (
          <div key={item.bookId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
            <div>
              <p style={{ fontWeight: "500" }}>{item.name}</p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>R{item.price.toFixed(2)} each</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (Number.isNaN(next)) return;
                  updateQuantity(item.bookId, next);
                }}
                style={{ width: "4rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.25rem 0.5rem" }}
              />
              <button
                onClick={() => removeItem(item.bookId)}
                style={{ color: "#ef4444", fontSize: "0.875rem", background: "none", border: "none", cursor: "pointer" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <p style={{ color: "#ef4444", marginTop: "1rem", fontSize: "0.875rem" }}>{error}</p>}

      <div style={{ display: "flex", marginTop: "2rem", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>Total: R{total.toFixed(2)}</p>
        <button
          onClick={makePayment}
          disabled={isCheckingOut}
          style={{ color: "white", backgroundColor: isCheckingOut ? "#4b5563" : "black", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", cursor: isCheckingOut ? "not-allowed" : "pointer", transition: "background-color 0.2s" }}
        >
          {isCheckingOut ? "Redirecting…" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
}