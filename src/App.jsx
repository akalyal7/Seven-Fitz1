import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Homepage/Home'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const ProductDetails = lazy(() => import('./pages/Productdetails/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Wishlist = lazy(() => import('./pages/Whishlist/Wishlist'));
const Profile = lazy(() => import('./pages/Userprofile/Profile'));
const TrackOrders = lazy(() => import('./pages/Userprofile/TrackOrders'));
const Login = lazy(() => import('./pages/Userprofile/Login'));
const Register = lazy(() => import('./pages/Userprofile/Register'));
const ForgetPassword = lazy(() => import('./pages/Userprofile/ForgetPassword'));
const AccountVerification = lazy(() => import('./pages/Userprofile/AccountVerification'));
const ResetPassword = lazy(() => import('./pages/Userprofile/ResetPassword'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Returns = lazy(() => import('./pages/Returns'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-secondary-100 border-t-primary-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <ScrollToTop />
              <Layout>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/track-order/:id" element={<TrackOrders />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/verify-otp" element={<AccountVerification />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="*" element={<div className="container mx-auto px-4 py-20 text-center text-2xl font-serif">404 - Page Not Found</div>} />
                  </Routes>
                </Suspense>
              </Layout>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
