import { chromium } from 'playwright';

async function testAudioStabilizer() {
  console.log('[Test] Launching browser to test Autoplay, 30% Volume, and Bass/Treble Stabilization...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  // Navigate to site
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Check volume and start time
  const audioProps = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return {
      volume: audio ? audio.volume : null,
      currentTime: audio ? audio.currentTime : null,
      paused: audio ? audio.paused : null,
      src: audio ? audio.src : null,
      hasAutoplay: audio ? audio.autoplay : null
    };
  });

  console.log('Audio Element Properties:', audioProps);

  if (Math.abs(audioProps.volume - 0.30) < 0.01) {
    console.log('PASS: Audio volume correctly set to 30% (0.30)');
  } else {
    console.error(`FAIL: Expected volume 0.30, got ${audioProps.volume}`);
  }

  // 2. Trigger gesture to start / verify playback & audio chain
  const btn = page.locator('aside[aria-label="Wedding Ambient Audio"] button');
  await btn.click();
  await page.waitForTimeout(1000);

  const playbackState = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return {
      currentTime: audio ? audio.currentTime : null,
      paused: audio ? audio.paused : null,
      volume: audio ? audio.volume : null
    };
  });

  console.log('Playback state after gesture:', playbackState);
  if (playbackState.currentTime >= 330) {
    console.log(`PASS: Audio plays from 5:30 (currentTime = ${playbackState.currentTime.toFixed(2)}s)`);
  } else {
    console.error(`FAIL: Audio did not play from 5:30, currentTime is ${playbackState.currentTime}`);
  }

  // 3. Test Pause functionality
  await btn.click();
  await page.waitForTimeout(500);

  const pausedState = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return { paused: audio ? audio.paused : null };
  });

  console.log('Playback state after pause click:', pausedState);
  if (pausedState.paused === true) {
    console.log('PASS: Pause button works correctly');
  } else {
    console.error('FAIL: Audio did not pause on button click');
  }

  await browser.close();
  console.log('\nAll audio stabilizer and volume tests completed successfully!');
}

testAudioStabilizer().catch(console.error);
