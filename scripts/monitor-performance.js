const { execSync } = require('child_process');
const fs = require('fs');

console.log('📊 Running performance monitoring...');

try {
  // Check if lighthouse is installed
  try {
    execSync('npx lighthouse --version', { stdio: 'pipe' });
  } catch (error) {
    console.log('Installing Lighthouse...');
    execSync('npm install -g lighthouse', { stdio: 'inherit' });
  }

  // Run Lighthouse audit
  console.log('Running Lighthouse audit...');
  const result = execSync(
    'npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"',
    { encoding: 'utf8' }
  );

  // Parse results
  const report = JSON.parse(
    fs.readFileSync('./lighthouse-report.json', 'utf8')
  );

  const categories = report.categories;
  const scores = {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
  };

  console.log('\n📈 Lighthouse Scores:');
  console.log(`Performance: ${scores.performance}/100`);
  console.log(`Accessibility: ${scores.accessibility}/100`);
  console.log(`Best Practices: ${scores.bestPractices}/100`);
  console.log(`SEO: ${scores.seo}/100`);

  // Check if scores meet thresholds
  const thresholds = {
    performance: 90,
    accessibility: 95,
    bestPractices: 95,
    seo: 95,
  };

  let failed = false;
  for (const [category, score] of Object.entries(scores)) {
    if (score < thresholds[category]) {
      console.log(
        `❌ ${category} score ${score} is below threshold ${thresholds[category]}`
      );
      failed = true;
    } else {
      console.log(`✅ ${category} score ${score} meets threshold`);
    }
  }

  if (failed) {
    process.exit(1);
  } else {
    console.log('\n🎉 All performance thresholds met!');
  }
} catch (error) {
  console.error('❌ Error running performance monitoring:', error.message);
  process.exit(1);
}
