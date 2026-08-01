"use client";
import { useParams } from "next/navigation";
import { BOOKS } from "@/lib/data";
import { useCart } from "@/lib/store";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { Star, ShoppingBag, ArrowLeft, BookOpen, Clock, Hash } from "lucide-react";
import { useState } from "react";

export default function BookPage() {
  const { id } = useParams();
  const book = BOOKS.find(b => b.id === id);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (!book) return (
    <div style={{ textAlign: "center", padding: 80 }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32 }}>Book not found</h2>
      <Link href="/store" style={{ color: "var(--rust)" }}>← Back to store</Link>
    </div>
  );

  const related = BOOKS.filter(b => b.id !== book.id && b.category === book.category).slice(0, 3);

  const handleAdd = () => {
    add(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px" }}>
      <Link href="/store" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--slate)", textDecoration: "none", fontSize: 13, marginBottom: 40 }}>
        <ArrowLeft size={14} /> Back to catalog
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 64, marginBottom: 80 }}>
        {/* Cover */}
        <div>
          <div style={{ background: book.cover, borderRadius: 16, padding: 48, aspectRatio: "3/4", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0 40px 80px rgba(0,0,0,0.2)" }}>
            {book.badge && (
              <span style={{ display: "inline-block", background: "var(--rust)", color: "white", padding: "4px 12px", borderRadius: 100, fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", marginBottom: 16, alignSelf: "flex-start" }}>{book.badge}</span>
            )}
            <div style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.9)", fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>{book.title}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>{book.author.toUpperCase()}</div>
          </div>
        </div>

        {/* Details */}
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--rust)", marginBottom: 12 }}>{book.category.toUpperCase()}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 8, letterSpacing: "-0.02em" }}>{book.title}</h1>
          <div style={{ fontSize: 18, color: "var(--slate)", marginBottom: 20, fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>by {book.author}</div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "12px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= Math.round(book.rating) ? "var(--gold)" : "transparent"} color="var(--gold)" />)}
            </div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{book.rating}</span>
            <span style={{ fontSize: 13, color: "var(--slate)", fontFamily: "'DM Mono', monospace" }}>({book.reviews.toLocaleString()} reviews)</span>
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#444", marginBottom: 32 }}>{book.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { icon: <BookOpen size={16} />, label: "Pages", value: book.pages.toString() },
              { icon: <Clock size={16} />, label: "Published", value: book.year.toString() },
              { icon: <Hash size={16} />, label: "Genre", value: book.category },
            ].map(m => (
              <div key={m.label} style={{ background: "var(--paper)", borderRadius: 10, padding: "16px", display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "var(--rust)" }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", color: "var(--slate)", marginBottom: 2 }}>{m.label.toUpperCase()}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{m.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
            {book.tags.map(tag => (
              <span key={tag} style={{ padding: "4px 12px", background: "var(--paper)", border: "1px solid var(--border)", borderRadius: 100, fontSize: 12, color: "var(--slate)" }}>#{tag}</span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700 }}>${book.price}</div>
              {book.originalPrice && <div style={{ fontSize: 14, color: "var(--slate)", textDecoration: "line-through" }}>${book.originalPrice}</div>}
            </div>
            <button onClick={handleAdd} style={{ flex: 1, maxWidth: 260, padding: "16px 32px", background: added ? "var(--moss)" : "var(--ink)", color: "var(--cream)", border: "none", borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.3s" }}>
              <ShoppingBag size={18} />
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--rust)", marginBottom: 8 }}>MORE IN {book.category.toUpperCase()}</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>You May Also Like</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {related.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </div>
      )}
    </div>
  );
}
