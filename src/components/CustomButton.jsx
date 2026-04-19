// CustomButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CustomButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon,
  className = ''
}) => {
  const baseStyle = {
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
    outline: 'none',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-pink-vibrant), var(--color-lavender-vibrant))',
      boxShadow: '0 4px 15px rgba(255, 143, 163, 0.4)'
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'var(--text-primary)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.5)'
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ ...baseStyle, ...variants[variant] }}
      onClick={onClick}
      className={className}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default CustomButton;
