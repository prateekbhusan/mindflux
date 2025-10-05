const { createRequestHandler } = require('@remix-run/node');
const { installGlobals } = require('@remix-run/node');
const path = require('path');

installGlobals();

module.exports = function (req, res) {
  const build = require('./build');
  return createRequestHandler({ build, mode: process.env.NODE_ENV })(req, res);
};