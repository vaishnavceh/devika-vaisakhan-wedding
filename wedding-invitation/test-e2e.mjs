import { chromium } from 'playwright';
import fs from 'fs';

async function runTests() {
  console.log('[Test] Launching Chromium browser...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });
  
  const viewports = [
    { name: 'mobile-iphone14', width: 390, height: 844 },
    { name: 'tablet-ipad', width: 768, height: 1024 },
    { name: 'desktop-hd', width: 1280, height: 800 },
  ];

  let allPassed = true;

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // Capture console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error(`[Browser Console Error] ${msg.text()}`);
      }
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Scroll through the page to trigger all in-view animations like a real user
    await page.evaluate(async () => {
      const distance = 400;
      const delay = 100;
      while (document.scrollingElement && document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      // scroll back to top
      document.scrollingElement.scrollTop = 0;
      await new Promise((resolve) => setTimeout(resolve, delay));
    });
    const heroTitle = await page.textContent('h1');
    console.log(`Hero title: ${heroTitle?.replace(/\s+/g, ' ').trim()}`);
    if (!heroTitle?.includes('Devika') || !heroTitle?.includes('Vaisakhan')) {
      console.error('FAIL: Couple names missing in hero');
      allPassed = false;
    } else {
      console.log('PASS: Hero names verified');
    }

    // 2. Verify Invitation Section Content
    const pageText = await page.innerText('body');
    const requiredStrings = [
      'Dr. Devika Rani P.S.',
      'Vaisakhan M.L.',
      'Sunil Kumar B',
      'Preetha M',
      'Mohanan N',
      'Late Lalithakumari K',
      'Saturday, 05 December 2026',
      'Sunday, 06 December 2026',
      'Peroor Karunalloor Bhagavathy Temple',
      'Amerivila Veedu',
      'Thattarkonam P.O.',
      'Nimisha Rani P.S.',
      '96059 41066',
      '95265 16107',
    ];

    for (const str of requiredStrings) {
      if (!pageText.includes(str)) {
        console.error(`FAIL: Missing expected content "${str}"`);
        allPassed = false;
      } else {
        console.log(`PASS: Found "${str}"`);
      }
    }

    // 3. Verify Countdown Elements
    const countdownSecs = (await page.locator('#countdown').innerText()).toUpperCase();
    if (!countdownSecs.includes('DAYS') || !countdownSecs.includes('HOURS')) {
      console.error('FAIL: Countdown missing Days/Hours');
      allPassed = false;
    } else {
      console.log('PASS: Countdown rendered with units');
    }

    // 4. Test Audio Player Interaction
    const audioBtn = page.locator('aside[aria-label="Wedding Ambient Audio"] button');
    await audioBtn.click();
    console.log('PASS: Audio button clicked successfully');

    // 5. Test Shower Blessings Button
    const showerBtn = page.getByRole('button', { name: 'Shower Blessings' });
    await showerBtn.click();
    console.log('PASS: Shower Blessings clicked');

    // 6. Screenshot Full Page
    const screenshotPath = `screenshot-${vp.name}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${screenshotPath}`);

    await context.close();
  }

  await browser.close();

  if (allPassed) {
    console.log('\n========================================');
    console.log('ALL PLAYWRIGHT TESTS PASSED SUCCESSFULLY');
    console.log('========================================');
    process.exit(0);
  } else {
    console.error('\nSOME TESTS FAILED');
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('[Test Error]', err);
  process.exit(1);
});
