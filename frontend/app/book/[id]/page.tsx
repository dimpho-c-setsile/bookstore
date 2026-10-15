"use client";

import { useParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  BookOpen,
  Clock,
  Hash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Book } from "@/lib/types";

import { useCart } from "@/context/CartContext";

export default function BookPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  
   const [addingToCart, setAddingToCart] = useState(false);
const [cartError, setCartError] = useState<string | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  /*const addItem = useCart((s) => s.addItem);*/
  const { addItem } = useCart();
  useEffect(() => {
  const fetchBook = async () => {
    try {
      setLoading(true);

      console.log("BOOK ID FROM URL:", id);



      const response = await fetch(`http://localhost:5188/api/Book/${id}`);

      console.log("STATUS:", response.status);

      const responseText = await response.text();

      console.log("API RESPONSE:", responseText);

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} - ${responseText}`
        );
      }

      const data = JSON.parse(responseText);

      console.log("BOOK:", data);

      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  fetchBook();
}, [id]);



// ...

const handleAddToCart = async () => {
  if (!book) return;
  setCartError(null);
  setAddingToCart(true);

  const result = await addItem(book.bookId, 1);

  if (!result.ok) {
    setCartError(result.error ?? "Could not add to cart.");
  } else {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  setAddingToCart(false);
};
 

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32,
          }}
        >
          Loading book...
        </h2>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32,
          }}
        >
          Book not found
        </h2>

        <Link
          href="/store"
          style={{ color: "var(--rust)" }}
        >
          ← Back to store
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "40px 32px",
      }}
    >
      <Link
        href="/store"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "var(--slate)",
          textDecoration: "none",
          fontSize: 13,
          marginBottom: 40,
        }}
      >
        <ArrowLeft size={14} />
        Back to catalog
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: 64,
          marginBottom: 80,
        }}
      >
        {/* Cover */}
        <div>
          <div
            style={{
              backgroundImage: `url(/images/${book.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 16,
              padding: 48,
              aspectRatio: "3/4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "rgba(255,255,255,0.9)",
                fontSize: 22,
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 8,
              }}
            >
              {book.name}
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
                letterSpacing: "0.1em",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {book.author.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "var(--rust)",
              marginBottom: 12,
            }}
          >
            {book.category.toUpperCase()}
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            {book.name}
          </h1>

          <div
            style={{
              fontSize: 18,
              color: "var(--slate)",
              marginBottom: 20,
              fontStyle: "italic",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            by {book.author}
          </div>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
              padding: "12px 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  fill="var(--gold)"
                  color="var(--gold)"
                />
              ))}
            </div>

            <span
              style={{
                fontSize: 13,
                color: "var(--slate)",
              }}
            >
              Book rating
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "#444",
              marginBottom: 32,
            }}
          >
            {book.description}
          </p>

          {/* Book information */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              
              {
                icon: <Clock size={16} />,
                label: "Stock",
                value: `${book.quantity}`,
              },
              {
                icon: <Hash size={16} />,
                label: "Genre",
                value: book.category,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--paper)",
                  borderRadius: 10,
                  padding: 16,
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--rust)" }}>
                  {item.icon}
                </span>

                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "0.1em",
                      color: "var(--slate)",
                      marginBottom: 2,
                    }}
                  >
                    {item.label.toUpperCase()}
                  </div>

                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price + cart */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 40,
                  fontWeight: 700,
                }}
              >
                R{Number(book.price).toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                maxWidth: 260,
                padding: "16px 32px",
                background: added
                  ? "var(--moss)"
                  : "var(--ink)",
                color: "var(--cream)",
                border: "none",
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.3s",
              }}
            >
              <ShoppingBag size={18} />

              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Related books */}
      {related.length > 0 && (
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "var(--rust)",
              marginBottom: 8,
            }}
          >
            MORE IN {book.category.toUpperCase()}
          </div>

          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            You May Also Like
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {related.map((relatedBook) => (
              <BookCard
                key={relatedBook.bookId}
                book={relatedBook}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}