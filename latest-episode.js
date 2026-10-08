const formatDuration = (isoDuration = '') => {
  const match = isoDuration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return '';
  const [, hours = '0', minutes = '0', seconds = '0'] = match;
  return Number(hours) > 0
    ? `${Number(hours)}:${String(Number(minutes)).padStart(2, '0')}:${String(Number(seconds)).padStart(2, '0')}`
    : `${Number(minutes)}:${String(Number(seconds)).padStart(2, '0')}`;
};

const truncateDescription = (description = '') => {
  const plainText = description.replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
  if (plainText.length <= 360) return plainText;
  return `${plainText.slice(0, 357).trimEnd()}…`;
};

export async function updateLatestEpisodes() {
  const cards = document.querySelectorAll('[data-latest-card]');
  if (!cards.length) return;

  try {
    const response = await fetch('/api/latest-episode', {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) return;

    const episode = await response.json();
    if (!episode.id || !episode.title || !episode.thumbnail) return;

    const url = `https://www.youtube.com/watch?v=${encodeURIComponent(episode.id)}`;
    const summary = truncateDescription(episode.description);
    const publishedAt = new Date(episode.publishedAt);
    const formattedDuration = formatDuration(episode.duration);

    cards.forEach(card => {
      const title = card.querySelector('[data-latest-title]');
      const image = card.querySelector('[data-latest-thumbnail]');
      const description = card.querySelector('[data-latest-description]');
      const guest = card.querySelector('[data-latest-guest]');

      if (title) {
        title.textContent = episode.title;
        title.setAttribute('content', episode.title);
      }
      if (image) {
        image.src = episode.thumbnail;
        image.alt = `Thumbnail for ${episode.title}`;
      }

      card.querySelectorAll('[data-latest-link]').forEach(link => {
        link.href = url;
        if (link.classList.contains('feature-visual') || link.classList.contains('episodes-feature-visual')) {
          link.setAttribute('aria-label', `Watch ${episode.title} on YouTube`);
        }
      });

      if (description) {
        description.textContent = summary;
        description.hidden = !summary;
      }
      if (guest) guest.hidden = true;

      card.querySelectorAll('[data-latest-date]').forEach(date => {
        if (episode.publishedAt && !Number.isNaN(publishedAt.valueOf())) {
          date.dateTime = publishedAt.toISOString().slice(0, 10);
          date.textContent = new Intl.DateTimeFormat(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
          }).format(publishedAt);
          date.hidden = false;
        } else {
          date.hidden = true;
        }
      });

      card.querySelectorAll('[data-latest-duration]').forEach(duration => {
        duration.textContent = formattedDuration;
        duration.hidden = !formattedDuration;
      });
    });
  } catch {
    // Keep the verified static episode card intact if the API is unavailable.
  }
}
