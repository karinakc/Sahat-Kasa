import './scroll-to-top.js';
import './footer-legal.js';

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const progress = document.querySelector('.scroll-progress');

menuButton?.addEventListener('click', event => {
  event.preventDefault();
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}));

let frame;
const syncScroll = () => {
  frame = undefined;
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const amount = scrollable > 0 ? Math.min(scrollY / scrollable, 1) : 0;
  header?.classList.toggle('scrolled', scrollY > 24);
  if (progress) progress.style.transform = `scaleX(${amount})`;
};

addEventListener('scroll', () => {
  if (!frame) frame = requestAnimationFrame(syncScroll);
}, { passive: true });
syncScroll();
