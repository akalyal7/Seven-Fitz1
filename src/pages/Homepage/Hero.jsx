import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import Shop from '../../../src/assets/Images/shop.jpg';

const Hero = () => {
  return (
    <section className="relative pt-12 pb-6 overflow-hidden bg-slate-50/50">

      {/* Abstract Background Elements - Subtle */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#e5a852]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[75vh]">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >


            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6 text-black">
              The Ultimate <br />
              Destination for <br />
              <span className="text-[#e5a852]">Luxury Dresses</span>
            </h1>

            <p className="text-secondary-600 text-base mb-6 max-w-lg leading-relaxed">
              Experience the art of fine dressmaking. Explore our curated collection
              of bridal, festive, and contemporary wear designed for every special moment.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">

              <Link
                to="/shop"
                className="w-full sm:w-auto justify-center bg-black text-[#e5a852] px-6 py-3 md:px-7 md:py-2.5 text-sm md:text-base rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition-all duration-300 shadow-xl shadow-black/10 flex items-center gap-2 group"
              >
                Explore Collection
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/about"
                className="w-full sm:w-auto justify-center bg-white border border-[#e5a852] text-black px-6 py-3 md:px-7 md:py-2.5 text-sm md:text-base rounded-full font-bold hover:bg-black hover:text-[#e5a852] hover:border-black transition-all duration-300 shadow-lg shadow-black/5 flex items-center gap-2 group"
              >
                Our Story
              </Link>

            </div>
          </motion.div>

          {/* Right Image - Standard Square */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-120.5"
            >



              {/* Blob Container */}
              <div className="aspect-square overflow-hidden rounded-lg border border-secondary-200 bg-white p-2 shadow-2xl">
                <img
                  src={Shop}
                  alt="Luxury Dress"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-out hover:scale-105 will-change-transform"
                />
              </div>



            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
