/**
 * pages/KameraRehberi.js
 * Kamera üzerinde SVG silüet overlay rehber sayfası.
 */
import { CameraOverlay, startCamera, stopCamera, capturePhoto } from '../components/CameraOverlay.js';

const SILHOUETTES = [
  { id: 'solo_stand',   label: 'Klasik Duruş',   icon: '🧍' },
  { id: 'solo_dynamic', label: 'Dinamik Poz',    icon: '💃' },
  { id: 'couple_stand', label: 'Çift Pozu',      icon: '👫' },
];

export async function KameraRehberi({ navigateTo, activePose }) {
  const page = document.createElement('div');
  page.id = 'page-kamera';
  page.className = 'page';

  let currentStream = null;
  let currentSilhouette = activePose?.silhouette || 'solo_stand';
  let opacity = 0.65;

  page.innerHTML = `
    <div class="page-content" style="max-width:900px;">

      <!-- Başlık -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
        <button id="btn-back-kamera" class="btn btn-secondary btn-sm">← Geri</button>
        <div>
          <h2 style="font-family:var(--font-display);font-weight:800;">
            📸 ${activePose?.title || 'Kamera Rehberi'}
          </h2>
          <p style="color:var(--text-muted);font-size:0.85rem;">
            Silüetin içine gir ve mükemmel açıyı yakala!
          </p>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 280px;gap:20px;">

        <!-- Kamera -->
        <div>
          <div id="camera-mount"></div>

          <!-- Kontroller -->
          <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;align-items:center;">
            <button id="btn-capture" class="btn btn-primary btn-lg" style="flex:1;">
              📸 Fotoğraf Çek
            </button>
            <button id="btn-flip" class="btn btn-secondary">
              🔄 Kamera Çevir
            </button>
            <button id="btn-stop" class="btn btn-secondary">
              ⏹ Durdur
            </button>
          </div>

          <!-- Opacity slider -->
          <div style="margin-top:16px;background:var(--bg-card);border-radius:var(--radius-lg);padding:14px;">
            <label style="font-size:0.8rem;color:var(--text-muted);font-weight:600;">
              🔆 Silüet Şeffaflığı: <span id="opacity-val">65%</span>
            </label>
            <input type="range" id="opacity-slider" min="10" max="100" value="65"
              style="width:100%;margin-top:8px;accent-color:var(--pinterest-red);">
          </div>
        </div>

        <!-- Sağ Panel -->
        <div style="display:flex;flex-direction:column;gap:14px;">

          <!-- Silüet seçici -->
          <div class="card-glass" style="padding:16px;">
            <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:1px;
                        color:var(--text-muted);font-weight:600;margin-bottom:12px;">
              🎭 Silüet Seç
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;" id="silhouette-selector">
              ${SILHOUETTES.map(s => `
                <div class="option-card ${s.id === currentSilhouette ? 'selected' : ''}"
                     data-silhouette="${s.id}" style="cursor:pointer;">
                  <span class="option-icon">${s.icon}</span>
                  <span class="option-label">${s.label}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Poz bilgisi -->
          ${activePose ? `
            <div class="card-glass" style="padding:16px;">
              <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:1px;
                          color:var(--text-muted);font-weight:600;margin-bottom:10px;">📌 Seçili Poz</div>
              <img src="${activePose.imageUrl}" alt="${activePose.title}"
                   style="width:100%;border-radius:var(--radius-md);margin-bottom:10px;object-fit:cover;max-height:180px;"
                   onerror="this.style.display='none'">
              <div style="font-family:var(--font-display);font-weight:600;font-size:0.9rem;">${activePose.title}</div>
              <div class="pose-tags mt-2">
                ${(activePose.tags||[]).map(t=>`<span class="badge badge-red">#${t}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          <!-- İpuçları -->
          <div class="card-glass" style="padding:16px;">
            <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:1px;
                        color:var(--text-muted);font-weight:600;margin-bottom:10px;">💡 İpuçları</div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;">
              ${['Kişileri mavi silüetle hizala','Düşük ışıkta yakın dur','Telefonu sabit tut','3-2-1 geriye say!'].map(t=>`
                <li style="font-size:0.82rem;color:var(--text-secondary);
                           display:flex;align-items:flex-start;gap:8px;">
                  <span style="color:var(--neon-green);flex-shrink:0;">✓</span>${t}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Çekilen fotoğraf önizleme -->
      <div id="capture-preview" style="display:none;margin-top:24px;" class="card">
        <div style="padding:16px;border-bottom:1px solid var(--border-subtle);
                    display:flex;justify-content:space-between;align-items:center;">
          <span style="font-weight:600;">📷 Fotoğrafınız Hazır!</span>
          <div style="display:flex;gap:8px;">
            <a id="download-link" class="btn btn-green btn-sm" download="poseguide.png">⬇ İndir</a>
            <button id="btn-retake" class="btn btn-secondary btn-sm">🔁 Tekrar Çek</button>
          </div>
        </div>
        <img id="captured-img" style="width:100%;max-height:420px;object-fit:cover;" alt="Çekilen fotoğraf">
      </div>
    </div>
  `;

  // Kamerayı mount et ve başlat
  const mount = page.querySelector('#camera-mount');
  const cameraEl = CameraOverlay({ silhouette: currentSilhouette });
  mount.appendChild(cameraEl);

  // Kamera başlatma
  const startCam = async () => {
    const videoEl = page.querySelector('#camera-feed');
    const errEl   = page.querySelector('#no-camera-msg');
    currentStream = await startCamera(videoEl, errEl);
  };
  startCam();

  // Geri
  page.querySelector('#btn-back-kamera').addEventListener('click', () => {
    stopCamera(currentStream);
    navigateTo('filtrele');
  });

  // Silüet seçimi
  page.querySelectorAll('[data-silhouette]').forEach(card => {
    card.addEventListener('click', () => {
      page.querySelectorAll('[data-silhouette]').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      currentSilhouette = card.dataset.silhouette;
      const img = page.querySelector('#silhouette-img');
      if (img) img.src = `./src/assets/silhouettes/${currentSilhouette}.svg`;
    });
  });

  // Opacity
  page.querySelector('#opacity-slider').addEventListener('input', (e) => {
    opacity = e.target.value / 100;
    page.querySelector('#opacity-val').textContent = `${e.target.value}%`;
    const img = page.querySelector('#silhouette-img');
    if (img) img.style.opacity = opacity;
  });

  // Fotoğraf çek
  page.querySelector('#btn-capture').addEventListener('click', () => {
    const videoEl = page.querySelector('#camera-feed');
    const dataUrl = capturePhoto(videoEl);
    const preview = page.querySelector('#capture-preview');
    page.querySelector('#captured-img').src = dataUrl;
    page.querySelector('#download-link').href = dataUrl;
    preview.style.display = 'block';
    preview.scrollIntoView({ behavior: 'smooth' });
  });

  // Tekrar çek
  page.querySelector('#btn-retake').addEventListener('click', () => {
    page.querySelector('#capture-preview').style.display = 'none';
  });

  // Durdur
  page.querySelector('#btn-stop').addEventListener('click', () => stopCamera(currentStream));

  // Kamera çevir (ileride: facingMode değiştirme)
  page.querySelector('#btn-flip').addEventListener('click', () => {
    const vid = page.querySelector('#camera-feed');
    const cur = vid.style.transform;
    vid.style.transform = cur === 'scaleX(1)' ? 'scaleX(-1)' : 'scaleX(1)';
  });

  // Sayfa terk edilince kamerayı durdur
  page.addEventListener('pageLeave', () => stopCamera(currentStream));

  return page;
}
