// pinterestService.js
// Converts AI analysis into search text for mock Pinterest API.

/**
 * Generates a Pinterest search query text from AI analysis data
 * @param {Object} analysisData 
 * @returns {string} 
 */
export const generateSearchQuery = (analysisData) => {
  if (!analysisData) return "aesthetic photography pose";
  
  const { peopleCount, style, mood } = analysisData;
  const peopleText = peopleCount > 1 ? `${peopleCount} arkadaş grubu` : "tek";
  
  return `${peopleText} ${style} ${mood} poz fotoğrafçılık estetik`.trim();
};

export const getMockPinterestResults = (query) => {
  // Mock image URLs (Unsplash source for aesthetic visuals)
  const images = [
    "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80",
    "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=500&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&q=80", // Nature scene
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80"  // Animal
  ];

  const poseNames = [
    "Altın Oran Portre Pozu", "Arkadaş Kuşatması", "Sokak Modası Yürüyüşü", "Dinamik Aksiyon Duruşu",
    "Güneş Işığı Profili", "Dergi Kapağı Oturuşu", "Vintage Ayna Çekimi", "Melankolik Uzaklara Bakış",
    "Samimi Doğal Gülüş", "Kandid Grup Pozu", "Minimalist Gölgeli Profil", "Neon Şehir Işığı Pozu"
  ];

  return Array.from({ length: 24 }).map((_, i) => {
    const randomPose = poseNames[Math.floor(Math.random() * poseNames.length)];
    return {
      id: `pin-${i}`,
      url: images[i % images.length],
      title: randomPose,
      tags: [query.split(" ")[0] || "poz", randomPose.split(" ")[0].toLowerCase(), "ilham"]
    };
  });
};
