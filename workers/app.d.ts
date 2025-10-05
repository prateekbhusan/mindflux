import { DurableObject } from "cloudflare:workers";
import { SSEHonoTransport } from "muppet/streaming";
declare module "react-router" {
    interface AppLoadContext {
        cloudflare: {
            env: Env;
            ctx: ExecutionContext;
        };
    }
}
export declare class MyDurableObject extends DurableObject<Env> {
    transport?: SSEHonoTransport;
    fetch(request: Request): Promise<Response>;
}
declare const _default: {
    fetch(request: Request): Promise<Response>;
};
export default _default;
