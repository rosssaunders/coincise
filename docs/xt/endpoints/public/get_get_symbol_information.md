# GET Get symbol information

Source:
[https://doc.xt.com/docs/spot/Market/GetSymbolInformation](https://doc.xt.com/docs/spot/Market/GetSymbolInformation)

# Get symbol information

**Type:** GET **Description:** `/v4/public/symbol`

### Parameters[​](#parameters "Direct link to Parameters")

| name    | type   | mandatory | default | description                                                                                                                     | ranges |
| ------- | ------ | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| symbol  | string | false     | \-      | trading pair eg:btc_usdt                                                                                                        |        |
| symbols | array  | false     | \-      | collection of trading pairs. priority is higher than symbol. eg: btc_usdt,eth_usdt                                              |        |
| version | string | false     | \-      | version number, if request version equals response version, list will not be returned (reduce IO). eg: 2e14d2cd5czcb2c2af2c1db6 |        |

### Limit Flow Rules[​](#limit-flow-rules "Direct link to Limit Flow Rules")

1.  Single symbol: `10/s/ip`
2.  Multiple symbols: `10/s/ip`

### FILTER[​](#filter "Direct link to FILTER")

#### PRICE FILTER[​](#price-filter "Direct link to PRICE FILTER")

- `min`: minimum price allowed
- `max`: maximum price allowed
- `tickSize`: step interval → `price = minPrice + (integer * tickSize)`

```
price >= minprice <= max(price - minPrice) % tickSize == 0
```

#### QUANTITY FILTER[​](#quantity-filter "Direct link to QUANTITY FILTER")

- `min`: minimum allowed
- `max`: maximum allowed
- `tickSize`: step interval

```
quantity >= minquantity <= max(quantity - minQuantity) % tickSize == 0
```

#### QUOTE_QTY FILTER[​](#quote_qty-filter "Direct link to QUOTE_QTY FILTER")

- If `min` is null → no restriction
- LIMIT orders → `price * quantity >= min`
- MARKET BUY orders → `quoteQty >= min`

#### PROTECTION_LIMIT FILTER[​](#protection_limit-filter "Direct link to PROTECTION_LIMIT FILTER")

- `buyMaxDeviation`, `buyPriceLimitCoefficient`, `sellMaxDeviation`,
  `sellPriceLimitCoefficient`

```
Buy:  price >= latestPrice - latestPrice * buyMaxDeviation      price <= latestPrice + latestPrice * buyPriceLimitCoefficientSell: price <= latestPrice + latestPrice * sellMaxDeviation      price >= latestPrice - latestPrice * sellPriceLimitCoefficient
```

#### PROTECTION_MARKET FILTER[​](#protection_market-filter "Direct link to PROTECTION_MARKET FILTER")

- `maxDeviation`: maximum deviation

```
Buy:  latestPrice + latestPrice * maxDeviation >= sellBestPriceSell: latestPrice - latestPrice * maxDeviation <= buyBestPrice
```

#### PROTECTION_ONLINE FILTER[​](#protection_online-filter "Direct link to PROTECTION_ONLINE FILTER")

- `maxPriceMultiple`, `durationSeconds`

```
price <= openPrice * maxPriceMultiple
```

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
// version: Version number, optional. If the requested version is equal to the response version, the list will not be returned (to reduce I/O).  curl --location --request GET 'https://sapi.xt.com/v4/public/symbol?symbol=XT_USDT&version=xxxxxxxx' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "time": 1662444177871, // timestamp    "version": "7cd2cfab0dc979339f1de904bd90c9cb", // content version    "symbols": [      {        "symbol": "btc_usdt", // trading pair        "state": "ONLINE", // trading pair status [ONLINE = online; OFFLINE = offline; DELISTED = delisted]        "tradingEnabled": true, // is trading enabled        "openapiEnabled": true, // is OPENAPI enabled        "nextStateTime": null, // next state timestamp        "nextState": null, // next state        "depthMergePrecision": 5, // depth merge precision        "baseCurrency": "btc", // base asset        "baseCurrencyPrecision": 5, // base asset precision        "quoteCurrency": "usdt", // quote asset        "quoteCurrencyPrecision": 6, // quote asset precision        "pricePrecision": 4, // price precision        "quantityPrecision": 6, // quantity precision        "takerFeeRate": 0.001, // taker fee rate        "makerFeeRate": 0.002, // maker fee rate        "orderTypes": ["LIMIT", "MARKET"], // order types [LIMIT = limit order; MARKET = market order]        "timeInForces": ["GTC", "FOK", "IOC", "GTX"], // time-in-force options [GTC = good till canceled; IOC = immediate or cancel; FOK = fill or kill; GTX = post-only cancel]        "displayWeight": 1, // display weight, higher value is displayed first        "displayLevel": "FULL", // display level [FULL = full display; SEARCH = search display; DIRECT = direct access; NONE = do not display]        "filters": [          {            "filter": "PROTECTION_LIMIT",            "buyMaxDeviation": "0.8",            "sellMaxDeviation": "0.8"          },          {            "filter": "PROTECTION_MARKET",            "maxDeviation": "0.1"          },          {            "filter": "PROTECTION_ONLINE",            "durationSeconds": "300",            "maxPriceMultiple": "5"          },          {            "filter": "PRICE",            "min": null,            "max": null,            "tickSize": null          },          {            "filter": "QUANTITY",            "min": null,            "max": null,            "tickSize": null          },          {            "filter": "QUOTE_QTY",            "min": null          }        ] // filters      }    ]  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/symbol.mdx)
