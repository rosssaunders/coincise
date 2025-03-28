import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';
import axios from 'axios';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL to download the HTML file from
const gateioDocsUrl = 'https://www.gate.io/docs/developers/apiv4/en/';

// Initialize turndown service
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});


// Custom rules for tables
turndownService.addRule('table', {
  filter: 'table',
  replacement: function(content, node) {
    const rows = Array.from(node.querySelectorAll('tr'));
    if (rows.length === 0) return '';
    
    let markdown = '';
    
    // Process header
    const headerCells = Array.from(rows[0].querySelectorAll('th'));
    if (headerCells.length > 0) {
      markdown += '|';
      headerCells.forEach(cell => {
        markdown += ` ${cell.textContent.trim()} |`;
      });
      markdown += '\n|';
      headerCells.forEach(() => {
        markdown += ' --- |';
      });
      markdown += '\n';
    }
    
    // Process rows
    const startRow = headerCells.length > 0 ? 1 : 0;
    for (let i = startRow; i < rows.length; i++) {
      const cells = Array.from(rows[i].querySelectorAll('td'));
      if (cells.length > 0) {
        markdown += '|';
        cells.forEach(cell => {
          markdown += ` ${cell.textContent.trim().replace(/\n/g, ' ')} |`;
        });
        markdown += '\n';
      }
    }
    
    return markdown + '\n';
  }
});

// Enhance code block handling
turndownService.addRule('codeBlock', {
  filter: 'pre',  // Only process pre elements, not code elements
  replacement: function(content, node) {
    // Determine language if possible
    let language = '';
    if (node.className) {
      // Handle cases where there might be extra classes or no language specified
      const classes = node.className.split(' ');
      const langClass = classes.find(cls => cls.startsWith('language-'));
      if (langClass) {
        language = langClass.replace('language-', '').trim();
      }
    }
    
    // Trim the content to remove any leading/trailing whitespace
    const trimmedContent = content.trim();
    
    // Return the code block with proper newlines
    return `\n\`\`\`${language}\n${trimmedContent}\n\`\`\`\n`;
  }
});

// Path to the HTML file
const htmlFilePath = path.join(__dirname, 'gateio.html');
const outputFilePath = path.join(__dirname, 'gateio.md');

// Function to download HTML file
function downloadHtml(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading HTML from ${url}...`);
    
    const file = fs.createWriteStream(filePath);
    
    axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.gate.io/'
      },
      responseType: 'stream'
    }).then(response => {
      // Check if we got a successful response
      if (response.status !== 200) {
        reject(new Error(`Failed to download: HTTP status code ${response.status}`));
        return;
      }
      
      // Pipe the response to the file
      response.data.pipe(file);
      
      // Handle completion
      file.on('finish', () => {
        file.close();
        console.log('Download completed successfully.');
        resolve();
      });
    }).catch(err => {
      // Clean up file on error
      fs.unlink(filePath, () => {});
      reject(err);
    });
    
    // Handle write errors
    file.on('error', err => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

// Function to process HTML and convert to markdown
function processHtml(html) {
  console.log('HTML file loaded, parsing...');
  
  try {
    // Parse the HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Clean up the HTML - remove scripts, styles, etc.
    const scripts = document.querySelectorAll('script');
    Array.from(scripts).forEach(script => script.remove());
    
    const styles = document.querySelectorAll('style');
    Array.from(styles).forEach(style => style.remove());
    
    // Get the main content
    const contentContainer = document.querySelector('div.col-md-9.col-lg-10.content__container');
    
    if (!contentContainer) {
      console.error('Could not find main content container');
      return;
    }
    
    // Remove changelog section if it exists
    const changelogHeading = contentContainer.querySelector('h1#changelog');
    if (changelogHeading) {
      const changelogBlock = changelogHeading.closest('div.content-block');
      if (changelogBlock) {
        changelogBlock.remove();
      }
    }

    // Remove content-block__examples sections
    const examples = contentContainer.querySelectorAll('div.content-block__examples');
    Array.from(examples).forEach(example => example.remove());

    // Remove example sections
    const exampleDivs = contentContainer.querySelectorAll('div[type="example"].examples');
    Array.from(exampleDivs).forEach(example => example.remove());
    
    const content = contentContainer.innerHTML;
    
    // Convert to markdown
    console.log('Converting to markdown...');
    const markdown = turndownService.turndown(content);
    
    // Write to file
    fs.writeFile(outputFilePath, markdown, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Markdown file created at:', outputFilePath);
    });
  } catch (error) {
    console.error('Error processing HTML:', error);
  }
}

// Main execution
async function main() {
  // Check if HTML file exists
  if (!fs.existsSync(htmlFilePath)) {
    try {
      // If not, download it
      await downloadHtml(gateioDocsUrl, htmlFilePath);
    } catch (error) {
      console.error('Error downloading HTML file:', error);
      return;
    }
  } else {
    console.log('HTML file already exists, skipping download.');
  }

  // Read the HTML file
  console.log('Reading HTML file...');
  fs.readFile(htmlFilePath, 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    
    processHtml(html);
  });
}

// Run the main function
main().catch(error => {
  console.error('Error in main execution:', error);
});