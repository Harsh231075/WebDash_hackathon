import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu, X, Home, User, Users, MessageSquare, Trophy, LogOut, Bell } from 'lucide-react';
import Sidebar from './dashboard/Sidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DirectoryPage from './pages/DirectoryPage';
import CommunityPage from './pages/CommunityPage';
import MessagesPage from './pages/MessagesPage';
import { Toaster } from 'react-hot-toast';
import ViewUser from './components/ViewUser';
import Chat from './components/Chat';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: Users, label: 'Directory', path: '/directory' },
    { icon: Bell, label: 'Community Feed', path: '/community' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: LogOut, label: 'Logout', path: '/logout' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      <Toaster position="top-center" />
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar navItems={navItems} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile/view/:userId" element={<ViewUser />} />
              <Route path="/chat/:userId" element={<Chat />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
