# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Note that if the book is empty, the last trade price will be used as a fallback

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name       | Type       | Description                                                                                                                                |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| type\*<br> | String<br> | "allMids"<br>                                                                                                                              |
| dex<br>    | String<br> | Perp dex name. Defaults to the empty string which represents the first perp dex. Spot mids are only included with the first perp dex..<br> |

200: OK Successful Response

```json
{
  "APE": "4.33245",
  "ARB": "1.21695"
}
```
