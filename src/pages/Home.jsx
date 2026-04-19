import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomButton from '../components/CustomButton';
import { Camera, Image as ImageIcon } from 'lucide-react';

const urls = [
  "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=400&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  "https://images.unsplash.com/photo-1520065786657-b71a007dd8a5?w=400&q=80",
  "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=400&q=80"
];

// 15 Adet Tam Görünen Güvenli Simetrik Dağılım
const gridPositions = [
  /* Sol Duvar (5) */
  { top: "2%", left: "1%", rotate: -5 },
  { top: "30%", left: "1%", rotate: 2 },
  { top: "60%", left: "1%", rotate: -4 },
  { top: "15%", left: "15%", rotate: 4 },
  { top: "45%", left: "15%", rotate: -3 },

  /* Sağ Duvar (5) */
  { top: "2%", right: "1%", rotate: 5 },
  { top: "30%", right: "1%", rotate: -2 },
  { top: "60%", right: "1%", rotate: 4 },
  { top: "15%", right: "15%", rotate: -4 },
  { top: "45%", right: "15%", rotate: 3 },

  /* Üst ve Alt Kısımlar (Panelin Dışında Kalanlar) (5) */
  { top: "2%", left: "32%", rotate: -2 },
  { top: "2%", right: "32%", rotate: 2 },
  { top: "65%", left: "28%", rotate: 4 },
  { top: "65%", right: "28%", rotate: -3 },
  { top: "70%", left: "45%", rotate: 5 }, // Tam alt merkeze yakın
];

const fixedFloatingImages = gridPositions.map((pos, i) => {
  const stylePos = {};
  if (pos.top) stylePos.top = pos.top;
  if (pos.left) stylePos.left = pos.left;
  if (pos.right) stylePos.right = pos.right;

  return {
    id: i,
    src: urls[i % urls.length],
    stylePos,
    width: "180px",  // Ekrana sığmaları için biraz daha dengeli
    height: "230px", // Kesilmemeleri için yükseklik optimize edildi
    rotate: pos.rotate,
    delay: i * 0.1
  };
});

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-gradient)' // Mor -> Mavi -> Pembe
    }}>
      {/* Hareketli ve Değişken Soft Işık Efektleri */}
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -50, 80, 0], scale: [1, 1.4, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '0%', left: '-10%', width: '50vw', height: '50vw', backgroundColor: "#7209b7", borderRadius: '50%', filter: 'blur(150px)', opacity: 0.6, zIndex: 0 }}
      />
      <motion.div
        animate={{ x: [0, -100, 50, 0], y: [0, 100, -80, 0], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '0%', right: '-10%', width: '50vw', height: '50vw', backgroundColor: "#4cc9f0", borderRadius: '50%', filter: 'blur(150px)', opacity: 0.6, zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.6, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '25%', left: '25%', width: '50vw', height: '50vw', backgroundColor: "#ff0a54", borderRadius: '50%', filter: 'blur(180px)', opacity: 0.4, zIndex: 0 }}
      />

      {/* Yüzen 30 Adet Estetik Fotoğraf */}
      {fixedFloatingImages.map((img) => (
        <motion.img
          key={img.id}
          src={img.src}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.5, delay: img.delay, type: 'spring' }}
          whileHover={{ scale: 1.15, opacity: 1, zIndex: 60, boxShadow: '0 25px 50px rgba(0,0,0,0.6)' }}
          style={{
            position: 'absolute',
            ...img.stylePos,
            width: img.width,
            height: img.height,
            objectFit: 'cover',
            borderRadius: '16px',
            border: '3px solid rgba(255,255,255,0.7)',
            transform: `rotate(${img.rotate}deg)`,
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            zIndex: 5, /* Blurlu arkadan öne alalım */
            cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><text y=\"24\" font-size=\"24\">🌟</text></svg>') 16 16, pointer"
          }}
        />
      ))}

      {/* Ana İçerik - Gelişmiş Glassmorphism */}
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        style={{
          padding: '60px 40px',
          textAlign: 'center',
          maxWidth: '650px',
          width: '90%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          background: 'rgba(255, 255, 255, 0.25)', // Çok ince, daha yumuşak cam
          backdropFilter: 'blur(32px)', // Yumuşak ışık geçişi için yüksek blur
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderTop: '1px solid rgba(255, 255, 255, 0.8)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.2)',
          borderRadius: '30px'
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #7209b7, #4cc9f0, #ff0a54)',
            padding: '28px',
            borderRadius: '50%',
            boxShadow: '0 10px 40px rgba(114, 9, 183, 0.6)' 
          }}>
            <Camera size={80} color="#fff" />
          </div>
        </motion.div>
        
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, margin: 0, color: '#fff', textShadow: '0 5px 20px rgba(0,0,0,0.3)', letterSpacing: '-2px' }}>
          PoseNova <span style={{ color: '#4cc9f0', textShadow: '0 4px 15px rgba(76, 201, 240, 0.6)' }}>AI</span>
        </h1>
        
        <p style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 700, lineHeight: 1.6, textShadow: '0 2px 10px rgba(0,0,0,0.4)', margin: '10px 0' }}>
          Yapay Zeka Destekli Poz Yönetmeni
        </p>

        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <CustomButton 
            onClick={() => navigate('/camera')}
            className="glitter-btn" // Simli Buton CSS Sınıfı
            icon={<Camera size={24} />}
            style={{ padding: '18px 40px', fontSize: '1.2rem', borderRadius: '50px', flex: 1, minWidth: '250px' }}
          >
            Kamerayı Başlat
          </CustomButton>
          <CustomButton 
            variant="secondary"
            onClick={() => navigate('/gallery')}
            icon={<ImageIcon size={24} />}
            style={{ padding: '18px 40px', fontSize: '1.2rem', borderRadius: '50px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', flex: 1, minWidth: '250px' }}
          >
            Stilleri Keşfet
          </CustomButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
