import { getLatestEpisode } from '../youtube-latest.js';

export default async function latestEpisode(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    const episode = await getLatestEpisode(process.env.YOUTUBE_API_KEY);
    if (!episode) {
      res.statusCode = 404;
      res.setHeader('Cache-Control', 'no-store');
      return res.end(JSON.stringify({ error: 'No public full episode found' }));
    }

    res.statusCode = 200;
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
    return res.end(JSON.stringify(episode));
  } catch (error) {
    console.error('[latest-episode]', error.message);
    res.statusCode = process.env.YOUTUBE_API_KEY ? 502 : 503;
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ error: 'Could not load the latest episode' }));
  }
}
