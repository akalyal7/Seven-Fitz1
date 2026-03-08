import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import registerbackground from "../../assets/Images/registerbackground.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); 

  const { register } = useAuth();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password);
  const showToast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Reset errors
  setEmailError("");
  setPasswordError("");
  setConfirmPasswordError("");

  let isValid = true;

  // Name validation
if (!formData.name.trim()) {
  setNameError("Please enter your full name");
  isValid = false;
} else if (formData.name.trim().length < 3) {
  setNameError("Name must be at least 3 characters");
  isValid = false;
}

  // Email check
  if (!validateEmail(formData.email)) {
    setEmailError("Please enter a valid email address");
    isValid = false;
  }

  // Password check
  if (!validatePassword(formData.password)) {
    setPasswordError(
      "Password must be 8+ characters, include number & special character"
    );
    isValid = false;
  }

  // Confirm password check
  if (formData.password !== formData.confirmPassword) {
    setConfirmPasswordError("Passwords do not match");
    isValid = false;
  }

  if (!isValid) return;

  // Call register
  const result = register({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });

  if (result.success) {
    showToast("Welcome to the 7-FITZ family of modern luxury!");
    navigate("/");
  } else {
    showToast("Registration failed", "error");
  }
};

// For auto-close eye icon
let passwordTimeout;

const togglePasswordVisibility = () => {
  setShowPassword(true); // open eye
  if (passwordTimeout) clearTimeout(passwordTimeout); // prevent multiple timers
  passwordTimeout = setTimeout(() => {
    setShowPassword(false); // auto close after 3s
  }, 3000);
};

  const reviewData = [
  {
    id: 1,
    name: "Priya S.",
    text: "This dress made me feel like royalty. Pure elegance!",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Ayesha K.",
    text: "Premium quality and stunning design. Worth every rupee!",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Neha R.",
    text: "I got so many compliments. This brand is luxury!",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
};

  return (
    <div className="h-screen overflow-hidden flex bg-secondary-50">
      {/* LEFT SIDE - PROMO SECTION */}
      <div className="hidden lg:flex w-1/2 bg-secondary-100 items-center justify-center px-4 relative">
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full flex flex-col justify-between p-5"
          >
        
            {/* IMAGE SECTION */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-yellow-500/30">
        
              <img
                src={registerbackground}
                alt="Luxury Women's Collection"
                className="object-cover w-full h-[65vh] hover:scale-105 transition-transform duration-700"
              />
        
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent"></div>
        
              {/* Premium Tag */}
              <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-6 py-2 rounded-full border border-[#e5a852] text-[#e5a852] text-sm tracking-widest uppercase">
                Spotlight Style
              </div>
        
              {/* Instagram Badge */}
              <div className="absolute bottom-6 right-6 bg-linear-to-r from-yellow-700 to-[#e5a852] text-black px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                #TrendingNow
              </div>
            </div>
        
            {/* REVIEWS SECTION */}
        <div className="flex justify-center">
          <div className="w-full 
                          bg-linear-to-r from-black via-gray-900 to-black 
                          rounded-lg p-6 
                          border border-yellow-500/20 
                          shadow-2xl">
        
            <h3 className="text-[#e5a852] text-lg tracking-wider mb-6 text-center">
              What Our Queens Say ✨
            </h3>
        
            <Slider {...settings}>
              {reviewData.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 justify-center text-center">
        
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded-full 
                                 border-2 border-[#e5a852]"
                    />
        
                    <div>
                      <div className="flex justify-center text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} size={12} />
                        ))}
                      </div>
        
                      <p className="text-gray-300 text-sm">
                        “{item.text}”
                      </p>
        
                      <span className="text-[#e5a852] text-xs block mt-1">
                        {item.name}
                      </span>
                    </div>
        
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
          </motion.div>
      </div>

      {/* RIGHT SIDE - REGISTER FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 py-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-4xl font-serif font-bold mb-3">
            Create Account
          </h1>
          <p className="text-secondary-500 mb-6">
            Get started with your modern luxury experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm text-secondary-500">
                Full Name
              </label>
              <div className="relative mt-2">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400"
                  size={18}
                />
                <input
      type="text"
      name="name"
      required
      placeholder="Emma Stone"
      className={`input-field pl-12 ${nameError ? "border-red-500" : ""}`}
      value={formData.name}
      onChange={(e) => {
        handleInputChange(e);
        setNameError("");
      }}
    />
  </div>
  {nameError && (
    <p className="text-red-500 text-xs mt-2">{nameError}</p>
  )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-secondary-500">
                Email
              </label>
              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400"
                  size={18}
                />
                <input
  type="email"
  name="email"
  required
  placeholder="name@example.com"
  className={`input-field pl-12 ${emailError ? "border-red-500" : ""}`}
  value={formData.email}
  onChange={(e) => {
    handleInputChange(e);
    setEmailError("");
  }}
/>
{emailError && (
  <p className="text-red-500 text-xs mt-2">{emailError}</p>
)}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-secondary-500">
                Password
              </label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400"
                  size={18}
                />
               <input
  type={showPassword ? "text" : "password"}
  name="password"
  required
  placeholder="At least 8 characters"
  className={`input-field pl-12 pr-12 ${passwordError ? "border-red-500" : ""}`}
  value={formData.password}
  onChange={(e) => {
    handleInputChange(e);
    setPasswordError("");
  }}
/>
{passwordError && (
  <p className="text-red-500 text-xs mt-2">{passwordError}</p>
)}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-secondary-500">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400"
                  size={18}
                />
                <input
  type={showPassword ? "text" : "password"}
  name="confirmPassword"
  required
  placeholder="Re-enter password"
  className={`input-field pl-12 ${confirmPasswordError ? "border-red-500" : ""}`}
  value={formData.confirmPassword}
  onChange={(e) => {
    handleInputChange(e);
    setConfirmPasswordError("");
  }}
/>
{confirmPasswordError && (
  <p className="text-red-500 text-xs mt-2">{confirmPasswordError}</p>
)}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 text-sm text-secondary-500">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 text-primary-500 border-secondary-300 rounded"
              />
              <p>
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary-500 hover:text-secondary-900"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary-500 hover:text-secondary-900"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3 text-md uppercase tracking-widest"
            >
              Create Account
            </button>
          </form>

          <p className="mt-5 text-sm text-secondary-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-500 font-semibold hover:text-secondary-900"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;