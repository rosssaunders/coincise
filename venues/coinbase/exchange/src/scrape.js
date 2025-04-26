/**
 * Legacy entry point for the Coinbase Exchange API scraper
 * This file is maintained for backward compatibility.
 * Please use index.js for new code.
 */

// Import from the new structure
import { scrapeApiDocumentation } from './scraper.js'
// const { scrapeApiDocumentation } = require('./scraper');

// For backward compatibility
/* TODO: This check is CommonJS specific and needs reconsideration in ES modules
if (require.main === module) {
  // Show deprecation warning
  console.warn('WARNING: scrape.js is deprecated. Please use index.js instead.');
  
  // Forward to new CLI
  require('./index'); // This likely needs updating to import('./main.js') or similar
}
*/

// Export for backward compatibility
export { scrapeApiDocumentation }
