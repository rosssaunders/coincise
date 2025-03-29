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
 * @returns {string} - Complete markdown document
 */
const generateMarkdownDocument = (articleContent, modalResults, authMarkdown = '', requestParamsMarkdown = '', pathParamsMarkdown = '', queryParamsMarkdown = '') => {
  return `
${articleContent}

${authMarkdown || ''}

${pathParamsMarkdown || ''}

${queryParamsMarkdown || ''}

${requestParamsMarkdown || ''}

${generateResponseMarkdown(modalResults)}
`.trim();
};

module.exports = {
  processAuthSection,
  processRequestParams,
  generateResponseMarkdown,
  generateMarkdownDocument
}; 