# Get Withdrawable Amount

info

How can partial funds be subject to delayed withdrawal requests?

- **On-chain deposit**: If the number of on-chain confirmations has not reached
  a risk-controlled level, a portion of the funds will be frozen for a period of
  time until they are unfrozen.
- **Buying crypto**: If there is a risk, the funds will be frozen for a certain
  period of time and cannot be withdrawn.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/withdraw/withdrawable-amount`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                  |
| :-------- | :------- | :----- | ------------------------- |
| coin      | **true** | string | Coin name, uppercase only |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter              | Type   | Comments                                                  |
| :--------------------- | :----- | --------------------------------------------------------- |
| limitAmountUsd         | string | The frozen amount due to risk, in USD                     |
| withdrawableAmount     | Object |                                                           |
| \> SPOT                | Object | Spot wallet, it is not returned if spot wallet is removed |
| \>> coin               | string | Coin name                                                 |
| \>> withdrawableAmount | string | Amount that can be withdrawn                              |
| \>> availableBalance   | string | Available balance                                         |
| \> FUND                | Object | Funding wallet                                            |
| \>> coin               | string | Coin name                                                 |
| \>> withdrawableAmount | string | Amount that can be withdrawn                              |
| \>> availableBalance   | string | Available balance                                         |
| \> UTA                 | Object | Unified wallet                                            |
| \>> coin               | string | Coin name                                                 |
| \>> withdrawableAmount | string | Amount that can be withdrawn                              |
| \>> availableBalance   | string | Available balance                                         |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/withdraw/withdrawable-amount?coin=USDT HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1677565621998X-BAPI-RECV-WINDOW: 50000X-BAPI-SIGN: XXXXXX
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_withdrawable_amount(    coin="USDT",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getWithdrawableAmount({    coin: 'USDT',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "limitAmountUsd": "595051.7",
    "withdrawableAmount": {
      "FUND": {
        "coin": "USDT",
        "withdrawableAmount": "155805.847",
        "availableBalance": "155805.847"
      },
      "UTA": {
        "coin": "USDT",
        "withdrawableAmount": "498751.0882",
        "availableBalance": "498751.0882"
      }
    }
  },
  "retExtInfo": {},
  "time": 1754009688289
}
```
