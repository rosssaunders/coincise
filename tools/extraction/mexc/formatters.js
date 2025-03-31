const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const TurndownService = require('turndown');

/**
 * Process authentication HTML to markdown table
 * @param {string} authHtml - HTML content of auth section
 * @returns {string|null} - Markdown table or null
 */
const processAuthSection = (authHtml) => {
  if (!authHtml) return null;
  
  const dom = new JSDOM(authHtml);
  const document = dom.window.document;
  
  // Find all auth items
  const authItems = document.querySelectorAll('.authItem_haxh');
  
  if (authItems.length === 0) return null;
  
  // Create the markdown table
  let markdownTable = `
## Authentication

| Parameter | Type | Required |
| --------- | ---- | -------- |
`;
  
  // Process each auth item
  authItems.forEach(item => {
    const paramName = item.querySelector('label')?.textContent.trim() || '';
    const paramType = item.querySelector('.authType_Ecpv')?.textContent.trim() || '';
    const required = item.querySelector('.authRequired_AspY')?.textContent.trim() || '';
    
    markdownTable += `| ${paramName} | ${paramType} | ${required} |\n`;
  });
  
  return markdownTable;
};

/**
 * Process request parameters HTML to markdown table
 * @param {string} paramsHtml - HTML content of request params section
 * @returns {string|null} - Markdown table or null
 */
const processRequestParams = (paramsHtml) => {
  if (!paramsHtml) return null;
  
  const dom = new JSDOM(paramsHtml);
  const document = dom.window.document;
  
  // First determine if this is for query params or body params or path params
  const sectionTitle = document.querySelector('h3')?.textContent.trim();
  const isQueryParams = sectionTitle === 'Query Params';
  const isPathParams = sectionTitle === 'Path Params';
  const isBodyParams = sectionTitle === 'Body params';
  
  // Find all param items
  // Support both paramItem_Izrs (newer UI) and listItem_mkJa (older UI)
  const paramItems = document.querySelectorAll('.paramItem_Izrs, .listItem_mkJa');
  
  if (paramItems.length === 0) return null;
  
  // Create the markdown table with appropriate title
  let markdownTable = `
## ${isPathParams ? 'Path Parameters' : isQueryParams ? 'Query Parameters' : 'Request Parameters'}

| Parameter | Type | ${isQueryParams || isPathParams ? 'Required | ' : ''}Description |
| --------- | ---- | ${isQueryParams || isPathParams ? '-------- | ' : ''}----------- |
`;
  
  // Process each param item
  paramItems.forEach(item => {
    // Support both newer and older UI class names
    const paramName = item.querySelector('.paramName_MlmJ, .paramName__NgG')?.textContent.trim() || '';
    const paramType = item.querySelector('.paramType_HWMI, .paramType_KuQf')?.textContent.trim() || '';
    const isRequired = item.querySelector('.paramRequired_Dtof') !== null ? 'Yes' : 'No';
    
    // Get description from paragraph
    let description = '';
    const paragraph = item.querySelector('.paragraph_nrmP');
    const possibleValues = item.querySelector('.possibleValues_iyE0');
    
    if (paragraph) {
      // Extract description and handle code tags
      description = paragraph.innerHTML
        .replace(/<code>(.*?)<\/code>/g, '`$1`')
        .replace(/<\/?[^>]+(>|$)/g, ''); // Remove other HTML tags
    } else if (possibleValues) {
      description = possibleValues.textContent.trim();
    }
    
    // Escape pipe characters in markdown table
    const escapedName = paramName.replace(/\|/g, '\\|');
    const escapedType = paramType.replace(/\|/g, '\\|');
    const escapedDesc = description.replace(/\|/g, '\\|');
    
    if (isQueryParams || isPathParams) {
      markdownTable += `| ${escapedName} | ${escapedType} | ${isRequired} | ${escapedDesc} |\n`;
    } else {
      markdownTable += `| ${escapedName} | ${escapedType} | ${escapedDesc} |\n`;
    }
  });
  
  return markdownTable;
};

/**
 * Generate markdown for API response details
 * @param {Array} modalResults - Array of response modal results
 * @returns {string} - Markdown content
 */
const generateResponseMarkdown = (modalResults) => {
  if (!modalResults || modalResults.length === 0) {
    return '';
  }
  
  let markdown = '## API Response Details\n\n';
  
  modalResults.forEach(result => {
    if (!result.buttonText || !result.modalContent || !result.modalContent.properties) {
      return;
    }
    
    // Ensure proper spacing between HTTP status code and description
    // Extract and format HTTP status code and description
    // This handles cases like "401Unauthorized" or "200OK" and formats to "401 Unauthorized"
    let formattedButtonText = result.buttonText;
    
    // First clean up the text (remove any extraneous content)
    formattedButtonText = formattedButtonText.replace(/OpenInFull|[\r\n]+/g, '').trim();
    
    // Format HTTP status codes - handle various patterns
    // 1. Match digit sequence followed by uppercase letter and insert space
    formattedButtonText = formattedButtonText.replace(/(\d+)([A-Z][a-z])/g, '$1 $2');
    
    // 2. Match digit sequence followed immediately by any letter (catches additional cases)
    formattedButtonText = formattedButtonText.replace(/(\d+)([a-zA-Z])/g, '$1 $2');
    
    markdown += `### Response: ${formattedButtonText}\n\n`;
    markdown += '| Property | Type | Description |\n';
    markdown += '| -------- | ---- | ----------- |\n';
    
    result.modalContent.properties.forEach(prop => {
      // Escape pipe characters in markdown table
      const escapedName = prop.name.replace(/\|/g, '\\|');
      const escapedType = prop.type.replace(/\|/g, '\\|');
      const escapedDesc = prop.description.replace(/\|/g, '\\|');
      
      markdown += `| ${escapedName} | ${escapedType} | ${escapedDesc} |\n`;
    });
    
    markdown += '\n';
  });
  
  return markdown;
};

