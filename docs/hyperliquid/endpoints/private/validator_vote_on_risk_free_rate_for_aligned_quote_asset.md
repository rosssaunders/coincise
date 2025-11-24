# Validator vote on risk-free rate for aligned quote asset

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name            | Type       | Description                                                                                |
| --------------- | ---------- | ------------------------------------------------------------------------------------------ |
| action\*<br>    | Object<br> | {<br>"type": "validatorL1Stream",<br>"riskFreeRate": String // e.g. "0.04" for 4%<br>}<br> |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds<br>                               |
| signature\*<br> | Object<br> | <br>                                                                                       |

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
