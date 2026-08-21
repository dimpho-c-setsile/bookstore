"use client";
import Link from "next/link";
import { BOOKS, CATEGORIES } from "@/lib/data";
import BookCard from "@/components/BookCard";
import { ArrowRight, TrendingUp, BookMarked, Clock } from "lucide-react";

const HERO_BOOKS = BOOKS.slice(0, 3);
const FEATURED = BOOKS.filter(b => b.badge).slice(0, 4);
const NEW_ARRIVALS = BOOKS.slice(-4);

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--cream)", padding: "80px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            {/*<div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 28, color: "var(--gold)" }}>
              ✦ CURATED FOR CURIOUS MINDS
            </div>*/}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.02em" }}>
              The Next Chapter<br />
              <span style={{ fontStyle: "italic", color: "var(--gold)" }}>In Your</span><br />
              Reading Journey.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(245,240,232,0.65)", marginBottom: 36, maxWidth: 440 }}>
              Browse a curated collection of page-turners, deep-dives, and life-changing reads — handpicked to meet your unique taste.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/store" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--cream)", color: "var(--ink)", borderRadius: 100, textDecoration: "none", fontWeight: 700, fontSize: 14, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Browse All Books <ArrowRight size={16} />
              </Link>
              <Link href="/store?category=Bestseller" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "transparent", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, textDecoration: "none", fontWeight: 500, fontSize: 14 }}>
                Bestsellers
              </Link>
            </div>
          </div>
          {/* Hero book display */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end", justifyContent: "center" }}>
            {HERO_BOOKS.map((book, i) => (
              <div key={book.id} style={{ flex: 1, backgroundImage: `url(${book.cover})`, borderRadius: 10, padding: 20, transform: i === 1 ? "translateY(-24px)" : "none", boxShadow: "0 32px 64px rgba(0,0,0,0.4)", maxWidth: 140, aspectRatio: "2/3", display: "flex", flexDirection: "column", backgroundSize:"100%" ,justifyContent: "flex-end" }}>
             {/*  <div style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{book.title}</div>*/}
                {/*<div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 4 }}>{book.author}</div>*/}
              </div>
            ))}
          </div>
        </div>
        {/* BG decoration */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      </section>

      {/* STATS */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { icon: <BookMarked size={18} />, stat: "2M+", label: "Books Available" },
            { icon: <TrendingUp size={18} />, stat: "50K+", label: "Happy Readers" },
            { icon: <Clock size={18} />, stat: "24hr", label: "Fast Delivery" },
            { icon: null, stat: "4.9★", label: "Average Rating" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "24px 0", borderRight: i < 3 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              {s.icon && <span style={{ color: "var(--rust)" }}>{s.icon}</span>}
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700 }}>{s.stat}</div>
                <div style={{ fontSize: 11, color: "var(--slate)", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--rust)", marginBottom: 8 }}>BROWSE BY GENRE</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700 }}>What Kind of Story<br />Are You Craving?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "Fiction", color: "linear-gradient(135deg,#1a1a2e,#16213e)", count: 341 },
            { name: "Fantasy", color: "linear-gradient(135deg,#0f3460,#533483)", count: 218 },
            { name: "Nonfiction", color: "linear-gradient(135deg,#c84b2f,#8b1a0a)", count: 512 },
            { name: "Thriller", color: "linear-gradient(135deg,#1a1a1a,#3d1515)", count: 189 },
            { name: "Romance", color: "linear-gradient(135deg,#4a1a3d,#8b2355)", count: 276 },
            { name: "Biography", color: "linear-gradient(135deg,#3d3000,#6b5200)", count: 134 },
          ].map(cat => (
            <Link key={cat.name} href={`/store?category=${cat.name}`} style={{ textDecoration: "none", background: cat.color, borderRadius: 12, padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 140, transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>{cat.count} BOOKS</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-0.01em" }}>{cat.name}</div>
              <div style={{ marginTop: 8, color: "rgba(255,255,255,0.6)", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>Browse <ArrowRight size={12} /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED / BESTSELLERS */}
      <section style={{ background: "var(--paper)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--rust)", marginBottom: 8 }}>EDITOR'S CHOICE</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700 }}>Featured This Month</h2>
            </div>
            <Link href="/store" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "var(--ink)", fontWeight: 600, fontSize: 13, borderBottom: "1px solid var(--ink)", paddingBottom: 2 }}>
              See All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {FEATURED.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className='bg p-' style={{ background: "var(--moss)", color: "var(--cream)", padding: "60px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 12 }}>LIMITED TIME OFFER</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>Get <span style={{ color: "var(--gold)" }}>20% Off</span><br />Your First Order</h2>
          <p style={{ color: "rgba(245,240,232,0.65)", marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>Join over 50,000 readers who've found their next favorite book with Folio.</p>
          <div style={{ display: "flex", gap: 0, maxWidth: 400, margin: "0 auto" }}>
            <input placeholder="Enter your email" style={{ flex: 1, padding: "14px 20px", borderRadius: "100px 0 0 100px", border: "none", fontSize: 14, background: "rgba(255,255,255,0.1)", color: "white", outline: "none" }} />
            <button style={{ padding: "14px 24px", background: "var(--gold)", color: "var(--ink)", border: "none", borderRadius: "0 100px 100px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Get 20% Off</button>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--rust)", marginBottom: 8 }}>JUST LANDED</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700 }}>New Arrivals</h2>
            </div>
            <Link href="/store" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "var(--ink)", fontWeight: 600, fontSize: 13, borderBottom: "1px solid var(--ink)", paddingBottom: 2 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {NEW_ARRIVALS.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--ink)", color: "var(--cream)", padding: "60px 32px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Folio</div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(245,240,232,0.5)", maxWidth: 260 }}>A curated bookstore for readers who believe that the right book at the right time can change everything.</p>
            </div>
            {[
              { title: "Shop", links: ["Fiction","Fantasy","Nonfiction","Thriller","Sale"] },
              { title: "Help", links: ["About Us","Shipping","Returns","Contact","FAQ"] },
              { title: "Legal", links: ["Privacy","Terms","Cookies","Accessibility"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--gold)", marginBottom: 16 }}>{col.title.toUpperCase()}</div>
                {col.links.map(l => <div key={l} style={{ fontSize: 13, color: "rgba(245,240,232,0.5)", marginBottom: 10, cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(245,240,232,0.35)", fontFamily: "'DM Mono', monospace" }}>
            <span>© 2026 FOLIO BOOKS. ALL RIGHTS RESERVED.</span>
           
          </div>
        </div>
      </footer>
    </main>
  );
}
