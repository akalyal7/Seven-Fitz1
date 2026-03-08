import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import offerImage from "../../assets/Images/sale.png";

const OfferSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#e5a852] font-semibold uppercase tracking-[0.4em] text-xs block mb-4">
            Special Offer
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
            Unlock Massive <span className="text-[#e5a852]">Savings</span>
          </h2>

          <div className="w-20 h-0.75 bg-linear-to-r from-yellow-400 via-[#e5a852] to-yellow-700 mx-auto rounded-full mt-4" />
        </div>

        {/* Offer Card */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-md">
              <img
                src={offerImage}
                alt="Special Offer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -top-4 -right-4 bg-[#e5a852] text-white text-sm px-5 py-2 rounded-full shadow-md font-semibold">
              70% OFF
            </div>
          </motion.div>

          {/* RIGHT - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-gray-600 text-lg">
              Enjoy exclusive discounts on premium products for a limited time.
              Don’t miss this opportunity to shop smarter and save bigger.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/shop" className="w-full sm:w-auto justify-center bg-black text-[#e5a852] px-6 py-3 md:px-7 md:py-2.5 text-sm md:text-base rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition-all duration-300 shadow-xl shadow-black/10 flex items-center gap-2 group">
                <ShoppingBag size={20} /> Shop Now
              </Link>

              <button className="w-full sm:w-auto justify-center bg-white border border-[#e5a852] text-black px-6 py-3 md:px-7 md:py-2.5 text-sm md:text-base rounded-full font-bold hover:bg-black hover:text-[#e5a852] hover:border-black transition-all duration-300 shadow-lg shadow-black/5 flex items-center gap-2 group">
                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h4 className="font-serif font-semibold text-gray-900 mb-1">
                  Premium Quality
                </h4>
                <p className="text-gray-600 text-sm">
                  Top-tier products curated just for you.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-semibold text-gray-900 mb-1">
                  Fast Delivery
                </h4>
                <p className="text-gray-600 text-sm">
                  Quick and reliable shipping worldwide.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OfferSection;