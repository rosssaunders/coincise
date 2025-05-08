import { JSDOM } from "jsdom"

/**
 * Extracts the changelog section from HTML content and removes it from the main document
 *
 * @param {string} html - The HTML content of the page
 * @returns {Object} An object containing the modified HTML and the extracted changelog section
 */
export function extractChangelog(html) {
  const dom = new JSDOM(html)
  const document = dom.window.document

  // Find the changelog section
  const changelogSection = document.querySelector("h2#changelog")
  if (!changelogSection) {
    console.error("Could not find changelog section")
    return { html, changelog: null }
  }

  // Get the whole container of the changelog section
  const contentBlock = changelogSection.closest(".content-block")
  if (!contentBlock) {
    console.error("Could not find changelog content block")
    return { html, changelog: null }
  }

  // Create a copy of the changelog content first
  const changelogContent = contentBlock.cloneNode(true)

  // MORE AGGRESSIVELY find and remove ALL code examples from the cloned content
  const codeBlocks = Array.from(changelogContent.querySelectorAll(".examples"))
  if (codeBlocks && codeBlocks.length > 0) {
    console.log(`Removing ${codeBlocks.length} code blocks from changelog copy`)
    codeBlocks.forEach(codeBlock => {
      codeBlock.parentNode.removeChild(codeBlock)
    })
  }

  // Remove all <pre> tags within the changelog
  // const preTags = changelogContent.querySelectorAll("pre")
  // if (preTags && preTags.length > 0) {
  //   console.log(`Removing ${preTags.length} <pre> tags from changelog copy`)
  //   preTags.forEach(preTag => {
  //     preTag.parentNode.removeChild(preTag)
  //   })
  // }
  // }

  // Remove example code from the original document
  const exampleCode = contentBlock.querySelector(".examples")
  if (exampleCode) {
    console.log("Removing example code from original document")
    exampleCode.parentNode.removeChild(exampleCode)
  }

  // Remove the changelog section from the original document
  contentBlock.parentNode.removeChild(contentBlock)

  // Return both the modified HTML and the extracted changelog section
  return {
    html: dom.serialize(),
    changelog: changelogContent.outerHTML
  }
}
