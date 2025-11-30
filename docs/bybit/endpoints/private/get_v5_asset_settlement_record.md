# Get USDC Session Settlement

Query session settlement records of USDC perpetual and futures

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/settlement-record`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                          | Required | Type    | Comments                                    |
| :--------------------------------- | :------- | :------ | ------------------------------------------- |
| [category](/docs/v5/enum#category) | **true** | string  | Product type `linear`(USDC contract)        |
| symbol                             | false    | string  | Symbol name, like `BTCPERP`, uppercase only |
| startTime                          | false    | integer | The start timestamp (ms)                    |

- startTime and endTime are not passed, return 30 days by default
- Only startTime is passed, return range between startTime and startTime + 30
  days
- Only endTime is passed, return range between endTime-30 days and endTime
- If both are passed, the rule is endTime - startTime <= 30 days

| | endTime | false | integer | The end time. timestamp (ms) | | limit | false |
integer | Limit for data size per page. \[`1`, `50`\]. Default: `20` | | cursor
| false | string | Cursor. Use the `nextPageCursor` token from the response to
retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter          | Type   | Comments                                |
| :----------------- | :----- | --------------------------------------- |
| category           | string | Product type                            |
| list               | array  | Object                                  |
| \> symbol          | string | Symbol name                             |
| \> side            | string | `Buy`,`Sell`                            |
| \> size            | string | Position size                           |
| \> sessionAvgPrice | string | Settlement price                        |
| \> markPrice       | string | Mark price                              |
| \> realisedPnl     | string | Realised PnL                            |
| \> createdTime     | string | Created time (ms)                       |
| nextPageCursor     | string | Refer to the `cursor` request parameter |

[RUN >>](/docs/api-explorer/v5/asset/settlement)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/settlement-record?category=linear HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672284883483X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_usdc_contract_settlement(    category="linear",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getSettlementRecords({ category: "linear" })
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
  "retMsg": "OK",
  "result": {
    "nextPageCursor": "116952%3A1%2C116952%3A1",
    "category": "linear",
    "list": [
      {
        "realisedPnl": "-71.28",
        "symbol": "BTCPERP",
        "side": "Buy",
        "markPrice": "16620",
        "size": "1.5",
        "createdTime": "1672214400000",
        "sessionAvgPrice": "16620"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1672284884285
}
```
