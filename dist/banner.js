const slider = document.querySelector('.feature-slider');
const panels = [...slider.querySelectorAll('.feature-panel')];
const playback = slider.querySelector('.playback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let playing = !reducedMotion.matches;
let current = 0;
let timer;
let hovering = false;

function showSlide(step) {
  current = (current + step + panels.length) % panels.length;
  panels.forEach((panel, index) => { panel.hidden = index !== current; });
  const format = value => String(value).padStart(2, '0');
  slider.querySelector('.position').textContent = format(current + 1) + ' / ' + format(panels.length);
}

function schedule() {
  clearTimeout(timer);
  playback.textContent = playing ? '일시정지' : '자동 재생';
  if (playing && !hovering && !document.hidden) {
    timer = setTimeout(() => { showSlide(1); schedule(); }, 6500);
  }
}

slider.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => { showSlide(Number(button.dataset.step)); schedule(); });
});
playback.addEventListener('click', () => { playing = !playing; schedule(); });
slider.addEventListener('focusin', event => {
  if (event.target.matches(':focus-visible')) { playing = false; schedule(); }
});
slider.addEventListener('mouseenter', () => { hovering = true; schedule(); });
slider.addEventListener('mouseleave', () => { hovering = false; schedule(); });
document.addEventListener('visibilitychange', schedule);
reducedMotion.addEventListener('change', () => { playing = !reducedMotion.matches; schedule(); });
slider.querySelector('.banner-controls').hidden = false;
schedule();
