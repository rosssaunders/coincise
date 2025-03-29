/**
 * Legacy entry point for the Coinbase Exchange API scraper
 * This file is maintained for backward compatibility.
 * Please use index.js for new code.
 */

// Import from the new structure
const { scrapeApiDocumentation } = require('./scraper');

// For backward compatibility
if (require.main === module) {
  // Show deprecation warning
  console.warn('WARNING: scrape.js is deprecated. Please use index.js instead.');
  
  // Forward to new CLI
  require('./index');
}

// Export for backward compatibility
module.exports = {
  scrapeApiDocumentation
};