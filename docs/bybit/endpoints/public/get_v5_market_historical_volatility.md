# Get Historical Volatility

Query option historical volatility

> **Covers: Option**

info

- The data is hourly.
- If both `startTime` and `endTime` are not specified, it will return the most
  recent 1 hours worth of data.
- `startTime` and `endTime` are a pair of params. Either both are passed or they
  are not passed at all.
- This endpoint can query the last 2 years worth of data, but make sure
  \[`endTime` - `startTime`\] <= 30 days.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/historical-volatility`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                            | Required | Type    | Comments                                                                      |
| :----------------------------------- | :------- | :------ | ----------------------------------------------------------------------------- |
| category                             | **true** | string  | Product type. `option`                                                        |
| baseCoin                             | false    | string  | Base coin, uppercase only. Default: return BTC data                           |
| quoteCoin                            | false    | string  | Quote coin, `USD` or `USDT`. Default: return quoteCoin=USD                    |
| [period](/docs/v5/enum#optionperiod) | false    | integer | Period. If not specified, it will return data with a 7-day average by default |
| startTime                            | false    | integer | The start timestamp (ms)                                                      |
| endTime                              | false    | integer | The end timestamp (ms)                                                        |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type    | Comments       |
| :-------- | :------ | -------------- |
| category  | string  | Product type   |
| list      | array   | Object         |
| \> period | integer | Period         |
| \> value  | string  | Volatility     |
| \> time   | string  | Timestamp (ms) |

[RUN >>](/docs/api-explorer/v5/market/iv)

---

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
GET /v5/market/historical-volatility?category=option&baseCoin=ETH&period=30 HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_historical_volatility(    category="option",    baseCoin="ETH",    period=30,))
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var historicalVolatilityRequest = MarketDataRequest.builder().category(CategoryType.OPTION).optionPeriod(7).build();client.getHistoricalVolatility(historicalVolatilityRequest, System.out::println);
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({ testnet: true })
client
  .getHistoricalVolatility({ category: "option", baseCoin: "ETH", period: 30 })
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
  "retMsg": "SUCCESS",
  "category": "option",
  "result": [
    {
      "period": 30,
      "value": "0.45024716",
      "time": "1672052400000"
    }
  ]
}
```
