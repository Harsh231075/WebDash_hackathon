import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = ({ navItems, isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/home'); // Redirect the user to the home page
    if (window.innerWidth < 1024) {
      setIsOpen(false); // Close the sidebar on mobile if open
    }
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-lg z-40 h-screen overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">Alumni Portal</h2>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-hidden">
          {navItems.map((item) =>
            item.path === '/logout' ? (
              <button
                key={item.path}
                onClick={handleLogout}
                className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;