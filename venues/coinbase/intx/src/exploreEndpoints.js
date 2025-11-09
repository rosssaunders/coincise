/**
 * Explore Coinbase INTX documentation to find endpoint URL patterns
 */
"use strict"

import { launchBrowser, configurePage } from "../../../shared/puppeteer.js"

const main = async () => {
  console.log("Exploring Coinbase INTX documentation structure...\n")

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  try {
    // Check the main API reference page
    console.log("1. Checking API reference landing page...")
    await page.goto(
      "https://docs.cdp.coinbase.com/api-reference/international-exchange-api",
      {
        waitUntil: "networkidle2",
        timeout: 90000
      }
    )

    const refPageData = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a[href]"))
      return {
        title: document.title,
        allLinks: links
          .map(l => ({ text: l.textContent.trim(), href: l.href }))
          .filter(l => l.text && l.href.includes("international"))
          .slice(0, 30)
      }
    })

    console.log("  Title:", refPageData.title)
    console.log("  Sample links:")
    refPageData.allLinks.forEach(link => {
      console.log(`    - ${link.text}: ${link.href}`)
    })

    // Try rest-api/introduction
    console.log("\n2. Checking REST API introduction...")
    await page.goto(
      "https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction",
      {
        waitUntil: "networkidle2",
        timeout: 90000
      }
    )

    const introData = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a[href]"))
      return {
        title: document.title,
        is404: document.body.textContent.includes("Page Not Found"),
        links: links
          .map(l => ({ text: l.textContent.trim(), href: l.href }))
          .filter(
            l =>
              l.text &&
              (l.href.includes("portfolio") ||
                l.href.includes("order") ||
                l.href.includes("instrument"))
          )
          .slice(0, 20)
      }
    })

    console.log("  Title:", introData.title)
    console.log("  Is 404?", introData.is404)
    if (introData.links.length > 0) {
      console.log("  Endpoint-related links:")
      introData.links.forEach(link => {
        console.log(`    - ${link.text}: ${link.href}`)
      })
    }

    // Try searching for portfolios in the docs
    console.log("\n3. Searching for portfolio endpoints in docs...")
    await page.goto("https://docs.cdp.coinbase.com/intx/docs", {
      waitUntil: "networkidle2",
      timeout: 90000
    })

    const docsData = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a[href]"))
      const portfolioLinks = links
        .map(l => ({ text: l.textContent.trim(), href: l.href }))
        .filter(
          l =>
            l.href.includes("portfolio") ||
            l.href.includes("order") ||
            l.href.includes("instrument")
        )

      return {
        title: document.title,
        portfolioLinks: portfolioLinks.slice(0, 20)
      }
    })

    console.log("  Title:", docsData.title)
    if (docsData.portfolioLinks.length > 0) {
      console.log("  Found portfolio/order/instrument links:")
      docsData.portfolioLinks.forEach(link => {
        console.log(`    - ${link.text}: ${link.href}`)
      })
    }

    // Check if there's a navigation sidebar
    console.log("\n4. Checking sidebar navigation...")
    const navData = await page.evaluate(() => {
      const navItems = Array.from(
        document.querySelectorAll('nav a, [role="navigation"] a, aside a')
      )
      return navItems
        .map(l => ({ text: l.textContent.trim(), href: l.href }))
        .filter(l => l.text && l.href)
        .slice(0, 50)
    })

    if (navData.length > 0) {
      console.log("  Navigation items:")
      navData.forEach(item => {
        console.log(`    - ${item.text}: ${item.href}`)
      })
    } else {
      console.log("  No navigation items found")
    }

    // Try to find OpenAPI spec or similar
    console.log("\n5. Checking for API specification files...")
    const specCheck = await page.evaluate(() => {
      const pageText = document.body.innerText.toLowerCase()
      return {
        hasOpenAPI:
          pageText.includes("openapi") || pageText.includes("swagger"),
        hasSpec:
          pageText.includes("specification") || pageText.includes("spec.json"),
        apiBaseUrl:
          pageText.match(
            /https:\/\/api\.international\.coinbase\.com[^\s]*/
          )?.[0] || null
      }
    })

    console.log("  Has OpenAPI mention?", specCheck.hasOpenAPI)
    console.log("  Has spec file mention?", specCheck.hasSpec)
    console.log("  API base URL found?", specCheck.apiBaseUrl)
  } catch (error) {
    console.error("Error during exploration:", error.message)
  } finally {
    await browser.close()
  }

  console.log("\nExploration complete!")
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
