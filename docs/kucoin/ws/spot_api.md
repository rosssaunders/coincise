---
title: KuCoin Spot WebSocket API v1.0.0
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="kucoin-spot-websocket-api">KuCoin Spot WebSocket API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

spot_public

<h1 id="kucoin-spot-websocket-api-default">Default</h1>

## Get Ticker

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/ticker/market/ticker:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/ticker/market/ticker:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /ticker/market/ticker:_symbol_,_symbol_`

Subscribe to this topic to get specified symbol pushes on BBO changes.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "description": "Sequence number",
          "type": "string"
        },
        "price": {
          "description": "Last traded price",
          "type": "string"
        },
        "size": {
          "description": "Last traded amount",
          "type": "string"
        },
        "bestAsk": {
          "description": "Best ask price",
          "type": "string"
        },
        "bestAskSize": {
          "description": "Best ask size",
          "type": "string"
        },
        "bestBid": {
          "description": "Best bid price",
          "type": "string"
        },
        "bestBidSize": {
          "description": "Best bid size",
          "type": "string"
        },
        "time": {
          "type": "integer",
          "description": "The matching time of the latest transaction",
          "format": "int64"
        }
      },
      "required": [
        "sequence",
        "price",
        "size",
        "bestAsk",
        "bestAskSize",
        "bestBid",
        "bestBidSize",
        "time"
      ]
    }
  },
  "required": ["type", "topic", "subject", "data"],
  "x-apidog-refs": {}
}
```

<h3 id="get-ticker-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                    |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_ticker](#schemaspot_spot_public_ticker) |

<aside class="success">
This operation does not require authentication
</aside>

## Get All Tickers

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/allTickers/market/ticker:all", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/allTickers/market/ticker:all', headers = headers)

print(r.json())

```

`TRACE /allTickers/market/ticker:all`

Subscribe to this topic to get pushes on all market symbol BBO changes.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "bestAsk": {
          "type": "string"
        },
        "bestAskSize": {
          "type": "string"
        },
        "bestBid": {
          "type": "string"
        },
        "bestBidSize": {
          "type": "string"
        },
        "price": {
          "type": "string"
        },
        "sequence": {
          "type": "string"
        },
        "size": {
          "type": "string"
        },
        "time": {
          "type": "integer",
          "description": "The matching time of the latest transaction",
          "format": "int64"
        }
      },
      "required": [
        "bestAsk",
        "bestAskSize",
        "bestBid",
        "bestBidSize",
        "price",
        "sequence",
        "size",
        "time"
      ]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="get-all-tickers-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                            |
| ------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_allTickers](#schemaspot_spot_public_alltickers) |

<aside class="success">
This operation does not require authentication
</aside>

## Orderbook - Level1

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderbookLevel1/spotMarket/level1:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/orderbookLevel1/spotMarket/level1:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /orderbookLevel1/spotMarket/level1:_symbol_,_symbol_`

The system will return the 1 best ask/bid orders data; a topic supports up to
100 symbols. If there is no change in the market, data will not be pushed

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="orderbook---level1-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                      |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_orderbookLevel1](#schemaspot_spot_public_orderbooklevel1) |

<aside class="success">
This operation does not require authentication
</aside>

## Orderbook - Level5

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderbookLevel5/spotMarket/level2Depth5:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/orderbookLevel5/spotMarket/level2Depth5:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /orderbookLevel5/spotMarket/level2Depth5:_symbol_,_symbol_`

The system will return the 5 best ask/bid orders data; a topic supports up to
100 symbols. If there is no change in the market, data will not be pushed

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="orderbook---level5-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                      |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_orderbookLevel5](#schemaspot_spot_public_orderbooklevel5) |

<aside class="success">
This operation does not require authentication
</aside>

## Orderbook - Level50

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderbookLevel50/spotMarket/level2Depth50:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/orderbookLevel50/spotMarket/level2Depth50:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /orderbookLevel50/spotMarket/level2Depth50:_symbol_,_symbol_`

The system will return data for the 50 best ask/bid orders; a topic supports up
to 100 symbols. If there is no change in the market, data will not be pushed

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

<h3 id="orderbook---level50-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                        |
| ------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_orderbookLevel50](#schemaspot_spot_public_orderbooklevel50) |

<aside class="success">
This operation does not require authentication
</aside>

## CallAuctionOrderbook - Level50

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/callAuctionOrderbookLevel50/callauction/level2Depth50:_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/callAuctionOrderbookLevel50/callauction/level2Depth50:_symbol_', headers = headers)

print(r.json())

```

`TRACE /callAuctionOrderbookLevel50/callauction/level2Depth50:_symbol_`

The system will return the call auction 50 best ask/bid orders data; if there is
no change in the market, data will not be pushed

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

<h3 id="callauctionorderbook---level50-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                                              |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_callAuctionOrderbookLevel50](#schemaspot_spot_public_callauctionorderbooklevel50) |

<aside class="success">
This operation does not require authentication
</aside>

## Get Call Auction Info

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/callAuctionInfo/callauction/callauctionData:_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/callAuctionInfo/callauction/callauctionData:_symbol_', headers = headers)

print(r.json())

```

`TRACE /callAuctionInfo/callauction/callauctionData:_symbol_`

Subscribe to this topic to get the specified symbol call auction info.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "Symbol"
        },
        "estimatedPrice": {
          "type": "string",
          "description": "Estimated price"
        },
        "estimatedSize": {
          "type": "string",
          "description": "Estimated size"
        },
        "sellOrderRangeLowPrice": {
          "type": "string",
          "description": "Sell ​​order minimum price"
        },
        "sellOrderRangeHighPrice": {
          "type": "string",
          "description": "Sell ​​order maximum price"
        },
        "buyOrderRangeLowPrice": {
          "type": "string",
          "description": "Buy ​​order minimum price"
        },
        "buyOrderRangeHighPrice": {
          "type": "string",
          "description": "Buy ​​order maximum price"
        },
        "time": {
          "type": "integer",
          "description": "Timestamp (ms)",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "estimatedPrice",
        "estimatedSize",
        "sellOrderRangeLowPrice",
        "sellOrderRangeHighPrice",
        "buyOrderRangeLowPrice",
        "buyOrderRangeHighPrice",
        "time"
      ]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

<h3 id="get-call-auction-info-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                      |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_callAuctionInfo](#schemaspot_spot_public_callauctioninfo) |

<aside class="success">
This operation does not require authentication
</aside>

## Orderbook - Increment

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderbookIncrement/market/level2:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/orderbookIncrement/market/level2:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /orderbookIncrement/market/level2:_symbol_,_symbol_`

The system will return the increment change orderbook data (all depths); a topic
supports up to 100 symbols. If there is no change in the market, data will not
be pushed

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "changes": {
          "type": "object",
          "properties": {
            "asks": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "description": "price,size,sequence"
            },
            "bids": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "required": ["asks", "bids"]
        },
        "sequenceEnd": {
          "type": "integer",
          "format": "int64"
        },
        "sequenceStart": {
          "type": "integer",
          "format": "int64"
        },
        "symbol": {
          "type": "string"
        },
        "time": {
          "type": "integer",
          "description": "milliseconds",
          "format": "int64"
        }
      },
      "required": ["changes", "sequenceEnd", "sequenceStart", "symbol", "time"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="orderbook---increment-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                            |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_orderbookIncrement](#schemaspot_spot_public_orderbookincrement) |

<aside class="success">
This operation does not require authentication
</aside>

## Klines

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/klines/market/candles:_symbol___type_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/klines/market/candles:_symbol___type_', headers = headers)

print(r.json())

```

`TRACE /klines/market/candles:_symbol___type_`

