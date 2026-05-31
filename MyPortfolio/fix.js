const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'assets');
const destDir = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Move files
const filesToMove = fs.readdirSync(srcDir);
for (const file of filesToMove) {
  if (file.endsWith('.pdf') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.min.js')) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    try {
      // copy and remove instead of rename to avoid cross-device link issues or permission issues
      fs.copyFileSync(srcPath, destPath);
      fs.unlinkSync(srcPath);
      console.log(`Moved ${file}`);
    } catch (e) {
      console.error(`Failed to move ${file}: ${e.message}`);
    }
  }
}

// Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace `<a href="assets/xxx.pdf" ...>` with `<a href="assets/xxx.pdf" download ...>`
indexHtml = indexHtml.replace(/<a href="(assets\/[^"]+\.pdf)"/g, '<a href="$1" download');

fs.writeFileSync(indexPath, indexHtml);
console.log('Updated index.html');
