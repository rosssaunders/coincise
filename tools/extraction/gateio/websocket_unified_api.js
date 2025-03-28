import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of endpoints to scrape
const endpoints = [
    "unified/ws/en/",
];

async function run() {
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

  // Custom rule for handling list items with tables
  turndownService.addRule('listItemWithTable', {
    filter: function (node) {
      return (
        node.nodeName === 'LI' &&
        node.querySelector('table')
      );
    },
    replacement: function (content, node) {
      let markdown = '- ';
      markdown += content.trim().replace(/\n/g, '\n  ');
      return markdown + '\n';
    }
  });

  for (const endpoint of endpoints) {
    const url = `https://www.gate.io/docs/developers/${endpoint}`;
    const htmlFilePath = path.join(__dirname, `gateio_${endpoint.replace(/\//g, '_')}.html`);
    const outputFilePath = path.join(__dirname, `../../../docs/gateio/websocket_unified_api.md`);

    try {
      await downloadHtml(url, htmlFilePath);
      const html = fs.readFileSync(htmlFilePath, 'utf8');
      const markdown = processHtml(html, turndownService);
      fs.writeFileSync(outputFilePath, markdown);
      console.log(`Markdown file created at: ${outputFilePath}`);
      fs.unlink(htmlFilePath, (err) => {
        if (err) {
          console.error('Error deleting HTML file:', err);
        } else {
          console.log('HTML file deleted successfully.');
        }
      });
    } catch (error) {
      console.error('Error processing HTML:', error);
    }
  }
}

function downloadHtml(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading HTML from ${url}...`);
    const file = fs.createWriteStream(filePath);
    axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html',
      },
      responseType: 'stream'
    }).then(response => {
      if (response.status !== 200) {
        reject(new Error(`Failed to download: HTTP status code ${response.status}`));
        return;
      }
      response.data.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Download completed successfully.');
        resolve();
      });
    }).catch(err => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
    file.on('error', err => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

function processHtml(html, turndownService) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const contentContainer = document.querySelector('div.col-md-9.col-lg-10.content__container');
  if (!contentContainer) {
    console.error('Could not find main content container');
    return '';
  }
  const content = contentContainer.innerHTML;
  return turndownService.turndown(content);
}

run().catch(console.error);
