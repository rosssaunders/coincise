# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                                                                                                                |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "modify",<br>"oid": Number                                                                                                                    | Cloid,<br>"order": {<br>"a": Number,<br>"b": Boolean,<br>"p": String,<br>"s": String,<br>"r": Boolean,<br>"t": {<br>"limit": {<br>"tif": "Alo" | "Ioc" | "Gtc"<br>} or<br>"trigger": {<br>"isMarket": Boolean,<br>"triggerPx": String,<br>"tpsl": "tp" | "sl"<br>}<br>},<br>"c": Cloid (optional)<br>}<br>} Meaning of keys: a is asset b is isBuy p is price s is size r is reduceOnly t is type c is cloid (client order id)<br> |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                               |
| signature\*<br>  | Object<br> | <br>                                                                                                                                                       |
| vaultAddress<br> | String<br> | If trading on behalf of a vault or subaccount, its Onchain address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br> |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                              |

200: OK Successful Response

200: OK Error Response
