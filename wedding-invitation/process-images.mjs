import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sharp = require('./frontend/node_modules/sharp/dist/index.cjs');
import path from 'path';
import fs from 'fs';

const BASE_DIR = 'C:/Users/vaish/OneDrive/Desktop/Nimisha Rani card';
const PHOTOS_DIR = path.join(BASE_DIR, 'IMAGES/BRIDE AND GROOM PHOTOS ORIGINAL');
const BG_DIR = path.join(BASE_DIR, 'IMAGES/BACKROUNDS USABLE');

const OUT_DIR = path.join(BASE_DIR, 'wedding-invitation/frontend/public/images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('--- Inspecting Original Assets ---');
  
  const p1 = path.join(PHOTOS_DIR, 'WhatsApp Image 2026-10-21 at 7.32.01 PM.jpeg');
  const p2 = path.join(PHOTOS_DIR, 'WhatsApp Image 2026-10-21 at 7.30.29 PM.jpeg');
  const bgMandala = path.join(BG_DIR, '978758931535601981.jpg');
  const bgPainting = path.join(BG_DIR, '50735933300033052.jpg');

  for (const [name, filePath] of Object.entries({ p1, p2, bgMandala, bgPainting })) {
    const meta = await sharp(filePath).metadata();
    console.log(`${name} (${path.basename(filePath)}): ${meta.width}x${meta.height}, format: ${meta.format}, space: ${meta.space}`);
  }
}

run().catch(console.error);
