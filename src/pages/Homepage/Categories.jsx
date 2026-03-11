import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

const EpicCollection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const { categories, loading } = useProducts();

  if (loading) return <p className="text-center py-24">Loading...</p>;

  return (
    <section className="relative bg-white py-24">
      <div className="max-w-7xl mx-auto px-3">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.4em] text-[#e5a852] uppercase mb-4 font-semibold">
            Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Shop by <span className="text-[#e5a852]">Categories</span>
          </h2>

          <div className="w-16 h-0.75 bg-[#e5a852] mx-auto mt-6" />


        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">

          {/* LEFT SIDE - Sticky Luxury Banner */}
          <div className="relative h-[50vh] lg:h-[85vh] mt-10 lg:mt-20">
            <div className="sticky top-28 h-full">

              <motion.div
                style={{ y }}
                className="relative h-full overflow-hidden rounded-lg"
              >
                <img
                  src="https://i.pinimg.com/736x/db/06/2b/db062bacb67a156c1bd855693d55d9c0.jpg"
                  alt="Dress Collection"
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" /> */}

                {/* Glass Panel */}
                <div className="absolute bottom-10 left-10 bg-white/50 backdrop-blur-md border border-white/20 p-4 rounded-xl">

                  <h3 className="text-2xl md:text-3xl font-serif text-black font-bold mb-3">
                    Dress Collection
                  </h3>
                  <h3>
                    347 Products
                  </h3>

                  <Link
                    to="/shop"
                    className="inline-block mt-4 px-6 py-2 md:px-8 md:py-3 bg-black text-white rounded-full text-sm tracking-wide hover:bg-[#e5a852] hover:text-black transition w-full sm:w-auto text-center"
                  >
                    Explore Collection →
                  </Link>

                </div>

              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE - Scroll Feed */}
          <div className="h-[60vh] lg:h-[85vh] overflow-y-auto pr-2 space-y-7 scrollbar-hide">

            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <motion.div
                  key={category.id}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link
                    to={`/shop?category=${category.name.toUpperCase()}`}
                    className="group block relative rounded-lg overflow-hidden"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={category.posterImage}
                        alt={category.name}
                        className="w-full h-75 object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-2xl">{category.name}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p>No categories found.</p>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default EpicCollection;
