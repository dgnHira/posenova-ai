/**
 * app.js
 * PoseGuide — Ana uygulama: SPA Router ve sayfa yöneticisi.
 */
import { GirisEkrani }     from './src/pages/GirisEkrani.js';
import { FiltrelemeSayfasi } from './src/pages/FiltrelemeSayfasi.js';
import { KameraRehberi }   from './src/pages/KameraRehberi.js';
import { Galeri }          from './src/pages/Galeri.js';

// ── Uygulama Durumu ────────────────────────────────────────
const AppState = {
  currentPage: 'giris',
  activePose: null,
  pages: {},
};

// ── Toast Bildirimi ────────────────────────────────────────
function showToast(msg, type = 'success', duration = 2800) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// ── Navbar oluştur ─────────────────────────────────────────
function createNavbar(navigateTo) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'main-navbar';

  nav.innerHTML = `
    <div class="navbar-logo" id="logo-btn" style="cursor:pointer;">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style="flex-shrink:0;">
        <rect width="28" height="28" rx="8" fill="#E60023"/>
        <path d="M14 6C10.13 6 7 9.13 7 13c0 2.7 1.54 5.05 3.8 6.25-.05-.48-.1-1.22.02-1.74l.74-3.14s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .55-.35 1.37-.53 2.13-.15.64.32 1.16.94 1.16 1.13 0 1.89-1.19 1.89-2.91 0-1.52-1.09-2.58-2.65-2.58-1.81 0-2.87 1.36-2.87 2.76 0 .55.21 1.13.47 1.45.05.06.06.12.04.18l-.18.72c-.03.1-.1.13-.18.09-.83-.39-1.35-1.6-1.35-2.58 0-2.1 1.52-4.02 4.39-4.02 2.3 0 4.09 1.64 4.09 3.83 0 2.28-1.44 4.12-3.43 4.12-.67 0-1.3-.35-1.52-.76l-.41 1.54c-.15.57-.55 1.29-.82 1.73.62.19 1.27.29 1.95.29 3.87 0 7-3.13 7-7s-3.13-7-7-7z" fill="white"/>
      </svg>
      PoseGuide
    </div>

    <div style="display:flex;align-items:center;gap:6px;">
      <button class="btn btn-secondary btn-sm nav-link" data-page="giris">🏠 Ana Sayfa</button>
      <button class="btn btn-secondary btn-sm nav-link" data-page="filtrele">⚡ Filtrele</button>
      <button class="btn btn-secondary btn-sm nav-link" data-page="galeri">🖼️ Galeri</button>
      <button class="btn btn-primary btn-sm nav-link" data-page="filtrele" style="margin-left:4px;">
        📸 Poz Bul
      </button>
    </div>
  `;

  nav.querySelector('#logo-btn').addEventListener('click', () => navigateTo('giris'));
  nav.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });

  return nav;
}

// ── SPA Router ─────────────────────────────────────────────
async function navigateTo(pageId) {
  if (AppState.currentPage === pageId && AppState.pages[pageId]) return;

  // Mevcut sayfaya çıkış eventi gönder (kamera kapatma vb.)
  const current = AppState.pages[AppState.currentPage];
  if (current) {
    current.classList.remove('active');
    current.dispatchEvent(new CustomEvent('pageLeave'));
  }

  const container = document.getElementById('page-container');

  // Sayfa daha önce oluşturulduysa tekrar göster
  if (AppState.pages[pageId]) {
    AppState.pages[pageId].classList.add('active');
    AppState.currentPage = pageId;
    updateNavHighlight(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Loading indicator
  const loader = document.createElement('div');
  loader.style.cssText = `
    position:fixed;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--pinterest-red),var(--electric-blue),var(--neon-green));
    z-index:9999;animation:shimmer 1s linear infinite;background-size:200% 100%;
  `;
  document.body.appendChild(loader);

  // Sayfayı oluştur
  const pageBuilders = {
    giris:    () => GirisEkrani({ navigateTo }),
    filtrele: () => FiltrelemeSayfasi({ navigateTo, setActivePose }),
    kamera:   () => KameraRehberi({ navigateTo, activePose: AppState.activePose }),
    galeri:   () => Galeri({ navigateTo, setActivePose }),
  };

  const builder = pageBuilders[pageId];
  if (!builder) { loader.remove(); return; }

  try {
    const pageEl = await builder();
    pageEl.classList.add('active');
    container.appendChild(pageEl);
    AppState.pages[pageId] = pageEl;
    AppState.currentPage = pageId;
    updateNavHighlight(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('[Router] Sayfa oluşturma hatası:', err);
    showToast('Sayfa yüklenirken hata oluştu.', 'error');
  } finally {
    loader.remove();
  }
}

function setActivePose(pose) {
  AppState.activePose = pose;
  // Kamera sayfası yeniden oluşturulması için cache'den sil
  if (AppState.pages['kamera']) {
    AppState.pages['kamera'].remove();
    delete AppState.pages['kamera'];
  }
  showToast(`✅ "${pose.title}" seçildi! Kamera açılıyor...`, 'success');
}

function updateNavHighlight(pageId) {
  document.querySelectorAll('.nav-link').forEach(btn => {
    const isActive = btn.dataset.page === pageId;
    if (isActive && !btn.classList.contains('btn-primary')) {
      btn.style.borderColor = 'var(--pinterest-red)';
      btn.style.color = 'var(--pinterest-red)';
    } else {
      btn.style.borderColor = '';
      btn.style.color = '';
    }
  });
}

// ── Uygulama Başlatma ─────────────────────────────────────
async function initApp() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const navbar = createNavbar(navigateTo);
  root.appendChild(navbar);

  const container = document.createElement('div');
  container.id = 'page-container';
  container.className = 'app-container';
  root.appendChild(container);

  // İlk sayfayı yükle
  await navigateTo('giris');
}

// DOM hazır olunca başlat
document.addEventListener('DOMContentLoaded', initApp);
