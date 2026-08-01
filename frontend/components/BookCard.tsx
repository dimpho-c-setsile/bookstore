"use client";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { Book } from "@/lib/data";
import { ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

export default function BookCard({ book }: { book: Book }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/book/${book.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <article style={{ background: "white", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", transition: "transform 0.25s, box-shadow 0.25s", cursor: "pointer" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        {/* Cover */}
        <div style={{ position: "relative", aspectRatio: "3/4", background: book.cover, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {book.badge && (
            <span style={{ position: "absolute", top: 12, left: 12, background: "var(--rust)", color: "white", padding: "3px 10px", borderRadius: 100, fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
              {book.badge}
            </span>
          )}
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.9)", fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>{book.title}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>{book.author.toUpperCase()}</div>
          </div>
          {/* Quick add overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", padding: 16, opacity: 0, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
          >
            <button onClick={handleAdd} style={{ width: "100%", padding: "10px", background: added ? "var(--moss)" : "var(--cream)", color: "var(--ink)", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s" }}>
              <ShoppingBag size={14} />
              {added ? "Added!" : "Quick Add"}
            </button>
          </div>
        </div>
        {/* Info */}
        <div style={{ padding: "14px 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
            <Star size={11} fill="var(--gold)" color="var(--gold)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{book.rating}</span>
            <span style={{ fontSize: 11, color: "var(--slate)", fontFamily: "'DM Mono', monospace" }}>({book.reviews.toLocaleString()})</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 2, fontFamily: "'Playfair Display', serif", lineHeight: 1.3 }}>{book.title}</div>
          <div style={{ fontSize: 11, color: "var(--slate)", marginBottom: 10 }}>{book.author}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>${book.price}</span>
              {book.originalPrice && <span style={{ fontSize: 12, color: "var(--slate)", textDecoration: "line-through" }}>${book.originalPrice}</span>}
            </div>
            <span style={{ fontSize: 10, color: "var(--slate)", background: "var(--paper)", padding: "2px 8px", borderRadius: 100, fontFamily: "'DM Mono', monospace" }}>{book.category}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
