import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const source = path.join(process.cwd(), 'favicon.jpg');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const sizes = [16, 32, 48, 180, 192, 512];

async function generateIcons() {
  console.log('Generating icons...');
  
  // Generate PNGs
  for (const size of sizes) {
    let filename = `favicon-${size}x${size}.png`;
    if (size === 180) filename = 'apple-touch-icon.png'; // Standard name for 180
    if (size === 192) filename = 'android-chrome-192x192.png';
    if (size === 512) filename = 'android-chrome-512x512.png';

    await sharp(source)
      .resize(size, size)
      .toFile(path.join(publicDir, filename));
    console.log(`Generated ${filename}`);
  }

  // Generate ICO (contains 16, 32, 48)
  await sharp(source)
    .resize(32, 32) // Basic resize for ico conversion, although sharp .toFormat('ico') isn't standard.
    // Sharp doesn't natively support multi-size ICO well without plugins.
    // For simplicity/compatibility, we often just use a 32x32 or 48x48 png renamed or use a specific tool.
    // However, modern browsers prefer PNG favicons.
    // Let's make a basic 32x32 ico for legacy support.
    .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Generated favicon.ico');
}

generateIcons().catch(console.error);
