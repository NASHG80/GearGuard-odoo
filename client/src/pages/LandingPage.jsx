
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import LoginModal from '../components/auth/LoginModal';
import { getCurrentUser } from '../services/authService';
import { ArrowRight, Shield, Zap, BarChart3, Globe, Lock, Cpu, TrendingUp, Users, CheckCircle2, Sparkles, Target, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        .from(".hero-title-word", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1
        }, "-=0.4")
        .from(".hero-desc", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.8")
        .from(".hero-stats", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
         ease: "power2.out"
        }, "-=0.4")
        .from(".hero-buttons", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4")
        .from(".floating-card", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)"
        }, "-=0.6");

      // Features Scroll Animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Uptime Increase", value: "99.2%", icon: TrendingUp },
    { label: "Active Users", value: "10k+", icon: Users },
    { label: "Cost Savings", value: "40%", icon: Target },
  ];

  return (
    <div ref={mainRef} className="min-h-screen bg-background-primary flex flex-col relative overflow-x-hidden selection:bg-accent-primary selection:text-white">

      {/* Enhanced Dynamic Background with Particles - Fixed at z-0 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Gradient Orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-background-primary to-background-primary opacity-80"></div>
        <motion.div 
          style={{ x: mousePosition.x, y: mousePosition.y }}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-accent-primary/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          style={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
          className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-accent-secondary/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        ></motion.div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>
        
        {/* Grain Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 mix-blend-overlay"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background-primary/70 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl shadow-lg shadow-accent-primary/30 flex items-center justify-center relative overflow-hidden"
            >
              <Shield className="w-6 h-6 text-white relative z-10" />
            </motion.div>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex text-text-secondary hover:text-white transition-colors"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Features
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex text-text-secondary hover:text-white transition-colors"
                  onClick={() => scrollToSection(pricingRef)}
                >
                  Pricing
                </Button>
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
      <motion.main 
        ref={heroRef} 
        style={{ opacity, scale, zIndex: 10 }}
        className="relative pt-32 pb-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <motion.div 
              className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 backdrop-blur-sm text-accent-primary text-sm font-medium mb-4 hover:scale-105 transition-transform cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              The Future of Industrial Maintenance
            </motion.div>

            <div className="hero-title overflow-hidden">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white">
                <div className="hero-title-word inline-block">Predict</div>{' '}
                <div className="hero-title-word inline-block">Failures.</div>
                <br />
                <div className="hero-title-word inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-blue-400 to-accent-secondary relative">
Maximize
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-accent-primary via-blue-400 to-accent-secondary blur-xl opacity-50"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </span>
                </div>{' '}
                <div className="hero-title-word inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-blue-400 to-accent-secondary">
                    Uptime.
                  </span>
                </div>
              </h1>
            </div>

            <p className="hero-desc text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              GearGuard utilizes advanced <span className="text-accent-primary font-semibold">AI & Machine Learning</span> to analyze equipment health in real-time,
              transforming reactive maintenance into a strategic advantage.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="hero-stats flex flex-col items-center gap-2"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-5 h-5 text-accent-primary" />
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-sm text-text-muted">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full sm:w-auto min-w-[220px] h-16 text-lg shadow-2xl shadow-accent-primary/30 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-accent-secondary"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[220px] h-16 text-lg glass-button hover:bg-white/10">
                  <Award className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="mt-32 relative" style={{ zIndex: 20 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <FloatingCard
                delay={0}
                icon={<BarChart3 className="w-8 h-8" />}
                title="Real-Time Analytics"
                description="Monitor equipment performance with live dashboards"
                color="from-blue-500 to-cyan-500"
              />
              <FloatingCard
                delay={0.2}
                icon={<Cpu className="w-8 h-8" />}
                title="AI Predictions"
                description="Predict failures before they happen with ML"
                color="from-purple-500 to-pink-500"
              />
              <FloatingCard
                delay={0.4}
                icon={<Shield className="w-8 h-8" />}
                title="Enterprise Security"
                description="Bank-grade encryption and compliance"
                color="from-emerald-500 to-teal-500"
              />
            </div>
          </div>
        </div>
      </motion.main>

      {/* Features Grid with Enhanced Visibility */}
      <section ref={featuresRef} className="relative py-32 px-6 bg-black/40 backdrop-blur-sm" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Built for Modern Industry
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to maintain your fleet, all in one beautiful interface.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedFeatureCard
              icon={<Zap className="w-10 h-10 text-yellow-400" />}
              title="Real-time Monitoring"
              description="Track every metric instantly with sub-second latency updates and live notifications."
              gradient="from-yellow-500/20 to-orange-500/20"
            />
            <EnhancedFeatureCard
              icon={<Lock className="w-10 h-10 text-green-400" />}
              title="Enterprise Security"
              description="Bank-grade encryption and role-based access control built-in from day one."
              gradient="from-green-500/20 to-emerald-500/20"
            />
            <EnhancedFeatureCard
              icon={<Globe className="w-10 h-10 text-blue-400" />}
              title="Global Connectivity"
              description="Manage assets across multiple facilities from a single unified dashboard."
              gradient="from-blue-500/20 to-cyan-500/20"
            />
            <EnhancedFeatureCard
              icon={<Cpu className="w-10 h-10 text-purple-400" />}
              title="AI Predictions"
              description="Machine learning models that predict failures before they happen with 95% accuracy."
              gradient="from-purple-500/20 to-pink-500/20"
            />
            <EnhancedFeatureCard
              icon={<BarChart3 className="w-10 h-10 text-cyan-400" />}
              title="Advanced Analytics"
              description="Deep dive into your data with customizable reports and interactive real-time charts."
              gradient="from-cyan-500/20 to-blue-500/20"
            />
            <EnhancedFeatureCard
              icon={<CheckCircle2 className="w-10 h-10 text-emerald-400" />}
              title="Compliance Ready"
              description="Automatically generate audit logs and compliance reports for all regulations."
              gradient="from-emerald-500/20 to-teal-500/20"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section with Enhanced Visibility */}
      <section ref={pricingRef} className="relative py-32 px-6 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Choose the plan that's right for your organization
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-2 border-gray-700 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-xl group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 rounded-3xl transition-all duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2">Starter</h3>
                <p className="text-gray-400 mb-6 text-lg">For small teams getting started</p>
                <div className="mb-8">
                  <span className="text-6xl font-black text-white">$49</span>
                  <span className="text-gray-400 text-xl">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    Up to 50 assets
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    Basic analytics
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    Email support
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    5 team members
                  </li>
                </ul>
                <Button variant="outline" className="w-full h-14 text-lg border-2 border-white/20 hover:border-blue-500 hover:bg-blue-500/10 text-white font-semibold">Get Started</Button>
              </div>
            </motion.div>

            {/* Pro Plan - Featured */}
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-400 transition-all duration-500 backdrop-blur-xl group scale-105 md:scale-110"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -15, scale: 1.15 }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold shadow-lg shadow-blue-500/50 border-2 border-white/20">
                  ⚡ Most Popular
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2">Professional</h3>
                <p className="text-blue-200 mb-6 text-lg">For growing organizations</p>
                <div className="mb-8">
                  <span className="text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">$149</span>
                  <span className="text-blue-200 text-xl">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white text-lg font-medium">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                    Up to 500 assets
                  </li>
                  <li className="flex items-center gap-3 text-white text-lg font-medium">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                    Advanced analytics & AI
                  </li>
                  <li className="flex items-center gap-3 text-white text-lg font-medium">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-3 text-white text-lg font-medium">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                    Unlimited team members
                  </li>
                  <li className="flex items-center gap-3 text-white text-lg font-medium">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                    Custom integrations
                  </li>
                </ul>
                <Button className="w-full h-14 text-lg shadow-xl shadow-blue-500/50 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold border-2 border-white/30">Get Started Now</Button>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-2 border-gray-700 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-xl group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -15, scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-3xl transition-all duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-gray-400 mb-6 text-lg">For large-scale operations</p>
                <div className="mb-8">
                  <span className="text-6xl font-black text-white">Custom</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    Unlimited assets
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    Full platform access
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    24/7 dedicated support
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    Custom SLAs
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    On-premise deployment
                  </li>
                </ul>
                <Button variant="outline" className="w-full h-14 text-lg border-2 border-white/20 hover:border-purple-500 hover:bg-purple-500/10 text-white font-semibold">Contact Sales</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section with Better Visibility */}
      <section className="relative py-32 px-6 bg-black/60 backdrop-blur-sm" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="relative rounded-3xl bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 border-2 border-blue-400/50 p-12 md:p-20 text-center overflow-hidden backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Ready to Transform Your Maintenance?
              </h2>
              <p className="text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
                Join thousands of companies using GearGuard to reduce downtime and maximize efficiency.
              </p>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="h-20 px-16 text-xl font-bold shadow-2xl shadow-blue-500/50 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-2 border-white/30">
                    Start Your Free Trial
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
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

// Enhanced Feature Card with 3D Tilt Effect
const EnhancedFeatureCard = ({ icon, title, description, gradient }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="feature-card relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-2 border-gray-700 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden backdrop-blur-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}></div>
      
      <div className="relative z-10">
        <motion.div 
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 group-hover:border-blue-500/50 flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed text-lg transition-colors duration-300">{description}</p>
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        style={{ transform: `translateX(${mousePosition.x * 50}px) translateY(${mousePosition.y * 50}px)` }}
      />
    </motion.div>
  );
};

const FloatingCard = ({ delay, icon, title, description, color }) => (
  <motion.div
    className="floating-card relative group"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
  >
    <motion.div
      className="relative p-8 rounded-2xl bg-background-card/50 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 h-full"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
      
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
      
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
    </motion.div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    className="feature-card p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative z-10">
      <motion.div 
        className="w-16 h-16 rounded-xl bg-background-primary border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-accent-primary/20"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default LandingPage;
