// app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { message, url } = await req.json();

  try {
    // Step 1: Fetch website content
    const res = await fetch(url);
    const html = await res.text();

    // Step 2: Clean HTML and extract readable content
    const websiteText = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 6000); // Gemini input limit

    // Step 3: Start chat with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You're a friendly and casual chatbot that helps users understand websites. Keep responses short, helpful, and use emojis when relevant.\n\nHere's the website content:\n${websiteText}`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `Got it! I’ll answer questions in a chill, helpful way 😄`,
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      reply: "Oops! Something went wrong. Try again later 😕",
    });
  }
}
