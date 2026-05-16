/**
 * components/PoseCard.js
 * Bireysel poz kartı bileşeni.
 */
export function PoseCard({ pose, onSelect, onFavorite }) {
  const card = document.createElement('div');
  card.className = 'pose-card';
  card.dataset.poseId = pose.id;

  const tagHTML = (pose.tags || []).map(t => `<span class="badge badge-red">#${t}</span>`).join('');
  const stars = Math.round((pose.popularity / 100) * 5);
  const starHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < stars ? 'var(--sun-yellow)' : 'var(--text-muted)'}">★</span>`
  ).join('');

  card.innerHTML = `
    <div class="pose-img-wrap">
      <img
        src="${pose.imageUrl}"
        alt="${pose.title}"
        loading="lazy"
        onerror="this.src='https://picsum.photos/seed/error${pose.id}/400/530'"
      />
      <div class="pose-btn-overlay">
        <button class="btn btn-primary btn-sm fav-btn" title="Favoriye Ekle">♡ Kaydet</button>
      </div>
      <div style="position:absolute;top:10px;left:10px;">
        <span class="badge badge-blue">${pose.personCount || 1} Kişi</span>
      </div>
    </div>
    <div class="pose-info">
      <div class="pose-title">${pose.title}</div>
      <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;">${starHTML} ${pose.popularity || 80}%</div>
      <div class="pose-tags mt-2">${tagHTML}</div>
    </div>
  `;

  // Seç butonu
  card.addEventListener('click', (e) => {
    if (e.target.closest('.fav-btn')) return;
    if (onSelect) onSelect(pose);
  });

  // Favoriye ekle
  const favBtn = card.querySelector('.fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      favBtn.textContent = '♥ Kaydedildi';
      favBtn.style.background = 'var(--neon-green)';
      favBtn.style.color = '#000';
      if (onFavorite) onFavorite(pose);
    });
  }

  return card;
}
