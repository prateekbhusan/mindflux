import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
    },
]

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <main className="grow">{children}</main>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!"
    let details = "An unexpected error occurred."
    let stack: string | undefined
    let errorObj = error as Error;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error"
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details
    } else if (error && errorObj instanceof Error) {
        details = errorObj.message
        stack = errorObj.stack
        console.error('Application Error:', error);
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white/90 flex flex-col items-center justify-center p-4">
            <div className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h1 className="text-3xl font-bold mb-4">{message}</h1>
                <p className="text-white/60 mb-4">{details}</p>
                {stack && (
                    <pre className="bg-slate-950/80 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-white/70">
                        <code>{stack}</code>
                    </pre>
                )}
            </div>
        </main>
    )
}
