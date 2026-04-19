import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CameraOverlay from '../components/CameraOverlay';
import CustomButton from '../components/CustomButton';
import { analyzeFrame } from '../services/aiService';
import { ArrowLeft, Aperture } from 'lucide-react';

const CameraStudio = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisData(null);
    
    try {
      const result = await analyzeFrame();
      setAnalysisData(result);
      setIsAnalyzing(false);
      
      // Auto redirect to gallery after 3 seconds showing results
      setTimeout(() => {
        navigate('/gallery', { state: { analysis: result } });
      }, 3000);
      
    } catch (e) {
      console.error(e);
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
      {/* Header */}
      <div style={{ 
        padding: '16px 24px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        position: 'relative'
      }}>
        <CustomButton variant="secondary" onClick={() => navigate(-1)} style={{ padding: '8px' }}>
          <ArrowLeft size={20} color="#fff" />
        </CustomButton>
        <h2 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>Yapay Zeka Stüdyo Modu</h2>
      </div>

      {/* Main Camera Area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Fake Camera Feed Component */}
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'url("https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=1200&q=80")', // Example aesthetic background
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isAnalyzing ? 'blur(2px) brightness(0.8)' : 'none',
          transition: 'all 0.5s ease'
        }} />

        {/* Ghost Pose Layer */}
        {!isAnalyzing && !analysisData && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.3,
            pointerEvents: 'none'
          }}>
            <svg width="200" height="400" viewBox="0 0 100 200" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="50" cy="30" r="20" />
              <line x1="50" y1="50" x2="50" y2="120" />
              <line x1="50" y1="70" x2="20" y2="100" />
              <line x1="50" y1="70" x2="80" y2="40" />
              <line x1="50" y1="120" x2="30" y2="180" />
              <line x1="50" y1="120" x2="70" y2="180" />
            </svg>
          </div>
        )}

        <CameraOverlay isAnalyzing={isAnalyzing} analysisData={analysisData} />

        {/* Action Button */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20
        }}>
          {!analysisData && (
            <motion.button
              className="glitter-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startAnalysis}
              disabled={isAnalyzing}
              style={{
                width: '85px',
                height: '85px',
                borderRadius: '50%',
                border: '4px solid rgba(255,255,255,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 0 25px rgba(247, 37, 133, 0.8)'
              }}
            >
              {isAnalyzing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <Aperture color="#fff" size={36} />
                </motion.div>
              ) : (
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' }} />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraStudio;
