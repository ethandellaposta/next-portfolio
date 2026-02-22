/**
 * frameCompare.js
 * Reusable library for scroll-based visual frame comparison between any two URLs.
 *
 * Usage:
 *   const { compareUrls, captureFrames, pixelDiff, launchBrowser } = require('./lib/frameCompare');
 *
 *   const report = await compareUrls('http://localhost:3000', 'https://example.com', {
 *     outDir: './screenshots',
 *     viewport: { width: 1440, height: 900 },
 *     scrollStep: 900,
 *     settleMs: 600,
 *     initialWaitMs: 2000,
 *     threshold: 10,       // per-channel pixel diff threshold (0–255)
 *     closeThreshold: 5,   // % diff considered "close"
 *     warnThreshold: 20,   // % diff considered "warning" (above = major)
 *   });
 */

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULTS = {
  viewport: { width: 1440, height: 900 },
  scrollStep: 900,
  settleMs: 600,
  initialWaitMs: 2000,
  threshold: 10,
  closeThreshold: 5,
  warnThreshold: 20,
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
};

// ─── Browser ─────────────────────────────────────────────────────────────────

/**
 * Launch a Puppeteer browser instance.
 * @param {string[]} [args]
 * @returns {Promise<import('puppeteer').Browser>}
 */
async function launchBrowser(args = DEFAULTS.puppeteerArgs) {
  return puppeteer.launch({ headless: 'new', args });
}

// ─── Frame Capture ───────────────────────────────────────────────────────────

/**
 * Scroll through a URL and capture a screenshot at each step.
 *
 * @param {import('puppeteer').Browser} browser
 * @param {string} url
 * @param {string} label        - Used as filename prefix.
 * @param {string} outDir       - Directory to write PNGs into.
 * @param {object} [opts]
 * @param {{ width: number, height: number }} [opts.viewport]
 * @param {number} [opts.scrollStep]
 * @param {number} [opts.settleMs]
 * @param {number} [opts.initialWaitMs]
 * @param {(msg: string) => void} [opts.log]
 * @returns {Promise<Array<{ scrollY: number, filename: string }>>}
 */
async function captureFrames(browser, url, label, outDir, opts = {}) {
  const {
    viewport = DEFAULTS.viewport,
    scrollStep = DEFAULTS.scrollStep,
    settleMs = DEFAULTS.settleMs,
    initialWaitMs = DEFAULTS.initialWaitMs,
    log = console.log,
  } = opts;

  fs.mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(initialWaitMs);

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const frames = [];
  let scrollY = 0;

  while (scrollY <= totalHeight) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await sleep(settleMs);

    const filename = path.join(outDir, `${label}_scroll_${scrollY}.png`);
    await page.screenshot({ path: filename, fullPage: false });
    frames.push({ scrollY, filename });
    log(`[${label}] captured frame at scrollY=${scrollY}`);
    scrollY += scrollStep;
  }

  await page.close();
  return frames;
}

// ─── Pixel Diff ───────────────────────────────────────────────────────────────

/**
 * Compare two PNG files pixel-by-pixel.
 * Writes a diff image to outFile (red = differing pixels, dimmed = matching).
 * Falls back to file-size comparison if the `canvas` module is unavailable.
 *
 * @param {string} file1
 * @param {string} file2
 * @param {string} outFile       - Where to write the diff PNG.
 * @param {object} [opts]
 * @param {number} [opts.threshold]  - Per-channel difference to count as a diff pixel.
 * @returns {Promise<{
 *   diffPixels: number,
 *   total: number,
 *   pct: string,
 *   method: 'pixel' | 'size',
 *   diffFile: string
 * }>}
 */
async function pixelDiff(file1, file2, outFile, opts = {}) {
  const { threshold = DEFAULTS.threshold } = opts;

  try {
    const { createCanvas, loadImage } = require('canvas');
    const [img1, img2] = await Promise.all([loadImage(file1), loadImage(file2)]);
    const w = Math.min(img1.width, img2.width);
    const h = Math.min(img1.height, img2.height);

    // Draw both images side-by-side to extract pixel data
    const src = createCanvas(w * 2, h);
    const sCtx = src.getContext('2d');
    sCtx.drawImage(img1, 0, 0, w, h);
    sCtx.drawImage(img2, w, 0, w, h);
    const d1 = sCtx.getImageData(0, 0, w, h).data;
    const d2 = sCtx.getImageData(w, 0, w, h).data;

    // Build diff image
    const diffCanvas = createCanvas(w, h);
    const dCtx = diffCanvas.getContext('2d');
    const diffData = dCtx.createImageData(w, h);
    let diffPixels = 0;

    for (let i = 0; i < d1.length; i += 4) {
      const dr = Math.abs(d1[i]     - d2[i]);
      const dg = Math.abs(d1[i + 1] - d2[i + 1]);
      const db = Math.abs(d1[i + 2] - d2[i + 2]);
      const avg = (dr + dg + db) / 3;

      if (avg > threshold) {
        diffPixels++;
        diffData.data[i]     = 255;
        diffData.data[i + 1] = 0;
        diffData.data[i + 2] = 0;
        diffData.data[i + 3] = 255;
      } else {
        diffData.data[i]     = d1[i]     >> 1;
        diffData.data[i + 1] = d1[i + 1] >> 1;
        diffData.data[i + 2] = d1[i + 2] >> 1;
        diffData.data[i + 3] = 255;
      }
    }

    dCtx.putImageData(diffData, 0, 0);
    fs.writeFileSync(outFile, diffCanvas.toBuffer('image/png'));

    return {
      diffPixels,
      total: w * h,
      pct: ((diffPixels / (w * h)) * 100).toFixed(2),
      method: 'pixel',
      diffFile: outFile,
    };
  } catch (_) {
    // canvas module not available — fall back to file-size heuristic
    const s1 = fs.statSync(file1).size;
    const s2 = fs.statSync(file2).size;
    const diff = Math.abs(s1 - s2);
    return {
      diffPixels: diff,
      total: s1,
      pct: ((diff / s1) * 100).toFixed(2),
      method: 'size',
      diffFile: null,
    };
  }
}

