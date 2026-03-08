import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Ordered",
    description: "Your order has been placed",
    icon: <FaBoxOpen />,
  },
  {
    id: 2,
    title: "Shipped",
    description: "Package has been shipped",
    icon: <FaShippingFast />,
  },
  {
    id: 3,
    title: "Transit",
    description: "Courier is on the way",
    icon: <FaTruck />,
  },
  {
    id: 4,
    title: "Delivered",
    description: "Package delivered successfully",
    icon: <FaCheckCircle />,
  },
];

const TrackOrders = () => {
  const { id } = useParams();

  // Advanced generic order status logic simulation
  const currentStep = 2; // For mock purpose, assuming Shipped

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center px-4 py-16">
      {/* Background abstract decorations */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#e5a852]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-black/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl relative z-10"
      >
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/5 border border-white p-8 md:p-12">

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-[#e5a852] font-bold tracking-widest uppercase text-sm mb-2 block">
              Order Status
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Track Your Order
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Order ID: <span className="font-bold text-black bg-gray-100 px-3 py-1 rounded-md ml-2">#{id}</span>
            </p>
          </motion.div>

          {/* Timeline Section */}
          <motion.div variants={itemVariants} className="relative mt-8 mb-16 px-4 md:px-0">
            {/* Base Progress line */}
            <div className="absolute top-8 left-0 right-0 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              {/* Active Progress line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e5a852] to-black rounded-full"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 relative z-10">
              {steps.map((step, index) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    {/* Icon Bubble */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-xl z-10 shadow-lg transition-all duration-500
                        ${isActive ? "bg-black text-[#e5a852]" : "bg-white text-gray-300 border-2 border-gray-100 shadow-none"}
                        ${isCurrent ? "ring-4 ring-[#e5a852]/30 scale-110" : ""}
                      `}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Text Details */}
                    <div className="text-center mt-6">
                      <h4 className={`font-bold md:text-lg transition-colors duration-500 ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                        {step.title}
                      </h4>
                      <p className="hidden md:block text-sm text-gray-500 mt-1 max-w-[150px] mx-auto leading-tight">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Delivery Details Card */}
          <motion.div
            variants={itemVariants}
            className="bg-black text-white rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl mt-8 relative overflow-hidden"
          >
            {/* Inside decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e5a852]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10 space-y-2">
              <span className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Estimated Delivery</span>
              <p className="text-2xl font-serif font-bold text-[#e5a852]">March 10, 2026</p>
            </div>

            <div className="hidden md:block w-px h-16 bg-white/20"></div>

            <div className="relative z-10 space-y-2">
              <span className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Courier Service</span>
              <p className="text-xl font-bold">BlueDart Express</p>
            </div>

            <div className="hidden md:block w-px h-16 bg-white/20"></div>

            <div className="relative z-10 space-y-2">
              <span className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Tracking No.</span>
              <p className="text-xl font-mono tracking-wider font-bold text-[#e5a852]">BD784512369</p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default TrackOrders;
