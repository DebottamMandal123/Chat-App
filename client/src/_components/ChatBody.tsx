import React from 'react'

const ChatBody: React.FC = () => {
  return (
    <div className='flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800'>
      <div className='flex justify-start'>
        <div className='bg-gray-700 text-gray-100 p-3 rounded-lg max-w-xs shadow-md'>
          Hi there! How are you doing today?
          <span className='block text-right text-xs text-gray-400 mt-1'>10:01 AM</span>
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='bg-amber-600 text-white p-3 rounded-lg max-w-xs shadow-md'>
          I'm doing great, thanks for asking! And you?
          <span className='block text-right text-xs text-amber-100 mt-1'>10:02 AM</span>
        </div>
      </div>
      <div className='flex justify-start'>
        <div className='bg-gray-700 text-gray-100 p-3 rounded-lg max-w-xs shadow-md'>
          I'm good too, just working on some code.
          <span className='block text-right text-xs text-gray-400 mt-1'>10:05 AM</span>
        </div>
      </div>
      <div className='flex justify-start'>
        <div className='bg-gray-700 text-gray-100 p-3 rounded-lg max-w-xs shadow-md'>
          Let's connect soon!
          <span className='block text-right text-xs text-gray-400 mt-1'>10:07 AM</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBody