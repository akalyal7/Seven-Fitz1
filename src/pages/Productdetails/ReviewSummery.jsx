import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewSummary = ({ reviews, onAddReview }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    ratingCounts[r.rating - 1] += 1;
  });

  const totalReviews = reviews.length;

  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(0) : 0
  );

  const ratingLabels = ["Poor", "Average", "Good", "Very Good", "Excellent"];

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-secondary-200 rounded-3xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="p-8 border-b border-secondary-100 bg-white">
        <h3 className="text-xl font-bold text-secondary-900 mb-8 font-sans">
          Product Ratings & Reviews
        </h3>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left - Average */}
          <div className="flex flex-col items-center lg:items-start shrink-0">
            <div className="flex items-center gap-1">
              <p className="text-6xl font-black text-secondary-900 tracking-tight">
                {average}
              </p>
              <Star size={36} className="fill-primary-500 text-primary-500 mb-2 ml-1" />
            </div>
            <div className="text-sm text-secondary-500 mt-2 font-medium text-center lg:text-left">
              <p>{totalReviews} Ratings,</p>
              <p>{totalReviews} Reviews</p>
            </div>
          </div>

          {/* Middle - Rating Bars */}
          <div className="flex-1 w-full space-y-3">
            {[4, 3, 2, 1, 0].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm w-20 text-right font-medium text-secondary-700">
                  {ratingLabels[i]}
                </span>

                <div className="flex-1 h-2.5 bg-secondary-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${i === 4
                      ? "bg-green-600"
                      : i === 3
                        ? "bg-green-500"
                        : i === 2
                          ? "bg-yellow-400"
                          : i === 1
                            ? "bg-orange-400"
                            : "bg-red-500"
                      }`}
                    style={{ width: `${ratingPercentages[i]}%` }}
                  ></div>
                </div>

                <span className="text-sm font-medium text-secondary-500 w-10">
                  {ratingCounts[i]}
                </span>
              </div>
            ))}
          </div>

          {/* Right - Add Review Button */}
          <div className="shrink-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddReview}
              className="h-12 px-8 bg-secondary-900 text-[#ffbf67] rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#ffbf67] hover:text-black transition-all duration-300"
            >
              Write Review
            </motion.button>
          </div>

        </div>
      </div>

      {/* Review List */}
      {/* Review List */}
      <div className="p-8 bg-white">
        {reviews.length === 0 && (
          <p className="text-secondary-400 text-sm text-center">
            No reviews yet. Be the first to review!
          </p>
        )}

        <div className="space-y-6">
          <AnimatePresence>
            {displayedReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300 bg-secondary-50/40"
              >
                {/* Profile Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100 shrink-0 shadow-sm border border-secondary-200">
                      <img
                        src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Name and Rating */}
                    <div>
                      <h4 className="text-sm font-bold text-secondary-900 leading-tight">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 fill-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Optional Date */}
                  {review.date && (
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                      {review.date}
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-sm text-secondary-700 leading-relaxed mt-1">
                  {review.comment}
                </p>

                {/* Images (NEW SECTION) */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-3 mt-4">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.preview}
                        alt="review"
                        className="w-24 h-24 object-cover rounded-xl border border-secondary-200"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Reviews Button */}
        {reviews.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-secondary-200 text-xs font-black uppercase tracking-[0.2em] text-secondary-700 hover:border-primary-500 hover:text-primary-600 transition-all duration-300 shadow-sm hover:shadow-md bg-white"
            >
              {showAll ? (
                <>
                  View Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View All {reviews.length} Reviews <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSummary;