import { useState } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewModal from "./ReviewModal";

const ProductDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="p-10 space-y-16">

      {/* Product content மேல இருக்கும் */}

      {/* Review Section */}
      <ReviewSummary
        reviews={reviews}
        onAddReview={() => setOpenModal(true)}
      />

      {/* Modal */}
      <ReviewModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddReview}
      />

    </div>
  );
};

export default ProductDetails;