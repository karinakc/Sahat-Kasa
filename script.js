const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const rail = document.querySelector('[data-rail]');
const preloader = document.querySelector('[data-preloader]');
const scrollProgress = document.querySelector('.scroll-progress');
const hero = document.querySelector('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  preloader?.classList.add('is-hidden');
}, { once: true });

let scrollFrame;
const syncScrollEffects = () => {
  scrollFrame = undefined;
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

  header.classList.toggle('scrolled', scrollTop > 24);
  scrollProgress.style.transform = `scaleX(${progress})`;

  if (!reduceMotion.matches && scrollTop < window.innerHeight * 1.15) {
    hero.style.setProperty('--portrait-shift', `${Math.min(scrollTop * 0.1, 70)}px`);
    hero.style.setProperty('--copy-shift', `${Math.max(scrollTop * -0.035, -24)}px`);
  }
};

const requestScrollSync = () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScrollEffects);
};

syncScrollEffects();
window.addEventListener('scroll', requestScrollSync, { passive: true });
window.addEventListener('resize', requestScrollSync, { passive: true });

menuButton?.addEventListener('click', (event) => {
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.dataset.scroll === 'right' ? 1 : -1;
    rail.scrollBy({ left: direction * Math.min(520, rail.clientWidth * .8), behavior: 'smooth' });
  });
});

document.querySelector('[data-form]')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const buttonLabel = button.innerHTML;

  button.disabled = true;
  button.textContent = 'Sending…';
  status.dataset.state = 'sending';
  status.textContent = 'Adding you to the list…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Subscription request failed');

    form.reset();
    status.dataset.state = 'success';
    status.textContent = 'You’re on the list. Watch your inbox for the next edition.';
  } catch {
    status.dataset.state = 'error';
    status.textContent = 'We couldn’t subscribe you just now. Please check your connection and try again.';
  } finally {
    button.disabled = false;
    button.innerHTML = buttonLabel;
  }
});
