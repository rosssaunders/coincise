# Get Collateral Info

Get the collateral information of the current unified margin account, including
loan interest rate, loanable amount, collateral conversion rate, whether it can
be mortgaged as margin, etc.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/collateral-info`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                                                 |
| :-------- | :------- | :----- | -------------------------------------------------------- |
| currency  | false    | string | Asset currency of all current collateral, uppercase only |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter             | Type   | Comments                                                     |
| :-------------------- | :----- | ------------------------------------------------------------ |
| list                  | array  | Object                                                       |
| \> currency           | string | Currency of all current collateral                           |
| \> hourlyBorrowRate   | string | Hourly borrow rate                                           |
| \> maxBorrowingAmount | string | Max borrow amount. This value is shared across main-sub UIDs |
| \> freeBorrowingLimit | string | The maximum limit for interest-free borrowing                |

- Only the borrowing caused by contracts unrealised loss has interest-free
  amount

| | \> freeBorrowAmount | string | The amount of borrowing within your total
borrowing amount that is exempt from interest charges | | \> borrowAmount |
string | Borrow amount | | \> otherBorrowAmount | string | The sum of borrowing
amount for other accounts under the same main account | | \> availableToBorrow |
string | Available amount to borrow. This value is shared across main-sub UIDs |
| \> borrowable | boolean | Whether currency can be borrowed | | \>
borrowUsageRate | string | Borrow usage rate: sum of main & sub accounts
borrowAmount/maxBorrowingAmount, it is an actual value, 0.5 means 50% | | \>
marginCollateral | boolean | Whether it can be used as a margin collateral
currency (platform), `true`: YES, `false`: NO- When marginCollateral=false, then
collateralSwitch is meaningless | | \> collateralSwitch | boolean | Whether the
collateral is turned on by user (user), `true`: ON, `false`: OFF- When
marginCollateral=true, then collateralSwitch is meaningful | | \>
collateralRatio | string | **Deprecated** field. Due to the new Tiered
Collateral value logic, this field will no longer be accurate starting on
February 19, 2025. Please refer to
[Get Tiered Collateral Ratio](/docs/v5/spot-margin-uta/tier-collateral-ratio) |
| \> freeBorrowingAmount | string | **Deprecated** field, always return `""`,
please refer to `freeBorrowingLimit` |

[RUN >>](/docs/api-explorer/v5/account/collateral-info)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/account/collateral-info?currency=BTC HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672127952719X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_collateral_info(    currency="BTC",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getCollateralInfo("BTC")
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
    "list": [
      {
        "availableToBorrow": "3",
        "freeBorrowingAmount": "",
        "freeBorrowAmount": "0",
        "maxBorrowingAmount": "3",
        "hourlyBorrowRate": "0.00000147",
        "borrowUsageRate": "0",
        "collateralSwitch": true,
        "borrowAmount": "0",
        "borrowable": true,
        "currency": "BTC",
        "otherBorrowAmount": "0",
        "marginCollateral": true,
        "freeBorrowingLimit": "0",
        "collateralRatio": "0.95"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1691565901952
}
```
