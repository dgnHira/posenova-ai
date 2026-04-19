// PoseCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PoseCard = ({ data }) => {
  return (
    <motion.div 
      className="glass-card"
      style={{
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer'
      }}
      whileHover={{ y: -8 }}
    >
      <div style={{ position: 'relative', width: '100%', paddingTop: '130%' }}>
        <img 
          src={data.url} 
          alt={data.title} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 15px 15px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          color: '#fff'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {data.title}
          </h4>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {data.tags.map(tag => (
              <span key={tag} style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PoseCard;
