import ChatContainer from '@/_components/ChatContainer';
import Sidebar from '@/_components/Sidebar';
import { useChatStore } from '@/store/useChatStore';
import { MessageSquare } from 'lucide-react';
import React from 'react';

const Home: React.FC = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className='flex h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white'>
      <Sidebar />
      <div className='flex-1 relative overflow-hidden'>
        <div className='fixed top-20 right-20 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none -z-10'></div>
        <div className='fixed bottom-20 left-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none -z-10'></div>
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <div className='text-center flex flex-col items-center justify-center h-full p-4'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff4e50] to-[#f9d423] flex items-center justify-center transition-all duration-300 shadow-lg shadow-gray-800/30 group-hover:shadow-gray-900/50 group-hover:scale-105 animate-bounce mb-4'>
              <MessageSquare className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-4xl font-bold mb-2'>Welcome to MessageHub!</h1>
            <p className='text-gray-300'>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;