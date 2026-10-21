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

async function processImages() {
  console.log('[Enhance] Starting professional photo enhancement and optimization...');

  // 1. MASTER HERO PHOTO (Outdoor portrait - Devika & Vaisakhan in emerald green & Kasavu)
  const heroSource = path.join(PHOTOS_DIR, 'WhatsApp Image 2026-10-21 at 7.32.01 PM.jpeg');
  
  // High-res WebP version with natural warm wedding color grading, subtle contrast & mild sharpening
  await sharp(heroSource)
    .rotate() // auto-orient from EXIF
    .resize({ width: 1600, height: 2133, fit: 'inside', withoutEnlargement: true })
    .modulate({
      brightness: 1.02, // Gentle exposure boost
      saturation: 1.05, // Rich emerald and gold tones
    })
    .sharpen({ sigma: 1.0, m1: 0.5, m2: 2.0 }) // Crisp eyelashes, jewelry & sari zari
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(OUT_DIR, 'couple-hero.webp'));

  // JPEG fallback
  await sharp(heroSource)
    .rotate()
    .resize({ width: 1600, height: 2133, fit: 'inside', withoutEnlargement: true })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 1.0, m1: 0.5, m2: 2.0 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(OUT_DIR, 'couple-hero.jpg'));

  // Mobile optimized portrait crop (focused on couple's joyful expression and bride's hand on groom)
  await sharp(heroSource)
    .rotate()
    .resize(900, 1200, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 0.8 })
    .webp({ quality: 88 })
    .toFile(path.join(OUT_DIR, 'couple-hero-mobile.webp'));

  console.log('✓ couple-hero.webp & couple-hero.jpg generated');

  // 2. CEREMONY / SEATED STAGE PHOTO (Devika & Vaisakhan under floral arch)
  const ceremonySource = path.join(PHOTOS_DIR, 'WhatsApp Image 2026-10-21 at 7.30.29 PM.jpeg');

  // Subtle color temperature warming to remove harsh flash coolness & match warm ivory/burgundy palette
  await sharp(ceremonySource)
    .rotate()
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .modulate({
      brightness: 1.03, // Gently lift midtones
      saturation: 1.04, // Warm gold & rose garland saturation
    })
    .sharpen({ sigma: 0.9, m1: 0.4, m2: 1.8 })
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(OUT_DIR, 'couple-ceremony.webp'));

  await sharp(ceremonySource)
    .rotate()
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .modulate({ brightness: 1.03, saturation: 1.04 })
    .sharpen({ sigma: 0.9, m1: 0.4, m2: 1.8 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(OUT_DIR, 'couple-ceremony.jpg'));

  console.log('✓ couple-ceremony.webp & couple-ceremony.jpg generated');

  // 3. BACKGROUND: Mandala invitation border texture
  const bgMandala = path.join(BG_DIR, '978758931535601981.jpg');
  await sharp(bgMandala)
    .rotate()
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, 'mandala-border-bg.webp'));

  // 4. BACKGROUND / ACCENT: Classical Kerala miniature painting
  const bgPainting = path.join(BG_DIR, '50735933300033052.jpg');
  await sharp(bgPainting)
    .rotate()
    .resize({ width: 800, fit: 'inside' })
    .modulate({ brightness: 1.02, saturation: 1.06 })
    .webp({ quality: 88 })
    .toFile(path.join(OUT_DIR, 'classical-art.webp'));

  console.log('✓ Background and artwork assets generated in public/images');
}

processImages().catch(console.error);
