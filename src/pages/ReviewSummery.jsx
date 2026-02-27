import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ReviewSummary = ({ reviews, onAddReview }) => {
  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  // Count reviews by rating
  const ratingCounts = [0, 0, 0, 0, 0]; // index 0 = 1★, 4 = 5★
  reviews.forEach((r) => {
    ratingCounts[r.rating - 1] += 1;
  });

  const totalReviews = reviews.length;

  // Convert counts to percentages
  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(0) : 0
  );

  const ratingLabels = ["Poor", "Average", "Good", "Very Good", "Excellent"];

  return (
    <div className="border border-secondary-200 rounded-2xl overflow-hidden shadow-lg bg-white">
      {/* Banner */}
      {/* <div className="relative h-40 w-full">
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
          alt="Review Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-xl font-black tracking-widest uppercase">
            Customer Feedback
          </h2>
        </div>
      </div> */}

      {/* Header */}
      <div className="px-6 py-5 bg-secondary-50 items-start">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">
            Customer Reviews
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <Star size={18} className="text-primary-500 fill-current" />
            <span className="text-lg font-black">{average}</span>
            <span className="text-secondary-400 text-sm">({totalReviews} Reviews)</span>
          </div>

          {/* Rating Bars */}
          <div className="grid grid-cols-5 p-3">
<div className="col-span-3 mt-3 px-8 py-4 space-y-3">
  {[4,3,2,1,0].map((i) => (
    <div key={i} className="flex items-center gap-3">
      {/* Rating label */}
      <span className="text-sm w-16 text-right">{ratingLabels[i]}</span>

      {/* Bar container */}
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* Bar fill */}
        <div
          className={`h-3 rounded-full ${
            i === 4
              ? "bg-green-500"
              : i === 3
              ? "bg-green-300"
              : i === 2
              ? "bg-yellow-400"
              : i === 1
              ? "bg-gray-400"
              : "bg-red-500"
          } transition-all duration-500`}
          style={{ width: `${ratingPercentages[i]}%` }}
        ></div>
      </div>

      {/* Count on the right */}
      <span className="text-xs font-bold` text-secondary-400 w-8 text-right">
        {ratingCounts[i]}
      </span>
    </div>
  ))}
</div>
<div className="col-span-2 grid justify-end">
   <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddReview}
          className="h-12 px-6 bg-primary-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
        >
          Add Review
        </motion.button>
  </div>
  </div>
        </div>
      </div>

      {/* Review List */}
      <div className="p-6 space-y-4">
        {reviews.length === 0 && (
          <p className="text-secondary-400 text-sm">
            No reviews yet. Be the first to review!
          </p>
        )}

        {reviews.map((review, index) => (
          <div key={index} className="border-b border-secondary-100 pb-4">
            <div className="flex items-center gap-2 mb-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-primary-500 fill-current"
                />
              ))}
              <span className="text-xs text-secondary-400 ml-2">{review.name}</span>
            </div>
            <p className="text-sm text-secondary-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;