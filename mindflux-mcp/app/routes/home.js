import { mindflux } from "mindflux";
import { nanoid } from "nanoid";
import { data } from "react-router";
import { commitSession, getSession } from "~/session-cookies.server";
import { Welcome } from "../welcome/welcome";
export function meta() {
    return [
        { title: "mindflux MCP" },
        { name: "description", content: "Universal Memory MCP" },
        // og image
        { name: "og:image", content: "/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        // twitter large image
        { name: "twitter:image", content: "/og-image.png" },
        // apple touch icons
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "57x57",
            href: "/icons/apple-icon-57x57.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "60x60",
            href: "/icons/apple-icon-60x60.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "72x72",
            href: "/icons/apple-icon-72x72.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "76x76",
            href: "/icons/apple-icon-76x76.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "114x114",
            href: "/icons/apple-icon-114x114.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "120x120",
            href: "/icons/apple-icon-120x120.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "144x144",
            href: "/icons/apple-icon-144x144.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "152x152",
            href: "/icons/apple-icon-152x152.png",
        },
        {
            tagName: "link",
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/icons/apple-icon-180x180.png",
        },
        // favicons
        {
            tagName: "link",
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "/icons/android-icon-192x192.png",
        },
        {
            tagName: "link",
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/icons/favicon-32x32.png",
        },
        {
            tagName: "link",
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "/icons/favicon-96x96.png",
        },
        {
            tagName: "link",
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/icons/favicon-16x16.png",
        },
        // manifest and theme
        { tagName: "link", rel: "manifest", href: "/icons/manifest.json" },
        { name: "msapplication-TileColor", content: "#ffffff" },
        {
            name: "msapplication-TileImage",
            content: "/icons/ms-icon-144x144.png",
        },
        { name: "theme-color", content: "#ffffff" },
    ];
}
export async function loader({ request, context }) {
    const cookies = request.headers.get("Cookie");
    const session = await getSession(cookies);
    const mindflux = new mindflux({
        apiKey: context.cloudflare.env.mindflux_API_KEY,
    });
    if (session.has("userId")) {
        const userId = session.get("userId");
        const memories = (await mindflux.memories.list({
            limit: "2000",
            containerTags: [userId]
        })).memories;
        console.log("memories", memories);
        return data({
            message: "Welcome back!",
            userId,
            memories,
        });
    }
    session.set("userId", nanoid());
    const userId = session.get("userId");
    return data({
        message: "Welcome to mindflux MCP!",
        userId,
        memories: [],
    }, {
        headers: {
            "Set-Cookie": await commitSession(session, {
                expires: new Date("9999-12-31"),
            }),
        },
    });
}
export async function action({ request, context, }) {
    const formData = await request.formData();
    const userId = formData.get("userId");
    const actionType = formData.get("action");
    if (!userId) {
        return data({ error: "User ID is required" }, { status: 400 });
    }
    console.log(context.cloudflare.env.mindflux_API_KEY);
    const mindflux = new mindflux({
        apiKey: context.cloudflare.env.mindflux_API_KEY,
    });
    try {
        // Handle different action types
        switch (actionType) {
            case "fetch":
                // Just return the memories
                return data({
                    success: true,
                    memories: (await mindflux.memories.list({
                        limit: "2000",
                        containerTags: [userId]
                    })).memories,
                });
            // case "add":
            //   const content = formData.get("content") as string;
            //   if (content) {
            //     await mindflux.memory.create({
            //       content
            //     });
            //   }
            //   return data({ success: true, memories: (await mindflux.memory.list({
            //     limit: "2000",
            //   })).memories });
            case "delete": {
                const memoryId = formData.get("memoryId");
                if (!memoryId) {
                    return data({ error: "Memory ID is required" }, { status: 400 });
                }
                // Delete from mindflux API
                try {
                    console.log("deleting", await mindflux.memories.get(memoryId));
                    await mindflux.memories.delete(memoryId);
                    // Update user data
                    return data({
                        success: true,
                        message: "Memory deleted successfully",
                        memories: (await mindflux.memories.list({
                            limit: "2000",
                            containerTags: [userId]
                        })).memories,
                    });
                }
                catch (error) {
                    console.error("Error deleting memory:", error);
                    return data({
                        error: `Error deleting memory: ${error instanceof Error
                            ? error.message
                            : String(error)}`,
                    }, { status: 500 });
                }
            }
            case "update": {
                const memoryId = formData.get("memoryId");
                const content = formData.get("content");
                if (!memoryId) {
                    return data({ error: "Memory ID is required" }, { status: 400 });
                }
                // Update from mindflux API
                try {
                    console.log("updating", await mindflux.memories.get(memoryId));
                    await mindflux.memories.update(memoryId, { content });
                    // Update user data
                    return data({
                        success: true,
                        message: "Memory updated successfully",
                        memories: (await mindflux.memories.list({
                            limit: "2000",
                            containerTags: [userId],
                        })).memories,
                    });
                }
                catch (error) {
                    console.error("Error updating memory:", error);
                    return data({
                        error: `Error updating memory: ${error instanceof Error
                            ? error.message
                            : String(error)}`,
                    }, { status: 500 });
                }
            }
            case "restore": {
                const cookies = request.headers.get("Cookie");
                const session = await getSession(cookies);
                // Set the userId in the session
                session.set("userId", userId);
                // Get memories for the restored userId
                const memories = (await mindflux.memories.list({
                    limit: "2000",
                    containerTags: [userId]
                })).memories;
                return data({
                    success: true,
                    message: "Session restored successfully",
                    userId,
                    memories,
                }, {
                    headers: {
                        "Set-Cookie": await commitSession(session, {
                            expires: new Date("9999-12-31"),
                        }),
                    },
                });
            }
            default:
                return data({ error: "Invalid action type" }, { status: 400 });
        }
    }
    catch (error) {
        console.error("Error processing memory action:", error);
        return data({ error: "Failed to process memory action" }, { status: 500 });
    }
}
export default function Home({ loaderData }) {
    return (<Welcome message={loaderData.message} userId={loaderData.userId} initialMemories={loaderData.memories}/>);
}
