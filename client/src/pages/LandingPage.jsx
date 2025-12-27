import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Zap, Lock, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-background-primary flex flex-col relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-accent-primary rounded-lg shadow-[0_0_15px_#3B82F6] flex items-center justify-center">
            <span className="font-bold text-white">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">GearGuard</span>
        </motion.div>

        <div className="flex gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-text-secondary text-sm">
                Welcome, <span className="text-accent-primary font-medium">{user.name}</span>
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main ref={targetRef} className="relative z-10 pt-32 pb-20 px-6">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-accent-primary text-sm font-medium mb-4 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
            </span>
            The Future of Industrial Maintenance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] text-white"
          >
            Predict Failures. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-blue-400 to-accent-secondary animate-gradient-x">
              Maximize Uptime.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            GearGuard utilizes advanced AI to analyze equipment health in real-time,
            transforming reactive maintenance into a strategic advantage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg shadow-xl shadow-accent-primary/20 group">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg glass-button hover:bg-white/5">
              View Live Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="mt-24 max-w-6xl mx-auto relative perspective-1000"
        >
          <div className="relative rounded-xl border border-white/10 bg-background-card/50 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-white/10">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20"></div>
            <div className="rounded-lg bg-background-primary overflow-hidden border border-white/5 aspect-[16/9] relative flex items-center justify-center group">
              {/* Mock UI Elements */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]"></div>
              <div className="text-center space-y-4 relative z-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-accent-primary to-accent-secondary rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-accent-primary/30 animate-float">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Interactive Dashboard</h3>
                <p className="text-text-secondary">Real-time analytics at your fingertips</p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-6 bg-background-secondary/50">
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
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 group"
  >
    <div className="w-14 h-14 rounded-xl bg-background-primary border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </motion.div>
);

export default LandingPage;
