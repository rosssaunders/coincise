
import { launchBrowser, configurePage } from "../../shared/puppeteer.js"

const main = async () => {
  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const url = "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/notation"
  console.log(`Checking ${url}...`)
  const response = await page.goto(url, { waitUntil: "networkidle0" })
  
  if (response.status() === 404) {
      console.log("404 Not Found");
      const url2 = "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/response-formats"
       console.log(`Checking ${url2}...`)
      const response2 = await page.goto(url2, { waitUntil: "networkidle0" })
       if (response2.status() === 404) {
           console.log("404 Not Found");
       } else {
           console.log("Found: " + await page.title());
       }
  } else {
      console.log("Found: " + await page.title());
  }

  await browser.close()
}

main()
