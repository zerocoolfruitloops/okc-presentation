const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureSlides() {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  const totalSlides = 39;
  const baseUrl = 'https://okc-presentation.vercel.app';
  
  console.log('Starting slide capture...');
  
  for (let i = 1; i <= totalSlides; i++) {
    // Jump to slide via API
    await fetch(`${baseUrl}/api/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'jump', value: i })
    });
    
    // Wait for state to sync
    await new Promise(r => setTimeout(r, 300));
    
    // Load page
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    
    // Capture screenshot
    const filename = `slide-${String(i).padStart(2, '0')}.png`;
    await page.screenshot({ 
      path: path.join(screenshotsDir, filename)
    });
    
    console.log(`Captured ${filename} (${i}/${totalSlides})`);
  }
  
  await browser.close();
  console.log(`\nDone! ${totalSlides} screenshots saved to ./screenshots/`);
}

captureSlides().catch(console.error);
