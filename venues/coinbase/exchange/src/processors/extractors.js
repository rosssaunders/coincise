/**
 * Extractors for Coinbase API documentation
 */

/**
 * Detect the type of documentation page
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<string>} - 'api' or 'general'
 */
export const detectPageType = async (page) => {
  return await page.evaluate(() => {
    // Check for API endpoint indicators
    const hasAuthSection = document.querySelector('.api-section h4')?.textContent?.includes('Authorization');
    const hasCurlExample = Array.from(document.querySelectorAll('pre')).some(pre => 
      pre.textContent.includes('curl --request')
    );
    const hasResponseSection = document.querySelector('.api-section h4')?.textContent?.includes('Response');
    
    // If any API indicators are present, it's an API page
    if (hasAuthSection || hasCurlExample || hasResponseSection) {
      return 'api';
    }
    
    return 'general';
  });
};

/**
 * Extract general documentation content
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<Object>} - Structured documentation
 */
export const extractGeneralDocumentation = async (page) => {
  return await page.evaluate(() => {
    const result = {
      title: '',
      content: '',
      sections: []
    };

    // Extract title - try to get the page-specific title, not the site header
    // First try meta title
    let pageTitle = document.querySelector('meta[property="og:title"]')?.content ||
                    document.querySelector('title')?.textContent ||
                    '';
    
    // Clean up the title - remove site name suffix
    if (pageTitle) {
      pageTitle = pageTitle.replace(' | Coinbase Exchange API', '').trim();
      pageTitle = pageTitle.replace(' | Coinbase', '').trim();
    }
    
    // If no good title from meta, try to find the main h1 (excluding navigation)
    if (!pageTitle || pageTitle === 'Coinbase Exchange API') {
      const h1s = Array.from(document.querySelectorAll('h1'));
      const contentH1 = h1s.find(h1 => {
        // Skip if it's in navigation or header
        const parent = h1.closest('nav, header, [role="navigation"]');
        return !parent;
      });
      
      if (contentH1) {
        pageTitle = contentH1.textContent.trim();
      }
    }
    
    result.title = pageTitle || 'Untitled';

    // Extract main content - try specific selectors for Coinbase docs
    let mainContent = document.querySelector('.theme-doc-markdown') ||
                     document.querySelector('[class*="docMainContainer"]') ||
                     document.querySelector('[class*="docItemContainer"]') ||
                     document.querySelector('article') ||
                     document.querySelector('main') || 
                     document.querySelector('[role="main"]');
    
    // If no main content, look for content divs
    if (!mainContent) {
      mainContent = document.querySelector('.content') ||
                   document.querySelector('[class*="content"]');
    }
    
    // If still no content, use body but we'll filter more aggressively
    if (!mainContent) {
      mainContent = document.body;
    }
    
    // Create a clone to avoid modifying the actual DOM
    const contentClone = mainContent.cloneNode(true);
    
    // Remove navigation, sidebar, and other non-content elements
    const elementsToRemove = [
      'nav',
      'aside',
      '[role="navigation"]',
      '[class*="sidebar"]',
      '[class*="navigation"]',
      '[class*="menu"]',
      'header',
      'footer',
      '.nav',
      '#nav',
      'button',
      '[class*="breadcrumb"]',
      '[aria-label*="Show"]',
      '[aria-label*="Hide"]'
    ];
    
    elementsToRemove.forEach(selector => {
      const elements = contentClone.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
    
    // Remove text nodes containing common UI patterns
    const textNodesToClean = ['Show child attributes', 'Hide child attributes', 'Show more', 'Show less'];
    textNodesToClean.forEach(pattern => {
      const walker = document.createTreeWalker(
        contentClone,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent.trim() === pattern) {
          textNodes.push(node);
        }
      }
      
      textNodes.forEach(textNode => {
        if (textNode.parentNode) {
          textNode.parentNode.removeChild(textNode);
        }
      });
    });
    
    // First, get any introductory content before the first heading
    const firstHeading = contentClone.querySelector('h2, h3, h4');
    if (firstHeading) {
      const introContent = [];
      let node = contentClone.firstElementChild;
      
      while (node && node !== firstHeading) {
        if (node.tagName === 'P' || node.tagName === 'UL' || node.tagName === 'OL' || 
            node.tagName === 'TABLE' || node.tagName === 'PRE' || node.tagName === 'BLOCKQUOTE') {
          introContent.push(node.outerHTML);
        }
        node = node.nextElementSibling;
      }
      
      if (introContent.length > 0) {
        result.sections.push({
          level: 0,
          title: '',
          content: introContent.join('\n')
        });
      }
    }
    
    // Get all headings and their content
    const headings = Array.from(contentClone.querySelectorAll('h2, h3, h4'));
    
    headings.forEach(heading => {
      const section = {
        level: parseInt(heading.tagName.substring(1)),
        title: heading.textContent.trim(),
        content: ''
      };
      
      // Get content between this heading and the next
      let sibling = heading.nextElementSibling;
      const contentParts = [];
      
      while (sibling && !sibling.matches('h1, h2, h3, h4')) {
        if (sibling.tagName === 'P' || sibling.tagName === 'UL' || sibling.tagName === 'OL' || 
            sibling.tagName === 'TABLE' || sibling.tagName === 'PRE' || sibling.tagName === 'BLOCKQUOTE') {
          contentParts.push(sibling.outerHTML);
        }
        sibling = sibling.nextElementSibling;
      }
      
      section.content = contentParts.join('\n');
      if (section.content) {
        result.sections.push(section);
      }
    });
    
    // If no sections found, just get all paragraph content
    if (result.sections.length === 0) {
      const paragraphs = Array.from(contentClone.querySelectorAll('p, ul, ol, table, pre, blockquote'));
      result.content = paragraphs.map(p => p.outerHTML).join('\n');
    }
    
    return result;
  });
};

/**
 * Extract comprehensive API documentation from the new format
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<Object>} - Structured API documentation
 */
export const extractApiDocumentation = async (page) => {
  return await page.evaluate(() => {
    const result = {
      title: '',
      endpoint: '',
      method: '',
      description: '',
      permissions: '',
      examples: [],
      authorizations: [],
      queryParams: [],
      pathParams: [],
      bodyParams: [],
      responses: []
    };

    // Extract title - try to get the page-specific title
    // First try meta title
    let pageTitle = document.querySelector('meta[property="og:title"]')?.content ||
                    document.querySelector('title')?.textContent ||
                    '';
    
    // Clean up the title - remove site name suffix
    if (pageTitle) {
      pageTitle = pageTitle.replace(' | Coinbase Exchange API', '').trim();
      pageTitle = pageTitle.replace(' | Coinbase', '').trim();
    }
    
    // If no good title from meta, try to find the main h1
    if (!pageTitle || pageTitle === 'Coinbase Exchange API') {
      const h1 = document.querySelector('h1');
      if (h1) {
        pageTitle = h1.textContent.trim();
      }
    }
    
    result.title = pageTitle || 'Untitled';

    // Extract API permissions
    const permissionsSection = Array.from(document.querySelectorAll('h2')).find(h => 
      h.textContent.includes('API Key Permissions')
    );
    if (permissionsSection) {
      const permText = permissionsSection.nextElementSibling?.textContent || '';
      result.permissions = permText.trim();
    }

    // Extract examples - look for actual example sections, not parameter tables
    const exampleSections = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(h => 
      h.textContent.toLowerCase().includes('example') && !h.textContent.toLowerCase().includes('parameter')
    );
    
    // If we find example headings, extract the content after them
    if (exampleSections.length > 0) {
      exampleSections.forEach(heading => {
        let sibling = heading.nextElementSibling;
        while (sibling) {
          if (sibling.matches('table')) {
            // This is an examples table
            const rows = sibling.querySelectorAll('tbody tr');
            rows.forEach(row => {
              const cells = row.querySelectorAll('td');
              if (cells.length >= 2) {
                result.examples.push({
                  example: cells[0].textContent.trim(),
                  response: cells[1].textContent.trim()
                });
              }
            });
            break;
          } else if (sibling.matches('pre')) {
            // This is a code example
            const text = sibling.textContent.trim();
            if (text.includes('curl')) {
              // Extract URL path from curl example
              const urlMatch = text.match(/--url\s+https?:\/\/[^\/]+(\/.+?)(?:\s|\\|$)/);
              if (urlMatch) {
                result.examples.push({
                  example: urlMatch[1],
                  response: 'cURL request example'
                });
              }
            }
            break;
          } else if (sibling.matches('h1, h2, h3, h4, h5, h6')) {
            // Hit another heading, stop looking
            break;
          }
          sibling = sibling.nextElementSibling;
        }
      });
    }
    
    // If no examples found through headings, don't extract any (avoid parameter tables)
    // The old logic was incorrectly treating parameter tables as examples

    // Extract authorization headers
    const authSection = Array.from(document.querySelectorAll('.api-section')).find(section => 
      section.querySelector('h4')?.textContent.includes('Authorizations')
    );
    if (authSection) {
      const authItems = authSection.querySelectorAll('[id^="authorization-"]');
      authItems.forEach(item => {
        const name = item.querySelector('[data-component-part="field-name"]')?.textContent || '';
        const type = item.querySelector('[data-component-part="field-info-pill"] span')?.textContent || '';
        const required = item.querySelector('[data-component-part="field-required-pill"]') !== null;
        
        if (name) {
          result.authorizations.push({
            name: name.trim(),
            type: type.trim(),
            in: 'header',
            required: required
          });
        }
      });
    }

    // Extract query parameters
    const querySection = Array.from(document.querySelectorAll('.api-section')).find(section => 
      section.querySelector('h4')?.textContent.includes('Query Parameters')
    );
    if (querySection) {
      const paramItems = querySection.querySelectorAll('[id^="parameter-"]');
      paramItems.forEach(item => {
        const name = item.querySelector('[data-component-part="field-name"]')?.textContent || '';
        const type = item.querySelector('[data-component-part="field-info-pill"] span')?.textContent || '';
        let description = item.parentElement.querySelector('.prose p')?.textContent || '';
        
        // Filter out UI text
        if (description === 'Show child attributes' || description === 'Hide child attributes') {
          description = '';
        }
        
        if (name) {
          result.queryParams.push({
            name: name.trim(),
            type: type.trim(),
            description: description.trim(),
            required: false
          });
        }
      });
    }

    // Extract path parameters
    const pathSection = Array.from(document.querySelectorAll('.api-section')).find(section => 
      section.querySelector('h4')?.textContent.includes('Path Parameters')
    );
    if (pathSection) {
      const paramItems = pathSection.querySelectorAll('[id^="parameter-"]');
      paramItems.forEach(item => {
        const name = item.querySelector('[data-component-part="field-name"]')?.textContent || '';
        const type = item.querySelector('[data-component-part="field-info-pill"] span')?.textContent || '';
        let description = item.parentElement.querySelector('.prose p')?.textContent || '';
        const required = item.querySelector('[data-component-part="field-required-pill"]') !== null;
        
        // Filter out UI text
        if (description === 'Show child attributes' || description === 'Hide child attributes') {
          description = '';
        }
        
        if (name) {
          result.pathParams.push({
            name: name.trim(),
            type: type.trim(),
            description: description.trim(),
            required: required
          });
        }
      });
    }

    // Extract body parameters
    const bodySection = Array.from(document.querySelectorAll('.api-section')).find(section => 
      section.querySelector('h4')?.textContent.includes('Body')
    );
    if (bodySection) {
      const paramItems = bodySection.querySelectorAll('[id^="parameter-"]');
      paramItems.forEach(item => {
        const name = item.querySelector('[data-component-part="field-name"]')?.textContent || '';
        const type = item.querySelector('[data-component-part="field-info-pill"] span')?.textContent || '';
        let description = item.parentElement.querySelector('.prose p')?.textContent || '';
        const required = item.querySelector('[data-component-part="field-required-pill"]') !== null;
        
        // Filter out UI text
        if (description === 'Show child attributes' || description === 'Hide child attributes') {
          description = '';
        }
        
        if (name) {
          result.bodyParams.push({
            name: name.trim(),
            type: type.trim(),
            description: description.trim(),
            required: required
          });
        }
      });
    }

    // Extract endpoint from curl example
    const curlBlock = Array.from(document.querySelectorAll('pre')).find(pre => 
      pre.textContent.includes('curl')
    );
    if (curlBlock) {
      const curlText = curlBlock.textContent;
      const urlMatch = curlText.match(/--url\s+(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        const url = new URL(urlMatch[1]);
        result.endpoint = url.pathname;
      }
      const methodMatch = curlText.match(/--request\s+(\w+)/);
      if (methodMatch) {
        result.method = methodMatch[1];
      }
    }

    // Extract response information
    const responseSection = Array.from(document.querySelectorAll('.api-section')).find(section => 
      section.querySelector('h4')?.textContent === 'Response'
    );
    if (responseSection) {
      // Get response description
      let responseDesc = responseSection.querySelector('.prose p')?.textContent || '';
      
      // Filter out UI text
      if (responseDesc.trim() === 'Show child attributes' || 
          responseDesc.trim() === 'Hide child attributes') {
        responseDesc = '';
      }
      
      // Extract response field definitions
      const responseFields = [];
      const fieldDivs = responseSection.querySelectorAll('[id^="response-"]');
      fieldDivs.forEach(div => {
        const fieldName = div.querySelector('[data-component-part="field-name"]')?.textContent;
        const fieldType = div.querySelector('[data-component-part="field-info-pill"] span')?.textContent;
        const fieldRequired = div.querySelector('[data-component-part="field-required-pill"]') !== null;
        
        // Description is in a sibling div with prose class
        let fieldDesc = '';
        const parent = div.parentElement;
        if (parent) {
          const proseDiv = parent.querySelector('.prose');
          if (proseDiv) {
            fieldDesc = proseDiv.querySelector('p')?.textContent || '';
          }
        }
        
        if (fieldName) {
          // Filter out UI text from descriptions
          if (fieldDesc === 'Show child attributes' || fieldDesc === 'Hide child attributes') {
            fieldDesc = '';
          }
          
          responseFields.push({
            name: fieldName.trim(),
            type: fieldType?.trim() || '',
            required: fieldRequired,
            description: fieldDesc.trim()
          });
        }
      });
      
      // Get response example - look specifically within the response section
      let responseExample = null;
      
      // First try to find pre elements within the response section
      const responsePres = responseSection.querySelectorAll('pre');
      if (responsePres.length > 0) {
        // Look for JSON-like content (starts with [ or {)
        responseExample = Array.from(responsePres).find(pre => {
          const text = pre.textContent.trim();
          return (text.startsWith('[') || text.startsWith('{')) && !text.includes('curl');
        });
      }
      
      // If not found in response section, look globally for JSON response examples
      if (!responseExample) {
        // Look for all pre elements on the page that contain JSON and not curl
        const allPres = Array.from(document.querySelectorAll('pre'));
        const jsonPres = allPres.filter(pre => {
          const text = pre.textContent.trim();
          return (text.startsWith('[') || text.startsWith('{')) && !text.includes('curl');
        });
        
        // If we found JSON examples, use the first one (they're often duplicated)
        if (jsonPres.length > 0) {
          responseExample = jsonPres[0];
        }
      }
      
      result.responses.push({
        status: '200',
        description: responseDesc.trim(),
        fields: responseFields,
        example: responseExample ? responseExample.textContent.trim() : ''
      });
    }

    // Clean up any UI text that shouldn't be in documentation
    const textNodesToClean = ['Show child attributes', 'Hide child attributes', 'Show more', 'Show less'];
    textNodesToClean.forEach(pattern => {
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        if (element.textContent.trim() === pattern) {
          element.remove();
        }
      });
    });

    // Extract description - look for spans with data-as="p" that contain description
    const descriptionSpans = Array.from(document.querySelectorAll('span[data-as="p"]'));
    if (descriptionSpans.length > 0) {
      // Get the first span that looks like a description (not permissions)
      const descSpan = descriptionSpans.find(span => {
        const text = span.textContent.trim().toLowerCase();
        return text.length > 20 && 
               !text.includes('permission') && 
               !text.includes('fee') &&
               !text.includes('liquidity') &&
               !text.includes('pagination');
      });
      
      if (descSpan) {
        result.description = descSpan.textContent.trim();
      }
    }
    
    // Fallback: Look for description in paragraphs throughout the page
    if (!result.description) {
      const allParagraphs = Array.from(document.querySelectorAll('p'));
      const descParagraph = allParagraphs.find(p => {
        const text = p.textContent.trim().toLowerCase();
        return text.length > 30 && 
               !text.includes('coinbase exchange api') &&
               !text.includes('was this page helpful') &&
               !text.includes('cancels orders on a specific') && // Skip parameter descriptions
               (text.includes('cancel') || text.includes('create') || text.includes('get') || text.includes('list') || text.includes('order'));
      });
      
      if (descParagraph) {
        result.description = descParagraph.textContent.trim();
      }
    }

    return result;
  });
};