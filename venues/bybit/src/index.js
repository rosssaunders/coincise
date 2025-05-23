"use strict"

import { setupLogger } from "./utils/logger.js"
import { generatePublicRestDocs } from "./processors/publicRestProcessor.js"
import { generatePrivateRestDocs } from "./processors/privateRestProcessor.js"
import { generatePublicWebsocketDocs } from "./processors/publicWebsocketProcessor.js"
import { generatePrivateWebsocketDocs } from "./processors/privateWebsocketProcessor.js"
import process from "process"

async function main() {
  // Setup logger
  await setupLogger()

  // Generate documentation for each API type sequentially
  await generatePublicRestDocs()
  await generatePrivateRestDocs()
  await generatePublicWebsocketDocs()
  await generatePrivateWebsocketDocs()

  console.log("\n🎉 Documentation generation completed successfully! 🎉\n")
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
