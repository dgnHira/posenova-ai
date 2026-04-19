import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DynamicGrid from '../components/DynamicGrid';
import PoseCard from '../components/PoseCard';
import CustomButton from '../components/CustomButton';
import { generateSearchQuery, getMockPinterestResults } from '../services/pinterestService';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';

const PinterestGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialAnalysis = location.state?.analysis || null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Auto-fill and search from AI analysis
    const query = generateSearchQuery(initialAnalysis);
    setSearchQuery(query);
    setResults(getMockPinterestResults(query));
  }, [initialAnalysis]);

  const handleSearch = (e) => {
    e.preventDefault();
    setResults(getMockPinterestResults(searchQuery));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Top Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <CustomButton variant="secondary" onClick={() => navigate('/')} style={{ padding: '8px' }}>
          <ArrowLeft size={20} />
        </CustomButton>
        <h2 style={{ margin: 0, fontWeight: 700 }}>Stil Galerisi</h2>
      </div>

      {/* Recommended Section (If coming from AI) */}
      {initialAnalysis && (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Sparkles color="var(--color-lavender-vibrant)" size={32} />
          <div>
            <h3 style={{ margin: '0 0 4px 0' }}>Sizin İçin Yapay Zeka Önerileri</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {initialAnalysis.style} estetiğine ve ortamınıza dayalı olarak hazırlandı.
            </p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          padding: '0 16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid rgba(255,255,255,0.8)'
        }}>
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pozları, stilleri ara..."
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              padding: '16px 12px',
              fontSize: '1rem',
              outline: 'none',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        <CustomButton type="submit">Ara</CustomButton>
      </form>

      {/* Results Grid */}
      <DynamicGrid>
        {results.map(item => (
          <PoseCard key={item.id} data={item} />
        ))}
      </DynamicGrid>
    </div>
  );
};

export default PinterestGallery;
