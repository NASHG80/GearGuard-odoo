
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import LoginModal from '../components/auth/LoginModal';
import { getCurrentUser } from '../services/authService';
import { ArrowRight, Shield, Zap, BarChart3, Globe, Lock, Cpu, TrendingUp, Users, CheckCircle2, Sparkles, Target, Award, PlayCircle, Monitor } from 'lucide-react';
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
  const howItWorksRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const { scrollYProgress } = useScroll();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin horizontal scroll section
      const sections = gsap.utils.toArray('.horizontal-section');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-container",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          invalidateOnRefresh: true,
          end: "+=3000",
        }
      });

      // Hero headline staggering
      gsap.from(".hero-char", {
        y: 100,
        opacity: 0,
        rotationZ: 10,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-background-primary flex flex-col relative overflow-x-hidden font-sans selection:bg-accent-primary/30 selection:text-white">

      {/* Organic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-accent-primary/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-accent-secondary/5 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background-primary/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-accent-primary/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">GearGuard</span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Product', 'Solutions', 'Pricing', 'Resources'].map((item) => (
              <a key={item} href="#" className="text-text-secondary hover:text-white text-sm font-medium transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex gap-4 items-center">
            {user ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-white hover:bg-white/5"
                >
                  Log In
                </Button>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 z-10 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary text-sm backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
            The Standard in Industrial Intelligence
          </motion.div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.1] text-center relative z-10 flex flex-col items-center">
            <span className="block hero-line">
              {"Maintenance".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block">{char === " " ? "\u00A0" : char}</span>
              ))}
            </span>
            <span className="block hero-line text-accent-primary pb-2">
              {"Reimagined".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block">{char === " " ? "\u00A0" : char}</span>
              ))}
            </span>
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed"
          >
            Predict equipment failures before they happen. Streamline your operations with intelligence at the core.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link to="/signup">
              <Button size="lg" className="px-8 h-14 text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] border border-blue-400/30">
                Start for free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm group">
              <PlayCircle className="w-10 h-10 text-white fill-white/10 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Watch Demo</p>
                <p className="text-xs text-text-muted">2 min walkthrough</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Horizontal Scroll Features - Desktop Only */}
      <section className="horizontal-container relative h-screen bg-background-primary z-40 overflow-hidden hidden md:block">
        <div className="flex h-full w-[400vw] flex-nowrap"> {/* Width = 100vw * number of sections */}

          {/* Intro Slide */}
          <div className="horizontal-section w-screen h-full flex flex-col justify-center px-12 md:px-32 border-r border-white/5 flex-shrink-0">
            <span className="text-accent-primary font-mono mb-4 text-xl">01 / ANALYTICS</span>
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-8">Data that <br /><span className="text-text-muted">speaks volumes.</span></h2>
          </div>

          {/* Feature 1 */}
          <div className="horizontal-section w-screen h-full flex items-center justify-center p-12 bg-gradient-to-br from-background-primary to-background-secondary/30 flex-shrink-0">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-5xl font-bold text-white">Advanced Reporting</h3>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Gain complete visibility into your maintenance operations. Track Key Performance Indicators (KPIs) like OEE, MTBF, and MTTR in real-time.
                </p>
                <ul className="space-y-4">
                  {['OEE & Efficiency Tracking', 'Maintenance Cost Analysis', 'Downtime Reporting'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117] group">
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                  alt="Analytics Dashboard"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="horizontal-section w-screen h-full flex items-center justify-center p-12 bg-gradient-to-br from-background-primary to-background-secondary/30 flex-shrink-0">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117] group">
                <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2539&auto=format&fit=crop"
                  alt="Kanban Board"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="order-1 md:order-2 space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-5xl font-bold text-white">Kanban Workflow</h3>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Streamline your maintenance requests with our intuitive Kanban board. Visualize workload, prioritize tasks, and move requests from backlog to completion effortlessly.
                </p>
                <ul className="space-y-4">
                  {['Drag-and-Drop Interface', 'Real-time Status Updates', 'Maintenance Request Tracking'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="horizontal-section w-screen h-full flex items-center justify-center p-12 bg-gradient-to-br from-background-primary to-background-secondary/30 flex-shrink-0">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-5xl font-bold text-white">Asset Management</h3>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Organize your factory floor with precision. Manage Work Centers and Equipment with detailed profiles, hierarchical linking, and capacity planning.
                </p>
                <ul className="space-y-4">
                  {['Work Center Hierarchy', 'Equipment Capacity Planning', 'Lifecycle Tracking'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117] group">
                <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop"
                  alt="Industrial Equipment"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Mobile Features (Vertical Stack) */}
      <section className="py-20 px-6 block md:hidden space-y-20 z-10 relative">
        <div className="text-center mb-12">
          <span className="text-accent-primary font-mono text-sm">FEATURES</span>
          <h2 className="text-4xl font-bold text-white mt-4">Powerful Capabilities</h2>
        </div>

        {/* Feature 1 Mobile */}
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold text-white">Real-time Insights</h3>
          <p className="text-text-secondary">Monitor every heartbeat with sub-millisecond updates.</p>
          <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-xs text-text-muted">Dashboard UI</div>
          </div>
        </div>

        {/* Feature 2 Mobile */}
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-bold text-white">Predictive AI</h3>
          <p className="text-text-secondary">Predict failures weeks in advance with 94% accuracy.</p>
          <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-xs text-text-muted">AI Model UI</div>
          </div>
        </div>

        {/* Feature 3 Mobile */}
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-3xl font-bold text-white">Enterprise Grade</h3>
          <p className="text-text-secondary">ISO 27001 and SOC 2 Type II certified security.</p>
          <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-xs text-text-muted">Security Shield</div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-32 px-6 z-10 bg-background-primary relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-accent-primary font-medium tracking-wide text-sm uppercase">Why GearGuard</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">Built for scale. Designed for speed.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
            {/* Large Card 1 */}
            <div className="col-span-1 md:col-span-2 row-span-1 relative rounded-3xl bg-white/5 border border-white/5 p-8 overflow-hidden hover:bg-white/[0.07] transition-colors group">
              <div className="relative z-10 max-w-md">
                <Globe className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Global Operations</h3>
                <p className="text-text-secondary">Manage fleets across continents from a single pane of glass.</p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
            </div>

            {/* Standard Card 2 */}
            <div className="col-span-1 row-span-1 rounded-3xl bg-white/5 border border-white/5 p-8 hover:bg-white/[0.07] transition-colors">
              <Zap className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Instant Setup</h3>
              <p className="text-text-secondary">Deploy in minutes, not months. Plug-and-play sensors integration.</p>
            </div>

            {/* Tall Card 3 */}
            <div className="col-span-1 md:row-span-2 rounded-3xl bg-white/5 border border-white/5 p-8 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" alt="Control Center" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-md border border-white/10">
                  <Monitor className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Central Command</h3>
                <p className="text-text-secondary">Complete oversight of your entire operation from a single, powerful desktop interface.</p>
              </div>
            </div>

            {/* Standard Card 4 */}
            <div className="col-span-1 md:col-span-2 rounded-3xl bg-white/5 border border-white/5 p-8 flex items-center justify-between hover:bg-white/[0.07] transition-colors">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Extensible API</h3>
                <p className="text-text-secondary">Connect with ERP, CMMS, and SCADA systems seamlessly.</p>
              </div>
              <div className="w-32 h-12 bg-black/50 rounded-lg flex items-center justify-center text-xs font-mono text-green-400 border border-white/10">
                API Status: OK
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Pricing */}
      <section ref={pricingRef} className="py-32 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple pricing</h2>
          <p className="text-text-secondary mb-16 max-w-xl mx-auto">Start small and scale as you grow. No hidden fees.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {['Starter', 'Professional', 'Enterprise'].map((plan, i) => (
              <div key={plan} className={`relative p-8 rounded-3xl border ${i === 1 ? 'border-accent-primary bg-accent-primary/5' : 'border-white/10 bg-white/5'} flex flex-col`}>
                <h3 className="text-xl font-bold text-white mb-2">{plan}</h3>
                <div className="text-3xl font-bold text-white mb-6 flex items-baseline gap-1">
                  {i === 2 ? (
                    'Custom'
                  ) : (
                    <>
                      <span className="text-lg">₹</span>
                      {i === 0 ? '999' : '3,999'}
                    </>
                  )}
                  <span className="text-sm font-normal text-text-muted">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[1, 2, 3, 4].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-accent-primary" /> Feature {f}
                    </li>
                  ))}
                </ul>
                <Button variant={i === 1 ? 'primary' : 'outline'} className="w-full">Choose {plan}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black/40 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-text-muted text-sm">© 2024 GearGuard Inc.</div>
          <div className="flex gap-8">
            {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
              <a key={social} href="#" className="text-text-muted hover:text-white transition-colors text-sm">{social}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default LandingPage;
