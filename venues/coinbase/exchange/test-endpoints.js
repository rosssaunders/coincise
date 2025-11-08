// Quick test - just run the first 3 endpoints
import { main as extractEndpoints } from "./src/extractEndpoints.js"

// Temporarily override the KNOWN_ENDPOINTS
const originalKnownEndpoints = [
  "exchangerestapi_getproducts",
  "exchangerestapi_gettime",
  "exchangerestapi_getaccounts"
]

console.log("Running quick endpoint extraction test...")
await extractEndpoints()
