const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.querySelectorAll('#copy-email, [data-copy-email]').forEach(button => button.addEventListener('click', async () => {
  const toast = document.querySelector('.toast');
  try { await navigator.clipboard.writeText('kiyolive26@gmail.com'); toast.textContent = '클립보드에 복사했습니다. 사용하시는 메일에 붙여넣어 주세요.'; }
  catch { toast.textContent = '복사하지 못했어요. kiyolive26@gmail.com 주소를 직접 복사해 주세요.'; }
  toast.classList.add('show'); clearTimeout(window.toastTimeout); window.toastTimeout = setTimeout(() => toast.classList.remove('show'), 4500);
}));
