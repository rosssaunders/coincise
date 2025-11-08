/**
 * Bullish Exchange - General Documentation Extraction
 * Extracts core documentation sections from OpenAPI specification
 */
'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import process from 'process';
import { formatMarkdown } from '../../shared/format-markdown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPEC_URL = 'https://api.exchange.bullish.com/docs/v2/open-api/api-doc.yml';
const OUTPUT_DIR = path.resolve(__dirname, '../../../docs/bullish');

/**
 * Ensure directory exists
 */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Write content to file and format it
 */
const writeFile = async (filePath, content) => {
  console.log(`Writing ${filePath}...`);
  fs.writeFileSync(filePath, content, 'utf8');
  await formatMarkdown(filePath);
  console.log(`✅ Written ${filePath}`);
};

/**
 * Download OpenAPI spec
 */
const downloadSpec = () => {
  return new Promise((resolve, reject) => {
    console.log(`Downloading OpenAPI spec from ${SPEC_URL}...`);
    https.get(SPEC_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const spec = JSON.parse(data);
          console.log('✅ OpenAPI spec downloaded successfully');
          resolve(spec);
        } catch (err) {
          reject(new Error(`Failed to parse OpenAPI spec: ${err.message}`));
        }
      });
    }).on('error', (err) => {
      reject(new Error(`Failed to download OpenAPI spec: ${err.message}`));
    });
  });
};

/**
 * Extract network connectivity information
 */
