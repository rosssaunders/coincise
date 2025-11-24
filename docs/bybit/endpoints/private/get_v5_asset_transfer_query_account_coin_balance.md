# Get Single Coin Balance

Query the balance of a specific coin in a specific
[account type](/docs/v5/enum#accounttype). Supports querying sub UID's balance.
Also, you can check the transferable amount from master to sub account, sub to
master account or sub to sub account, especially for user who has an
institutional loan.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/transfer/query-account-coin-balance`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                  | Required | Type    | Comments                                                                                             |
| :----------------------------------------- | :------- | :------ | ---------------------------------------------------------------------------------------------------- |
| memberId                                   | false    | string  | UID. **Required** when querying sub UID balance with master api key                                  |
| toMemberId                                 | false    | string  | UID. **Required** when querying the transferable balance between different UIDs                      |
| [accountType](/docs/v5/enum#accounttype)   | **true** | string  | Account type                                                                                         |
| [toAccountType](/docs/v5/enum#accounttype) | false    | string  | To account type. **Required** when querying the transferable balance between different account types |
| coin                                       | **true** | string  | Coin, uppercase only                                                                                 |
| withBonus                                  | false    | integer | `0`(default): not query bonus. `1`: query bonus                                                      |
| withTransferSafeAmount                     | false    | integer | Whether query delay withdraw/transfer safe amount                                                    |

- `0`(default): false, `1`: true
- What is [delay withdraw amount](/docs/v5/asset/balance/delay-amount)?

| | withLtvTransferSafeAmount | false | integer | For OTC loan users in
particular, you can check the transferable amount under risk level

- `0`(default): false, `1`: true
- `toAccountType` is mandatory

|

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                | Type    | Comments                                                         |
| :----------------------- | :------ | ---------------------------------------------------------------- |
| accountType              | string  | Account type                                                     |
| bizType                  | integer | Biz type                                                         |
| accountId                | string  | Account ID                                                       |
| memberId                 | string  | Uid                                                              |
| balance                  | Object  |                                                                  |
| \> coin                  | string  | Coin                                                             |
| \> walletBalance         | string  | Wallet balance                                                   |
| \> transferBalance       | string  | Transferable balance                                             |
| \> bonus                 | string  | bonus                                                            |
| \> transferSafeAmount    | string  | Safe amount to transfer. Keep `""` if not query                  |
| \> ltvTransferSafeAmount | string  | Transferable amount for ins loan account. Keep `""` if not query |

[RUN >>](/docs/api-explorer/v5/asset/account-coin-balance)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/transfer/query-account-coin-balance?accountType=UNIFIED&coin=USDT&toAccountType=FUND&withLtvTransferSafeAmount=1 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: xxxxxX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1690254520644X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_coin_balance(    accountType="UNIFIED",    coin="BTC",    memberId=592324,))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getCoinBalance({    accountType: 'UNIFIED',    coin: 'USDT',    toAccountType: 'FUND',    withLtvTransferSafeAmount: 1,  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "accountType": "UNIFIED",
    "bizType": 1,
    "accountId": "1631385",
    "memberId": "1631373",
    "balance": {
      "coin": "USDT",
      "walletBalance": "11999",
      "transferBalance": "11999",
      "bonus": "0",
      "transferSafeAmount": "",
      "ltvTransferSafeAmount": "7602.4861"
    }
  },
  "retExtInfo": {},
  "time": 1690254521256
}
```
