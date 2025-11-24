# Get Delivery Record

Query delivery records of Invese Futures, USDC Futures, USDT Futures and
Options, sorted by `deliveryTime` in descending order

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/delivery-record`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                                                    | Required | Type    | Comments                                                                                                             |
| :--------------------------------------------------------------------------- | :------- | :------ | -------------------------------------------------------------------------------------------------------------------- |
| [category](/docs/v5/enum#category)                                           | **true** | string  | Product type- [UTA2.0](/docs/v5/acct-mode#uta-20): `inverse`(inverse futures), `linear`(USDT/USDC futures), `option` |
| - [UTA1.0](/docs/v5/acct-mode#uta-10): `linear`(USDT/USDC futures), `option` |
| symbol                                                                       | false    | string  | Symbol name, like `BTCUSDT`, uppercase only                                                                          |
| startTime                                                                    | false    | integer | The start timestamp (ms)                                                                                             |

- startTime and endTime are not passed, return 30 days by default
- Only startTime is passed, return range between startTime and startTime + 30
  days
- Only endTime is passed, return range between endTime - 30 days and endTime
- If both are passed, the rule is endTime - startTime <= 30 days

| | endTime | false | integer | The end timestamp (ms) | | expDate | false |
string | Expiry date. `25MAR22`. Default: return all | | limit | false | integer
| Limit for data size per page. \[`1`, `50`\]. Default: `20` | | cursor | false
| string | Cursor. Use the `nextPageCursor` token from the response to retrieve
the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter        | Type   | Comments                                |
| :--------------- | :----- | --------------------------------------- |
| category         | string | Product type                            |
| list             | array  | Object                                  |
| \> deliveryTime  | number | Delivery time (ms)                      |
| \> symbol        | string | Symbol name                             |
| \> side          | string | `Buy`,`Sell`                            |
| \> position      | string | Executed size                           |
| \> entryPrice    | string | Avg entry price                         |
| \> deliveryPrice | string | Delivery price                          |
| \> strike        | string | Exercise price                          |
| \> fee           | string | Trading fee                             |
| \> deliveryRpl   | string | Realized PnL of the delivery            |
| nextPageCursor   | string | Refer to the `cursor` request parameter |

[RUN >>](/docs/api-explorer/v5/asset/delivery)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/delivery-record?expDate=29DEC22&category=option HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672362112944X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_option_delivery_record(    category="option",    expDate="29DEC22",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getDeliveryRecord({ category: 'option', expDate: '29DEC22' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "nextPageCursor": "132791%3A0%2C132791%3A0",
    "category": "option",
    "list": [
      {
        "symbol": "BTC-29DEC22-16000-P",
        "side": "Buy",
        "deliveryTime": 1672300800860,
        "strike": "16000",
        "fee": "0.00000000",
        "position": "0.01",
        "deliveryPrice": "16541.86369547",
        "deliveryRpl": "3.5"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1672362116184
}
```