Subscribe to this topic to get K-Line data.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "symbol"
        },
        "candles": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Start time of the candle cycle,open price,close price, high price,low price,Transaction volume,Transaction amount"
        },
        "time": {
          "type": "integer",
          "description": "now（us）",
          "format": "int64"
        }
      },
      "required": ["symbol", "candles", "time"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="klines-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                    |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_klines](#schemaspot_spot_public_klines) |

<aside class="success">
This operation does not require authentication
</aside>

## Trade

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/trade/market/match:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/trade/market/match:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /trade/market/match:_symbol_,_symbol_`

Subscribe to this topic to get Level 3 matching event data flows. A topic
supports up to 100 symbols.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "makerOrderId": {
          "type": "string"
        },
        "price": {
          "type": "string"
        },
        "sequence": {
          "type": "string"
        },
        "side": {
          "type": "string"
        },
        "size": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "takerOrderId": {
          "type": "string"
        },
        "time": {
          "type": "string"
        },
        "tradeId": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "makerOrderId",
        "price",
        "sequence",
        "side",
        "size",
        "symbol",
        "takerOrderId",
        "time",
        "tradeId",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="trade-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                  |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_trade](#schemaspot_spot_public_trade) |

<aside class="success">
This operation does not require authentication
</aside>

## Symbol Snapshot

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/symbolSnapshot/market/snapshot:_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/symbolSnapshot/market/snapshot:_symbol_', headers = headers)

print(r.json())

```

`TRACE /symbolSnapshot/market/snapshot:_symbol_`

Subscribe to get snapshot data for a single symbol.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {
            "askSize": {
              "type": "number"
            },
            "averagePrice": {
              "type": "number"
            },
            "baseCurrency": {
              "type": "string"
            },
            "bidSize": {
              "type": "number"
            },
            "board": {
              "type": "integer",
              "description": "Trading pair partition: 0. Primary partition 1.KuCoin Plus\", example = \"1\"",
              "enum": [0, 1],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "primary partition"
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "KuCoin Plus"
                }
              ]
            },
            "buy": {
              "type": "number"
            },
            "changePrice": {
              "type": "number"
            },
            "changeRate": {
              "type": "number"
            },
            "close": {
              "type": "number"
            },
            "datetime": {
              "type": "integer",
              "format": "int64"
            },
            "high": {
              "type": "number"
            },
            "lastTradedPrice": {
              "type": "number"
            },
            "low": {
              "type": "number"
            },
            "makerCoefficient": {
              "type": "number"
            },
            "makerFeeRate": {
              "type": "number"
            },
            "marginTrade": {
              "type": "boolean"
            },
            "mark": {
              "type": "integer",
              "description": "Trading Pair Mark: 0. Default 1.ST. 2.NEW\", example = \"1\"",
              "enum": [0, 1, 2],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "default"
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "ST"
                },
                {
                  "value": 2,
                  "name": "",
                  "description": "NEW"
                }
              ]
            },
            "market": {
              "type": "string"
            },
            "marketChange1h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange24h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange4h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "markets": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "open": {
              "type": "number"
            },
            "quoteCurrency": {
              "type": "string"
            },
            "sell": {
              "type": "number"
            },
            "siteTypes": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "sort": {
              "type": "integer",
              "description": "sorting number(Pointless)"
            },
            "symbol": {
              "type": "string"
            },
            "symbolCode": {
              "type": "string"
            },
            "takerCoefficient": {
              "type": "number"
            },
            "takerFeeRate": {
              "type": "number"
            },
            "trading": {
              "type": "boolean"
            },
            "vol": {
              "type": "number"
            },
            "volValue": {
              "type": "number",
              "description": "24-hour rolling transaction volume, refreshed every 2s"
            }
          },
          "required": [
            "askSize",
            "averagePrice",
            "baseCurrency",
            "bidSize",
            "board",
            "buy",
            "changePrice",
            "changeRate",
            "close",
            "datetime",
            "high",
            "lastTradedPrice",
            "low",
            "makerCoefficient",
            "makerFeeRate",
            "marginTrade",
            "mark",
            "market",
            "marketChange1h",
            "marketChange24h",
            "marketChange4h",
            "markets",
            "open",
            "quoteCurrency",
            "sell",
            "siteTypes",
            "sort",
            "symbol",
            "symbolCode",
            "takerCoefficient",
            "takerFeeRate",
            "trading",
            "vol",
            "volValue"
          ]
        }
      },
      "required": ["sequence", "data"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="symbol-snapshot-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                    |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_symbolSnapshot](#schemaspot_spot_public_symbolsnapshot) |

<aside class="success">
This operation does not require authentication
</aside>

## Market Snapshot

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/marketSnapshot/market/snapshot:_market_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/marketSnapshot/market/snapshot:_market_', headers = headers)

print(r.json())

```

`TRACE /marketSnapshot/market/snapshot:_market_`

Subscribe to this topic to get snapshot data for the entire market.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {
            "askSize": {
              "type": "number"
            },
            "averagePrice": {
              "type": "number"
            },
            "baseCurrency": {
              "type": "string"
            },
            "bidSize": {
              "type": "number"
            },
            "board": {
              "type": "integer",
              "description": "Trading pair partition: 0. Primary partition 1.KuCoin Plus\", example = \"1\"",
              "enum": [0, 1],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "primary partition"
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "KuCoin Plus"
                }
              ],
              "example": [1]
            },
            "buy": {
              "type": "number"
            },
            "changePrice": {
              "type": "number"
            },
            "changeRate": {
              "type": "number"
            },
            "close": {
              "type": "number"
            },
            "datetime": {
              "type": "integer",
              "format": "int64"
            },
            "high": {
              "type": "number"
            },
            "lastTradedPrice": {
              "type": "number"
            },
            "low": {
              "type": "number"
            },
            "makerCoefficient": {
              "type": "number"
            },
            "makerFeeRate": {
              "type": "number"
            },
            "marginTrade": {
              "type": "boolean"
            },
            "mark": {
              "type": "integer",
              "description": "Trading Pair Mark: 0. Default 1.ST. 2.NEW\", example = \"1\"",
              "enum": [0, 1, 2],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "default "
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "ST"
                },
                {
                  "value": 2,
                  "name": "",
                  "description": "NEW"
                }
              ],
              "example": [1]
            },
            "market": {
              "type": "string"
            },
            "marketChange1h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange24h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange4h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "markets": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "open": {
              "type": "number"
            },
            "quoteCurrency": {
              "type": "string"
            },
            "sell": {
              "type": "number"
            },
            "siteTypes": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "sort": {
              "type": "integer",
              "description": "sorting number"
            },
            "symbol": {
              "type": "string"
            },
            "symbolCode": {
              "type": "string"
            },
            "takerCoefficient": {
              "type": "number"
            },
            "takerFeeRate": {
              "type": "number"
            },
            "trading": {
              "type": "boolean"
            },
            "vol": {
              "type": "number"
            },
            "volValue": {
              "type": "number"
            }
          },
          "required": [
            "askSize",
            "averagePrice",
            "baseCurrency",
            "bidSize",
            "board",
            "buy",
            "changePrice",
            "changeRate",
            "close",
            "datetime",
            "high",
            "lastTradedPrice",
            "low",
            "makerCoefficient",
            "makerFeeRate",
            "marginTrade",
            "mark",
            "market",
            "marketChange1h",
            "marketChange24h",
            "marketChange4h",
            "markets",
            "open",
            "quoteCurrency",
            "sell",
            "siteTypes",
            "sort",
            "symbol",
            "symbolCode",
            "takerCoefficient",
            "takerFeeRate",
            "trading",
            "vol",
            "volValue"
          ]
        }
      },
      "required": ["sequence", "data"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

<h3 id="market-snapshot-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                    |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_public_marketSnapshot](#schemaspot_spot_public_marketsnapshot) |

<aside class="success">
This operation does not require authentication
</aside>

## Get Order(V2)

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderV2/spotMarket/tradeOrdersV2", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/orderV2/spotMarket/tradeOrdersV2', headers = headers)

print(r.json())

```

`TRACE /orderV2/spotMarket/tradeOrdersV2`

This topic will push all change events of your orders. Compared with v1, v2 adds
an Order Status: "new", there is no difference in push speed

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": ["private", "public"],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "canceledSize": {
          "type": "string",
          "description": "Cumulative number of cancellations"
        },
        "clientOid": {
          "type": "string",
          "description": "Client Order ID: The ClientOid field is a unique ID created by the user"
        },
        "filledSize": {
          "type": "string",
          "description": "Cumulative number filled"
        },
        "orderId": {
          "type": "string",
          "description": "The unique order id generated by the trading system"
        },
        "orderTime": {
          "type": "integer",
          "description": "Gateway received the message time (milliseconds)",
          "format": "int64"
        },
        "orderType": {
          "type": "string",
          "enum": ["limit", "market"],
          "description": "User-specified order type",
          "x-api-enum": [
            {
              "value": "limit",
              "name": "limit",
              "description": "limit"
            },
            {
              "value": "market",
              "name": "market",
              "description": "market"
            }
          ]
        },
        "originSize": {
          "type": "string",
          "description": "User-specified order size"
        },
        "price": {
          "type": "string",
          "description": "Price"
        },
        "remainFunds": {
          "type": "string",
          "description": "Remain funds"
        },
        "remainSize": {
          "type": "string",
          "description": "Remain size"
        },
        "side": {
          "type": "string",
          "enum": ["buy", "sell"],
          "description": "buy or sell",
          "x-api-enum": [
            {
              "value": "buy",
              "name": "buy",
              "description": "buy"
            },
            {
              "value": "sell",
              "name": "sell",
              "description": "sell"
            }
          ]
        },
        "size": {
          "type": "string",
          "description": "User-specified order size"
        },
        "status": {
          "type": "string",
          "enum": ["new", "open", "match", "done"],
          "description": "Order Status",
          "x-api-enum": [
            {
              "value": "new",
              "name": "new",
              "description": "the order enters the matching system"
            },
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "when taker order executes with orders in the order book, the taker order status is “match”"
            },
            {
              "value": "done",
              "name": "done",
              "description": "the order is fully executed successfully"
            }
          ]
        },
        "symbol": {
          "type": "string",
          "description": "Symbol",
          "example": ["BTC-USDT", "ETH-USDT", "KCS-USDT"]
        },
        "ts": {
          "type": "integer",
          "description": "Match engine received the message time\n (nanoseconds)",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "enum": ["open", "match", "update", "filled", "canceled", "received"],
          "description": "Order Type",
          "x-api-enum": [
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "The message sent when the order is match, 1. When the status is open and the type is match, it is a maker match.  2. When the status is match and the type is match, it is a taker match."
            },
            {
              "value": "update",
              "name": "update",
              "description": "The message sent due to the order being modified: STP triggering, partial cancellation of the order. Includes these three scenarios:  1. When the status is open and the type is update: partial amounts of the order have been canceled, or STP triggers  2. When the status is match and the type is update: STP triggers  3. When the status is done and the type is update: partial amounts of the order have been filled and the unfilled part got canceled, or STP is triggered."
            },
            {
              "value": "filled",
              "name": "filled",
              "description": "The message sent when the status of the order changes to DONE after the transaction"
            },
            {
              "value": "canceled",
              "name": "canceled",
              "description": "The message sent when the status of the order changes to DONE due to being canceled"
            },
            {
              "value": "received",
              "name": "received",
              "description": "The message sent when the order enters the matching system. When the order has just entered the matching system and has not yet done matching logic with the counterparty, a private message with the message type \"received\" and the order status \"new\" will be pushed."
            }
          ]
        },
        "oldSize": {
          "type": "string",
          "description": "The size before order update"
        },
        "feeType": {
          "type": "string",
          "enum": ["takerFee", "makerFee"],
          "description": "Actual Fee Type",
          "x-api-enum": [
            {
              "value": "takerFee",
              "name": "takerFee",
              "description": "takerFee"
            },
            {
              "value": "makerFee",
              "name": "makerFee",
              "description": "makerFee"
            }
          ]
        },
        "liquidity": {
          "type": "string",
          "enum": ["taker", "maker"],
          "description": "Actual transaction order type, If the counterparty order is an [Hidden/Iceberg Order](https://www.kucoin.com/docs-new/doc-338146), even if it is a maker order, this param will be displayed as taker. For actual trading fee, please refer to the **feeType** ",
          "x-api-enum": [
            {
              "value": "taker",
              "name": "taker",
              "description": "taker"
            },
            {
              "value": "maker",
              "name": "maker",
              "description": "maker"
            }
          ]
        },
        "matchPrice": {
          "type": "string",
          "description": "Match Price (when the type is \"match\")"
        },
        "matchSize": {
          "type": "string",
          "description": "Match Size (when the type is \"match\")"
        },
        "tradeId": {
          "type": "string",
          "description": "Trade ID: Generated by Matching engine."
        }
      },
      "required": [
        "clientOid",
        "orderId",
        "orderTime",
        "orderType",
        "originSize",
        "side",
        "status",
        "symbol",
        "ts",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "userId", "channelType", "data"]
}
```

<h3 id="get-order(v2)-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                        |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_private_orderV2](#schemaspot_spot_private_orderv2) |

<aside class="success">
This operation does not require authentication
</aside>

## Get Order(V1)

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderV1/spotMarket/tradeOrders", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/orderV1/spotMarket/tradeOrders', headers = headers)

print(r.json())

```

`TRACE /orderV1/spotMarket/tradeOrders`

