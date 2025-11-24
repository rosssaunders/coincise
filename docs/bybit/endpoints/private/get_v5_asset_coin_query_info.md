# Get Coin Info

Query coin information, including chain information, withdraw and deposit status.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/coin/query-info`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| coin | false | string | Coin, uppercase only |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| rows | array | Object |
| \> name | string | Coin name |
| \> coin | string | Coin |
| \> remainAmount | string | Maximum withdraw amount per transaction |
| \> chains | array | Object |
| \>> chain | string | Chain |
| \>> chainType | string | Chain type |
| \>> confirmation | string | Number of confirmations for deposit: Once this number is reached, your funds will be credited to your account and available for trading |
| \>> withdrawFee | string | withdraw fee. *If withdraw fee is empty, It means that this coin does not support withdrawal* |
| \>> depositMin | string | Min. deposit |
| \>> withdrawMin | string | Min. withdraw |
| \>> minAccuracy | string | The precision of withdraw or deposit |
| \>> chainDeposit | string | The chain status of deposit. `0`: suspend. `1`: normal |
| \>> chainWithdraw | string | The chain status of withdraw. `0`: suspend. `1`: normal |
| \>> withdrawPercentageFee | string | The withdraw fee percentage. It is a real figure, e.g., 0.022 means 2.2% |
| \>> contractAddress | string | Contract address. `""` means no contract address |
| \>> safeConfirmNumber | string | Number of security confirmations: Once this number is reached, your USD equivalent worth funds will be fully unlocked and available for withdrawal. |

[RUN >>](/docs/api-explorer/v5/asset/coin-info)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/coin/query-info?coin=MNT HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672194580887X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_coin_info(    coin="MNT",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getCoinInfo('MNT')  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "rows": [
      {
        "name": "MNT",
        "coin": "MNT",
        "remainAmount": "10000000",
        "chains": [
          {
            "chainType": "Ethereum",
            "confirmation": "6",
            "withdrawFee": "3",
            "depositMin": "0",
            "withdrawMin": "3",
            "chain": "ETH",
            "chainDeposit": "1",
            "chainWithdraw": "1",
            "minAccuracy": "8",
            "withdrawPercentageFee": "0",
            "contractAddress": "0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
            "safeConfirmNumber": "65"
          },
          {
            "chainType": "Mantle Network",
            "confirmation": "100",
            "withdrawFee": "0",
            "depositMin": "0",
            "withdrawMin": "10",
            "chain": "MANTLE",
            "chainDeposit": "1",
            "chainWithdraw": "1",
            "minAccuracy": "8",
            "withdrawPercentageFee": "0",
            "contractAddress": "",
            "safeConfirmNumber": "100"
          }
        ]
      }
    ]
  },
  "retExtInfo": {},
  "time": 1736395486989
}
```