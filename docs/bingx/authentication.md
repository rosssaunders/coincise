# Authentication

BingX API uses API keys and signatures for authentication.

## Overview

- All private endpoints require authentication using API keys
- Public endpoints do not require API key signatures
- API keys can be created in your BingX account settings

## Creating API Keys

1. Log in to your BingX account
2. Navigate to API Management
3. Create a new API key
4. Save your API Key and Secret Key securely

## Request Signing

Private endpoints require request signing using HMAC SHA256.

### Signature Steps

1. Create the query string with all parameters sorted alphabetically
2. Append timestamp parameter
3. Generate signature using HMAC SHA256 with your Secret Key
4. Add the signature to the request

### Required Headers

- `X-BX-APIKEY`: Your API Key
- `X-BX-TIMESTAMP`: Current timestamp in milliseconds
- `X-BX-SIGNATURE`: Request signature

## Example

```javascript
const crypto = require('crypto');

const apiKey = 'your-api-key';
const secretKey = 'your-secret-key';
const timestamp = Date.now();

// Create query string
const queryString = `symbol=BTC-USDT&timestamp=${timestamp}`;

// Generate signature
const signature = crypto
  .createHmac('sha256', secretKey)
  .update(queryString)
  .digest('hex');
```
