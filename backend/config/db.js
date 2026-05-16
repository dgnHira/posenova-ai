/**
 * config/db.js
 * MongoDB bağlantı yöneticisi (Mongoose).
 */
const mongoose = require('mongoose');

/**
 * MongoDB'ye bağlanır. Bağlantı başarısız olursa süreci sonlandırır.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Bağlandı: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Bağlantı Hatası: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
