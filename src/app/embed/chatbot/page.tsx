// src/app/embed/chatbot/page.tsx
'use client';

import { Suspense } from 'react';
import ChatbotClientWrapper from '../../../components/ChatbotClientWrapper';

export default function EmbedChatbotPage() {
  return (
    <Suspense fallback={<div>Loading chatbot...</div>}>
      <ChatbotClientWrapper />
    </Suspense>
  );
}

