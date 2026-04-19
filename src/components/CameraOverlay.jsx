// CameraOverlay.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AnalysisTag from './AnalysisTag';
import { Focus, Scan } from 'lucide-react';

const CameraOverlay = ({ analysisData, isAnalyzing }) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px',
      overflow: 'hidden'
    }}>
      {/* Rule of Thirds Grid */}
      <div style={{
        position: 'absolute',
        inset: '10%',
        border: '1px solid rgba(255,255,255,0.2)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
      }}>
        {[...Array(9)].map((_, i) => (
          <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
        ))}
      </div>

      {/* Scanning Animation */}
      {isAnalyzing && (
        <motion.div
          animate={{ y: ['0%', '800%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'var(--color-pink-vibrant)',
            boxShadow: '0 0 10px var(--color-pink-vibrant)',
            zIndex: 10
          }}
        />
      )}

      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scan size={20} color="var(--color-pink-vibrant)" />
          <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
            {isAnalyzing ? 'Sahne Analiz Ediliyor...' : 'Analiz Tamamlandı'}
          </span>
        </div>
      </div>

      {/* Bottom Panel (Data) */}
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}
      >
        {!analysisData && !isAnalyzing && (
          <div style={{ opacity: 0.7 }}>Kare analizi bekleniyor...</div>
        )}
        
        {analysisData && (
          <>
            <AnalysisTag label="Kişi Sayısı" value={analysisData.peopleCount} />
            <AnalysisTag label="Algılanan Stil" value={analysisData.style} status="success" />
            <AnalysisTag label="Işık" value={analysisData.lighting} />
            <AnalysisTag label="Duygu" value={analysisData.mood} />
            <AnalysisTag 
              label="Kompozisyon" 
              value={`${analysisData.compositionScore}%`} 
              status={analysisData.compositionScore > 80 ? 'success' : 'warning'} 
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CameraOverlay;
