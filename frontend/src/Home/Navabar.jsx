import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNetworkClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    } else {
      navigate('/signup');
    }
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo remains unchanged */}
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  AlumniHub
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Connect • Grow • Inspire
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with enhanced dropdown */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                Join Network
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <button
                    onClick={handleNetworkClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {localStorage.getItem('token') ? 'Go to Dashboard' : 'Sign Up'}
                  </button>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button remains unchanged */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu with better UI */}
      <div
        className={`${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } md:hidden fixed top-20 right-0 bottom-0 w-full bg-white/95 backdrop-blur-lg transform transition-all duration-300 ease-in-out`}
      >
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <button
              onClick={handleNetworkClick}
              className="w-full mb-3 text-lg text-center text-white font-medium p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {localStorage.getItem('token') ? 'Go to Dashboard' : 'Sign Up'}
              <ChevronDown className="h-5 w-5" />
            </button>
            <Link
              to="/login"
              className="block w-full text-lg text-center text-gray-600 font-medium p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}