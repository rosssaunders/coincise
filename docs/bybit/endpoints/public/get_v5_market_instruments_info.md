# Get Instruments Info

Query for the instrument specification of online trading pairs.

> **Covers: Spot / USDT contract / USDC contract / Inverse contract / Option**

info

-   Spot does not support pagination, so `limit`, `cursor` are invalid.
-   When querying by `baseCoin`, regardless of if category=`linear` or `inverse`, the result will contain USDT contract, USDC contract and Inverse contract symbols.

caution

This endpoint returns 500 entries by default. There are now more than 500 `linear` symbols on the platform. As a result, you will need to use `cursor` for pagination or `limit` to get all entries.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/market/instruments-info`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| [category](/docs/v5/enum#category) | **true** | string | Product type. `spot`,`linear`,`inverse`,`option` |
| [symbol](/docs/v5/enum#symbol) | false | string | Symbol name, like `BTCUSDT`, uppercase only |
| [symbolType](/docs/v5/enum#symboltype) | false | string | SymbolType:The region to which the trading pair belongs,only for`linear`,`inverse`,`spot` |
| [status](/docs/v5/enum#status) | false | string | Symbol status filter
-   `linear` & `inverse` & `spot` By default returns only `Trading` symbols
-   `option` By default returns `PreLaunch`, `Trading`, and `Delivering`
-   Spot has `Trading` only
-   `linear` & `inverse`: when status=PreLaunch, it returns [Pre-Market contracts](https://www.bybit.com/help-center/article/Introduction-to-Pre-Market-Perpetual)

 |
| baseCoin | false | string | Base coin, uppercase only

-   Applies to `linear`,`inverse`,`option` **only**
-   `option`: returns BTC by default

 |
| limit | false | integer | Limit for data size per page. \[`1`, `1000`\]. Default: `500` |
| cursor | false | string | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

-   Linear/Inverse

| Parameter | Type | Comments |
| --- | --- | --- |
| category | string | Product type |
| nextPageCursor | string | Cursor. Used to pagination |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> [contractType](/docs/v5/enum#contracttype) | string | Contract type |
| \> [status](/docs/v5/enum#status) | string | Instrument status |
| \> baseCoin | string | Base coin |
| \> quoteCoin | string | Quote coin |
| \> [symbolType](/docs/v5/enum#symboltype) | string | the region to which the trading pair belongs |
| \> launchTime | string | Launch timestamp (ms) |
| \> deliveryTime | string | Delivery timestamp (ms)-   Expired futures delivery time
-   Perpetual delisting time |
| \> deliveryFeeRate | string | Delivery fee rate |
| \> priceScale | string | Price scale |
| \> leverageFilter | Object | Leverage attributes |
| \>> minLeverage | string | Minimum leverage |
| \>> maxLeverage | string | Maximum leverage |
| \>> leverageStep | string | The step to increase/reduce leverage |
| \> priceFilter | Object | Price attributes |
| \>> minPrice | string | Minimum order price |
| \>> maxPrice | string | Maximum order price |
| \>> tickSize | string | The step to increase/reduce order price |
| \> lotSizeFilter | Object | Size attributes |
| \>> minNotionalValue | string | Minimum notional value |
| \>> maxOrderQty | string | Maximum quantity for Limit and PostOnly order |
| \>> maxMktOrderQty | string | Maximum quantity for Market order |
| \>> minOrderQty | string | Minimum order quantity |
| \>> qtyStep | string | The step to increase/reduce order quantity |
| \>> postOnlyMaxOrderQty | string | deprecated, please use `maxOrderQty` |
| \> unifiedMarginTrade | boolean | Whether to support unified margin trade |
| \> fundingInterval | integer | Funding interval (minute) |
| \> settleCoin | string | Settle coin |
| \> [copyTrading](/docs/v5/enum#copytrading) | string | Copy trade symbol or not |
| \> upperFundingRate | string | Upper limit of funding date |
| \> lowerFundingRate | string | Lower limit of funding date |
| \> displayName | string | The USDC futures & perpetual name displayed in the Web or App |
| \> forbidUplWithdrawal | boolean | Whether to prohibit unrealised profit withdrawal |
| \> riskParameters | object | Risk parameters for limit order price. Note that the [formula changed](https://announcements.bybit.com/en/article/adjustments-to-bybit-s-derivative-trading-limit-order-mechanism-blt469228de1902fff6/) in Jan 2025 |
| \>> priceLimitRatioX | string | Ratio X |
| \>> priceLimitRatioY | string | Ratio Y |
| \> isPreListing | boolean | -   Whether the contract is a pre-market contract
-   When the pre-market contract is converted to official contract, it will be false |
| \> preListingInfo | object | -   If isPreListing=false, preListingInfo=null
-   If isPreListing=true, preListingInfo is an object |
| \>> [curAuctionPhase](/docs/v5/enum#curauctionphase) | string | The current auction phase |
| \>> phases | array<object> | Each phase time info |
| \>>> [phase](/docs/v5/enum#curauctionphase) | string | pre-market trading phase |
| \>>> startTime | string | The start time of the phase, timestamp(ms) |
| \>>> endTime | string | The end time of the phase, timestamp(ms) |
| \>> auctionFeeInfo | object | Action fee info |
| \>>> auctionFeeRate | string | The trading fee rate during auction phase-   There is no trading fee until entering continues trading phase |
| \>>> takerFeeRate | string | The taker fee rate during continues trading phase |
| \>>> makerFeeRate | string | The maker fee rate during continues trading phase |

| Parameter | Type | Comments |
| --- | --- | --- |
| category | string | Product type |
| nextPageCursor | string | Cursor. Used to pagination |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> optionsType | string | Option type. `Call`, `Put` |
| \> [status](/docs/v5/enum#status) | string | Instrument status |
| \> baseCoin | string | Base coin |
| \> quoteCoin | string | Quote coin |
| \> settleCoin | string | Settle coin |
| \> launchTime | string | Launch timestamp (ms) |
| \> deliveryTime | string | Delivery timestamp (ms) |
| \> deliveryFeeRate | string | Delivery fee rate |
| \> priceFilter | Object | Price attributes |
| \>> minPrice | string | Minimum order price |
| \>> maxPrice | string | Maximum order price |
| \>> tickSize | string | The step to increase/reduce order price |
| \> lotSizeFilter | Object | Size attributes |
| \>> maxOrderQty | string | Maximum order quantity |
| \>> minOrderQty | string | Minimum order quantity |
| \>> qtyStep | string | The step to increase/reduce order quantity |
| \> displayName | string | The option name displayed in the Web or App |

| Parameter | Type | Comments |
| --- | --- | --- |
| category | string | Product type |
| list | array | Object |
| \> symbol | string | Symbol name |
| \> baseCoin | string | Base coin |
| \> quoteCoin | string | Quote coin |
| \> innovation | string | deprecated, please use `symbolType` |
| \> [symbolType](/docs/v5/enum#symboltype) | string | the region to which the trading pair belongs |
| \> [status](/docs/v5/enum#status) | string | Instrument status |
| \> [marginTrading](/docs/v5/enum#margintrading) | string | Whether or not this symbol supports margin trading

-   You may find some symbols do not support margin buy or margin sell, so you need to go to [Collateral Info (UTA)](/docs/v5/account/collateral-info) to check if that coin is borrowable
-   When the lending pool has insufficient balance to lend out funds (can happen during big market movements) then this will switch to `none` until there is sufficient balance to re-enable margin trading

 |
| \> stTag | string | Whether or not it has an [special treatment label](https://www.bybit.com/en/help-center/article/Bybit-Special-Treatment-ST-Label-Management-Rules). `0`: false, `1`: true |
| \> lotSizeFilter | Object | Size attributes |
| \>> basePrecision | string | The precision of base coin |
| \>> quotePrecision | string | The precision of quote coin |
| \>> minOrderQty | string | Minimum order quantity, deprecated, no longer check `minOrderQty`, check `minOrderAmt` instead |
| \>> maxOrderQty | string | Maximum order quantity, deprecated, please refer to `maxLimitOrderQty`, `maxMarketOrderQty` based on order type |
| \>> minOrderAmt | string | Minimum order amount |
| \>> maxOrderAmt | string | Maximum order amount, deprecated, no longer check `maxOrderAmt`, check `maxLimitOrderQty` and `maxMarketOrderQty` instead |
| \>> maxLimitOrderQty | string | Maximum Limit order quantity

-   For post-only and retail price improvement (RPI) orders, the maximum limit order quantity is 5x `maxLimitOrderQty`

 |
| \>> maxMarketOrderQty | string | Maximum Market order quantity |
| \>> postOnlyMaxLimitOrderSize | string | Maximum limit order size for Post-only and RPI orders |
| \> priceFilter | Object | Price attributes |
| \>> tickSize | string | The step to increase/reduce order price |
| \> riskParameters | Object | Risk parameters for limit order price, refer to [announcement](https://announcements.bybit.com/en/article/title-adjustments-to-bybit-s-spot-trading-limit-order-mechanism-blt786c0c5abf865983/) |
| \>> priceLimitRatioX | string | Ratio X |
| \>> priceLimitRatioY | string | Ratio Y |

[RUN >>](/docs/api-explorer/v5/market/instrument)

* * *

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/market/instruments-info?category=linear&symbol=BTCUSDT HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_instruments_info(    category="linear",    symbol="BTCUSDT",))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "linear", "symbol": "BTCUSDT"}client.NewUtaBybitServiceWithParams(params).GetInstrumentInfo(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var instrumentInfoRequest = MarketDataRequest.builder().category(CategoryType.LINEAR).symbol("BTCUSDT").instrumentStatus(InstrumentStatus.TRADING).limit(500).build();client.getInstrumentsInfo(instrumentInfoRequest,System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client    .getInstrumentsInfo({        category: 'linear',        symbol: 'BTCUSDT',    })    .then((response) => {        console.log(response);    })    .catch((error) => {        console.error(error);    });
```

