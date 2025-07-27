// // //src/app/api/ask-question/route.ts

// import { NextResponse } from "next/server";
// import { OpenAI } from "openai";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   try {
//     const { message, id } = await req.json();

//     if (!id) {
//       return NextResponse.json({ error: "Missing Chatbot ID." }, { status: 400 });
//     }

//     if (!message || typeof message !== "string") {
//       return NextResponse.json({ error: "Invalid or missing message." }, { status: 400 });
//     }

//     console.log(`Incoming message from chatbot ${id}:`, message);

//     // ✅ Gemini logic for abc1234
//     if (id === "abc1234") {
//       const websiteURL = "https://services-website-orpin.vercel.app/"; // Replace with dynamic URL if you store it

//       const res = await fetch(websiteURL);
//       const html = await res.text();

//       const websiteText = html
//         .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
//         .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
//         .replace(/<[^>]+>/g, "")
//         .replace(/\s{2,}/g, " ")
//         .trim()
//         .slice(0, 6000);

//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       const chat = model.startChat({
//         history: [
//           {
//             role: "user",
//             parts: [{ text: `You're a helpful chatbot. Here's the site:\n${websiteText}` }],
//           },
//           {
//             role: "model",
//             parts: [{ text: "Got it! Let's help the user 😄" }],
//           },
//         ],
//       });

//       const result = await chat.sendMessage(message);
//       const response = await result.response;
//       const text = response.text();

//       return NextResponse.json({ reply: text });
//     }

//     // ✅ Default fallback: OpenAI (for other IDs)
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: message }],
//       model: "gpt-3.5-turbo",
//     });

//     const reply = completion?.choices?.[0]?.message?.content ?? null;

//     if (!reply) {
//       return NextResponse.json({ error: "No reply from AI." }, { status: 500 });
//     }

//     return NextResponse.json({ reply });

//   } catch (err) {
//     console.error("Chatbot error:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, id } = await req.json();

    // Validate ID
    if (!id) {
      return NextResponse.json({ error: "Missing Chatbot ID." }, { status: 400 });
    }

    // Validate message
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid or missing message." }, { status: 400 });
    }

    console.log(`📩 Incoming message from chatbot ${id}:`, message);

    // ✅ Gemini logic for ID "abc1234"
    if (id === "abc1234") {
      const websiteURL = "https://services-website-orpin.vercel.app/";

      const res = await fetch(websiteURL);
      const html = await res.text();

      const websiteText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, 6000);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: `You're a helpful chatbot. Here's the site:\n${websiteText}` }],
          },
          {
            role: "model",
            parts: [{ text: "Got it! Let's help the user 😄" }],
          },
        ],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ reply: text });
    }

    // ✅ Default: OpenAI (for all other IDs)
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, friendly assistant for a company website. Reply in short, clear sentences. Avoid lengthy or overly formal responses. Keep answers under 70 words.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      temperature: 0.7,
    });

    const reply = completion?.choices?.[0]?.message?.content ?? null;

    if (!reply) {
      return NextResponse.json({ error: "No reply from AI." }, { status: 500 });
    }

    return NextResponse.json({ reply });

  } catch (err) {
    console.error("❌ Chatbot error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
