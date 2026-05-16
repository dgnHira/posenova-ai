/**
 * controllers/filterController.js
 * Zekâ motoru: Ortam + kişi sayısı + samimiyet seviyesini analiz ederek
 * Pinterest'ten en uygun pozları seçer.
 */
const Pose = require('../models/Pose');

/**
 * POST /api/filters/analyze
 * Kullanıcının seçimlerini analiz edip ağırlıklı skor hesaplar.
 * Body: { environment, personCount, intimacyLevel }
 */
exports.analyzeAndRecommend = async (req, res) => {
  try {
    const { environment, personCount, intimacyLevel } = req.body;

    // ── Ağırlık mantığı ────────────────────────────────────
    // Her kriterin tam eşleşmesi: 3 puan, kısmi eşleşme: 1 puan
    const allPoses = await Pose.find().lean();

    const scored = allPoses.map(pose => {
      let score = pose.popularity / 10; // Temel skor
      if (pose.environment   === environment)   score += 30;
      if (pose.personCount   == personCount)    score += 30;
      if (pose.intimacyLevel === intimacyLevel) score += 25;
      return { ...pose, _score: score };
    });

    const recommendations = scored
      .sort((a, b) => b._score - a._score)
      .slice(0, 12)
      .map(({ _score, ...pose }) => pose); // _score'u yanıttan çıkar

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      meta: { environment, personCount, intimacyLevel },
    });
  } catch (err) {
    console.error('[FilterController] analyzeAndRecommend:', err);
    res.status(500).json({ success: false, message: 'Analiz sırasında hata oluştu.' });
  }
};

/**
 * GET /api/filters/options
 * Frontend'e filtre seçeneklerini döndürür (enum değerleri).
 */
exports.getFilterOptions = (req, res) => {
  res.json({
    success: true,
    data: {
      environments:   ['outdoor', 'indoor', 'office', 'travel'],
      intimacyLevels: ['friend', 'partner', 'family', 'colleague'],
      personCounts:   [1, 2, 3, 4],
    },
  });
};
