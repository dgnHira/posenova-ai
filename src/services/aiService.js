// aiService.js
// Simulates real-time AI analysis using random values.

const STYLES = ["sokak stili", "resmi", "günlük", "estetik", "nostaljik", "y2k", "minimalist"];
const MOODS = ["eğlenceli", "romantik", "ciddi", "doğal", "doğal gülümseme", "duygusal", "enerjik"];
const LIGHTING = ["Altın Saatler", "Düşük Işık", "Stüdyo", "Doğal", "Neon"];

export const analyzeFrame = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        peopleCount: Math.floor(Math.random() * 5) + 1,
        style: STYLES[Math.floor(Math.random() * STYLES.length)],
        mood: MOODS[Math.floor(Math.random() * MOODS.length)],
        lighting: LIGHTING[Math.floor(Math.random() * LIGHTING.length)],
        compositionScore: Math.floor(Math.random() * 40) + 60, // 60-100%
        colorHarmony: Math.floor(Math.random() * 30) + 70 // 70-100%
      });
    }, 2000); // 2 second simulated delay
  });
};
