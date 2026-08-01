"use client";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { ShoppingBag, Search, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--cream)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
      {/* Top bar */}
      <div style={{ background: "var(--ink)", color: "var(--paper)", textAlign: "center", padding: "8px", fontSize: "12px", letterSpacing: "0.15em", fontFamily: "'DM Mono', monospace" }}>
        FREE SHIPPING ON ORDERS OVER $40 — USE CODE <span style={{ color: "var(--gold)" }}>FOLIO10</span> FOR 10% OFF
      </div>
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <BookOpen size={22} color="var(--ink)" />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>Folio</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Fiction","Fantasy","Nonfiction","Thriller","Romance"].map(cat => (
            <Link key={cat} href={`/store?category=${cat}`} style={{ textDecoration: "none", fontSize: 13, fontWeight: 500, color: "var(--ink)", letterSpacing: "0.05em", opacity: 0.7, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
            >{cat}</Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/store" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border)", color: "var(--ink)", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--ink)", (e.currentTarget as HTMLElement).style.color = "var(--cream)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent", (e.currentTarget as HTMLElement).style.color = "var(--ink)")}
          >
            <Search size={15} />
          </Link>
          <Link href="/cart" style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "var(--ink)", color: "var(--cream)", borderRadius: 100, textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <ShoppingBag size={15} />
            Cart
            {count > 0 && (
              <span style={{ background: "var(--rust)", color: "white", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{count}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
