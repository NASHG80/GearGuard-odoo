
import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import LoginModal from '../components/auth/LoginModal';
import { getCurrentUser } from '../services/authService';
import { ArrowRight, Shield, Zap, BarChart3, Globe, Lock, Cpu } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Redirect to dashboard after successful login
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation Timeline
      const tl = gsap.timeline();

      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
        .from(".hero-title", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1
        }, "-=0.4")
        .from(".hero-desc", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .from(".hero-buttons", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4")
        .from(".hero-dashboard", {
          y: 100,
          opacity: 0,
          rotateX: 15,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.6");

      // Features Scroll Animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-background-primary flex flex-col relative overflow-x-hidden selection:bg-accent-primary selection:text-white">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-background-primary to-background-primary opacity-80"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-accent-primary/10 rounded-full blur-[150px] animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-accent-secondary/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background-primary/70 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl shadow-lg shadow-accent-primary/20 flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Shield className="w-6 h-6 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-accent-primary transition-colors">GearGuard</span>
          </motion.div>

          <div className="flex gap-4 items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-text-secondary text-sm hidden md:inline">
                  Welcome, <span className="text-accent-primary font-medium">{user.name}</span>
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/40 transition-shadow"
                >
                  Go to Dashboard
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hidden md:flex text-text-secondary hover:text-white transition-colors">Features</Button>
                <Button variant="ghost" size="sm" className="hidden md:flex text-text-secondary hover:text-white transition-colors">Pricing</Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="glass-button"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Link to="/signup">
                  <Button variant="primary" size="sm" className="shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/40 transition-shadow">Book Demo</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main ref={heroRef} className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-accent-primary text-sm font-medium mb-4 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
            </span>
            The Future of Industrial Maintenance
          </div>

          <h1 className="hero-title text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] text-white">
            Predict Failures. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-blue-400 to-accent-secondary animate-gradient-x">
              Maximize Uptime.
            </span>
          </h1>

          <p className="hero-desc text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            GearGuard utilizes advanced AI to analyze equipment health in real-time,
            transforming reactive maintenance into a strategic advantage.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg shadow-xl shadow-accent-primary/20 group hover:scale-105 transition-transform duration-300">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg glass-button hover:bg-white/5 hover:scale-105 transition-transform duration-300">
              View Live Demo
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="hero-dashboard mt-24 max-w-6xl mx-auto relative perspective-1000">
          <div className="relative rounded-xl border border-white/10 bg-background-card/50 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-white/10 transform transition-transform duration-500 hover:rotate-x-0 hover:scale-[1.01]">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20 animate-pulse-glow"></div>
            <div className="rounded-lg bg-background-primary overflow-hidden border border-white/5 aspect-[16/9] relative flex items-center justify-center group">
              {/* Mock UI Elements */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
              <div className="text-center space-y-4 relative z-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-accent-primary to-accent-secondary rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-accent-primary/30 animate-float">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Interactive Dashboard</h3>
                <p className="text-text-secondary">Real-time analytics at your fingertips</p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section ref={featuresRef} className="relative z-10 py-32 px-6 bg-background-secondary/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for Modern Industry</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">Everything you need to maintain your fleet, all in one beautiful interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-accent-warning" />}
              title="Real-time Monitoring"
              description="Track every metric instantly with sub-second latency updates."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8 text-accent-success" />}
              title="Enterprise Security"
              description="Bank-grade encryption and role-based access control built-in."
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-accent-primary" />}
              title="Global Connectivity"
              description="Manage assets across multiple facilities from a single dashboard."
            />
            <FeatureCard
              icon={<Cpu className="w-8 h-8 text-accent-secondary" />}
              title="AI Predictions"
              description="Machine learning models that predict failures before they happen."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-blue-400" />}
              title="Advanced Analytics"
              description="Deep dive into your data with customizable reports and charts."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-emerald-400" />}
              title="Compliance Ready"
              description="Automatically generate audit logs and compliance reports."
            />
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2">
    <div className="w-14 h-14 rounded-xl bg-background-primary border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-accent-primary/10">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
