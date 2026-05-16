/**
 * components/FilterModal.js
 * Ortam, kişi sayısı ve samimiyet seviyesi seçim modalı.
 */
export function FilterModal({ onApply, onClose }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  const state = { environment: '', personCount: '', intimacyLevel: '' };

  backdrop.innerHTML = `
    <div class="modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h3 style="font-family:var(--font-display);font-size:1.3rem;">🎯 Poz Filtrele</h3>
        <button id="modal-close-btn" class="btn btn-secondary btn-sm">✕</button>
      </div>

      <!-- Ortam -->
      <div style="margin-bottom:20px;">
        <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;font-weight:600;">📍 Ortam</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;" id="env-options">
          <div class="option-card" data-group="environment" data-value="outdoor">
            <span class="option-icon">🌿</span>
            <div><div class="option-label">Dış Mekan</div><div class="option-sub">Park, Sahil, Doğa</div></div>
          </div>
          <div class="option-card" data-group="environment" data-value="indoor">
            <span class="option-icon">🏠</span>
            <div><div class="option-label">İç Mekan</div><div class="option-sub">Ev, Stüdyo</div></div>
          </div>
          <div class="option-card" data-group="environment" data-value="office">
            <span class="option-icon">💼</span>
            <div><div class="option-label">Ofis</div><div class="option-sub">Kurumsal Ortam</div></div>
          </div>
          <div class="option-card" data-group="environment" data-value="travel">
            <span class="option-icon">✈️</span>
            <div><div class="option-label">Seyahat</div><div class="option-sub">Şehir, Turizm</div></div>
          </div>
        </div>
      </div>

      <!-- Kişi Sayısı -->
      <div style="margin-bottom:20px;">
        <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;font-weight:600;">👥 Kişi Sayısı</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;" id="count-options">
          ${[1,2,3,4].map(n => `
            <div class="option-card" data-group="personCount" data-value="${n}" style="flex:1;min-width:60px;justify-content:center;flex-direction:column;text-align:center;padding:12px 8px;">
              <div style="font-size:1.4rem;">${['🧍','👫','👨‍👩‍👦','👨‍👩‍👧‍👦'][n-1]}</div>
              <div class="option-label" style="font-size:0.8rem;">${n} Kişi</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Samimiyet -->
      <div style="margin-bottom:24px;">
        <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;font-weight:600;">💬 İlişki / Samimiyet</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;" id="intimacy-options">
          <div class="option-card" data-group="intimacyLevel" data-value="friend">
            <span class="option-icon">🤝</span>
            <div><div class="option-label">Arkadaş</div></div>
          </div>
          <div class="option-card" data-group="intimacyLevel" data-value="partner">
            <span class="option-icon">❤️</span>
            <div><div class="option-label">Sevgili</div></div>
          </div>
          <div class="option-card" data-group="intimacyLevel" data-value="family">
            <span class="option-icon">👨‍👩‍👦</span>
            <div><div class="option-label">Aile</div></div>
          </div>
          <div class="option-card" data-group="intimacyLevel" data-value="colleague">
            <span class="option-icon">👔</span>
            <div><div class="option-label">İş Arkadaşı</div></div>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:10px;">
        <button id="modal-apply-btn" class="btn btn-primary w-full btn-lg">✨ Pozları Bul</button>
      </div>
    </div>
  `;

  // Option card seçimi
  backdrop.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const group = card.dataset.group;
      backdrop.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state[group] = card.dataset.value;
    });
  });

  // Kapat
  backdrop.querySelector('#modal-close-btn').addEventListener('click', () => {
    backdrop.remove();
    if (onClose) onClose();
  });
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) { backdrop.remove(); if (onClose) onClose(); }
  });

  // Uygula
  backdrop.querySelector('#modal-apply-btn').addEventListener('click', () => {
    backdrop.remove();
    if (onApply) onApply({ ...state });
  });

  return backdrop;
}
