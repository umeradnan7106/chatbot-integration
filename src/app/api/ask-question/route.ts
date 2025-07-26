import { NextResponse } from "next/server";
import { OpenAI } from "openai"; // install openai package

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function POST(req: Request) {
  const { message } = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "google/gemini-2.0-flash-exp:free",
  });

  const reply = completion.choices[0].message.content;
  return NextResponse.json({ reply });
}
