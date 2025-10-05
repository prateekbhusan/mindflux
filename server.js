import { createRequestHandler, installGlobals } from '@remix-run/node';
import * as build from './build/index.js';

installGlobals();

export default function handler(req, res) {
  return createRequestHandler({
    build,
    mode: process.env.NODE_ENV,
  })(req, res);
}