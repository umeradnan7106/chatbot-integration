import { NextResponse } from "next/server";
import { OpenAI } from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo", // ✅ Use OpenAI model, not Gemini
    });

    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
