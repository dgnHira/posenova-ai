/**
 * components/MasonryGrid.js
 * Pinterest-tarzı dinamik masonry ızgara bileşeni.
 */
export function MasonryGrid({ pins, onPinClick }) {
  const grid = document.createElement('div');
  grid.className = 'masonry-grid';

  pins.forEach((pin, idx) => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.style.animationDelay = `${idx * 0.05}s`;
    item.style.animation = 'fadeInUp 0.5s ease both';
    item.style.animationDelay = `${idx * 0.04}s`;

    item.innerHTML = `
      <img
        src="${pin.imageUrl}"
        alt="${pin.tag || 'Poz ilhamı'}"
        loading="lazy"
        style="width:100%; display:block;"
        onerror="this.src='https://picsum.photos/seed/fallback${idx}/300/350'"
      />
      <div class="overlay-hover">
        <span class="item-tag">#${pin.tag || 'poz'}</span>
      </div>
    `;

    if (onPinClick) item.addEventListener('click', () => onPinClick(pin));
    grid.appendChild(item);
  });

  return grid;
}
