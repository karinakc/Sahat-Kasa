import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import latestEpisode from './api/latest-episode.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (!process.env.YOUTUBE_API_KEY && env.YOUTUBE_API_KEY) {
    process.env.YOUTUBE_API_KEY = env.YOUTUBE_API_KEY;
  }

  return {
    plugins: [{
      name: 'local-latest-episode-function',
      configureServer(server) {
        server.middlewares.use('/api/latest-episode', (req, res) => {
          latestEpisode(req, res);
        });
      }
    }],
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('index.html', import.meta.url)),
          recommend: fileURLToPath(new URL('recommend.html', import.meta.url)),
          episodes: fileURLToPath(new URL('episodes/index.html', import.meta.url)),
          about: fileURLToPath(new URL('about/index.html', import.meta.url)),
          community: fileURLToPath(new URL('community/index.html', import.meta.url))
        }
      }
    }
  };
});
