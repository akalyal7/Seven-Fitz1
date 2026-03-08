import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

const ProductShowcase = () => {
  const [active, setActive] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  if (loading) return <p className="w-full text-center py-20">Loading...</p>;

  const displayProducts = [
    { ...products?.[0], top: "28%", left: "35%", image: products?.[0]?.images?.[0] || "", title: products?.[0]?.name, price: `₹${products?.[0]?.price}` },
    { ...products?.[1], top: "50%", left: "48%", image: products?.[1]?.images?.[0] || "", title: products?.[1]?.name, price: `₹${products?.[1]?.price}` },
    { ...products?.[2], top: "85%", left: "55%", image: products?.[2]?.images?.[0] || "", title: products?.[2]?.name, price: `₹${products?.[2]?.price}` },
  ].filter(p => p && p.name);

  return (
    <section className="w-full min-h-screen bg-white flex items-center justify-center p-4 md:p-10">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-6 bg-white p-4 md:p-6">

        {/* LEFT IMAGE */}
        <div className="relative w-full h-112.5 md:h-150 overflow-hidden rounded-2xl shadow-xl">
          <img
            src="https://minion-vinovatheme.myshopify.com/cdn/shop/files/Lookbook-1_1080x.jpg?v=1699850444"
            alt="Model"
            className="w-full h-full object-cover rounded-2xl"
          />

          {displayProducts.map((item, index) => (
            <motion.div
              key={item.id || index}
              onClick={() => setActive(index)}
              className="absolute cursor-pointer"
              style={{ top: item.top, left: item.left }}
              animate={{
                scale: active === index ? 1.4 : [1, 1.2, 1],
                opacity: active === index ? 1 : [0.6, 1, 0.6],
              }}
              transition={{
                repeat: active === index ? 0 : Infinity,
                duration: 2,
              }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg
                ${active === index ? "bg-[#e5a852] text-white" : "bg-white/80 text-gray-800"} border border-[#e5a852]`}
              >
                <FaPlus className="text-sm" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT PRODUCT CARD */}
        <div className="flex flex-col items-center justify-center text-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -120, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <img
                src={displayProducts[active]?.image}
                alt={displayProducts[active]?.title}
                className="w-50 md:w-70.5 object-contain mb-6 rounded-lg shadow-md"
              />

              <h3 className="text-gray-700 text-sm mb-2 font-semibold">
                {displayProducts[active]?.title}
              </h3>

              <p className="text-black font-bold mb-6 text-lg">
                {displayProducts[active]?.price}
              </p>

              <button
                onClick={() => {
                  const prod = displayProducts[active];
                  const productForCart = {
                    id: prod.id,
                    name: prod.title,
                    price: Number(String(prod.price).replace(/[^0-9.-]+/g, "")) || 0,
                    images: [prod.image]
                  };
                  addToCart(productForCart, 1, null, null);
                  navigate('/cart');
                }}
                className="inline-flex items-center gap-2 bg-[#e5a852] text-black px-7 py-4 hover:text-white hover:bg-black rounded-full font-semibold text-sm  shadow-xl transition-all duration-300"
              >
                ADD TO BAG
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-2 mt-6 absolute bottom-6">
            {displayProducts.map((_, i) => (
              <span
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full cursor-pointer border border-[#e5a852] ${active === i ? "bg-[#e5a852]" : "bg-white"
                  }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