```bash
GET /v5/market/instruments-info?category=option&symbol=ETH-3JAN23-1250-P HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_instruments_info(    category="option",    symbol="ETH-3JAN23-1250-P",))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "option", "symbol": "ETH-3JAN23-1250-P"}client.NewUtaBybitServiceWithParams(params).GetInstrumentInfo(context.Background())
```

```python
import com.bybit.api.client.domain.CategoryType;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.MarketDataRequest;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var instrumentInfoRequest = MarketDataRequest.builder().category(CategoryType.OPTION).symbol("ETH-3JAN23-1250-P").instrumentStatus(InstrumentStatus.TRADING).limit(500).build();client.getInstrumentsInfo(instrumentInfoRequest,System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client  .getInstrumentsInfo({    category: 'option',    symbol: 'ETH-3JAN23-1250-P',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

```bash
GET /v5/market/instruments-info?category=spot&symbol=BTCUSDT HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(testnet=True)print(session.get_instruments_info(    category="spot",    symbol="BTCUSDT",))
```

```python
import (    "context"    "fmt"    bybit "github.com/bybit-exchange/bybit.go.api")client := bybit.NewBybitHttpClient("", "", bybit.WithBaseURL(bybit.TESTNET))params := map[string]interface{}{"category": "spot", "symbol": "BTCUSDT"}client.NewUtaBybitServiceWithParams(params).GetInstrumentInfo(context.Background())
```

```python
import com.bybit.api.client.domain.*;import com.bybit.api.client.domain.market.*;import com.bybit.api.client.domain.market.request.*;import com.bybit.api.client.service.BybitApiClientFactory;var client = BybitApiClientFactory.newInstance().newAsyncMarketDataRestClient();var instrumentInfoRequest = MarketDataRequest.builder().category(CategoryType.SPOT).symbol("BTCUSDT").instrumentStatus(InstrumentStatus.TRADING).limit(500).build();client.getInstrumentsInfo(instrumentInfoRequest,System.out::println);
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({    testnet: true,});client  .getInstrumentsInfo({    category: 'spot',    symbol: 'BTCUSDT',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
// official USDT Perpetual instrument structure{    "retCode": 0,    "retMsg": "OK",    "result": {        "category": "linear",        "list": [            {                "symbol": "BTCUSDT",                "contractType": "LinearPerpetual",                "status": "Trading",                "baseCoin": "BTC",                "quoteCoin": "USDT",                "launchTime": "1585526400000",                "deliveryTime": "0",                "deliveryFeeRate": "",                "priceScale": "2",                "leverageFilter": {                    "minLeverage": "1",                    "maxLeverage": "100.00",                    "leverageStep": "0.01"                },                "priceFilter": {                    "minPrice": "0.10",                    "maxPrice": "1999999.80",                    "tickSize": "0.10"                },                "lotSizeFilter": {                    "maxOrderQty": "1190.000",                    "minOrderQty": "0.001",                    "qtyStep": "0.001",                    "postOnlyMaxOrderQty": "1190.000",                    "maxMktOrderQty": "500.000",                    "minNotionalValue": "5"                },                "unifiedMarginTrade": true,                "fundingInterval": 480,                "settleCoin": "USDT",                "copyTrading": "both",                "upperFundingRate": "0.00375",                "lowerFundingRate": "-0.00375",                "isPreListing": false,                "preListingInfo": null,                "riskParameters": {                    "priceLimitRatioX": "0.01",                    "priceLimitRatioY": "0.02"                },                "symbolType": ""            }        ],        "nextPageCursor": ""    },    "retExtInfo": {},    "time": 1735809771618}// Pre-market Perpetual instrument structure{    "retCode": 0,    "retMsg": "OK",    "result": {        "category": "linear",        "list": [            {                "symbol": "BIOUSDT",                "contractType": "LinearPerpetual",                "status": "PreLaunch",                "baseCoin": "BIO",                "quoteCoin": "USDT",                "launchTime": "1735032510000",                "deliveryTime": "0",                "deliveryFeeRate": "",                "priceScale": "4",                "leverageFilter": {                    "minLeverage": "1",                    "maxLeverage": "5.00",                    "leverageStep": "0.01"                },                "priceFilter": {                    "minPrice": "0.0001",                    "maxPrice": "1999.9998",                    "tickSize": "0.0001"                },                "lotSizeFilter": {                    "maxOrderQty": "70000",                    "minOrderQty": "1",                    "qtyStep": "1",                    "postOnlyMaxOrderQty": "70000",                    "maxMktOrderQty": "14000",                    "minNotionalValue": "5"                },                "unifiedMarginTrade": true,                "fundingInterval": 480,                "settleCoin": "USDT",                "copyTrading": "none",                "upperFundingRate": "0.05",                "lowerFundingRate": "-0.05",                "isPreListing": true,                "preListingInfo": {                    "curAuctionPhase": "ContinuousTrading",                    "phases": [                        {                            "phase": "CallAuction",                            "startTime": "1735113600000",                            "endTime": "1735116600000"                        },                        {                            "phase": "CallAuctionNoCancel",                            "startTime": "1735116600000",                            "endTime": "1735116900000"                        },                        {                            "phase": "CrossMatching",                            "startTime": "1735116900000",                            "endTime": "1735117200000"                        },                        {                            "phase": "ContinuousTrading",                            "startTime": "1735117200000",                            "endTime": ""                        }                    ],                    "auctionFeeInfo": {                        "auctionFeeRate": "0",                        "takerFeeRate": "0.001",                        "makerFeeRate": "0.0004"                    }                },                "riskParameters": {                    "priceLimitRatioX": "0.05",                    "priceLimitRatioY": "0.1"                },                "symbolType": ""            }        ],        "nextPageCursor": "first%3DBIOUSDT%26last%3DBIOUSDT"    },    "retExtInfo": {},    "time": 1735810114435}
```

```json
{
  "retCode": 0,
  "retMsg": "OK",
  "result": {
    "category": "option",
    "nextPageCursor": "",
    "list": [
      {
        "symbol": "BTC-27MAR26-70000-P-USDT",
        "status": "Trading",
        "baseCoin": "BTC",
        "quoteCoin": "USDT",
        "settleCoin": "USDT",
        "optionsType": "Put",
        "launchTime": "1743669649256",
        "deliveryTime": "1774598400000",
        "deliveryFeeRate": "0.00015",
        "priceFilter": {
          "minPrice": "5",
          "maxPrice": "1110000",
          "tickSize": "5"
        },
        "lotSizeFilter": {
          "maxOrderQty": "500",
          "minOrderQty": "0.01",
          "qtyStep": "0.01"
        },
        "displayName": "BTCUSDT-27MAR26-70000-P"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1672712537130
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
        "baseCoin": "BTC",
        "quoteCoin": "USDT",
        "innovation": "0",
        "status": "Trading",
        "marginTrading": "utaOnly",
        "stTag": "0",
        "lotSizeFilter": {
          "basePrecision": "0.000001",
          "quotePrecision": "0.0000001",
          "minOrderQty": "0.000011",
          "maxOrderQty": "83",
          "minOrderAmt": "5",
          "maxOrderAmt": "8000000",
          "maxLimitOrderQty": "83",
          "maxMarketOrderQty": "41.5",
          "postOnlyMaxLimitOrderSize": "60000"
        },
        "priceFilter": {
          "tickSize": "0.1"
        },
        "riskParameters": {
          "priceLimitRatioX": "0.005",
          "priceLimitRatioY": "0.01"
        },
        "symbolType": ""
      }
    ]
  },
  "retExtInfo": {},
  "time": 1760027412300
}
```