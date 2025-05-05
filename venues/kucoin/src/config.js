"use strict"

/**
 * Configuration for the KuCoin API documentation extraction
 */
export const config = {
  // Base URL for the raw content from GitHub
  baseGithubUrl:
    "https://raw.githubusercontent.com/Kucoin/kucoin-universal-sdk/main",

  // URLs for the API specification JSON files to download
  apiSpecUrls: {
    rest: {
      spot: [
        "/spec/rest/api/openapi-spot-market.json",
        "/spec/rest/api/openapi-spot-order.json"
      ],
      futures: [
        "/spec/rest/api/openapi-futures-market.json",
        "/spec/rest/api/openapi-futures-order.json",
        "/spec/rest/api/openapi-futures-positions.json",
        "/spec/rest/api/openapi-futures-fundingfees.json"
      ],
      margin: [
        "/spec/rest/api/openapi-margin-market.json",
        "/spec/rest/api/openapi-margin-order.json",
        "/spec/rest/api/openapi-margin-credit.json",
        "/spec/rest/api/openapi-margin-debit.json",
        "/spec/rest/api/openapi-margin-risklimit.json"
      ]
    },
    ws: {
      spot: [
        "/spec/ws/openapi-spot-public.json",
        "/spec/ws/openapi-spot-private.json"
      ],
      futures: [
        "/spec/ws/openapi-futures-public.json",
        "/spec/ws/openapi-futures-private.json"
      ],
      margin: [
        "/spec/ws/openapi-margin-public.json",
        "/spec/ws/openapi-margin-private.json"
      ]
    }
  },

  // Output directory for the generated Markdown files
  outputDir: "../../../docs/kucoin"
}
