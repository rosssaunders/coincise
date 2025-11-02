"use strict"

// Add delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Utility class for extracting content from web pages
 */
class ExtractionUtils {
  /**
   * Extract individual endpoints from the main documentation
   * @param {Page} page - Puppeteer page instance
   * @param {string[]} targetSections - Array of section names to extract
   * @returns {Promise<Object>} - The extracted endpoints and metadata
   */
  static async extractSelectedSections(page, targetSections) {
    return await page.evaluate(sections => {
      // First, remove all highlight divs from the document
      const highlightDivs = document.querySelectorAll("div.highlight")
      highlightDivs.forEach(div => div.remove())

      // Remove all "Try in API console" links
      const apiConsoleLinks = document.querySelectorAll(
        'a[href*="api_console"]'
      )
      apiConsoleLinks.forEach(link => {
        if (link.textContent.includes("Try in API console")) {
          link.remove()
        }
      })

      // Remove example JSON structure blockquotes
      const blockquotes = document.querySelectorAll("blockquote.open")
      blockquotes.forEach(blockquote => {
        const paragraphs = blockquote.querySelectorAll("p")
        paragraphs.forEach(p => {
          if (
            p.textContent.includes(
              "The above command returns JSON structured like this"
            )
          ) {
            blockquote.remove()
          }
        })
      })

      // Get all h1 sections
      const h1Sections = document.querySelectorAll("h1")
      const endpoints = []
      const coreContent = []
      const matchedSections = []

      h1Sections.forEach(h1Section => {
        const sectionTitle = h1Section.textContent.trim()

        // Check if this section should be included
        const shouldInclude = sections.some(targetSection => {
          return (
            sectionTitle === targetSection ||
            sectionTitle.includes(targetSection) ||
            targetSection.includes(sectionTitle)
          )
        })

        if (shouldInclude) {
          matchedSections.push(sectionTitle)

          // Get all H2 elements (endpoints) within this H1 section
          let currentElement = h1Section.nextElementSibling
          const h2Endpoints = []
          const nonEndpointContent = []

          // Collect content before the first H2 (intro/description)
          const preH2Content = []
          while (currentElement && currentElement.tagName !== "H1") {
            if (currentElement.tagName === "H2") {
              break
            }
            preH2Content.push(currentElement.outerHTML)
            currentElement = currentElement.nextElementSibling
          }

          // If there's pre-H2 content, save it as core documentation
          if (preH2Content.length > 0) {
            nonEndpointContent.push({
              sectionTitle: sectionTitle,
              content: preH2Content.join("\n")
            })
          }

          // Now process H2 endpoints
          currentElement = h1Section.nextElementSibling
          while (currentElement && currentElement.tagName !== "H1") {
            if (currentElement.tagName === "H2") {
              const h2Title = currentElement.textContent.trim()

              // Check if this is an endpoint (starts with /)
              const isEndpoint = h2Title.startsWith("/")

              if (isEndpoint) {
                // Extract this endpoint and all content until the next H2 or H1
                const endpointContent = [currentElement.outerHTML]
                let nextElement = currentElement.nextElementSibling

                while (
                  nextElement &&
                  nextElement.tagName !== "H1" &&
                  nextElement.tagName !== "H2"
                ) {
                  endpointContent.push(nextElement.outerHTML)
                  nextElement = nextElement.nextElementSibling
                }

                h2Endpoints.push({
                  title: h2Title,
                  content: endpointContent.join("\n"),
                  parentSection: sectionTitle,
                  isPublic: h2Title.includes("/public/"),
                  isPrivate: h2Title.includes("/private/")
                })

                currentElement = nextElement
                continue
              }
            }

            if (currentElement) {
              currentElement = currentElement.nextElementSibling
            }
          }

          endpoints.push(...h2Endpoints)
          coreContent.push(...nonEndpointContent)
        }
      })

      return {
        endpoints: endpoints,
        coreContent: coreContent,
        matchedSections: matchedSections
      }
    }, targetSections)
  }

  /**
   * Extract content from a support article
   * @param {Page} page - Puppeteer page instance
   * @param {string} url - URL of the support article
   * @returns {Promise<string|null>} - The extracted content or null if extraction failed
   */
  static async extractSupportArticle(page, url) {
    // Load the support article with a longer timeout
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000
    })

    // Add a random delay to simulate human behavior
    await delay(Math.random() * 2000 + 1000)

    // Wait for the article to be present with a longer timeout
    await page.waitForSelector("article", { timeout: 60000 })

    // Extract the article content
    const content = await page.evaluate(() => {
      // Get the article element
      const article = document.querySelector("article")
      if (!article) {
        console.log("Article not found in DOM")
        return null
      }

      // Remove the updated timestamp if present
      const updatedTimestamp = article.querySelector("li.text-gray-600.okt")
      if (updatedTimestamp) {
        updatedTimestamp.remove()
      }

      // Get the header and content section
      const header = article.querySelector("header.mb-5")
      const contentSection = article.querySelector(
        'section.content[itemprop="articleBody"]'
      )

      if (!header || !contentSection) {
        console.log("Required sections not found in article")
        throw new Error("Required sections not found")
      }

      // Create a container for the content
      const container = document.createElement("div")
      container.appendChild(header.cloneNode(true))
      container.appendChild(contentSection.cloneNode(true))

      return container.innerHTML
    })

    if (!content) {
      console.error(`No article content found for ${url}`)
      throw new Error("No content found")
    }

    return content
  }
}

export default ExtractionUtils
