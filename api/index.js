import { createRequestHandler } from '@remix-run/node';

// eslint-disable-next-line import/no-relative-parent-imports
const build = require('../build');

export default createRequestHandler(build, process.env.NODE_ENV);