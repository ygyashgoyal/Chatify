'use client';

export default function ChatHistory({ chat, messagesEndRef }) {
  return (
    <div className="flex-grow overflow-auto rounded-xl p-4 mb-4 bg-gray-50 border border-gray-200 shadow-inner flex flex-col space-y-2">
      {chat.length === 0 ? (
        <p className="text-gray-400 text-center mt-4">Start the conversation!</p>
      ) : (
        chat.map((msg, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-lg text-sm w-fit max-w-[80%] ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
