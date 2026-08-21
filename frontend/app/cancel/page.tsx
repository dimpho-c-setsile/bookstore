import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="max-w-lg mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout Cancelled</h1>
      <p className="text-gray-600 mb-8">
        No charge was made. Your cart is still saved if you'd like to try again.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/cart"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Back to Cart
        </Link>
        <Link
          href="/"
          className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}