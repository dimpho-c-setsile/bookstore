import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch("http://localhost:5188/api/Auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json(); // { accessToken, email, fullName, role }

  const response = NextResponse.json({
    email: data.email,
    fullName: data.fullName,
    role: data.role,
  });

  response.cookies.set("token", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // matches your 15-minute token
  });

  return response;
}