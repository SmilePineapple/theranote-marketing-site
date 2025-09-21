// Dynamic sitemap generation for Next.js
// This API route generates sitemap.xml dynamically

const DOMAIN = 'https://www.theranotepro.com';

// Static pages configuration
const staticPages = [
  {
    url: '',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/features',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/pricing',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/security',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/privacy',
    changefreq: 'monthly',
    priority: '0.5',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/terms',
    changefreq: 'monthly',
    priority: '0.5',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate XML sitemap
function generateSitemap(pages) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}

// Validate sitemap XML
function validateSitemap(xml) {
  try {
    // Basic XML validation
    if (!xml.includes('<?xml version="1.0"')) {
      throw new Error('Missing XML declaration');
    }
    if (!xml.includes('<urlset')) {
      throw new Error('Missing urlset element');
    }
    if (!xml.includes('</urlset>')) {
      throw new Error('Unclosed urlset element');
    }
    
    // Count URLs
    const urlCount = (xml.match(/<url>/g) || []).length;
    console.log(`✅ Sitemap validation passed: ${urlCount} URLs`);
    
    return true;
  } catch (error) {
    console.error('❌ Sitemap validation failed:', error.message);
    return false;
  }
}

// API route handler
export default function handler(req, res) {
  console.log('🗺️  Generating dynamic sitemap...');
  
  try {
    // Add current timestamp for debugging
    const updatedPages = staticPages.map(page => ({
      ...page,
      lastmod: new Date().toISOString().split('T')[0]
    }));
    
    // Generate sitemap XML
    const sitemap = generateSitemap(updatedPages);
    
    // Validate sitemap
    if (!validateSitemap(sitemap)) {
      throw new Error('Sitemap validation failed');
    }
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('X-Robots-Tag', 'noindex');
    
    // Log generation info
    console.log(`📊 Generated sitemap with ${updatedPages.length} pages`);
    console.log(`🕐 Generated at: ${new Date().toISOString()}`);
    
    // Return sitemap
    res.status(200).send(sitemap);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    
    // Return error response
    res.status(500).json({
      error: 'Failed to generate sitemap',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Export configuration
export const config = {
  api: {
    responseLimit: '1mb'
  }
};