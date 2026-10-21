import { chromium } from 'playwright';

async function checkAudioAndLocation() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Check temple directions href
  const templeMapLink = await page.locator('a[href*="share.google"]').first().getAttribute('href');
  console.log('Temple Map Link:', templeMapLink);

  // 2. Check initial audio state
  const audioInfo = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return {
      src: audio ? audio.src : null,
      volume: audio ? audio.volume : null,
      currentTime: audio ? audio.currentTime : null,
      paused: audio ? audio.paused : null
    };
  });
  console.log('Initial Audio State:', audioInfo);

  // 3. Test Play / Pause interaction
  const btn = page.locator('aside[aria-label="Wedding Ambient Audio"] button');
  console.log('Audio Button text:', (await btn.innerText()).replace(/\s+/g, ' '));

  await btn.click();
  await page.waitForTimeout(600);

  const stateAfterFirstClick = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return {
      volume: audio ? audio.volume : null,
      currentTime: audio ? audio.currentTime : null,
      paused: audio ? audio.paused : null
    };
  });
  console.log('State After Click:', stateAfterFirstClick);
  console.log('Audio Button text after click:', (await btn.innerText()).replace(/\s+/g, ' '));

  await browser.close();
}

checkAudioAndLocation().catch(console.error);
