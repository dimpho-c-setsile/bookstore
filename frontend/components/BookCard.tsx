"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Book } from "@/lib/types";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

interface BookCardProps {
  book: Book;
}


export default function BookCard({ book }: BookCardProps) {


 const { addItem } = useCart();
const [added, setAdded] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleAdd = async (e: React.MouseEvent) => {
  e.preventDefault();
  setError(null);

  const result = await addItem(book.bookId, 1);

  if (!result.ok) {
    setError(result.error ?? "Could not add to cart.");
    return;
  }

  setAdded(true);
  setTimeout(() => setAdded(false), 1500);
};

  return (
    <Link
      href={`/book/${book.bookId}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <article
        style={{
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--border)",
          transition: "transform 0.25s, box-shadow 0.25s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 20px 60px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Cover */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3/4",
            backgroundColor: "var(--paper)",
            backgroundImage: `url(/images/${book.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Quick Add overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "flex-end",
              padding: 16,
              opacity: 0,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          >
            <button
              onClick={handleAdd}
              style={{
                width: "100%",
                padding: "10px",
                background: added
                  ? "var(--moss)"
                  : "var(--cream)",
                color: "var(--ink)",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "background 0.2s",
              }}
            >
              <ShoppingBag size={14} />

              {added ? "Added!" : "Quick Add"}
            </button>
          </div>
        </div>

        {/* Book information */}
        <div
          style={{
            padding: "14px 16px 16px",
          }}
        >
          {/* Book name */}
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--ink)",
              marginBottom: 4,
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.3,
            }}
          >
            {book.name}
          </div>

          {/* Author */}
          <div
            style={{
              fontSize: 11,
              color: "var(--slate)",
              marginBottom: 10,
            }}
          >
            {book.author}
          </div>

          {/* Price + category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "var(--ink)",
              }}
            >
              R{Number(book.price).toFixed(2)}
            </span>

            <span
              style={{
                fontSize: 10,
                color: "var(--slate)",
                background: "var(--paper)",
                padding: "2px 8px",
                borderRadius: 100,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {book.category}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
