import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Requester');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long');
      return;
    }

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      toast.error('Please enter a password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!confirmPassword.trim()) {
      toast.error('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await signup(name.trim(), email.trim(), password, role);
    
    if (result.success) {
      toast.success('Account created successfully! Welcome to GearGuard.');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Signup failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-xl">G</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              GearGuard
            </span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Create Account</h1>
          <p className="text-text-secondary">Join us to streamline your maintenance</p>
        </div>

        <div className="bg-background-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
              >
                <option value="Requester">Requester</option>
                <option value="Technician">Technician</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
