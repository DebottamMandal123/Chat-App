import { useChatStore } from '@/store/useChatStore';
import { MoreVertical, Search } from 'lucide-react';
import React from 'react'

const ChatHeader: React.FC = () => {
  const { selectedUser } = useChatStore();

  if (!selectedUser) return null;
  return (
    <div className='flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow-md'>
      <div className='flex items-center'>
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.fullName}
          className='w-10 h-10 rounded-full mr-3 object-cover border-2 border-amber-500'
        />
        <div>
          <h2 className='text-xl font-bold text-gray-100'>{selectedUser.fullName}</h2>
          <p className='text-gray-400 text-sm'>Online</p>
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <button className='p-2 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-amber-400'>
          <Search className='w-5 h-5' />
        </button>
        <button className='p-2 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-amber-400'>
          <MoreVertical className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader