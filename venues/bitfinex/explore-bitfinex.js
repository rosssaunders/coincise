import puppeteer from 'puppeteer';

const BASE_URL = 'https://docs.bitfinex.com';

const exploreDocumentation = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Navigate to the main authenticated endpoints page
    console.log('Navigating to authenticated endpoints...');
    await page.goto(`${BASE_URL}/docs/rest-auth`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Extract page structure
    const structure = await page.evaluate(() => {
      const result = {
        title: document.title,
        h1: [],
        h2: [],
        h3: [],
        sections: [],
        navigation: []
      };

      // Extract headings
      document.querySelectorAll('h1').forEach(h => {
        result.h1.push(h.textContent.trim());
      });

      document.querySelectorAll('h2').forEach(h => {
        result.h2.push(h.textContent.trim());
      });

      document.querySelectorAll('h3').forEach(h => {
        result.h3.push(h.textContent.trim());
      });

      // Look for navigation or sidebar links
      const navLinks = document.querySelectorAll('nav a, aside a, [role="navigation"] a');
      navLinks.forEach(link => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        if (text && href) {
          result.navigation.push({ text, href });
        }
      });

      return result;
    });

    console.log('\n=== Page Structure ===');
    console.log('Title:', structure.title);
    console.log('\nH1 Headings:', structure.h1);
    console.log('\nH2 Headings:', structure.h2.slice(0, 10), '...');
    console.log('\nNavigation Links (first 20):');
    structure.navigation.slice(0, 20).forEach(link => {
      console.log(`  ${link.text} -> ${link.href}`);
    });

    // Check for general documentation sections
    console.log('\n\n=== Checking for general documentation pages ===');
    const docsToCheck = [
      '/docs/introduction',
      '/docs/getting-started',
      '/docs/authentication',
      '/docs/rate-limits',
      '/docs/error-codes',
      '/docs/rest-general',
      '/docs/abbreviations-glossary',
      '/docs/changelog',
      '/docs/changes'
    ];

    for (const docPath of docsToCheck) {
      try {
        const response = await page.goto(`${BASE_URL}${docPath}`, {
          waitUntil: 'domcontentloaded',
          timeout: 5000
        });
        if (response && response.ok()) {
          console.log(`✓ Found: ${docPath}`);
        }
      } catch (e) {
        console.log(`✗ Not found: ${docPath}`);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
};

exploreDocumentation();
