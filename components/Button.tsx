import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(192,38,211,0.5)] border border-fuchsia-400/30 clip-path-polygon",
    secondary: "bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]",
    ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;