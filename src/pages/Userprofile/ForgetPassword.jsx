import React, { useState, useEffect, useRef } from "react";
import { Mail, Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import loginbackground from "../../assets/Images/loginbackground.jpg";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=email, 2=OTP, 3=reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const passwordTimeout = useRef(null);

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  const reviewData = [
    { id: 1, name: "Priya S.", text: "This dress made me feel like royalty. Pure elegance!", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Ayesha K.", text: "Premium quality and stunning design. Worth every rupee!", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 3, name: "Neha R.", text: "I got so many compliments. This brand is luxury!", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  ];

  const settings = { dots: false, arrows: false, infinite: true, speed: 600, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3500, pauseOnHover: true };

  // Timer Effect
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setResendEnabled(true);
  }, [timer, step]);

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation
  const validatePassword = (password) =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password);

  // Auto-close eye
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    if (passwordTimeout.current) clearTimeout(passwordTimeout.current);
    passwordTimeout.current = setTimeout(() => setShowPassword(false), 3000);
  };

  // STEP 1 - Send OTP
  const handleSendOtp = () => {
    setEmailError("");
    if (!email) return setEmailError("Please enter your email");
    if (!validateEmail(email)) return setEmailError("Enter a valid email");
    setStep(2);
    setTimer(60);
    setResendEnabled(false);
  };

  // STEP 2 - Verify OTP
  const handleVerifyOtp = () => {
    setOtpError("");
    if (!otp) return setOtpError("Enter OTP");
    if (!/^\d{6}$/.test(otp)) return setOtpError("OTP must be 6 digits");
    setStep(3);
  };

  // STEP 3 - Reset Password
  const handleResetPassword = () => {
    setPasswordError("");
    setConfirmPasswordError("");

    if (!newPassword) return setPasswordError("Enter new password");
    if (!validatePassword(newPassword)) return setPasswordError("Password must be 8+ chars, include number & special char");
    if (newPassword !== confirmPassword) return setConfirmPasswordError("Passwords do not match");

    alert("Password Reset Successful!");
    navigate("/login");
  };

  const handleResendOtp = () => {
    setTimer(60);
    setResendEnabled(false);
  };

  return (
    <div className="h-screen overflow-hidden flex bg-secondary-50">
      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 py-8 bg-white">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg">
          <h1 className="text-4xl font-serif font-bold mb-3">Forgot Password</h1>
          <p className="text-secondary-500 mb-10">Reset your password securely and continue your luxury journey ✨</p>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="text-sm text-secondary-500">Email</label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                  <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className={`input-field pl-12 ${emailError ? "border-red-500" : ""}`}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  />
                </div>
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              <button onClick={handleSendOtp} className="w-full btn-gold py-3 text-md uppercase tracking-widest mt-8">Send OTP</button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="text-sm text-secondary-500">Enter OTP</label>
                <div className="relative mt-2">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                  <input
                    type="text"
                    placeholder="6-digit OTP"
                    className={`input-field pl-12 ${otpError ? "border-red-500" : ""}`}
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value); setOtpError(""); }}
                  />
                </div>
                {otpError && <p className="text-red-500 text-xs mt-1">{otpError}</p>}

                <div className="text-right mt-2 text-xs text-gray-500">
                  {resendEnabled ? (
                    <button onClick={handleResendOtp} className="text-[#e5a852] font-semibold">Resend OTP</button>
                  ) : (
                    <span>Resend in {timer}s</span>
                  )}
                </div>
              </div>
              <button onClick={handleVerifyOtp} className="w-full btn-gold py-3 text-md uppercase tracking-widest mt-8">Verify OTP</button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div>
                <label className="text-sm text-secondary-500">New Password</label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className={`input-field pl-12 pr-12 ${passwordError ? "border-red-500" : ""}`}
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setPasswordError(""); }}
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              </div>

              <div className="mt-6">
                <label className="text-sm text-secondary-500">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`input-field mt-2 ${confirmPasswordError ? "border-red-500" : ""}`}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(""); }}
                />
                {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
              </div>

              <button onClick={handleResetPassword} className="w-full btn-gold py-3 text-md uppercase tracking-widest mt-8">Reset Password</button>
            </>
          )}

          <p className="mt-8 text-sm text-secondary-500">
            Remember your password?{" "}
            <Link to="/login" className="text-[#e5a852] font-semibold hover:text-secondary-900">Login</Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE - IMAGE & REVIEWS */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-100 px-4 items-center justify-center overflow-hidden">
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative w-full flex flex-col justify-between p-5">
          <div className="relative rounded-lg overflow-hidden shadow-2xl border border-yellow-500/30">
            <img src={loginbackground} alt="Luxury Women's Collection" className="object-cover w-full h-[65vh] hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent"></div>
            <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-6 py-2 rounded-full border border-[#e5a852] text-[#e5a852] text-sm tracking-widest uppercase">
              Reset securely
            </div>
            <div className="absolute bottom-6 right-6 bg-linear-to-r from-yellow-700 to-[#e5a852] text-black px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
              #TrendingNow
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full bg-linear-to-r from-black via-gray-900 to-black rounded-lg p-6 border border-yellow-500/20 shadow-2xl">
              <h3 className="text-[#e5a852] text-lg tracking-wider mb-6 text-center">What Our Queens Say ✨</h3>
              <Slider {...settings}>
                {reviewData.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center gap-4 justify-center text-center">
                      <img src={item.img} alt={item.name} className="w-14 h-14 rounded-full border-2 border-[#e5a852]" />
                      <div>
                        <div className="flex justify-center text-yellow-400 mb-1">{[...Array(5)].map((_, i) => (<FaStar key={i} size={12} />))}</div>
                        <p className="text-gray-300 text-sm">“{item.text}”</p>
                        <span className="text-[#e5a852] text-xs block mt-1">{item.name}</span>
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

export default ForgotPassword;