/**
 * server.js
 * PoseGuide Backend — Ana giriş noktası.
 * Çalıştırmak için: node server.js (veya npm run dev)
 */
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const connectDB  = require('./config/db');
const apiRoutes  = require('./routes/apiRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Veritabanı Bağlantısı ──────────────────────────────────
connectDB();

// ── Güvenlik & Middleware ──────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Request Logger (Development) ───────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toLocaleTimeString('tr-TR')}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ── API Rotaları ───────────────────────────────────────────
app.use('/api', apiRoutes);

// ── 404 Handler ───────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, message: `${req.originalUrl} bulunamadı.` })
);

// ── Global Error Handler ───────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Sunucu hatası.' : err.message,
  });
});

// ── Sunucuyu Başlat ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 PoseGuide Backend çalışıyor!`);
  console.log(`   → http://localhost:${PORT}/api/health\n`);
});