// ─── Status Label ─────────────────────────────────────────────────────────────

/**
 * @param {string|number} pct
 * @param {number} closeThreshold
 * @param {number} warnThreshold
 * @returns {'✅ CLOSE' | '⚠️  DIFF' | '❌ MAJOR'}
 */
function statusLabel(pct, closeThreshold = DEFAULTS.closeThreshold, warnThreshold = DEFAULTS.warnThreshold) {
  const n = parseFloat(pct);
  if (n < closeThreshold) return '✅ CLOSE';
  if (n < warnThreshold)  return '⚠️  DIFF';
  return '❌ MAJOR';
}

// ─── Top-level API ────────────────────────────────────────────────────────────

/**
 * Full pipeline: capture frames from two URLs, diff each pair, return report.
 *
 * @param {string} urlA
 * @param {string} urlB
 * @param {object} [opts]
 * @param {string} [opts.outDir]
 * @param {string} [opts.labelA]
 * @param {string} [opts.labelB]
 * @param {{ width: number, height: number }} [opts.viewport]
 * @param {number} [opts.scrollStep]
 * @param {number} [opts.settleMs]
 * @param {number} [opts.initialWaitMs]
 * @param {number} [opts.threshold]
 * @param {number} [opts.closeThreshold]
 * @param {number} [opts.warnThreshold]
 * @param {(msg: string) => void} [opts.log]
 * @param {boolean} [opts.saveReport]   - Write report.json to outDir (default true).
 * @returns {Promise<{
 *   frames: Array<{
 *     frame: number,
 *     scrollY: number,
 *     fileA: string,
 *     fileB: string,
 *     diffPixels: number,
 *     total: number,
 *     pct: string,
 *     method: string,
 *     diffFile: string | null,
 *     status: string,
 *   }>,
 *   summary: { total: number, close: number, diff: number, major: number },
 *   reportFile: string | null,
 * }>}
 */
async function compareUrls(urlA, urlB, opts = {}) {
  const {
    outDir = path.join(process.cwd(), 'screenshots'),
    labelA = 'a',
    labelB = 'b',
    viewport = DEFAULTS.viewport,
    scrollStep = DEFAULTS.scrollStep,
    settleMs = DEFAULTS.settleMs,
    initialWaitMs = DEFAULTS.initialWaitMs,
    threshold = DEFAULTS.threshold,
    closeThreshold = DEFAULTS.closeThreshold,
    warnThreshold = DEFAULTS.warnThreshold,
    log = console.log,
    saveReport = true,
  } = opts;

  fs.mkdirSync(outDir, { recursive: true });

  const browser = await launchBrowser();
  const captureOpts = { viewport, scrollStep, settleMs, initialWaitMs, log };

  log(`\n=== Capturing ${labelA.toUpperCase()} (${urlA}) ===`);
  const framesA = await captureFrames(browser, urlA, labelA, outDir, captureOpts);

  log(`\n=== Capturing ${labelB.toUpperCase()} (${urlB}) ===`);
  const framesB = await captureFrames(browser, urlB, labelB, outDir, captureOpts);

  await browser.close();

  log('\n=== PIXEL DIFF REPORT ===');
  const count = Math.min(framesA.length, framesB.length);
  const frames = [];
  const summary = { total: count, close: 0, diff: 0, major: 0 };

  for (let i = 0; i < count; i++) {
    const fa = framesA[i];
    const fb = framesB[i];
    const diffFile = path.join(outDir, `diff_frame_${i}_scroll_${fa.scrollY}.png`);
    const result = await pixelDiff(fa.filename, fb.filename, diffFile, { threshold });
    const status = statusLabel(result.pct, closeThreshold, warnThreshold);

    const methodNote = result.method === 'size' ? ' (size-only fallback)' : '';
    log(`Frame ${i} (scrollY=${fa.scrollY}): ${status} — ${result.pct}% pixels differ${methodNote}`);

    if (status === '✅ CLOSE') summary.close++;
    else if (status === '⚠️  DIFF') summary.diff++;
    else summary.major++;

    frames.push({
      frame: i,
      scrollY: fa.scrollY,
      fileA: fa.filename,
      fileB: fb.filename,
      ...result,
      status,
    });
  }

  log(`\nSummary: ${summary.close} close, ${summary.diff} diff, ${summary.major} major (of ${summary.total} frames)`);

  let reportFile = null;
  if (saveReport) {
    reportFile = path.join(outDir, 'report.json');
    fs.writeFileSync(reportFile, JSON.stringify({ urlA, urlB, frames, summary }, null, 2));
    log(`Report saved to ${reportFile}`);
  }

  return { frames, summary, reportFile };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  compareUrls,
  captureFrames,
  pixelDiff,
  launchBrowser,
  statusLabel,
  DEFAULTS,
};
