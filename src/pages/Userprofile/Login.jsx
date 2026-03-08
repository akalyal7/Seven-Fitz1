import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import loginbackground from "../../assets/Images/loginbackground.jpg"
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password);
  };

  const showToast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  let isValid = true;

  setEmailError("");
  setPasswordError("");

  if (!validateEmail(email)) {
    setEmailError("Please enter a valid email address");
    isValid = false;
  }

  if (!validatePassword(password)) {
    setPasswordError(
      "Password must be 8+ characters, include number & special character"
    );
    isValid = false;
  }

  if (!isValid) return;

  const result = login(email, password);

  if (result.success) {
    showToast("Welcome back to the world of 7-FITZ!");
    navigate("/");
  } else {
    setPasswordError("Invalid email or password");
  }
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
    <div className="h-screen  overflow-hidden flex bg-secondary-50">
      {/* LEFT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 py-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <h1 className="text-4xl font-serif font-bold mb-3">Welcome</h1>
          <p className="text-secondary-600 mb-10">
            Get started for a seamless shopping experience
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-sm text-secondary-600">Email</label>
              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-600"
                  size={18}
                />
                <input
  type="email"
  required
  placeholder="johndoe@gmail.com"
  className={`input-field pl-12 ${emailError ? "border-red-500" : ""}`}
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setEmailError("");
  }}
/>
              </div>
               {/* ✅ ERROR MESSAGE SHOW HERE */}
  {emailError && (
    <p className="text-red-500 text-xs mt-2">{emailError}</p>
  )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-secondary-600">Password</label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-600"
                  size={18}
                />
                <input
  type={showPassword ? "text" : "password"}
  required
  placeholder="At least 8 characters"
  className={`input-field pl-12 pr-12 ${
    passwordError ? "border-red-500" : ""
  }`}
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setPasswordError("");
  }}
/>
{passwordError && (
  <p className="text-red-500 text-xs mt-2">{passwordError}</p>
)}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={()=>navigate("/forgot-password")}
                  className="text-xs text-[#e5a852] hover:text-secondary-900"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full btn-gold py-3 text-md uppercase tracking-widest"
            >
              Login
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="mt-8 text-sm text-secondary-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#e5a852] font-semibold hover:text-secondary-900"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE - BLACK & GOLD LUXURY PANEL */}
<div className="hidden lg:flex w-1/2 relative bg-gray-100 px-4 items-center justify-center overflow-hidden">

  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="relative w-full flex flex-col justify-between p-5"
  >

    {/* IMAGE SECTION */}
    <div className="relative rounded-lg overflow-hidden shadow-2xl border border-yellow-500/30">

      <img
        src={loginbackground}
        alt="Luxury Women's Collection"
        className="object-cover w-full h-[65vh] hover:scale-105 transition-transform duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent"></div>

      {/* Premium Tag */}
      <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-6 py-2 rounded-full border border-[#e5a852] text-[#e5a852] text-sm tracking-widest uppercase">
        Luxury Collection
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
    </div>
  );
};

export default Login;