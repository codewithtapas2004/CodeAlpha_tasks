import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);

  const activeLinkStyle = {
    color: '#4f46e5',
    fontWeight: '600',
  };

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuToggleRef.current &&
        !mobileMenuToggleRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
                ShopSphere
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              <NavLink to="/" className="text-gray-600 hover:text-indigo-600 transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
              
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
                    aria-expanded={isUserMenuOpen}
                    aria-controls="user-menu"
                  >
                     <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold ring-2 ring-white">
                         {user?.name.charAt(0).toUpperCase()}
                     </div>
                  </button>
                  <div 
                    id="user-menu"
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 ease-out origin-top-right ${isUserMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  >
                     <div className="px-4 py-2 text-sm text-gray-700 border-b">Signed in as <br/> <span className="font-semibold">{user?.name}</span></div>
                     <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</a>
                     <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order History</a>
                     <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                   <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Sign In</Link>
                   <Link to="/register" className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Sign Up</Link>
                </div>
              )}
              
              <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center">
               <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                ref={mobileMenuToggleRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
      ></div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
            <Link to="/" className="text-2xl font-bold text-gray-800 mb-8 block" onClick={() => setIsMenuOpen(false)}>
                ShopSphere
            </Link>
            <nav className="flex flex-col space-y-4">
                <NavLink to="/" className="text-gray-600 hover:text-indigo-600" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                
                {isAuthenticated ? (
                    <div className="border-t pt-4 mt-4">
                        <div className="flex items-center space-x-3 mb-4">
                             <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="font-semibold text-gray-800">{user?.name}</div>
                                <div className="text-sm text-gray-500">{user?.email}</div>
                            </div>
                        </div>
                        <a href="#" className="block py-2 text-gray-600 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>My Account</a>
                        <a href="#" className="block py-2 text-gray-600 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Order History</a>
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-600 hover:text-indigo-600">Logout</button>
                    </div>
                ) : (
                    <div className="border-t pt-4 mt-4 space-y-4">
                        <Link to="/login" className="block text-gray-600 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                        <Link to="/register" className="block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 text-center" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </div>
                )}
            </nav>
        </div>
      </div>
    </>
  );
};

export default Header;