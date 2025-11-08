import puppeteer from 'puppeteer';

const BASE_URL = 'https://docs.bitfinex.com';

const exploreEndpoints = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Check REST authenticated endpoints
    console.log('=== REST Authenticated Endpoints ===');
    await page.goto(`${BASE_URL}/docs/rest-auth`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const authEndpoints = await page.evaluate(() => {
      const result = [];
      
      // Look for endpoint sections
      const sections = document.querySelectorAll('p > strong');
      sections.forEach(section => {
        const sectionName = section.textContent.trim();
        
        // Find the list after this section
        let listElement = section.parentElement.nextElementSibling;
        while (listElement && listElement.tagName !== 'UL') {
          listElement = listElement.nextElementSibling;
        }
        
        if (listElement) {
          const links = Array.from(listElement.querySelectorAll('a')).map(a => ({
            title: a.textContent.trim(),
            url: a.getAttribute('href')
          }));
          
          if (links.length > 0) {
            result.push({
              section: sectionName,
              count: links.length,
              examples: links.slice(0, 3)
            });
          }
        }
      });
      
      return result;
    });

    console.log('\nAuthenticated Endpoint Sections:');
    authEndpoints.forEach(section => {
      console.log(`\n${section.section}: ${section.count} endpoints`);
      section.examples.forEach(ep => {
        console.log(`  - ${ep.title} (${ep.url})`);
      });
    });

    // Check REST public endpoints
    console.log('\n\n=== REST Public Endpoints ===');
    await page.goto(`${BASE_URL}/docs/rest-public`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const publicEndpoints = await page.evaluate(() => {
      const result = [];
      
      const sections = document.querySelectorAll('p > strong');
      sections.forEach(section => {
        const sectionName = section.textContent.trim();
        
        let listElement = section.parentElement.nextElementSibling;
        while (listElement && listElement.tagName !== 'UL') {
          listElement = listElement.nextElementSibling;
        }
        
        if (listElement) {
          const links = Array.from(listElement.querySelectorAll('a')).map(a => ({
            title: a.textContent.trim(),
            url: a.getAttribute('href')
          }));
          
          if (links.length > 0) {
            result.push({
              section: sectionName,
              count: links.length,
              examples: links.slice(0, 3)
            });
          }
        }
      });
      
      return result;
    });

    console.log('\nPublic Endpoint Sections:');
    publicEndpoints.forEach(section => {
      console.log(`\n${section.section}: ${section.count} endpoints`);
      section.examples.forEach(ep => {
        console.log(`  - ${ep.title} (${ep.url})`);
      });
    });

    // Check a sample endpoint page to understand structure
    console.log('\n\n=== Sample Endpoint Page Structure ===');
    if (publicEndpoints.length > 0 && publicEndpoints[0].examples.length > 0) {
      const sampleUrl = publicEndpoints[0].examples[0].url;
      const fullUrl = sampleUrl.startsWith('http') ? sampleUrl : `${BASE_URL}${sampleUrl}`;
      
      await page.goto(fullUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const structure = await page.evaluate(() => {
        const main = document.querySelector('main, article, .content-body');
        if (!main) return { headings: [], hasCode: false };

        const headings = Array.from(main.querySelectorAll('h1, h2, h3, h4')).map(h => 
          `${h.tagName}: ${h.textContent.trim()}`
        );

        const hasCode = main.querySelectorAll('code, pre').length > 0;
        const hasTables = main.querySelectorAll('table').length > 0;

        return { headings: headings.slice(0, 10), hasCode, hasTables };
      });

      console.log(`URL: ${fullUrl}`);
      console.log('Headings:', structure.headings.join('\n  '));
      console.log(`Has code blocks: ${structure.hasCode}`);
      console.log(`Has tables: ${structure.hasTables}`);
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
};

exploreEndpoints();
