# Enable HIP-3 DEX abstraction (agent)

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

Same effect as UserDexAbstraction above, but only works if setting the value
from `null` to `true`.

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name            | Type       | Description                                                  |
| --------------- | ---------- | ------------------------------------------------------------ |
| action\*<br>    | Object<br> | {<br>"type": "agentEnableDexAbstraction"<br>}<br>            |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds<br> |
| signature\*<br> | Object<br> | <br>                                                         |

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
