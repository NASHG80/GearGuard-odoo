import { motion } from 'framer-motion';

const variants = {
  primary: "bg-accent-primary hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-accent-primary/50",
  secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm",
  outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40",
  ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/5",
  danger: "bg-accent-danger hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg font-semibold"
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </motion.button>
  );
};

export default Button;
