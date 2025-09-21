const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  baseUrl: 'http://localhost:3000', // Change to production URL when deployed
  pages: [
    { path: '/', name: 'Homepage' },
    { path: '/features', name: 'Features' },
    { path: '/pricing', name: 'Pricing' },
    { path: '/security', name: 'Security' }
  ],
  outputDir: path.join(__dirname, '../lighthouse-reports'),
  targetScores: {
    performance: 90,
    accessibility: 90,
    bestPractices: 90,
    seo: 90
  }
};

// Lighthouse configuration
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    },
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

// Mobile configuration
const mobileConfig = {
  ...lighthouseConfig,
  settings: {
    ...lighthouseConfig.settings,
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false
    }
  }
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Run Lighthouse audit for a single page
async function auditPage(url, pageName, chrome, isDesktop = true) {
  console.log(`🔍 Auditing ${pageName} (${isDesktop ? 'Desktop' : 'Mobile'}): ${url}`);
  
  try {
    const runnerResult = await lighthouse(
      url,
      {
        logLevel: 'info',
        output: 'json',
        port: chrome.port
      },
      isDesktop ? lighthouseConfig : mobileConfig
    );
    
    if (!runnerResult || !runnerResult.lhr) {
      throw new Error('No lighthouse results returned');
    }
    
    const { lhr } = runnerResult;
    const scores = {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100)
    };
    
    console.log(`📊 ${pageName} scores:`, scores);
    
    // Save detailed report
    const reportPath = path.join(
      config.outputDir,
      `${pageName.toLowerCase().replace(/\s+/g, '-')}-${isDesktop ? 'desktop' : 'mobile'}.json`
    );
    fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2));
    
    return {
      pageName,
      url,
      device: isDesktop ? 'Desktop' : 'Mobile',
      scores,
      reportPath,
      audits: lhr.audits,
      opportunities: lhr.categories.performance.auditRefs
        .filter(ref => lhr.audits[ref.id].details && lhr.audits[ref.id].details.overallSavingsMs > 0)
        .map(ref => ({
          id: ref.id,
          title: lhr.audits[ref.id].title,
          description: lhr.audits[ref.id].description,
          savings: lhr.audits[ref.id].details.overallSavingsMs,
          score: lhr.audits[ref.id].score
        }))
        .sort((a, b) => b.savings - a.savings)
    };
    
  } catch (error) {
    console.error(`❌ Error auditing ${pageName}:`, error.message);
    return {
      pageName,
      url,
      device: isDesktop ? 'Desktop' : 'Mobile',
      error: error.message,
      scores: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 }
    };
  }
}

// Generate performance report
function generateReport(results) {
  const timestamp = new Date().toISOString();
  const averageScores = {
    performance: Math.round(results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length),
    accessibility: Math.round(results.reduce((sum, r) => sum + r.scores.accessibility, 0) / results.length),
    bestPractices: Math.round(results.reduce((sum, r) => sum + r.scores.bestPractices, 0) / results.length),
    seo: Math.round(results.reduce((sum, r) => sum + r.scores.seo, 0) / results.length)
  };
  
  // Collect all opportunities
  const allOpportunities = results
    .filter(r => r.opportunities)
    .flatMap(r => r.opportunities.map(opp => ({ ...opp, page: r.pageName })))
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 10); // Top 10 opportunities
  
  const report = `# Lighthouse Performance Audit Report

**Generated**: ${new Date(timestamp).toLocaleString()}  
**Base URL**: ${config.baseUrl}  
**Pages Audited**: ${results.length}

## Executive Summary

### Overall Scores

| Metric | Average Score | Target | Status |
|--------|---------------|--------|---------|
| Performance | ${averageScores.performance} | ${config.targetScores.performance} | ${averageScores.performance >= config.targetScores.performance ? '✅ PASS' : '❌ NEEDS IMPROVEMENT'} |
| Accessibility | ${averageScores.accessibility} | ${config.targetScores.accessibility} | ${averageScores.accessibility >= config.targetScores.accessibility ? '✅ PASS' : '❌ NEEDS IMPROVEMENT'} |
| Best Practices | ${averageScores.bestPractices} | ${config.targetScores.bestPractices} | ${averageScores.bestPractices >= config.targetScores.bestPractices ? '✅ PASS' : '❌ NEEDS IMPROVEMENT'} |
| SEO | ${averageScores.seo} | ${config.targetScores.seo} | ${averageScores.seo >= config.targetScores.seo ? '✅ PASS' : '❌ NEEDS IMPROVEMENT'} |

## Detailed Results

${results.map(result => `
### ${result.pageName} (${result.device})

**URL**: ${result.url}

| Metric | Score | Status |
|--------|-------|--------|
| Performance | ${result.scores.performance} | ${result.scores.performance >= config.targetScores.performance ? '✅' : '❌'} |
| Accessibility | ${result.scores.accessibility} | ${result.scores.accessibility >= config.targetScores.accessibility ? '✅' : '❌'} |
| Best Practices | ${result.scores.bestPractices} | ${result.scores.bestPractices >= config.targetScores.bestPractices ? '✅' : '❌'} |
| SEO | ${result.scores.seo} | ${result.scores.seo >= config.targetScores.seo ? '✅' : '❌'} |

${result.error ? `**Error**: ${result.error}` : ''}
`).join('')}

## Top Performance Opportunities

${allOpportunities.length > 0 ? allOpportunities.map((opp, index) => `
### ${index + 1}. ${opp.title}

**Page**: ${opp.page}  
**Potential Savings**: ${Math.round(opp.savings)}ms  
**Current Score**: ${opp.score ? Math.round(opp.score * 100) : 'N/A'}  

