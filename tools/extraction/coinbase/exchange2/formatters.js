/**
 * Functions to format extracted data to markdown
 */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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
  
  // Find all param items
  const paramItems = document.querySelectorAll('.listItem_mkJa');
  
  if (paramItems.length === 0) return null;
  
  // Create the markdown table
  let markdownTable = `
## Request Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
`;
  
  // Process each param item
  paramItems.forEach(item => {
    const paramName = item.querySelector('.paramName__NgG')?.textContent.trim() || '';
    const paramType = item.querySelector('.paramType_KuQf')?.textContent.trim() || '';
    
    // Get description - either from paragraph or possible values
    let description = '';
    const paragraph = item.querySelector('.paragraph_nrmP');
    const possibleValues = item.querySelector('.possibleValues_iyE0');
    
    if (paragraph) {
      description = paragraph.textContent.trim();
    } else if (possibleValues) {
      description = possibleValues.textContent.trim();
    }
    
    // Escape pipe characters in markdown table
    const escapedName = paramName.replace(/\|/g, '\\|');
    const escapedType = paramType.replace(/\|/g, '\\|');
    const escapedDesc = description.replace(/\|/g, '\\|');
    
    markdownTable += `| ${escapedName} | ${escapedType} | ${escapedDesc} |\n`;
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
    
    markdown += `### Response: ${result.buttonText}\n\n`;
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
 * @returns {string} - Complete markdown document
 */
const generateMarkdownDocument = (articleContent, modalResults, authMarkdown = '', requestParamsMarkdown = '') => {
  return `
${articleContent}

${authMarkdown || ''}

${requestParamsMarkdown || ''}

${generateResponseMarkdown(modalResults)}
`;
};

module.exports = {
  processAuthSection,
  processRequestParams,
  generateResponseMarkdown,
  generateMarkdownDocument
}; 