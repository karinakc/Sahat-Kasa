import { episodes, clips, CHANNEL_URL, CLIPS_PLAYLIST_URL, formatEpisodeDate } from './episodes-data.js';

const PAGE_SIZE = 6;
const searchInput = document.querySelector('[data-episode-search]');
const filters = document.querySelector('[data-filters]');
const grid = document.querySelector('[data-episode-grid]');
const resultsCount = document.querySelector('[data-results-count]');
const emptyState = document.querySelector('[data-empty-state]');
const resetButton = document.querySelector('[data-reset-filters]');
const loadMoreButton = document.querySelector('[data-load-more]');
const header = document.querySelector('[data-header]');
const scrollProgress = document.querySelector('.scroll-progress');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

let selectedCategory = 'All';
let visibleCount = PAGE_SIZE;

const localImage = image => image.startsWith('src/') ? `../${image}` : image;
const categories = ['All', ...new Set(episodes.map(episode => episode.category))];

const metaLine = episode => {
  const values = [episode.category, episode.duration, formatEpisodeDate(episode.published)].filter(Boolean);
  return values.map(value => `<span>${value}</span>`).join('');
};

const episodeCard = (episode, className = 'library-card') => `
  <article class="${className}">
    <a class="library-thumb" href="${episode.url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${episode.title} on YouTube">
      <img src="${localImage(episode.image)}" alt="${episode.imageAlt}" loading="lazy" width="480" height="270">
      ${episode.duration ? `<span class="duration">${episode.duration}</span>` : ''}
    </a>
    <div class="library-meta">${metaLine(episode)}</div>
    <h3><a href="${episode.url}" target="_blank" rel="noopener noreferrer">${episode.title}</a></h3>
    <p>${episode.guest}</p>
  </article>`;

const latest = episodes.find(episode => episode.latest) || episodes[0];
const latestContainer = document.querySelector('[data-episodes-latest]');
if (latestContainer && latest) {
  const published = formatEpisodeDate(latest.published);
  latestContainer.innerHTML = `
    <article class="episodes-feature">
      <a class="episodes-feature-visual" href="${latest.url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${latest.title} on YouTube">
        <img src="${localImage(latest.image)}" alt="${latest.imageAlt}" width="960" height="540">
        <span class="feature-watch" aria-hidden="true">▶</span>
        ${latest.duration ? `<span class="duration">${latest.duration}</span>` : ''}
      </a>
      <div class="episodes-feature-copy">
        <div class="library-meta"><span>${latest.category}</span>${latest.duration ? `<span>${latest.duration}</span>` : ''}${published ? `<time datetime="${latest.published}">${published}</time>` : ''}</div>
        <p class="feature-guest">${latest.guest}</p>
        <h3>${latest.title}</h3>
        <p>${latest.description}</p>
        <a class="button button-primary" href="${latest.url}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span>Watch episode</a>
      </div>
    </article>`;
}

filters.innerHTML = categories.map(category => `
  <button type="button" class="filter-button" data-category="${category}" aria-pressed="${category === 'All'}">${category}</button>`).join('');

const applyInitialCategory = () => {
  const requested = new URLSearchParams(window.location.search).get('category');
  const match = categories.find(category => category.toLowerCase() === requested?.toLowerCase());
  if (match) selectedCategory = match;
};

const matchingEpisodes = () => {
  const query = searchInput.value.trim().toLocaleLowerCase();
  return episodes.filter(episode => {
    const categoryMatch = selectedCategory === 'All' || episode.category === selectedCategory;
    const searchable = [episode.title, episode.guest, episode.category, ...episode.topics].join(' ').toLocaleLowerCase();
    return categoryMatch && (!query || searchable.includes(query));
  });
};

const renderLibrary = () => {
  const matches = matchingEpisodes();
  const shown = matches.slice(0, visibleCount);
  grid.innerHTML = shown.map(episode => episodeCard(episode)).join('');
  resultsCount.textContent = `${matches.length} ${matches.length === 1 ? 'episode' : 'episodes'}`;
  emptyState.hidden = matches.length !== 0;
  loadMoreButton.hidden = visibleCount >= matches.length || matches.length === 0;
  filters.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.category === selectedCategory));
  });
};

applyInitialCategory();
renderLibrary();

searchInput.addEventListener('input', () => {
  visibleCount = PAGE_SIZE;
  renderLibrary();
});

filters.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  selectedCategory = button.dataset.category;
  visibleCount = PAGE_SIZE;
  renderLibrary();
});

loadMoreButton.addEventListener('click', () => {
  visibleCount += PAGE_SIZE;
  renderLibrary();
});

resetButton.addEventListener('click', () => {
  searchInput.value = '';
  selectedCategory = 'All';
  visibleCount = PAGE_SIZE;
  renderLibrary();
  searchInput.focus();
});

document.querySelector('[data-popular-grid]').innerHTML = episodes
  .filter(episode => episode.popular)
  .slice(0, 4)
  .map(episode => episodeCard(episode, 'popular-card'))
  .join('');

document.querySelector('[data-clips-grid]').innerHTML = clips.map(clip => `
  <article class="clip-card">
    <a class="library-thumb" href="${clip.url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${clip.title} on YouTube">
      <img src="${clip.image}" alt="${clip.imageAlt}" loading="lazy" width="480" height="270">
    </a>
    <div class="library-meta"><span>${formatEpisodeDate(clip.published)}</span></div>
    <h3><a href="${clip.url}" target="_blank" rel="noopener noreferrer">${clip.title}</a></h3>
    <p>${clip.guest}</p>
  </article>`).join('');

document.querySelector('[data-clips-playlist]').href = CLIPS_PLAYLIST_URL;
document.querySelector('[data-channel-link]').href = CHANNEL_URL;

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

let scrollFrame;
const syncScroll = () => {
  scrollFrame = undefined;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  header.classList.toggle('scrolled', window.scrollY > 24);
  scrollProgress.style.transform = `scaleX(${progress})`;
};
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScroll);
}, { passive: true });
syncScroll();
