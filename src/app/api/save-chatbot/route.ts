import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { website, goal } = await req.json();

  const id = Math.random().toString(36).substring(2, 8);

  const embedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/embed/chatbot?id=${id}`;

  return NextResponse.json({ success: true, embedUrl });
}
