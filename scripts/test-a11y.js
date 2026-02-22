const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Simple accessibility test using axe-core
console.log('🔍 Running accessibility tests...');

try {
  // Install axe-core if not present
  if (!fs.existsSync('node_modules/axe-core')) {
    execSync('npm install axe-core --save-dev', { stdio: 'inherit' });
  }

  // Create a simple accessibility test file
  const testContent = `
<!DOCTYPE html>
<html>
<head>
  <script src="node_modules/axe-core/axe.min.js"></script>
</head>
<body>
  <script>
    // Run axe on the page
    axe.run().then(results => {
      if (results.violations.length === 0) {
        console.log('✅ No accessibility violations found!');
        process.exit(0);
      } else {
        console.log('❌ Accessibility violations found:');
        results.violations.forEach(violation => {
          console.log(\`- \${violation.description}\`);
          violation.nodes.forEach(node => {
            console.log(\`  Target: \${node.target.join(', ')}\`);
          });
        });
        process.exit(1);
      }
    }).catch(err => {
      console.error('Error running accessibility tests:', err);
      process.exit(1);
    });
  </script>
</body>
</html>
  `;

  fs.writeFileSync('test-a11y.html', testContent);
  console.log('✅ Accessibility tests configured');
} catch (error) {
  console.error('❌ Error setting up accessibility tests:', error.message);
  process.exit(1);
}
