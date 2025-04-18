'use strict'

import { JSDOM } from 'jsdom'
import prettier from 'prettier'
import javaPlugin from 'prettier-plugin-java'

/**
 * Cleans HTML by removing CSS and simplifying the structure
 * @param {string} html - The HTML string to clean
 * @returns {Promise<string>} - The cleaned HTML string
 */
export async function cleanHtml(html) {
  const dom = new JSDOM(html)
  const document = dom.window.document

  // Remove all style attributes
  document.querySelectorAll('*').forEach(element => {
    element.removeAttribute('style')
    element.removeAttribute('class')
    element.removeAttribute('width')
    element.removeAttribute('lang')
    element.removeAttribute('align')
    element.removeAttribute('cellspacing')
    element.removeAttribute('cellpadding')
    element.removeAttribute('mso-border-alt')
    element.removeAttribute('mso-yfti-tbllook')
    element.removeAttribute('mso-yfti-irow')
    element.removeAttribute('mso-yfti-firstrow')
    element.removeAttribute('mso-yfti-lastrow')
    element.removeAttribute('mso-border-top-alt')
    element.removeAttribute('mso-border-left-alt')
    element.removeAttribute('mso-border-alt')
    element.removeAttribute('mso-spacerun')
  })

  // Simplify table structure
  document.querySelectorAll('table').forEach(table => {
    table.removeAttribute('style')
    table.removeAttribute('class')
    table.removeAttribute('border')
  })

  // Check if the table has a thead defined. if it doesn't, make the first row in the tbody as the thead
  document.querySelectorAll('table').forEach(table => {
    // Check if table has a thead
    const thead = table.querySelector('thead')
    if (!thead) {
      // Get the first row from tbody
      const tbody = table.querySelector('tbody')
      if (tbody) {
        const firstRow = tbody.querySelector('tr')
        if (firstRow) {
          // Create new thead and move first row into it
          const newThead = document.createElement('thead')
          newThead.appendChild(firstRow)
          table.insertBefore(newThead, tbody)
        }
      }
    }
  })

  // Remove empty paragraphs
  for (const p of document.querySelectorAll('p')) {
    if (p.textContent.trim() === '') {
      p.remove()
      continue
    }

    if (p.textContent.startsWith('public static')) {
      const codeBlock = document.createElement('code')
      codeBlock.classList.add('language-java')
      const codeBlockContent = document.createElement('pre')
      codeBlock.appendChild(codeBlockContent)

      try {
        const formatted = await prettier.format(p.textContent, {
          parser: 'java',
          plugins: [javaPlugin],
        })

        codeBlockContent.textContent = formatted
        p.parentNode.replaceChild(codeBlock, p)
      } catch (error) {
        console.error('Error formatting Java code:', error)
        codeBlock.textContent = p.textContent // Fallback to unformatted text
        p.parentNode.replaceChild(codeBlock, p)
      }
    }
  }

  // Remove empty spans
  document.querySelectorAll('span').forEach(span => {
    if (span.textContent.trim() === '') {
      span.remove()
    }
  })

  // Remove empty cells
  document.querySelectorAll('td').forEach(td => {
    td.innerHTML = td.textContent.trim()
  })

  // Get the cleaned HTML
  return document.querySelector('body').innerHTML
}
