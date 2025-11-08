import puppeteer from 'puppeteer';

const BASE_URL = 'https://docs.bitfinex.com';

const exploreContent = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Check the reference page for wallets
    console.log('=== Wallets Reference Page ===');
    await page.goto(`${BASE_URL}/reference/rest-auth-wallets`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const content = await page.evaluate(() => {
      const main = document.querySelector('main, article, .content-body, [role="main"]');
      if (!main) return { error: 'No main content found' };

      // Get the actual endpoint info
      const result = {
        allText: main.textContent.substring(0, 500),
        codeBlocks: [],
        tables: []
      };

      // Extract code blocks
      main.querySelectorAll('pre, code').forEach((code, i) => {
        if (i < 5) {
          result.codeBlocks.push(code.textContent.trim().substring(0, 200));
        }
      });

      // Extract tables
      main.querySelectorAll('table').forEach((table, i) => {
        if (i < 2) {
          const rows = Array.from(table.querySelectorAll('tr')).slice(0, 3).map(tr => {
            return Array.from(tr.querySelectorAll('td, th')).map(cell => cell.textContent.trim()).join(' | ');
          });
          result.tables.push(rows.join('\n'));
        }
      });

      return result;
    });

    console.log('Text preview:', content.allText);
    console.log('\nCode blocks:');
    content.codeBlocks.forEach((code, i) => {
      console.log(`\nCode ${i + 1}:\n${code.substring(0, 150)}...`);
    });
    console.log('\nTables:');
    content.tables.forEach((table, i) => {
      console.log(`\nTable ${i + 1}:\n${table}`);
    });

    // Check public endpoint
    console.log('\n\n=== Public Platform Status Endpoint ===');
    await page.goto(`${BASE_URL}/reference/rest-public-platform-status`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const publicContent = await page.evaluate(() => {
      const main = document.querySelector('main, article, .content-body, [role="main"]');
      if (!main) return { error: 'No main content found' };

      return {
        title: document.title,
        allText: main.textContent.substring(0, 400),
        hasAuthInfo: main.textContent.toLowerCase().includes('authentication') ||
                     main.textContent.toLowerCase().includes('api-key')
      };
    });

    console.log('Title:', publicContent.title);
    console.log('Text preview:', publicContent.allText);
    console.log('Has Auth Info:', publicContent.hasAuthInfo);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
};

exploreContent();
