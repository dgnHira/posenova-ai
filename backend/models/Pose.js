/**
 * models/Pose.js
 * Poz şeması — Pinterest'ten çekilen veya kullanıcının eklediği pozlar.
 */
const mongoose = require('mongoose');

const PoseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Poz başlığı zorunludur.'],
    trim: true,
    maxlength: [100, 'Başlık 100 karakteri geçemez.'],
  },
  environment: {
    type: String,
    enum: ['outdoor', 'indoor', 'office', 'travel'],
    required: true,
  },
  personCount: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  intimacyLevel: {
    type: String,
    enum: ['friend', 'partner', 'family', 'colleague'],
    required: true,
  },
  silhouette: {
    type: String,
    default: 'solo_stand',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: [{ type: String, trim: true }],
  popularity: {
    type: Number,
    default: 50,
    min: 0,
    max: 100,
  },
  pinterestPinId: {
    type: String,
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
});

// ── Index: Hızlı filtreleme için ──────────────────────────
PoseSchema.index({ environment: 1, personCount: 1, intimacyLevel: 1 });
PoseSchema.index({ popularity: -1 });

module.exports = mongoose.model('Pose', PoseSchema);
