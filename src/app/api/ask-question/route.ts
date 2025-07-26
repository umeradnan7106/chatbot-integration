// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { chatbotId, question } = body;

//   // For now, just mock a simple reply
//   return NextResponse.json({
//     answer: `You asked: "${question}" — this is a reply from bot ID ${chatbotId}`,
//   });
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, message } = await req.json();

  // For now, return a mocked AI response
  const reply = `You asked: "${message}". This is a mocked response from chatbot ${id}.`;

  return NextResponse.json({ reply });
}
