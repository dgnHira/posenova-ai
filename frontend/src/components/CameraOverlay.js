/**
 * components/CameraOverlay.js
 * Kamera görüntüsü üzerinde SVG silüet overlay katmanı.
 */
export function CameraOverlay({ silhouette = 'solo_stand' }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'camera-wrapper';
  wrapper.id = 'camera-wrapper';

  wrapper.innerHTML = `
    <video id="camera-feed" autoplay playsinline muted></video>

    <!-- Silüet katmanı -->
    <div class="silhouette-overlay" id="silhouette-layer">
      <img
        id="silhouette-img"
        src="./src/assets/silhouettes/${silhouette}.svg"
        alt="Poz Rehberi"
        style="width:55%;height:90%;object-fit:contain;opacity:0.65;
               filter:drop-shadow(0 0 16px rgba(59,130,246,0.9)) brightness(2);
               animation:float 3s ease-in-out infinite;"
      />
    </div>

    <!-- HUD çerçevesi -->
    <div style="position:absolute;inset:0;pointer-events:none;">
      <!-- Köşe çerçeveleri -->
      <div style="position:absolute;top:16px;left:16px;width:40px;height:40px;
                  border-top:3px solid var(--electric-blue);border-left:3px solid var(--electric-blue);
                  border-radius:4px 0 0 0;"></div>
      <div style="position:absolute;top:16px;right:16px;width:40px;height:40px;
                  border-top:3px solid var(--electric-blue);border-right:3px solid var(--electric-blue);
                  border-radius:0 4px 0 0;"></div>
      <div style="position:absolute;bottom:16px;left:16px;width:40px;height:40px;
                  border-bottom:3px solid var(--electric-blue);border-left:3px solid var(--electric-blue);
                  border-radius:0 0 0 4px;"></div>
      <div style="position:absolute;bottom:16px;right:16px;width:40px;height:40px;
                  border-bottom:3px solid var(--electric-blue);border-right:3px solid var(--electric-blue);
                  border-radius:0 0 4px 0;"></div>
      <!-- REC göstergesi -->
      <div style="position:absolute;top:20px;left:50%;transform:translateX(-50%);
                  display:flex;align-items:center;gap:6px;
                  background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);
                  padding:4px 14px;border-radius:999px;">
        <span style="width:8px;height:8px;border-radius:50%;background:var(--pinterest-red);
                     animation:pulse-glow 1.5s ease infinite;"></span>
        <span style="font-size:0.7rem;font-weight:700;letter-spacing:2px;color:#fff;">CANLI</span>
      </div>
    </div>

    <!-- Kamera Yok Mesajı -->
    <div id="no-camera-msg" style="display:none;position:absolute;inset:0;
         background:rgba(0,0,0,0.9);display:flex;flex-direction:column;
         align-items:center;justify-content:center;gap:12px;text-align:center;padding:24px;">
      <span style="font-size:3rem;">📷</span>
      <p style="color:var(--text-secondary);font-size:0.9rem;">Kamera erişimi verilmedi veya kamera bulunamadı.</p>
    </div>
  `;

  return wrapper;
}

/**
 * Kamera akışını başlatır.
 * @param {HTMLVideoElement} videoEl
 * @param {HTMLElement} errorEl
 */
export async function startCamera(videoEl, errorEl) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    videoEl.srcObject = stream;
    return stream;
  } catch (err) {
    console.error('[Camera]', err);
    if (errorEl) { errorEl.style.display = 'flex'; }
    return null;
  }
}

/**
 * Kamerayı durdurur.
 * @param {MediaStream} stream
 */
export function stopCamera(stream) {
  if (stream) stream.getTracks().forEach(t => t.stop());
}

/**
 * Kameradaki anı yakalar (canvas üzerinden).
 * @param {HTMLVideoElement} videoEl
 * @returns {string} Base64 PNG
 */
export function capturePhoto(videoEl) {
  const canvas = document.createElement('canvas');
  canvas.width  = videoEl.videoWidth  || 1280;
  canvas.height = videoEl.videoHeight || 720;
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(videoEl, 0, 0);
  ctx.restore();
  return canvas.toDataURL('image/png');
}
