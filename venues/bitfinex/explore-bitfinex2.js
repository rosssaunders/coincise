import puppeteer from 'puppeteer';

const BASE_URL = 'https://docs.bitfinex.com';

const explorePages = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const pagesToExplore = [
    { name: 'Introduction', path: '/docs/introduction' },
    { name: 'REST General', path: '/docs/rest-general' },
    { name: 'Requirements and Limitations', path: '/docs/requirements-and-limitations' },
    { name: 'Authentication', path: '/docs/authentication' },
    { name: 'Changelog', path: '/docs/changelog' },
    { name: 'Abbreviations Glossary', path: '/docs/abbreviations-glossary' },
    { name: 'REST Auth', path: '/docs/rest-auth' }
  ];

  for (const { name, path: docPath } of pagesToExplore) {
    try {
      console.log(`\n\n=== ${name} (${docPath}) ===`);
      await page.goto(`${BASE_URL}${docPath}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const content = await page.evaluate(() => {
        const main = document.querySelector('main, article, .content, [role="main"]');
        if (!main) return 'No main content found';

        const headings = [];
        main.querySelectorAll('h1, h2, h3').forEach(h => {
          headings.push(`${h.tagName}: ${h.textContent.trim()}`);
        });

        return {
          headings: headings.slice(0, 15),
          textPreview: main.textContent.trim().substring(0, 300)
        };
      });

      console.log('Headings:', content.headings.join('\n  '));
      console.log('\nText Preview:', content.textPreview.substring(0, 200) + '...');

    } catch (error) {
      console.log(`Error accessing ${name}: ${error.message}`);
    }
  }

  await browser.close();
};

explorePages();
