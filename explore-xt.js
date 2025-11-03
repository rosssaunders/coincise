import puppeteer from 'puppeteer';

const main = async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-first-run',
      '--no-zygote'
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to XT.com documentation...');
  await page.goto('https://doc.xt.com/docs/index_overview/overview', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });
  
  console.log('Page loaded. Extracting structure...');
  
  const structure = await page.evaluate(() => {
    const info = {
      title: document.title,
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
      h2: Array.from(document.querySelectorAll('h2')).slice(0, 10).map(h => h.textContent.trim()),
      navigation: Array.from(document.querySelectorAll('nav a, .sidebar a, [class*="menu"] a, [class*="nav"] a'))
        .slice(0, 20)
        .map(a => ({
          text: a.textContent.trim(),
          href: a.href
        })),
      hasDataSectionId: document.querySelectorAll('[data-section-id]').length > 0,
      possibleSections: Array.from(document.querySelectorAll('[class*="section"], [id*="section"]'))
        .slice(0, 5)
        .map(el => ({
          tag: el.tagName,
          id: el.id,
          classes: el.className
        }))
    };
    return info;
  });
  
  console.log('\n=== Page Structure ===');
  console.log(JSON.stringify(structure, null, 2));
  
  await browser.close();
  console.log('\nExploration complete!');
};

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
