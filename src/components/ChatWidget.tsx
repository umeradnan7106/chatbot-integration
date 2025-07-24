// 'use client';

// import { useState } from 'react';

// type Message = {
//   sender: 'user' | 'bot';
//   text: string;
// };

// export default function ChatWidget() {
//   const [messages, setMessages] = useState<Message[]>([
//     { sender: 'bot', text: 'Hi, how can I help you today?' },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();
//       const botReply: Message = { sender: 'bot', text: data.reply };
//       setMessages((prev) => [...prev, botReply]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: 'bot', text: "Sorry, I couldn't respond right now." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') handleSend();
//   };

//   return (
//     <div className="fixed bottom-6 right-6 max-w-sm w-full z-50 shadow-lg">
//       <div className="bg-white border border-gray-300 rounded-t-lg px-4 py-2 font-semibold text-gray-800">
//         Acme Support
//       </div>
//       <div className="bg-gray-50 h-80 overflow-y-auto p-4 space-y-3 rounded-b-lg">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${
//               msg.sender === 'user' ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div
//               className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
//                 msg.sender === 'user'
//                   ? 'bg-black text-white rounded-br-none'
//                   : 'bg-gray-200 text-gray-800 rounded-bl-none'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {loading && (
//           <div className="text-sm text-gray-500 italic">Typing...</div>
//         )}
//       </div>
//       <div className="flex border-t border-gray-300">
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 text-sm border-none outline-none rounded-bl-lg"
//           placeholder="Type your message here..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-black text-white px-4 py-2 text-sm rounded-br-lg hover:bg-gray-900"
//         >
//           ➤
//         </button>
//       </div>
//     </div>
//   );
// }


// // components/ChatWidget.tsx

// // 'use client';
// // import { useState } from "react";

// // type Message = {
// //   role: "user" | "bot";
// //   content: string;
// // };

// // export default function ChatWidget() {
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [message, setMessage] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const sendMessage = async (customMessage?: string) => {
// //     const finalMessage = customMessage || message;
// //     if (!finalMessage) return;

// //     const newMsg: Message = { role: "user", content: finalMessage };
// //     setMessages((prev) => [...prev, newMsg]);
// //     setMessage("");
// //     setLoading(true);

// //     try {
// //       const res = await fetch("/api/chat", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           message: finalMessage,
// //           url: window.location.href,
// //         }),
// //       });

// //       const data = await res.json();

// //       setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
// //     } catch (err) {
// //       setMessages((prev) => [...prev, { role: "bot", content: "⚠️ Error occurred while responding." }]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed bottom-4 right-4 w-[90vw] sm:w-[350px] max-h-[80vh] bg-white shadow-xl rounded-md border p-4 flex flex-col z-50 text-sm">
      
// //       {/* Predefined Questions */}
// //       <div className="mb-2 flex flex-wrap gap-2">
// //         {["What is this website about?", "What services do you offer?", "How can I contact you?"].map((q, idx) => (
// //           <button
// //             key={idx}
// //             onClick={() => sendMessage(q)}
// //             className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition text-xs"
// //           >
// //             {q}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Message Display Area */}
// //       <div className="flex-1 overflow-y-auto space-y-2 mb-2">
// //         {messages.map((msg, index) => (
// //           <div
// //             key={index}
// //             className={`p-2 rounded ${
// //               msg.role === "user"
// //                 ? "bg-blue-100 text-right"
// //                 : "bg-gray-100 text-left"
// //             }`}
// //           >
// //             {msg.content}
// //           </div>
// //         ))}
// //         {loading && (
// //           <div className="text-gray-400 text-xs animate-pulse">Generating reply...</div>
// //         )}
// //       </div>

// //       {/* Input Area */}
// //       <div className="flex gap-2">
// //         <input
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //           className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
// //           placeholder="Type your message..."
// //         />
// //         <button
// //           onClick={() => sendMessage()}
// //           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
// //         >
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