const extractNetworkConnectivity = (spec) => {
  console.log('Extracting network connectivity information...');

  let markdown = '# Network Connectivity\n\n';
  
  // Extract server URLs
  if (spec.servers && spec.servers.length > 0) {
    markdown += '## Base URLs\n\n';
    markdown += 'The API is available at the following endpoints:\n\n';
    
    spec.servers.forEach((server) => {
      markdown += `- **${server.description}**: \`${server.url}\`\n`;
    });
    markdown += '\n';
  }
  
  // Extract connectivity info from description
  const description = spec.info.description || '';
  const connectivityMatch = description.match(/# Connectivity Options\s+([\s\S]*?)(?=\n#|\n\n#|$)/);
  if (connectivityMatch) {
    markdown += '## Connectivity Options\n\n';
    markdown += connectivityMatch[1].trim() + '\n';
  }

  return markdown;
};

/**
 * Extract authentication information
 */
const extractAuthentication = (spec) => {
  console.log('Extracting authentication information...');

  let markdown = '# Authentication\n\n';

  // Extract authentication schemes from security schemes
  if (spec.components && spec.components.securitySchemes) {
    const schemes = spec.components.securitySchemes;
    
    for (const [schemeName, schemeData] of Object.entries(schemes)) {
      markdown += `## ${schemeName}\n\n`;
      
      if (schemeData.type) {
        markdown += `**Type**: ${schemeData.type}\n\n`;
      }
      
      if (schemeData.scheme) {
        markdown += `**Scheme**: ${schemeData.scheme}\n\n`;
      }
      
      if (schemeData.bearerFormat) {
        markdown += `**Bearer Format**: ${schemeData.bearerFormat}\n\n`;
      }
      
      if (schemeData.description) {
        markdown += `${schemeData.description}\n\n`;
      }
    }
  }

  // Extract authentication info from description
  const description = spec.info.description || '';
  const authMatch = description.match(/# Authentication\s+([\s\S]*?)(?=\n#|\n\n#|$)/);
  if (authMatch) {
    markdown += authMatch[1].trim() + '\n';
  }

  return markdown;
};

/**
 * Extract rate limits information
 */
const extractRateLimits = (spec) => {
  console.log('Extracting rate limits information...');

  let markdown = '# Rate Limits\n\n';

  // Extract rate limit info from description
  const description = spec.info.description || '';
  const rateLimitMatch = description.match(/# Rate Limits?\s+([\s\S]*?)(?=\n#|\n\n#|$)/);
  if (rateLimitMatch) {
    markdown += rateLimitMatch[1].trim() + '\n';
  } else {
    // Extract from overview if it mentions rate limits
    if (description.includes('rate limit')) {
      markdown += 'The API enforces rate limits across all requests.\n\n';
      markdown += 'Please refer to the API response headers for rate limit information.\n';
    }
  }

  return markdown;
};

/**
 * Extract error codes information
 */
const extractErrorCodes = (spec) => {
  console.log('Extracting error codes information...');

  let markdown = '# Error Codes\n\n';

  // Extract error codes from components/responses or schemas
  if (spec.components && spec.components.schemas) {
    const errorSchemas = Object.entries(spec.components.schemas).filter(
      ([name]) => name.toLowerCase().includes('error')
    );
    
    if (errorSchemas.length > 0) {
      errorSchemas.forEach(([name, schema]) => {
        markdown += `## ${name}\n\n`;
        if (schema.description) {
          markdown += `${schema.description}\n\n`;
        }
        if (schema.properties) {
          markdown += '### Properties\n\n';
          for (const [propName, propData] of Object.entries(schema.properties)) {
            markdown += `- **${propName}**`;
            if (propData.type) {
              markdown += ` (${propData.type})`;
            }
            if (propData.description) {
              markdown += `: ${propData.description}`;
            }
            markdown += '\n';
          }
          markdown += '\n';
        }
      });
    }
  }

  // Extract error codes from description
  const description = spec.info.description || '';
  const errorMatch = description.match(/# Error Codes?\s+([\s\S]*?)(?=\n#|\n\n#|$)/);
  if (errorMatch) {
    markdown += errorMatch[1].trim() + '\n';
  }

  // Add link to external error codes if mentioned
  if (description.includes('Error & Rejection Codes')) {
    markdown += '\n## Additional Resources\n\n';
    markdown += 'For comprehensive error and rejection codes, see the [Error & Rejection Codes](https://github.com/bullish-exchange/api-docs/wiki/Error-&-Rejection-Codes) documentation.\n';
  }

  return markdown;
};

/**
 * Extract response formats information
 */
const extractResponseFormats = (spec) => {
  console.log('Extracting response formats information...');

  let markdown = '# Response Formats\n\n';

  markdown += 'The API returns responses in JSON format.\n\n';

  // Extract common response structures
  if (spec.components && spec.components.schemas) {
    const responseSchemas = Object.entries(spec.components.schemas).filter(
      ([name]) => name.toLowerCase().includes('response') && !name.toLowerCase().includes('error')
    );
    
    if (responseSchemas.length > 0) {
      markdown += '## Common Response Structures\n\n';
      responseSchemas.slice(0, 5).forEach(([name, schema]) => {
        markdown += `### ${name}\n\n`;
        if (schema.description) {
          markdown += `${schema.description}\n\n`;
        }
      });
    }
  }

  return markdown;
};

/**
 * Extract changelog information
 */
const extractChangelog = (spec) => {
  console.log('Extracting changelog information...');

  let markdown = '# API Change Log\n\n';

  // Extract changelog from description
  const description = spec.info.description || '';
  const changelogMatch = description.match(/# API Change Log\s+([\s\S]*?)(?=\n# [A-Z]|\n\nBase URLs:|$)/);
  if (changelogMatch) {
    markdown += changelogMatch[1].trim() + '\n';
  } else {
    markdown += `Current API Version: ${spec.info.version}\n\n`;
    markdown += 'Please check the Bullish documentation for the latest changes and updates.\n';
  }

  return markdown;
};

/**
 * Extract general information (overview, additional links, etc.)
 */
const extractGeneralInfo = (spec) => {
  console.log('Extracting general information...');

  let markdown = '# Bullish Trading API - Overview\n\n';

  // Extract version info
  if (spec.info.version) {
    markdown += `**Version**: ${spec.info.version}\n\n`;
  }

  // Extract title and main description
  if (spec.info.title) {
    markdown += `## ${spec.info.title}\n\n`;
  }

  const description = spec.info.description || '';
  
  // Extract overview section
  const overviewMatch = description.match(/# Overview\s+([\s\S]*?)(?=\n# [A-Z]|$)/);
  if (overviewMatch) {
    markdown += overviewMatch[1].trim() + '\n\n';
  }

  // Extract additional links
  const linksMatch = description.match(/# Additional Links\s+([\s\S]*?)(?=\n# [A-Z]|$)/);
  if (linksMatch) {
    markdown += '## Additional Links\n\n';
    markdown += linksMatch[1].trim() + '\n';
  }

  return markdown;
};

/**
 * Main extraction function
 */
const main = async () => {
  console.log('Starting general documentation extraction for Bullish...');

  try {
    // Ensure output directory exists
    ensureDir(OUTPUT_DIR);

    // Download OpenAPI spec
    const spec = await downloadSpec();

    // Extract each section
    const networkConnectivity = extractNetworkConnectivity(spec);
    await writeFile(path.join(OUTPUT_DIR, 'network_connectivity.md'), networkConnectivity);

    const authentication = extractAuthentication(spec);
    await writeFile(path.join(OUTPUT_DIR, 'authentication.md'), authentication);

    const rateLimits = extractRateLimits(spec);
    await writeFile(path.join(OUTPUT_DIR, 'rate_limits.md'), rateLimits);

    const errorCodes = extractErrorCodes(spec);
    await writeFile(path.join(OUTPUT_DIR, 'error_codes.md'), errorCodes);

    const responseFormats = extractResponseFormats(spec);
    await writeFile(path.join(OUTPUT_DIR, 'response_formats.md'), responseFormats);

    const changelog = extractChangelog(spec);
    await writeFile(path.join(OUTPUT_DIR, 'change_log.md'), changelog);

    const generalInfo = extractGeneralInfo(spec);
    await writeFile(path.join(OUTPUT_DIR, 'overview.md'), generalInfo);

    console.log('✅ General documentation extraction completed successfully');
  } catch (error) {
    console.error('Error during extraction:', error);
    throw error;
  }
};

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Unhandled error in main:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  });
}

export { main };
