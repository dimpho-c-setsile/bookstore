import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ items: [], total: 0 });

  const res = await fetch("http://localhost:5188/api/Cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return NextResponse.json({ items: [], total: 0 });
  return NextResponse.json(await res.json());
}