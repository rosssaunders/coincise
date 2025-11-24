# Get All Coins Balance

You could get all coin balance of all account types under the master account,
and sub account.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/transfer/query-account-coins-balance`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                | Required | Type   | Comments                                                                                  |
| :--------------------------------------- | :------- | :----- | ----------------------------------------------------------------------------------------- |
| memberId                                 | false    | string | User Id. It is **required** when you use master api key to check sub account coin balance |
| [accountType](/docs/v5/enum#accounttype) | **true** | string | Account type                                                                              |
| coin                                     | false    | string | Coin name, uppercase only                                                                 |

- Can query multiple coins, separated by comma. `USDT,USDC,ETH`

**Note:** this field is **mandatory** for accountType=`UNIFIED`, and supports up
to 10 coins each request | | withBonus | false | integer | `0`(default): not
query bonus. `1`: query bonus |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                | Type   | Comments             |
| :--------------------------------------- | :----- | -------------------- |
| [accountType](/docs/v5/enum#accounttype) | string | Account type         |
| memberId                                 | string | UserID               |
| balance                                  | array  | Object               |
| \> coin                                  | string | Currency             |
| \> walletBalance                         | string | Wallet balance       |
| \> transferBalance                       | string | Transferable balance |
| \> bonus                                 | string | Bonus                |

[RUN >>](/docs/api-explorer/v5/asset/all-balance)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/transfer/query-account-coins-balance?accountType=FUND&coin=USDC HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1675866354698X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_coins_balance(    accountType="FUND",    coin="USDC",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getAllCoinsBalance({ accountType: 'FUND', coin: 'USDC' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "memberId": "XXXX",
    "accountType": "FUND",
    "balance": [
      {
        "coin": "USDC",
        "transferBalance": "0",
        "walletBalance": "0",
        "bonus": ""
      }
    ]
  },
  "retExtInfo": {},
  "time": 1675866354913
}
```
