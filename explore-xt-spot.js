import puppeteer from 'puppeteer';

const main = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to Spot Trading API...');
  await page.goto('https://doc.xt.com/docs/spot/Access%20Description/BasicInformationOfTheInterface', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });
  
  const structure = await page.evaluate(() => {
    const sidebar = document.querySelector('.menu, [class*="sidebar"], nav');
    const links = sidebar ? Array.from(sidebar.querySelectorAll('a')).map(a => ({
      text: a.textContent.trim(),
      href: a.href
    })) : [];
    
    return {
      title: document.title,
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()).slice(0, 5),
      h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim()).slice(0, 10),
      sidebarLinks: links.slice(0, 30),
      mainContentClasses: Array.from(document.querySelectorAll('[class*="main"], article, [class*="content"]'))
        .map(el => el.className).slice(0, 3)
    };
  });
  
  console.log(JSON.stringify(structure, null, 2));
  
  await browser.close();
};

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
