# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                                                                                                        |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "cancelByCloid",<br>"cancels": \[<br>{<br>"asset": Number,<br>"cloid": String<br>}<br>\]<br>}<br>                                     |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                       |
| signature\*<br>  | Object<br> | <br>                                                                                                                                               |
| vaultAddress<br> | String<br> | If trading on behalf of a vault or subaccount, its address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br> |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                      |

200: OK Successful Response

200: OK Error Response
