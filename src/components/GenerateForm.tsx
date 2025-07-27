// src/components/GenerateForm.tsx
"use client";

import { useState } from "react";

export default function GenerateForm() {
  const [website, setWebsite] = useState("");
  const [goal, setGoal] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/save-chatbot", {
      method: "POST",
      body: JSON.stringify({ website, goal }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setGeneratedUrl(data.embedUrl);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">🧠 Create Your Chatbot</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Your Website URL"
          className="border px-3 py-2 w-full rounded"
          required
        />
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What should the chatbot do?"
          className="border px-3 py-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Generate Chatbot
        </button>
      </form>

      {generatedUrl && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-sm font-medium">✅ Embed this in your website:</p>
          <code className="block mt-2 bg-white p-2 rounded text-sm">
            {`<iframe src="${generatedUrl}" style="width: 100%; height: 400px;"></iframe>`}
          </code>
        </div>
      )}
    </div>
  );
}
