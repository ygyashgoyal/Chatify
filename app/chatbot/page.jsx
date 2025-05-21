'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getAIResponse } from '@/lib/genaiClient';
import useSupabaseSession from '@/lib/useSupabaseSession';
import ChatHistory from '@/components/ChatHistory';
import ChatInput from '@/components/ChatInput';
import PDFUploader from '@/components/PDFUploader';
import extractPdfText from '@/utils/extractPdfText';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ChatbotPage() {
  const router = useRouter();
  const messagesEndRef = useRef(null);

  const [session, setSession] = useSupabaseSession();
  const [chat, setChat] = useState([]);
  const [pdfText, setPdfText] = useState('');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    if (!session) return;

    const fetchChat = async () => {
      const res = await fetch('/api/getMessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setChat(data.map(msg => ({ sender: msg.sender, text: msg.message })));
      }
    };

    fetchChat();
  }, [session]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const handlePDFUpload = async (file) => {
    setIsExtracting(true);
    try {
      const text = await extractPdfText(file);
      setPdfText(text);
    } catch (error) {
      alert('Error extracting PDF text.');
    } finally {
      setIsExtracting(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !session) return;

    const userMessage = { sender: 'user', text: input };
    setChat((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    await fetch('/api/saveMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id, sender: 'user', message: input }),
    });

    try {
      const prompt = pdfText
        ? `The user uploaded this PDF:\n\n${pdfText}\n\nUser's question: ${input}`
        : input;

      const aiText = await getAIResponse(prompt);

      const aiMessage = { sender: 'ai', text: aiText };
      setChat((prev) => [...prev, aiMessage]);

      await fetch('/api/saveMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, sender: 'ai', message: aiText }),
      });
    } catch (err) {
      console.error('AI error:', err);
      const fallback = 'Oops! Something went wrong.';
      setChat((prev) => [...prev, { sender: 'ai', text: fallback }]);
    } finally {
      setSending(false);
    }
  };

  if (!session) return <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-3xl shadow-2xl border border-purple-300 my-1">
      {/* Header */}
      <header className="mb-5 sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-20 rounded-xl p-5 shadow-md flex flex-col sm:flex-row sm:justify-between items-center border border-purple-200">
        <h1 className="text-4xl font-extrabold text-purple-700 drop-shadow-lg mb-3 sm:mb-0 flex items-center gap-3 select-none cursor-default">
          <span className="animate-pulse">🧠</span> Smart Chatbot
        </h1>
        <p className="text-sm text-purple-600 font-medium select-text">
          Logged in as <span className="underline decoration-purple-400">{session.user.email}</span>
        </p>
      </header>

      <div className='font-bold text-2xl text-black m-2'>
        Hi there!!!
      </div>

      {/* PDF Uploader */}
      <section className="mb-6">
        <PDFUploader onUpload={handlePDFUpload} isExtracting={isExtracting} pdfText={pdfText} />
        {isExtracting && (
          <div className="flex items-center gap-2 mt-3 text-purple-600 font-semibold">
            <LoadingSpinner className="w-5 h-5" />
            Extracting PDF text...
          </div>
        )}
        {pdfText && !isExtracting && (
          <div className="mt-3 max-h-28 overflow-y-auto p-4 rounded-lg bg-purple-100 border border-purple-300 text-purple-800 text-sm whitespace-pre-wrap shadow-inner">
            <strong>📄 Extracted PDF Text Preview:</strong>
            <p>{pdfText.length > 400 ? pdfText.slice(0, 400) + '...' : pdfText}</p>
          </div>
        )}
      </section>

      {/* Chat history - scrollable */}
      <main className="flex-grow overflow-y-auto mb-5 rounded-lg border border-purple-300 bg-white shadow-inner p-6 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
        <ChatHistory
          chat={chat}
          messagesEndRef={messagesEndRef}
          messageClassNames={{
            user: "bg-purple-500 text-white self-end rounded-tr-2xl rounded-bl-2xl p-3 max-w-[75%] break-words shadow-md",
            ai: "bg-purple-100 text-purple-900 self-start rounded-tl-2xl rounded-br-2xl p-3 max-w-[75%] break-words shadow-sm",
          }}
        />
        {sending && (
          <p className="text-purple-600 italic select-none mt-2">AI is typing<span className="animate-pulse">...</span></p>
        )}
      </main>

      {/* Chat input area */}
      <footer className="sticky bottom-0 bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-5 shadow-lg flex gap-3 items-center border border-purple-200">
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          sending={sending}
          inputClassName="flex-grow rounded-xl border border-purple-400 focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2 transition-shadow duration-300"
          buttonClassName="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-purple-300 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transition-colors duration-300"
          disabled={sending || isExtracting}
          placeholder="Type your message..."
        />
      </footer>
    </div>
  );
}
