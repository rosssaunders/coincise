/**
 * Functions to extract data from Coinbase API documentation pages
 */

/**
 * Extract content from the page (updated for new Coinbase docs structure)
 * @param {Page} page - Puppeteer page object
 * @param {Object} options - Options for extraction
 * @param {boolean} options.html - Whether to return HTML instead of text
 * @returns {Promise<string>} - Content as text or HTML
 */
export const extractArticleContent = async (page, options = {}) => {
  return await page.evaluate(returnHtml => {
    // The new Coinbase docs structure doesn't use article tags
    // We need to find the main content area, not the sidebar
    
    // First, try to find the main content area by excluding sidebars and navigation
    let contentElement = null
    
    // Look for main content selectors, excluding sidebar elements
    const mainSelectors = [
      'main',
      '.content',
      '.api-content',
      '.docs-content',
      '.page-content',
      '[role="main"]'
    ]
    
    for (const selector of mainSelectors) {
      const element = document.querySelector(selector)
      if (element && !element.id.includes('sidebar') && !element.className.includes('sidebar')) {
        contentElement = element
        break
      }
    }
    
    // If no main content found, look for divs with substantial content but exclude sidebars/navigation
    if (!contentElement) {
      const allDivs = Array.from(document.querySelectorAll('div'))
      const contentDivs = allDivs.filter(div => {
        // Exclude sidebar, navigation, and header elements
        if (div.id.includes('sidebar') || div.className.includes('sidebar') ||
            div.id.includes('nav') || div.className.includes('nav') ||
            div.className.includes('hidden') || div.className.includes('sticky')) {
          return false
        }
        
        const text = div.textContent.toLowerCase()
        // Look for main content indicators, not just navigation keywords
        return (text.includes('post') || text.includes('get') || text.includes('endpoint')) && 
               (text.includes('parameters') || text.includes('response') || text.includes('example')) &&
               text.length > 500 // Require substantial content
      })
      
      if (contentDivs.length > 0) {
        // Use the div with the most content that's not hidden/sidebar
        contentElement = contentDivs.reduce((longest, current) => 
          current.textContent.length > longest.textContent.length ? current : longest
        )
      }
    }
    
    // Final fallback: get body content but try to filter out navigation
    if (!contentElement) {
      // Create a clone of body and remove navigation elements
      const bodyClone = document.body.cloneNode(true)
      
      // Remove known navigation/sidebar elements
      const elementsToRemove = [
        '#sidebar-content',
        '#navigation-items',
        '.sidebar',
        '.navigation',
        '[class*="sidebar"]',
        '[class*="nav"]',
        'nav'
      ]
      
      elementsToRemove.forEach(selector => {
        const elements = bodyClone.querySelectorAll(selector)
        elements.forEach(el => el.remove())
      })
      
      // Look for the remaining content with API information
      const remainingDivs = Array.from(bodyClone.querySelectorAll('div'))
      const apiContentDivs = remainingDivs.filter(div => {
        const text = div.textContent.toLowerCase()
        return (text.includes('create order') || text.includes('post') && text.includes('order')) &&
               text.length > 200
      })
      
      if (apiContentDivs.length > 0) {
        contentElement = apiContentDivs.reduce((longest, current) => 
          current.textContent.length > longest.textContent.length ? current : longest
        )
      } else {
        contentElement = bodyClone
      }
    }

    if (!contentElement) {
      return "Content not available - new structure not detected"
    }

    if (returnHtml) {
      // Create a clone to avoid modifying the actual DOM
      const clone = contentElement.cloneNode(true)

      // Remove common navigation and non-content elements
      const elementsToRemove = [
        '.hashLink_R2Yq',
        'nav',
        '.nav',
        '.sidebar',
        '.navigation',
        '[class*="nav"]',
        '[class*="sidebar"]',
        'script',
        'style',
        '#sidebar-content',
        '#navigation-items'
      ]

      elementsToRemove.forEach(selector => {
        const elements = clone.querySelectorAll(selector)
        elements.forEach(el => el.remove())
      })

      return clone.outerHTML
    } else {
      return contentElement.innerText
    }
  }, options.html)
}

/**
 * Extract authentication section HTML
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<string|null>} - HTML content or null
 */
export const extractAuthSection = async page => {
  return await page.evaluate(() => {
    const authSection = document.querySelector("#authorization")
    return authSection ? authSection.outerHTML : null
  })
}

/**
 * Extract request parameters section HTML
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<string|null>} - HTML content or null
 */
export const extractRequestParams = async page => {
  return await page.evaluate(() => {
    // Look for the section with "Body params" heading
    const bodyParamsHeadings = Array.from(
      document.querySelectorAll("h3")
    ).filter(h => h.textContent.trim() === "Body params")

    if (bodyParamsHeadings.length > 0) {
      // Get the parent section that contains the params
      const section = bodyParamsHeadings[0].closest(
        '[data-testid="content-section"]'
      )
      return section ? section.outerHTML : null
    }
    return null
  })
}

/**
 * Extract path and query parameters sections HTML
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<Object>} - Object with pathParams and queryParams HTML
 */
export const extractPathAndQueryParams = async page => {
  return await page.evaluate(() => {
    const result = {
      pathParams: null,
      queryParams: null
    }

    // Look for all path-params sections
    const paramSections = document.querySelectorAll("#path-params")

    paramSections.forEach(section => {
      // Check the heading to determine if it's path params or query params
      const heading = section.querySelector("h3")
      if (heading) {
        const headingText = heading.textContent.trim()

        if (headingText === "Path Params") {
          result.pathParams = section.outerHTML
        } else if (headingText === "Query Params") {
          result.queryParams = section.outerHTML
        }
      }
    })

    return result
  })
}

/**
 * Extract modal content for a specific response button
 * @param {Page} page - Puppeteer page object
 * @returns {Promise<Object>} - Structured modal content
 */
export const extractModalContent = async page => {
  return await page.evaluate(() => {
    // Try to extract structured data from the Mui paper component
    const muiPaper = document.querySelector(".MuiPaper-root")

    if (muiPaper) {
      // Get the schema type from the header
      const schemaType =
        muiPaper.querySelector(
          ".MuiCardHeader-content .MuiTypography-root span"
        )?.textContent || ""

      // Extract all properties
      const properties = []
      const listItems = muiPaper.querySelectorAll(".listItem_mkJa")

      listItems.forEach(item => {
        const nameElement = item.querySelector(".paramName__NgG")
        const typeElement = item.querySelector(".paramType_KuQf")
        const descriptionElement = item.querySelector(".propertyContent_FDlX")

        // Get property description (text that's not in the header)
        let description = ""
        if (descriptionElement) {
          const descText = descriptionElement.textContent
          const headerText =
            descriptionElement.querySelector(".paramHeader_i_6k")
              ?.textContent || ""
          description = descText.replace(headerText, "").trim()
        }

        if (nameElement && typeElement) {
          properties.push({
            name: nameElement.textContent,
            type: typeElement.textContent,
            description: description
          })
        }
      })

      return {
        schemaType,
        properties
      }
    }

    return { error: "Modal content not found" }
  })
}
