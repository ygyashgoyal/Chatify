'use client';

export default function ChatInput({ input, setInput, sendMessage, sending }) {
  return (
    <div className="flex items-center text-black gap-2 border-t pt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={sending}
        placeholder="Type your message..."
        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <button
        onClick={sendMessage}
        disabled={sending || !input.trim()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
