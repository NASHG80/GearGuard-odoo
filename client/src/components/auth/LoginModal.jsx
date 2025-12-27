import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { login, register } from '../../services/authService';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form states
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Requester'
    });

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(loginData.email, loginData.password);

            if (result.success) {
                onLoginSuccess?.(result.user);
                onClose();
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (signupData.password !== signupData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (signupData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            const { confirmPassword, ...registerData } = signupData;
            const result = await register(registerData);

            if (result.success) {
                onLoginSuccess?.(result.user);
                onClose();
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-background-secondary border border-border rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-background-primary transition-colors"
                    >
                        <X className="w-5 h-5 text-text-secondary" />
                    </button>

                    {/* Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-accent-primary rounded-lg shadow-[0_0_15px_#3B82F6] flex items-center justify-center">
                                <span className="font-bold text-white text-lg">G</span>
                            </div>
                            <span className="text-2xl font-bold text-white">GearGuard</span>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 bg-background-primary rounded-lg p-1">
                            <button
                                onClick={() => { setActiveTab('login'); setError(''); }}
                                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${activeTab === 'login'
                                        ? 'bg-accent-primary text-white shadow-lg'
                                        : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => { setActiveTab('signup'); setError(''); }}
                                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${activeTab === 'signup'
                                        ? 'bg-accent-primary text-white shadow-lg'
                                        : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mx-6 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2"
                        >
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-500">{error}</p>
                        </motion.div>
                    )}

                    {/* Forms */}
                    <div className="px-6 pb-6">
                        {activeTab === 'login' ? (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="email"
                                            required
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-background-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="password"
                                            required
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-background-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Log In'}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="text"
                                            required
                                            value={signupData.name}
                                            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-background-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="email"
                                            required
                                            value={signupData.email}
                                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-background-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Role
                                    </label>
                                    <select
                                        value={signupData.role}
                                        onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                                        className="w-full px-4 py-3 bg-background-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                                    >
                                        <option value="Requester">Requester</option>
                                        <option value="Technician">Technician</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="password"
                                            required
                                            value={signupData.password}
                                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-background-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="password"
                                            required
                                            value={signupData.confirmPassword}
                                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-background-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating account...' : 'Sign Up'}
                                </Button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LoginModal;
