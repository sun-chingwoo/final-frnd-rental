import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { getAvatarUrl } from "../utils/avatarUtils";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-full bg-black/90 backdrop-blur-xl border-b border-gray-800 h-20 flex items-center justify-between px-6 shadow-xl sticky top-0 z-50">

      {/* Left - Brand */}
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        className="text-2xl font-black tracking-widest text-white hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"
      >
        RENTAL<span className="text-yellow-400">BUDDY</span>
      </Link>

      {/* Right - Profile & Auth */}
      <div className="flex gap-4 items-center relative">
        {!user ? (
          <>
            <Link
              to="/users/login"
              onClick={() => window.scrollTo(0, 0)}
              className="text-white font-semibold hover:text-yellow-400 transition-colors px-4 py-2"
            >
              Login
            </Link>

            <Link
              to="/users/signup"
              onClick={() => window.scrollTo(0, 0)}
              className="px-6 py-2.5 font-bold text-black bg-yellow-400 rounded-full hover:bg-yellow-300 transition-all shadow hover:shadow-yellow-400/20"
            >
              Sign up
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 focus:outline-none bg-gray-800/50 border border-gray-700 hover:border-gray-500 rounded-full pl-2 pr-4 py-1.5 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-full bg-yellow-400 p-0.5 shadow-md group-hover:shadow-yellow-400/20 transition">
                <img
                  src={getAvatarUrl(user)}
                  alt="User"
                  className="w-full h-full object-cover rounded-full bg-gray-100"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-semibold hidden md:block group-hover:text-yellow-400 transition-colors">
                  {user.fullName.split(' ')[0]}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl py-2 overflow-hidden z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-5 py-3 border-b border-gray-800 mb-1">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Signed in as</p>
                  <p className="text-white font-bold truncate">{user.fullName}</p>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => { setIsDropdownOpen(false); window.scrollTo(0, 0); }}
                  className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-yellow-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                  My Rides
                </Link>

                <Link
                  to="/profile"
                  onClick={() => { setIsDropdownOpen(false); window.scrollTo(0, 0); }}
                  className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  My Profile
                </Link>

                <div className="h-px bg-gray-800 my-1 mx-4"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-500/10 transition-colors font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
