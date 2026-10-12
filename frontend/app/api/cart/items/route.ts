import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("TOKEN FROM COOKIE:", token);
  if (!token) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const body = await req.json();
  const res = await fetch("http://localhost:5188/api/Cart/items", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}