This topic will push all change events of your orders.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": ["private", "public"],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "canceledSize": {
          "type": "string",
          "description": "Cumulative number of cancellations"
        },
        "clientOid": {
          "type": "string",
          "description": "Client Order ID: The ClientOid field is a unique ID created by the user"
        },
        "filledSize": {
          "type": "string",
          "description": "Cumulative number filled"
        },
        "orderId": {
          "type": "string",
          "description": "The unique order id generated by the trading system"
        },
        "orderTime": {
          "type": "integer",
          "description": "Gateway received the message time (milliseconds)",
          "format": "int64"
        },
        "orderType": {
          "type": "string",
          "enum": ["limit", "market"],
          "description": "User-specified order type",
          "x-api-enum": [
            {
              "value": "limit",
              "name": "limit",
              "description": "limit"
            },
            {
              "value": "market",
              "name": "market",
              "description": "market"
            }
          ]
        },
        "originSize": {
          "type": "string",
          "description": "User-specified order size"
        },
        "price": {
          "type": "string",
          "description": "Specify price for currency"
        },
        "remainFunds": {
          "type": "string",
          "description": "Remain funds"
        },
        "remainSize": {
          "type": "string",
          "description": "Remain size"
        },
        "side": {
          "type": "string",
          "enum": ["buy", "sell"],
          "description": "buy or sell",
          "x-api-enum": [
            {
              "value": "buy",
              "name": "buy",
              "description": "buy"
            },
            {
              "value": "sell",
              "name": "sell",
              "description": "sell"
            }
          ]
        },
        "size": {
          "type": "string",
          "description": "User-specified order size"
        },
        "status": {
          "type": "string",
          "enum": ["new", "open", "match", "done"],
          "description": "Order Status",
          "x-api-enum": [
            {
              "value": "new",
              "name": "new",
              "description": "the order enters the matching system"
            },
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "when taker order executes with orders in the order book, the taker order status is “match”"
            },
            {
              "value": "done",
              "name": "done",
              "description": "the order is fully executed successfully"
            }
          ]
        },
        "symbol": {
          "type": "string",
          "description": "Symbol",
          "example": ["BTC-USDT", "ETH-USDT", "KCS-USDT"]
        },
        "ts": {
          "type": "integer",
          "description": "Match engine received the message time\n (nanoseconds)",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "enum": ["open", "match", "update", "filled", "canceled"],
          "description": "Order Type",
          "x-api-enum": [
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "The message sent when the order is match, 1. When the status is open and the type is match, it is a maker match.  2. When the status is match and the type is match, it is a taker match."
            },
            {
              "value": "update",
              "name": "update",
              "description": "The message sent due to the order being modified: STP triggering, partial cancellation of the order. Includes these three scenarios:  1. When the status is open and the type is update: partial amounts of the order have been canceled, or STP triggers  2. When the status is match and the type is update: STP triggers  3. When the status is done and the type is update: partial amounts of the order have been filled and the unfilled part got canceled, or STP is triggered."
            },
            {
              "value": "filled",
              "name": "filled",
              "description": "The message sent when the status of the order changes to DONE after the transaction"
            },
            {
              "value": "canceled",
              "name": "canceled",
              "description": "The message sent when the status of the order changes to DONE due to being canceled"
            }
          ]
        },
        "oldSize": {
          "type": "string",
          "description": "The size before order update"
        },
        "feeType": {
          "type": "string",
          "enum": ["takerFee", "makerFee"],
          "description": "Actual Fee Type",
          "x-api-enum": [
            {
              "value": "takerFee",
              "name": "takerFee",
              "description": "takerFee"
            },
            {
              "value": "makerFee",
              "name": "makerFee",
              "description": "makerFee"
            }
          ]
        },
        "liquidity": {
          "type": "string",
          "enum": ["taker", "maker"],
          "description": "Actual transaction order type, If the counterparty order is an [Hidden/Iceberg Order](https://www.kucoin.com/docs-new/doc-338146), even if it is a maker order, this param will be displayed as taker. For actual trading fee, please refer to the **feeType** ",
          "x-api-enum": [
            {
              "value": "taker",
              "name": "taker",
              "description": "taker"
            },
            {
              "value": "maker",
              "name": "maker",
              "description": "maker"
            }
          ]
        },
        "matchPrice": {
          "type": "string",
          "description": "Match Price (when the type is \"match\")"
        },
        "matchSize": {
          "type": "string",
          "description": "Match Size (when the type is \"match\")"
        },
        "tradeId": {
          "type": "string",
          "description": "Trade ID: Generated by Matching engine."
        }
      },
      "required": [
        "clientOid",
        "orderId",
        "orderTime",
        "orderType",
        "originSize",
        "side",
        "status",
        "symbol",
        "ts",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "userId", "channelType", "data"]
}
```

<h3 id="get-order(v1)-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                        |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_private_orderV1](#schemaspot_spot_private_orderv1) |

<aside class="success">
This operation does not require authentication
</aside>

## Get Account Balance

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/account/account/balance", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/account/account/balance', headers = headers)

print(r.json())

```

`TRACE /account/account/balance`

You will receive this message when an account balance changes. The message
contains the details of the change.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "description": "Channel type",
      "enum": ["private", "public"],
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "accountId": {
          "type": "string",
          "description": "Account ID"
        },
        "available": {
          "type": "string",
          "description": "Funds available to withdraw or trade"
        },
        "availableChange": {
          "type": "string",
          "description": "The change of available Funds"
        },
        "currency": {
          "type": "string",
          "description": "currency",
          "example": ["BTC", "ETH", "KCS"]
        },
        "hold": {
          "type": "string",
          "description": "Funds on hold (not available for use)"
        },
        "holdChange": {
          "type": "string",
          "description": "The change of hold funds"
        },
        "relationContext": {
          "type": "object",
          "properties": {
            "symbol": {
              "type": "string"
            },
            "orderId": {
              "type": "string"
            }
          },
          "required": ["symbol", "orderId"],
          "description": "Relation context"
        },
        "relationEvent": {
          "type": "string",
          "description": "Relation event"
        },
        "relationEventId": {
          "type": "string",
          "description": "Relation event Id"
        },
        "time": {
          "type": "string"
        },
        "total": {
          "type": "string",
          "description": "Total balance = available + hold"
        }
      },
      "required": [
        "accountId",
        "available",
        "availableChange",
        "currency",
        "hold",
        "holdChange",
        "relationContext",
        "relationEvent",
        "relationEventId",
        "time",
        "total"
      ]
    }
  },
  "required": [
    "topic",
    "type",
    "subject",
    "id",
    "userId",
    "channelType",
    "data"
  ]
}
```

<h3 id="get-account-balance-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                        |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_private_account](#schemaspot_spot_private_account) |

<aside class="success">
This operation does not require authentication
</aside>

## Get Stop Order

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/stopOrder/spotMarket/advancedOrders", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/stopOrder/spotMarket/advancedOrders', headers = headers)

print(r.json())

```

`TRACE /stopOrder/spotMarket/advancedOrders`

This topic will push all change events of your stop orders.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": ["private", "public"],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "createdAt": {
          "type": "integer",
          "description": "Order created time (milliseconds)",
          "format": "int64"
        },
        "orderId": {
          "type": "string",
          "description": "The unique order id generated by the trading system"
        },
        "orderPrice": {
          "type": "string",
          "description": "Price"
        },
        "orderType": {
          "type": "string",
          "description": "User-specified order type",
          "enum": ["stop"],
          "x-api-enum": [
            {
              "value": "stop",
              "name": "stop",
              "description": "stop"
            }
          ]
        },
        "side": {
          "type": "string",
          "description": "buy or sell",
          "enum": ["buy", "sell"],
          "x-api-enum": [
            {
              "value": "buy",
              "name": "buy",
              "description": "buy"
            },
            {
              "value": "sell",
              "name": "sell",
              "description": "sell"
            }
          ]
        },
        "size": {
          "type": "string",
          "description": "User-specified order size"
        },
        "stop": {
          "type": "string",
          "description": "Order type",
          "enum": ["loss", "entry", "l_l_o", "l_s_o", "e_l_o", "e_s_o", "tso"],
          "x-api-enum": [
            {
              "value": "loss",
              "name": "loss",
              "description": "stop loss order"
            },
            {
              "value": "entry",
              "name": "entry",
              "description": "Take profit order"
            },
            {
              "value": "l_l_o",
              "name": "l_l_o",
              "description": "Limit stop loss OCO order"
            },
            {
              "value": "l_s_o",
              "name": "l_s_o",
              "description": "Trigger stop loss OCO order"
            },
            {
              "value": "e_l_o",
              "name": "e_l_o",
              "description": "Limit stop profit OCO order"
            },
            {
              "value": "e_s_o",
              "name": "e_s_o",
              "description": "Trigger stop profit OCO order"
            },
            {
              "value": "tso",
              "name": "tso",
              "description": "Moving stop loss order"
            }
          ]
        },
        "stopPrice": {
          "type": "string",
          "description": "Stop Price"
        },
        "symbol": {
          "type": "string",
          "description": "symbol"
        },
        "tradeType": {
          "type": "string",
          "description": "The type of trading: TRADE (Spot), MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin).",
          "enum": ["TRADE", "MARGIN_TRADE", "MARGIN_ISOLATED_TRADE"],
          "x-api-enum": [
            {
              "value": "TRADE",
              "name": "TRADE",
              "description": "Spot"
            },
            {
              "value": "MARGIN_TRADE",
              "name": "MARGIN_TRADE",
              "description": "Spot margin trade"
            },
            {
              "value": "MARGIN_ISOLATED_TRADE",
              "name": "MARGIN_ISOLATED_TRADE",
              "description": "Spot margin isolated trade"
            }
          ]
        },
        "ts": {
          "type": "integer",
          "description": "Push time (nanoseconds)",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "description": "Order Type",
          "enum": ["open", "match", "update", "filled", "cancel", "received"],
          "x-api-enum": [
            {
              "value": "open",
              "name": "open",
              "description": "The order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "The message sent when the order is matched, 1. When the status is open and the type is match, it is a maker match.  2. When the status is match and the type is match, it is a taker match."
            },
            {
              "value": "update",
              "name": "update",
              "description": "The message sent due to the order being modified: STP triggering, partial cancellation of the order. Includes these three scenarios:  1. When the status is open and the type is update: partial amounts of the order have been canceled, or STP triggers  2. When the status is match and the type is update: STP triggers  3. When the status is done and the type is update: partial amounts of the order have been filled and the unfilled part got canceled, or STP is triggered."
            },
            {
              "value": "filled",
              "name": "filled",
              "description": "The message sent when the status of the order changes to DONE after the transaction"
            },
            {
              "value": "cancel",
              "name": "cancel",
              "description": "The message sent when the status of the order changes to DONE due to being canceled"
            },
            {
              "value": "received",
              "name": "received",
              "description": "The message sent when the order enters the matching system. When the order has just entered the matching system and has not yet done matching logic with the counterparty, a private message with the message type \"received\" and the order status \"new\" will be pushed."
            }
          ]
        }
      },
      "required": [
        "createdAt",
        "orderId",
        "orderPrice",
        "orderType",
        "side",
        "size",
        "stop",
        "stopPrice",
        "symbol",
        "tradeType",
        "ts",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "userId", "channelType", "data"]
}
```

<h3 id="get-stop-order-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                            |
| ------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Spot_spot_private_stopOrder](#schemaspot_spot_private_stoporder) |

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Spot_spot_public_ticker">Spot_spot_public_ticker</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_ticker"></a>
<a id="schema_Spot_spot_public_ticker"></a>
<a id="tocSspot_spot_public_ticker"></a>
<a id="tocsspot_spot_public_ticker"></a>

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "description": "Sequence number",
          "type": "string"
        },
        "price": {
          "description": "Last traded price",
          "type": "string"
        },
        "size": {
          "description": "Last traded amount",
          "type": "string"
        },
        "bestAsk": {
          "description": "Best ask price",
          "type": "string"
        },
        "bestAskSize": {
          "description": "Best ask size",
          "type": "string"
        },
        "bestBid": {
          "description": "Best bid price",
          "type": "string"
        },
        "bestBidSize": {
          "description": "Best bid size",
          "type": "string"
        },
        "time": {
          "type": "integer",
          "description": "The matching time of the latest transaction",
          "format": "int64"
        }
      },
      "required": [
        "sequence",
        "price",
        "size",
        "bestAsk",
        "bestAskSize",
        "bestBid",
        "bestBidSize",
        "time"
      ]
    }
  },
  "required": ["type", "topic", "subject", "data"],
  "x-apidog-refs": {}
}
```

