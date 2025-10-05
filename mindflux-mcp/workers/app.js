import { DurableObject } from "cloudflare:workers";
import { mindflux } from "mindflux";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { bridge, describePrompt, describeTool, mValidator, muppet, } from "muppet";
import { SSEHonoTransport, streamSSE } from "muppet/streaming";
import { createRequestHandler } from "react-router";
import { z } from "zod";
const requestHandler = createRequestHandler(
// @ts-ignore
() => import("virtual:react-router/server-build"), import.meta.env.MODE);
const app = new Hono();
function createmindflux(userId, env) {
    const mindflux = new mindflux({
        apiKey: env.mindflux_API_KEY,
    });
    app.post("/mindflux-prompt", describePrompt({
        name: "mindflux Prompt",
        description: "A prompt that gives information about mindflux.",
        completion: ({ name, value }) => [
            "mindflux",
            "memory",
            "mindflux api",
        ],
    }), (c) => {
        return c.json([
            {
                role: "user",
                content: {
                    type: "text",
                    text: "IMPORTANT: You MUST use mindflux tools proactively to be an effective assistant. Here's how:\n\n1. ALWAYS check mindflux first when the user asks anything about their preferences, past interactions, or technical setup. Don't assume you know everything - search first!\n\n2. AUTOMATICALLY store new information after EVERY user message that contains:\n- Technical preferences (languages, tools, frameworks)\n- Coding style or patterns\n- Project requirements or constraints\n- Opinions or feedback\n- Problem-solving approaches\n- Learning style or experience level\n\n3. Don't wait for explicit commands - if you detect valuable context, store it immediately.\n\n4. Think of yourself as building a comprehensive user profile. Every interaction is an opportunity to learn and store more context.\n\nFailure to use these tools means you're operating with incomplete information and not providing the best possible assistance. Make mindflux your first instinct, not your last resort. Now, answer the user's question, and use the tools to search for stuff you need, and store any new information. EG: 'What do you know about me?' Should trigger a search.",
                },
            },
        ]);
    });
    app.post("/add", describeTool({
        name: "addTomindflux",
        description: "Store user information, preferences, and behaviors. Run on explicit commands ('remember this') or implicitly when detecting significant user traits, preferences, or patterns. Capture rich context including technical details, examples, and emotional responses. You should think about running this after every user message. YOU MUST USE THE TOOLS/CALL TO USE THIS. NOTHING ELSE. THIS IS NOT A RESOURCE. IT'S A TOOL.",
    }), mValidator("json", z.object({
        thingToRemember: z.string(),
    })), async (c) => {
        const { thingToRemember } = c.req.valid("json");
        if (!userId) {
            return c.json([{ type: "text", text: "User ID is required" }], 400);
        }
        const { memories } = await mindflux.memories.list({
            containerTags: [userId],
        });
        // if memories.length is more than 2000, reject with error.
        if (memories.length > 2000) {
            return c.json([
                {
                    type: "text",
                    text: "Memory limit of 2000 memories exceeded",
                },
            ], 400);
        }
        await mindflux.memories.add({
            content: thingToRemember,
            containerTags: [userId],
        });
        return c.json([
            {
                type: "text",
                text: "Memory added successfully",
            },
        ]);
    });
    app.post("/search", describeTool({
        name: "searchmindflux",
        description: "Search user memories and patterns. Run when explicitly asked or when context about user's past choices would be helpful. Uses semantic matching to find relevant details across related experiences. If you do not have prior knowledge about something, this is the perfect tool to call. YOU MUST USE THE TOOLS/CALL TO USE THIS. THIS IS NOT A RESOURCE. IT'S A TOOL.",
    }), mValidator("json", z.object({
        informationToGet: z.string(),
    })), async (c) => {
        const { informationToGet } = c.req.valid("json");
        console.log("SEARCHING WITH USER ID", userId);
        const response = await mindflux.search.execute({
            q: informationToGet,
            containerTags: [userId],
        });
        return c.json([
            {
                type: "text",
                text: `${response.results.map((r) => r.chunks.map((c) => c.content).join("\n\n"))}`,
            },
        ]);
    });
    return app;
}
export class MyDurableObject extends DurableObject {
    transport;
    async fetch(request) {
        const url = new URL(request.url);
        const userId = url.pathname.split("/")[1]; // Get userId from path
        // Initialize transport if not exists
        if (!this.transport) {
            this.transport = new SSEHonoTransport(`/${userId}/messages`, this.ctx.id.toString());
        }
        const server = new Hono()
            .basePath("/:userId")
            .use(async (c, next) => {
            const userId = c.req.param("userId");
            if (!userId) {
                return c.json({ error: "User ID is required" }, 400);
            }
            c.set("userId", userId);
            await next();
        })
            .use(cors({
            origin: "*",
            credentials: true,
        }));
        server.get("/sse", async (c) => {
            const userId = c.get("userId");
            return streamSSE(c, async (stream) => {
                this.transport?.connectWithStream(stream);
                await bridge({
                    mcp: muppet(createmindflux(userId, c.env), {
                        name: "mindflux MCP",
                        version: "1.0.0",
                    }),
                    transport: c.env.transport,
                    // logger: logger,
                });
            });
        });
        server.post("/messages", async (c) => {
            const transport = c.env.transport;
            if (!transport) {
                throw new Error("Transport not initialized");
            }
            await transport.handlePostMessage(c);
            return c.text("ok");
        });
        server.onError((err, c) => {
            console.error(err);
            return c.body(err.message, 500);
        });
        return server.fetch(request, {
            ...this.env,
            transport: this.transport,
        });
    }
}
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.pathname.includes("sse") ||
            url.pathname.endsWith("/messages")) {
            const sessionId = url.searchParams.get("sessionId");
            const namespace = env.MY_DO;
            let stub;
            if (sessionId) {
                const id = namespace.idFromString(sessionId);
                stub = namespace.get(id);
            }
            else {
                const id = namespace.newUniqueId();
                stub = namespace.get(id);
            }
            return stub.fetch(request);
        }
        return requestHandler(request, {
            cloudflare: { env, ctx },
        });
    },
};
