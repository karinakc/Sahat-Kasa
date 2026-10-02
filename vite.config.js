import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
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
});
