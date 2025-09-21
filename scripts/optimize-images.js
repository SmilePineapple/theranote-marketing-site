const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images/optimized'),
  formats: ['webp', 'jpg'], // Generate both WebP and fallback JPG
  sizes: [320, 640, 768, 1024, 1280, 1920], // Responsive breakpoints
  quality: {
    webp: 80,
    jpg: 85
  }
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Helper function to get file info
function getFileInfo(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  return { ext, name, dir };
}

// Generate responsive images
async function generateResponsiveImages(inputPath, outputDir) {
  const { name } = getFileInfo(inputPath);
  const results = [];
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Processing: ${name} (${metadata.width}x${metadata.height})`);
    
    // Generate images for each size and format
    for (const size of config.sizes) {
      // Skip if original is smaller than target size
      if (metadata.width < size) continue;
      
      for (const format of config.formats) {
        const outputName = `${name}-${size}w.${format}`;
        const outputPath = path.join(outputDir, outputName);
        
        await image
          .resize(size, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFormat(format, {
            quality: config.quality[format],
            progressive: true
          })
          .toFile(outputPath);
        
        results.push({
          format,
          size,
          path: outputPath,
          name: outputName
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
    return [];
  }
}

// Generate srcset string
function generateSrcSet(images, format) {
  return images
    .filter(img => img.format === format)
    .map(img => `/images/optimized/${img.name} ${img.size}w`)
    .join(', ');
}

// Generate React Image component
function generateImageComponent(originalName, images) {
  const webpSrcSet = generateSrcSet(images, 'webp');
  const jpgSrcSet = generateSrcSet(images, 'jpg');
  const fallbackSrc = images.find(img => img.format === 'jpg' && img.size === 1024)?.name || images[0]?.name;
  
  return `
// Optimized image component for ${originalName}
const ${originalName.replace(/[^a-zA-Z0-9]/g, '')}Image = () => (
  <picture>
    <source
      srcSet="${webpSrcSet}"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      type="image/webp"
    />
    <source
      srcSet="${jpgSrcSet}"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      type="image/jpeg"
    />
    <img
      src="/images/optimized/${fallbackSrc}"
      alt="${originalName.replace(/[_-]/g, ' ')}"
      loading="lazy"
      decoding="async"
      className="w-full h-auto"
    />
  </picture>
);
`;
}

// Main optimization function
async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  try {
    // Check if input directory exists
    if (!fs.existsSync(config.inputDir)) {
      console.log('📁 Creating images directory...');
      fs.mkdirSync(config.inputDir, { recursive: true });
      
      // Create sample images for demonstration
      console.log('📝 Creating sample images...');
      await createSampleImages();
    }
    
    // Get all image files
    const imageFiles = fs.readdirSync(config.inputDir)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => path.join(config.inputDir, file));
    
    if (imageFiles.length === 0) {
      console.log('⚠️  No images found in', config.inputDir);
      await createSampleImages();
      return;
    }
    
    console.log(`📸 Found ${imageFiles.length} images to optimize`);
    
    const allResults = [];
    const componentCode = [];
    
    // Process each image
    for (const imagePath of imageFiles) {
      const { name } = getFileInfo(imagePath);
      const results = await generateResponsiveImages(imagePath, config.outputDir);
      
      if (results.length > 0) {
        allResults.push({ original: name, images: results });
        componentCode.push(generateImageComponent(name, results));
      }
    }
    
    // Generate components file
    const componentsContent = `
// Auto-generated optimized image components
// Generated on: ${new Date().toISOString()}

import React from 'react';

${componentCode.join('\n')}

export {
${allResults.map(r => `  ${r.original.replace(/[^a-zA-Z0-9]/g, '')}Image`).join(',\n')}
};
`;
    
    const componentsPath = path.join(__dirname, '../components/OptimizedImages.tsx');
    fs.writeFileSync(componentsPath, componentsContent);
    
    // Generate usage documentation
    const docsContent = `
# Optimized Images Usage Guide

Generated on: ${new Date().toISOString()}

## Available Optimized Images

${allResults.map(r => `
### ${r.original}

\`\`\`tsx
import { ${r.original.replace(/[^a-zA-Z0-9]/g, '')}Image } from '../components/OptimizedImages';

// Usage
<${r.original.replace(/[^a-zA-Z0-9]/g, '')}Image />
\`\`\`

**Generated sizes:** ${r.images.filter(img => img.format === 'webp').map(img => `${img.size}w`).join(', ')}
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport
`).join('')}

## Manual Image Usage

For custom implementations, use this pattern:

\`\`\`tsx
<picture>
  <source
    srcSet="/images/optimized/image-320w.webp 320w, /images/optimized/image-640w.webp 640w, /images/optimized/image-1024w.webp 1024w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/webp"
  />
  <source
    srcSet="/images/optimized/image-320w.jpg 320w, /images/optimized/image-640w.jpg 640w, /images/optimized/image-1024w.jpg 1024w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/jpeg"
  />
  <img
    src="/images/optimized/image-1024w.jpg"
    alt="Descriptive alt text"
    loading="lazy"
    decoding="async"
    className="w-full h-auto"
  />
</picture>
\`\`\`

## Performance Benefits

- **WebP Format:** 25-35% smaller file sizes compared to JPEG
- **Responsive Images:** Appropriate image size for each device
- **Lazy Loading:** Images load only when needed
- **Progressive Enhancement:** Fallback to JPEG for older browsers
- **Optimized Quality:** Balanced quality vs file size

## File Structure

\`\`\`
public/images/
├── original-images/     # Your original images
└── optimized/          # Generated optimized images
    ├── image-320w.webp
    ├── image-320w.jpg
    ├── image-640w.webp
    ├── image-640w.jpg
    └── ...
\`\`\`
`;
    
    const docsPath = path.join(__dirname, '../docs/optimized-images.md');
    const docsDir = path.dirname(docsPath);
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    fs.writeFileSync(docsPath, docsContent);
    
    console.log('✅ Image optimization complete!');
    console.log(`📊 Processed ${allResults.length} images`);
    console.log(`📁 Generated ${allResults.reduce((sum, r) => sum + r.images.length, 0)} optimized files`);
    console.log(`🧩 Components saved to: ${componentsPath}`);
    console.log(`📖 Documentation saved to: ${docsPath}`);
    
  } catch (error) {
    console.error('❌ Error during optimization:', error.message);
    process.exit(1);
  }
}

// Create sample images for demonstration
async function createSampleImages() {
  console.log('🎨 Creating sample images for demonstration...');
  
  const sampleImages = [
    { name: 'hero-background', width: 1920, height: 1080, color: '#667eea' },
    { name: 'feature-icon', width: 400, height: 400, color: '#764ba2' },
    { name: 'testimonial-avatar', width: 200, height: 200, color: '#f093fb' },
    { name: 'security-badge', width: 300, height: 200, color: '#4facfe' }
  ];
  
  for (const sample of sampleImages) {
    const outputPath = path.join(config.inputDir, `${sample.name}.png`);
    
    await sharp({
      create: {
        width: sample.width,
        height: sample.height,
        channels: 4,
        background: sample.color
      }
    })
    .png()
    .toFile(outputPath);
    
    console.log(`✨ Created sample: ${sample.name}.png (${sample.width}x${sample.height})`);
  }
}

// Run optimization if called directly
if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages, generateResponsiveImages, generateSrcSet };