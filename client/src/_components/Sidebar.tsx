import React, { useState, useMemo, useEffect } from 'react';
import { User, LogOut, MessageSquare, X, Search } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';

interface ChatUser {
  _id: string,
  email: string,
  fullName: string,
  profilePic: string,
  createdAt: string,
  updatedAt: string
}

const ContactItem = ({
  user,
  onClick,
  isSelected,
}: {
  user: ChatUser;
  onClick: (user: ChatUser) => void;
  isSelected: boolean;
}) => (
  <div
    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
      isSelected ? 'bg-gray-600/40 hover:bg-gray-600/50 border' : 'hover:bg-gray-700'
    }`}
    onClick={() => onClick(user)}
  >
    <img src={user.profilePic} alt={user.fullName} className="w-10 h-10 rounded-full mr-3 object-cover" />
    <div>
      <p className="text-gray-100 text-sm font-medium">{user.fullName}</p>
      <p className="text-gray-400 text-xs">Offline</p>
    </div>
  </div>
);

const Sidebar: React.FC = () => {
  const { logout } = useAuthStore();
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredContacts = useMemo(() => {
    const sourceContacts = users;

    if (!searchQuery) {
      return sourceContacts;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return sourceContacts.filter(contact =>
      contact.fullName.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, users]);

  const handleLogoutClick = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };

  return (
    <div className="w-96 bg-gray-800 text-white flex flex-col h-screen border-r border-gray-700">
      <div className="p-4">
        <div className="text-lg font-semibold flex items-center text-gray-200 gap-3">
          <div className='w-6 h-6 rounded-md bg-gradient-to-br from-[#ff4e50] to-[#f9d423] flex items-center justify-center transition-all duration-300 shadow-lg shadow-gray-800/30 group-hover:shadow-gray-900/50 group-hover:scale-105'>
            <MessageSquare className='w-4 h-4 text-white' />
          </div>
          MessageHub
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search people..."
            value={searchQuery}
            spellCheck={false}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent border border-gray-600 transition-colors duration-200"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
        {isUsersLoading ? (
          <p className="text-gray-400 text-center py-4">Loading contacts...</p>
        ) : filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactItem
              key={contact._id}
              user={contact}
              onClick={setSelectedUser}
              isSelected={selectedUser?._id === contact._id}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No contacts found.</p>
        )}
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleProfileClick}
          className="w-full flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200 text-gray-100 text-sm font-medium mb-2"
        >
          <User className="w-5 h-5 mr-3 text-amber-400" />
          Profile
        </button>
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200 text-gray-100 text-sm font-medium"
        >
          <LogOut className="w-5 h-5 mr-3 text-amber-400" />
          Logout
        </button>
      </div>
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
                onClick={handleLogoutClick}
                className='flex-1 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 shadow-lg shadow-red-900/20 cursor-pointer'
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;