import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import logo from '../../assets/images/logo1.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-show search on small screens and keep it in sync on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSearch(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
      // Close search only on desktop — keep visible on mobile
      if (window.innerWidth >= 768) setShowSearch(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-yellow-600/30 shadow-sm'
          : 'bg-black border-b border-yellow-600/10'
      }`}
    >
      {/* Top Bar */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#e5a852] text-[10px] sm:text-xs text-center py-1 text-black tracking-[0.2em] font-serif font-bold overflow-hidden"
          >
            ALL DRESSES AT BEST PRICE!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">

        {/* Logo */}
        <Link to="/" className="relative group">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto"
            whileHover={{ scale: 1.05 }}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 font-medium relative">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative py-1 text-[#e5a852] hover:text-white transition"
              onMouseEnter={() => setHoveredPath(link.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {link.name}
              {(hoveredPath === link.path || location.pathname === link.path) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-yellow-300 via-[#e5a852] to-yellow-700"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-yellow-200/50 rounded-full overflow-hidden bg-black/40 backdrop-blur-sm pr-1 py-1 pl-5"
        >
          <input
            type="text"
            placeholder="Search dresses..."
            className="outline-none text-sm w-44 lg:w-56 bg-transparent text-white placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-linear-to-r from-[#e5a852] to-yellow-700 p-2 rounded-full text-black">
            <Search size={16} />
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-5 sm:gap-6">

          {/* Mobile Search icon hidden: mobile search is shown automatically */}

          {/* User */}
          <div className="relative">
            <User
              className="cursor-pointer text-[#e5a852]"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-56 bg-black border border-yellow-600/30 rounded-xl shadow-2xl py-3 text-[#e5a852]"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-5 py-3 border-b border-yellow-600/20">
                        <p className="text-sm font-bold text-white">{user.name}</p>
                        <p className="text-xs text-yellow-500/80 truncate">{user.email}</p>
                      </div>
                      <Link to="/profile" className="block px-5 py-2 text-xs hover:bg-yellow-500/10">Profile</Link>
                      <Link to="/orders" className="block px-5 py-2 text-xs hover:bg-yellow-500/10">Orders</Link>
                      <button
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-5 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center"
                      >
                        <LogOut size={14} className="mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-5 py-2 text-xs hover:bg-yellow-500/10">Login</Link>
                      <Link to="/register" className="block px-5 py-2 text-xs hover:bg-yellow-500/10">Register</Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative text-[#e5a852]">
            <Heart />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-linear-to-r from-[#e5a852] to-yellow-700 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-[#e5a852]">
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-linear-to-r from-[#e5a852] to-yellow-700 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#e5a852]"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Scroll Progress */}
      <motion.div
        className="h-0.5 bg-linear-to-r from-yellow-300 via-[#e5a852] to-yellow-700 origin-left"
        style={{ scaleX }}
      />

      {/* Mobile Search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden px-4 pb-4 bg-black border-t border-yellow-600/20"
          >
            <form onSubmit={handleSearch} className="mt-2 flex border border-yellow-500/30 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search dresses..."
                className="flex-1 bg-transparent text-white px-4 py-2 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-linear-to-r from-[#e5a852] to-yellow-600 px-4">
                <Search size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-black border-l border-yellow-600/20 shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-end p-5 border-b border-yellow-600/10">
                <button onClick={() => setOpen(false)} className="text-[#e5a852]">
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-col items-center justify-center flex-1 gap-10 text-xl tracking-[0.25em] font-serif">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-[#e5a852] hover:text-white transition"
                    onClick={() => setOpen(false)}
                  >
                    {link.name.toUpperCase()}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;
