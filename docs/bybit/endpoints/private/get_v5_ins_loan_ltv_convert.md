# Get LTV

Get your loan-to-value (LTV) ratio.

important

In cases where an institutional user makes frequent transfers, LTV calculations
may become inaccurate, and this endpoint will return retCode = 100016, retMsg =
"Transfers within your risk unit are too frequent. Please reduce the transfer
frequency and try again." If you encounter this error, it is recommended to
reduce the transfer frequency first and retry

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/ins-loan/ltv-convert`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                                                                                                        | Type   | Comments                                                                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------- | :----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ltvInfo                                                                                                                          | array  | Object                                                                                                                                                                         |
| \> ltv                                                                                                                           | string | Risk rate- ltv is calculated in real time                                                                                                                                      |
| - If you have an INS loan, it is highly recommended to query this data every second. Liquidation occurs when it reachs 0.9 (90%) |
| \> rst                                                                                                                           | string | Remaining liquidation time (UTC time in seconds). When it is not triggered, it is displayed as an empty string.                                                                |
| \> parentUid                                                                                                                     | string | The designated Risk Unit ID that was used to bind with the INS loan                                                                                                            |
| \> subAccountUids                                                                                                                | array  | Bound user ID                                                                                                                                                                  |
| \> unpaidAmount                                                                                                                  | string | Total debt(USDT)                                                                                                                                                               |
| \> unpaidInfo                                                                                                                    | array  | Debt details                                                                                                                                                                   |
| \>> token                                                                                                                        | string | coin                                                                                                                                                                           |
| \>> unpaidQty                                                                                                                    | string | Unpaid principle                                                                                                                                                               |
| \>> unpaidInterest                                                                                                               | string | Useless field, please ignore this for now                                                                                                                                      |
| \> balance                                                                                                                       | string | Total asset (margin coins converted to USDT). Please read [here](https://www.bybit.com/en-US/help-center/s/article/Over-the-counter-OTC-Lending) to understand the calculation |
| \> balanceInfo                                                                                                                   | array  | Asset details                                                                                                                                                                  |
| \>> token                                                                                                                        | string | Margin coin                                                                                                                                                                    |
| \>> price                                                                                                                        | string | Margin coin price                                                                                                                                                              |
| \>> qty                                                                                                                          | string | Margin coin quantity                                                                                                                                                           |
| \>> convertedAmount                                                                                                              | string | Margin conversion amount                                                                                                                                                       |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/ins-loan/ltv-convert HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1686638165351X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXX
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_ltv())
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getInstitutionalLendingLTVWithLadderConversionRate()
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
  "retMsg": "",
  "result": {
    "ltvInfo": [
      {
        "ltv": "0.75",
        "rst": "",
        "parentUid": "xxxxx",
        "subAccountUids": ["60568258"],
        "unpaidAmount": "30",
        "unpaidInfo": [
          {
            "token": "USDT",
            "unpaidQty": "30",
            "unpaidInterest": "0"
          }
        ],
        "balance": "40",
        "balanceInfo": [
          {
            "token": "USDT",
            "price": "1",
            "qty": "40",
            "convertedAmount": "40"
          }
        ]
      }
    ]
  },
  "retExtInfo": {},
  "time": 1686638166323
}
```
