/**
 * models/User.js
 * Kullanıcı profili şeması.
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim zorunludur.'],
    trim: true,
    maxlength: 60,
  },
  email: {
    type: String,
    required: [true, 'E-posta zorunludur.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Geçerli bir e-posta adresi girin.'],
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pose',
  }],
  pinterestToken: {
    type: String,
    default: null,
    select: false, // API yanıtlarında gizle
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
