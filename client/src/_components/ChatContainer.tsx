import React from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

const ChatContainer: React.FC = () => {
  return (
    <div className='flex flex-col h-full w-full bg-gray-900'>
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;