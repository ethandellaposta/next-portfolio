#!/usr/bin/env node
/**
 * visual-compare.js
 * CLI wrapper around lib/frameCompare.js.
 *
 * Usage:
 *   node scripts/visual-compare.js [urlA] [urlB] [outDir]
 *
 * Defaults:
 *   urlA   = http://localhost:3000
 *   urlB   = https://ethandellaposta.dev
 *   outDir = ./screenshots
 */

'use strict';

const path = require('path');
const { compareUrls } = require('../lib/frameCompare');

const [, , urlA, urlB, outDir] = process.argv;

compareUrls(
  urlA || 'http://localhost:3000',
  urlB || 'https://ethandellaposta.dev',
  {
    outDir: outDir || path.join(__dirname, '../screenshots'),
    labelA: 'local',
    labelB: 'live',
  }
).catch(err => {
  console.error(err);
  process.exit(1);
});
