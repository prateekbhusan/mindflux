import {
  require_jsx_runtime
} from "/build/_shared/chunk-B43JI2TA.js";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse
} from "/build/_shared/chunk-AY22ZEZR.js";
import {
  createHotContext
} from "/build/_shared/chunk-JGBKMAJC.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/root.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.js"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.js"
  );
}
var links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
}];
function Layout({
  children
}) {
  return (0, import_jsx_runtime.jsxs)("html", {
    lang: "en",
    className: "dark",
    children: [(0, import_jsx_runtime.jsxs)("head", {
      children: [(0, import_jsx_runtime.jsx)("meta", {
        charSet: "utf-8"
      }), (0, import_jsx_runtime.jsx)("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), (0, import_jsx_runtime.jsx)(Meta, {}), (0, import_jsx_runtime.jsx)(Links, {})]
    }), (0, import_jsx_runtime.jsxs)("body", {
      children: [(0, import_jsx_runtime.jsx)("main", {
        className: "grow",
        children
      }), (0, import_jsx_runtime.jsx)(ScrollRestoration, {}), (0, import_jsx_runtime.jsx)(Scripts, {})]
    })]
  });
}
_c = Layout;
function App() {
  return (0, import_jsx_runtime.jsx)(Outlet, {});
}
_c2 = App;
function ErrorBoundary({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  return (0, import_jsx_runtime.jsxs)("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [(0, import_jsx_runtime.jsx)("h1", {
      children: message
    }), (0, import_jsx_runtime.jsx)("p", {
      children: details
    }), stack && (0, import_jsx_runtime.jsx)("pre", {
      className: "w-full p-4 overflow-x-auto",
      children: (0, import_jsx_runtime.jsx)("code", {
        children: stack
      })
    })]
  });
}
_c3 = ErrorBoundary;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "Layout");
$RefreshReg$(_c2, "App");
$RefreshReg$(_c3, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  Layout,
  App as default,
  links
};
//# sourceMappingURL=/build/root-EJS3ZUY4.js.map
