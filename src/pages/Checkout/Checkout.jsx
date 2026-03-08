import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Smartphone, ShieldCheck, MapPin } from "lucide-react";
import { BsCreditCard2Front } from "react-icons/bs";
import { SiGooglepay, SiMastercard, SiVisa } from "react-icons/si";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const emptyAddress = {
  type: "Home",
  name: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  isDefault: false
};

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [address, setAddress] = useState(emptyAddress);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address Management State
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // For this mock, we simulate selected address directly using a state. 
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  React.useEffect(() => {
    if (user && user.email) {
      const fetchAddresses = async () => {
        try {
          const res = await fetch(`http://localhost:3000/addresses?userEmail=${encodeURIComponent(user.email)}`);
          if (res.ok) {
            const data = await res.json();
            setSavedAddresses(data);

            // Try to find default address or default to the first one
            const defaultIndex = data.findIndex(a => a.isDefault);
            if (defaultIndex !== -1) {
              setSelectedAddressIndex(defaultIndex);
            } else if (data.length > 0) {
              setSelectedAddressIndex(0);
            }
          }
        } catch (error) {
          console.error("Failed to fetch addresses for checkout:", error);
        }
      };

      fetchAddresses();
    }
  }, [user]);

  const selectedAddress = savedAddresses[selectedAddressIndex] || null;

  const subtotal = cartTotal;
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveAddress = async () => {
    if (!address.name || !address.address || !address.city || !address.zip || !address.phone) {
      showToast("Please fill all required delivery details");
      return;
    }

    try {
      if (isEditing && selectedAddress) {
        // Edit logic is left basic for now as the prompt primarily focuses on adding/syncing.
        const updatedAddress = { ...address, userEmail: user.email };
        const res = await fetch(`http://localhost:3000/addresses/${selectedAddress.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAddress)
        });

        if (res.ok) {
          const data = await res.json();
          const updated = [...savedAddresses];
          updated[selectedAddressIndex] = data;
          setSavedAddresses(updated);
        }
      } else {
        const newAddress = { ...address, userEmail: user.email };
        const res = await fetch("http://localhost:3000/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAddress)
        });

        if (res.ok) {
          const data = await res.json();
          setSavedAddresses([...savedAddresses, data]);
          setSelectedAddressIndex(savedAddresses.length);
        }
      }

      setIsAddressOpen(false);
      setIsAddressListOpen(false);
      setIsEditing(false);
      setAddress(emptyAddress);
    } catch (error) {
      console.error("Address save error checkout:", error);
      showToast("Failed to save address", "error");
    }
  };

  const startRazorpayPayment = async () => {
    if (!selectedAddress) {
      showToast("Please select or add a delivery address");
      setIsAddressOpen(true);
      return;
    }

    setIsProcessing(true);

    try {
      // MOCK Razorpay Integration since real API keys aren't present
      const options = {
        key: "rzp_test_mock_key", // Enter the Key ID generated from the Dashboard
        amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "7-Fitz Luxury",
        description: "Order Payment",
        handler: function (response) {
          // Verify Payment
          setIsProcessing(false);
          clearCart();
          showToast("Payment Successful! Order placed.");
          navigate("/orders");
        },
        prefill: {
          name: selectedAddress.name || user?.name || "",
          email: user?.email || "",
          contact: selectedAddress.phone || "",
        },
        theme: {
          color: "#e5a852",
        },
      };

      // Simulate real razorpay if loaded, else fallback to timeout
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
        setIsProcessing(false);
      } else {
        // Fallback for mock if Razorpay isn't loaded on index.html
        setTimeout(async () => {
          try {
            // Generate a random order ID
            const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
            const orderDate = new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            });
            const firstItemImage = cartItems[0]?.images[0] || '';
            const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

            const newOrder = {
              id: orderId,
              userEmail: user?.email || '',
              date: orderDate,
              total: total,
              status: "Ordered",
              items: totalItems,
              image: firstItemImage,
              cartItems: cartItems,
              address: selectedAddress
            };

            const response = await fetch("http://localhost:3000/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newOrder)
            });

            if (!response.ok) {
              throw new Error("Failed to save order");
            }

            setIsProcessing(false);
            clearCart();
            showToast("Mock Payment Successful! Order placed.");
            navigate("/orders");
          } catch (error) {
            console.error("Order creation error:", error);
            setIsProcessing(false);
            showToast("Failed to place order", "error");
          }
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      showToast("Online payment failed", "error");
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  console.log(cartItems, "cartItems")

  return (
    <div className="container-custom py-10">
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
          <div className="bg-white p-8 rounded-3xl border border-secondary-100 shadow-sm relative overflow-hidden">
            <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <MapPin className="text-[#e5a852]" size={24} />
              Shipping Address
            </h2>

            {/* Address Display Block */}
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-black mb-1">
                  {selectedAddress ? `${selectedAddress.name}` : "No Address Selected"}
                </h3>
                {selectedAddress ? (
                  <div className="space-y-1 text-secondary-600 text-sm mt-3">
                    <p>{selectedAddress.address}</p>
                    <p>{selectedAddress.city}, {selectedAddress.zip}</p>
                    <p className="font-medium mt-2">Phone: {selectedAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-secondary-500 text-sm mt-2">Please add a delivery address to proceed.</p>
                )}
              </div>

              <button
                onClick={() => {
                  setIsAddressListOpen(true);
                }}
                className="text-sm font-bold text-[#e5a852] hover:text-black uppercase tracking-widest transition-colors py-1 px-3 border border-transparent hover:border-black rounded-full"
              >
                Change
              </button>
            </div>

            {/* ADDRESS LIST MODAL */}
            <AnimatePresence>
              {isAddressListOpen && (
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                  onClick={() => setIsAddressListOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl relative max-h-[80vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-serif font-bold">
                        Select Delivery Address
                      </h3>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setAddress(emptyAddress);
                          setIsAddressOpen(true);
                        }}
                        className="bg-black text-[#e5a852] px-5 py-2 rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition-all text-sm"
                      >
                        Add New
                      </button>
                    </div>

                    <div className="overflow-y-auto pr-2 space-y-4 grow">
                      {savedAddresses.map((addr, idx) => (
                        <label
                          key={addr.id || idx}
                          onClick={() => setSelectedAddressIndex(idx)}
                          className={`flex gap-4 p-5 rounded-2xl cursor-pointer transition-all border-2
                          ${selectedAddressIndex === idx
                              ? "border-primary-500 bg-primary-50/10"
                              : "border-secondary-100 bg-secondary-50 hover:border-secondary-300"
                            }`}
                        >
                          <input
                            type="radio"
                            name="delivery_address"
                            checked={selectedAddressIndex === idx}
                            readOnly
                            className="accent-[primary-500] w-5 h-5 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-lg">{addr.type || 'Home'}</span>
                              {addr.isDefault && (
                                <span className="bg-black text-[#e5a852] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  Default
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-md mb-1">{addr.name}</h4>
                            <p className="text-secondary-600 text-sm">{addr.address}</p>
                            <p className="text-secondary-600 text-sm">{addr.city}, {addr.zip}</p>
                            <p className="text-secondary-800 text-sm font-medium mt-2">Phone: {addr.phone}</p>
                          </div>
                        </label>
                      ))}

                      {savedAddresses.length === 0 && (
                        <div className="text-center py-8 text-secondary-500">
                          <MapPin size={48} className="mx-auto text-secondary-300 mb-4" />
                          <h3 className="text-xl font-bold mb-2 text-black">No addresses found</h3>
                          <p>You haven't added any delivery addresses yet.</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-secondary-100">
                      <button
                        onClick={() => setIsAddressListOpen(false)}
                        className="px-6 py-2.5 text-sm font-bold text-secondary-500 hover:text-black transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setIsAddressListOpen(false)}
                        className="px-8 py-2.5 bg-black text-[#e5a852] rounded-full font-bold shadow-lg hover:bg-[#e5a852] hover:text-black transition-all"
                      >
                        Confirm
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* ADDRESS FORM MODAL */}
            <AnimatePresence>
              {isAddressOpen && (
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
                  onClick={() => setIsAddressOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-2xl font-serif font-bold mb-6">
                      {isEditing ? "Update Details" : "New Address"}
                    </h3>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-span-2 flex gap-4 mb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" value="Home" checked={address.type === 'Home'} onChange={handleInputChange} className="accent-[#e5a852]" />
                          <span className="font-medium text-sm">Home</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" value="Work" checked={address.type === 'Work'} onChange={handleInputChange} className="accent-[#e5a852]" />
                          <span className="font-medium text-sm">Work</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" value="Other" checked={address.type === 'Other'} onChange={handleInputChange} className="accent-[#e5a852]" />
                          <span className="font-medium text-sm">Other</span>
                        </label>
                      </div>

                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={address.name}
                        onChange={handleInputChange}
                        className="input-field col-span-2 bg-secondary-50"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={address.phone}
                        onChange={handleInputChange}
                        className="input-field col-span-2 bg-secondary-50"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address *"
                        value={address.address}
                        onChange={handleInputChange}
                        className="input-field col-span-2 bg-secondary-50"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={address.city}
                        onChange={handleInputChange}
                        className="input-field bg-secondary-50"
                      />
                      <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code *"
                        value={address.zip}
                        onChange={handleInputChange}
                        className="input-field bg-secondary-50"
                      />

                      <label className="col-span-2 flex items-center gap-3 cursor-pointer mt-2">
                        <input
                          type="checkbox" name="isDefault"
                          checked={address.isDefault} onChange={handleInputChange}
                          className="w-4 h-4 accent-[#e5a852] rounded"
                        />
                        <span className="text-sm font-medium text-slate-700">Set as default address</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                      <button
                        onClick={() => setIsAddressOpen(false)}
                        className="px-6 py-2.5 text-sm font-bold text-secondary-500 hover:text-black transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveAddress}
                        className="px-8 py-2.5 bg-black text-[#e5a852] rounded-full font-bold shadow-lg hover:bg-[#e5a852] hover:text-black transition-all"
                      >
                        Save Address
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-secondary-50 p-8 rounded-3xl border border-secondary-100">
            <h2 className="text-2xl font-serif font-bold mb-6">
              Payment Method
            </h2>

            <div className="grid grid-cols-1 gap-4">

              <label
                onClick={() => setPaymentMethod("online")}
                className={`flex flex-col gap-4 p-5 rounded-2xl cursor-pointer transition-all
                ${paymentMethod === "online"
                    ? "border-2 border-primary-500 bg-white"
                    : "border-2 border-secondary-200"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <input type="radio" checked={paymentMethod === "online"} readOnly className="accent-primary-500 w-4 h-4" />
                  <BsCreditCard2Front className="text-2xl text-primary-500" />
                  <div>
                    <span className="font-bold block text-lg">Razorpay (Cards / UPI / NetBanking)</span>
                    <span className="text-xs text-secondary-500 font-bold tracking-widest uppercase">Safe & Secure Payments</span>
                  </div>
                </div>

                <div className="flex gap-4 sm:pl-10 mt-2">
                  <PaymentLogo icon={<SiVisa />} />
                  <PaymentLogo icon={<SiMastercard />} />
                  <PaymentLogo icon={<FaMoneyCheckAlt />} />
                  <PaymentLogo icon={<SiGooglepay />} />
                </div>
              </label>

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
                    {item.selectedSize} {item.selectedColor && `| ${item.selectedColor}`} | x{item.quantity}
                  </p>
                </div>

                <span className="text-sm font-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t pt-6 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-bold">Free</span>
                ) : (
                  `₹${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-serif font-bold pt-3">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={startRazorpayPayment}
            disabled={isProcessing}
            className="w-full h-16 mt-6 bg-black text-[#e5a852] font-bold rounded-md flex items-center justify-center gap-3 hover:bg-[#e5a852] hover:text-black transition-all shadow-xl"
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-[#e5a852] rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck size={20} /> Pay with Razorpay - ₹{total.toFixed(2)}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Payment Logo Subcomponent
const PaymentLogo = ({ icon }) => (
  <div className="px-5 py-2.5 rounded-xl text-2xl text-secondary-900 bg-secondary-100/50 border border-secondary-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300">
    {icon}
  </div>
);

export default Checkout;