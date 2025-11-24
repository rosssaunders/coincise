# GET /v5/asset/deposit/query-record

**Source:**
[Get Deposit Records (on-chain)](https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record)

## Authentication

Required (Private Endpoint)

- Get Deposit Records (on-chain)

# Get Deposit Records (on-chain)

Query deposit records

tip

- `endTime` - `startTime` should be less than 30 days. Query last 30 days
  records by default.
- Support using **main or sub** UID api key to query deposit records
  respectively.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/deposit/query-record`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type    | Comments                                                                                                                                         |
| :-------- | :------- | :------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| id        | false    | string  | Internal ID: Can be used to uniquely identify and filter the deposit. When combined with other parameters, this field takes the highest priority |
| txID      | false    | string  | Transaction ID: Please note that data generated before Jan 1, 2024 cannot be queried using txID                                                  |
| coin      | false    | string  | Coin, uppercase only                                                                                                                             |
| startTime | false    | integer | The start timestamp (ms) _Note: the query logic is actually effective based on **second** level_                                                 |
| endTime   | false    | integer | The end timestamp (ms) _Note: the query logic is actually effective based on **second** level_                                                   |
| limit     | false    | integer | Limit for data size per page. \[`1`, `50`\]. Default: `50`                                                                                       |
| cursor    | false    | string  | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set                                             |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                | Type    | Comments                                                                                                                  |
| :--------------------------------------- | :------ | ------------------------------------------------------------------------------------------------------------------------- |
| rows                                     | array   | Object                                                                                                                    |
| \> coin                                  | string  | Coin                                                                                                                      |
| \> chain                                 | string  | Chain                                                                                                                     |
| \> amount                                | string  | Amount                                                                                                                    |
| \> txID                                  | string  | Transaction ID                                                                                                            |
| \> [status](/docs/v5/enum#depositstatus) | integer | Deposit status                                                                                                            |
| \> toAddress                             | string  | Deposit target address                                                                                                    |
| \> tag                                   | string  | Tag of deposit target address                                                                                             |
| \> depositFee                            | string  | Deposit fee                                                                                                               |
| \> successAt                             | string  | Deposit's success time                                                                                                    |
| \> confirmations                         | string  | Number of confirmation blocks                                                                                             |
| \> txIndex                               | string  | Transaction sequence number                                                                                               |
| \> blockHash                             | string  | Hash number on the chain                                                                                                  |
| \> batchReleaseLimit                     | string  | The deposit limit for this coin in this chain. `"-1"` means no limit                                                      |
| \> depositType                           | string  | The deposit type. `0`: normal deposit, `10`: the deposit reaches daily deposit limit, `20`: abnormal deposit              |
| \> fromAddress                           | string  | From address of deposit, only shown when the deposit comes from on-chain and from address is unique, otherwise gives `""` |
| \> taxDepositRecordsId                   | string  | This field is used for tax purposes by Bybit EU (Austria) users， declare tax id                                          |
| \> taxStatus                             | integer | This field is used for tax purposes by Bybit EU (Austria) users- 0: No reporting required                                 |

- 1: Reporting pending
- 2: Reporting completed | | \> id | string | Unique ID | | nextPageCursor |
  string | Refer to the `cursor` request parameter |

[RUN >>](/docs/api-explorer/v5/asset/deposit-record)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/deposit/query-record?coin=USDT&limit=1 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672191991544X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_deposit_records(    coin="USDT",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getDepositRecords({ coin: "USDT" })
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
    "rows": [
      {
        "coin": "USDT",
        "chain": "TRX",
        "amount": "999.0496",
        "txID": "04bf3fbad2fc85b107a42cfdc5ff83110092b606ca754efa0f032f8b94b3262e",
        "status": 3,
        "toAddress": "TDGYpm5zPacnEqKV34TJPuhJhHom9hcXAy",
        "tag": "",
        "depositFee": "",
        "successAt": "1742728163000",
        "confirmations": "50",
        "txIndex": "0",
        "blockHash": "000000000436ab4dabc8a4a87beb2262d2d87f6761a825494c4f1d5ae11b27e8",
        "batchReleaseLimit": "-1",
        "depositType": "0",
        "fromAddress": "TJ7hhYhVhaxNx6BPyq7yFpqZrQULL3JSdb",
        "taxDepositRecordsId": "0",
        "taxStatus": 0,
        "id": "160237231"
      }
    ],
    "nextPageCursor": "eyJtaW5JRCI6MTYwMjM3MjMxLCJtYXhJRCI6MTYwMjM3MjMxfQ=="
  },
  "retExtInfo": {},
  "time": 1750798211884
}
```
