import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Smartphone, Truck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const emptyAddress = {
  name: "",
  phone: "",
  address: "",
  city: "",
  zip: ""
};

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const showToast = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState(emptyAddress);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartTotal;
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!address.name || !address.address || !address.city) {
      showToast("Please fill delivery details");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      showToast("Order placed successfully!");
      navigate("/orders");
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-30 py-10">
      <Link
        to="/cart"
        className="text-secondary-500 hover:text-primary-500 mb-8 inline-block"
      >
        ← Back to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">

          {/* ADDRESS SECTION */}
          <div className="bg-secondary-50 p-8 rounded-3xl border border-secondary-100">
            <h2 className="text-2xl font-serif font-bold mb-6">
              Shipping Information
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleInputChange}
                className="input-field col-span-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleInputChange}
                className="input-field col-span-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={address.address}
                onChange={handleInputChange}
                className="input-field col-span-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={address.zip}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-secondary-50 p-8 rounded-3xl border border-secondary-100">
            <h2 className="text-2xl font-serif font-bold mb-6">
              Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all
                ${paymentMethod === "card"
                    ? "border-primary-500 bg-black text-primary-500"
                    : "border-secondary-200"
                  }`}
              >
                <CreditCard size={24} />
                <span className="text-sm font-bold">Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod("upi")}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all
                ${paymentMethod === "upi"
                    ? "border-primary-500 bg-black text-primary-500"
                    : "border-secondary-200"
                  }`}
              >
                <Smartphone size={24} />
                <span className="text-sm font-bold">UPI</span>
              </button>

              <button
                onClick={() => setPaymentMethod("cod")}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all
                ${paymentMethod === "cod"
                    ? "border-primary-500 bg-black text-primary-500"
                    : "border-secondary-200"
                  }`}
              >
                <Truck size={24} />
                <span className="text-sm font-bold">Cash on Delivery</span>
              </button>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY */}
        <div className="bg-secondary-50 rounded-3xl p-8 border border-secondary-100 h-fit sticky top-32">
          <h3 className="text-xl font-serif font-bold mb-6">
            Order Summary
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-white">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grow">
                  <p className="text-sm font-bold line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-secondary-500 mt-1">
                    {item.selectedSize} | x{item.quantity}
                  </p>
                </div>

                <span className="text-sm font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t pt-6 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-bold">Free</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-serif font-bold pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full h-16 mt-6 bg-black text-[#e5a852] font-bold rounded-md flex items-center justify-center gap-3 hover:bg-[#e5a852] hover:text-black transition-all"
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck size={20} /> Place Order - ${total.toFixed(2)}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;