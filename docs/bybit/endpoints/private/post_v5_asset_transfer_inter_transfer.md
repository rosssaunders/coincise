# Create Internal Transfer

Create the internal transfer between different
[account types](/docs/v5/enum#accounttype) under the same UID.

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/asset/transfer/inter-transfer`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                    | Required | Type   | Comments                                                                          |
| :------------------------------------------- | :------- | :----- | --------------------------------------------------------------------------------- |
| transferId                                   | **true** | string | [UUID](https://www.uuidgenerator.net/dev-corner). Please manually generate a UUID |
| coin                                         | **true** | string | Coin, uppercase only                                                              |
| amount                                       | **true** | string | Amount                                                                            |
| [fromAccountType](/docs/v5/enum#accounttype) | **true** | string | From account type                                                                 |
| [toAccountType](/docs/v5/enum#accounttype)   | **true** | string | To account type                                                                   |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter  | Type   | Comments                          |
| :--------- | :----- | --------------------------------- |
| transferId | string | UUID                              |
| status     | string | Transfer status- `STATUS_UNKNOWN` |

- `SUCCESS`
- `PENDING`
- `FAILED` |

[RUN >>](/docs/api-explorer/v5/asset/create-inter-transfer)

---

### Request Example[​](#request-example "Direct link to heading")

```
POST v5/asset/transfer/inter-transfer HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1670986690556X-BAPI-RECV-WINDOW: 50000X-BAPI-SIGN: XXXXXContent-Type: application/json{    "transferId": "42c0cfb0-6bca-c242-bc76-4e6df6cbcb16",    "coin": "BTC",    "amount": "0.05",    "fromAccountType": "UNIFIED",    "toAccountType": "CONTRACT"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.create_internal_transfer(    transferId="42c0cfb0-6bca-c242-bc76-4e6df6cbcb16",    coin="BTC",    amount="0.05",    fromAccountType="UNIFIED",    toAccountType="CONTRACT",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .createInternalTransfer(
    "42c0cfb0-6bca-c242-bc76-4e6df6cbcb16",
    "BTC",
    "0.05",
    "UNIFIED",
    "CONTRACT"
  )
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
    "transferId": "42c0cfb0-6bca-c242-bc76-4e6df6cbab16",
    "status": "SUCCESS"
  },
  "retExtInfo": {},
  "time": 1670986962783
}
```
