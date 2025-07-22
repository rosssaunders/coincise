/**
 * Formatters for Coinbase API documentation
 */

import TurndownService from "turndown";
import * as turndownPluginGfm from "turndown-plugin-gfm";

/**
 * Convert general documentation to markdown
 * @param {Object} doc - Structured general documentation
 * @param {string} sourceUrl - Source URL of the documentation
 * @returns {string} - Markdown formatted documentation
 */
export const convertGeneralDocToMarkdown = (doc, sourceUrl) => {
  // Initialize Turndown for HTML to Markdown conversion
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
  });
  
  // Add GFM plugin for better table support
  turndownService.use(turndownPluginGfm.gfm);
  
  let markdown = '';
  
  // Title
  if (doc.title) {
    markdown += `# ${doc.title}\n\n`;
  }
  
  // Add source link
  if (sourceUrl) {
    markdown += `**Source:** [${sourceUrl}](${sourceUrl})\n\n`;
  }
  
  // If we have sections, process them
  if (doc.sections && doc.sections.length > 0) {
    doc.sections.forEach(section => {
      // Handle intro content (no title)
      if (section.level === 0 && !section.title) {
        if (section.content) {
          markdown += turndownService.turndown(section.content) + '\n\n';
        }
      } else {
        // Add appropriate heading level
        const heading = '#'.repeat(section.level);
        markdown += `${heading} ${section.title}\n\n`;
        
        // Convert HTML content to markdown
        if (section.content) {
          markdown += turndownService.turndown(section.content) + '\n\n';
        }
      }
    });
  } else if (doc.content) {
    // If no sections, just convert the content
    markdown += turndownService.turndown(doc.content) + '\n\n';
  }
  
  return markdown;
};

/**
 * Convert structured API documentation to markdown
 * @param {Object} apiDoc - Structured API documentation
 * @param {string} sourceUrl - Source URL of the documentation
 * @returns {string} - Markdown formatted documentation
 */
export const convertToMarkdown = (apiDoc, sourceUrl) => {
  let markdown = '';

  // Title
  if (apiDoc.title) {
    markdown += `# ${apiDoc.title}\n\n`;
  }

  // Add source link
  if (sourceUrl) {
    markdown += `**Source:** [${sourceUrl}](${sourceUrl})\n\n`;
  }

  // Endpoint
  if (apiDoc.method && apiDoc.endpoint) {
    markdown += `## Endpoint\n\n`;
    markdown += `\`${apiDoc.method} ${apiDoc.endpoint}\`\n\n`;
  }

  // Description
  if (apiDoc.description) {
    markdown += `## Description\n\n`;
    markdown += `${apiDoc.description}\n\n`;
  }

  // Permissions
  if (apiDoc.permissions) {
    markdown += `## Permissions\n\n`;
    markdown += `${apiDoc.permissions}\n\n`;
  }

  // Examples
  if (apiDoc.examples && apiDoc.examples.length > 0) {
    markdown += `## Examples\n\n`;
    markdown += `| Example | Response |\n`;
    markdown += `| ------- | -------- |\n`;
    apiDoc.examples.forEach(ex => {
      markdown += `| ${ex.example} | ${ex.response} |\n`;
    });
    markdown += `\n`;
  }

  // Authorization
  if (apiDoc.authorizations && apiDoc.authorizations.length > 0) {
    markdown += `## Authorization\n\n`;
    markdown += `| Header | Type | Required |\n`;
    markdown += `| ------ | ---- | -------- |\n`;
    apiDoc.authorizations.forEach(auth => {
      markdown += `| ${auth.name} | ${auth.type} | ${auth.required ? 'Yes' : 'No'} |\n`;
    });
    markdown += `\n`;
  }

  // Path Parameters
  if (apiDoc.pathParams && apiDoc.pathParams.length > 0) {
    markdown += `## Path Parameters\n\n`;
    markdown += `| Parameter | Type | Required | Description |\n`;
    markdown += `| --------- | ---- | -------- | ----------- |\n`;
    apiDoc.pathParams.forEach(param => {
      markdown += `| ${param.name} | ${param.type} | ${param.required ? 'Yes' : 'No'} | ${param.description} |\n`;
    });
    markdown += `\n`;
  }

  // Query Parameters
  if (apiDoc.queryParams && apiDoc.queryParams.length > 0) {
    markdown += `## Query Parameters\n\n`;
    markdown += `| Parameter | Type | Description |\n`;
    markdown += `| --------- | ---- | ----------- |\n`;
    apiDoc.queryParams.forEach(param => {
      markdown += `| ${param.name} | ${param.type} | ${param.description} |\n`;
    });
    markdown += `\n`;
  }

  // Body Parameters
  if (apiDoc.bodyParams && apiDoc.bodyParams.length > 0) {
    markdown += `## Request Body\n\n`;
    markdown += `| Parameter | Type | Required | Description |\n`;
    markdown += `| --------- | ---- | -------- | ----------- |\n`;
    apiDoc.bodyParams.forEach(param => {
      markdown += `| ${param.name} | ${param.type} | ${param.required ? 'Yes' : 'No'} | ${param.description} |\n`;
    });
    markdown += `\n`;
  }

  // Response
  if (apiDoc.responses && apiDoc.responses.length > 0) {
    markdown += `## Response\n\n`;
    apiDoc.responses.forEach(resp => {
      markdown += `### ${resp.status} Success\n\n`;
      if (resp.description) {
        markdown += `${resp.description}\n\n`;
      }
      
      // Response fields table
      if (resp.fields && resp.fields.length > 0) {
        markdown += `#### Response Fields\n\n`;
        markdown += `| Field | Type | Required | Description |\n`;
        markdown += `| ----- | ---- | -------- | ----------- |\n`;
        resp.fields.forEach(field => {
          markdown += `| ${field.name} | ${field.type} | ${field.required ? 'Yes' : 'No'} | ${field.description} |\n`;
        });
        markdown += `\n`;
      }
      
      if (resp.example) {
        markdown += `#### Example Response\n\n`;
        markdown += `\`\`\`json\n${resp.example}\n\`\`\`\n\n`;
      }
    });
  }

  return markdown;
};