${opp.description}
`).join('') : 'No significant opportunities identified.'}

## Action Items to Reach >90 Scores

### Performance Improvements

- [ ] **Optimize Images**: Convert to WebP format, implement responsive images with srcset
- [ ] **Minimize JavaScript**: Remove unused code, implement code splitting
- [ ] **Optimize CSS**: Remove unused styles, inline critical CSS
- [ ] **Enable Compression**: Implement Gzip/Brotli compression
- [ ] **Optimize Fonts**: Use font-display: swap, preload critical fonts
- [ ] **Implement Caching**: Set appropriate cache headers for static assets
- [ ] **Reduce Server Response Time**: Optimize backend performance
- [ ] **Minimize Redirects**: Reduce unnecessary redirects

### Accessibility Improvements

- [ ] **Alt Text**: Ensure all images have descriptive alt attributes
- [ ] **Color Contrast**: Verify sufficient contrast ratios (4.5:1 minimum)
- [ ] **Keyboard Navigation**: Test and improve keyboard accessibility
- [ ] **ARIA Labels**: Add appropriate ARIA labels for interactive elements
- [ ] **Focus Management**: Implement visible focus indicators
- [ ] **Semantic HTML**: Use proper heading hierarchy and semantic elements
- [ ] **Form Labels**: Associate all form inputs with labels

### Best Practices Improvements

- [ ] **HTTPS**: Ensure all resources are served over HTTPS
- [ ] **Security Headers**: Implement CSP, HSTS, and other security headers
- [ ] **Console Errors**: Fix any JavaScript console errors
- [ ] **Deprecated APIs**: Update usage of deprecated browser APIs
- [ ] **Image Aspect Ratios**: Set explicit width/height to prevent layout shift
- [ ] **Third-party Scripts**: Audit and optimize third-party integrations

### SEO Improvements

- [ ] **Meta Tags**: Ensure all pages have unique titles and descriptions
- [ ] **Structured Data**: Implement JSON-LD structured data
- [ ] **Sitemap**: Submit XML sitemap to search engines
- [ ] **Robots.txt**: Configure proper robots.txt file
- [ ] **Internal Linking**: Improve internal link structure
- [ ] **Mobile Optimization**: Ensure mobile-friendly design
- [ ] **Page Speed**: Optimize Core Web Vitals metrics

## Next Steps

1. **Prioritize High-Impact Items**: Focus on opportunities with largest performance savings
2. **Implement Monitoring**: Set up continuous performance monitoring
3. **Regular Audits**: Schedule monthly Lighthouse audits
4. **Team Training**: Educate development team on performance best practices
5. **Performance Budget**: Establish performance budgets for future development

## Technical Details

**Lighthouse Version**: Latest  
**Chrome Version**: Latest  
**Audit Date**: ${new Date(timestamp).toLocaleDateString()}  
**Environment**: ${config.baseUrl.includes('localhost') ? 'Development' : 'Production'}  

---

*This report was generated automatically using Lighthouse CLI. For detailed technical information, refer to the individual JSON reports in the lighthouse-reports directory.*
`;
  
  return report;
}

// Main audit function
async function runAudit() {
  console.log('🚀 Starting Lighthouse audit...');
  
  let chrome;
  try {
    // Launch Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
    });
    
    const results = [];
    
    // Audit each page on both desktop and mobile
    for (const page of config.pages) {
      const url = `${config.baseUrl}${page.path}`;
      
      // Desktop audit
      const desktopResult = await auditPage(url, page.name, chrome, true);
      results.push(desktopResult);
      
      // Mobile audit
      const mobileResult = await auditPage(url, page.name, chrome, false);
      results.push(mobileResult);
      
      // Small delay between audits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Generate and save report
    const report = generateReport(results);
    const reportPath = path.join(config.outputDir, 'lighthouse-report.md');
    fs.writeFileSync(reportPath, report);
    
    // Save JSON summary
    const summaryPath = path.join(config.outputDir, 'audit-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      baseUrl: config.baseUrl,
      results: results.map(r => ({
        pageName: r.pageName,
        device: r.device,
        scores: r.scores,
        error: r.error
      }))
    }, null, 2));
    
    console.log('✅ Lighthouse audit complete!');
    console.log(`📊 Report saved to: ${reportPath}`);
    console.log(`📋 Summary saved to: ${summaryPath}`);
    
    // Print summary
    const averageScores = {
      performance: Math.round(results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length),
      accessibility: Math.round(results.reduce((sum, r) => sum + r.scores.accessibility, 0) / results.length),
      bestPractices: Math.round(results.reduce((sum, r) => sum + r.scores.bestPractices, 0) / results.length),
      seo: Math.round(results.reduce((sum, r) => sum + r.scores.seo, 0) / results.length)
    };
    
    console.log('\n📈 Average Scores:');
    console.log(`Performance: ${averageScores.performance}/100`);
    console.log(`Accessibility: ${averageScores.accessibility}/100`);
    console.log(`Best Practices: ${averageScores.bestPractices}/100`);
    console.log(`SEO: ${averageScores.seo}/100`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Install dependencies if not present
async function checkDependencies() {
  const requiredPackages = ['lighthouse', 'chrome-launcher'];
  const packageJson = require('../package.json');
  const installedPackages = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };
  
  const missing = requiredPackages.filter(pkg => !installedPackages[pkg]);
  
  if (missing.length > 0) {
    console.log('📦 Installing missing dependencies:', missing.join(', '));
    console.log('Run: npm install --save-dev lighthouse chrome-launcher');
    console.log('Then run this script again.');
    process.exit(1);
  }
}

// Run audit if called directly
if (require.main === module) {
  checkDependencies().then(() => {
    runAudit().catch(console.error);
  });
}

module.exports = { runAudit, auditPage, generateReport };