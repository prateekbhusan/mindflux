import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  useFetcher
} from "/build/_shared/chunk-AY22ZEZR.js";
import {
  createHotContext
} from "/build/_shared/chunk-JGBKMAJC.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:../session-cookies.server
var require_session_cookies = __commonJS({
  "empty-module:../session-cookies.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/home.tsx
var import_session_cookies = __toESM(require_session_cookies(), 1);

// app/welcome/welcome.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\welcome\\\\welcome.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\welcome\\welcome.tsx"
  );
  import.meta.hot.lastModified = "1759640759372.5032";
}
function Welcome({
  message,
  userId,
  initialMemories
}) {
  _s();
  const [selectedClient, setSelectedClient] = (0, import_react.useState)("claude");
  const clients = ["claude", "cursor", "cline", "roo-cline", "windsurf", "witsy", "enconvo"];
  const currentUrl = "https://mcp.mindflux.ai";
  const [memories, setMemories] = (0, import_react.useState)(initialMemories);
  const [isDeleting, setIsDeleting] = (0, import_react.useState)(null);
  const [isEditing, setIsEditing] = (0, import_react.useState)(null);
  const [editedTitle, setEditedTitle] = (0, import_react.useState)("");
  const [countdown, setCountdown] = (0, import_react.useState)(30);
  const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
  const [restoreUrl, setRestoreUrl] = (0, import_react.useState)("");
  const [isRestoring, setIsRestoring] = (0, import_react.useState)(false);
  const fetcher = useFetcher();
  const fetchMemories = (0, import_react.useCallback)(() => {
    setIsRefreshing(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("action", "fetch");
    fetcher.submit(formData, {
      method: "post",
      action: "/?index"
    });
    setCountdown(30);
  }, [userId, fetcher]);
  const deleteMemory = (memoryId) => {
    if (!memoryId)
      return;
    setIsDeleting(memoryId);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("action", "delete");
    formData.append("memoryId", memoryId);
    fetcher.submit(formData, {
      method: "post",
      action: "/?index"
    }).then(() => {
      console.log(fetcher.data);
      if (fetcher.data.success === true) {
        setMemories((prev) => prev.filter((memory) => memory.id !== memoryId));
      }
    });
  };
  const startEditing = (memory) => {
    setIsEditing(memory.id);
    setEditedTitle(memory.title);
  };
  const cancelEditing = () => {
    setIsEditing(null);
    setEditedTitle("");
  };
  const restoreSession = async () => {
    if (!restoreUrl.trim()) {
      alert("Please enter a valid MCP URL");
      return;
    }
    setIsRestoring(true);
    try {
      const urlPattern = /\/([^\/]+)\/sse/;
      const match = restoreUrl.match(urlPattern);
      if (!match || !match[1]) {
        alert("Invalid URL format. Expected format: https://mcp.mindflux.ai/USER_ID/sse");
        setIsRestoring(false);
        return;
      }
      const extractedUserId = match[1];
      const formData = new FormData();
      formData.append("userId", extractedUserId);
      formData.append("action", "restore");
      fetcher.submit(formData, {
        method: "post",
        action: "/?index"
      });
      setRestoreUrl("");
    } catch (error) {
      console.error("Error restoring session:", error);
      alert(`Failed to restore session: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRestoring(false);
    }
  };
  const updateMemory = (memoryId) => {
    if (!memoryId || !editedTitle.trim())
      return;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("action", "update");
    formData.append("memoryId", memoryId);
    formData.append("content", editedTitle.trim());
    fetcher.submit(formData, {
      method: "post",
      action: "/?index"
    }).then(() => {
      if (fetcher.data.success) {
        setMemories((prev) => prev.map((memory) => memory.id === memoryId ? {
          ...memory,
          title: editedTitle.trim()
        } : memory));
      }
      setIsEditing(null);
      setEditedTitle("");
    });
  };
  (0, import_react.useEffect)(() => {
    fetchMemories();
  }, []);
  (0, import_react.useEffect)(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchMemories();
          return 30;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, [fetchMemories]);
  (0, import_react.useEffect)(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.memories) {
        setMemories(fetcher.data.memories);
      }
      if (fetcher.data.error) {
        console.error("Error with memory operation:", fetcher.data.error);
        alert(`Operation failed: ${fetcher.data.error}`);
      }
      if (isDeleting) {
        setIsDeleting(null);
      }
      if (isEditing) {
        setIsEditing(null);
        setEditedTitle("");
      }
      if (isRefreshing) {
        setIsRefreshing(false);
      }
    }
  }, [fetcher.data, fetcher.state]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" }, void 0, false, {
        fileName: "app/welcome/welcome.tsx",
        lineNumber: 200,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" }, void 0, false, {
        fileName: "app/welcome/welcome.tsx",
        lineNumber: 201,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" }, void 0, false, {
        fileName: "app/welcome/welcome.tsx",
        lineNumber: 202,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/welcome/welcome.tsx",
      lineNumber: 199,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-grid-pattern opacity-[0.02]" }, void 0, false, {
      fileName: "app/welcome/welcome.tsx",
      lineNumber: 206,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { className: "relative w-full px-6 py-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-semibold text-white/90 text-lg", children: "mindflux" }, void 0, false, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 211,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-400 font-medium", children: "mcp" }, void 0, false, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 212,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/welcome/welcome.tsx",
        lineNumber: 210,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-8 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://x.com/dhravyashah", className: "text-white/60 hover:text-white/90 transition-colors duration-300 hover:scale-105 transform", children: "X" }, void 0, false, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 215,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "mailto:dhravya@mindflux.com", className: "text-white/60 hover:text-white/90 transition-colors duration-300 hover:scale-105 transform", children: "Contact us" }, void 0, false, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 218,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/welcome/welcome.tsx",
        lineNumber: 214,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/welcome/welcome.tsx",
      lineNumber: 209,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-full max-w-7xl mx-auto px-6 md:px-8 mt-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center mb-20", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative flex items-center justify-center gap-4 mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" }, void 0, false, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 229,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-medium", children: [
            "Powered by the",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://docs.mindflux.ai", className: "font-bold underline decoration-blue-400/50 hover:decoration-blue-400 transition-colors", children: "mindflux API" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 233,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 231,
            columnNumber: 33
          }, this) }, void 0, false, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 230,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 228,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 227,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap justify-center gap-4 mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://mindflux.ai", className: "group relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 px-6 py-3 rounded-xl font-medium text-white/90 flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 245,
              columnNumber: 33
            }, this) }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 244,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "group-hover:scale-105 transform transition-transform", children: "Explore mindflux" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 247,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 243,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://docs.mindflux.ai", className: "group relative bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 px-6 py-3 rounded-xl font-medium text-white/90 flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400 group-hover:scale-110 transition-transform", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 253,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 254,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 252,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "group-hover:scale-105 transform transition-transform", children: "API Documentation" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 256,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 251,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 242,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "font-space-grotesk tracking-tight text-6xl font-bold mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/70", children: [
            "Your personal, universal",
            " "
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 262,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 italic", children: "memory" }, void 0, false, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 265,
            columnNumber: 25
          }, this),
          " ",
          "MCP"
        ] }, void 0, true, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 261,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg text-white/60 mx-auto max-w-3xl leading-relaxed mb-8", children: [
          "Everyone is adding their own memory layer - ChatGPT, Gemini, etc. etc. Why not carry it around *with* you? Build your own memory-powered applications with the",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://docs.mindflux.ai", className: "text-blue-400 hover:text-blue-300 font-medium underline decoration-blue-400/50 hover:decoration-blue-400 transition-colors mx-1", children: "mindflux API" }, void 0, false, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 273,
            columnNumber: 25
          }, this),
          "and join thousands of developers creating the future of personal AI."
        ] }, void 0, true, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 270,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center group", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 283,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-16 h-16 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M9 19c-5 0-8-3-8-6 0-3 3-6 8-6s8 3 8 6c0 3-3 6-8 6z" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 286,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M15 12h6" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 287,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M21 16l-3-4 3-4" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 288,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 285,
                columnNumber: 37
              }, this) }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 284,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 282,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-semibold text-white/90 mb-2", children: "Universal Memory" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 292,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-white/60", children: "Carry your context across all AI tools and applications" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 293,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 281,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center group", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 298,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-16 h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center border border-purple-500/30 mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 301,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 302,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M9 14l2 2 4-4" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 303,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 300,
                columnNumber: 37
              }, this) }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 299,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 297,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-semibold text-white/90 mb-2", children: "Developer-First API" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 307,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-white/60", children: "Simple, powerful API for building memory-enabled applications" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 308,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 296,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center group", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-cyan-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 313,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-16 h-16 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-cyan-400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 316,
                columnNumber: 41
              }, this) }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 315,
                columnNumber: 37
              }, this) }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 314,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 312,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-semibold text-white/90 mb-2", children: "Lightning Fast" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 320,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-white/60", children: "Optimized for speed with instant memory retrieval" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 321,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 311,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 280,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/welcome/welcome.tsx",
        lineNumber: 226,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" }, void 0, false, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 330,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold mb-2 text-white/90", children: "Here's your MCP URL" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 332,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-white/50 mb-8", children: "Keep this secret" }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 335,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-8", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 bg-slate-950/80 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { className: "text-blue-300", children: [
                  currentUrl,
                  "/",
                  userId,
                  "/sse"
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 340,
                  columnNumber: 45
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 339,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center rounded-xl group", onClick: () => {
                  navigator.clipboard.writeText(`${currentUrl}/${userId}/sse`);
                }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400 group-hover:scale-110 transition-transform", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 348,
                    columnNumber: 49
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 349,
                    columnNumber: 49
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 347,
                  columnNumber: 45
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 344,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 338,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4 text-white/80", children: "Install it using this command" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 355,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "text-sm text-white/60 mb-3 block", children: "Select Client:" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 360,
                      columnNumber: 49
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: clients.map((client) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setSelectedClient(client), className: `px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg border ${selectedClient === client ? "bg-blue-600/30 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-500/20" : "bg-slate-800/50 border-white/10 text-white/70 hover:bg-slate-800/80 hover:border-white/20"}`, children: client }, client, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 364,
                      columnNumber: 76
                    }, this)) }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 363,
                      columnNumber: 49
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 359,
                    columnNumber: 45
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 bg-slate-950/80 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { className: "text-blue-300", children: [
                      "npx install-mcp i ",
                      currentUrl,
                      "/",
                      userId,
                      "/sse --client ",
                      selectedClient
                    ] }, void 0, true, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 371,
                      columnNumber: 53
                    }, this) }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 370,
                      columnNumber: 49
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center rounded-xl group", onClick: () => {
                      navigator.clipboard.writeText(`npx install-mcp i ${currentUrl}/${userId}/sse --client ${selectedClient}`);
                    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400 group-hover:scale-110 transition-transform", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }, void 0, false, {
                        fileName: "app/welcome/welcome.tsx",
                        lineNumber: 379,
                        columnNumber: 57
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" }, void 0, false, {
                        fileName: "app/welcome/welcome.tsx",
                        lineNumber: 380,
                        columnNumber: 57
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 378,
                      columnNumber: 53
                    }, this) }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 375,
                      columnNumber: 49
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 369,
                    columnNumber: 45
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 358,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 354,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-4 pt-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://x.com/DhravyaShah/status/1912544778090414188", className: "w-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 text-center group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "group-hover:scale-105 transform inline-block transition-transform", children: "\u{1F4FA} See instruction video" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 389,
                  columnNumber: 45
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 388,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://docs.mindflux.ai", className: "w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 396,
                      columnNumber: 49
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 397,
                      columnNumber: 49
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 395,
                    columnNumber: 45
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "group-hover:scale-105 transform inline-block transition-transform", children: "\u{1F4DA} Explore API Documentation" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 399,
                    columnNumber: 45
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 394,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://mindflux.ai", className: "w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 hover:from-orange-600/30 hover:to-red-600/30 border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-orange-400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 406,
                    columnNumber: 49
                  }, this) }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 405,
                    columnNumber: 45
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "group-hover:scale-105 transform inline-block transition-transform", children: "\u{1F680} Visit mindflux.ai" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 408,
                    columnNumber: 45
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 404,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4 text-white/80", children: "Restore previous session" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 414,
                    columnNumber: 45
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Paste MCP URL here", className: "w-full bg-slate-950/80 border border-white/10 focus:border-blue-500/50 rounded-xl p-4 font-mono text-sm text-blue-300 placeholder-white/40 focus:outline-none transition-all duration-300", onChange: (e) => setRestoreUrl(e.target.value), value: restoreUrl }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 418,
                      columnNumber: 49
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: restoreSession, disabled: isRestoring, className: "w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 p-4 rounded-xl font-medium text-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", children: isRestoring ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }, void 0, false, {
                        fileName: "app/welcome/welcome.tsx",
                        lineNumber: 422,
                        columnNumber: 65
                      }, this) }, void 0, false, {
                        fileName: "app/welcome/welcome.tsx",
                        lineNumber: 421,
                        columnNumber: 61
                      }, this),
                      "Restoring..."
                    ] }, void 0, true, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 420,
                      columnNumber: 68
                    }, this) : "Restore Session" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 419,
                      columnNumber: 49
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 417,
                    columnNumber: 45
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 413,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 387,
                columnNumber: 37
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 337,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 331,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 329,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 328,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative group h-full", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" }, void 0, false, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 438,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 h-full hover:border-white/20 transition-all duration-300", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 bg-slate-800/30 rounded-t-2xl flex justify-between items-center border-b border-white/10", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-white/90", children: "Memories" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 441,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg", children: [
                memories.length,
                " items"
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 443,
                columnNumber: 41
              }, this) }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 442,
                columnNumber: 37
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 440,
              columnNumber: 33
            }, this),
            memories.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "max-h-[500px] overflow-y-auto", children: memories.map((memory, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "px-6 py-4 hover:bg-slate-800/30 transition-all duration-300 border-b border-white/5 last:border-b-0 group/item", style: {
              animationDelay: `${index * 50}ms`,
              animation: "fadeInUp 0.5s ease-out forwards"
            }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-2", children: [
              isEditing === memory.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", value: editedTitle, onChange: (e) => setEditedTitle(e.target.value), className: "w-full bg-slate-950/80 border border-blue-500/50 rounded-lg px-3 py-2 text-sm text-white/90 focus:outline-none focus:border-blue-500", autoFocus: true }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 456,
                  columnNumber: 61
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => updateMemory(memory.id), className: "p-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-green-400 transition-all duration-300", title: "Save changes", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M20 6L9 17l-5-5" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 459,
                  columnNumber: 69
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 458,
                  columnNumber: 65
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 457,
                  columnNumber: 61
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: cancelEditing, className: "p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 transition-all duration-300", title: "Cancel editing", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 464,
                    columnNumber: 69
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", { x1: "6", y1: "6", x2: "18", y2: "18" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 465,
                    columnNumber: 69
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 463,
                  columnNumber: 65
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 462,
                  columnNumber: 61
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 455,
                columnNumber: 80
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white/80 break-words text-sm leading-relaxed", children: memory.summary }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 468,
                columnNumber: 66
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-xs text-blue-400/80 font-mono bg-blue-500/10 px-2 py-1 rounded", children: [
                  "ID: ",
                  memory.id.substring(0, 8),
                  "..."
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 472,
                  columnNumber: 57
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex gap-1", children: [
                  !isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => startEditing(memory), className: "p-2 hover:bg-blue-600/20 border border-transparent hover:border-blue-500/30 rounded-lg text-white/60 hover:text-blue-400 transition-all duration-300", title: "Edit memory", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 478,
                      columnNumber: 73
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 479,
                      columnNumber: 73
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 477,
                    columnNumber: 69
                  }, this) }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 476,
                    columnNumber: 76
                  }, this),
                  !isEditing && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => deleteMemory(memory.id), disabled: isDeleting === memory.id, className: "p-2 hover:bg-red-600/20 border border-transparent hover:border-red-500/30 rounded-lg text-white/60 hover:text-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed", title: "Delete memory", children: isDeleting === memory.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 484,
                    columnNumber: 77
                  }, this) }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 483,
                    columnNumber: 97
                  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polyline", { points: "3 6 5 6 21 6" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 486,
                      columnNumber: 77
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 487,
                      columnNumber: 77
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 485,
                    columnNumber: 82
                  }, this) }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 482,
                    columnNumber: 76
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 475,
                  columnNumber: 57
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 471,
                columnNumber: 53
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 454,
              columnNumber: 49
            }, this) }, memory.id, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 450,
              columnNumber: 74
            }, this)) }, void 0, false, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 449,
              columnNumber: 56
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-20 text-center flex flex-col items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative mb-6", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-blue-500/20 rounded-full blur-lg" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 496,
                  columnNumber: 45
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 499,
                  columnNumber: 53
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 498,
                  columnNumber: 49
                }, this) }, void 0, false, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 497,
                  columnNumber: 45
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 495,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-semibold mb-2 text-white/90", children: "No memories stored yet" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 503,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-white/60 mb-6 max-w-sm", children: "Start using the MCP to create your first memory and see the power of universal context" }, void 0, false, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 506,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-3 w-full max-w-xs", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://docs.mindflux.ai", className: "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 px-4 py-3 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-400", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 513,
                      columnNumber: 53
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" }, void 0, false, {
                      fileName: "app/welcome/welcome.tsx",
                      lineNumber: 514,
                      columnNumber: 53
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 512,
                    columnNumber: 49
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "group-hover:scale-105 transform inline-block transition-transform text-sm", children: "Build something with the API" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 516,
                    columnNumber: 49
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 511,
                  columnNumber: 45
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://mindflux.ai", className: "bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 px-4 py-3 rounded-xl font-medium text-white/90 text-center group flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-purple-400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 523,
                    columnNumber: 53
                  }, this) }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 522,
                    columnNumber: 49
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "group-hover:scale-105 transform inline-block transition-transform text-sm", children: "Learn More" }, void 0, false, {
                    fileName: "app/welcome/welcome.tsx",
                    lineNumber: 525,
                    columnNumber: 49
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/welcome/welcome.tsx",
                  lineNumber: 521,
                  columnNumber: 45
                }, this)
              ] }, void 0, true, {
                fileName: "app/welcome/welcome.tsx",
                lineNumber: 510,
                columnNumber: 41
              }, this)
            ] }, void 0, true, {
              fileName: "app/welcome/welcome.tsx",
              lineNumber: 494,
              columnNumber: 45
            }, this)
          ] }, void 0, true, {
            fileName: "app/welcome/welcome.tsx",
            lineNumber: 439,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 437,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/welcome/welcome.tsx",
          lineNumber: 436,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/welcome/welcome.tsx",
        lineNumber: 326,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/welcome/welcome.tsx",
      lineNumber: 225,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/welcome/welcome.tsx",
    lineNumber: 197,
    columnNumber: 10
  }, this);
}
_s(Welcome, "nH8/RAl78F+A9VkcnRkAkr3QTcg=", false, function() {
  return [useFetcher];
});
_c = Welcome;
var _c;
$RefreshReg$(_c, "Welcome");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/home.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\home.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\home.tsx"
  );
  import.meta.hot.lastModified = "1759649495622.9275";
}
function meta() {
  return [
    {
      title: "mindflux MCP"
    },
    {
      name: "description",
      content: "Universal Memory MCP"
    },
    // og image
    {
      name: "og:image",
      content: "/og-image.png"
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    // twitter large image
    {
      name: "twitter:image",
      content: "/og-image.png"
    },
    // apple touch icons
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "/icons/apple-icon-57x57.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "/icons/apple-icon-60x60.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "/icons/apple-icon-72x72.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/icons/apple-icon-76x76.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "/icons/apple-icon-114x114.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/icons/apple-icon-120x120.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "/icons/apple-icon-144x144.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/icons/apple-icon-152x152.png"
    },
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/icons/apple-icon-180x180.png"
    },
    // favicons
    {
      tagName: "link",
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/icons/android-icon-192x192.png"
    },
    {
      tagName: "link",
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/icons/favicon-32x32.png"
    },
    {
      tagName: "link",
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/icons/favicon-96x96.png"
    },
    {
      tagName: "link",
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/icons/favicon-16x16.png"
    },
    // manifest and theme
    {
      tagName: "link",
      rel: "manifest",
      href: "/icons/manifest.json"
    },
    {
      name: "msapplication-TileColor",
      content: "#ffffff"
    },
    {
      name: "msapplication-TileImage",
      content: "/icons/ms-icon-144x144.png"
    },
    {
      name: "theme-color",
      content: "#ffffff"
    }
  ];
}
function Home({
  loaderData
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Welcome, { message: loaderData.message, userId: loaderData.userId, initialMemories: loaderData.memories }, void 0, false, {
    fileName: "app/routes/home.tsx",
    lineNumber: 285,
    columnNumber: 10
  }, this);
}
_c2 = Home;
var _c2;
$RefreshReg$(_c2, "Home");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Home as default,
  meta
};
//# sourceMappingURL=/build/routes/home-E6AB7NKW.js.map
