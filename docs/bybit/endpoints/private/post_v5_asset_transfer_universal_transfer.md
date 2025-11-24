# Create Universal Transfer

Transfer between sub-sub or main-sub.

tip

    -   To use sub acct api key, it must have "SubMemberTransferList" permission
    -   When use sub acct api key, it can only transfer to main account

- If you encounter errorCode: `131228` and msg: `your balance is not enough`,
  please go to
  [Get Single Coin Balance](/docs/v5/asset/balance/account-coin-balance) to
  check transfer safe amount.
- You can not transfer between the same UID.
- Currently, the funding wallet only supports outgoing transfers in
  cryptocurrency, not in fiat currency.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/asset/transfer/universal-transfer`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                    | Required | Type    | Comments                                                                          |
| :------------------------------------------- | :------- | :------ | --------------------------------------------------------------------------------- |
| transferId                                   | **true** | string  | [UUID](https://www.uuidgenerator.net/dev-corner). Please manually generate a UUID |
| coin                                         | **true** | string  | Coin, uppercase only                                                              |
| amount                                       | **true** | string  | Amount                                                                            |
| fromMemberId                                 | **true** | integer | From UID                                                                          |
| toMemberId                                   | **true** | integer | To UID                                                                            |
| [fromAccountType](/docs/v5/enum#accounttype) | **true** | string  | From account type                                                                 |
| [toAccountType](/docs/v5/enum#accounttype)   | **true** | string  | To account type                                                                   |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter  | Type   | Comments                          |
| :--------- | :----- | --------------------------------- |
| transferId | string | UUID                              |
| status     | string | Transfer status- `STATUS_UNKNOWN` |

- `SUCCESS`
- `PENDING`
- `FAILED` |

[RUN >>](/docs/api-explorer/v5/asset/unitransfer)

---

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
POST /v5/asset/transfer/universal-transfer HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672189449697X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXContent-Type: application/json{    "transferId": "be7a2462-1138-4e27-80b1-62653f24925e",    "coin": "ETH",    "amount": "0.5",    "fromMemberId": 592334,    "toMemberId": 691355,    "fromAccountType": "CONTRACT",    "toAccountType": "UNIFIED"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.create_universal_transfer(    transferId="be7a2462-1138-4e27-80b1-62653f24925e",    coin="ETH",    amount="0.5",    fromMemberId=592334,    toMemberId=691355,    fromAccountType="CONTRACT",    toAccountType="UNIFIED",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .createUniversalTransfer({
    transferId: "be7a2462-1138-4e27-80b1-62653f24925e",
    coin: "ETH",
    amount: "0.5",
    fromMemberId: 592334,
    toMemberId: 691355,
    fromAccountType: "CONTRACT",
    toAccountType: "UNIFIED"
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "success",
  "result": {
    "transferId": "be7a2462-1138-4e27-80b1-62653f24925e",
    "status": "SUCCESS"
  },
  "retExtInfo": {},
  "time": 1672189450195
}
```
