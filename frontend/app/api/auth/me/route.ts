import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const res = await fetch("http://localhost:5188/api/Auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await res.json();
  return NextResponse.json({ user });
}