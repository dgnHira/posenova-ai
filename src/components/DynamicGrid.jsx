// DynamicGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';

const DynamicGrid = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        padding: '24px 0'
      }}
    >
      {React.Children.map(children, child => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DynamicGrid;
