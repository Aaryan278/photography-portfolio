/* ── FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    items.forEach(item => {
      const cats = (item.dataset.cat || '').split(' ');
      const show = filter === 'all' || cats.includes(filter);
      item.style.display = show ? 'block' : 'none';
    });
  });
});

/* ── LIGHTBOX ── */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbCap    = document.getElementById('lb-caption');

items.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = item.dataset.title || '';
    lbCap.textContent = [item.dataset.title, item.dataset.film].filter(Boolean).join(' — ');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lb-close').addEventListener('click', closeLb);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

function closeLb() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}