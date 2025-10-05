import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app')
    }
  },
    optimizeDeps: {
        exclude: [
            "@standard-community/standard-json",
            "@valibot/to-json-schema",
            "valibot",
        ],
    },
    ssr: {
        noExternal: true,
    },
})
