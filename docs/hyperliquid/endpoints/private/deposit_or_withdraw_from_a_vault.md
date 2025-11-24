# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Add or remove funds from a vault.

**Headers**

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | `application/json`<br> |

**Body**

| Name             | Type       | Description                                                                                                                                                                                   |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "vaultTransfer",<br>"vaultAddress": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000, "isDeposit": boolean,<br>"usd": number<br>}<br> |
| nonce\*<br>      | number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                  |
| signature\*<br>  | Object<br> | <br>                                                                                                                                                                                          |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                                                                 |

**Response**

```
{'status': 'ok', 'response': {'type': 'default'}}
```
