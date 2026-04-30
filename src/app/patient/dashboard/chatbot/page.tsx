// src/app/patient/dashboard/chatbot/page.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/lib/store';
import { translations } from '@/constants/translations';
import { getTranslation } from '@/lib/translations';
import type { ChatMessage } from '@/types';
import DashboardLayout from '@/components/common/DashboardLayout';

const CHAT_HISTORY = [
  { id: 1, title: 'Headache symptoms', date: 'Today' },
  { id: 2, title: 'Diet recommendations', date: 'Yesterday' },
  { id: 3, title: 'Sleep improvement tips', date: '3 days ago' },
];

const SUGGESTIONS = [
  { icon: 'vital_signs', text: 'Check my vitals summary' },
  { icon: 'medication', text: 'Medication side effects' },
  { icon: 'nutrition', text: 'Nutrition advice' },
  { icon: 'psychology', text: 'Mental health tips' },
];

export default function ChatbotPage() {
  const { selectedLanguage, user } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = useCallback((key: string, fallback?: string) =>
    getTranslation(translations, key, selectedLanguage, fallback), [selectedLanguage]);

  useEffect(() => {
    setMessages([{ id: 1, text: t('aiWelcome', "Hello! I'm Ayu-Raksha AI Assistant. How can I help you with your health concerns today?"), sender: 'ai', timestamp: new Date() }]);
  }, [selectedLanguage, t]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isAiTyping]);

  const callAI = async (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          'Based on your symptoms, I recommend consulting with a healthcare professional. However, here are some general tips that might help...',
          "That's a great question! For personalized medical advice, please consult your doctor.",
          "I understand your concern. While I can provide general health information, it's important to speak with a medical professional.",
          'Thank you for sharing. Remember, this is general information and not a substitute for professional medical advice.',
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1500);
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isAiTyping) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: inputValue, sender: 'user', timestamp: new Date() }]);
    setInputValue(''); setIsAiTyping(true);
    const aiResponseText = await callAI();
    setMessages((prev) => [...prev, { id: Date.now() + 1, text: aiResponseText, sender: 'ai', timestamp: new Date() }]);
    setIsAiTyping(false);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-7rem)] gap-6">
        {/* Chat History Sidebar */}
        <div className="hidden lg:flex w-72 flex-col bg-surface-container-lowest dark:bg-inverse-surface rounded-xl border border-outline-variant/20 dark:border-white/10 overflow-hidden">
          <div className="p-5 border-b border-outline-variant/20 dark:border-white/10">
            <button className="w-full bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed py-2.5 rounded-lg font-button text-button hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {CHAT_HISTORY.map((chat) => (
              <button key={chat.id} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${chat.id === 1 ? 'bg-primary-container/10 dark:bg-primary-fixed/10 text-primary-container dark:text-on-primary-container' : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-low dark:hover:bg-white/5'}`}>
                <p className="font-inter text-body-sm font-medium truncate">{chat.title}</p>
                <p className="font-inter text-[11px] text-outline dark:text-outline-variant mt-0.5">{chat.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-surface-container-lowest dark:bg-inverse-surface rounded-xl border border-outline-variant/20 dark:border-white/10 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-outline-variant/20 dark:border-white/10 flex items-center gap-3">
            <div className="bg-primary-container/10 dark:bg-primary-fixed/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary-container dark:text-primary-fixed-dim">smart_toy</span>
            </div>
            <div>
              <h2 className="font-newsreader text-xl font-semibold text-on-background dark:text-surface-container-lowest">AI Health Assistant</h2>
              <p className="font-inter text-body-sm text-outline dark:text-outline-variant flex items-center gap-1">
                <span className="w-2 h-2 bg-primary-container dark:bg-primary-fixed-dim rounded-full inline-block"></span>
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${message.sender === 'user' ? 'bg-primary-container text-on-primary' : 'bg-primary-container/10 dark:bg-primary-fixed/10 text-primary-container dark:text-primary-fixed-dim'}`}>
                    {message.sender === 'user' ? (user?.name?.charAt(0) || 'U') : <span className="material-symbols-outlined text-[16px]">smart_toy</span>}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl font-inter text-body-sm leading-relaxed ${message.sender === 'user' ? 'bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed rounded-br-md' : 'bg-surface-container dark:bg-[#414845] text-on-background dark:text-surface-container-lowest rounded-bl-md'}`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary-container text-[16px]">smart_toy</span></div>
                  <div className="px-4 py-3 rounded-2xl bg-surface-container dark:bg-[#414845] rounded-bl-md">
                    <div className="flex gap-1.5"><div className="w-2 h-2 bg-outline/40 rounded-full animate-bounce" /><div className="w-2 h-2 bg-outline/40 rounded-full animate-bounce [animation-delay:150ms]" /><div className="w-2 h-2 bg-outline/40 rounded-full animate-bounce [animation-delay:300ms]" /></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions (when empty) */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4 grid grid-cols-2 gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s.text} onClick={() => setInputValue(s.text)} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-white/10 bg-surface-container-low dark:bg-[#414845] hover:bg-surface-container dark:hover:bg-white/10 transition-colors text-left">
                  <span className="material-symbols-outlined text-primary-container dark:text-primary-fixed-dim text-[18px]">{s.icon}</span>
                  <span className="font-inter text-body-sm text-on-surface-variant dark:text-outline-variant">{s.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-6 pb-6 pt-2 border-t border-outline-variant/20 dark:border-white/10">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about your health..." disabled={isAiTyping} className="w-full pl-4 pr-12 py-3 rounded-xl border border-outline-variant dark:border-white/15 bg-surface-container-low dark:bg-[#414845] text-on-background dark:text-surface-container-lowest font-inter text-body-md placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container transition-all" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary-container transition-colors"><span className="material-symbols-outlined text-[20px]">mic</span></button>
              </div>
              <button type="submit" disabled={isAiTyping || !inputValue.trim()} className="bg-primary-container dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed p-3 rounded-xl hover:bg-on-primary-fixed-variant transition-colors active:scale-[0.95] disabled:opacity-40">
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}