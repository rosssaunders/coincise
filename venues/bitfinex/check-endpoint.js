import puppeteer from 'puppeteer';

const BASE_URL = 'https://docs.bitfinex.com';

const checkEndpoint = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Check a sample authenticated endpoint
    console.log('=== Sample Authenticated Endpoint ===');
    await page.goto(`${BASE_URL}/reference/rest-auth-wallets`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const endpointInfo = await page.evaluate(() => {
      const result = {
        title: document.title,
        headings: [],
        httpMethod: null,
        path: null,
        hasAuth: false,
        hasParams: false,
        hasResponse: false
      };

      // Get headings
      document.querySelectorAll('h1, h2, h3').forEach(h => {
        result.headings.push(`${h.tagName}: ${h.textContent.trim()}`);
      });

      // Look for HTTP method and path
      const codeBlocks = document.querySelectorAll('code, pre');
      codeBlocks.forEach(code => {
        const text = code.textContent;
        if (text.includes('POST /') || text.includes('GET /')) {
          result.httpMethod = text.match(/(POST|GET|PUT|DELETE|PATCH)/)?.[0];
          result.path = text.match(/\/(v\d+\/[^\s\n]+)/)?.[1];
        }
      });

      // Check for authentication info
      result.hasAuth = document.body.textContent.toLowerCase().includes('authentication') ||
                       document.body.textContent.includes('api-key');

      // Check for parameters/request body
      result.hasParams = document.body.textContent.toLowerCase().includes('parameters') ||
                        document.body.textContent.toLowerCase().includes('request');

      // Check for response info
      result.hasResponse = document.body.textContent.toLowerCase().includes('response');

      return result;
    });

    console.log('Title:', endpointInfo.title);
    console.log('HTTP Method:', endpointInfo.httpMethod);
    console.log('Path:', endpointInfo.path);
    console.log('Has Auth info:', endpointInfo.hasAuth);
    console.log('Has Params:', endpointInfo.hasParams);
    console.log('Has Response:', endpointInfo.hasResponse);
    console.log('\nHeadings:');
    endpointInfo.headings.slice(0, 10).forEach(h => console.log(`  ${h}`));

    // Now check the public endpoints page structure
    console.log('\n\n=== Public Endpoints Page ===');
    await page.goto(`${BASE_URL}/docs/rest-public`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const publicStructure = await page.evaluate(() => {
      const result = {
        sections: [],
        totalLinks: 0
      };

      // Look for sections
      const strongTags = document.querySelectorAll('p > strong, h2 > strong, h3 > strong');
      strongTags.forEach(strong => {
        const sectionName = strong.textContent.trim();
        
        // Find the list after this section
        let listElement = strong.parentElement.nextElementSibling;
        while (listElement && listElement.tagName !== 'UL') {
          listElement = listElement.nextElementSibling;
        }
        
        if (listElement) {
          const links = Array.from(listElement.querySelectorAll('a')).map(a => ({
            title: a.textContent.trim(),
            url: a.getAttribute('href')
          }));
          
          if (links.length > 0) {
            result.sections.push({
              section: sectionName,
              count: links.length,
              links: links.slice(0, 2)
            });
            result.totalLinks += links.length;
          }
        }
      });

      // Also check for direct links in the main content
      const mainContent = document.querySelector('main, article, .content-body');
      if (mainContent) {
        const allLinks = Array.from(mainContent.querySelectorAll('a[href*="/reference/"]'));
        result.referenceLinks = allLinks.length;
      }

      return result;
    });

    console.log(`Found ${publicStructure.sections.length} sections`);
    console.log(`Total endpoint links: ${publicStructure.totalLinks}`);
    console.log(`Reference links in content: ${publicStructure.referenceLinks}`);
    
    if (publicStructure.sections.length > 0) {
      console.log('\nSections:');
      publicStructure.sections.forEach(section => {
        console.log(`\n${section.section}: ${section.count} endpoints`);
        section.links.forEach(link => {
          console.log(`  - ${link.title} (${link.url})`);
        });
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
};

checkEndpoint();
