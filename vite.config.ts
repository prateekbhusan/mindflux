import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
  ],
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