### Properties

| Name          | Type           | Required | Restrictions | Description                                 |
| ------------- | -------------- | -------- | ------------ | ------------------------------------------- |
| type          | string         | true     | none         | none                                        |
| topic         | string         | true     | none         | none                                        |
| subject       | string         | true     | none         | none                                        |
| data          | object         | true     | none         | none                                        |
| » sequence    | string         | true     | none         | Sequence number                             |
| » price       | string         | true     | none         | Last traded price                           |
| » size        | string         | true     | none         | Last traded amount                          |
| » bestAsk     | string         | true     | none         | Best ask price                              |
| » bestAskSize | string         | true     | none         | Best ask size                               |
| » bestBid     | string         | true     | none         | Best bid price                              |
| » bestBidSize | string         | true     | none         | Best bid size                               |
| » time        | integer(int64) | true     | none         | The matching time of the latest transaction |

<h2 id="tocS_Spot_spot_public_allTickers">Spot_spot_public_allTickers</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_alltickers"></a>
<a id="schema_Spot_spot_public_allTickers"></a>
<a id="tocSspot_spot_public_alltickers"></a>
<a id="tocsspot_spot_public_alltickers"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "bestAsk": {
          "type": "string"
        },
        "bestAskSize": {
          "type": "string"
        },
        "bestBid": {
          "type": "string"
        },
        "bestBidSize": {
          "type": "string"
        },
        "price": {
          "type": "string"
        },
        "sequence": {
          "type": "string"
        },
        "size": {
          "type": "string"
        },
        "time": {
          "type": "integer",
          "description": "The matching time of the latest transaction",
          "format": "int64"
        }
      },
      "required": [
        "bestAsk",
        "bestAskSize",
        "bestBid",
        "bestBidSize",
        "price",
        "sequence",
        "size",
        "time"
      ]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name          | Type           | Required | Restrictions | Description                                 |
| ------------- | -------------- | -------- | ------------ | ------------------------------------------- |
| topic         | string         | true     | none         | none                                        |
| type          | string         | true     | none         | none                                        |
| subject       | string         | true     | none         | none                                        |
| data          | object         | true     | none         | none                                        |
| » bestAsk     | string         | true     | none         | none                                        |
| » bestAskSize | string         | true     | none         | none                                        |
| » bestBid     | string         | true     | none         | none                                        |
| » bestBidSize | string         | true     | none         | none                                        |
| » price       | string         | true     | none         | none                                        |
| » sequence    | string         | true     | none         | none                                        |
| » size        | string         | true     | none         | none                                        |
| » time        | integer(int64) | true     | none         | The matching time of the latest transaction |

<h2 id="tocS_Spot_spot_public_orderbookLevel1">Spot_spot_public_orderbookLevel1</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_orderbooklevel1"></a>
<a id="schema_Spot_spot_public_orderbookLevel1"></a>
<a id="tocSspot_spot_public_orderbooklevel1"></a>
<a id="tocsspot_spot_public_orderbooklevel1"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| topic       | string         | true     | none         | none        |
| type        | string         | true     | none         | none        |
| subject     | string         | true     | none         | none        |
| data        | object         | true     | none         | none        |
| » asks      | [string]       | true     | none         | price, size |
| » bids      | [string]       | true     | none         | none        |
| » timestamp | integer(int64) | true     | none         | none        |

<h2 id="tocS_Spot_spot_public_orderbookLevel5">Spot_spot_public_orderbookLevel5</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_orderbooklevel5"></a>
<a id="schema_Spot_spot_public_orderbookLevel5"></a>
<a id="tocSspot_spot_public_orderbooklevel5"></a>
<a id="tocsspot_spot_public_orderbooklevel5"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| topic       | string         | true     | none         | none        |
| type        | string         | true     | none         | none        |
| subject     | string         | true     | none         | none        |
| data        | object         | true     | none         | none        |
| » asks      | [array]        | true     | none         | price, size |
| » bids      | [array]        | true     | none         | none        |
| » timestamp | integer(int64) | true     | none         | none        |

<h2 id="tocS_Spot_spot_public_orderbookLevel50">Spot_spot_public_orderbookLevel50</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_orderbooklevel50"></a>
<a id="schema_Spot_spot_public_orderbookLevel50"></a>
<a id="tocSspot_spot_public_orderbooklevel50"></a>
<a id="tocsspot_spot_public_orderbooklevel50"></a>

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| type        | string         | true     | none         | none        |
| topic       | string         | true     | none         | none        |
| subject     | string         | true     | none         | none        |
| data        | object         | true     | none         | none        |
| » asks      | [array]        | true     | none         | price, size |
| » bids      | [array]        | true     | none         | none        |
| » timestamp | integer(int64) | true     | none         | none        |

<h2 id="tocS_Spot_spot_public_callAuctionOrderbookLevel50">Spot_spot_public_callAuctionOrderbookLevel50</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_callauctionorderbooklevel50"></a>
<a id="schema_Spot_spot_public_callAuctionOrderbookLevel50"></a>
<a id="tocSspot_spot_public_callauctionorderbooklevel50"></a>
<a id="tocsspot_spot_public_callauctionorderbooklevel50"></a>

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "description": "price, size"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["asks", "bids", "timestamp"]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| type        | string         | true     | none         | none        |
| topic       | string         | true     | none         | none        |
| subject     | string         | true     | none         | none        |
| data        | object         | true     | none         | none        |
| » asks      | [array]        | true     | none         | price, size |
| » bids      | [array]        | true     | none         | none        |
| » timestamp | integer(int64) | true     | none         | none        |

<h2 id="tocS_Spot_spot_public_callAuctionInfo">Spot_spot_public_callAuctionInfo</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_callauctioninfo"></a>
<a id="schema_Spot_spot_public_callAuctionInfo"></a>
<a id="tocSspot_spot_public_callauctioninfo"></a>
<a id="tocsspot_spot_public_callauctioninfo"></a>

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "Symbol"
        },
        "estimatedPrice": {
          "type": "string",
          "description": "Estimated price"
        },
        "estimatedSize": {
          "type": "string",
          "description": "Estimated size"
        },
        "sellOrderRangeLowPrice": {
          "type": "string",
          "description": "Sell ​​order minimum price"
        },
        "sellOrderRangeHighPrice": {
          "type": "string",
          "description": "Sell ​​order maximum price"
        },
        "buyOrderRangeLowPrice": {
          "type": "string",
          "description": "Buy ​​order minimum price"
        },
        "buyOrderRangeHighPrice": {
          "type": "string",
          "description": "Buy ​​order maximum price"
        },
        "time": {
          "type": "integer",
          "description": "Timestamp (ms)",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "estimatedPrice",
        "estimatedSize",
        "sellOrderRangeLowPrice",
        "sellOrderRangeHighPrice",
        "buyOrderRangeLowPrice",
        "buyOrderRangeHighPrice",
        "time"
      ]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

### Properties

| Name                      | Type           | Required | Restrictions | Description                |
| ------------------------- | -------------- | -------- | ------------ | -------------------------- |
| type                      | string         | true     | none         | none                       |
| topic                     | string         | true     | none         | none                       |
| subject                   | string         | true     | none         | none                       |
| data                      | object         | true     | none         | none                       |
| » symbol                  | string         | true     | none         | Symbol                     |
| » estimatedPrice          | string         | true     | none         | Estimated price            |
| » estimatedSize           | string         | true     | none         | Estimated size             |
| » sellOrderRangeLowPrice  | string         | true     | none         | Sell ​​order minimum price |
| » sellOrderRangeHighPrice | string         | true     | none         | Sell ​​order maximum price |
| » buyOrderRangeLowPrice   | string         | true     | none         | Buy ​​order minimum price  |
| » buyOrderRangeHighPrice  | string         | true     | none         | Buy ​​order maximum price  |
| » time                    | integer(int64) | true     | none         | Timestamp (ms)             |

