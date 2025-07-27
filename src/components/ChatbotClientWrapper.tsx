// components/ChatbotClientWrapper.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

const suggestedQuestions = [
  "Can you tell me more about this website?",
  "What services or features do you provide?",
  "How can I get in touch with you?",
  "Do you offer support or help for visitors?",
];

export default function ChatbotClientWrapper() {
  const params = useSearchParams();
  const chatbotId = params.get("id");

  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "👋 Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (textToSend?: string) => {
    const message = textToSend ?? input;
    if (!message.trim() || !chatbotId) return;

    const userMessage: Message = { from: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: chatbotId,
          message,
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        from: "bot",
        text: data.reply ?? "🤖 Sorry, no response received.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Sorry, something went wrong while contacting the bot.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatbotId) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-center p-8">
        <p className="text-red-600 text-sm">
          ❌ Missing Chatbot ID. Please provide a valid chatbot ID in the URL
          as:
          <br />
          <code className="bg-gray-100 p-1 mt-2 block text-black">
            ?id=yourChatbotId
          </code>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white rounded-xl border shadow text-sm">
      {/* Header */}
      <div className="bg-black text-white px-4 py-3 font-semibold flex justify-between items-center">
        <span>ChatBot Assistant</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-100 space-y-2">
        {/* Suggested Questions */}
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition"
              onClick={() => sendMessage(question)}
              disabled={isLoading}
            >
              {question}
            </button>
          ))}
        </div>

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[75%] whitespace-pre-line ${
                msg.from === "user"
                  ? "bg-black text-white"
                  : "bg-white text-black border"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-black border px-4 py-2 rounded-lg text-sm">
              Typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 text-sm border rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={() => sendMessage()}
          disabled={isLoading}
          className="bg-black text-white px-3 py-2 rounded-md disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
