import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { chatbotId, question } = body;

  // For now, just mock a simple reply
  return NextResponse.json({
    answer: `You asked: "${question}" — this is a reply from bot ID ${chatbotId}`,
  });
}
