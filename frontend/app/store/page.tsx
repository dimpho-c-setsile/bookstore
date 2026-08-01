"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BOOKS, CATEGORIES } from "@/lib/data";
import BookCard from "@/components/BookCard";
import { SlidersHorizontal, X } from "lucide-react";

function StoreContent() {
  const params = useSearchParams();
  const initCat = params.get("category") || "All";
  const [category, setCategory] = useState(initCat);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState(100);

  const filtered = useMemo(() => {
    let b = BOOKS;
    if (category !== "All") b = b.filter(x => x.category === category);
    if (search) b = b.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.author.toLowerCase().includes(search.toLowerCase()));
    b = b.filter(x => x.price <= priceMax);
    if (sort === "price-asc") b = [...b].sort((a, c) => a.price - c.price);
    if (sort === "price-desc") b = [...b].sort((a, c) => c.price - a.price);
    if (sort === "rating") b = [...b].sort((a, c) => c.rating - a.rating);
    return b;
  }, [category, sort, search, priceMax]);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--rust)", marginBottom: 8 }}>CATALOG</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, letterSpacing: "-0.02em" }}>All Books</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 40 }}>
        {/* Sidebar */}
        <aside>
          <div style={{ position: "sticky", top: 100 }}>
            {/* Search */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--slate)", marginBottom: 10 }}>SEARCH</label>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Title or author..." style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, background: "white", outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
            </div>

            {/* Categories */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--slate)", marginBottom: 10 }}>GENRE</label>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", marginBottom: 4, borderRadius: 8, border: "1px solid", borderColor: category === cat ? "var(--ink)" : "transparent", background: category === cat ? "var(--ink)" : "transparent", color: category === cat ? "var(--cream)" : "var(--ink)", fontSize: 13, fontWeight: category === cat ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Price */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--slate)", marginBottom: 10 }}>MAX PRICE: <span style={{ color: "var(--ink)" }}>${priceMax}</span></label>
              <input type="range" min={10} max={100} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--ink)" }} />
            </div>

            {/* Sort */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--slate)", marginBottom: 10 }}>SORT BY</label>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, background: "white", cursor: "pointer", outline: "none" }}>
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: "var(--slate)", fontFamily: "'DM Mono', monospace" }}>{filtered.length} BOOKS</span>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--slate)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 8 }}>No books found</div>
              <button onClick={() => { setCategory("All"); setSearch(""); setPriceMax(100); }} style={{ marginTop: 16, padding: "10px 24px", background: "var(--ink)", color: "var(--cream)", border: "none", borderRadius: 100, cursor: "pointer", fontSize: 13 }}>Clear Filters</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {filtered.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: "center" }}>Loading...</div>}>
      <StoreContent />
    </Suspense>
  );
}
