import { Image, Plus, Send, Smile } from 'lucide-react';
import React, { useState } from 'react'

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      // Logic to send message would go here
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='px-4 py-3 bg-gray-800 border-t border-gray-700 flex items-center shadow-lg'>
      <button className='p-3 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-amber-400 mr-2'>
        <Plus className='w-6 h-6' />
      </button>
      <button className='p-3 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-amber-400 mr-2'>
        <Image className='w-6 h-6' />
      </button>

      <div className='flex-1 relative'>
        <textarea
          placeholder='Type your message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          spellCheck={false}
          className='w-full px-4 py-3 rounded-3xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent border border-gray-600 transition-colors duration-200 resize-none'
          rows={1}
          style={{ minHeight: '48px', maxHeight: '150px' }}
        />
        <button className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-600 transition-colors text-gray-400 hover:text-amber-400'>
          <Smile className='w-6 h-6' />
        </button>
      </div>
      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className='ml-4 p-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-900/30'
      >
        <Send className='w-6 h-6' />
      </button>
    </div>
  );
};

export default ChatInput