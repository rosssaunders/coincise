"use strict"

import { setupLogger } from "./utils/logger.js"
import { generatePublicRestDocs } from "./processors/publicRestProcessor.js"
import { generatePrivateRestDocs } from "./processors/privateRestProcessor.js"
import { generatePublicWebsocketDocs } from "./processors/publicWebsocketProcessor.js"
import { generatePrivateWebsocketDocs } from "./processors/privateWebsocketProcessor.js"

async function main() {
  try {
    // Setup logger
    await setupLogger()

    // Generate documentation for each API type sequentially
    await generatePublicRestDocs()
    await generatePrivateRestDocs()
    await generatePublicWebsocketDocs()
    await generatePrivateWebsocketDocs()

    console.log("\n🎉 Documentation generation completed successfully! 🎉\n")
  } catch (error) {
    console.error("Error generating documentation:", error)
    process.exit(1)
  }
}

main()
