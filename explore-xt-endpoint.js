import puppeteer from 'puppeteer';

const main = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to Market section...');
  await page.goto('https://doc.xt.com/docs/spot/market/queryAllSpotTradingSymbols', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });
  
  const structure = await page.evaluate(() => {
    const main = document.querySelector('article, main, [class*="docMainContainer"]');
    
    return {
      title: document.title,
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
      h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim()),
      h3: Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim()),
      tables: Array.from(document.querySelectorAll('table')).length,
      codeBlocks: Array.from(document.querySelectorAll('pre, code')).length,
      mainContent: main ? main.textContent.substring(0, 500) : 'No main content found'
    };
  });
  
  console.log(JSON.stringify(structure, null, 2));
  
  await browser.close();
};

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
