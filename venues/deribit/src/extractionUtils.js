"use strict"

// Add delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Utility class for extracting content from web pages
 */
class ExtractionUtils {
  /**
   * Extract specified sections from the main documentation
   * @param {Page} page - Puppeteer page instance
   * @param {string[]} targetSections - Array of section names to extract
   * @returns {Promise<Object>} - The extracted content and matched section names
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
      const selectedContent = []
      const matchedSections = []

      h1Sections.forEach(h1Section => {
        const sectionTitle = h1Section.textContent.trim()

        // Check if this section should be included
        const shouldInclude = sections.some(targetSection => {
          // Check for direct match or if the section title contains the target section name
          return (
            sectionTitle === targetSection ||
            sectionTitle.includes(targetSection) ||
            targetSection.includes(sectionTitle)
          )
        })

        if (shouldInclude) {
          matchedSections.push(sectionTitle)
          const sectionContent = [h1Section.outerHTML]
          let currentElement = h1Section

          // Get all elements until the next h1
          while (
            (currentElement = currentElement.nextElementSibling) !== null
          ) {
            if (currentElement.tagName === "H1") break
            sectionContent.push(currentElement.outerHTML)
          }

          selectedContent.push(sectionContent.join("\n"))
        }
      })

      // For debugging - return both content and matched section names
      return {
        content: selectedContent.join("\n\n"),
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
    try {
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

        // Get the header and content section
        const header = article.querySelector("header.mb-5")
        const contentSection = article.querySelector(
          'section.content[itemprop="articleBody"]'
        )

        if (!header || !contentSection) {
          console.log("Required sections not found in article")
          return null
        }

        // Create a container for the content
        const container = document.createElement("div")
        container.appendChild(header.cloneNode(true))
        container.appendChild(contentSection.cloneNode(true))

        return container.innerHTML
      })

      if (!content) {
        console.error(`No article content found for ${url}`)
        return null
      }

      return content
    } catch (error) {
      console.error(`Error processing ${url}:`, error)
      return null
    }
  }
}

export default ExtractionUtils
