# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Note that if the book is empty, the last trade price will be used as a fallback

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

Request Body

Name

Type

Description

type\*

String

"allMids"

dex

String

Perp dex name. Defaults to the empty string which represents the first perp dex. Spot mids are only included with the first perp dex..

200: OK Successful Response

```json
{
    "APE": "4.33245",
    "ARB": "1.21695"
}
```
