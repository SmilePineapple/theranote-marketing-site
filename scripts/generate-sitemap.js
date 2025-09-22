const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://www.theranote.co.uk';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static pages with their priorities and change frequencies
const staticPages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/features',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/pricing',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/security',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate XML sitemap
function generateSitemap() {
  console.log('🗺️ Generating sitemap.xml at:', new Date().toISOString());
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
`;
  sitemap += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
`;
  sitemap += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
`;
  sitemap += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `  <url>
`;
    sitemap += `    <loc>${DOMAIN}${page.url}</loc>
`;
    sitemap += `    <lastmod>${page.lastmod}</lastmod>
`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>
`;
    sitemap += `    <priority>${page.priority}</priority>
`;
    sitemap += `  </url>
`;
  });

  sitemap += `</urlset>`;

  // Write sitemap to file
  try {
    fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf8');
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    console.log(`📊 Pages included: ${staticPages.length}`);
    
    // Log each page for verification
    staticPages.forEach(page => {
      console.log(`   - ${DOMAIN}${page.url} (priority: ${page.priority})`);
    });
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Validate sitemap XML
function validateSitemap() {
  try {
    const sitemapContent = fs.readFileSync(OUTPUT_PATH, 'utf8');
    
    // Basic XML validation
    if (!sitemapContent.includes('<?xml version="1.0"')) {
      throw new Error('Missing XML declaration');
    }
    
    if (!sitemapContent.includes('<urlset')) {
      throw new Error('Missing urlset element');
    }
    
    if (!sitemapContent.includes('</urlset>')) {
      throw new Error('Missing closing urlset element');
    }
    
    // Count URLs
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    if (urlCount !== staticPages.length) {
      throw new Error(`URL count mismatch: expected ${staticPages.length}, found ${urlCount}`);
    }
    
    console.log('✅ Sitemap validation passed!');
    console.log(`📊 Validated ${urlCount} URLs`);
    
  } catch (error) {
    console.error('❌ Sitemap validation failed:', error.message);
    process.exit(1);
  }
}

// Generate sitemap index if needed (for future expansion)
function generateSitemapIndex() {
  const indexPath = path.join(__dirname, '../public/sitemap-index.xml');
  
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
`;
  sitemapIndex += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  sitemapIndex += `  <sitemap>
`;
  sitemapIndex += `    <loc>${DOMAIN}/sitemap.xml</loc>
`;
  sitemapIndex += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
`;
  sitemapIndex += `  </sitemap>
`;
  sitemapIndex += `</sitemapindex>`;
  
  try {
    fs.writeFileSync(indexPath, sitemapIndex, 'utf8');
    console.log('✅ Sitemap index generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap index:', error);
  }
}

// Main execution
function main() {
  console.log('🚀 Starting sitemap generation process...');
  console.log(`🌐 Domain: ${DOMAIN}`);
  console.log(`📁 Output: ${OUTPUT_PATH}`);
  console.log('---');
  
  // Generate main sitemap
  generateSitemap();
  
  // Validate the generated sitemap
  validateSitemap();
  
  // Generate sitemap index for future use
  generateSitemapIndex();
  
  console.log('---');
  console.log('🎉 Sitemap generation completed successfully!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Submit sitemap to Google Search Console: https://search.google.com/search-console');
  console.log('2. Submit sitemap to Bing Webmaster Tools: https://www.bing.com/webmasters');
  console.log('3. Verify sitemap accessibility: ' + DOMAIN + '/sitemap.xml');
  console.log('');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateSitemap,
  validateSitemap,
  generateSitemapIndex,
  main
};