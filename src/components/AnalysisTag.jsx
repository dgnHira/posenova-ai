// AnalysisTag.jsx
import React from 'react';

const AnalysisTag = ({ label, value, status = 'info' }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'success': return 'rgba(114, 239, 189, 0.2)'; // Green tint
      case 'warning': return 'rgba(255, 209, 220, 0.4)'; // Pink tint
      default: return 'rgba(174, 226, 255, 0.3)'; // Blue tint
    }
  };

  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '20px',
    background: getStatusColor(),
    border: '1px solid rgba(255,255,255,0.5)',
    backdropFilter: 'blur(4px)',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--text-primary)',
    gap: '6px',
    margin: '4px'
  };

  return (
    <div style={styles}>
      <span style={{ opacity: 0.7 }}>{label}:</span>
      <strong>{value}</strong>
    </div>
  );
};

export default AnalysisTag;
