"use strict"

import { fetchHtml } from "../fetcher.js"

const TEST_URL = "https://www.gate.io/docs/developers/apiv4/en/"

;(async () => {
  try {
    console.log("Testing fetch for Gate.io documentation...")
    console.log(`URL: ${TEST_URL}`)
    console.log("")

    const html = await fetchHtml(TEST_URL)

    console.log("")
    console.log("✅ FETCH SUCCESSFUL")
    console.log(`Content length: ${html.length} bytes`)
    console.log(
      `First 200 chars: ${html.substring(0, 200).replace(/\s+/g, " ")}`
    )

    process.exit(0)
  } catch (err) {
    console.error("")
    console.error("❌ FETCH FAILED")
    console.error(`Error: ${err.message}`)
    if (err.stack) {
      console.error(`Stack trace: ${err.stack}`)
    }

    process.exit(2)
  }
})()
