# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

**Headers**

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | "application/json"<br> |

**Body**

| Name          | Type       | Description                                                                                      |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| type\*<br>    | String<br> | "maxBuilderFee"<br>                                                                              |
| user\*<br>    | String<br> | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |
| builder\*<br> | String<br> | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |

**Response**

200: OK

```
1 // maximum fee approved in tenths of a basis point i.e. 1 means 0.001%
```
