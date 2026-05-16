/**
 * pages/GirisEkrani.js
 * Onboarding sayfası — Pinterest tarzı Masonry Grid kolajı ile karşılama.
 */
import { MasonryGrid } from '../components/MasonryGrid.js';
import { PinterestService } from '../services/api.js';

export async function GirisEkrani({ navigateTo }) {
  const page = document.createElement('div');
  page.id = 'page-giris';
  page.className = 'page';

  // Sol panel
  const hero = document.createElement('div');
  hero.style.cssText = `
    display:grid; grid-template-columns:1fr 1fr; min-height:100vh;
    @media(max-width:768px){grid-template-columns:1fr;}
  `;

  // ── Sol: İçerik paneli ──────────────────────────────
  const leftPanel = document.createElement('div');
  leftPanel.style.cssText = `
    display:flex; flex-direction:column; justify-content:center;
    padding: 60px 48px; position:relative; z-index:2;
    background: linear-gradient(135deg, #0d0d0d 0%, #1a0a0a 100%);
  `;

  leftPanel.innerHTML = `
    <!-- Logo -->
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:48px;">
      <div style="width:44px;height:44px;border-radius:12px;
                  background:var(--pinterest-red);
                  display:flex;align-items:center;justify-content:center;font-size:1.4rem;
                  box-shadow:var(--shadow-glow-red);animation:pulse-glow 2s infinite;">
        📸
      </div>
      <span style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;
                   background:linear-gradient(135deg,#E60023,#ff6b6b 60%,#FACC15);
                   -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        PoseGuide
      </span>
    </div>

    <!-- Başlık -->
    <div style="animation:slideInLeft 0.7s ease both;">
      <div class="badge badge-red" style="margin-bottom:16px;font-size:0.7rem;">
        ✨ Pinterest × Kamera Rehberi
      </div>
      <h1 style="font-family:var(--font-display);font-weight:900;line-height:1.1;margin-bottom:20px;">
        Mükemmel Pozun<br>
        <span style="background:linear-gradient(90deg,var(--pinterest-red),var(--electric-blue));
                     -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
          Rehberi Burada
        </span>
      </h1>
      <p style="color:var(--text-secondary);font-size:1.05rem;line-height:1.7;max-width:400px;margin-bottom:36px;">
        Ortamı, kişi sayısını ve ilişkini seç — biz sana Pinterest'in en estetik
        pozlarını silüet rehberiyle sunalım. Çekimi hiç bu kadar kolay bulmadın.
      </p>
    </div>

    <!-- CTA Butonları -->
    <div style="display:flex;flex-direction:column;gap:12px;max-width:340px;animation:slideInLeft 0.9s ease both;">
      <button id="btn-baslat" class="btn btn-primary btn-lg" style="justify-content:center;">
        🚀 Hemen Başla
      </button>
      <button id="btn-galeri" class="btn btn-secondary btn-lg" style="justify-content:center;">
        🖼️ Galeriyi Keşfet
      </button>
    </div>

    <!-- İstatistikler -->
    <div style="display:flex;gap:32px;margin-top:48px;animation:fadeIn 1.2s ease both;">
      ${[['500+','Poz Şablonu'],['50K+','Mutlu Kullanıcı'],['4.9★','Ortalama Puan']].map(([val,lbl]) => `
        <div>
          <div style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;
                      color:var(--pinterest-red);">${val}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">${lbl}</div>
        </div>
      `).join('')}
    </div>
  `;

  // ── Sağ: Masonry Kolajı ─────────────────────────────
  const rightPanel = document.createElement('div');
  rightPanel.style.cssText = `
    position:relative; overflow:hidden;
    background:#0a0a0a;
    display:flex;align-items:flex-start;
  `;

  // Gradient overlay sol tarafa doğru
  const gradient = document.createElement('div');
  gradient.style.cssText = `
    position:absolute;left:0;top:0;bottom:0;width:80px;z-index:1;
    background:linear-gradient(to right,#0d0d0d,transparent);
    pointer-events:none;
  `;

  // Loading placeholder
  const loadingMsg = document.createElement('div');
  loadingMsg.style.cssText = `
    display:flex;align-items:center;justify-content:center;
    width:100%;color:var(--text-muted);font-size:0.9rem;
    padding:60px;
  `;
  loadingMsg.innerHTML = `
    <div style="text-align:center;">
      <div style="width:36px;height:36px;border:3px solid var(--border-subtle);
                  border-top-color:var(--pinterest-red);border-radius:50%;
                  animation:spin 0.8s linear infinite;margin:0 auto 12px;"></div>
      Kolaj yükleniyor...
    </div>
  `;
  rightPanel.appendChild(loadingMsg);
  rightPanel.appendChild(gradient);

  // Masonry Grid yükle
  PinterestService.getCollagePins().then(pins => {
    loadingMsg.remove();
    const scrollWrap = document.createElement('div');
    scrollWrap.style.cssText = `
      width:100%; overflow-y:auto; max-height:100vh;
      scrollbar-width:none;
    `;
    scrollWrap.style.cssText += '::-webkit-scrollbar{display:none;}';

    const grid = MasonryGrid({ pins, onPinClick: null });
    scrollWrap.appendChild(grid);
    rightPanel.insertBefore(scrollWrap, gradient);

    // Otomatik scroll
    let pos = 0;
    const autoScroll = setInterval(() => {
      pos += 0.6;
      if (pos >= scrollWrap.scrollHeight - scrollWrap.clientHeight) pos = 0;
      scrollWrap.scrollTop = pos;
    }, 20);

    // Sayfa değişince durdur
    page.addEventListener('pageLeave', () => clearInterval(autoScroll));
  });

  hero.appendChild(leftPanel);
  hero.appendChild(rightPanel);
  page.appendChild(hero);

  // ── Mobil için responsive ────────────────────────────
  if (window.innerWidth <= 768) {
    hero.style.gridTemplateColumns = '1fr';
    rightPanel.style.height = '300px';
    leftPanel.style.padding = '40px 24px';
  }

  // ── Navigasyon ───────────────────────────────────────
  page.querySelector('#btn-baslat').addEventListener('click', () => navigateTo('filtrele'));
  page.querySelector('#btn-galeri').addEventListener('click', () => navigateTo('galeri'));

  return page;
}
