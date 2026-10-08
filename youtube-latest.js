const PLAYLIST_ID = 'PLCi-ERnXUfiP64UH19ClGA6IQ_tpkZzzS';
const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3';
const EXCLUDED_WORDS = /\b(shorts?|clips?|trailer|teaser|promo|preview)\b/i;

const durationInSeconds = (duration = '') => {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
};

async function youtubeRequest(resource, params, apiKey) {
  const query = new URLSearchParams({ ...params, key: apiKey });
  const response = await fetch(`${YOUTUBE_API}/${resource}?${query}`, {
    signal: AbortSignal.timeout(8000)
  });
  const payload = await response.json();
  if (!response.ok) {
    const reason = payload?.error?.errors?.[0]?.reason || 'youtube_api_error';
    throw new Error(`YouTube Data API request failed: ${reason}`);
  }
  return payload;
}

export async function getLatestEpisode(apiKey) {
  if (!apiKey) throw new Error('YouTube Data API key is missing');

  const playlistItems = [];
  let pageToken;
  do {
    const page = await youtubeRequest('playlistItems', {
      part: 'contentDetails',
      playlistId: PLAYLIST_ID,
      maxResults: '50',
      ...(pageToken ? { pageToken } : {})
    }, apiKey);
    playlistItems.push(...(page.items || []));
    pageToken = page.nextPageToken;
  } while (pageToken);

  const videoIds = [...new Set(playlistItems.map(item => item.contentDetails?.videoId).filter(Boolean))];
  const batches = [];
  for (let index = 0; index < videoIds.length; index += 50) {
    batches.push(videoIds.slice(index, index + 50));
  }

  const videoPages = await Promise.all(batches.map(batch => youtubeRequest('videos', {
    part: 'snippet,contentDetails,status',
    id: batch.join(',')
  }, apiKey)));
  const videos = videoPages.flatMap(page => page.items || []);
  const latest = videos
    .filter(video => {
      const title = video.snippet?.title || '';
      const tags = (video.snippet?.tags || []).join(' ');
      return durationInSeconds(video.contentDetails?.duration) >= 60
        && !EXCLUDED_WORDS.test(title)
        && !EXCLUDED_WORDS.test(tags)
        && video.status?.privacyStatus === 'public'
        && video.snippet?.liveBroadcastContent === 'none';
    })
    .sort((a, b) => Date.parse(b.snippet.publishedAt) - Date.parse(a.snippet.publishedAt))[0];

  if (!latest) return null;

  const thumbnails = latest.snippet.thumbnails || {};
  const thumbnail = thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default;
  return {
    id: latest.id,
    title: latest.snippet.title,
    description: latest.snippet.description || '',
    publishedAt: latest.snippet.publishedAt,
    duration: latest.contentDetails.duration,
    thumbnail: thumbnail?.url || `https://i.ytimg.com/vi/${latest.id}/hqdefault.jpg`
  };
}
