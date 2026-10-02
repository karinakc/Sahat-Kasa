const button = document.createElement('button');
button.className = 'scroll-to-top';
button.type = 'button';
button.setAttribute('aria-label', 'Scroll to the top');
button.setAttribute('title', 'Back to top');
button.innerHTML = '<span aria-hidden="true">↑</span><small>Top</small>';
document.body.append(button);

const panel = document.querySelector('.form-panel');
const panelScrolls = () => panel
  && getComputedStyle(panel).overflowY === 'auto'
  && panel.scrollHeight > panel.clientHeight;

const currentScrollTop = () => panelScrolls() ? panel.scrollTop : window.scrollY;
const toggleButton = () => {
  const threshold = Math.min(520, window.innerHeight * .65);
  button.classList.toggle('is-visible', currentScrollTop() > threshold);
};

button.addEventListener('click', () => {
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  if (panelScrolls()) panel.scrollTo({ top: 0, behavior });
  else window.scrollTo({ top: 0, behavior });
});

window.addEventListener('scroll', toggleButton, { passive: true });
window.addEventListener('resize', toggleButton, { passive: true });
panel?.addEventListener('scroll', toggleButton, { passive: true });
toggleButton();
