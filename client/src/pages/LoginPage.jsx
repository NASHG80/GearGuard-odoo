import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import { Shield, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
        .from(titleRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.5")
        .from(formRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .from(inputRefs.current, {
          x: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back, Commander.');

        // Exit animation
        gsap.to(containerRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => navigate('/dashboard')
        });
      } else {
        toast.error('Invalid credentials');
        // Shake animation on error
        gsap.to(formRef.current, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div ref={containerRef} className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10" ref={titleRef}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary mb-6 shadow-lg shadow-accent-primary/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">GearGuard</h1>
          <p className="text-text-secondary">Secure Access Terminal</p>
        </div>

        <div ref={formRef} className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
          {/* Subtle border gradient */}
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div ref={addToInputRefs} className="space-y-2">
              <label className="text-sm font-medium text-text-secondary ml-1">Email Address</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within/input:text-accent-primary transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background-primary/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-text-secondary/50 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                  placeholder="admin@gearguard.com"
                  required
                />
              </div>
            </div>

            <div ref={addToInputRefs} className="space-y-2">
              <label className="text-sm font-medium text-text-secondary ml-1">Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within/input:text-accent-primary transition-colors duration-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background-primary/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-text-secondary/50 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              ref={addToInputRefs}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/90 hover:to-accent-secondary/90 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-primary/25 flex items-center justify-center gap-2 group/btn"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center" ref={addToInputRefs}>
            <p className="text-text-secondary text-sm">
              New to the system?{' '}
              <Link to="/signup" className="text-accent-primary hover:text-accent-secondary font-medium transition-colors">
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
