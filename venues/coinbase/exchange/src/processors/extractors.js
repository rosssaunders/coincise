/**
 * Functions to extract data from Coinbase API documentation pages
 */

/**
 * Extract article content from the page
 * @param {Page} page - Puppeteer page object
 * @param {Object} options - Options for extraction
 * @param {boolean} options.html - Whether to return HTML instead of text
 * @returns {Promise<string>} - Article content as text or HTML
 */
export const extractArticleContent = async (page, options = {}) => {
  return await page.evaluate(returnHtml => {
    const article = document.querySelector("article")
    if (!article) return "Article content not available"

    if (returnHtml) {
      // Create a clone to avoid modifying the actual DOM
      const clone = article.cloneNode(true)

      // Remove all hash links
      const hashLinks = clone.querySelectorAll(".hashLink_R2Yq")
      hashLinks.forEach(link => link.remove())

      // Remove authentication section (already extracted by extractAuthSection)
      const authSection = clone.querySelector("#authorization")
      if (authSection) {
        authSection.remove()
      }

      // Remove query parameters section (already extracted by extractQueryParams)
      const pathParamsSections = clone.querySelectorAll("#path-params")
      pathParamsSections.forEach(section => {
        section.remove()
      })

      // Remove request parameters section (already extracted by extractRequestParams)
      const bodyParamsHeadings = Array.from(
        clone.querySelectorAll("h3")
      ).filter(h => h.textContent.trim() === "Body params")

      if (bodyParamsHeadings.length > 0) {
        const section = bodyParamsHeadings[0].closest(
          '[data-testid="content-section"]'
        )
        if (section) {
          section.remove()
        }
      }

      // Remove responses section
      const responseHeadings = Array.from(clone.querySelectorAll("h3")).filter(
        h => h.textContent.trim() === "Responses"
      )

      if (responseHeadings.length > 0) {
        const section = responseHeadings[0].closest(
          '[data-testid="content-section"]'
        )
        if (section) {
          section.remove()
        }
      }

      return clone.outerHTML
    } else {
      return article.innerText
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
