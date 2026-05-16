/**
 * pages/Galeri.js
 * Tüm pozların listelendiği galeri sayfası.
 */
import { PoseService } from '../services/api.js';
import { PoseCard } from '../components/PoseCard.js';

export async function Galeri({ navigateTo, setActivePose }) {
  const page = document.createElement('div');
  page.id = 'page-galeri';
  page.className = 'page';

  page.innerHTML = `
    <div class="page-content">
      <!-- Başlık -->
      <div style="margin-bottom:32px;">
        <div class="badge badge-green" style="margin-bottom:12px;">Poz Kütüphanesi</div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <h1 style="font-family:var(--font-display);font-weight:900;">
            Tüm <span style="color:var(--pinterest-red);">Pozlar</span>
          </h1>
          <div style="display:flex;gap:10px;align-items:center;">
            <input id="search-input" class="input-field" placeholder="🔍 Poz ara..." style="width:220px;">
            <button id="btn-filter-modal" class="btn btn-secondary">
              ⚡ Filtrele
            </button>
          </div>
        </div>
      </div>

      <!-- Kategori sekmeleri -->
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:24px;scrollbar-width:none;" id="category-tabs">
        ${['Tümü','Dış Mekan','İç Mekan','Çift','Grup','Profesyonel'].map((cat, i) => `
          <button class="btn ${i===0?'btn-primary':'btn-secondary'} btn-sm tab-btn" data-cat="${cat}"
                  style="white-space:nowrap;flex-shrink:0;">
            ${cat}
          </button>
        `).join('')}
      </div>

      <!-- Grid -->
      <div id="gallery-grid" style="
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
        gap:18px;
      ">
        <!-- Skeleton -->
        ${Array.from({length:8}).map((_,i) => `
          <div class="skeleton" style="border-radius:var(--radius-xl);
               height:${300 + (i%3)*80}px;animation-delay:${i*0.07}s;"></div>
        `).join('')}
      </div>

      <!-- Daha Fazla Yükle -->
      <div style="text-align:center;margin-top:40px;">
        <button id="btn-load-more" class="btn btn-secondary btn-lg">
          ↓ Daha Fazla Yükle
        </button>
      </div>
    </div>
  `;

  let allPoses = [];

  // Pozları yükle
  PoseService.getAllPoses().then(poses => {
    allPoses = poses || [];
    renderGallery(allPoses, page, navigateTo, setActivePose);
  });

  // Arama
  page.querySelector('#search-input').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = allPoses.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    );
    renderGallery(filtered, page, navigateTo, setActivePose);
  });

  // Sekmeler
  page.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      page.querySelectorAll('.tab-btn').forEach(b => {
        b.className = 'btn btn-secondary btn-sm tab-btn';
        b.style.whiteSpace = 'nowrap'; b.style.flexShrink = '0';
      });
      btn.className = 'btn btn-primary btn-sm tab-btn';
      btn.style.whiteSpace = 'nowrap'; btn.style.flexShrink = '0';

      const cat = btn.dataset.cat;
      const MAP = { 'Dış Mekan':'outdoor','İç Mekan':'indoor','Profesyonel':'office' };
      const filtered = cat === 'Tümü' ? allPoses :
        cat === 'Çift'  ? allPoses.filter(p => p.personCount == 2) :
        cat === 'Grup'  ? allPoses.filter(p => p.personCount >= 3) :
        allPoses.filter(p => p.environment === MAP[cat]);

      renderGallery(filtered, page, navigateTo, setActivePose);
    });
  });

  // Filtrele butonu - sayfaya yönlendir
  page.querySelector('#btn-filter-modal').addEventListener('click', () => navigateTo('filtrele'));

  // Daha fazla (demo - tekrar yükle)
  page.querySelector('#btn-load-more').addEventListener('click', async () => {
    const btn = page.querySelector('#btn-load-more');
    btn.textContent = '⟳ Yükleniyor...';
    btn.disabled = true;
    await new Promise(r => setTimeout(r, 800));
    btn.textContent = '✓ Hepsi Yüklendi';
  });

  return page;
}

function renderGallery(poses, page, navigateTo, setActivePose) {
  const grid = page.querySelector('#gallery-grid');
  grid.innerHTML = '';

  if (!poses.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:12px;">😕</div>
        <p>Bu kategoride poz bulunamadı.</p>
      </div>
    `;
    return;
  }

  poses.forEach((pose, idx) => {
    const card = PoseCard({
      pose,
      onSelect: (p) => {
        setActivePose(p);
        navigateTo('kamera');
      },
      onFavorite: (p) => PoseService.saveFavorite(p.id).catch(() => {}),
    });
    card.style.animation = `fadeInUp 0.4s ease ${idx * 0.05}s both`;
    grid.appendChild(card);
  });
}
