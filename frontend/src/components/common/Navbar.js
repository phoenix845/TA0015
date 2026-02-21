import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt, FaHome, FaSeedling, FaCloudSun, FaChartLine, FaBug } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setProfileOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome className="text-lg" /> },
    { name: 'Crops', path: '/crops', icon: <FaSeedling className="text-lg" /> },
    { name: 'Weather', path: '/weather', icon: <FaCloudSun className="text-lg" /> },
    { name: 'Market', path: '/market', icon: <FaChartLine className="text-lg" /> },
    { name: 'Disease', path: '/disease', icon: <FaBug className="text-lg" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-emerald-100 shadow-sm transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
            aria-label="KrishiMitra Home"
          >
            <span className="text-3xl md:text-4xl transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">🌾</span>
            <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 hidden sm:inline tracking-tight">
              KrishiMitra
            </span>
          </Link>

          {/* User Account & Main Nav (Extreme Top Right) */}
          <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-lg font-bold shadow-lg hover:shadow-emerald-500/30 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 cursor-pointer z-50 transform hover:-translate-y-0.5"
                  aria-label="Open navigation menu"
                  aria-expanded={profileOpen}
                >
                  <span className="absolute -inset-1 rounded-full bg-emerald-400/20 blur-md -z-10 animate-pulse" aria-hidden="true" />
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </button>

                {/* Combined Navigation Dropdown / Sidebar overlay */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-emerald-100/50 py-3 text-sm z-50 transform origin-top-right transition-all animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="px-5 pb-4 border-b border-gray-100/50 mb-3 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-t-2xl pt-2">
                      <p className="font-bold text-gray-900 truncate text-lg">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-sm font-medium text-emerald-600 truncate mt-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {user?.role === 'admin' ? 'System Administrator' : 'Active Farmer'}
                      </p>
                    </div>

                    <div className="px-3 space-y-1.5">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setProfileOpen(false)}
                          className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(link.path)
                            ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm border border-emerald-100/50'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                            }`}
                        >
                          <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive(link.path) ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'}`}>
                            {link.icon}
                          </span>
                          <span className="text-base">{link.name}</span>
                          {isActive(link.path) && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          )}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100/50 px-3 space-y-1.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition-all duration-200 group"
                      >
                        <span className="text-gray-400 group-hover:text-emerald-500 transition-transform duration-200 group-hover:scale-110"><FaHome className="text-lg" /></span>
                        <span className="text-base font-medium">Dashboard Overview</span>
                      </Link>

                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50/50 hover:text-blue-700 transition-all duration-200 group border border-transparent hover:border-blue-100"
                        >
                          <span className="text-xs inline-flex w-6 h-6 items-center justify-center rounded-md bg-blue-100 text-blue-600 font-bold group-hover:scale-110 transition-transform duration-200">
                            A
                          </span>
                          <span className="text-base font-medium">Admin Control Panel</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50/50 transition-all duration-200 group mt-2 border border-transparent hover:border-red-100"
                      >
                        <span className="text-red-400 group-hover:text-red-600 transition-transform duration-200 group-hover:scale-110"><FaSignOutAlt className="text-lg" /></span>
                        <span className="text-base font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors hidden sm:block px-2">
                  Sign In
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 max-sm:px-4">
                  Get Started <span className="hidden sm:inline ml-1 text-emerald-200">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

