/**
 * pages/FiltrelemeSayfasi.js
 * Ortam, kişi sayısı ve samimiyet seviyesine göre poz filtreleme sayfası.
 */
import { PoseService } from '../services/api.js';
import { PoseCard } from '../components/PoseCard.js';

export async function FiltrelemeSayfasi({ navigateTo, setActivePose }) {
  const page = document.createElement('div');
  page.id = 'page-filtrele';
  page.className = 'page';

  const state = { environment: '', personCount: '', intimacyLevel: '', poses: [] };

  page.innerHTML = `
    <div class="page-content" style="max-width:1100px;">

      <!-- Başlık -->
      <div style="text-align:center;margin-bottom:40px;">
        <div class="badge badge-blue" style="margin-bottom:12px;">Akıllı Filtreleme</div>
        <h1 style="font-family:var(--font-display);font-weight:900;">
          Senin İçin <span style="color:var(--pinterest-red);">Mükemmel Poz</span>
        </h1>
        <p style="color:var(--text-secondary);margin-top:10px;font-size:1rem;">
          Seçimlerine göre Pinterest'ten en popüler pozları filtreliyoruz.
        </p>
      </div>

      <!-- Filtre Paneli -->
      <div class="card-glass" style="padding:28px;margin-bottom:32px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;">

          <!-- Ortam -->
          <div>
            <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:1px;
                        color:var(--text-muted);font-weight:600;margin-bottom:12px;">📍 Ortam</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;" id="env-select">
              ${[
                ['outdoor','🌿','Dış Mekan'],['indoor','🏠','İç Mekan'],
                ['office','💼','Ofis'],['travel','✈️','Seyahat']
              ].map(([v,i,l]) => `
                <div class="option-card" data-group="environment" data-value="${v}">
                  <span class="option-icon">${i}</span>
                  <span class="option-label">${l}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Kişi Sayısı -->
          <div>
            <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:1px;
                        color:var(--text-muted);font-weight:600;margin-bottom:12px;">👥 Kişi Sayısı</div>
            <div style="display:flex;gap:8px;" id="count-select">
              ${[1,2,3,4].map(n => `
                <div class="option-card" data-group="personCount" data-value="${n}"
                     style="flex:1;flex-direction:column;align-items:center;justify-content:center;padding:14px 6px;text-align:center;">
                  <span style="font-size:1.5rem;">${['🧍','👫','👨‍👩‍👦','👨‍👩‍👧‍👦'][n-1]}</span>
                  <span class="option-label" style="font-size:0.78rem;">${n}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Samimiyet -->
          <div>
            <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:1px;
                        color:var(--text-muted);font-weight:600;margin-bottom:12px;">💬 Samimiyet</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;" id="intimacy-select">
              ${[
                ['friend','🤝','Arkadaş'],['partner','❤️','Sevgili'],
                ['family','👨‍👩‍👦','Aile'],['colleague','👔','İş Arkadaşı']
              ].map(([v,i,l]) => `
                <div class="option-card" data-group="intimacyLevel" data-value="${v}">
                  <span class="option-icon">${i}</span>
                  <span class="option-label">${l}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Ara Butonu -->
        <div style="margin-top:24px;display:flex;gap:12px;align-items:center;">
          <button id="btn-search" class="btn btn-primary btn-lg" style="min-width:180px;">
            🔍 Pozları Bul
          </button>
          <button id="btn-reset" class="btn btn-secondary">
            ↺ Sıfırla
          </button>
          <span id="result-count" style="color:var(--text-muted);font-size:0.85rem;margin-left:auto;"></span>
        </div>
      </div>

      <!-- Sonuçlar -->
      <div id="poses-grid" style="
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
        gap:18px;
      ">
        <div id="empty-state" style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
          <div style="font-size:3rem;margin-bottom:12px;">🎯</div>
          <p>Filtreleri seçip <strong style="color:var(--text-primary);">Pozları Bul</strong>'a tıkla.</p>
        </div>
      </div>
    </div>
  `;

  // Option card seçimi
  page.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const group = card.dataset.group;
      page.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state[group] = card.dataset.value;
    });
  });

  // Arama
  page.querySelector('#btn-search').addEventListener('click', async () => {
    const btn = page.querySelector('#btn-search');
    btn.innerHTML = '<span style="animation:spin 0.7s linear infinite;display:inline-block;">⟳</span> Yükleniyor...';
    btn.disabled = true;

    const poses = await PoseService.getFilteredPoses({
      environment:   state.environment   || undefined,
      personCount:   state.personCount   || undefined,
      intimacyLevel: state.intimacyLevel || undefined,
    });
    state.poses = poses || [];

    renderPoses(poses || [], page, navigateTo, setActivePose);

    btn.innerHTML = '🔍 Pozları Bul';
    btn.disabled = false;
  });

  // Sıfırla
  page.querySelector('#btn-reset').addEventListener('click', () => {
    page.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    Object.assign(state, { environment: '', personCount: '', intimacyLevel: '' });
    page.querySelector('#result-count').textContent = '';
    const grid = page.querySelector('#poses-grid');
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:12px;">🎯</div>
        <p>Filtreleri seçip <strong style="color:var(--text-primary);">Pozları Bul</strong>'a tıkla.</p>
      </div>
    `;
  });

  return page;
}

function renderPoses(poses, page, navigateTo, setActivePose) {
  const grid = page.querySelector('#poses-grid');
  const count = page.querySelector('#result-count');
  grid.innerHTML = '';

  if (!poses.length) {
    count.textContent = '';
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:12px;">😕</div>
        <p>Bu filtrelere uygun poz bulunamadı. Farklı seçenekler dene.</p>
      </div>
    `;
    return;
  }

  count.textContent = `${poses.length} poz bulundu`;
  poses.forEach((pose, idx) => {
    const card = PoseCard({
      pose,
      onSelect: (p) => {
        setActivePose(p);
        navigateTo('kamera');
      },
      onFavorite: (p) => {
        PoseService.saveFavorite(p.id).catch(() => {});
      },
    });
    card.style.animation = `fadeInUp 0.4s ease ${idx * 0.06}s both`;
    grid.appendChild(card);
  });
}
