import { handleRequest } from '@remix-run/node';
import * as build from '../build/server/index.js';

export default async function handler(req) {
  try {
    return await handleRequest(
      req,
      undefined,
      build
    );
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}