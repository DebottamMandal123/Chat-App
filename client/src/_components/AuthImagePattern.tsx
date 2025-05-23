import React from 'react'

const AuthImagePattern: React.FC = () => {
  const users = [
    { name: "Alex", avatar: "👨‍💻", status: "online" },
    { name: "Sarah", avatar: "👩‍🎨", status: "online" },
    { name: "Mike", avatar: "👨‍🚀", status: "offline" },
    { name: "Emma", avatar: "👩‍💼", status: "online" },
    { name: "John", avatar: "👨‍🔬", status: "offline" },
    { name: "Lisa", avatar: "👩‍🏫", status: "online" },
    { name: "David", avatar: "👨", status: "online" },
    { name: "Anna", avatar: "👩‍🎤", status: "offline" },
    { name: "Tom", avatar: "👨‍🍳", status: "online" }
  ];

  const getAnimationClass = (index: number) => {
    if ([0, 2, 4, 6, 8].includes(index)) {
      return 'animate-pulse';
    }
    return 'animate-pulse [animation-delay:2s]';
  };

  return (
    <div className='hidden lg:flex flex-col justify-center items-center p-12 bg-gray-900 text-white relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900'></div>
      <div className='absolute top-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl'></div>
      <div className='absolute bottom-10 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl'></div>
      <div className='relative z-10 w-full max-w-md'>
        <div className='grid grid-cols-3 gap-4 mb-12'>
          {users.map((user, index) => (
            <div key={index} className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-400 group ${getAnimationClass(index)}`}>
              <div className='flex flex-col items-center text-center'>
                <div className='w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform duration-300'>
                  {user.avatar}
                </div>
                <h3 className='text-sm font-medium text-gray-200 mb-1'>{user.name}</h3>
                <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-500'}`}></div>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-white mb-4'>Join our community</h2>
          <p className='text-gray-400 leading-relaxed'>
            Connect with friends, share moments, and stay in touch with your loved ones.
          </p>
        </div>
      </div>
      <div className='absolute top-1/4 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse'></div>
      <div className='absolute bottom-1/3 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000'></div>
    </div>
  )
}

export default AuthImagePattern