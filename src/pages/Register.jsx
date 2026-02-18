import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            showToast("Passwords don't match!", 'error');
            return;
        }

        const result = register({
            name: formData.name,
            email: formData.email
        });

        if (result.success) {
            showToast('Welcome to the 7-FITZ family of modern luxury!');
            navigate('/');
        }
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 md:p-14 rounded-lg border border-secondary-100 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-serif font-bold mb-3">Create Account</h1>
                        <p className="text-secondary-500 font-medium italic">Join the Inner Circle</p>
                        <div className="w-12 h-1 bg-primary-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="input-field pl-12"
                                    placeholder="Emma Stone"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="input-field pl-12"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="input-field pl-12 pr-12"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
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

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    required
                                    className="input-field pl-12"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                            </div>
                        </div>

                        <div className="flex items-start gap-4 py-4">
                            <input type="checkbox" required className="mt-1 w-5 h-5 rounded-md border-secondary-300 text-primary-500 focus:ring-primary-500" />
                            <p className="text-xs text-secondary-500 leading-relaxed font-bold uppercase tracking-widest">
                                I agree to the <Link to="/terms" className="text-primary-500 hover:text-secondary-900 transition-colors underline">Terms</Link> and <Link to="/privacy" className="text-primary-500 hover:text-secondary-900 transition-colors underline">Privacy</Link>.
                            </p>
                        </div>

                        <button type="submit" className="w-full btn-gold h-13 text-lg uppercase tracking-widest">
                            Create Account
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-secondary-500 font-medium">
                            Already have an account? <Link to="/login" className="text-primary-500 font-black hover:text-secondary-900 transition-all uppercase tracking-widest text-[10px]">Sign In</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
