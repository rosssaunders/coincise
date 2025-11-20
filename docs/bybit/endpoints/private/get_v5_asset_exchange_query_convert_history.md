# Get Convert History

Returns all confirmed quotes.

info

Only displays the conversion history of conversions created through the API.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/exchange/query-convert-history`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [accountType](/docs/v5/enum#convertaccounttype) | false | string | Wallet type-   Supports passing multiple types, separated by comma e.g., `eb_convert_funding,eb_convert_uta`
-   Return all wallet types data if not passed |
| index | false | integer | Page number-   started from 1
-   1st page by default |
| limit | false | integer | Page size-   20 records by default
-   up to 100 records, return 100 when exceeds 100 |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| list | array<object\> | Array of quotes |
| \> [accountType](/docs/v5/enum#convertaccounttype) | string | Wallet type |
| \> exchangeTxId | string | Exchange tx ID, same as quote tx ID |
| \> userId | string | User ID |
| \> fromCoin | string | From coin |
| \> fromCoinType | string | From coin type. `crypto` |
| \> toCoin | string | To coin |
| \> toCoinType | string | To coin type. `crypto` |
| \> fromAmount | string | From coin amount (amount to sell) |
| \> toAmount | string | To coin amount (amount to buy according to exchange rate) |
| \> exchangeStatus | string | Exchange status-   init

-   failure |
| \> extInfo | object |  |
| \>> paramType | string | This field is published when you send it in the [Request a Quote](/docs/v5/asset/convert/apply-quote) |
| \>> paramValue | string | This field is published when you send it in the [Request a Quote](/docs/v5/asset/convert/apply-quote) |
| \> convertRate | string | Exchange rate |
| \> createdAt | string | Quote created time |

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
GET /v5/asset/exchange/query-convert-history?accountType=eb_convert_uta,eb_convert_funding HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1720074159814X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_convert_history(    accountType="eb_convert_uta,eb_convert_funding",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getConvertHistory()  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "ok",
  "result": {
    "list": [
      {
        "accountType": "eb_convert_funding",
        "exchangeTxId": "10100108106409343501030232064",
        "userId": "XXXXX",
        "fromCoin": "ETH",
        "fromCoinType": "crypto",
        "fromAmount": "0.1",
        "toCoin": "BTC",
        "toCoinType": "crypto",
        "toAmount": "0.00534882723991",
        "exchangeStatus": "success",
        "extInfo": {
          "paramType": "opFrom",
          "paramValue": "broker-id-001"
        },
        "convertRate": "0.0534882723991",
        "createdAt": "1720071899995"
      },
      {
        "accountType": "eb_convert_uta",
        "exchangeTxId": "23070eb_convert_uta408933875189391360",
        "userId": "XXXXX",
        "fromCoin": "BTC",
        "fromCoinType": "crypto",
        "fromAmount": "0.1",
        "toCoin": "ETH",
        "toCoinType": "crypto",
        "toAmount": "1.773938248611074",
        "exchangeStatus": "success",
        "extInfo": {},
        "convertRate": "17.73938248611074",
        "createdAt": "1719974243256"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1720074457715
}
```