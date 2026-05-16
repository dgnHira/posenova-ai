/**
 * controllers/poseController.js
 * Poz CRUD ve filtreleme işlemleri.
 */
const Pose = require('../models/Pose');

/**
 * GET /api/poses
 * Filtrelere göre poz listesi döndürür.
 * Query: environment, personCount, intimacyLevel
 */
exports.getFilteredPoses = async (req, res) => {
  try {
    const { environment, personCount, intimacyLevel } = req.query;
    const filter = {};

    if (environment)   filter.environment   = environment;
    if (personCount)   filter.personCount   = parseInt(personCount, 10);
    if (intimacyLevel) filter.intimacyLevel = intimacyLevel;

    const poses = await Pose.find(filter)
      .sort({ popularity: -1 })
      .limit(20)
      .lean();

    res.json({ success: true, count: poses.length, data: poses });
  } catch (err) {
    console.error('[PoseController] getFilteredPoses:', err);
    res.status(500).json({ success: false, message: 'Sunucu hatası.' });
  }
};

/**
 * GET /api/poses/all
 * Tüm pozları listeler (galeri için).
 */
exports.getAllPoses = async (req, res) => {
  try {
    const poses = await Pose.find().sort({ popularity: -1 }).limit(50).lean();
    res.json({ success: true, count: poses.length, data: poses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Sunucu hatası.' });
  }
};

/**
 * GET /api/poses/:id
 * Tek bir poz detayı.
 */
exports.getPoseById = async (req, res) => {
  try {
    const pose = await Pose.findById(req.params.id).lean();
    if (!pose) return res.status(404).json({ success: false, message: 'Poz bulunamadı.' });
    res.json({ success: true, data: pose });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Sunucu hatası.' });
  }
};

/**
 * POST /api/poses/favorite
 * Kullanıcının favori listesine poz ekler.
 */
exports.saveFavorite = async (req, res) => {
  try {
    const { poseId } = req.body;
    if (!poseId) return res.status(400).json({ success: false, message: 'poseId zorunludur.' });
    // Gerçek uygulamada: req.user._id ile User'ı güncelle
    res.json({ success: true, message: 'Favoriye eklendi.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Sunucu hatası.' });
  }
};
