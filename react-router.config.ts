import { defineConfig } from '@react-router/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    adapter: 'vercel',
    build: true
  },
  appDirectory: 'app',
  serverMinify: false
});
