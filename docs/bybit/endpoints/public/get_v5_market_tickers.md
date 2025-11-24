# Get Tickers

Query for the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.

> **Covers: Spot / USDT contract / USDC contract / Inverse contract / Option**

info

If category=*option*, `symbol` or `baseCoin` must be passed.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/tickers`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type. `spot`,`linear`,`inverse`,`option` |
| [symbol](/docs/v5/enum#symbol) | false | string | Symbol name, like `BTCUSDT`, uppercase only |
| baseCoin | false | string | Base coin, uppercase only. Apply to `option` **only** |
| expDate | false | string | Expiry date. e.g., 25DEC22. Apply to `option` **only** |

### Response Parameters[​](#response-parameters "Direct link to heading")

-   Linear/Inverse

| Parameter | Type | Comments |
| --- | --- | --- |
| category | string | Product type |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> lastPrice | string | Last price |
| \> indexPrice | string | Index price |
| \> markPrice | string | Mark price |
| \> prevPrice24h | string | Market price 24 hours ago |
| \> price24hPcnt | string | Percentage change of market price relative to 24h |
| \> highPrice24h | string | The highest price in the last 24 hours |
| \> lowPrice24h | string | The lowest price in the last 24 hours |
| \> prevPrice1h | string | Market price an hour ago |
| \> openInterest | string | Open interest size |
| \> openInterestValue | string | Open interest value |
| \> turnover24h | string | Turnover for 24h |
| \> volume24h | string | Volume for 24h |
| \> fundingRate | string | Funding rate |
| \> nextFundingTime | string | Next funding time (ms) |
| \> predictedDeliveryPrice | string | Predicated delivery price. It has a value 30 mins before delivery |
| \> basisRate | string | Basis rate |
| \> basis | string | Basis |
| \> deliveryFeeRate | string | Delivery fee rate |
| \> deliveryTime | string | Delivery timestamp (ms), applicable to expiry futures only |
| \> ask1Size | string | Best ask size |
| \> bid1Price | string | Best bid price |
| \> ask1Price | string | Best ask price |
| \> bid1Size | string | Best bid size |
| \> preOpenPrice | string | Estimated pre-market contract open price

 |
| \> preQty | string | Estimated pre-market contract open qty-   The value is meaningless once the market opens |
| \> [curPreListingPhase](/docs/v5/enum#curauctionphase) | string | The current pre-market contract phase |
| \> fundingIntervalHour | string | Funding interval hour-   This value currently only supports whole hours |
| \> fundingCap | string | Funding rate upper and lower limits |
| \> basisRateYear | string | Annual basis rate-   Only for Futures,For Perpetual,it will return "" |

| Parameter | Type | Comments |
| --- | --- | --- |
| category | string | Product type |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> bid1Price | string | Best bid price |
| \> bid1Size | string | Best bid size |
| \> bid1Iv | string | Best bid iv |
| \> ask1Price | string | Best ask price |
| \> ask1Size | string | Best ask size |
| \> ask1Iv | string | Best ask iv |
| \> lastPrice | string | Last price |
| \> highPrice24h | string | The highest price in the last 24 hours |
| \> lowPrice24h | string | The lowest price in the last 24 hours |
| \> markPrice | string | Mark price |
| \> indexPrice | string | Index price |
| \> markIv | string | Mark price iv |
| \> underlyingPrice | string | Underlying price |
| \> openInterest | string | Open interest size |
| \> turnover24h | string | Turnover for 24h |
| \> volume24h | string | Volume for 24h |
| \> totalVolume | string | Total volume |
| \> totalTurnover | string | Total turnover |
| \> delta | string | Delta |
| \> gamma | string | Gamma |
| \> vega | string | Vega |
| \> theta | string | Theta |
| \> predictedDeliveryPrice | string | Predicated delivery price. It has a value 30 mins before delivery |
| \> change24h | string | The change in the last 24 hous |

| Parameter | Type | Comments |
| --- | --- | --- |
| category | string | Product type |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> bid1Price | string | Best bid price |
| \> bid1Size | string | Best bid size |
| \> ask1Price | string | Best ask price |
| \> ask1Size | string | Best ask size |
| \> lastPrice | string | Last price |
| \> prevPrice24h | string | Market price 24 hours ago |
| \> price24hPcnt | string | Percentage change of market price relative to 24h |
| \> highPrice24h | string | The highest price in the last 24 hours |
| \> lowPrice24h | string | The lowest price in the last 24 hours |
| \> turnover24h | string | Turnover for 24h |
| \> volume24h | string | Volume for 24h |
| \> usdIndexPrice | string | USD index price

-   non-collateral margin coin returns ""
-   Only those trading pairs like "XXX/USDT" or "XXX/USDC" have the value

 |

[RUN >>](/docs/api-explorer/v5/market/tickers)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/market/tickers?category=inverse&symbol=BTCUSD HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_tickers(    category="inverse",    symbol="BTCUSD",))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "inverse", "symbol": "BTCUSD"}client.NewUtaBybitServiceWithParams(params).GetMarketTickers(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var tickerReueqt = MarketDataRequest.builder().category(CategoryType.INVERSE).symbol("BTCUSD").build();client.getMarketTickers(tickerReueqt, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client    .getTickers({        category: 'inverse',        symbol: 'BTCUSDT',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

```bash
GET /v5/market/tickers?category=option&symbol=BTC-30DEC22-18000-C HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_tickers(    category="option",    symbol="BTC-30DEC22-18000-C",))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "option", "symbol": "BTC-30DEC22-18000-C"}client.NewUtaBybitServiceWithParams(params).GetMarketTickers(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var tickerReueqt = MarketDataRequest.builder().category(CategoryType.OPTION).symbol("BTC-30DEC22-18000-C").build();client.getMarketTickers(tickerReueqt, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client  .getTickers({    category: 'option',    symbol: 'BTC-30DEC22-18000-C',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

```bash
GET /v5/market/tickers?category=spot&symbol=BTCUSDT HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_tickers(    category="spot",    symbol="BTCUSDT",))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "spot", "symbol": "BTCUSDT"}client.NewUtaBybitServiceWithParams(params).GetMarketTickers(context.Background())
```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var tickerReueqt = MarketDataRequest.builder().category(CategoryType.SPOT).symbol("BTCUSDT").build();client.getMarketTickers(tickerReueqt, System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client  .getTickers({    category: 'spot',    symbol: 'BTCUSDT',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "category": "inverse",
    "list": [
      {
        "symbol": "BTCUSD",
        "lastPrice": "120635.50",
        "indexPrice": "114890.92",
        "markPrice": "114898.43",
        "prevPrice24h": "105595.90",
        "price24hPcnt": "0.142425",
        "highPrice24h": "131309.30",
        "lowPrice24h": "102007.60",
        "prevPrice1h": "119806.10",
        "openInterest": "240113967",
        "openInterestValue": "2089.79",
        "turnover24h": "115.6907",
        "volume24h": "13713832.0000",
        "fundingRate": "0.0001",
        "nextFundingTime": "1760371200000",
        "predictedDeliveryPrice": "",
        "basisRate": "",
        "deliveryFeeRate": "",
        "deliveryTime": "0",
        "ask1Size": "9854",
        "bid1Price": "103401.00",
        "ask1Price": "109152.80",
        "bid1Size": "1063",
        "basis": "",
        "preOpenPrice": "",
        "preQty": "",
        "curPreListingPhase": "",
        "fundingIntervalHour": "8",
        "basisRateYear": "",
        "fundingCap": "0.005"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1760352369814
}
```

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "category": "option",
    "list": [
      {
        "symbol": "BTC-30DEC22-18000-C",
        "bid1Price": "0",
        "bid1Size": "0",
        "bid1Iv": "0",
        "ask1Price": "435",
        "ask1Size": "0.66",
        "ask1Iv": "5",
        "lastPrice": "435",
        "highPrice24h": "435",
        "lowPrice24h": "165",
        "markPrice": "0.00000009",
        "indexPrice": "16600.55",
        "markIv": "0.7567",
        "underlyingPrice": "16590.42",
        "openInterest": "6.3",
        "turnover24h": "2482.73",
        "volume24h": "0.15",
        "totalVolume": "99",
        "totalTurnover": "1967653",
        "delta": "0.00000001",
        "gamma": "0.00000001",
        "vega": "0.00000004",
        "theta": "-0.00000152",
        "predictedDeliveryPrice": "0",
        "change24h": "86"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1672376592395
}
```

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "category": "spot",
    "list": [
      {
        "symbol": "BTCUSDT",
        "bid1Price": "20517.96",
        "bid1Size": "2",
        "ask1Price": "20527.77",
        "ask1Size": "1.862172",
        "lastPrice": "20533.13",
        "prevPrice24h": "20393.48",
        "price24hPcnt": "0.0068",
        "highPrice24h": "21128.12",
        "lowPrice24h": "20318.89",
        "turnover24h": "243765620.65899866",
        "volume24h": "11801.27771",
        "usdIndexPrice": "20784.12009279"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1673859087947
}
```