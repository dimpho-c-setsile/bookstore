import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const body = await req.json();
  const res = await fetch(`http://localhost:5188/api/Cart/items/${bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const res = await fetch(`http://localhost:5188/api/Cart/items/${bookId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}