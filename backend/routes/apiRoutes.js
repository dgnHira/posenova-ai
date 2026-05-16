/**
 * routes/apiRoutes.js
 * Tüm API endpoint'lerini tek noktadan tanımlar.
 */
const express  = require('express');
const router   = express.Router();

const poseCtrl   = require('../controllers/poseController');
const filterCtrl = require('../controllers/filterController');

// ── Poz endpoint'leri ──────────────────────────────────────
// GET  /api/poses?environment=outdoor&personCount=2&intimacyLevel=partner
router.get('/poses',          poseCtrl.getFilteredPoses);
// GET  /api/poses/all
router.get('/poses/all',      poseCtrl.getAllPoses);
// GET  /api/poses/:id
router.get('/poses/:id',      poseCtrl.getPoseById);
// POST /api/poses/favorite
router.post('/poses/favorite', poseCtrl.saveFavorite);

// ── Filtre / Zekâ motoru endpoint'leri ────────────────────
// POST /api/filters/analyze
router.post('/filters/analyze',  filterCtrl.analyzeAndRecommend);
// GET  /api/filters/options
router.get('/filters/options',   filterCtrl.getFilterOptions);

// ── Pinterest kolaj endpoint'i ─────────────────────────────
// (Gerçek Pinterest API entegrasyonu için genişletilebilir)
router.get('/pinterest/collage', (req, res) => {
  const themes = ['animals','nature','camera','people','art','fashion','travel','food','architecture','sport'];
  const pins = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/seed/${themes[i % themes.length]}${i}/300/${280 + (i % 4) * 60}`,
    tag: themes[i % themes.length],
  }));
  res.json({ success: true, data: pins });
});

// ── Health check ───────────────────────────────────────────
router.get('/health', (req, res) =>
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
);

module.exports = router;
