import { motion } from 'framer-motion';

const variants = {
  primary: "bg-accent-primary hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  secondary: "bg-background-card hover:bg-gray-800 text-text-primary border border-border",
  outline: "bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary/10",
  danger: "bg-accent-danger hover:bg-red-600 text-white"
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-lg transition-all duration-200 flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
