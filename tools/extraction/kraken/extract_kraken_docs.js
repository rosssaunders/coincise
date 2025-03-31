const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

const krakenDocsUrls = {
  publicWebsocket: 'https://docs.kraken.com/websockets/#public',
  privateWebsocket: 'https://docs.kraken.com/websockets/#private',
  publicRest: 'https://docs.kraken.com/rest/#public',
  privateRest: 'https://docs.kraken.com/rest/#private',
  privatePostTrade: 'https://docs.kraken.com/rest/#post-trade'
};

const outputDir = path.join(__dirname, '../../../docs/kraken');
const combinedFilePath = path.join(outputDir, 'kraken_api_docs.md');

async function scrapeDocumentation(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const content = await page.content();
  await browser.close();

  return turndownService.turndown(content);
}

async function saveMarkdownFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

async function combineMarkdownFiles(filePaths, outputFilePath) {
  let combinedContent = '';

  for (const filePath of filePaths) {
    const content = fs.readFileSync(filePath, 'utf8');
    combinedContent += content + '\n\n';
  }

  fs.writeFileSync(outputFilePath, combinedContent);
}

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const publicWebsocketContent = await scrapeDocumentation(krakenDocsUrls.publicWebsocket);
  const privateWebsocketContent = await scrapeDocumentation(krakenDocsUrls.privateWebsocket);
  const publicRestContent = await scrapeDocumentation(krakenDocsUrls.publicRest);
  const privateRestContent = await scrapeDocumentation(krakenDocsUrls.privateRest);
  const privatePostTradeContent = await scrapeDocumentation(krakenDocsUrls.privatePostTrade);

  const publicWebsocketFilePath = path.join(outputDir, 'public_websocket.md');
  const privateWebsocketFilePath = path.join(outputDir, 'private_websocket.md');
  const publicRestFilePath = path.join(outputDir, 'public_rest.md');
  const privateRestFilePath = path.join(outputDir, 'private_rest.md');
  const privatePostTradeFilePath = path.join(outputDir, 'private_post_trade.md');

  await saveMarkdownFile(publicWebsocketFilePath, publicWebsocketContent);
  await saveMarkdownFile(privateWebsocketFilePath, privateWebsocketContent);
  await saveMarkdownFile(publicRestFilePath, publicRestContent);
  await saveMarkdownFile(privateRestFilePath, privateRestContent);
  await saveMarkdownFile(privatePostTradeFilePath, privatePostTradeContent);

  await combineMarkdownFiles([
    publicWebsocketFilePath,
    privateWebsocketFilePath,
    publicRestFilePath,
    privateRestFilePath,
    privatePostTradeFilePath
  ], combinedFilePath);

  console.log(`Combined markdown file saved to: ${combinedFilePath}`);
}

main().catch(console.error);
