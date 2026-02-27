import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import logo from "../../assets/images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { wishlistItems } = useWishlist();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-black"} px-4 md:px-20`}>

      <motion.div
        className="flex items-center justify-between"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo - Always visible */}
        <Link to="/">
          <img src={logo} alt="Logo" className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-12 md:h-14 py-2' : 'h-14 md:h-20 py-4'}`} />
        </Link>

        {/* Center Section - Always visible navigation */}
        <ul className="hidden md:flex space-x-8 md:space-x-10 font-bold tracking-wider text-[#ffbf67] text-sm">
          <Link to="/" className="relative group cursor-pointer hover:text-white transition-colors">
            HOME
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffbf67] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/shop" className="relative group cursor-pointer hover:text-white transition-colors">
            SHOP
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffbf67] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="relative group cursor-pointer hover:text-white transition-colors">
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffbf67] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-3 md:space-x-5 text-[#ffbf67]">
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="cursor-pointer hover:text-white transition-colors"
          >
            <Search className="w-4 h-4 md:w-6 md:h-6" />
          </motion.button>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <User
              className="cursor-pointer hover:text-white transition-colors w-4 h-4 md:w-6 md:h-6"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-10 bg-white text-black p-4 rounded-lg shadow-xl w-48 z-50 border border-gray-100"
              >
                <div className="flex flex-col space-y-3">
                  <Link to="/login" className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-semibold" onClick={() => setIsProfileOpen(false)}>Login</Link>
                  <Link to="/register" className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-semibold" onClick={() => setIsProfileOpen(false)}>Register</Link>
                </div>
              </motion.div>
            )}
          </div>

          <Link to="/wishlist" className="relative cursor-pointer hover:text-white transition-colors">
            <Heart className="w-4 h-4 md:w-6 md:h-6" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] md:text-xs rounded-full px-1.5 md:px-1.5 py-0.5">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative cursor-pointer hover:text-white transition-colors">
            <ShoppingBag className="w-4 h-4 md:w-6 md:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] md:text-xs rounded-full px-1.5 md:px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </motion.div>

      {/* Search bar - Toggle on click */}
      {isSearchOpen && (
        <motion.div
          className="px-4 md:px-6 pb-6 pt-2 w-full"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <form className="flex items-center relative w-full lg:max-w-3xl mx-auto" onSubmit={handleSearch}>
            <Search className="absolute left-4 text-[#ffbf67] w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Discover our premium collection..."
              className="w-full bg-black/60 md:bg-white/10 backdrop-blur-md text-white md:text-white placeholder-gray-300 md:placeholder-gray-400 border border-gray-600 md:border-gray-700/50 rounded-full py-3.5 md:py-4 pl-12 md:pl-14 pr-4 md:pr-6 focus:outline-none focus:border-[#ffbf67] focus:ring-1 focus:ring-[#ffbf67] transition-all shadow-lg text-sm md:text-base tracking-wide"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </motion.div>
      )}

      {/* Mobile Navigation Menu (for small screens) */}
      <div className="md:hidden flex justify-between items-center py-3 border-t border-gray-800 bg-black/95 backdrop-blur-md pb-safe">
        <ul className="flex w-full justify-around font-bold tracking-widest text-[#ffbf67] text-[10px] uppercase">
          <Link to="/" className="relative group cursor-pointer hover:text-white transition-colors pb-1">
            HOME
            <span className="absolute bottom-0 left-0 w-current h-0.5 bg-[#ffbf67] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link to="/shop" className="relative group cursor-pointer hover:text-white transition-colors pb-1">
            SHOP
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffbf67] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link to="/about" className="relative group cursor-pointer hover:text-white transition-colors pb-1">
            ABOUT
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffbf67] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;





