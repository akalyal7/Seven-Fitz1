import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Tag, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const showToast = useToast();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const shipping = cartTotal > 150 ? 0 : 15;
    const tax = cartTotal * 0.08;
    const total = cartTotal + shipping + tax - discount;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (coupon.toUpperCase() === 'FIRST10') {
            setDiscount(cartTotal * 0.1);
            showToast('Coupon applied! 10% discount added.');
        } else {
            showToast('Invalid coupon code.', 'error');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container-custom py-50 text-center">
                <div className="w-24 h-24 bg-black text-[#e5a852] rounded-lg flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <ShoppingBag size={40} />
                </div>
                <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
                <p className="text-secondary-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our collections and find your perfect fit.</p>
                <Link to="/shop" className=" btn-gold inline-flex items-center gap-3 h-13 px-6 uppercase tracking-widest text-sm">
                    Explore Collections <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="container-custom py-22 md:py-15">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 ">Shopping <span className="text-[#e5a852]">Cart </span> </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div
                                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="flex gap-6 p-2 bg-white rounded-md border border-secondary-200 hover:shadow-md transition-shadow relative group"
                            >
                                <div className="w-24 h-32 md:w-32 md:h-40 rounded-md overflow-hidden bg-slate-50 border border-secondary-50 shrink-0">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="grow flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-serif font-bold text-secondary-900 hover:text-primary-500 transition-colors">
                                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <button
                                                onClick={() => {
                                                    removeFromCart(item.id, item.selectedSize, item.selectedColor);
                                                    showToast('Item removed from cart');
                                                }}
                                                className="p-2 text-secondary-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-sm text-secondary-500 mb-4">
                                            Size: <span className="text-secondary-900 font-semibold">{item.selectedSize}</span>
                                            {item.selectedColor && (
                                                <> | Color: <span className="text-secondary-900 font-semibold">{item.selectedColor}</span></>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border border-secondary-200 rounded-lg overflow-hidden h-10">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                                className="px-2 hover:bg-secondary-50 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm tracking-tighter">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                                className="px-2 hover:bg-secondary-50 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="text-lg font-black text-secondary-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="pt-6 flex justify-between items-center">
                        <Link to="/shop" className="text-[#e5a852] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:text-black transition-colors">
                            <ShoppingBag size={18} /> Continue Shopping
                        </Link>
                        <div className="text-xs text-secondary-400 flex items-center gap-1 italic">
                            <Info size={14} /> Prices include applicable taxes
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <aside>
                    <div className="bg-secondary-50 rounded-xl p-8 sticky top-32 border border-secondary-200 shadow-accent-800">
                        <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>

                        {/* <form onSubmit={handleApplyCoupon} className="mb-8">
                            <label className="block text-xs font-bold uppercase tracking-widest text-secondary-500 mb-2">Have a coupon?</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="FIRST10"
                                    className="grow px-5 py-3 bg-white border border-secondary-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#e5a852] text-[10px] font-bold tracking-widest uppercase placeholder:text-secondary-300"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                />
                                <button type="submit" className="px-6 py-3 bg-black text-[#e5a852] font-bold rounded-lg text-[10px] uppercase tracking-widest hover:bg-[#e5a852] hover:text-black transition-colors">Apply</button>
                            </div>
                        </form> */}

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-secondary-600">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-secondary-600">
                                <span>Estimated Shipping</span>
                                <span>{shipping === 0 ? <span className="text-green-600 font-bold">Free</span> : `₹${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-secondary-600">
                                <span>Estimated Tax (8%)</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Discount</span>
                                    <span>-₹{discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="pt-5 border-t border-secondary-200 flex uppercase justify-between text-xl font-sans font-bold text-black">
                                <span>Total</span>
                                <span className="text-[#e5a852]">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-65 bg-black text-[#e5a852] ms-7 h-12 rounded-md flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest shadow-xl hover:bg-[#e5a852] hover:text-black transition-all"
                        >
                            Checkout Now <ArrowRight size={20} />
                        </button>

                        {/* {shipping > 0 && (
                            <div className="mt-8 p-6 bg-black rounded-lg border border-white/5 flex items-start gap-4">
                                <Tag size={20} className="text-[#e5a852] mt-0.5 shrink-0" />
                                <p className="text-[10px] text-secondary-400 leading-relaxed font-bold uppercase tracking-widest">
                                    Add <span className="text-[#e5a852]">${(150 - cartTotal).toFixed(2)}</span> more to your cart for <span className="text-white">FREE SHIPPING</span>.
                                </p>
                            </div>
                        )} */}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
