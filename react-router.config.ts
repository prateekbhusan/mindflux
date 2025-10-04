import type { Config } from "@react-router/dev/config"

export function getLoadContext(ctx: {
  env: any;
  cf: any;
  ctx: any;
}) {
  return {
    ...ctx,
  };
}

export default {
    ssr: true,
    future: {
        unstable_viteEnvironmentApi: true,
        unstable_optimizeDeps: true,
        unstable_splitRouteModules: true,
    },
} satisfies Config
