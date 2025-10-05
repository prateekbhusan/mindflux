import { handleRequest } from '@remix-run/node';
import {
  createReadableStreamFromReadable,
} from '@remix-run/node';

// This is the standard Vercel entry point for a Remix app
export default async function handler(
  req: Request,
): Promise<Response> {
  try {
    const url = new URL(req.url);

    const build = await import('../build/server');
    const response = await handleRequest(
      req,
      200,
      {},
      build,
    );

    // Vercel doesn't support Node streams, so we need to convert it
    const body = response.body
      ? createReadableStreamFromReadable(response.body)
      : null;

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}