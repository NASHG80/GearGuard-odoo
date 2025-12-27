import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowRight, Shield, Zap, BarChart3, Globe, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-background-primary flex flex-col relative overflow-x-hidden selection:bg-accent-primary selection:text-white">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background-primary to-background-primary opacity-80"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-secondary/10 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background-primary/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl shadow-lg shadow-accent-primary/20 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Shield className="w-6 h-6 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">GearGuard</span>
          </motion.div>

          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex text-text-secondary hover:text-white">Features</Button>
            <Button variant="ghost" size="sm" className="hidden md:flex text-text-secondary hover:text-white">Pricing</Button>
            {user ? (
              <Button
                variant="primary"
                size="sm"
                className="shadow-lg shadow-accent-primary/25"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="glass-button"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="shadow-lg shadow-accent-primary/25"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

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
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-14 text-lg shadow-xl shadow-accent-primary/20 group"
              onClick={() => navigate(user ? '/dashboard' : '/signup')}
            >
              {user ? 'Go to Dashboard' : 'Get Started Now'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-14 text-lg glass-button hover:bg-white/5"
            >
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

        {/* Features Grid */}
        <section className="relative z-10 py-32 px-6">
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
      </main>
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
