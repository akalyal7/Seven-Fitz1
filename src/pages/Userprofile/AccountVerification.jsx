import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../../components/Loader";
import { toast } from "react-toastify";
import {
  verifyApi,
  resendForgotPasswordOtpApi
} from "../../networking/LoginAction";
import OTPInput from "../../components/OTPInput";
import loginbackground from "../../assets/Images/loginbackground.jpg";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AccountVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  // 🔒 Safety check
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // ⏱ Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  // ✅ Verify OTP
  const handleSubmit = (otp) => {
    setIsLoading(true);

    verifyApi({ email, otp })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);

          navigate("/reset-password", {
            state: { email },
          });
        } else {
          toast.error(res.data.message);
          setResendEnabled(true);
        }
      })
      .catch(() => toast.warn("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  // 🔁 Resend OTP
  const handleResendOtp = () => {
    setIsLoading(true);

    resendForgotPasswordOtpApi({ email })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setTimer(60);
          setResendEnabled(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.warn("Something went wrong"))
      .finally(() => setIsLoading(false));
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
      
      {isLoading && <Loader />}

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 py-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <h1 className="text-4xl font-serif font-bold mb-3">
            Verify OTP
          </h1>

          <p className="text-secondary-500 mb-10">
            Enter the 6-digit code sent to  
            <br />
            <span className="text-[#e5a852] font-semibold">{email}</span>
          </p>

          {/* OTP INPUT */}
          <div className="flex justify-center">
            <OTPInput length={6} onSubmit={handleSubmit} />
          </div>

          {/* Timer / Resend */}
          <div className="mt-6 text-center text-sm text-secondary-500">
            {resendEnabled ? (
              <button
                onClick={handleResendOtp}
                className="text-[#e5a852] font-semibold hover:text-secondary-900"
              >
                Resend OTP
              </button>
            ) : (
              <span>Resend in {timer}s</span>
            )}
          </div>

          {/* Back to Login */}
          <p className="mt-8 text-sm text-secondary-500 text-center">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#e5a852] font-semibold hover:text-secondary-900"
            >
              Login
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

export default AccountVerification;