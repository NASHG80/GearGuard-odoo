import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import LoginModal from '../components/auth/LoginModal';
import { getCurrentUser } from '../services/authService';

const LandingPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Redirect to dashboard after successful login
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

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
                onClick={() => setIsLoginModalOpen(true)}
              >
                Log In
              </Button>
              <Button variant="primary" size="sm">Book Demo</Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 md:px-6 mt-[-60px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
            </span>
            Enterprise Maintenance Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white mb-6">
            Stop managing breakdowns. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-blue-400">
              Start predicting them.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            GearGuard isn't just a maintenance log. It's an intelligent platform that tells you
            which machines are silently becoming expensive mistakes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
              View Live Demo
            </Button>
          </div>
        </motion.div>

        {/* Floating UI Elements Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 w-full max-w-5xl relative"
        >
          <div className="rounded-xl border border-border bg-background-secondary/50 backdrop-blur-sm p-2 shadow-2xl">
            <div className="rounded-lg bg-background-primary overflow-hidden border border-border/50 aspect-video relative flex items-center justify-center text-text-muted">
              {/* Placeholder for Dashboard Image/Component */}
              <div className="text-center space-y-2">
                <div className="text-4xl">📊</div>
                <p>Interactive Dashboard Preview</p>
                <p className="text-sm">(Will be replaced with live components)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

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
