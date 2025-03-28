

# WELCOME

# Welcome to Advanced Trade API



Exciting news for crypto trading enterprises!

Are you building innovative trading solutions for your customers? Our Coinbase Advanced API can empower your vision and help grow your business.

If you are a trading automation platform or advanced trading terminal looking to connect with Coinbase, fill out our **[Advanced Trade API Developer Interest](https://docs.google.com/forms/d/e/1FAIpQLSe6Ne-chxZthaxNTI2g6YDHV_b2g6ogj69S8vQXS8DrXFmiPA/viewform)** form and our business development team will get back to you.

Welcome to **Coinbase Advanced Trade API** developer documentation. The Advanced Trade API (or Advanced API) supports programmatic trading and order management with a [REST API](https://docs.cdp.coinbase.com/advanced-trade/docs/api-overview) and [WebSocket protocol](https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview) for real-time market data.

[Advanced Trade on Coinbase](https://www.coinbase.com/advanced-trade) is our advanced trading platform, intended for the more experienced trader. It offers a secure and easy way to buy, sell, and trade digital assets online across various trading pairs.



Info

Coinbase Advanced Trade SDKs

- [Official Python SDK](https://github.com/coinbase/coinbase-advanced-py/) (see the [Python SDK Overview](https://docs.cdp.coinbase.com/advanced-trade/docs/sdk-overview) for more information on how to get started)
- [TypeScript SDK (Sample)](https://github.com/coinbase-samples/advanced-sdk-ts)
- [Go SDK (Sample)](https://github.com/coinbase-samples/advanced-trade-sdk-go)
- [Java SDK (Sample)](https://github.com/coinbase-samples/advanced-sdk-java)

**See Also:**

- [What is Advanced Trade?](https://help.coinbase.com/en/coinbase/trading-and-funding/advanced-trade/what-is-advanced-trade)
- [Hello Advanced Trade, goodbye Coinbase Pro](https://blog.coinbase.com/hello-advanced-trade-goodbye-coinbase-pro-5b0715b03ef0)

# GETTING-STARTED

# Getting Started with Advanced Trade APIs

To get started with Advanced Trade APIs, continue reading here about our [REST API](https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth) and [WebSocket API](https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth) channels.

Create an API key to authenticate requests to permissioned endpoints of the Advanced Trade [REST API](https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth) and [WebSocket API](https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth) channels.

1. Navigate to your [API settings](https://coinbase.com/settings/api).
2. Click the **Create API key** button.
3. In the popup dialog configure:
   - API key nickname
   - Portfolio
   - Permissions (editing this value prompts 2FA)
   - IP allowlist
   - ECDSA key type (Ed25519 is not yet supported)
4. Click **Create & Download**.
5. Copy and secure your private/public key pair in a safe location.
6. Click **I've saved my key**.



Tip

To regenerate an API key, click **Manage** to delete and recreate the key.

_Click to enlarge_![Image of API Key Management](https://docs.cdp.coinbase.com/assets/images/create-retail-api-key-5b16486a65a47402ff8f883a8019c3df.png)



Coinbase Developer Portal (CDP)

API Keys can also be created and managed on the [Coinbase Developer Portal](https://portal.cdp.coinbase.com/) (CDP). CDP provides advanced developer tooling and access to other APIs across Coinbase. Note, Advanced Trade API supports ECDSA CDP keys only and not yet new Ed25519 keys.

## OAuth2 [](https://docs.cdp.coinbase.com/advanced-trade/docs/getting-started\#oauth2 "Direct link to OAuth2")

Or, use OAuth authentication if you're building an application for many users on top of the Advanced Trade APIs. See [Coinbase App OAuth2 Integration](https://docs.cdp.coinbase.com/coinbase-app/docs/coinbase-app-integration) to get a client set up and make authenticated calls.

# RETAILBROKERAGEAPI_GETACCOUNTS

{
  "success": true,
  "markdown": "",
  "metadata": {
    "og:locale": "en",
    "og:type": "website",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getaccounts"
    ],
    "viewport": "width=device-width, initial-scale=1.0",
    "og:image:type": "image/png",
    "twitter:title": "Coinbase Developer Documentation",
    "og:image:width": "1200",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "docsearch:language": "en",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogLocale": "en",
    "docusaurus_tag": "docs-advanced-trade-current",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docsearch:version": "current",
    "og:image:height": "630",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docusaurus_locale": "en",
    "generator": "Docusaurus v3.2.1",
    "ogTitle": "Coinbase Developer Documentation",
    "docusaurus_version": "current",
    "robots": "index, follow",
    "title": "Coinbase Developer Documentation",
    "language": "en",
    "scrapeId": "aaa6b8d4-ba76-4792-aec3-62f3ea9f140c",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getaccounts",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getaccounts",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETACCOUNT
  
{
  "success": true,
  "markdown": "",
  "metadata": {
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "twitter:title": "Coinbase Developer Documentation",
    "ogLocale": "en",
    "language": "en",
    "og:locale": "en",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getaccount"
    ],
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docusaurus_locale": "en",
    "title": "Coinbase Developer Documentation",
    "docusaurus_version": "current",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogTitle": "Coinbase Developer Documentation",
    "docsearch:version": "current",
    "docsearch:language": "en",
    "docusaurus_tag": "docs-advanced-trade-current",
    "robots": "index, follow",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "og:image:type": "image/png",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "viewport": "width=device-width, initial-scale=1.0",
    "og:image:height": "630",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "generator": "Docusaurus v3.2.1",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:image:width": "1200",
    "og:type": "website",
    "scrapeId": "e05c53b0-9507-4154-a87b-87b796f15a08",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getaccount",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getaccount",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETBESTBIDASK

{
  "success": true,
  "markdown": "",
  "metadata": {
    "docsearch:language": "en",
    "og:type": "website",
    "og:image:type": "image/png",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "language": "en",
    "viewport": "width=device-width, initial-scale=1.0",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "docsearch:version": "current",
    "ogLocale": "en",
    "twitter:title": "Coinbase Developer Documentation",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "robots": "index, follow",
    "docusaurus_locale": "en",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "og:image:height": "630",
    "og:image:width": "1200",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "title": "Coinbase Developer Documentation",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "generator": "Docusaurus v3.2.1",
    "docusaurus_version": "current",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "docusaurus_tag": "docs-advanced-trade-current",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getbestbidask"
    ],
    "ogTitle": "Coinbase Developer Documentation",
    "og:locale": "en",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "scrapeId": "489a0ce2-16fd-4e7c-815b-365c3ee83c92",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getbestbidask",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getbestbidask",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETPRODUCTBOOK

{
  "success": true,
  "markdown": "",
  "metadata": {
    "language": "en",
    "docsearch:language": "en",
    "generator": "Docusaurus v3.2.1",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docsearch:version": "current",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "viewport": "width=device-width, initial-scale=1.0",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproductbook"
    ],
    "og:type": "website",
    "og:locale": "en",
    "og:image:width": "1200",
    "ogTitle": "Coinbase Developer Documentation",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:image:type": "image/png",
    "ogLocale": "en",
    "docusaurus_locale": "en",
    "robots": "index, follow",
    "docusaurus_tag": "docs-advanced-trade-current",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "docusaurus_version": "current",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:image:height": "630",
    "twitter:title": "Coinbase Developer Documentation",
    "title": "Coinbase Developer Documentation",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "scrapeId": "15d98311-fccd-496c-aa51-b13afbd1e149",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproductbook",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproductbook",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETPRODUCTS

{
  "success": true,
  "markdown": "",
  "metadata": {
    "language": "en",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "ogTitle": "Coinbase Developer Documentation",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "og:image:type": "image/png",
    "viewport": "width=device-width, initial-scale=1.0",
    "og:type": "website",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproducts"
    ],
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docusaurus_version": "current",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:locale": "en",
    "docusaurus_tag": "docs-advanced-trade-current",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "robots": "index, follow",
    "twitter:title": "Coinbase Developer Documentation",
    "title": "Coinbase Developer Documentation",
    "og:image:width": "1200",
    "docsearch:version": "current",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "ogLocale": "en",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "docusaurus_locale": "en",
    "generator": "Docusaurus v3.2.1",
    "docsearch:language": "en",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "og:image:height": "630",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "scrapeId": "196d99d9-bd66-4210-acdd-76cad30519fd",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproducts",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproducts",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETPRODUCT

{
  "success": true,
  "markdown": "",
  "metadata": {
    "title": "Coinbase Developer Documentation",
    "viewport": "width=device-width, initial-scale=1.0",
    "og:image:width": "1200",
    "ogTitle": "Coinbase Developer Documentation",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "language": "en",
    "robots": "index, follow",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:image:type": "image/png",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogLocale": "en",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "docsearch:language": "en",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproduct"
    ],
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "docusaurus_tag": "docs-advanced-trade-current",
    "og:type": "website",
    "docsearch:version": "current",
    "docusaurus_locale": "en",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:image:height": "630",
    "twitter:title": "Coinbase Developer Documentation",
    "og:locale": "en",
    "docusaurus_version": "current",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "generator": "Docusaurus v3.2.1",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "scrapeId": "d3597bc3-2b86-401d-9c62-f3e65696076a",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproduct",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getproduct",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETCANDLES

{
  "success": true,
  "markdown": "",
  "metadata": {
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "ogTitle": "Coinbase Developer Documentation",
    "og:locale": "en",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "docusaurus_locale": "en",
    "docsearch:version": "current",
    "ogLocale": "en",
    "docusaurus_tag": "docs-advanced-trade-current",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getcandles"
    ],
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "twitter:title": "Coinbase Developer Documentation",
    "og:image:type": "image/png",
    "docsearch:language": "en",
    "og:image:width": "1200",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "viewport": "width=device-width, initial-scale=1.0",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "title": "Coinbase Developer Documentation",
    "language": "en",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "og:type": "website",
    "generator": "Docusaurus v3.2.1",
    "docusaurus_version": "current",
    "og:image:height": "630",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "robots": "index, follow",
    "scrapeId": "df000114-f552-4dda-a5ea-6e8472d43078",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getcandles",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getcandles",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETMARKETTRADES

{
  "success": true,
  "markdown": "",
  "metadata": {
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "twitter:title": "Coinbase Developer Documentation",
    "docsearch:language": "en",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "og:image:height": "630",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "docusaurus_version": "current",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogTitle": "Coinbase Developer Documentation",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "viewport": "width=device-width, initial-scale=1.0",
    "ogLocale": "en",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getmarkettrades"
    ],
    "og:image:type": "image/png",
    "og:locale": "en",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "language": "en",
    "docusaurus_tag": "docs-advanced-trade-current",
    "og:type": "website",
    "generator": "Docusaurus v3.2.1",
    "docsearch:version": "current",
    "og:image:width": "1200",
    "title": "Coinbase Developer Documentation",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "robots": "index, follow",
    "docusaurus_locale": "en",
    "scrapeId": "2518293e-b0e4-4c14-bc63-c31e0ac83081",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getmarkettrades",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getmarkettrades",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_POSTORDER

{
  "success": true,
  "markdown": "",
  "metadata": {
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "docusaurus_version": "current",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "twitter:title": "Coinbase Developer Documentation",
    "og:image:type": "image/png",
    "docusaurus_locale": "en",
    "generator": "Docusaurus v3.2.1",
    "docsearch:language": "en",
    "docusaurus_tag": "docs-advanced-trade-current",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_postorder"
    ],
    "og:image:width": "1200",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "og:image:height": "630",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "docsearch:version": "current",
    "title": "Coinbase Developer Documentation",
    "language": "en",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "viewport": "width=device-width, initial-scale=1.0",
    "ogLocale": "en",
    "robots": "index, follow",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogTitle": "Coinbase Developer Documentation",
    "og:locale": "en",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:type": "website",
    "scrapeId": "b02b6a29-ee3a-404b-9c6b-f8f1f7a0c248",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_postorder",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_postorder",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_CANCELORDERS

{
  "success": true,
  "markdown": "",
  "metadata": {
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_cancelorders"
    ],
    "og:image:width": "1200",
    "docusaurus_version": "current",
    "generator": "Docusaurus v3.2.1",
    "og:locale": "en",
    "docusaurus_locale": "en",
    "ogTitle": "Coinbase Developer Documentation",
    "docsearch:version": "current",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:image:height": "630",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "title": "Coinbase Developer Documentation",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "docusaurus_tag": "docs-advanced-trade-current",
    "og:type": "website",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:image:type": "image/png",
    "language": "en",
    "docsearch:language": "en",
    "ogLocale": "en",
    "robots": "index, follow",
    "viewport": "width=device-width, initial-scale=1.0",
    "twitter:title": "Coinbase Developer Documentation",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "scrapeId": "b548337c-4ae9-4ffe-b8d1-254d10ad7388",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_cancelorders",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_cancelorders",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_EDITORDER

{
  "success": true,
  "markdown": "",
  "metadata": {
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "title": "Coinbase Developer Documentation",
    "og:type": "website",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "docusaurus_version": "current",
    "og:image:width": "1200",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "language": "en",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "viewport": "width=device-width, initial-scale=1.0",
    "ogTitle": "Coinbase Developer Documentation",
    "og:image:height": "630",
    "docusaurus_locale": "en",
    "docsearch:language": "en",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_editorder"
    ],
    "docusaurus_tag": "docs-advanced-trade-current",
    "ogLocale": "en",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "docsearch:version": "current",
    "robots": "index, follow",
    "og:locale": "en",
    "og:image:type": "image/png",
    "generator": "Docusaurus v3.2.1",
    "twitter:title": "Coinbase Developer Documentation",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "scrapeId": "1f3e29f0-e5be-4a38-aac6-3348777232a6",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_editorder",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_editorder",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_PREVIEWEDITORDER

{
  "success": true,
  "markdown": "",
  "metadata": {
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_previeweditorder"
    ],
    "robots": "index, follow",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "title": "Coinbase Developer Documentation",
    "docusaurus_locale": "en",
    "docusaurus_tag": "docs-advanced-trade-current",
    "og:image:type": "image/png",
    "og:image:height": "630",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "docusaurus_version": "current",
    "ogTitle": "Coinbase Developer Documentation",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "language": "en",
    "og:image:width": "1200",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "ogLocale": "en",
    "viewport": "width=device-width, initial-scale=1.0",
    "docsearch:language": "en",
    "og:locale": "en",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "twitter:title": "Coinbase Developer Documentation",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "docsearch:version": "current",
    "og:type": "website",
    "generator": "Docusaurus v3.2.1",
    "scrapeId": "60bb3218-c510-4344-92c6-80c0b86cdedd",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_previeweditorder",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_previeweditorder",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETHISTORICALORDERS

{
  "success": true,
  "markdown": "",
  "metadata": {
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "docusaurus_locale": "en",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "viewport": "width=device-width, initial-scale=1.0",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_gethistoricalorders"
    ],
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:image:height": "630",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "og:image:width": "1200",
    "language": "en",
    "ogLocale": "en",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "twitter:title": "Coinbase Developer Documentation",
    "og:locale": "en",
    "docsearch:version": "current",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "ogTitle": "Coinbase Developer Documentation",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "robots": "index, follow",
    "docsearch:language": "en",
    "docusaurus_version": "current",
    "generator": "Docusaurus v3.2.1",
    "title": "Coinbase Developer Documentation",
    "og:image:type": "image/png",
    "og:type": "website",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docusaurus_tag": "docs-advanced-trade-current",
    "scrapeId": "0bca532a-2619-4671-82df-72b05db8c8f5",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_gethistoricalorders",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_gethistoricalorders",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETFILLS

{
  "success": true,
  "markdown": "",
  "metadata": {
    "og:image:height": "630",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "twitter:title": "Coinbase Developer Documentation",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docusaurus_version": "current",
    "title": "Coinbase Developer Documentation",
    "docusaurus_tag": "docs-advanced-trade-current",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:locale": "en",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "generator": "Docusaurus v3.2.1",
    "docusaurus_locale": "en",
    "docsearch:language": "en",
    "robots": "index, follow",
    "og:image:width": "1200",
    "viewport": "width=device-width, initial-scale=1.0",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "language": "en",
    "ogLocale": "en",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getfills"
    ],
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "og:image:type": "image/png",
    "docsearch:version": "current",
    "og:type": "website",
    "ogTitle": "Coinbase Developer Documentation",
    "scrapeId": "05b3da8b-f465-47b9-ab64-4f7cdd3f59c3",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getfills",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_getfills",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_GETHISTORICALORDER

{
  "success": true,
  "markdown": "",
  "metadata": {
    "og:image:type": "image/png",
    "docusaurus_tag": "docs-advanced-trade-current",
    "docusaurus_version": "current",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "ogLocale": "en",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "twitter:title": "Coinbase Developer Documentation",
    "og:locale": "en",
    "docsearch:language": "en",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "title": "Coinbase Developer Documentation",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "generator": "Docusaurus v3.2.1",
    "og:type": "website",
    "og:image:height": "630",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "docsearch:version": "current",
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_gethistoricalorder"
    ],
    "language": "en",
    "og:image:width": "1200",
    "viewport": "width=device-width, initial-scale=1.0",
    "docusaurus_locale": "en",
    "robots": "index, follow",
    "ogTitle": "Coinbase Developer Documentation",
    "scrapeId": "95aadeb6-5cf2-403e-b21c-678217398b1e",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_gethistoricalorder",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_gethistoricalorder",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_PREVIEWORDER

{
  "success": true,
  "markdown": "",
  "metadata": {
    "title": "Coinbase Developer Documentation",
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "generator": "Docusaurus v3.2.1",
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "docsearch:language": "en",
    "docusaurus_version": "current",
    "docusaurus_locale": "en",
    "robots": "index, follow",
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:image:height": "630",
    "og:image:type": "image/png",
    "docsearch:version": "current",
    "og:image:width": "1200",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "twitter:title": "Coinbase Developer Documentation",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "ogTitle": "Coinbase Developer Documentation",
    "ogLocale": "en",
    "language": "en",
    "og:locale": "en",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_previeworder"
    ],
    "og:type": "website",
    "docusaurus_tag": "docs-advanced-trade-current",
    "viewport": "width=device-width, initial-scale=1.0",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "scrapeId": "59ada351-4663-4870-a90f-01766faed2e5",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_previeworder",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_previeworder",
    "statusCode": 200
  }
}

# RETAILBROKERAGEAPI_CLOSEPOSITION

{
  "success": true,
  "markdown": "",
  "metadata": {
    "twitter:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "viewport": "width=device-width, initial-scale=1.0",
    "og:locale": "en",
    "ogLocale": "en",
    "og:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "ogUrl": "https://docs.cdp.coinbase.com/",
    "generator": "Docusaurus v3.2.1",
    "og:image:height": "630",
    "ogDescription": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "twitter:card": [
      "summary_large_image",
      "summary_large_image"
    ],
    "og:image:type": "image/png",
    "language": "en",
    "docsearch:version": "current",
    "og:image:width": "1200",
    "docsearch:language": "en",
    "ogTitle": "Coinbase Developer Documentation",
    "favicon": "https://docs.cdp.coinbase.com/img/favicon.png",
    "ogImage": "https://docs.cdp.coinbase.com/img/site-preview.png",
    "twitter:title": "Coinbase Developer Documentation",
    "og:url": [
      "https://docs.cdp.coinbase.com/",
      "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_closeposition"
    ],
    "twitter:image": [
      "https://docs.cdp.coinbase.com/img/site-preview.png",
      "https://docs.cdp.coinbase.com/img/site-preview.png"
    ],
    "docusaurus_tag": "docs-advanced-trade-current",
    "docsearch:docusaurus_tag": "docs-advanced-trade-current",
    "docusaurus_locale": "en",
    "docusaurus_version": "current",
    "title": "Coinbase Developer Documentation",
    "robots": "index, follow",
    "og:type": "website",
    "og:title": [
      "Coinbase Developer Documentation",
      "Coinbase Developer Documentation"
    ],
    "og:description": "Coinbase Developer Documentation. Explore our SDK and API references, guides, and examples for building onchain apps.",
    "scrapeId": "328f4913-8f14-4153-85dd-4fe5de3e7122",
    "sourceURL": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_closeposition",
    "url": "https://docs.cdp.coinbase.com/advanced-trade/docs/retailbrokerageapi_closeposition",
    "statusCode": 200
  }
}