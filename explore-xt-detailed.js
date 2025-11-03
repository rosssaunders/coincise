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
  
  // Wait for the sidebar to be populated
  await page.waitForSelector('.menu__list, [class*="sidebar"]', { timeout: 10000 });
  
  const structure = await page.evaluate(() => {
    // Find the main sidebar menu
    const menuLists = document.querySelectorAll('.menu__list');
    const categories = [];
    
    menuLists.forEach(list => {
      const items = Array.from(list.querySelectorAll('.menu__list-item')).map(item => {
        const link = item.querySelector('a');
        const nestedList = item.querySelector('.menu__list');
        
        return {
          text: link ? link.textContent.trim() : item.textContent.trim().split('\n')[0],
          href: link ? link.href : null,
          hasChildren: !!nestedList,
          isCategory: item.classList.contains('menu__list-item--collapsed') || !!nestedList
        };
      });
      
      if (items.length > 0) {
        categories.push(items);
      }
    });
    
    return {
      title: document.title,
      menuStructure: categories[0] || [],
      totalCategories: categories.length
    };
  });
  
  console.log(JSON.stringify(structure, null, 2));
  
  await browser.close();
};

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
