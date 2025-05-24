import { useAuthStore } from '@/store/useAuthStore'
import { LogOut, MessageSquare, Settings, User, X } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { logout, authUser } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return (
    <div>
      <nav className='bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white shadow-2xl border-b border-slate-700/50'>
        <div className='max-w-8xl mx-auto px-6 py-2 flex justify-between items-center'>
          <Link to={"/"}>
          <div className='flex items-center gap-3 group cursor-pointer'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff4e50] to-[#f9d423] flex items-center justify-center transition-all duration-300 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 group-hover:scale-105 group-hover:rotate-3'>
              <MessageSquare className='w-5 h-5 text-white' />
            </div>
            <h1 className='text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
              MessageHub
            </h1>
          </div>
          </Link>
          <div className='flex items-center gap-2'>
            <Link to="/settings" className='group'>
              <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 hover:shadow-lg hover:shadow-gray-900/20'>
                <Settings className='w-4 h-4 text-gray-300 group-hover:text-white transition-colors' />
                <span className='text-sm font-medium text-gray-300 group-hover:text-white transition-colors capitalize'>
                  Settings
                </span>
              </div>
            </Link>

            {authUser && (
            <>  
            <Link to="/profile" className='group'>
              <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 hover:shadow-lg hover:shadow-gray-900/20'>
                <User className='w-4 h-4 text-gray-300 group-hover:text-white transition-colors' />
                <span className='text-sm font-medium text-gray-300 group-hover:text-white transition-colors capitalize'>
                  Profile
                </span>
              </div>
            </Link>
            <button 
              onClick={() => setShowLogoutDialog(true)}
              className='group flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/30 hover:bg-red-800/40 transition-all duration-200 border border-red-800/50 hover:border-red-700/50 hover:shadow-lg hover:shadow-red-900/20 cursor-pointer'
            >
              <LogOut className='w-4 h-4 text-red-300 group-hover:text-red-200 transition-colors' />
              <span className='text-sm font-medium text-red-300 group-hover:text-red-200 transition-colors capitalize'>
                Log Out
              </span>
            </button>
            </>
            )}
          </div>
        </div>
      </nav>

      {showLogoutDialog && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200'>
          <div className='bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-slate-700/50 animate-in zoom-in-95 duration-200'>
            <div className='flex justify-end mb-4'>
              <button 
                onClick={() => setShowLogoutDialog(false)}
                className='text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700/50 cursor-pointer'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
            <div className='flex justify-center mb-6'>
              <div className='w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center border border-red-800/50'>
                <LogOut className='w-8 h-8 text-red-400' />
              </div>
            </div>
            <div className='text-center mb-8'>
              <h3 className='text-xl font-bold text-white mb-2'>
                Confirm Logout
              </h3>
              <p className='text-gray-300 leading-relaxed'>
                Are you sure you want to log out? You'll need to log in again to access your messages.
              </p>
            </div>
            <div className='flex gap-3'>
              <button 
                onClick={() => setShowLogoutDialog(false)}
                className='flex-1 px-4 py-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-white font-medium transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50 cursor-pointer'
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className='flex-1 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 shadow-lg shadow-red-900/20 cursor-pointer'
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar