# GET /v5/asset/deposit/query-sub-member-record

**Source:**
[Get Sub Deposit Records (on-chain)](https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-record)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Asset
- Deposit
- Get Sub Deposit Records (on-chain)

On this page

# Get Sub Deposit Records (on-chain)

Query subaccount's deposit records by **main** UID's API key.

tip

`endTime` - `startTime` should be less than 30 days. Queries for the last 30
days worth of records by default.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/deposit/query-sub-member-record`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter   | Required | Type    | Comments                                                                                                                                         |
| :---------- | :------- | :------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| id          | false    | string  | Internal ID: Can be used to uniquely identify and filter the deposit. When combined with other parameters, this field takes the highest priority |
| txID        | false    | string  | Transaction ID: Please note that data generated before Jan 1, 2024 cannot be queried using txID                                                  |
| subMemberId | **true** | string  | Sub UID                                                                                                                                          |
| coin        | false    | string  | Coin, uppercase only                                                                                                                             |
| startTime   | false    | integer | The start timestamp (ms) _Note: the query logic is actually effective based on **second** level_                                                 |
| endTime     | false    | integer | The end timestamp (ms) _Note: the query logic is actually effective based on **second** level_                                                   |
| limit       | false    | integer | Limit for data size per page. \[`1`, `50`\]. Default: `50`                                                                                       |
| cursor      | false    | string  | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set                                             |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                | Type    | Comments                                                                                                                  |
| :--------------------------------------- | :------ | ------------------------------------------------------------------------------------------------------------------------- |
| rows                                     | array   | Object                                                                                                                    |
| \> id                                    | string  | Unique ID                                                                                                                 |
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
- 2: Reporting completed | | nextPageCursor | string | Refer to the `cursor`
  request parameter |

[RUN >>](/docs/api-explorer/v5/asset/sub-deposit-record)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/asset/deposit/query-sub-member-record?coin=USDT&limit=1&subMemberId=592334 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672192441294X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_sub_deposit_records(    coin="USDT",    limit=1,    subMemberId=592334,))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getSubAccountDepositRecords({    coin: 'USDT',    limit: 1,    subMemberId: '592334',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "success",    "result": {        "rows": [],        "nextPageCursor": ""    },    "retExtInfo": {},    "time": 1672192441742}
```

[

Previous

Get Deposit Records (on-chain)

](/docs/v5/asset/deposit/deposit-record)[

Next

Get Internal Deposit Records (off-chain)

](/docs/v5/asset/deposit/internal-deposit-record)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
