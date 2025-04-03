const puppeteer = require('puppeteer');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');
const fs = require('fs').promises;
const links = require('./links.json');

// Add delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class App {
    constructor() {
        this.browser = null;
        this.turndownService = null;
        this.baseURL = links.baseURL;
    }

    async initialize() {
        // Initialize Turndown with GFM
        this.turndownService = new TurndownService({
            codeBlockStyle: 'fenced',
            fence: '```'
        });
        
        // Add GFM plugins (tables, strikethrough, etc)
        this.turndownService.use(turndownPluginGfm.gfm);

        // Launch browser with more realistic settings
        this.browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920x1080'
            ]
        });
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    async newPage() {
        const page = await this.browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        return page;
    }

    processSchemaSection(section) {
        // Extract basic parameter info
        const container = section.querySelector('.openapi-schema__container');
        if (!container) return null;

        const property = container.querySelector('.openapi-schema__property')?.textContent?.trim() || '';
        const type = container.querySelector('.openapi-schema__name')?.textContent?.trim() || '';
        const required = container.querySelector('.openapi-schema__required') ? 'required' : '';

        // Get description content
        let description = '';
        
        // Look for possible values and default value in all paragraphs
        const paragraphs = Array.from(section.querySelectorAll('p'));
        for (const p of paragraphs) {
            const text = p.textContent.trim();
            if (text.includes('Possible values:')) {
                description += text + ' ';
            } else if (text.includes('Default value:')) {
                description += text + ' ';
            }
        }

        // Get the main description
        const descriptionDivs = Array.from(section.querySelectorAll('div > div > p')).filter(p => {
            const text = p.textContent.trim();
            return text && 
                   !text.includes('Possible values:') && 
                   !text.includes('Default value:') &&
                   !text.startsWith(property) &&
                   !text.startsWith(type);
        });

        description += descriptionDivs.map(div => div.textContent.trim())
            .join(' ')
            .replace(/\s+/g, ' ')
            .replace(/•/g, '-')
            .replace(/<code>/g, '`')
            .replace(/<\/code>/g, '`')
            .trim();

        return { property, type, required, description };
    }

    async convertPageToMarkdown(url) {
        const page = await this.browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
            await delay(Math.random() * 2000 + 1000);

            // First, get the general endpoint information
            const endpointInfo = await page.evaluate(() => {
                const main = document.querySelector('main');
                if (!main) return null;

                // Clone the main content
                const mainClone = main.cloneNode(true);

                // Remove the right panel containing API explorer and examples
                const rightPanel = mainClone.querySelector('.openapi-right-panel__container');
                if (rightPanel) {
                    rightPanel.remove();
                }

                // Remove all schema-related content
                const schemaContainers = mainClone.querySelectorAll('.openapi-tabs__mime-container, .details_lb9f, [class*="openapi-tabs__mime"]');
                schemaContainers.forEach(container => container.remove());

                // Remove any remaining API explorer elements
                const explorerElements = mainClone.querySelectorAll('[class*="openapi-explorer"]');
                explorerElements.forEach(el => el.remove());

                // Remove any details elements that might contain raw request/response bodies
                const detailsElements = mainClone.querySelectorAll('details');
                detailsElements.forEach(details => {
                    if (details.textContent.includes('Body') || 
                        details.textContent.includes('Request') || 
                        details.textContent.includes('Response')) {
                        details.remove();
                    }
                });

                return mainClone.innerHTML;
            });

            // Convert general info to markdown
            let markdown = '';
            if (endpointInfo) {
                markdown = this.turndownService.turndown(endpointInfo) + '\n\n';
            }

            // Now process the parameter tables
            const schemaSections = await page.$$('.openapi-schema__list-item');
            if (schemaSections.length > 0) {
                markdown += '### Request Parameters\n\n';
                markdown += '| Parameter | Type | Required | Description |\n|-----------|------|----------|-------------|\n';
                
                for (const section of schemaSections) {
                    const details = await page.evaluate(this.processSchemaSection, section);
                    if (details) {
                        markdown += `| ${details.property} | ${details.type} | ${details.required} | ${details.description} |\n`;
                    }
                }

                markdown += '\n';
            }

            return markdown;

        } catch (error) {
            console.error(`Error processing ${url}:`, error);
            await page.screenshot({ path: `error-${url.split('/').pop()}.png` });
            return null;
        } finally {
            await page.close();
        }
    }

    async run() {
        try {
            console.log('Starting Kraken documentation conversion process...');
            
            let combinedMarkdown = '# Kraken API Documentation\n\n';
            
            for (const [category, urls] of Object.entries(links.categories)) {
                console.log(`Processing category: ${category}`);
                combinedMarkdown += `## ${category}\n\n`;
                
                for (const urlPath of urls) {
                    const fullUrl = `${this.baseURL}/${urlPath}`;
                    console.log(`Processing page: ${fullUrl}`);
                    
                    const pageMarkdown = await this.convertPageToMarkdown(fullUrl);
                    if (pageMarkdown) {
                        combinedMarkdown += pageMarkdown + '\n\n';
                        console.log(`Successfully processed page: ${urlPath}`);
                    } else {
                        console.log(`Failed to process page: ${urlPath}`);
                    }
                    
                    await delay(3000);
                }
                
                combinedMarkdown += '\n';
            }

            console.log('Writing combined documentation to file...');
            await fs.writeFile('../../../docs/kraken/api.md', combinedMarkdown);
            console.log('Documentation conversion complete! Output file: kraken/api.md');
            
        } catch (error) {
            console.error('Error in main execution:', error);
            throw error;
        }
    }
}

// Main execution
async function main() {
    const app = new App();
    try {
        await app.initialize();
        await app.run();
        process.exit(0);
    } catch (error) {
        console.error('Unhandled error:', error);
        process.exit(1);
    } finally {
        await app.cleanup();
    }
}

main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
