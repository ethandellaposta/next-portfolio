const puppeteer = require('puppeteer');
const fs = require('fs');

const SCREEN_SIZES = [
  { name: 'Mobile Small', width: 320, height: 568 },
  { name: 'Mobile Large', width: 414, height: 896 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Laptop', width: 1024, height: 768 },
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Desktop Large', width: 1920, height: 1080 },
  { name: 'Ultra Wide', width: 2560, height: 1440 },
];

async function testResponsiveRendering() {
  console.log('🎨 Testing Responsive Rendering Across Screen Sizes');
  console.log('=' * 60);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const size of SCREEN_SIZES) {
    console.log(`\n📱 Testing ${size.name} (${size.width}x${size.height})`);

    // Set viewport
    await page.setViewport({ width: size.width, height: size.height });

    // Navigate to page
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Wait for animations to complete
    await page.waitForTimeout(2000);

    // Test critical elements
    const tests = await page.evaluate(() => {
      const results = {};

      // Test hero section visibility
      const hero = document.querySelector('.hero');
      results.heroVisible = hero && hero.offsetParent !== null;

      // Test navigation
      const nav = document.querySelector('nav');
      results.navVisible = nav && nav.offsetParent !== null;

      // Test content sections
      const sections = document.querySelectorAll('section');
      results.sectionCount = sections.length;

      // Test responsive breakpoints
      const container = document.querySelector('.container');
      if (container) {
        const containerWidth = container.offsetWidth;
        results.containerWidth = containerWidth;
        results.usesMaxWidth = containerWidth <= 1200; // Our max container width
      }

      // Test font sizes
      const h1 = document.querySelector('h1');
      if (h1) {
        results.h1FontSize = parseFloat(window.getComputedStyle(h1).fontSize);
      }

      // Test spacing
      const main = document.querySelector('main');
      if (main) {
        const mainPadding = window.getComputedStyle(main).padding;
        results.mainPadding = mainPadding;
      }

      // Test overflow
      results.hasHorizontalScroll =
        document.body.scrollWidth > document.body.clientWidth;

      return results;
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      path: `./screenshots/${size.name.toLowerCase().replace(/\s+/g, '-')}.png`,
      fullPage: true,
    });

    // Report results
    console.log(`  ✅ Hero: ${tests.heroVisible ? 'Visible' : 'Hidden'}`);
    console.log(`  ✅ Nav: ${tests.navVisible ? 'Visible' : 'Hidden'}`);
    console.log(`  ✅ Sections: ${tests.sectionCount} found`);
    console.log(`  ✅ Container: ${tests.containerWidth}px (max: 1200px)`);
    console.log(`  ✅ H1 Font: ${tests.h1FontSize}px`);
    console.log(
      `  ✅ Horizontal Scroll: ${tests.hasHorizontalScroll ? '❌ Issue' : '✅ None'}`
    );

    // Validate responsive behavior
    const issues = [];

    if (size.width < 768 && tests.h1FontSize > 32) {
      issues.push('H1 font size too large for mobile');
    }

    if (size.width < 768 && tests.sectionCount < 5) {
      issues.push('Missing sections on mobile');
    }

    if (tests.hasHorizontalScroll) {
      issues.push('Unwanted horizontal scrollbar');
    }

    if (issues.length > 0) {
      console.log(`  ⚠️  Issues: ${issues.join(', ')}`);
    } else {
      console.log(`  🎉 Perfect rendering!`);
    }
  }

  await browser.close();
  console.log('\n✅ Responsive testing complete!');
  console.log('📸 Screenshots saved in ./screenshots/');
}

// Create screenshots directory
if (!fs.existsSync('./screenshots')) {
  fs.mkdirSync('./screenshots');
}

testResponsiveRendering().catch(console.error);
