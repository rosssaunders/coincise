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
| action\*<br>     | Object<br> | {<br>"type": "scheduleCancel",<br>"time": number (optional)<br>}<br>                                                                               |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                       |
| signature\*<br>  | Object<br> | <br>                                                                                                                                               |
| vaultAddress<br> | String<br> | If trading on behalf of a vault or subaccount, its address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br> |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                      |

Schedule a cancel-all operation at a future time. Not including time will remove
the scheduled cancel operation. The time must be at least 5 seconds after the
current time. Once the time comes, all open orders will be canceled and a
trigger count will be incremented. The max number of triggers per day is 10.
This trigger count is reset at 00:00 UTC.
