import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ImagePlus, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
    comment: "",
  });

  useEffect(() => {
    if (user && !form.name) {
      setForm((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...previews].slice(0, 3));
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      ...form,
      images,
      avatar: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=random`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    onSubmit(newReview);
    setForm({ name: user?.name || "", rating: 5, comment: "" });
    setImages([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 bg-secondary-900 text-white">
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.2em]">
                Write a Review
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 p-3 rounded-2xl outline-none transition-all duration-300 font-medium text-secondary-900"
              />

              {/* Star Rating */}
              <div>
                <p className="text-sm font-semibold mb-2">Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() =>
                        setForm({ ...form, rating: num })
                      }
                      className="focus:outline-none"
                    >
                      <Star
                        size={28}
                        className={`transition-all duration-300 ${num <= form.rating
                          ? "text-yellow-400 fill-yellow-400 hover:scale-110"
                          : "text-secondary-200 hover:scale-110"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <textarea
                required
                placeholder="Write your review..."
                value={form.comment}
                onChange={(e) =>
                  setForm({ ...form, comment: e.target.value })
                }
                className="w-full border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 p-4 rounded-2xl outline-none transition-all duration-300 min-h-25 font-medium text-secondary-900 resize-none"
              />

              {/* Image Upload Section */}
              <div>
                <p className="text-sm font-semibold mb-3">
                  Upload Images (Max 3)
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <img
                        src={img.preview}
                        alt="preview"
                        className="w-full h-24 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {images.length < 3 && (
                    <label className="flex items-center justify-center h-24 border-2 border-dashed border-secondary-300 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-300">
                      <ImagePlus className="text-secondary-400" />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-secondary-500 hover:text-secondary-900 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-3 bg-primary-500 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-primary-600 transition-all duration-300"
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;