<h2 id="tocS_Spot_spot_public_orderbookIncrement">Spot_spot_public_orderbookIncrement</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_orderbookincrement"></a>
<a id="schema_Spot_spot_public_orderbookIncrement"></a>
<a id="tocSspot_spot_public_orderbookincrement"></a>
<a id="tocsspot_spot_public_orderbookincrement"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "changes": {
          "type": "object",
          "properties": {
            "asks": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "description": "price,size,sequence"
            },
            "bids": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "required": ["asks", "bids"]
        },
        "sequenceEnd": {
          "type": "integer",
          "format": "int64"
        },
        "sequenceStart": {
          "type": "integer",
          "format": "int64"
        },
        "symbol": {
          "type": "string"
        },
        "time": {
          "type": "integer",
          "description": "milliseconds",
          "format": "int64"
        }
      },
      "required": ["changes", "sequenceEnd", "sequenceStart", "symbol", "time"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name            | Type           | Required | Restrictions | Description         |
| --------------- | -------------- | -------- | ------------ | ------------------- |
| topic           | string         | true     | none         | none                |
| type            | string         | true     | none         | none                |
| subject         | string         | true     | none         | none                |
| data            | object         | true     | none         | none                |
| » changes       | object         | true     | none         | none                |
| »» asks         | [array]        | true     | none         | price,size,sequence |
| »» bids         | [array]        | true     | none         | none                |
| » sequenceEnd   | integer(int64) | true     | none         | none                |
| » sequenceStart | integer(int64) | true     | none         | none                |
| » symbol        | string         | true     | none         | none                |
| » time          | integer(int64) | true     | none         | milliseconds        |

<h2 id="tocS_Spot_spot_public_klines">Spot_spot_public_klines</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_klines"></a>
<a id="schema_Spot_spot_public_klines"></a>
<a id="tocSspot_spot_public_klines"></a>
<a id="tocsspot_spot_public_klines"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "symbol"
        },
        "candles": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Start time of the candle cycle,open price,close price, high price,low price,Transaction volume,Transaction amount"
        },
        "time": {
          "type": "integer",
          "description": "now（us）",
          "format": "int64"
        }
      },
      "required": ["symbol", "candles", "time"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name      | Type           | Required | Restrictions | Description                                                                                                       |
| --------- | -------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| topic     | string         | true     | none         | none                                                                                                              |
| type      | string         | true     | none         | none                                                                                                              |
| subject   | string         | true     | none         | none                                                                                                              |
| data      | object         | true     | none         | none                                                                                                              |
| » symbol  | string         | true     | none         | symbol                                                                                                            |
| » candles | [string]       | true     | none         | Start time of the candle cycle,open price,close price, high price,low price,Transaction volume,Transaction amount |
| » time    | integer(int64) | true     | none         | now（us）                                                                                                         |

<h2 id="tocS_Spot_spot_public_trade">Spot_spot_public_trade</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_trade"></a>
<a id="schema_Spot_spot_public_trade"></a>
<a id="tocSspot_spot_public_trade"></a>
<a id="tocsspot_spot_public_trade"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "makerOrderId": {
          "type": "string"
        },
        "price": {
          "type": "string"
        },
        "sequence": {
          "type": "string"
        },
        "side": {
          "type": "string"
        },
        "size": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "takerOrderId": {
          "type": "string"
        },
        "time": {
          "type": "string"
        },
        "tradeId": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "makerOrderId",
        "price",
        "sequence",
        "side",
        "size",
        "symbol",
        "takerOrderId",
        "time",
        "tradeId",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name           | Type   | Required | Restrictions | Description |
| -------------- | ------ | -------- | ------------ | ----------- |
| topic          | string | true     | none         | none        |
| type           | string | true     | none         | none        |
| subject        | string | true     | none         | none        |
| data           | object | true     | none         | none        |
| » makerOrderId | string | true     | none         | none        |
| » price        | string | true     | none         | none        |
| » sequence     | string | true     | none         | none        |
| » side         | string | true     | none         | none        |
| » size         | string | true     | none         | none        |
| » symbol       | string | true     | none         | none        |
| » takerOrderId | string | true     | none         | none        |
| » time         | string | true     | none         | none        |
| » tradeId      | string | true     | none         | none        |
| » type         | string | true     | none         | none        |

<h2 id="tocS_Spot_spot_public_symbolSnapshot">Spot_spot_public_symbolSnapshot</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_symbolsnapshot"></a>
<a id="schema_Spot_spot_public_symbolSnapshot"></a>
<a id="tocSspot_spot_public_symbolsnapshot"></a>
<a id="tocsspot_spot_public_symbolsnapshot"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {
            "askSize": {
              "type": "number"
            },
            "averagePrice": {
              "type": "number"
            },
            "baseCurrency": {
              "type": "string"
            },
            "bidSize": {
              "type": "number"
            },
            "board": {
              "type": "integer",
              "description": "Trading pair partition: 0. Primary partition 1.KuCoin Plus\", example = \"1\"",
              "enum": [0, 1],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "primary partition"
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "KuCoin Plus"
                }
              ]
            },
            "buy": {
              "type": "number"
            },
            "changePrice": {
              "type": "number"
            },
            "changeRate": {
              "type": "number"
            },
            "close": {
              "type": "number"
            },
            "datetime": {
              "type": "integer",
              "format": "int64"
            },
            "high": {
              "type": "number"
            },
            "lastTradedPrice": {
              "type": "number"
            },
            "low": {
              "type": "number"
            },
            "makerCoefficient": {
              "type": "number"
            },
            "makerFeeRate": {
              "type": "number"
            },
            "marginTrade": {
              "type": "boolean"
            },
            "mark": {
              "type": "integer",
              "description": "Trading Pair Mark: 0. Default 1.ST. 2.NEW\", example = \"1\"",
              "enum": [0, 1, 2],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "default"
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "ST"
                },
                {
                  "value": 2,
                  "name": "",
                  "description": "NEW"
                }
              ]
            },
            "market": {
              "type": "string"
            },
            "marketChange1h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange24h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange4h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "markets": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "open": {
              "type": "number"
            },
            "quoteCurrency": {
              "type": "string"
            },
            "sell": {
              "type": "number"
            },
            "siteTypes": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "sort": {
              "type": "integer",
              "description": "sorting number(Pointless)"
            },
            "symbol": {
              "type": "string"
            },
            "symbolCode": {
              "type": "string"
            },
            "takerCoefficient": {
              "type": "number"
            },
            "takerFeeRate": {
              "type": "number"
            },
            "trading": {
              "type": "boolean"
            },
            "vol": {
              "type": "number"
            },
            "volValue": {
              "type": "number",
              "description": "24-hour rolling transaction volume, refreshed every 2s"
            }
          },
          "required": [
            "askSize",
            "averagePrice",
            "baseCurrency",
            "bidSize",
            "board",
            "buy",
            "changePrice",
            "changeRate",
            "close",
            "datetime",
            "high",
            "lastTradedPrice",
            "low",
            "makerCoefficient",
            "makerFeeRate",
            "marginTrade",
            "mark",
            "market",
            "marketChange1h",
            "marketChange24h",
            "marketChange4h",
            "markets",
            "open",
            "quoteCurrency",
            "sell",
            "siteTypes",
            "sort",
            "symbol",
            "symbolCode",
            "takerCoefficient",
            "takerFeeRate",
            "trading",
            "vol",
            "volValue"
          ]
        }
      },
      "required": ["sequence", "data"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name                | Type           | Required | Restrictions | Description                                                                |
| ------------------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------- |
| topic               | string         | true     | none         | none                                                                       |
| type                | string         | true     | none         | none                                                                       |
| subject             | string         | true     | none         | none                                                                       |
| data                | object         | true     | none         | none                                                                       |
| » sequence          | string         | true     | none         | none                                                                       |
| » data              | object         | true     | none         | none                                                                       |
| »» askSize          | number         | true     | none         | none                                                                       |
| »» averagePrice     | number         | true     | none         | none                                                                       |
| »» baseCurrency     | string         | true     | none         | none                                                                       |
| »» bidSize          | number         | true     | none         | none                                                                       |
| »» board            | integer        | true     | none         | Trading pair partition: 0. Primary partition 1.KuCoin Plus", example = "1" |
| »» buy              | number         | true     | none         | none                                                                       |
| »» changePrice      | number         | true     | none         | none                                                                       |
| »» changeRate       | number         | true     | none         | none                                                                       |
| »» close            | number         | true     | none         | none                                                                       |
| »» datetime         | integer(int64) | true     | none         | none                                                                       |
| »» high             | number         | true     | none         | none                                                                       |
| »» lastTradedPrice  | number         | true     | none         | none                                                                       |
| »» low              | number         | true     | none         | none                                                                       |
| »» makerCoefficient | number         | true     | none         | none                                                                       |
| »» makerFeeRate     | number         | true     | none         | none                                                                       |
| »» marginTrade      | boolean        | true     | none         | none                                                                       |
| »» mark             | integer        | true     | none         | Trading Pair Mark: 0. Default 1.ST. 2.NEW", example = "1"                  |
| »» market           | string         | true     | none         | none                                                                       |
| »» marketChange1h   | object         | true     | none         | none                                                                       |
| »»» changePrice     | number         | true     | none         | none                                                                       |
| »»» changeRate      | number         | true     | none         | none                                                                       |
| »»» high            | number         | true     | none         | none                                                                       |
| »»» low             | number         | true     | none         | none                                                                       |
| »»» open            | number         | true     | none         | none                                                                       |
| »»» vol             | number         | true     | none         | none                                                                       |
| »»» volValue        | number         | true     | none         | none                                                                       |
| »» marketChange24h  | object         | true     | none         | none                                                                       |
| »»» changePrice     | number         | true     | none         | none                                                                       |
| »»» changeRate      | number         | true     | none         | none                                                                       |
| »»» high            | number         | true     | none         | none                                                                       |
| »»» low             | number         | true     | none         | none                                                                       |
| »»» open            | number         | true     | none         | none                                                                       |
| »»» vol             | number         | true     | none         | none                                                                       |
| »»» volValue        | number         | true     | none         | none                                                                       |
| »» marketChange4h   | object         | true     | none         | none                                                                       |
| »»» changePrice     | number         | true     | none         | none                                                                       |
| »»» changeRate      | number         | true     | none         | none                                                                       |
| »»» high            | number         | true     | none         | none                                                                       |
| »»» low             | number         | true     | none         | none                                                                       |
| »»» open            | number         | true     | none         | none                                                                       |
| »»» vol             | number         | true     | none         | none                                                                       |
| »»» volValue        | number         | true     | none         | none                                                                       |
| »» markets          | [string]       | true     | none         | none                                                                       |
| »» open             | number         | true     | none         | none                                                                       |
| »» quoteCurrency    | string         | true     | none         | none                                                                       |
| »» sell             | number         | true     | none         | none                                                                       |
| »» siteTypes        | [string]       | true     | none         | none                                                                       |
| »» sort             | integer        | true     | none         | sorting number(Pointless)                                                  |
| »» symbol           | string         | true     | none         | none                                                                       |
| »» symbolCode       | string         | true     | none         | none                                                                       |
| »» takerCoefficient | number         | true     | none         | none                                                                       |
| »» takerFeeRate     | number         | true     | none         | none                                                                       |
| »» trading          | boolean        | true     | none         | none                                                                       |
| »» vol              | number         | true     | none         | none                                                                       |
| »» volValue         | number         | true     | none         | 24-hour rolling transaction volume, refreshed every 2s                     |

#### Enumerated Values

| Property | Value |
| -------- | ----- |
| board    | 0     |
| board    | 1     |
| mark     | 0     |
| mark     | 1     |
| mark     | 2     |

<h2 id="tocS_Spot_spot_public_marketSnapshot">Spot_spot_public_marketSnapshot</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_public_marketsnapshot"></a>
<a id="schema_Spot_spot_public_marketSnapshot"></a>
<a id="tocSspot_spot_public_marketsnapshot"></a>
<a id="tocsspot_spot_public_marketsnapshot"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {
            "askSize": {
              "type": "number"
            },
            "averagePrice": {
              "type": "number"
            },
            "baseCurrency": {
              "type": "string"
            },
            "bidSize": {
              "type": "number"
            },
            "board": {
              "type": "integer",
              "description": "Trading pair partition: 0. Primary partition 1.KuCoin Plus\", example = \"1\"",
              "enum": [0, 1],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "primary partition"
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "KuCoin Plus"
                }
              ],
              "example": [1]
            },
            "buy": {
              "type": "number"
            },
            "changePrice": {
              "type": "number"
            },
            "changeRate": {
              "type": "number"
            },
            "close": {
              "type": "number"
            },
            "datetime": {
              "type": "integer",
              "format": "int64"
            },
            "high": {
              "type": "number"
            },
            "lastTradedPrice": {
              "type": "number"
            },
            "low": {
              "type": "number"
            },
            "makerCoefficient": {
              "type": "number"
            },
            "makerFeeRate": {
              "type": "number"
            },
            "marginTrade": {
              "type": "boolean"
            },
            "mark": {
              "type": "integer",
              "description": "Trading Pair Mark: 0. Default 1.ST. 2.NEW\", example = \"1\"",
              "enum": [0, 1, 2],
              "x-api-enum": [
                {
                  "value": 0,
                  "name": "",
                  "description": "default "
                },
                {
                  "value": 1,
                  "name": "",
                  "description": "ST"
                },
                {
                  "value": 2,
                  "name": "",
                  "description": "NEW"
                }
              ],
              "example": [1]
            },
            "market": {
              "type": "string"
            },
            "marketChange1h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange24h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "marketChange4h": {
              "type": "object",
              "properties": {
                "changePrice": {
                  "type": "number"
                },
                "changeRate": {
                  "type": "number"
                },
                "high": {
                  "type": "number"
                },
                "low": {
                  "type": "number"
                },
                "open": {
                  "type": "number"
                },
                "vol": {
                  "type": "number"
                },
                "volValue": {
                  "type": "number"
                }
              },
              "required": [
                "changePrice",
                "changeRate",
                "high",
                "low",
                "open",
                "vol",
                "volValue"
              ]
            },
            "markets": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "open": {
              "type": "number"
            },
            "quoteCurrency": {
              "type": "string"
            },
            "sell": {
              "type": "number"
            },
            "siteTypes": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "sort": {
              "type": "integer",
              "description": "sorting number"
            },
            "symbol": {
              "type": "string"
            },
            "symbolCode": {
              "type": "string"
            },
            "takerCoefficient": {
              "type": "number"
            },
            "takerFeeRate": {
              "type": "number"
            },
            "trading": {
              "type": "boolean"
            },
            "vol": {
              "type": "number"
            },
            "volValue": {
              "type": "number"
            }
          },
          "required": [
            "askSize",
            "averagePrice",
            "baseCurrency",
            "bidSize",
            "board",
            "buy",
            "changePrice",
            "changeRate",
            "close",
            "datetime",
            "high",
            "lastTradedPrice",
            "low",
            "makerCoefficient",
            "makerFeeRate",
            "marginTrade",
            "mark",
            "market",
            "marketChange1h",
            "marketChange24h",
            "marketChange4h",
            "markets",
            "open",
            "quoteCurrency",
            "sell",
            "siteTypes",
            "sort",
            "symbol",
            "symbolCode",
            "takerCoefficient",
            "takerFeeRate",
            "trading",
            "vol",
            "volValue"
          ]
        }
      },
      "required": ["sequence", "data"]
    }
  },
  "required": ["topic", "type", "subject", "data"]
}
```

### Properties

| Name                | Type           | Required | Restrictions | Description                                                                |
| ------------------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------- |
| topic               | string         | true     | none         | none                                                                       |
| type                | string         | true     | none         | none                                                                       |
| subject             | string         | true     | none         | none                                                                       |
| data                | object         | true     | none         | none                                                                       |
| » sequence          | string         | true     | none         | none                                                                       |
| » data              | object         | true     | none         | none                                                                       |
| »» askSize          | number         | true     | none         | none                                                                       |
| »» averagePrice     | number         | true     | none         | none                                                                       |
| »» baseCurrency     | string         | true     | none         | none                                                                       |
| »» bidSize          | number         | true     | none         | none                                                                       |
| »» board            | integer        | true     | none         | Trading pair partition: 0. Primary partition 1.KuCoin Plus", example = "1" |
| »» buy              | number         | true     | none         | none                                                                       |
| »» changePrice      | number         | true     | none         | none                                                                       |
| »» changeRate       | number         | true     | none         | none                                                                       |
| »» close            | number         | true     | none         | none                                                                       |
| »» datetime         | integer(int64) | true     | none         | none                                                                       |
| »» high             | number         | true     | none         | none                                                                       |
| »» lastTradedPrice  | number         | true     | none         | none                                                                       |
| »» low              | number         | true     | none         | none                                                                       |
| »» makerCoefficient | number         | true     | none         | none                                                                       |
| »» makerFeeRate     | number         | true     | none         | none                                                                       |
| »» marginTrade      | boolean        | true     | none         | none                                                                       |
| »» mark             | integer        | true     | none         | Trading Pair Mark: 0. Default 1.ST. 2.NEW", example = "1"                  |
| »» market           | string         | true     | none         | none                                                                       |
| »» marketChange1h   | object         | true     | none         | none                                                                       |
| »»» changePrice     | number         | true     | none         | none                                                                       |
| »»» changeRate      | number         | true     | none         | none                                                                       |
| »»» high            | number         | true     | none         | none                                                                       |
| »»» low             | number         | true     | none         | none                                                                       |
| »»» open            | number         | true     | none         | none                                                                       |
| »»» vol             | number         | true     | none         | none                                                                       |
| »»» volValue        | number         | true     | none         | none                                                                       |
| »» marketChange24h  | object         | true     | none         | none                                                                       |
| »»» changePrice     | number         | true     | none         | none                                                                       |
| »»» changeRate      | number         | true     | none         | none                                                                       |
| »»» high            | number         | true     | none         | none                                                                       |
| »»» low             | number         | true     | none         | none                                                                       |
| »»» open            | number         | true     | none         | none                                                                       |
| »»» vol             | number         | true     | none         | none                                                                       |
| »»» volValue        | number         | true     | none         | none                                                                       |
| »» marketChange4h   | object         | true     | none         | none                                                                       |
| »»» changePrice     | number         | true     | none         | none                                                                       |
| »»» changeRate      | number         | true     | none         | none                                                                       |
| »»» high            | number         | true     | none         | none                                                                       |
| »»» low             | number         | true     | none         | none                                                                       |
| »»» open            | number         | true     | none         | none                                                                       |
| »»» vol             | number         | true     | none         | none                                                                       |
| »»» volValue        | number         | true     | none         | none                                                                       |
| »» markets          | [string]       | true     | none         | none                                                                       |
| »» open             | number         | true     | none         | none                                                                       |
| »» quoteCurrency    | string         | true     | none         | none                                                                       |
| »» sell             | number         | true     | none         | none                                                                       |
| »» siteTypes        | [string]       | true     | none         | none                                                                       |
| »» sort             | integer        | true     | none         | sorting number                                                             |
| »» symbol           | string         | true     | none         | none                                                                       |
| »» symbolCode       | string         | true     | none         | none                                                                       |
| »» takerCoefficient | number         | true     | none         | none                                                                       |
| »» takerFeeRate     | number         | true     | none         | none                                                                       |
| »» trading          | boolean        | true     | none         | none                                                                       |
| »» vol              | number         | true     | none         | none                                                                       |
| »» volValue         | number         | true     | none         | none                                                                       |

#### Enumerated Values

| Property | Value |
| -------- | ----- |
| board    | 0     |
| board    | 1     |
| mark     | 0     |
| mark     | 1     |
| mark     | 2     |

<h2 id="tocS_Spot_spot_private_orderV2">Spot_spot_private_orderV2</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_private_orderv2"></a>
<a id="schema_Spot_spot_private_orderV2"></a>
<a id="tocSspot_spot_private_orderv2"></a>
<a id="tocsspot_spot_private_orderv2"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": ["private", "public"],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "canceledSize": {
          "type": "string",
          "description": "Cumulative number of cancellations"
        },
        "clientOid": {
          "type": "string",
          "description": "Client Order ID: The ClientOid field is a unique ID created by the user"
        },
        "filledSize": {
          "type": "string",
          "description": "Cumulative number filled"
        },
        "orderId": {
          "type": "string",
          "description": "The unique order id generated by the trading system"
        },
        "orderTime": {
          "type": "integer",
          "description": "Gateway received the message time (milliseconds)",
          "format": "int64"
        },
        "orderType": {
          "type": "string",
          "enum": ["limit", "market"],
          "description": "User-specified order type",
          "x-api-enum": [
            {
              "value": "limit",
              "name": "limit",
              "description": "limit"
            },
            {
              "value": "market",
              "name": "market",
              "description": "market"
            }
          ]
        },
        "originSize": {
          "type": "string",
          "description": "User-specified order size"
        },
        "price": {
          "type": "string",
          "description": "Price"
        },
        "remainFunds": {
          "type": "string",
          "description": "Remain funds"
        },
        "remainSize": {
          "type": "string",
          "description": "Remain size"
        },
        "side": {
          "type": "string",
          "enum": ["buy", "sell"],
          "description": "buy or sell",
          "x-api-enum": [
            {
              "value": "buy",
              "name": "buy",
              "description": "buy"
            },
            {
              "value": "sell",
              "name": "sell",
              "description": "sell"
            }
          ]
        },
        "size": {
          "type": "string",
          "description": "User-specified order size"
        },
        "status": {
          "type": "string",
          "enum": ["new", "open", "match", "done"],
          "description": "Order Status",
          "x-api-enum": [
            {
              "value": "new",
              "name": "new",
              "description": "the order enters the matching system"
            },
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "when taker order executes with orders in the order book, the taker order status is “match”"
            },
            {
              "value": "done",
              "name": "done",
              "description": "the order is fully executed successfully"
            }
          ]
        },
        "symbol": {
          "type": "string",
          "description": "Symbol",
          "example": ["BTC-USDT", "ETH-USDT", "KCS-USDT"]
        },
        "ts": {
          "type": "integer",
          "description": "Match engine received the message time\n (nanoseconds)",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "enum": ["open", "match", "update", "filled", "canceled", "received"],
          "description": "Order Type",
          "x-api-enum": [
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "The message sent when the order is match, 1. When the status is open and the type is match, it is a maker match.  2. When the status is match and the type is match, it is a taker match."
            },
            {
              "value": "update",
              "name": "update",
              "description": "The message sent due to the order being modified: STP triggering, partial cancellation of the order. Includes these three scenarios:  1. When the status is open and the type is update: partial amounts of the order have been canceled, or STP triggers  2. When the status is match and the type is update: STP triggers  3. When the status is done and the type is update: partial amounts of the order have been filled and the unfilled part got canceled, or STP is triggered."
            },
            {
              "value": "filled",
              "name": "filled",
              "description": "The message sent when the status of the order changes to DONE after the transaction"
            },
            {
              "value": "canceled",
              "name": "canceled",
              "description": "The message sent when the status of the order changes to DONE due to being canceled"
            },
            {
              "value": "received",
              "name": "received",
              "description": "The message sent when the order enters the matching system. When the order has just entered the matching system and has not yet done matching logic with the counterparty, a private message with the message type \"received\" and the order status \"new\" will be pushed."
            }
          ]
        },
        "oldSize": {
          "type": "string",
          "description": "The size before order update"
        },
        "feeType": {
          "type": "string",
          "enum": ["takerFee", "makerFee"],
          "description": "Actual Fee Type",
          "x-api-enum": [
            {
              "value": "takerFee",
              "name": "takerFee",
              "description": "takerFee"
            },
            {
              "value": "makerFee",
              "name": "makerFee",
              "description": "makerFee"
            }
          ]
        },
        "liquidity": {
          "type": "string",
          "enum": ["taker", "maker"],
          "description": "Actual transaction order type, If the counterparty order is an [Hidden/Iceberg Order](https://www.kucoin.com/docs-new/doc-338146), even if it is a maker order, this param will be displayed as taker. For actual trading fee, please refer to the **feeType** ",
          "x-api-enum": [
            {
              "value": "taker",
              "name": "taker",
              "description": "taker"
            },
            {
              "value": "maker",
              "name": "maker",
              "description": "maker"
            }
          ]
        },
        "matchPrice": {
          "type": "string",
          "description": "Match Price (when the type is \"match\")"
        },
        "matchSize": {
          "type": "string",
          "description": "Match Size (when the type is \"match\")"
        },
        "tradeId": {
          "type": "string",
          "description": "Trade ID: Generated by Matching engine."
        }
      },
      "required": [
        "clientOid",
        "orderId",
        "orderTime",
        "orderType",
        "originSize",
        "side",
        "status",
        "symbol",
        "ts",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "userId", "channelType", "data"]
}
```

