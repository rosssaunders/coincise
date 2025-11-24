# Get Internal Transfer Records

Query the internal transfer records between different
[account types](/docs/v5/enum#accounttype) under the same UID.

info

- If startTime and endTime are not provided, the API returns data from the past
  7 days by default.
- If only startTime is provided, the API returns records from startTime to
  startTime + 7 days.
- If only endTime is provided, the API returns records from endTime - 7 days to
  endTime.
- If both are provided, the maximum allowed range is 7 days (endTime - startTime
  ≤ 7 days).

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/transfer/query-inter-transfer-list`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                              | Required | Type    | Comments                                                                                                               |
| :------------------------------------- | :------- | :------ | ---------------------------------------------------------------------------------------------------------------------- |
| transferId                             | false    | string  | UUID. Use the one you generated in [createTransfer](/docs/v5/asset/transfer/create-inter-transfer#response-parameters) |
| coin                                   | false    | string  | Coin, uppercase only                                                                                                   |
| [status](/docs/v5/enum#transferstatus) | false    | string  | Transfer status                                                                                                        |
| startTime                              | false    | integer | The start timestamp (ms) _Note: the query logic is actually effective based on **second** level_                       |
| endTime                                | false    | integer | The end timestamp (ms) _Note: the query logic is actually effective based on **second** level_                         |
| limit                                  | false    | integer | Limit for data size per page. \[`1`, `50`\]. Default: `20`                                                             |
| cursor                                 | false    | string  | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set                   |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                       | Type   | Comments                                |
| :---------------------------------------------- | :----- | --------------------------------------- |
| list                                            | array  | Object                                  |
| \> transferId                                   | string | Transfer ID                             |
| \> coin                                         | string | Transferred coin                        |
| \> amount                                       | string | Transferred amount                      |
| \> [fromAccountType](/docs/v5/enum#accounttype) | string | From account type                       |
| \> [toAccountType](/docs/v5/enum#accounttype)   | string | To account type                         |
| \> timestamp                                    | string | Transfer created timestamp (ms)         |
| \> [status](/docs/v5/enum#transferstatus)       | string | Transfer status                         |
| nextPageCursor                                  | string | Refer to the `cursor` request parameter |

[RUN >>](/docs/api-explorer/v5/asset/inter-transfer-list)

---

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
GET /v5/asset/transfer/inter-transfer-list-query?coin=USDT&limit=1 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1670988271299X-BAPI-RECV-WINDOW: 50000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_internal_transfer_records(    coin="USDT",    limit=1,))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .getInternalTransferRecords({ coin: "USDT", limit: 1 })
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
    "list": [
      {
        "transferId": "selfTransfer_a1091cc7-9364-4b74-8de1-18f02c6f2d5c",
        "coin": "USDT",
        "amount": "5000",
        "fromAccountType": "SPOT",
        "toAccountType": "UNIFIED",
        "timestamp": "1667283263000",
        "status": "SUCCESS"
      }
    ],
    "nextPageCursor": "eyJtaW5JRCI6MTM1ODQ2OCwibWF4SUQiOjEzNTg0Njh9"
  },
  "retExtInfo": {},
  "time": 1670988271677
}
```
