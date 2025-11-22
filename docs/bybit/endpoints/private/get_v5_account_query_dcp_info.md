# Get DCP Info

Query the DCP configuration of the account. Before calling the interface, please
make sure you have applied for the UTA account DCP configuration with your
account manager

- Only the configured main / sub account can query information from this API.
  Calling this API by an account always returns empty.
- If you only request to activate Spot trading for DCP, the contract and options
  data will not be returned.

info

- **Support [UTA2.0](/docs/v5/acct-mode#uta-20):**  
  USDT Perpetuals, USDT Futures, USDC Perpetuals, USDC Futures, Inverse
  Perpetuals, Inverse Futures \[DERIVATIVES\]  
  Spot \[SPOT\]  
  Options \[OPTIONS\]
- **Support [UTA1.0](/docs/v5/acct-mode#uta-10):**  
  USDT Perpetuals, USDT Futures, USDC Perpetuals, USDC Futures \[DERIVATIVES\]  
  Spot \[SPOT\]  
  Options \[OPTIONS\]

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/query-dcp-info`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter     | Type           | Comments                                                                                |
| :------------ | :------------- | --------------------------------------------------------------------------------------- |
| dcpInfos      | array<object\> | DCP config for each product                                                             |
| \> product    | string         | `SPOT`, `DERIVATIVES`, `OPTIONS`                                                        |
| \> dcpStatus  | string         | [Disconnected-CancelAll-Prevention](/docs/v5/order/dcp) status: `ON`                    |
| \> timeWindow | string         | DCP trigger time window which user pre-set. Between \[3, 300\] seconds, default: 10 sec |

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
GET /v5/account/query-dcp-info HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1717065530867X-BAPI-RECV-WINDOW: 5000
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .getDCPInfo()
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```
// it means my account enables Spot and Deriviatvies on the backend// Options is not enabled with DCP{    "retCode": 0,    "retMsg": "success",    "result": {        "dcpInfos": [            {                "product": "SPOT",                "dcpStatus": "ON",                "timeWindow": "10"            },            {                "product": "DERIVATIVES",                "dcpStatus": "ON",                "timeWindow": "10"            }        ]    },    "retExtInfo": {},    "time": 1717065531697}
```
