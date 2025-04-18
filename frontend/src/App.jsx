import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, X, Home, User, Users, MessageSquare, Trophy, LogOut, Bell } from 'lucide-react';
import Sidebar from './dashboard/Sidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DirectoryPage from './pages/DirectoryPage';
import CommunityPage from './pages/CommunityPage';
import MessagesPage from './pages/MessagesPage';
import AchievementsPage from './pages/AchievementsPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: Users, label: 'Directory', path: '/directory' },
    { icon: Bell, label: 'Community Feed', path: '/community' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: LogOut, label: 'Logout', path: '/logout' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex h-screen overflow-hidden">
          <Sidebar navItems={navItems} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/directory" element={<DirectoryPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;