/**
 * components/Button.js
 * Yeniden kullanılabilir buton bileşeni.
 * @param {Object} opts - { label, variant, size, icon, onClick, id }
 */
export function Button({ label = 'Tıkla', variant = 'primary', size = '', icon = '', onClick, id }) {
  const btn = document.createElement('button');
  btn.className = `btn btn-${variant}${size ? ' btn-' + size : ''}`;
  if (id) btn.id = id;
  btn.innerHTML = `${icon ? icon + ' ' : ''}${label}`;
  if (onClick) btn.addEventListener('click', onClick);

  // Ripple efekti
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;border-radius:50%;
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.25);
      transform:scale(0);
      animation:ripple 0.5s ease-out;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });

  return btn;
}
