import Link from "next/link";

interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  // Optional but recommended: verify the session server-side rather than
  // trusting the URL param alone, so a user can't fake a success page hit.
  let orderConfirmed = false;
  let orderDetails: { email?: string; amount?: number } | null = null;

  if (sessionId) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkout/verify-session?sessionId=${sessionId}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        orderConfirmed = data.paid === true;
        orderDetails = { email: data.customerEmail, amount: data.amountTotal };
      }
    } catch {
      // Fail quietly — webhook is the source of truth anyway
    }
  }

  return (
    <div className="max-w-lg mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        {orderConfirmed ? "Order Confirmed!" : "Thanks for your order"}
      </h1>
      <p className="text-gray-600 mb-2">
        {orderConfirmed
          ? "Your payment was successful and your books are on the way."
          : "We're finalizing your order — you'll get a confirmation email shortly."}
      </p>
      {orderDetails?.email && (
        <p className="text-sm text-gray-500 mb-8">
          A receipt has been sent to {orderDetails.email}
        </p>
      )}
      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}