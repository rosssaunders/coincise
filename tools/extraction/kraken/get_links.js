const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DOC_URLS = [
  'https://docs.kraken.com/api/docs/rest-api/add-order/',
  'https://docs.kraken.com/api/docs/websocket-v2/add_order/',
  'https://docs.kraken.com/api/docs/fix-api/nos-fix/',
  'https://docs.kraken.com/api/docs/guides/global-intro'
];

async function extractLinks(page, url) {
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for any of the possible sidebar selectors
  await Promise.race([
    page.waitForSelector('nav[aria-label="Docs sidebar"]', { timeout: 10000 }),
    page.waitForSelector('.menu__list', { timeout: 10000 }),
    page.waitForSelector('.theme-doc-sidebar-container', { timeout: 10000 })
  ]);

  // Extract the links and their categories from the sidebar
  return await page.evaluate(() => {
    const categories = {};
    let currentMainCategory = '';
    let currentSubCategory = '';

    function processMenuItems(container, level = 0) {
      const items = container.children;
      
      Array.from(items).forEach(item => {
        // Check if this is a category
        const isCategory = item.classList.contains('menu__list-item--collapsible') ||
                         item.classList.contains('theme-doc-sidebar-item-category') ||
                         item.querySelector('a[href*="/category/"]');
        
        if (isCategory) {
          const categoryLink = item.querySelector('a');
          const categoryName = categoryLink ? categoryLink.textContent.trim() : '';
          
          if (level === 0) {
            currentMainCategory = categoryName;
            currentSubCategory = '';
            if (!categories[currentMainCategory]) {
              categories[currentMainCategory] = [];
            }
          } else {
            currentSubCategory = categoryName;
            if (!categories[currentMainCategory]) {
              categories[currentMainCategory] = [];
            }
          }
          
          // Process nested items
          const subList = item.querySelector('.menu__list, .theme-doc-sidebar-menu');
          if (subList) {
            processMenuItems(subList, level + 1);
          }
        } else {
          // This is a regular link
          const link = item.querySelector('a');
          if (link && link.href) {
            const href = link.href;
            const relativePath = href.split('/docs/')[1];
            if (relativePath) {
              const category = currentSubCategory || currentMainCategory;
              if (!categories[category]) {
                categories[category] = [];
              }
              if (!categories[category].includes(relativePath)) {
                categories[category].push(relativePath);
              }
            }
          }
        }
      });
    }

    // Find and process all menu lists
    const menuLists = document.querySelectorAll('.menu__list, .theme-doc-sidebar-menu');
    menuLists.forEach(list => processMenuItems(list));

    // Clean up empty categories
    Object.keys(categories).forEach(key => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  });
}

async function mergeCategories(categories1, categories2) {
  const merged = { ...categories1 };
  
  for (const [category, links] of Object.entries(categories2)) {
    if (!merged[category]) {
      merged[category] = [];
    }
    // Add unique links and ensure they're not duplicated in other categories
    links.forEach(link => {
      // Check if this link exists in any other category
      const existsInOther = Object.entries(merged).some(([otherCat, otherLinks]) => 
        otherCat !== category && otherLinks.includes(link)
      );
      
      // Only add if it's not a duplicate and not in another category
      if (!existsInOther && !merged[category].includes(link)) {
        merged[category].push(link);
      }
    });
    
    // Remove the category if it has no links after deduplication
    if (merged[category].length === 0) {
      delete merged[category];
    }
  }
  
  return merged;
}

(async () => {
  // Launch the browser with additional arguments to make it look more like a real browser
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });
  
  const page = await browser.newPage();
  
  // Set a realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  
  // Set viewport to a common resolution
  await page.setViewport({
    width: 1920,
    height: 1080
  });

  // Set additional headers to look more like a real browser
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0'
  });

  let allCategories = {};

  // Process each URL
  for (const url of DOC_URLS) {
    console.log(`Processing ${url}...`);
    try {
      const categories = await extractLinks(page, url);
      allCategories = await mergeCategories(allCategories, categories);
    } catch (error) {
      console.error(`Error processing ${url}:`, error.message);
    }
  }

  // Create the final output structure
  const output = {
    baseURL: 'https://docs.kraken.com/api/docs',
    categories: allCategories
  };

  // Save to links.json
  const outputPath = path.join(__dirname, 'links.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Results saved to ${outputPath}`);

  await browser.close();
})();