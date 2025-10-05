import type { Route } from "./+types/home";
export declare function meta(): ({
    title: string;
    name?: undefined;
    content?: undefined;
    tagName?: undefined;
    rel?: undefined;
    sizes?: undefined;
    href?: undefined;
    type?: undefined;
} | {
    name: string;
    content: string;
    title?: undefined;
    tagName?: undefined;
    rel?: undefined;
    sizes?: undefined;
    href?: undefined;
    type?: undefined;
} | {
    tagName: string;
    rel: string;
    sizes: string;
    href: string;
    title?: undefined;
    name?: undefined;
    content?: undefined;
    type?: undefined;
} | {
    tagName: string;
    rel: string;
    type: string;
    sizes: string;
    href: string;
    title?: undefined;
    name?: undefined;
    content?: undefined;
} | {
    tagName: string;
    rel: string;
    href: string;
    title?: undefined;
    name?: undefined;
    content?: undefined;
    sizes?: undefined;
    type?: undefined;
})[];
export declare function loader({ request }: Route.LoaderArgs): Promise<import("react-router").UNSAFE_DataWithResponseInit<{
    message: string;
    userId: string;
    memories: {
        id: number;
        content: string;
        containerTags: never[];
    }[];
}>>;
export declare function action({ request, }: {
    request: Request;
}): Promise<import("react-router").UNSAFE_DataWithResponseInit<{
    error: string;
}> | import("react-router").UNSAFE_DataWithResponseInit<{
    success: boolean;
    memories: {
        id: number;
        content: string;
        containerTags: never[];
    }[];
}>>;
export default function Home({ loaderData }: Route.ComponentProps): import("react/jsx-runtime").JSX.Element;
