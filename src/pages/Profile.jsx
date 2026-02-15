import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { MapPin, ShoppingBag, Settings, LogOut, ChevronRight, User as UserIcon, Calendar, Mail, Phone, Package, Clock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { user, logout } = useAuth();
    const showToast = useToast();
    const [activeTab, setActiveTab] = useState('orders');

    const mockOrders = [
        { id: 'ORD-7721', date: 'Jan 12, 2026', total: 129.99, status: 'Delivered', items: 1, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&q=80' },
        { id: 'ORD-6542', date: 'Dec 05, 2025', total: 89.50, status: 'Shipped', items: 2, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&q=80' }
    ];

    const mockAddresses = [
        { id: 1, type: 'Home', address: '123 Fashion Street, Silk City, NY 10001', isDefault: true },
        { id: 2, type: 'Office', address: '456 Business Avenue, Tech Hub, CA 90001', isDefault: false }
    ];

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">You need to be logged in to view this page.</h2>
                <a href="/login" className="btn-primary inline-block">Login Now</a>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-10">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="lg:w-80">
                    <div className="bg-white rounded-3xl p-8 border border-secondary-100 shadow-sm sticky top-32">
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary-50 ring-4 ring-white">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-xl font-serif font-bold">{user.name}</h2>
                            <p className="text-secondary-500 text-sm mt-1">{user.email}</p>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-[10px] ${activeTab === 'orders' ? 'bg-secondary-900 text-primary-500 shadow-xl' : 'bg-white hover:bg-secondary-50 text-secondary-600'}`}
                            >
                                <ShoppingBag size={18} /> Order History
                            </button>
                            <button
                                onClick={() => setActiveTab('addresses')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-[10px] ${activeTab === 'addresses' ? 'bg-secondary-900 text-primary-500 shadow-xl' : 'bg-white hover:bg-secondary-50 text-secondary-600'}`}
                            >
                                <MapPin size={18} /> Saved Addresses
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-[10px] ${activeTab === 'settings' ? 'bg-secondary-900 text-primary-500 shadow-xl' : 'bg-white hover:bg-secondary-50 text-secondary-600'}`}
                            >
                                <Settings size={18} /> Account Settings
                            </button>
                            <button
                                onClick={() => { logout(); showToast("Logged out successfully"); }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-red-600 hover:bg-red-50 mt-4"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="grow">
                    <AnimatePresence mode="wait">
                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <h1 className="text-3xl font-serif font-bold">My Orders</h1>
                                    <span className="bg-secondary-100 px-4 py-1.5 rounded-full text-sm font-bold text-secondary-600">{mockOrders.length} Orders</span>
                                </div>

                                <div className="space-y-6">
                                    {mockOrders.map((order) => (
                                        <div key={order.id} className="bg-white p-6 rounded-2xl border border-secondary-100 hover:shadow-md transition-all group">
                                            <div className="flex flex-wrap items-center justify-between gap-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-secondary-50">
                                                        <img src={order.image} alt="Order item" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg mb-1">{order.id}</h3>
                                                        <p className="text-sm text-secondary-500 font-medium">Placed on {order.date} • {order.items} Items</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-8">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-secondary-400 font-bold mb-1">Total</p>
                                                        <p className="font-bold">${order.total.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-secondary-400 font-bold mb-1">Status</p>
                                                        <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-secondary-900 text-primary-500'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-600' : 'bg-primary-500'} animate-pulse`} />
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <button className="p-3 bg-secondary-50 text-secondary-900 rounded-xl hover:bg-secondary-900 hover:text-white transition-all">
                                                        <ChevronRight size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'addresses' && (
                            <motion.div
                                key="addresses"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <h1 className="text-3xl font-serif font-bold">Saved Addresses</h1>
                                    <button className="btn-primary py-2 text-sm font-bold">Add New</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {mockAddresses.map(addr => (
                                        <div key={addr.id} className="bg-white p-6 rounded-2xl border border-secondary-100 hover:border-primary-200 transition-all relative">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={18} className="text-primary-500" />
                                                    <span className="font-bold">{addr.id === 1 ? 'Home' : 'Office'}</span>
                                                </div>
                                                {addr.isDefault && <span className="text-[10px] font-black uppercase tracking-widest bg-secondary-900 text-primary-500 px-3 py-1 rounded-full shadow-lg">Default</span>}
                                            </div>
                                            <p className="text-sm text-secondary-500 leading-relaxed font-medium mb-6">{addr.address}</p>
                                            <div className="flex gap-4">
                                                <button className="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:text-secondary-900 transition-colors">Edit</button>
                                                <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <h1 className="text-3xl font-serif font-bold">Account Settings</h1>

                                <div className="bg-white rounded-3xl border border-secondary-100 overflow-hidden divide-y divide-secondary-100">
                                    <div className="p-8">
                                        <h3 className="text-lg font-bold mb-6">Profile Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-secondary-400">Full Name</label>
                                                <input type="text" defaultValue={user.name} className="input-field" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-secondary-400">Email Address</label>
                                                <input type="email" defaultValue={user.email} className="input-field bg-secondary-50" disabled />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-secondary-400">Phone Number</label>
                                                <input type="text" placeholder="+1 234 567 890" className="input-field" />
                                            </div>
                                        </div>
                                        <button className="btn-primary mt-8 px-8">Save Changes</button>
                                    </div>

                                    <div className="p-8">
                                        <h3 className="text-lg font-bold mb-6">Security</h3>
                                        <div className="max-w-md space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-2xl">
                                                <div className="flex items-center gap-3">
                                                    <ShieldCheck size={20} className="text-green-600" />
                                                    <span className="text-sm font-medium">Two-Factor Authentication</span>
                                                </div>
                                                <button className="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:text-secondary-900 transition-colors">Enable</button>
                                            </div>
                                            <button className="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:text-secondary-900 transition-colors px-2">Change Password</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default Profile;
