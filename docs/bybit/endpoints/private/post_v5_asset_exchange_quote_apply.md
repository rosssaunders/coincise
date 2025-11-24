# Request a Quote

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/asset/exchange/quote-apply`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [accountType](/docs/v5/enum#convertaccounttype) | **true** | string | Wallet type |
| fromCoin | **true** | string | Convert from coin (coin to sell) |
| toCoin | **true** | string | Convert to coin (coin to buy) |
| requestCoin | **true** | string | Request coin, same as fromCoin-   In the future, we may support requestCoin=toCoin |
| requestAmount | **true** | string | request coin amount (the amount you want to sell) |
| fromCoinType | false | string | `crypto` |
| toCoinType | false | string | `crypto` |
| paramType | false | string | `opFrom`, mainly used for API broker user |
| paramValue | false | string | Broker ID, mainly used for API broker user |
| requestId | false | string | Customised request ID-   a maximum length of 36
-   Generally it is useless, but it is convenient to track the quote request internally if you fill this field |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| quoteTxId | string | Quote transaction ID. It is system generated, and it is used to confirm quote and query the result of transaction |
| exchangeRate | string | Exchange rate |
| fromCoin | string | From coin |
| fromCoinType | string | From coin type. `crypto` |
| toCoin | string | To coin |
| toCoinType | string | To coin type. `crypto` |
| fromAmount | string | From coin amount (amount to sell) |
| toAmount | string | To coin amount (amount to buy according to exchange rate) |
| expiredTime | string | The expiry time for this quote (15 seconds) |
| requestId | string | Customised request ID |
| extTaxAndFee | array | Compliance-related field. Currently returns an empty array, which may be used in the future |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/asset/exchange/quote-apply HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1720071077014X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/jsonContent-Length: 172{    "requestId": "test-00002",    "fromCoin": "ETH",    "toCoin": "BTC",    "accountType": "eb_convert_funding",    "requestCoin": "ETH",    "requestAmount": "0.1",    "paramType": "opFrom",    "paramValue": "broker-id-001"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.request_a_quote(    requestId="test-00002",    fromCoin="ETH",    toCoin="BTC",    accountType="eb_convert_funding",    requestCoin="ETH",    requestAmount="0.1",    paramType="opFrom",    paramValue="broker-id-001",))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .requestConvertQuote({    requestId: 'test-00002',    fromCoin: 'ETH',    toCoin: 'BTC',    accountType: 'eb_convert_funding',    requestCoin: 'ETH',    requestAmount: '0.1',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "ok",
  "result": {
    "quoteTxId": "10100108106409340067234418688",
    "exchangeRate": "0.053517914861880000",
    "fromCoin": "ETH",
    "fromCoinType": "crypto",
    "toCoin": "BTC",
    "toCoinType": "crypto",
    "fromAmount": "0.1",
    "toAmount": "0.005351791486188000",
    "expiredTime": "1720071092225",
    "requestId": "test-00002",
    "extTaxAndFee": []
  },
  "retExtInfo": {},
  "time": 1720071077265
}
```