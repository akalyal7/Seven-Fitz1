import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (result.success) {
            showToast('Welcome back to the world of 7-FITZ!');
            navigate('/');
        }
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 md:p-14 rounded-[3rem] border border-secondary-100 shadow-2xl"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif font-bold mb-3">Welcome Back</h1>
                        <p className="text-secondary-500 font-medium italic">Experience Modern Luxury</p>
                        <div className="w-12 h-1 bg-primary-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    className="input-field pl-12"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Password</label>
                                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:text-secondary-900 transition-colors">Forgot Password?</button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="input-field pl-12 pr-12"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-gold h-16 text-lg uppercase tracking-widest">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-secondary-100"></div></div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-secondary-400">
                                <span className="bg-white px-4 italic">Social Login</span>
                            </div>
                        </div>

                        <p className="text-secondary-500 font-medium">
                            Don't have an account? <Link to="/register" className="text-primary-500 font-black hover:text-secondary-900 transition-all uppercase tracking-widest text-[10px]">Register Now</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