/**
 * Generate the complete markdown document
 * @param {string} articleContent - Content from the article section
 * @param {Array} modalResults - Array of response modal results
 * @param {string} authMarkdown - Authentication markdown
 * @param {string} requestParamsMarkdown - Request parameters markdown
 * @param {string} pathParamsMarkdown - Path parameters markdown
 * @param {string} queryParamsMarkdown - Query parameters markdown
 * @param {string} publicWebsocketMarkdown - Public websocket markdown
 * @param {string} privateWebsocketMarkdown - Private websocket markdown
 * @param {string} publicRestApiMarkdown - Public REST API markdown
 * @param {string} privateRestApiMarkdown - Private REST API markdown
 * @returns {string} - Complete markdown document
 */
const generateMarkdownDocument = (articleContent, modalResults, authMarkdown = '', requestParamsMarkdown = '', pathParamsMarkdown = '', queryParamsMarkdown = '', publicWebsocketMarkdown = '', privateWebsocketMarkdown = '', publicRestApiMarkdown = '', privateRestApiMarkdown = '') => {
  return `
${articleContent}

${authMarkdown || ''}

${pathParamsMarkdown || ''}

${queryParamsMarkdown || ''}

${requestParamsMarkdown || ''}

${publicWebsocketMarkdown || ''}

${privateWebsocketMarkdown || ''}

${publicRestApiMarkdown || ''}

${privateRestApiMarkdown || ''}

${generateResponseMarkdown(modalResults)}
`.trim();
};

/**
 * Convert HTML content to Markdown
 * @param {string} html - HTML content to convert
 * @returns {string} - Converted Markdown
 */
const convertHtmlToMarkdown = (html) => {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });
  
  // Add custom rule for code tags
  turndownService.addRule('code', {
    filter: 'code',
    replacement: function(content) {
      return '`' + content + '`';
    }
  });
  
  // Add a custom table processing rule that handles complex nested tables
  turndownService.addRule('table', {
    filter: 'table',
    replacement: function(content, node, options) {
      // Extract table HTML
      const tableHtml = node.outerHTML;
      
      // Use regex to extract table data instead of DOM manipulation
      // which can be tricky across Node.js and browser environments
      
      // First, try to detect table headers
      let tableMarkdown = '';
      let headers = [];
      
      // Look for th elements to build header row
      const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/gi;
      let thMatch;
      while ((thMatch = thRegex.exec(tableHtml)) !== null) {
        // Clean up the content (remove nested divs, etc.)
        let headerContent = thMatch[1]
          .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '$1')
          .replace(/<[^>]+>/g, '')
          .trim();
        headers.push(headerContent);
      }
      
      // If we found headers, create the header row
      if (headers.length > 0) {
        tableMarkdown += '| ' + headers.join(' | ') + ' |\n';
        tableMarkdown += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
      }
      
      // Now extract the table rows using tr and td elements
      const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      let trMatch;
      
      while ((trMatch = trRegex.exec(tableHtml)) !== null) {
        // Skip header rows (already processed)
        if (trMatch[1].includes('<th')) continue;
        
        // Process td elements in this row
        const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
        let cells = [];
        let tdMatch;
        
        while ((tdMatch = tdRegex.exec(trMatch[1])) !== null) {
          // Process cell content
          let cellContent = tdMatch[1];
          
          // Handle code tags
          cellContent = cellContent.replace(/<code>(.*?)<\/code>/g, '`$1`');
          
          // Handle links
          cellContent = cellContent.replace(
            /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/g, 
            '[$2]($1)'
          );
          
          // Clean up remaining HTML and trim
          cellContent = cellContent
            .replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '$1')
            .replace(/<[^>]+>/g, '')
            .trim();
          
          cells.push(cellContent);
        }
        
        // Only add non-empty rows
        if (cells.length > 0) {
          tableMarkdown += '| ' + cells.join(' | ') + ' |\n';
        }
      }
      
      return '\n\n' + tableMarkdown + '\n';
    }
  });
  
  // Remove default table rules to avoid conflicts
  if (turndownService.rules.tableCell) {
    turndownService.remove('tableCell');
  }
  if (turndownService.rules.tableRow) {
    turndownService.remove('tableRow');
  }
  
  return turndownService.turndown(html);
};

module.exports = {
  processAuthSection,
  processRequestParams,
  generateResponseMarkdown,
  generateMarkdownDocument,
  convertHtmlToMarkdown
};
