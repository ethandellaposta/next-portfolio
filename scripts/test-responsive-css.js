const fs = require('fs');
const path = require('path');

function analyzeResponsiveCSS() {
  console.log('🎨 Analyzing Responsive CSS Implementation');
  console.log('=' * 50);

  const cssPath = path.join(__dirname, '../styles/globals.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  // Check for responsive breakpoints
  const mediaQueries = cssContent.match(/@media[^{]+\{[^}]*\}/g) || [];

  console.log(`\n📱 Found ${mediaQueries.length} media queries:`);

  const breakpoints = [];
  mediaQueries.forEach((query, index) => {
    const match = query.match(/@media\s*\([^)]+\)/);
    if (match) {
      breakpoints.push(match[1]);
      console.log(`  ${index + 1}. ${match[1]}`);
    }
  });

  // Check for common responsive patterns
  const patterns = {
    flexbox: /display:\s*flex|flex-direction|justify-content|align-items/g,
    grid: /display:\s*grid|grid-template|grid-gap/g,
    'rem units': /\d+rem/g,
    'em units': /\d+em/g,
    'viewport units': /\d+vw|\d+vh/g,
    'max-width': /max-width/g,
    'min-width': /min-width/g,
  };

  console.log(`\n🔍 Responsive Pattern Analysis:`);
  Object.entries(patterns).forEach(([pattern, regex]) => {
    const matches = cssContent.match(regex) || [];
    console.log(`  ${pattern}: ${matches.length} occurrences`);
  });

  // Check for container max-width
  const containerMaxWidth = cssContent.match(
    /\.container[^{]*max-width:\s*([^;]+)/
  );
  if (containerMaxWidth) {
    console.log(`\n📦 Container max-width: ${containerMaxWidth[1]}`);
  }

  // Check for mobile-first approach
  const hasMinWidthQueries = cssContent.includes('min-width');
  const hasMaxWidthQueries = cssContent.includes('max-width');

  console.log(`\n📋 Responsive Strategy:`);
  console.log(
    `  Mobile-first (min-width): ${hasMinWidthQueries ? '✅' : '❌'}`
  );
  console.log(
    `  Desktop-first (max-width): ${hasMaxWidthQueries ? '✅' : '❌'}`
  );

  // Analyze spacing system
  const spacingVars = cssContent.match(/--space-[^:]+:\s*[^;]+/g) || [];
  console.log(`\n📏 Spacing System: ${spacingVars.length} variables defined`);

  // Check for responsive typography
  const responsiveTypography =
    cssContent.match(/font-size[^{]*[^}]*font-size/g) || [];
  console.log(
    `\ Responsive Typography: ${responsiveTypography.length} instances`
  );

  return {
    mediaQueries: breakpoints.length,
    hasMobileFirst: hasMinWidthQueries,
    hasDesktopFirst: hasMaxWidthQueries,
    spacingVariables: spacingVars.length,
    responsiveTypography: responsiveTypography.length,
  };
}

function generateResponsiveReport() {
  const analysis = analyzeResponsiveCSS();

  console.log(`\n📊 Responsive Implementation Score:`);
  console.log('=' * 40);

  let score = 0;
  const maxScore = 5;

  if (analysis.mediaQueries >= 3) {
    console.log('✅ Multiple breakpoints defined');
    score++;
  } else {
    console.log('⚠️  Need more breakpoints');
  }

  if (analysis.hasMobileFirst) {
    console.log('✅ Mobile-first approach');
    score++;
  } else {
    console.log('❌ Missing mobile-first approach');
  }

  if (analysis.spacingVariables >= 10) {
    console.log('✅ Comprehensive spacing system');
    score++;
  } else {
    console.log('⚠️  Limited spacing variables');
  }

  if (analysis.responsiveTypography > 0) {
    console.log('✅ Responsive typography');
    score++;
  } else {
    console.log('❌ Missing responsive typography');
  }

  if (analysis.mediaQueries > 0) {
    console.log('✅ Media queries implemented');
    score++;
  } else {
    console.log('❌ No media queries found');
  }

  const percentage = Math.round((score / maxScore) * 100);
  console.log(
    `\n🎯 Overall Responsive Score: ${percentage}% (${score}/${maxScore})`
  );

  return percentage;
}

// Run the analysis
generateResponsiveReport();
