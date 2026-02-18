import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Smartphone, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const showToast = useToast();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form states (simplified)
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });

    const subtotal = cartTotal;
    const shipping = subtotal > 150 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Mock payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
            showToast("Order placed successfully! Check your email for confirmation.");
        }, 2500);
    };

    if (cartItems.length === 0 && !isSuccess) {
        navigate('/cart');
        return null;
    }

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md mx-auto"
                >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={64} />
                    </div>
                    <h1 className="text-4xl font-serif font-bold mb-4">Thank You!</h1>
                    <p className="text-secondary-600 mb-8">Your order #7F-ORD-2026-X99 has been placed. We're getting it ready for shipment.</p>
                    <div className="space-y-4">
                        <div className="bg-secondary-50 p-6 rounded-2xl text-left space-y-3 mb-8">
                            <div className="flex justify-between text-sm"><span className="text-secondary-500">Order ID:</span><span className="font-bold">#7F-ORD-2026-X99</span></div>
                            <div className="flex justify-between text-sm"><span className="text-secondary-500">Date:</span><span className="font-bold">{new Date().toLocaleDateString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-secondary-500">Amount Paid:</span><span className="font-bold text-primary-500">${total.toFixed(2)}</span></div>
                        </div>
                        <Link to="/shop" className="btn-primary w-full inline-block">Continue Shopping</Link>
                        <Link to="/orders" className="btn-secondary w-full inline-block">Track Order</Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-30 py-10">
            <Link to="/cart" className="flex items-center gap-2 text-secondary-500 hover:text-primary-500 mb-8 font-medium transition-colors">
                <ChevronLeft size={20} /> Back to Cart
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Checkout Form */}
                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= 1 ? 'bg-secondary-900 text-primary-500 shadow-xl' : 'bg-secondary-200'}`}>1</div>
                        <h2 className="text-2xl font-serif font-bold">Shipping Information</h2>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary-500 mb-2">Email Address</label>
                            <input type="email" name="email" required placeholder="name@example.com" value={formData.email} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary-500 mb-2">First Name</label>
                            <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary-500 mb-2">Last Name</label>
                            <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary-500 mb-2">Shipping Address</label>
                            <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary-500 mb-2">City</label>
                            <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary-500 mb-2">ZIP Code</label>
                            <input type="text" name="zip" required value={formData.zip} onChange={handleInputChange} className="input-field" />
                        </div>
                    </form>

                    <div className="flex items-center gap-4 pt-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= 2 ? 'bg-secondary-900 text-primary-500 shadow-xl' : 'bg-secondary-200'}`}>2</div>
                        <h2 className="text-2xl font-serif font-bold">Payment Method</h2>
                    </div>

                    <AnimatePresence>
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-primary-500 bg-secondary-900 text-primary-500' : 'border-secondary-100 hover:border-secondary-300'}`}
                                    >
                                        <CreditCard size={24} />
                                        <span className="text-sm font-bold">Card</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'upi' ? 'border-primary-500 bg-secondary-900 text-primary-500' : 'border-secondary-100 hover:border-secondary-300'}`}
                                    >
                                        <Smartphone size={24} />
                                        <span className="text-sm font-bold">UPI</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'cod' ? 'border-primary-500 bg-secondary-900 text-primary-500' : 'border-secondary-100 hover:border-secondary-300'}`}
                                    >
                                        <Truck size={24} />
                                        <span className="text-sm font-bold">COD</span>
                                    </button>
                                </div>

                                <div className="bg-secondary-50 p-6 rounded-2xl">
                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4">
                                            <input type="text" placeholder="Card Number" className="input-field" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="text" placeholder="MM/YY" className="input-field" />
                                                <input type="text" placeholder="CVC" className="input-field" />
                                            </div>
                                        </div>
                                    )}
                                    {paymentMethod === 'upi' && (
                                        <div className="space-y-4">
                                            <input type="text" placeholder="Enter UPI ID (e.g. name@okaxis)" className="input-field" />
                                            <p className="text-xs text-secondary-500 px-1 italic">Scan QR on next step or pay via UPI App</p>
                                        </div>
                                    )}
                                    {paymentMethod === 'cod' && (
                                        <p className="text-sm text-secondary-600 font-medium">Pay via Cash or Card at the time of delivery.</p>
                                    )}
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    className="w-full h-16 bg-secondary-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 disabled:bg-secondary-400"
                                >
                                    {isProcessing ? (
                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <ShieldCheck size={20} /> Place Order - ${total.toFixed(2)}
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Order Summary Recap */}
                <div>
                    <div className="bg-secondary-50 rounded-3xl p-8 border border-secondary-100 sticky top-32">
                        <h3 className="text-xl font-serif font-bold mb-6">Order Summary</h3>
                        <div className="space-y-4 max-h-75 overflow-y-auto pr-2 mb-8 no-scrollbar">
                            {cartItems.map(item => (
                                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-white shrink-0">
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="grow">
                                        <p className="text-sm font-bold leading-tight line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-secondary-500 mt-1">{item.selectedSize} | {item.selectedColor} | x{item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-bold text-secondary-900">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-secondary-200">
                            <div className="flex justify-between text-sm text-secondary-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-secondary-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span className="text-green-600 font-bold">Free</span> : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-sm text-secondary-600">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-serif font-bold text-secondary-900 pt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
