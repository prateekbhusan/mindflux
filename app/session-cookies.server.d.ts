type SessionData = {
    userId: string;
};
type SessionFlashData = {
    error: string;
};
declare const getSession: (cookieHeader?: string | null, options?: import("react-router").CookieParseOptions) => Promise<import("react-router").Session<SessionData, SessionFlashData>>, commitSession: (session: import("react-router").Session<SessionData, SessionFlashData>, options?: import("react-router").CookieSerializeOptions) => Promise<string>, destroySession: (session: import("react-router").Session<SessionData, SessionFlashData>, options?: import("react-router").CookieSerializeOptions) => Promise<string>;
export { getSession, commitSession, destroySession };
