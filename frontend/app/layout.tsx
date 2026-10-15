import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Folio — Rare & Curated Books",
  description: "A curated collection of books for the discerning reader",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
