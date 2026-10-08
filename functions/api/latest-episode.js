import { getLatestEpisode } from '../../youtube-latest.js';

const jsonResponse = (payload, status, cacheControl = 'no-store') => new Response(JSON.stringify(payload), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': cacheControl
  }
});

export async function onRequestGet(context) {
  const cacheKey = new Request(new URL('/api/latest-episode', context.request.url).toString());
  const cache = caches.default;

  try {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  } catch {
    // Cache failures should not prevent a live lookup.
  }

  if (!context.env.YOUTUBE_API_KEY) {
    return jsonResponse({ error: 'Latest episode service is not configured' }, 503);
  }

  try {
    const episode = await getLatestEpisode(context.env.YOUTUBE_API_KEY);
    if (!episode) return jsonResponse({ error: 'No public full episode found' }, 404);

    const response = jsonResponse(episode, 200, 'public, max-age=3600');
    context.waitUntil(cache.put(cacheKey, response.clone()).catch(() => {}));
    return response;
  } catch (error) {
    console.error('[latest-episode]', error.message);
    return jsonResponse({ error: 'Could not load the latest episode' }, 502);
  }
}
