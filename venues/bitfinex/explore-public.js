import puppeteer from 'puppeteer';

const BASE_URL = 'https://docs.bitfinex.com';

const explorePublicPage = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    console.log('=== Exploring Public REST Page ===');
    await page.goto(`${BASE_URL}/docs/rest-public`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const info = await page.evaluate(() => {
      const result = {
        allLinks: [],
        referenceLinks: [],
        sections: []
      };

      // Get all links
      const links = document.querySelectorAll('a[href*="/reference/"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        result.allLinks.push({ text, href });
      });

      // Look for sections with strong tags
      const sections = document.querySelectorAll('p > strong, h2, h3');
      sections.forEach(section => {
        const sectionName = section.textContent.trim();
        result.sections.push(sectionName);
      });

      return result;
    });

    console.log(`Total reference links: ${info.allLinks.length}`);
    console.log('\nFirst 20 links:');
    info.allLinks.slice(0, 20).forEach(link => {
      console.log(`  ${link.text} -> ${link.href}`);
    });

    console.log('\nSections found:');
    info.sections.slice(0, 20).forEach(section => {
      console.log(`  ${section}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
};

explorePublicPage();