### Properties

| Name           | Type           | Required | Restrictions | Description                                                                                                                                                                                                                                                    |
| -------------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic          | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| type           | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| subject        | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| userId         | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| channelType    | string         | true     | none         | Channel type                                                                                                                                                                                                                                                   |
| data           | object         | true     | none         | none                                                                                                                                                                                                                                                           |
| » canceledSize | string         | false    | none         | Cumulative number of cancellations                                                                                                                                                                                                                             |
| » clientOid    | string         | true     | none         | Client Order ID: The ClientOid field is a unique ID created by the user                                                                                                                                                                                        |
| » filledSize   | string         | false    | none         | Cumulative number filled                                                                                                                                                                                                                                       |
| » orderId      | string         | true     | none         | The unique order id generated by the trading system                                                                                                                                                                                                            |
| » orderTime    | integer(int64) | true     | none         | Gateway received the message time (milliseconds)                                                                                                                                                                                                               |
| » orderType    | string         | true     | none         | User-specified order type                                                                                                                                                                                                                                      |
| » originSize   | string         | true     | none         | User-specified order size                                                                                                                                                                                                                                      |
| » price        | string         | false    | none         | Price                                                                                                                                                                                                                                                          |
| » remainFunds  | string         | false    | none         | Remain funds                                                                                                                                                                                                                                                   |
| » remainSize   | string         | false    | none         | Remain size                                                                                                                                                                                                                                                    |
| » side         | string         | true     | none         | buy or sell                                                                                                                                                                                                                                                    |
| » size         | string         | false    | none         | User-specified order size                                                                                                                                                                                                                                      |
| » status       | string         | true     | none         | Order Status                                                                                                                                                                                                                                                   |
| » symbol       | string         | true     | none         | Symbol                                                                                                                                                                                                                                                         |
| » ts           | integer(int64) | true     | none         | Match engine received the message time<br> (nanoseconds)                                                                                                                                                                                                       |
| » type         | string         | true     | none         | Order Type                                                                                                                                                                                                                                                     |
| » oldSize      | string         | false    | none         | The size before order update                                                                                                                                                                                                                                   |
| » feeType      | string         | false    | none         | Actual Fee Type                                                                                                                                                                                                                                                |
| » liquidity    | string         | false    | none         | Actual transaction order type, If the counterparty order is an [Hidden/Iceberg Order](https://www.kucoin.com/docs-new/doc-338146), even if it is a maker order, this param will be displayed as taker. For actual trading fee, please refer to the **feeType** |
| » matchPrice   | string         | false    | none         | Match Price (when the type is "match")                                                                                                                                                                                                                         |
| » matchSize    | string         | false    | none         | Match Size (when the type is "match")                                                                                                                                                                                                                          |
| » tradeId      | string         | false    | none         | Trade ID: Generated by Matching engine.                                                                                                                                                                                                                        |

#### Enumerated Values

| Property    | Value    |
| ----------- | -------- |
| channelType | private  |
| channelType | public   |
| orderType   | limit    |
| orderType   | market   |
| side        | buy      |
| side        | sell     |
| status      | new      |
| status      | open     |
| status      | match    |
| status      | done     |
| type        | open     |
| type        | match    |
| type        | update   |
| type        | filled   |
| type        | canceled |
| type        | received |
| feeType     | takerFee |
| feeType     | makerFee |
| liquidity   | taker    |
| liquidity   | maker    |

<h2 id="tocS_Spot_spot_private_orderV1">Spot_spot_private_orderV1</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_private_orderv1"></a>
<a id="schema_Spot_spot_private_orderV1"></a>
<a id="tocSspot_spot_private_orderv1"></a>
<a id="tocsspot_spot_private_orderv1"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": ["private", "public"],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "canceledSize": {
          "type": "string",
          "description": "Cumulative number of cancellations"
        },
        "clientOid": {
          "type": "string",
          "description": "Client Order ID: The ClientOid field is a unique ID created by the user"
        },
        "filledSize": {
          "type": "string",
          "description": "Cumulative number filled"
        },
        "orderId": {
          "type": "string",
          "description": "The unique order id generated by the trading system"
        },
        "orderTime": {
          "type": "integer",
          "description": "Gateway received the message time (milliseconds)",
          "format": "int64"
        },
        "orderType": {
          "type": "string",
          "enum": ["limit", "market"],
          "description": "User-specified order type",
          "x-api-enum": [
            {
              "value": "limit",
              "name": "limit",
              "description": "limit"
            },
            {
              "value": "market",
              "name": "market",
              "description": "market"
            }
          ]
        },
        "originSize": {
          "type": "string",
          "description": "User-specified order size"
        },
        "price": {
          "type": "string",
          "description": "Specify price for currency"
        },
        "remainFunds": {
          "type": "string",
          "description": "Remain funds"
        },
        "remainSize": {
          "type": "string",
          "description": "Remain size"
        },
        "side": {
          "type": "string",
          "enum": ["buy", "sell"],
          "description": "buy or sell",
          "x-api-enum": [
            {
              "value": "buy",
              "name": "buy",
              "description": "buy"
            },
            {
              "value": "sell",
              "name": "sell",
              "description": "sell"
            }
          ]
        },
        "size": {
          "type": "string",
          "description": "User-specified order size"
        },
        "status": {
          "type": "string",
          "enum": ["new", "open", "match", "done"],
          "description": "Order Status",
          "x-api-enum": [
            {
              "value": "new",
              "name": "new",
              "description": "the order enters the matching system"
            },
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "when taker order executes with orders in the order book, the taker order status is “match”"
            },
            {
              "value": "done",
              "name": "done",
              "description": "the order is fully executed successfully"
            }
          ]
        },
        "symbol": {
          "type": "string",
          "description": "Symbol",
          "example": ["BTC-USDT", "ETH-USDT", "KCS-USDT"]
        },
        "ts": {
          "type": "integer",
          "description": "Match engine received the message time\n (nanoseconds)",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "enum": ["open", "match", "update", "filled", "canceled"],
          "description": "Order Type",
          "x-api-enum": [
            {
              "value": "open",
              "name": "open",
              "description": "the order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "The message sent when the order is match, 1. When the status is open and the type is match, it is a maker match.  2. When the status is match and the type is match, it is a taker match."
            },
            {
              "value": "update",
              "name": "update",
              "description": "The message sent due to the order being modified: STP triggering, partial cancellation of the order. Includes these three scenarios:  1. When the status is open and the type is update: partial amounts of the order have been canceled, or STP triggers  2. When the status is match and the type is update: STP triggers  3. When the status is done and the type is update: partial amounts of the order have been filled and the unfilled part got canceled, or STP is triggered."
            },
            {
              "value": "filled",
              "name": "filled",
              "description": "The message sent when the status of the order changes to DONE after the transaction"
            },
            {
              "value": "canceled",
              "name": "canceled",
              "description": "The message sent when the status of the order changes to DONE due to being canceled"
            }
          ]
        },
        "oldSize": {
          "type": "string",
          "description": "The size before order update"
        },
        "feeType": {
          "type": "string",
          "enum": ["takerFee", "makerFee"],
          "description": "Actual Fee Type",
          "x-api-enum": [
            {
              "value": "takerFee",
              "name": "takerFee",
              "description": "takerFee"
            },
            {
              "value": "makerFee",
              "name": "makerFee",
              "description": "makerFee"
            }
          ]
        },
        "liquidity": {
          "type": "string",
          "enum": ["taker", "maker"],
          "description": "Actual transaction order type, If the counterparty order is an [Hidden/Iceberg Order](https://www.kucoin.com/docs-new/doc-338146), even if it is a maker order, this param will be displayed as taker. For actual trading fee, please refer to the **feeType** ",
          "x-api-enum": [
            {
              "value": "taker",
              "name": "taker",
              "description": "taker"
            },
            {
              "value": "maker",
              "name": "maker",
              "description": "maker"
            }
          ]
        },
        "matchPrice": {
          "type": "string",
          "description": "Match Price (when the type is \"match\")"
        },
        "matchSize": {
          "type": "string",
          "description": "Match Size (when the type is \"match\")"
        },
        "tradeId": {
          "type": "string",
          "description": "Trade ID: Generated by Matching engine."
        }
      },
      "required": [
        "clientOid",
        "orderId",
        "orderTime",
        "orderType",
        "originSize",
        "side",
        "status",
        "symbol",
        "ts",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "userId", "channelType", "data"]
}
```

### Properties

| Name           | Type           | Required | Restrictions | Description                                                                                                                                                                                                                                                    |
| -------------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic          | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| type           | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| subject        | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| userId         | string         | true     | none         | none                                                                                                                                                                                                                                                           |
| channelType    | string         | true     | none         | Channel type                                                                                                                                                                                                                                                   |
| data           | object         | true     | none         | none                                                                                                                                                                                                                                                           |
| » canceledSize | string         | false    | none         | Cumulative number of cancellations                                                                                                                                                                                                                             |
| » clientOid    | string         | true     | none         | Client Order ID: The ClientOid field is a unique ID created by the user                                                                                                                                                                                        |
| » filledSize   | string         | false    | none         | Cumulative number filled                                                                                                                                                                                                                                       |
| » orderId      | string         | true     | none         | The unique order id generated by the trading system                                                                                                                                                                                                            |
| » orderTime    | integer(int64) | true     | none         | Gateway received the message time (milliseconds)                                                                                                                                                                                                               |
| » orderType    | string         | true     | none         | User-specified order type                                                                                                                                                                                                                                      |
| » originSize   | string         | true     | none         | User-specified order size                                                                                                                                                                                                                                      |
| » price        | string         | false    | none         | Specify price for currency                                                                                                                                                                                                                                     |
| » remainFunds  | string         | false    | none         | Remain funds                                                                                                                                                                                                                                                   |
| » remainSize   | string         | false    | none         | Remain size                                                                                                                                                                                                                                                    |
| » side         | string         | true     | none         | buy or sell                                                                                                                                                                                                                                                    |
| » size         | string         | false    | none         | User-specified order size                                                                                                                                                                                                                                      |
| » status       | string         | true     | none         | Order Status                                                                                                                                                                                                                                                   |
| » symbol       | string         | true     | none         | Symbol                                                                                                                                                                                                                                                         |
| » ts           | integer(int64) | true     | none         | Match engine received the message time<br> (nanoseconds)                                                                                                                                                                                                       |
| » type         | string         | true     | none         | Order Type                                                                                                                                                                                                                                                     |
| » oldSize      | string         | false    | none         | The size before order update                                                                                                                                                                                                                                   |
| » feeType      | string         | false    | none         | Actual Fee Type                                                                                                                                                                                                                                                |
| » liquidity    | string         | false    | none         | Actual transaction order type, If the counterparty order is an [Hidden/Iceberg Order](https://www.kucoin.com/docs-new/doc-338146), even if it is a maker order, this param will be displayed as taker. For actual trading fee, please refer to the **feeType** |
| » matchPrice   | string         | false    | none         | Match Price (when the type is "match")                                                                                                                                                                                                                         |
| » matchSize    | string         | false    | none         | Match Size (when the type is "match")                                                                                                                                                                                                                          |
| » tradeId      | string         | false    | none         | Trade ID: Generated by Matching engine.                                                                                                                                                                                                                        |

#### Enumerated Values

| Property    | Value    |
| ----------- | -------- |
| channelType | private  |
| channelType | public   |
| orderType   | limit    |
| orderType   | market   |
| side        | buy      |
| side        | sell     |
| status      | new      |
| status      | open     |
| status      | match    |
| status      | done     |
| type        | open     |
| type        | match    |
| type        | update   |
| type        | filled   |
| type        | canceled |
| feeType     | takerFee |
| feeType     | makerFee |
| liquidity   | taker    |
| liquidity   | maker    |

<h2 id="tocS_Spot_spot_private_account">Spot_spot_private_account</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_private_account"></a>
<a id="schema_Spot_spot_private_account"></a>
<a id="tocSspot_spot_private_account"></a>
<a id="tocsspot_spot_private_account"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "description": "Channel type",
      "enum": ["private", "public"],
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "accountId": {
          "type": "string",
          "description": "Account ID"
        },
        "available": {
          "type": "string",
          "description": "Funds available to withdraw or trade"
        },
        "availableChange": {
          "type": "string",
          "description": "The change of available Funds"
        },
        "currency": {
          "type": "string",
          "description": "currency",
          "example": ["BTC", "ETH", "KCS"]
        },
        "hold": {
          "type": "string",
          "description": "Funds on hold (not available for use)"
        },
        "holdChange": {
          "type": "string",
          "description": "The change of hold funds"
        },
        "relationContext": {
          "type": "object",
          "properties": {
            "symbol": {
              "type": "string"
            },
            "orderId": {
              "type": "string"
            }
          },
          "required": ["symbol", "orderId"],
          "description": "Relation context"
        },
        "relationEvent": {
          "type": "string",
          "description": "Relation event"
        },
        "relationEventId": {
          "type": "string",
          "description": "Relation event Id"
        },
        "time": {
          "type": "string"
        },
        "total": {
          "type": "string",
          "description": "Total balance = available + hold"
        }
      },
      "required": [
        "accountId",
        "available",
        "availableChange",
        "currency",
        "hold",
        "holdChange",
        "relationContext",
        "relationEvent",
        "relationEventId",
        "time",
        "total"
      ]
    }
  },
  "required": [
    "topic",
    "type",
    "subject",
    "id",
    "userId",
    "channelType",
    "data"
  ]
}
```

