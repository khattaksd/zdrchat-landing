#!/usr/bin/env node
/**
 * Post-build script for agent readiness deployment
 *
 * 1. Copies the custom Cloudflare Worker (src/worker.ts) into dist/client/
 * 2. Creates deployment wrangler.json in dist/client/ for wrangler deploy
 *
 * This runs automatically after `astro build` via the "postbuild" npm script.
 */

import { copyFileSync, existsSync, unlinkSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const clientDir = join(root, 'dist', 'client');
const serverDir = join(root, 'dist', 'server');

// Ensure dist/client exists
if (!existsSync(clientDir)) {
  console.error('❌ dist/client directory not found. Run astro build first.');
  process.exit(1);
}

// ── 1. Copy custom worker into dist/client/ ─────────────────────────
const workerSrc = join(root, 'src', 'worker.ts');
const workerDst = join(clientDir, '_worker.ts');
copyFileSync(workerSrc, workerDst);
console.log(`✅ Copied worker → ${workerDst}`);

// ── 2. Create deployment wrangler.json for dist/client/ ─────────────
// This is what wrangler deploy will use via .wrangler/deploy/config.json
const wranglerDst = join(clientDir, 'wrangler.json');
const wranglerConfig = {
  $schema: '../../node_modules/wrangler/config-schema.json',
  compatibility_date: '2026-06-21',
  name: 'zdrchat-landing',
  main: './_worker.ts',
  assets: {
    binding: 'ASSETS',
    directory: '.',
  },
  observability: {
    enabled: true,
  },
};
writeFileSync(wranglerDst, JSON.stringify(wranglerConfig, null, 2) + '\n');
console.log(`✅ Created deploy wrangler.json → ${wranglerDst}`);

// ── 3. Update .wrangler/deploy/config.json to use the correct config ─
const deployConfigDir = join(root, '.wrangler', 'deploy');
if (!existsSync(deployConfigDir)) {
  mkdirSync(deployConfigDir, { recursive: true });
}
const deployConfigPath = join(deployConfigDir, 'config.json');
const deployConfig = {
  configPath: '../../dist/client/wrangler.json',
  auxiliaryWorkers: [],
};
const prerenderWrangler = join(serverDir, '.prerender', 'wrangler.json');
if (existsSync(prerenderWrangler)) {
  deployConfig.prerenderWorkerConfigPath = '../../dist/server/.prerender/wrangler.json';
}
writeFileSync(deployConfigPath, JSON.stringify(deployConfig, null, 2) + '\n');
console.log(`✅ Updated deploy config → ${deployConfigPath}`);

console.log('📦 Agent readiness postbuild complete!');