import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, } from "react-router";
import "./app.css";
export const links = () => [
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
];
export function Layout({ children }) {
    return (_jsxs("html", { lang: "en", className: "dark", children: [_jsxs("head", { children: [_jsx("meta", { charSet: "utf-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx(Meta, {}), _jsx(Links, {})] }), _jsxs("body", { children: [_jsx("main", { className: "grow", children: children }), _jsx(ScrollRestoration, {}), _jsx(Scripts, {})] })] }));
}
export default function App() {
    return _jsx(Outlet, {});
}
export function ErrorBoundary({ error }) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack;
    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    }
    else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }
    return (_jsxs("main", { className: "pt-16 p-4 container mx-auto", children: [_jsx("h1", { children: message }), _jsx("p", { children: details }), stack && (_jsx("pre", { className: "w-full p-4 overflow-x-auto", children: _jsx("code", { children: stack }) }))] }));
}
