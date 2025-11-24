# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Request Body

| Name     | Type       | Description                                                                                     |
| -------- | ---------- | ----------------------------------------------------------------------------------------------- |
| user<br> | String<br> | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br> |
| type<br> | String<br> | userRateLimit<br>                                                                               |

200: OK A successful response

```json
{
  "cumVlm": "2854574.593578",
  "nRequestsUsed": 2890, // max(0, cumulative_used minus reserved)
  "nRequestsCap": 2864574,
  "nRequestsSurplus": 0 // max(0, reserved minus cumulative_used)
}
```
