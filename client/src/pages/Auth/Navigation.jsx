import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  UserCircleIcon,
  Squares2X2Icon,
  HeartIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";
import { logout } from "../../redux/Features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = [
    { 
      name: 'Home', 
      path: '/', 
      icon: Squares2X2Icon,
      adminOnly: false
    },
    { 
      name: 'Shop', 
      path: '/shop', 
      icon: BuildingStorefrontIcon,
      adminOnly: false
    },
    { 
      name: 'Cart', 
      path: '/cart', 
      icon: ShoppingCartIcon,
      adminOnly: false
    },
    { 
      name: 'Wishlist', 
      path: '/wishlist', 
      icon: HeartIcon,
      adminOnly: false
    },
    { 
      name: 'Admin', 
      path: '/admin/dashboard', 
      icon: ChartBarIcon,
      adminOnly: true
    }
  ];

  return (
    <nav 
      className={`
        fixed 
        top-0 
        left-0 
        w-full 
        transition-all 
        duration-300 
        ${isScrolled 
          ? 'bg-white backdrop-blur-lg shadow-xl' 
          : 'bg-white'}
      `}
    >
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo with Modern Typography */}
        <Link 
          to="/" 
          className="
            text-4xl 
            font-light 
            tracking-wide 
            text-black 
            transform 
            transition-all 
            duration-300
            hover:text-black
            hover:tracking-wider
            group
            relative
            before:absolute 
            before:bottom-0 
            before:left-0 
            before:w-0 
            before:h-0.5 
            before:bg-black 
            before:transition-all 
            before:duration-300 
            hover:before:w-full
          "
        >
          QUANTUM
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10 font-sans">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {NavLinks.map((link) => {
              // Skip admin links for non-admin users
              if (link.adminOnly && (!userInfo || userInfo.role !== 'admin')) {
                return null;
              }

              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`
                    group 
                    flex 
                    items-center 
                    space-x-3 
                    text-base 
                    font-medium 
                    transition-all 
                    duration-300 
                    relative 
                    pb-1
                    ${isActive 
                      ? 'text-gray-700' 
                      : 'text-gray-500 hover:text-gray-700'}
                    before:absolute 
                    before:bottom-0 
                    before:left-0 
                    before:w-0 
                    before:h-0.5 
                    before:bg-gray-700 
                    before:transition-all 
                    before:duration-300 
                    hover:before:w-full
                  `}
                >
                  <Icon 
                    className={`
                      h-6 
                      w-6 
                      transition-transform 
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:scale-95
                      ${isActive 
                        ? 'text-gray-600' 
                        : 'text-gray-500 group-hover:text-gray-700'}
                    `} 
                  />
                  <span className="transition-all duration-300">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <button 
              className="
                text-gray-500 
                hover:text-gray-700 
                transition-colors 
                group
                relative
                before:absolute 
                before:bottom-0 
                before:left-0 
                before:w-0 
                before:h-0.5 
                before:bg-gray-700 
                before:transition-all 
                before:duration-300 
                hover:before:w-full
              "
            >
              <MagnifyingGlassIcon 
                className="
                  h-6 
                  w-6 
                  transition-transform 
                  group-hover:scale-95
                " 
              />
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="
                relative 
                text-gray-500 
                hover:text-gray-700 
                transition-colors 
                group
                before:absolute 
                before:bottom-0 
                before:left-0 
                before:w-0 
                before:h-0.5 
                before:bg-gray-700 
                before:transition-all 
                before:duration-300 
                hover:before:w-full
              "
            >
              <ShoppingCartIcon 
                className="
                  h-6 
                  w-6 
                  transition-transform 
                  group-hover:scale-95
                " 
              />
              {userInfo?.cartItemCount > 0 && (
                <span 
                  className="
                    absolute 
                    -top-2 
                    -right-2 
                    bg-red-500 
                    text-white 
                    text-xs 
                    rounded-full 
                    h-4 
                    w-4 
                    flex 
                    items-center 
                    justify-center
                  "
                >
                  {userInfo.cartItemCount}
                </span>
              )}
            </Link>

            {/* User Profile */}
            {userInfo ? (
              <Menu placement="bottom-end">
                <MenuHandler>
                  <button 
                    className="
                      flex 
                      items-center 
                      space-x-3 
                      text-gray-500 
                      hover:text-gray-700 
                      transition-colors 
                      group
                      relative
                      before:absolute 
                      before:bottom-0 
                      before:left-0 
                      before:w-0 
                      before:h-0.5 
                      before:bg-gray-700 
                      before:transition-all 
                      before:duration-300 
                      hover:before:w-full
                    "
                  >
                    <UserCircleIcon 
                      className="
                        h-7 
                        w-7 
                        transition-transform 
                        group-hover:scale-95
                      " 
                    />
                    <span className="text-base font-medium">{userInfo.username}</span>
                  </button>
                </MenuHandler>
                <MenuList 
                  className="
                    border-gray-700 
                    bg-white 
                    shadow-xl 
                    rounded-xl 
                    overflow-hidden
                  "
                >
                  <MenuItem 
                    className="
                      hover:bg-gray-100 
                      text-gray-500
                      transition-colors
                      px-4 
                      py-2
                    "
                    onClick={() => navigate('/my-account')}
                  >
                    My Profile
                  </MenuItem>
                  {userInfo.role === 'admin' && (
                    <MenuItem 
                      className="
                        hover:bg-gray-100 
                        text-gray-500
                        transition-colors
                        px-4 
                        py-2
                      "
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem 
                    className="
                      hover:bg-red-500/20 
                      text-gray-500
                      transition-colors
                      px-4 
                      py-2
                    "
                    onClick={handleLogout}
                  >
                    <div className="flex items-center space-x-2">
                      <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                      <span>Logout</span>
                    </div>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <div className="flex items-center space-x-6">
                <Link 
                  to="/login" 
                  className="
                    text-base 
                    font-medium 
                    text-gray-500 
                    hover:text-gray-700
                    hover:bg-gray-100
                    rounded-md
                    p-2
                    transition-colors
                  "
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="
                    px-5 
                    py-2.5 
                    rounded-full 
                    text-base 
                    font-medium 
                    border 
                    border-blue-500 
                    text-blue-500 
                    hover:bg-blue-500/10
                    transition-colors
                    hover:border-blue-700
                    hover:text-blue-700
                  "
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="
            md:hidden 
            text-gray-500 
            hover:text-gray-700 
            transition-colors
            hover:bg-gray-100
            rounded-md
            p-2
          "
        >
          <Squares2X2Icon className="h-7 w-7" />
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="
              md:hidden 
              fixed 
              inset-0 
              bg-black/50 
              z-40 
              backdrop-blur-sm
            "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="
                absolute 
                top-0 
                right-0 
                w-64 
                h-full 
                bg-white 
                shadow-2xl 
                p-6
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <Link 
                  to="/" 
                  className="
                    text-2xl 
                    font-bold 
                    tracking-wide 
                    text-black
                  "
                >
                  QUANTUM
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    text-gray-500 
                    hover:text-gray-700
                    hover:bg-gray-100
                    rounded-md
                    p-2
                    transition-colors
                  "
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {NavLinks.map((link) => {
                  if (link.adminOnly && (!userInfo || userInfo.role !== 'admin')) {
                    return null;
                  }

                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      className="
                        flex 
                        items-center 
                        space-x-3 
                        py-3 
                        border-b 
                        border-gray-700 
                        text-gray-500 
                        hover:text-gray-700
                      "
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-base">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Authentication */}
              {!userInfo && (
                <div className="mt-6 space-y-4">
                  <Link 
                    to="/login" 
                    className="
                      block 
                      text-center 
                      py-3 
                      border 
                      border-gray-700 
                      text-gray-500 
                      rounded-lg
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="
                      block 
                      text-center 
                      py-3 
                      bg-blue-500 
                      text-white 
                      hover:bg-blue-700 
                      transition-all 
                      duration-300 
                      transform 
                      hover:scale-[1.05] 
                      active:scale-[0.95]
                      shadow-md 
                      hover:shadow-lg
                    "
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
