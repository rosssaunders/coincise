# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                                                                                                                                                                                                         |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "twapOrder", "twap": {<br>"a": Number,<br>"b": Boolean,<br>"s": String,<br>"r": Boolean,<br>"m": Number,<br>"t": Boolean<br>}<br>} Meaning of keys: a is asset b is isBuy s is size r is reduceOnly<br>m is minutes t is randomize<br> |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                                                                        |
| signature\*<br>  | Object<br> | <br>                                                                                                                                                                                                                                                |
| vaultAddress<br> | String<br> | If trading on behalf of a vault or subaccount, its Onchain address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br>                                                                                          |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                                                                                                                       |

200: OK Successful Response

200: OK Error Response

```json
{
  "status": "ok",
  "response": {
    "type": "twapOrder",
    "data": {
      "status": {
        "running": {
          "twapId": 77738308
        }
      }
    }
  }
}
```

```json
{
  "status": "ok",
  "response": {
    "type": "twapOrder",
    "data": {
      "status": {
        "error": "Invalid TWAP duration: 1 min(s)"
      }
    }
  }
}
```
