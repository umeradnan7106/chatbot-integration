'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChatbotClientWrapper() {
  const params = useSearchParams();
  const chatbotId = params.get('id');

  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/ask-question', {
      method: 'POST',
      body: JSON.stringify({
        chatbotId,
        question: input,
      }),
    });
    const data = await res.json();

    setMessages([...newMessages, { from: 'bot', text: data.answer }]);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', height: '100%', padding: '10px' }}>
      <div style={{ maxHeight: '430px', overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'bot' ? 'left' : 'right', margin: '10px 0' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '20px',
                background: msg.from === 'bot' ? '#e2e8f0' : '#1e40af',
                color: msg.from === 'bot' ? '#000' : '#fff',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '8px', borderRadius: '20px', border: '1px solid #ccc' }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            borderRadius: '20px',
            background: '#1e40af',
            color: '#fff',
            border: 'none',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
