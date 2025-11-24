# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This action does not do anything (no operation), but causes the nonce to be
marked as used. This can be a more effective way to cancel in-flight orders than
the cancel action.

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                  |
| ---------------- | ---------- | ------------------------------------------------------------ |
| action\*<br>     | Object<br> | {<br>"type": "noop"<br>}<br>                                 |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br> |
| signature\*<br>  | Object<br> | <br>                                                         |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                |

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
