// Parallax: background layers drift at different speeds while scrolling.
const far = document.querySelector('.bg-far');
const near = document.querySelector('.bg-near');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      far.style.transform = `translate3d(0, ${-y * 0.06}px, 0)`;
      near.style.transform = `translate3d(0, ${-y * 0.18}px, 0)`;
      ticking = false;
    });
  }, { passive: true });
}

// Project tiles: tap (touch) or Enter/Space toggles the details overlay.
document.querySelectorAll('.thumb').forEach((tile) => {
  const toggle = () => {
    const wasOpen = tile.classList.contains('open');
    document.querySelectorAll('.thumb.open').forEach((t) => t.classList.remove('open'));
    if (!wasOpen) tile.classList.add('open');
  };
  tile.addEventListener('click', toggle);
  tile.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});