### Properties

| Name              | Type   | Required | Restrictions | Description                           |
| ----------------- | ------ | -------- | ------------ | ------------------------------------- |
| topic             | string | true     | none         | none                                  |
| type              | string | true     | none         | none                                  |
| subject           | string | true     | none         | none                                  |
| id                | string | true     | none         | none                                  |
| userId            | string | true     | none         | none                                  |
| channelType       | string | true     | none         | Channel type                          |
| data              | object | true     | none         | none                                  |
| » accountId       | string | true     | none         | Account ID                            |
| » available       | string | true     | none         | Funds available to withdraw or trade  |
| » availableChange | string | true     | none         | The change of available Funds         |
| » currency        | string | true     | none         | currency                              |
| » hold            | string | true     | none         | Funds on hold (not available for use) |
| » holdChange      | string | true     | none         | The change of hold funds              |
| » relationContext | object | true     | none         | Relation context                      |
| »» symbol         | string | true     | none         | none                                  |
| »» orderId        | string | true     | none         | none                                  |
| » relationEvent   | string | true     | none         | Relation event                        |
| » relationEventId | string | true     | none         | Relation event Id                     |
| » time            | string | true     | none         | none                                  |
| » total           | string | true     | none         | Total balance = available + hold      |

#### Enumerated Values

