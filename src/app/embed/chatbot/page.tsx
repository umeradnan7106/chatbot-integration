// app/embed/chatbot/page.tsx
'use client';

import { Suspense } from 'react';
import Chatbot from '@/components/Chatbot';

export default function ChatbotPage() {
  return (
    <div className="h-screen w-full bg-white">
      <Suspense fallback={<div className="text-center pt-20">Loading...</div>}>
        <Chatbot />
      </Suspense>
    </div>
  );
}
