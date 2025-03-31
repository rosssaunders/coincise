const fetch = require('node-fetch');
const TurndownService = require('turndown');

class DocProcessor {
  constructor({ endpoints, outputFile, title }) {
    this.endpoints = endpoints;
    this.outputFile = outputFile;
    this.title = title;
    this.turndownService = new TurndownService();
  }

  async processDocs() {
    const markdownContent = [`# ${this.title}\n`];

    for (const endpoint of this.endpoints) {
      const htmlContent = await this.fetchPage(endpoint);
      const markdown = this.extractContent(htmlContent);
      markdownContent.push(markdown);
    }

    const fs = require('fs');
    fs.writeFileSync(this.outputFile, markdownContent.join('\n'));
  }

  async fetchPage(url) {
    const response = await fetch(url);
    return await response.text();
  }

  extractContent(html) {
    return this.turndownService.turndown(html);
  }
}

module.exports = DocProcessor;
