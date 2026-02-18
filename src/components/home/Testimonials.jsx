import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialData = [
  {
    id: 1,
    name: "Francois Mercer",
    role: "Customers",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum mi sit amet commodo congue. Donec vel posuere leo. Duis ultrices diam sapien.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Victor",
    role: "Client",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 4,
    name: "Daniel",
    role: "Client",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "https://picsum.photos/104/104",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="relative py-28 bg-white overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header Section */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <span className="text-[#e5a852] font-semibold uppercase tracking-[0.4em] text-xs block mb-4">
                    Testimonials
                  </span>
        
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
                    Our Cutomers<span className="text-[#e5a852]"> Says</span>
                  </h2>
        
                  <div className="w-20 h-0.75 bg-linear-to-r from-yellow-400 via-[#e5a852] to-yellow-700 mx-auto rounded-full" />
        
                  <p className="text-gray-500 mt-5 max-w-xl mx-auto">
                    Discover why our customers love our carefully curated pieces.
                  </p>
                </motion.div>

        <Slider {...settings}>
          {testimonialData.map((item) => (
            <div key={item.id} className="px-4 h-full">
              <div className="relative h-70 rounded-2xl overflow-hidden">

                {/* Gold Shadow Layer */}
                <div className="absolute top-6 left-6 w-full h-full bg-linear-to-r from-yellow-300 via-[#e5a852] to-yellow-700 rounded-2xl"></div>

                {/* Main Card */}
                <div className="relative bg-black border border-yellow-600/30 rounded-2xl p-8 shadow-xl h-65 flex flex-col justify-between">

                  {/* Top Content */}
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                      {item.text}
                    </p>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-600"
                    />
                    <div>
                      <h3 className="font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-yellow-500 text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Dots */}
      <style>
        {`
          .slick-dots {
            bottom: -50px;
          }
          .slick-dots li button:before {
            font-size: 10px;
            color: #e5a852;
            opacity: 0.4;
          }
          .slick-dots li.slick-active button:before {
            opacity: 1;
            color: #e5a852;
          }
        `}
      </style>

    </section>
  );
};

export default Testimonials;
