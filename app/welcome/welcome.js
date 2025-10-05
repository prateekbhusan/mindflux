import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "react-router";
export function Welcome({ message, userId, initialMemories, }) {
    const [selectedClient, setSelectedClient] = useState("claude");
    const clients = [
        "claude",
        "cursor",
        "cline",
        "roo-cline",
        "windsurf",
        "witsy",
        "enconvo",
    ];
    const currentUrl = "https://mcp.mindflux.ai";
    const [memories, setMemories] = useState(initialMemories);
    const [isDeleting, setIsDeleting] = useState(null);
    const [isEditing, setIsEditing] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [countdown, setCountdown] = useState(30);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [restoreUrl, setRestoreUrl] = useState("");
    const [isRestoring, setIsRestoring] = useState(false);
    const fetcher = useFetcher();
    // Create a function to fetch data
    const fetchMemories = useCallback(() => {
        setIsRefreshing(true);
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("action", "fetch"); // Add action field for fetching
        fetcher.submit(formData, {
            method: "post",
            action: "/?index",
        });
        // Reset countdown when manually fetching
        setCountdown(30);
    }, [userId, fetcher]);
    // Function to delete a memory
    const deleteMemory = (memoryId) => {
        if (!memoryId)
            return;
        setIsDeleting(memoryId);
        // Updated to use useFetcher with action field
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("action", "delete");
        formData.append("memoryId", memoryId);
        fetcher
            .submit(formData, {
            method: "post",
            action: "/?index",
        })
            .then(() => {
            console.log(fetcher.data);
            if (fetcher.data.success === true) {
                setMemories((prev) => prev.filter((memory) => memory.id !== memoryId));
            }
        });
    };
    // Function to start editing a memory
    const startEditing = (memory) => {
        setIsEditing(memory.id);
        setEditedTitle(memory.title);
    };
    // Function to cancel editing
    const cancelEditing = () => {
        setIsEditing(null);
        setEditedTitle("");
    };
    // Function to restore a session from URL
    const restoreSession = async () => {
        if (!restoreUrl.trim()) {
            alert("Please enter a valid MCP URL");
            return;
        }
        setIsRestoring(true);
        try {
            // Extract userId from URL
            // Expected format: https://mcp.mindflux.ai/USER_ID/sse or similar
            const urlPattern = /\/([^\/]+)\/sse/;
            const match = restoreUrl.match(urlPattern);
            if (!match || !match[1]) {
                alert("Invalid URL format. Expected format: https://mcp.mindflux.ai/USER_ID/sse");
                setIsRestoring(false);
                return;
            }
            const extractedUserId = match[1];
            // Create form data for the restore action
            const formData = new FormData();
            formData.append("userId", extractedUserId);
            formData.append("action", "restore");
            fetcher.submit(formData, {
                method: "post",
                action: "/?index",
            });
            // Reset the input field
            setRestoreUrl("");
        }
        catch (error) {
            console.error("Error restoring session:", error);
            alert(`Failed to restore session: ${error instanceof Error ? error.message : String(error)}`);
        }
        finally {
            setIsRestoring(false);
        }
    };
    // Function to update a memory
    const updateMemory = (memoryId) => {
        if (!memoryId || !editedTitle.trim())
            return;
        // Create form data for the update
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("action", "update");
        formData.append("memoryId", memoryId);
        formData.append("content", editedTitle.trim());
        fetcher
            .submit(formData, {
            method: "post",
            action: "/?index",
        })
            .then(() => {
            if (fetcher.data.success) {
                // Update the memory in the local state
                setMemories((prev) => prev.map((memory) => memory.id === memoryId
                    ? { ...memory, title: editedTitle.trim() }
                    : memory));
            }
            // Reset editing state
            setIsEditing(null);
            setEditedTitle("");
        });
    };
    useEffect(() => {
        fetchMemories();
    }, []);
    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    fetchMemories();
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [fetchMemories]);
    // Handle fetcher data updates
    useEffect(() => {
        if (fetcher.data && fetcher.state === "idle") {
            // Handle successful response
            if (fetcher.data.memories) {
                setMemories(fetcher.data.memories);
            }
            // Handle error response
            if (fetcher.data.error) {
                console.error("Error with memory operation:", fetcher.data.error);
                alert(`Operation failed: ${fetcher.data.error}`);
            }
            // Reset deleting state if we were in the middle of a delete operation
            if (isDeleting) {
                setIsDeleting(null);
            }
            // Reset editing state if we were in the middle of an edit operation
            if (isEditing) {
                setIsEditing(null);
                setEditedTitle("");
            }
            // Reset refreshing state
            if (isRefreshing) {
                setIsRefreshing(false);
            }
        }
    }, [fetcher.data, fetcher.state]);
    return (_jsxs("main", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" }), _jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" }), _jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" })] }), _jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-[0.02]" }), _jsxs("header", { className: "relative w-full px-6 py-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "font-semibold text-white/90 text-lg", children: "mindflux" }), _jsx("span", { className: "text-blue-400 font-medium", children: "mcp" })] }), _jsxs("div", { className: "flex gap-8 text-sm", children: [_jsx("a", { href: "https://x.com/dhravyashah", className: "text-white/60 hover:text-white/90 transition-colors duration-300 hover:scale-105 transform", children: "X" }), _jsx("a", { href: "mailto:dhravya@mindflux.com", className: "text-white/60 hover:text-white/90 transition-colors duration-300 hover:scale-105 transform", children: "Contact us" })] })] }), _jsxs("div", { className: "relative w-full max-w-7xl mx-auto px-6 md:px-8 mt-12", children: [_jsxs("div", { className: "text-center mb-20", children: [_jsx("div", { className: "relative flex items-center justify-center gap-4 mb-8", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" }), _jsx("div", { className: "relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-3", children: _jsxs("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-medium", children: ["Powered by the", " ", _jsx("a", { href: "https://docs.mindflux.ai", className: "font-bold underline decoration-blue-400/50 hover:decoration-blue-400 transition-colors", children: "mindflux API" })] }) })] }) }), _jsxs("div", { className: "flex flex-wrap justify-center gap-4 mb-8", children: [_jsxs("a", { href: "https://mindflux.ai", className: "group relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 px-6 py-3 rounded-xl font-medium text-white/90 flex items-center gap-2", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400 group-hover:scale-110 transition-transform", children: _jsx("path", { d: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" }) }), _jsx("span", { className: "group-hover:scale-105 transform transition-transform", children: "Explore mindflux" })] }), _jsxs("a", { href: "https://docs.mindflux.ai", className: "group relative bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 px-6 py-3 rounded-xl font-medium text-white/90 flex items-center gap-2", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400 group-hover:scale-110 transition-transform", children: [_jsx("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }), _jsx("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })] }), _jsx("span", { className: "group-hover:scale-105 transform transition-transform", children: "API Documentation" })] })] }), _jsxs("h1", { className: "font-space-grotesk tracking-tight text-6xl font-bold mb-6", children: [_jsxs("span", { className: "text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/70", children: ["Your personal, universal", " "] }), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 italic", children: "memory" }), " ", "MCP"] }), _jsxs("p", { className: "text-lg text-white/60 mx-auto max-w-3xl leading-relaxed mb-8", children: ["Everyone is adding their own memory layer - ChatGPT, Gemini, etc. etc. Why not carry it around *with* you? Build your own memory-powered applications with the", _jsx("a", { href: "https://docs.mindflux.ai", className: "text-blue-400 hover:text-blue-300 font-medium underline decoration-blue-400/50 hover:decoration-blue-400 transition-colors mx-1", children: "mindflux API" }), "and join thousands of developers creating the future of personal AI."] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto", children: [_jsxs("div", { className: "text-center group", children: [_jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" }), _jsx("div", { className: "relative w-16 h-16 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400", children: [_jsx("path", { d: "M9 19c-5 0-8-3-8-6 0-3 3-6 8-6s8 3 8 6c0 3-3 6-8 6z" }), _jsx("path", { d: "M15 12h6" }), _jsx("path", { d: "M21 16l-3-4 3-4" })] }) })] }), _jsx("h3", { className: "font-semibold text-white/90 mb-2", children: "Universal Memory" }), _jsx("p", { className: "text-sm text-white/60", children: "Carry your context across all AI tools and applications" })] }), _jsxs("div", { className: "text-center group", children: [_jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-0 bg-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" }), _jsx("div", { className: "relative w-16 h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center border border-purple-500/30 mx-auto", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400", children: [_jsx("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }), _jsx("rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1" }), _jsx("path", { d: "M9 14l2 2 4-4" })] }) })] }), _jsx("h3", { className: "font-semibold text-white/90 mb-2", children: "Developer-First API" }), _jsx("p", { className: "text-sm text-white/60", children: "Simple, powerful API for building memory-enabled applications" })] }), _jsxs("div", { className: "text-center group", children: [_jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-0 bg-cyan-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" }), _jsx("div", { className: "relative w-16 h-16 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 mx-auto", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-cyan-400", children: _jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) }) })] }), _jsx("h3", { className: "font-semibold text-white/90 mb-2", children: "Lightning Fast" }), _jsx("p", { className: "text-sm text-white/60", children: "Optimized for speed with instant memory retrieval" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12", children: [_jsx("div", { className: "flex flex-col", children: _jsxs("div", { className: "relative group", children: [_jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" }), _jsxs("div", { className: "relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300", children: [_jsx("h2", { className: "text-2xl font-semibold mb-2 text-white/90", children: "Here's your MCP URL" }), _jsx("p", { className: "text-sm text-white/50 mb-8", children: "Keep this secret" }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "flex-1 bg-slate-950/80 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto", children: _jsxs("code", { className: "text-blue-300", children: [currentUrl, "/", userId, "/sse"] }) }), _jsx("button", { type: "button", className: "p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center rounded-xl group", onClick: () => {
                                                                        navigator.clipboard.writeText(`${currentUrl}/${userId}/sse`);
                                                                    }, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400 group-hover:scale-110 transition-transform", children: [_jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), _jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })] }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-4 text-white/80", children: "Install it using this command" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-white/60 mb-3 block", children: "Select Client:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: clients.map((client) => (_jsx("button", { type: "button", onClick: () => setSelectedClient(client), className: `px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg border ${selectedClient === client
                                                                                            ? "bg-blue-600/30 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-500/20"
                                                                                            : "bg-slate-800/50 border-white/10 text-white/70 hover:bg-slate-800/80 hover:border-white/20"}`, children: client }, client))) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "flex-1 bg-slate-950/80 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto", children: _jsxs("code", { className: "text-blue-300", children: ["npx install-mcp i ", currentUrl, "/", userId, "/sse --client ", selectedClient] }) }), _jsx("button", { type: "button", className: "p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center rounded-xl group", onClick: () => {
                                                                                        navigator.clipboard.writeText(`npx install-mcp i ${currentUrl}/${userId}/sse --client ${selectedClient}`);
                                                                                    }, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400 group-hover:scale-110 transition-transform", children: [_jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), _jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })] }) })] })] })] }), _jsxs("div", { className: "flex flex-col gap-4 pt-4", children: [_jsx("a", { href: "https://x.com/DhravyaShah/status/1912544778090414188", className: "w-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 text-center group", children: _jsx("span", { className: "group-hover:scale-105 transform inline-block transition-transform", children: "\uD83D\uDCFA See instruction video" }) }), _jsxs("a", { href: "https://docs.mindflux.ai", className: "w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400", children: [_jsx("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }), _jsx("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })] }), _jsx("span", { className: "group-hover:scale-105 transform inline-block transition-transform", children: "\uD83D\uDCDA Explore API Documentation" })] }), _jsxs("a", { href: "https://mindflux.ai", className: "w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 hover:from-orange-600/30 hover:to-red-600/30 border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-orange-400", children: _jsx("path", { d: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" }) }), _jsx("span", { className: "group-hover:scale-105 transform inline-block transition-transform", children: "\uD83D\uDE80 Visit mindflux.ai" })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-medium mb-4 text-white/80", children: "Restore previous session" }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("input", { type: "text", placeholder: "Paste MCP URL here", className: "w-full bg-slate-950/80 border border-white/10 focus:border-blue-500/50 rounded-xl p-4 font-mono text-sm text-blue-300 placeholder-white/40 focus:outline-none transition-all duration-300", onChange: (e) => setRestoreUrl(e.target.value), value: restoreUrl }), _jsx("button", { type: "button", onClick: restoreSession, disabled: isRestoring, className: "w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", children: isRestoring ? (_jsxs(_Fragment, { children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", children: _jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }) }), "Restoring..."] })) : ("Restore Session") })] })] })] })] })] })] }) }), _jsx("div", { className: "flex flex-col", children: _jsxs("div", { className: "relative group h-full", children: [_jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" }), _jsxs("div", { className: "relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 h-full hover:border-white/20 transition-all duration-300", children: [_jsxs("div", { className: "p-6 bg-slate-800/30 rounded-t-2xl flex justify-between items-center border-b border-white/10", children: [_jsx("h2", { className: "text-xl font-semibold text-white/90", children: "Memories" }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("span", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg", children: [memories.length, " items"] }) })] }), memories.length > 0 ? (_jsx("ul", { className: "max-h-[500px] overflow-y-auto", children: memories.map((memory, index) => (_jsx("li", { className: "px-6 py-4 hover:bg-slate-800/30 transition-all duration-300 border-b border-white/5 last:border-b-0 group/item", style: {
                                                            animationDelay: `${index * 50}ms`,
                                                            animation: 'fadeInUp 0.5s ease-out forwards'
                                                        }, children: _jsxs("div", { className: "flex flex-col gap-2", children: [isEditing === memory.id ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: editedTitle, onChange: (e) => setEditedTitle(e.target.value), className: "w-full bg-slate-950/80 border border-blue-500/50 rounded-lg px-3 py-2 text-sm text-white/90 focus:outline-none focus:border-blue-500", autoFocus: true }), _jsx("button", { type: "button", onClick: () => updateMemory(memory.id), className: "p-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-green-400 transition-all duration-300", title: "Save changes", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M20 6L9 17l-5-5" }) }) }), _jsx("button", { type: "button", onClick: cancelEditing, className: "p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 transition-all duration-300", title: "Cancel editing", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] })) : (_jsx("p", { className: "text-white/80 break-words text-sm leading-relaxed", children: memory.summary })), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "text-xs text-blue-400/80 font-mono bg-blue-500/10 px-2 py-1 rounded", children: ["ID: ", memory.id.substring(0, 8), "..."] }), _jsxs("div", { className: "opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex gap-1", children: [!isEditing && (_jsx("button", { type: "button", onClick: () => startEditing(memory), className: "p-2 hover:bg-blue-600/20 border border-transparent hover:border-blue-500/30 rounded-lg text-white/60 hover:text-blue-400 transition-all duration-300", title: "Edit memory", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), _jsx("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })] }) })), !isEditing && (_jsx("button", { type: "button", onClick: () => deleteMemory(memory.id), disabled: isDeleting === memory.id, className: "p-2 hover:bg-red-600/20 border border-transparent hover:border-red-500/30 rounded-lg text-white/60 hover:text-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed", title: "Delete memory", children: isDeleting === memory.id ? (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", children: _jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }) })) : (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("polyline", { points: "3 6 5 6 21 6" }), _jsx("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })] })) }))] })] })] }) }, memory.id))) })) : (_jsxs("div", { className: "py-20 text-center flex flex-col items-center", children: [_jsxs("div", { className: "relative mb-6", children: [_jsx("div", { className: "absolute inset-0 bg-blue-500/20 rounded-full blur-lg" }), _jsx("div", { className: "relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400", children: _jsx("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }) })] }), _jsx("h3", { className: "text-lg font-semibold mb-2 text-white/90", children: "No memories stored yet" }), _jsx("p", { className: "text-sm text-white/60 mb-6 max-w-sm", children: "Start using the MCP to create your first memory and see the power of universal context" }), _jsxs("div", { className: "flex flex-col gap-3 w-full max-w-xs", children: [_jsxs("a", { href: "https://docs.mindflux.ai", className: "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 px-4 py-3 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400", children: [_jsx("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }), _jsx("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })] }), _jsx("span", { className: "group-hover:scale-105 transform inline-block transition-transform text-sm", children: "Build something with the API" })] }), _jsxs("a", { href: "https://mindflux.ai", className: "bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 px-4 py-3 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400", children: _jsx("path", { d: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" }) }), _jsx("span", { className: "group-hover:scale-105 transform inline-block transition-transform text-sm", children: "Learn More" })] })] })] }))] })] }) })] })] })] }));
}
