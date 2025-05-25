import React, { useState, useMemo } from 'react';
import { User, LogOut, MessageSquare, X, Search } from 'lucide-react'; // Import Search icon
import { useAuthStore } from '@/store/useAuthStore';

// Dummy contact data
const contactsData = [
  { id: 1, name: 'Jane Doe', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 2, name: 'Emma Thompson', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: 3, name: 'Olivia Miller', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=21' },
  { id: 4, name: 'Sophia Davis', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=26' },
  { id: 5, name: 'Ava Wilson', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 6, name: 'Isabella Brown', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=40' },
  { id: 7, name: 'Mia Johnson', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 8, name: 'Charlotte Williams', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=54' },
  { id: 9, name: 'Amelia Garcia', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=61' },
  { id: 10, name: 'James Anderson', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=68' },
  { id: 11, name: 'William Clark', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=75' },
  { id: 12, name: 'Benjamin Lewis', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=79' },
  { id: 13, name: 'Evelyn Hall', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=83' },
  { id: 14, name: 'Daniel Scott', status: 'Offline', avatar: 'https://i.pravatar.cc/150?img=87' },
];

// ContactItem component remains the same
const ContactItem = ({ name, status, avatar }) => (
  <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200">
    <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3 object-cover" />
    <div>
      <p className="text-gray-100 text-sm font-medium">{name}</p>
      <p className="text-gray-400 text-xs">{status}</p>
    </div>
  </div>
);

const Sidebar: React.FC = () => {
  const { logout } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchQuery) {
      return contactsData;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return contactsData.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);
  
  const handleLogoutClick = () => {
    logout();
    setShowLogoutDialog(false);
  };  

  const handleProfileClick = () => {
    window.location.href = "/profile"
  };

  return (
    <div className="w-96 bg-gray-800 text-white flex flex-col h-screen border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent border border-gray-600 transition-colors duration-200"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactItem key={contact.id} {...contact} />
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