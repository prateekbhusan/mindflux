export function getLoadContext(ctx) {
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
};
