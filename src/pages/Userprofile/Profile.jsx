import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  MapPin,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  React.useEffect(() => {
    if (user && user.email) {
      const fetchOrders = async () => {
        setIsLoadingOrders(true);
        try {
          const res = await fetch(`http://localhost:3000/orders?userEmail=${encodeURIComponent(user.email)}`);
          if (res.ok) {
            const data = await res.json();
            // Sort by latest assuming ID or just reverse it
            setOrders(data.reverse());
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setIsLoadingOrders(false);
        }
      };

      fetchOrders();
    }
  }, [user]);

  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  // Address Add/Edit State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    isDefault: false
  });

  const fetchAddresses = async () => {
    if (!user || !user.email) return;
    setIsLoadingAddresses(true);
    try {
      const res = await fetch(`http://localhost:3000/addresses?userEmail=${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  React.useEffect(() => {
    if (user && user.email) {
      if (activeTab === 'addresses') {
        fetchAddresses();
      }
    }
  }, [user, activeTab]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveAddress = async () => {
    if (!addressForm.name || !addressForm.address || !addressForm.city || !addressForm.zip || !addressForm.phone) {
      showToast("Please fill all required details");
      return;
    }

    try {
      const newAddress = {
        ...addressForm,
        userEmail: user.email,
      };

      const res = await fetch("http://localhost:3000/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress)
      });

      if (res.ok) {
        showToast("Address saved successfully");
        setIsAddressModalOpen(false);
        setAddressForm({
          type: 'Home',
          name: '',
          phone: '',
          address: '',
          city: '',
          zip: '',
          isDefault: false
        });
        fetchAddresses();
      } else {
        showToast("Failed to save address", "error");
      }
    } catch (error) {
      console.error("Save address error:", error);
      showToast("An error occurred", "error");
    }
  };

  const deleteAddress = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/addresses/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        showToast("Address removed");
        fetchAddresses();
      } else {
        showToast("Failed to remove address", "error");
      }
    } catch (error) {
      console.error("Delete address error:", error);
      showToast("An error occurred", "error");
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">
          You need to be logged in to view this page.
        </h2>
        <a
          href="/login"
          className="bg-black text-[#e5a852] px-6 py-3 rounded-full font-bold"
        >
          Login Now
        </a>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-50/50 py-14 px-4 md:px-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#e5a852]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-slate-200 sticky top-32">

              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#e5a852]/20 ring-4 ring-white shadow-lg">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-serif font-bold">{user.name}</h2>
                <p className="text-slate-500 text-sm mt-1">{user.email}</p>
              </div>

              <nav className="space-y-3">

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'orders'
                    ? 'bg-black text-[#e5a852]'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-black hover:text-[#e5a852]'
                    }`}
                >
                  <ShoppingBag size={18} />
                  Order History
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'addresses'
                    ? 'bg-black text-[#e5a852]'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-black hover:text-[#e5a852]'
                    }`}
                >
                  <MapPin size={18} />
                  Saved Addresses
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'settings'
                    ? 'bg-black text-[#e5a852]'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-black hover:text-[#e5a852]'
                    }`}
                >
                  <Settings size={18} />
                  Account Settings
                </button>

                <button
                  onClick={() => {
                    logout();
                    showToast('Logged out successfully');
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 mt-4"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>

              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="grow">

            <AnimatePresence mode="wait">

              {/* ORDERS */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >

                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold">
                      My Orders
                    </h1>
                    <span className="bg-black text-[#e5a852] px-4 py-1.5 rounded-full text-sm font-bold">
                      {orders.length} Orders
                    </span>
                  </div>

                  <div className="space-y-6">
                    {isLoadingOrders ? (
                      <div className="text-center py-10">
                        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#e5a852] rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">Loading orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                        <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">No orders found</h3>
                        <p className="text-slate-500 mb-6">Looks like you haven't placed any orders yet.</p>
                        <button onClick={() => navigate('/shop')} className="px-6 py-2 bg-black text-[#e5a852] rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition-all">
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >

                          <div className="flex flex-wrap items-center justify-between gap-6">

                            <div className="flex items-center gap-6">
                              <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-100">
                                <img
                                  src={order.image || 'https://via.placeholder.com/100'}
                                  alt="Order"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div>
                                <h3 className="font-bold text-lg">{order.id}</h3>
                                <p className="text-sm text-slate-500">
                                  Placed on {order.date} • {order.items} Items
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-8">

                              <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">
                                  Total
                                </p>
                                <p className="font-bold">
                                  ₹{order.total.toFixed(2)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">
                                  Status
                                </p>

                                <span
                                  className={`px-3 py-1 text-xs font-bold rounded-full ${order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-black text-[#e5a852]'
                                    }`}
                                >
                                  {order.status}
                                </span>
                              </div>

                              <button
                                onClick={() =>
                                  navigate(`/track-order/${order.id.replace('#', '')}`)
                                }
                                className="p-3 bg-black text-[#e5a852] rounded-xl hover:bg-[#e5a852] hover:text-black transition-all"
                              >
                                <ChevronRight size={20} />
                              </button>

                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {/* ADDRESSES */}
              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >

                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold">
                      Saved Addresses
                    </h1>

                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="bg-black text-[#e5a852] px-6 py-2 rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition-all"
                    >
                      Add New
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">

                    {isLoadingAddresses ? (
                      <div className="text-center py-10 w-full col-span-2">
                        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#e5a852] rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">Loading addresses...</p>
                      </div>
                    ) : addresses.length === 0 ? (
                      <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-200">
                        <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">No addresses found</h3>
                        <p className="text-slate-500 mb-6">You haven't added any delivery addresses yet.</p>
                      </div>
                    ) : (
                      addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all"
                        >

                          <div className="flex justify-between mb-4">

                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <MapPin
                                  size={18}
                                  className="text-[#e5a852]"
                                />
                                <span className="font-bold">{addr.type}</span>
                                {addr.isDefault && (
                                  <span className="bg-black text-[#e5a852] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-2">
                                    Default
                                  </span>
                                )}
                              </div>
                              <span className="font-bold text-lg mt-2">{addr.name}</span>
                              <span className="text-sm text-slate-500 font-medium">{addr.phone}</span>
                            </div>

                          </div>

                          <p className="text-slate-500 mb-6 text-sm">{addr.address}, {addr.city}, {addr.zip}</p>

                          <div className="flex gap-4 text-sm font-bold pt-4 border-t border-slate-100">
                            <button
                              onClick={() => deleteAddress(addr.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>

                        </div>
                      ))
                    )}

                  </div>
                </motion.div>
              )}

              {/* SETTINGS */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >

                  <h1 className="text-3xl md:text-4xl font-serif font-bold">
                    Account Settings
                  </h1>

                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-black/5 divide-y">

                    <div className="p-8">
                      <h3 className="font-bold mb-6 text-lg">
                        Profile Information
                      </h3>

                      <div className="grid md:grid-cols-2 gap-6">

                        <input
                          defaultValue={user.name}
                          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#e5a852]/40"
                        />

                        <input
                          defaultValue={user.email}
                          disabled
                          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-slate-100"
                        />

                        <input
                          placeholder="+1 234 567 890"
                          className="w-full border border-slate-200 rounded-lg px-4 py-2.5"
                        />

                      </div>

                      <button className="mt-6 bg-black text-[#e5a852] px-6 py-3 rounded-full font-bold hover:bg-[#e5a852] hover:text-black transition-all">
                        Save Changes
                      </button>
                    </div>


                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* ADDRESS MODAL */}
            <AnimatePresence>
              {isAddressModalOpen && (
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-2xl font-serif font-bold mb-6">Add New Address</h3>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-span-2 flex gap-4 mb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" value="Home" checked={addressForm.type === 'Home'} onChange={handleInputChange} className="accent-[#e5a852]" />
                          <span className="font-medium text-sm">Home</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" value="Work" checked={addressForm.type === 'Work'} onChange={handleInputChange} className="accent-[#e5a852]" />
                          <span className="font-medium text-sm">Work</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" value="Other" checked={addressForm.type === 'Other'} onChange={handleInputChange} className="accent-[#e5a852]" />
                          <span className="font-medium text-sm">Other</span>
                        </label>
                      </div>

                      <input
                        type="text" name="name" placeholder="Full Name *"
                        value={addressForm.name} onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-[#e5a852]/40 col-span-2"
                      />
                      <input
                        type="tel" name="phone" placeholder="Phone Number *"
                        value={addressForm.phone} onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-[#e5a852]/40 col-span-2"
                      />
                      <input
                        type="text" name="address" placeholder="Street Address *"
                        value={addressForm.address} onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-[#e5a852]/40 col-span-2"
                      />
                      <input
                        type="text" name="city" placeholder="City *"
                        value={addressForm.city} onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-[#e5a852]/40"
                      />
                      <input
                        type="text" name="zip" placeholder="ZIP Code *"
                        value={addressForm.zip} onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-slate-50 focus:ring-2 focus:ring-[#e5a852]/40"
                      />

                      <label className="col-span-2 flex items-center gap-3 cursor-pointer mt-2">
                        <input
                          type="checkbox" name="isDefault"
                          checked={addressForm.isDefault} onChange={handleInputChange}
                          className="w-4 h-4 accent-[#e5a852] rounded"
                        />
                        <span className="text-sm font-medium text-slate-700">Set as default address</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setIsAddressModalOpen(false)}
                        className="px-6 py-2.5 font-bold text-slate-500 hover:text-black transition-colors"
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;