"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Search, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { count } = useCart();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  const categories = [
    "Fiction",
    "Fantasy",
    "Nonfiction",
    "Thriller",
    "Romance",
  ];

  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--border)] bg-[var(--cream)]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 no-underline"
        >
          <BookOpen
            size={22}
            strokeWidth={1.8}
            className="text-[var(--ink)]"
          />

          <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[var(--ink)]">
            Folio
          </span>
        </Link>

        {/* Categories */}
        <div className="flex items-center gap-8">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/store?category=${cat}`}
              className="
                text-[13px]
                font-medium
                tracking-[0.05em]
                text-[var(--ink)]
                opacity-60
                transition-all
                duration-200
                hover:opacity-100
              "
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <Link
            href="/store"
            aria-label="Search books"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border border-[var(--border)]
              text-[var(--ink)]
              transition-all duration-200
              hover:border-[var(--ink)]
              hover:bg-[var(--ink)]
              hover:text-[var(--cream)]
            "
          >
            <Search size={15} strokeWidth={1.8} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="
              group
              relative
              flex items-center gap-2
              rounded-full
              bg-[var(--ink)]
              px-2 py-2
              text-[13px]
              font-medium
              text-[var(--cream)]
              no-underline
              transition-all duration-200
              hover:-translate-y-[1px]
              hover:opacity-90
            "
          >
            <ShoppingBag
              size={15}
              strokeWidth={1.8}
            />

            <span>Cart</span>

            {count > 0 && (
              <span
                className="
                  flex h-[18px] w-[18px]
                  items-center justify-center
                  rounded-full
                  bg-[var(--rust)]
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {count}
              </span>
            )}
          </Link>

          {/* Divider */}
          <span className="mx-1 h-6 w-px bg-[var(--border)]" />

          {/* Authentication */}
          {loading ? (
            <span className="px-2 text-[13px] text-[var(--ink)] opacity-40">
              ...
            </span>
          ) : user ? (
            <div className="flex items-center gap-4">

              <span className="max-w-[150px] truncate text-[13px] text-[var(--ink)]">
                Hi, {user.fullName ?? user.email}
              </span>

              <button
                onClick={handleLogout}
                className="
                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0
                  text-[13px]
                  font-medium
                  text-[var(--ink)]
                  opacity-60
                  transition-opacity
                  hover:opacity-100
                "
              >
                Log out
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-4">

              {/* Login */}
              <Link
                href="/login"
                className="
                  text-[13px]
                  font-medium
                  text-[var(--ink)]
                  no-underline
                  opacity-70
                  transition-opacity
                  hover:opacity-100
                "
              >
                Log in
              </Link>

              {/* Register */}
              <Link
                href="/register"
                className="
                  rounded-full
                  border
                  border-[var(--ink)]
                  py-2 px-2
                  text-[13px]
                  font-medium
                  text-[var(--ink)]
                  no-underline
                  transition-all
                  duration-200
                  hover:bg-[var(--ink)]
                  hover:text-[var(--cream)]
                "
              >
                Register
              </Link>

            </div>
          )}
        </div>
      </nav>
    </header>
  );
}