| Property    | Value   |
| ----------- | ------- |
| channelType | private |
| channelType | public  |

<h2 id="tocS_Spot_spot_private_stopOrder">Spot_spot_private_stopOrder</h2>
<!-- backwards compatibility -->
<a id="schemaspot_spot_private_stoporder"></a>
<a id="schema_Spot_spot_private_stopOrder"></a>
<a id="tocSspot_spot_private_stoporder"></a>
<a id="tocsspot_spot_private_stoporder"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": ["private", "public"],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "createdAt": {
          "type": "integer",
          "description": "Order created time (milliseconds)",
          "format": "int64"
        },
        "orderId": {
          "type": "string",
          "description": "The unique order id generated by the trading system"
        },
        "orderPrice": {
          "type": "string",
          "description": "Price"
        },
        "orderType": {
          "type": "string",
          "description": "User-specified order type",
          "enum": ["stop"],
          "x-api-enum": [
            {
              "value": "stop",
              "name": "stop",
              "description": "stop"
            }
          ]
        },
        "side": {
          "type": "string",
          "description": "buy or sell",
          "enum": ["buy", "sell"],
          "x-api-enum": [
            {
              "value": "buy",
              "name": "buy",
              "description": "buy"
            },
            {
              "value": "sell",
              "name": "sell",
              "description": "sell"
            }
          ]
        },
        "size": {
          "type": "string",
          "description": "User-specified order size"
        },
        "stop": {
          "type": "string",
          "description": "Order type",
          "enum": ["loss", "entry", "l_l_o", "l_s_o", "e_l_o", "e_s_o", "tso"],
          "x-api-enum": [
            {
              "value": "loss",
              "name": "loss",
              "description": "stop loss order"
            },
            {
              "value": "entry",
              "name": "entry",
              "description": "Take profit order"
            },
            {
              "value": "l_l_o",
              "name": "l_l_o",
              "description": "Limit stop loss OCO order"
            },
            {
              "value": "l_s_o",
              "name": "l_s_o",
              "description": "Trigger stop loss OCO order"
            },
            {
              "value": "e_l_o",
              "name": "e_l_o",
              "description": "Limit stop profit OCO order"
            },
            {
              "value": "e_s_o",
              "name": "e_s_o",
              "description": "Trigger stop profit OCO order"
            },
            {
              "value": "tso",
              "name": "tso",
              "description": "Moving stop loss order"
            }
          ]
        },
        "stopPrice": {
          "type": "string",
          "description": "Stop Price"
        },
        "symbol": {
          "type": "string",
          "description": "symbol"
        },
        "tradeType": {
          "type": "string",
          "description": "The type of trading: TRADE (Spot), MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin).",
          "enum": ["TRADE", "MARGIN_TRADE", "MARGIN_ISOLATED_TRADE"],
          "x-api-enum": [
            {
              "value": "TRADE",
              "name": "TRADE",
              "description": "Spot"
            },
            {
              "value": "MARGIN_TRADE",
              "name": "MARGIN_TRADE",
              "description": "Spot margin trade"
            },
            {
              "value": "MARGIN_ISOLATED_TRADE",
              "name": "MARGIN_ISOLATED_TRADE",
              "description": "Spot margin isolated trade"
            }
          ]
        },
        "ts": {
          "type": "integer",
          "description": "Push time (nanoseconds)",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "description": "Order Type",
          "enum": ["open", "match", "update", "filled", "cancel", "received"],
          "x-api-enum": [
            {
              "value": "open",
              "name": "open",
              "description": "The order is in the order book (maker order)"
            },
            {
              "value": "match",
              "name": "match",
              "description": "The message sent when the order is matched, 1. When the status is open and the type is match, it is a maker match.  2. When the status is match and the type is match, it is a taker match."
            },
            {
              "value": "update",
              "name": "update",
              "description": "The message sent due to the order being modified: STP triggering, partial cancellation of the order. Includes these three scenarios:  1. When the status is open and the type is update: partial amounts of the order have been canceled, or STP triggers  2. When the status is match and the type is update: STP triggers  3. When the status is done and the type is update: partial amounts of the order have been filled and the unfilled part got canceled, or STP is triggered."
            },
            {
              "value": "filled",
              "name": "filled",
              "description": "The message sent when the status of the order changes to DONE after the transaction"
            },
            {
              "value": "cancel",
              "name": "cancel",
              "description": "The message sent when the status of the order changes to DONE due to being canceled"
            },
            {
              "value": "received",
              "name": "received",
              "description": "The message sent when the order enters the matching system. When the order has just entered the matching system and has not yet done matching logic with the counterparty, a private message with the message type \"received\" and the order status \"new\" will be pushed."
            }
          ]
        }
      },
      "required": [
        "createdAt",
        "orderId",
        "orderPrice",
        "orderType",
        "side",
        "size",
        "stop",
        "stopPrice",
        "symbol",
        "tradeType",
        "ts",
        "type"
      ]
    }
  },
  "required": ["topic", "type", "subject", "userId", "channelType", "data"]
}
```

### Properties

| Name         | Type           | Required | Restrictions | Description                                                                                              |
| ------------ | -------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| topic        | string         | true     | none         | none                                                                                                     |
| type         | string         | true     | none         | none                                                                                                     |
| subject      | string         | true     | none         | none                                                                                                     |
| userId       | string         | true     | none         | none                                                                                                     |
| channelType  | string         | true     | none         | Channel type                                                                                             |
| data         | object         | true     | none         | none                                                                                                     |
| » createdAt  | integer(int64) | true     | none         | Order created time (milliseconds)                                                                        |
| » orderId    | string         | true     | none         | The unique order id generated by the trading system                                                      |
| » orderPrice | string         | true     | none         | Price                                                                                                    |
| » orderType  | string         | true     | none         | User-specified order type                                                                                |
| » side       | string         | true     | none         | buy or sell                                                                                              |
| » size       | string         | true     | none         | User-specified order size                                                                                |
| » stop       | string         | true     | none         | Order type                                                                                               |
| » stopPrice  | string         | true     | none         | Stop Price                                                                                               |
| » symbol     | string         | true     | none         | symbol                                                                                                   |
| » tradeType  | string         | true     | none         | The type of trading: TRADE (Spot), MARGIN_TRADE (Cross Margin), MARGIN_ISOLATED_TRADE (Isolated Margin). |
| » ts         | integer(int64) | true     | none         | Push time (nanoseconds)                                                                                  |
| » type       | string         | true     | none         | Order Type                                                                                               |

#### Enumerated Values

| Property    | Value                 |
| ----------- | --------------------- |
| channelType | private               |
| channelType | public                |
| orderType   | stop                  |
| side        | buy                   |
| side        | sell                  |
| stop        | loss                  |
| stop        | entry                 |
| stop        | l_l_o                 |
| stop        | l_s_o                 |
| stop        | e_l_o                 |
| stop        | e_s_o                 |
| stop        | tso                   |
| tradeType   | TRADE                 |
| tradeType   | MARGIN_TRADE          |
| tradeType   | MARGIN_ISOLATED_TRADE |
| type        | open                  |
| type        | match                 |
| type        | update                |
| type        | filled                |
| type        | cancel                |
| type        | received              |
