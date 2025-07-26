'use client';

import { Suspense } from 'react';
import ChatbotClientWrapper from './ChatbotClientWrapper';

export default function EmbedChatbotPage() {
  return (
    <Suspense fallback={<div>Loading chatbot...</div>}>
      <ChatbotClientWrapper />
    </Suspense>
  );
}

