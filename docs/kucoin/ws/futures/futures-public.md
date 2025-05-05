---
title: futures v1.0.0
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

<h1 id="futures">futures v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

futures_public

<h1 id="futures-default">Default</h1>

## Get Ticker V2

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/tickerV2/contractMarket/tickerV2:_symbol_", {
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

r = requests.trace('/tickerV2/contractMarket/tickerV2:_symbol_', headers = headers)

print(r.json())

```

`TRACE /tickerV2/contractMarket/tickerV2:_symbol_`

Subscribe to this topic to get real-time pushes of BBO changes. After
subscription, when there are changes in the order book (not necessarily
ask1/bid1 changes), the system will push the real-time ticker symbol information
to you.

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "bestBidSize": {
          "type": "integer"
        },
        "bestBidPrice": {
          "type": "string"
        },
        "bestAskPrice": {
          "type": "string"
        },
        "bestAskSize": {
          "type": "integer"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "sequence",
        "bestBidSize",
        "bestBidPrice",
        "bestAskPrice",
        "bestAskSize",
        "ts"
      ]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

<h3 id="get-ticker-v2-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                    |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_tickerv2](#schemafutures_futures_public_tickerv2) |

<aside class="success">
This operation does not require authentication
</aside>

## Get Ticker(not recommended)

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/tickerV1/contractMarket/ticker:_symbol_", {
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

r = requests.trace('/tickerV1/contractMarket/ticker:_symbol_', headers = headers)

print(r.json())

```

`TRACE /tickerV1/contractMarket/ticker:_symbol_`

Subscribe to this topic to get real-time pushes on BBO changes. It is not
recommended to use this topic any more. For real-time ticker information, please
subscribe /contractMarket/tickerV2:{symbol}.

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "side": {
          "type": "string"
        },
        "size": {
          "type": "integer"
        },
        "price": {
          "type": "string"
        },
        "bestBidSize": {
          "type": "integer"
        },
        "bestBidPrice": {
          "type": "string"
        },
        "bestAskPrice": {
          "type": "string"
        },
        "tradeId": {
          "type": "string"
        },
        "bestAskSize": {
          "type": "integer"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "sequence",
        "side",
        "size",
        "price",
        "bestBidSize",
        "bestBidPrice",
        "bestAskPrice",
        "tradeId",
        "bestAskSize",
        "ts"
      ]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

<h3 id="get-ticker(not-recommended)-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                    |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_tickerV1](#schemafutures_futures_public_tickerv1) |

<aside class="success">
This operation does not require authentication
</aside>

## Orderbook - Level5

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderbookLevel5/contractMarket/level2Depth5:_symbol_", {
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

r = requests.trace('/orderbookLevel5/contractMarket/level2Depth5:_symbol_', headers = headers)

print(r.json())

```

`TRACE /orderbookLevel5/contractMarket/level2Depth5:_symbol_`

The system will return the 5 best ask/bid orders data. If there is no change in
the market, data will not be pushed

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        },
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        }
      },
      "required": ["bids", "sequence", "timestamp", "ts", "asks"]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

<h3 id="orderbook---level5-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                                  |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_orderbookLevel5](#schemafutures_futures_public_orderbooklevel5) |

<aside class="success">
This operation does not require authentication
</aside>

## Orderbook - Level50

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderbookLevel50/contractMarket/level2Depth50:_symbol_", {
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

r = requests.trace('/orderbookLevel50/contractMarket/level2Depth50:_symbol_', headers = headers)

print(r.json())

```

`TRACE /orderbookLevel50/contractMarket/level2Depth50:_symbol_`

The depth50 market data.

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        },
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        }
      },
      "required": ["bids", "sequence", "timestamp", "ts", "asks"]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

<h3 id="orderbook---level50-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                                    |
| ------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_orderbookLevel50](#schemafutures_futures_public_orderbooklevel50) |

<aside class="success">
This operation does not require authentication
</aside>

## Orderbook - Increment

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/orderbookIncrement/contractMarket/level2:_symbol_", {
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

r = requests.trace('/orderbookIncrement/contractMarket/level2:_symbol_', headers = headers)

print(r.json())

```

`TRACE /orderbookIncrement/contractMarket/level2:_symbol_`

The system will return the increment change orderbook data (all depth). If there
is no change in the market, data will not be pushed.

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
    "sn": {
      "type": "integer",
      "format": "int64"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "change": {
          "type": "string"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["sequence", "change", "timestamp"]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

<h3 id="orderbook---increment-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                                        |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_orderbookIncrement](#schemafutures_futures_public_orderbookincrement) |

<aside class="success">
This operation does not require authentication
</aside>

## Klines

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/klines/contractMarket/limitCandle:_symbol___type_", {
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

r = requests.trace('/klines/contractMarket/limitCandle:_symbol___type_', headers = headers)

print(r.json())

```

`TRACE /klines/contractMarket/limitCandle:_symbol___type_`

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
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) "
        },
        "candles": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Start time, open price, close price, high price, low price, Transaction volume(This value is incorrect, please do not use it, we will fix it in subsequent versions), Transaction amount"
        },
        "time": {
          "type": "integer",
          "description": "timestamp(ms)",
          "format": "int64"
        }
      },
      "required": ["symbol", "candles", "time"]
    },
    "subject": {
      "type": "string"
    }
  },
  "required": ["topic", "type", "data", "subject"]
}
```

<h3 id="klines-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                |
| ------ | ------------------------------------------------------- | ----------- | --------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_klines](#schemafutures_futures_public_klines) |

<aside class="success">
This operation does not require authentication
</aside>

## Match execution data.

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/execution/contractMarket/execution:_symbol_", {
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

r = requests.trace('/execution/contractMarket/execution:_symbol_', headers = headers)

print(r.json())

```

`TRACE /execution/contractMarket/execution:_symbol_`

For each order executed, the system will send you the match messages in the
format as following.

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "side": {
          "type": "string"
        },
        "size": {
          "type": "integer"
        },
        "price": {
          "type": "string"
        },
        "takerOrderId": {
          "type": "string"
        },
        "makerOrderId": {
          "type": "string"
        },
        "tradeId": {
          "type": "string"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "sequence",
        "side",
        "size",
        "price",
        "takerOrderId",
        "makerOrderId",
        "tradeId",
        "ts"
      ]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

<h3 id="match-execution-data.-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                                |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_matchExecution](#schemafutures_futures_public_matchexecution) |

<aside class="success">
This operation does not require authentication
</aside>

## instrument

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/instrument/contract/instrument:_symbol_", {
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

r = requests.trace('/instrument/contract/instrument:_symbol_', headers = headers)

print(r.json())

```

`TRACE /instrument/contract/instrument:_symbol_`

Subscribe this topic to get the mark Price, index Price or funding fee Rate

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string",
      "enum": ["mark.index.price", "funding.rate"],
      "x-api-enum": [
        {
          "value": "mark.index.price",
          "name": "",
          "description": ""
        },
        {
          "value": "funding.rate",
          "name": "",
          "description": ""
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "granularity": {
          "type": "integer",
          "description": "Granularity (predicted funding rate: 1-min granularity: 60000; Funding rate: 8-hours granularity: 28800000.)"
        },
        "fundingRate": {
          "type": "number"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "markPrice": {
          "type": "number"
        },
        "indexPrice": {
          "type": "number"
        }
      },
      "required": ["granularity", "timestamp"]
    },
    "type": {
      "type": "string"
    }
  },
  "required": ["topic", "subject", "data", "type"]
}
```

<h3 id="instrument-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                        |
| ------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_instrument](#schemafutures_futures_public_instrument) |

<aside class="success">
This operation does not require authentication
</aside>

## announcement

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/announcement/contract/announcement:_symbol_", {
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

r = requests.trace('/announcement/contract/announcement:_symbol_', headers = headers)

print(r.json())

```

`TRACE /announcement/contract/announcement:_symbol_`

Subscribe this topic to get Funding Fee Settlement.

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
          "description": "Symbol",
          "type": "string"
        },
        "fundingTime": {
          "type": "integer",
          "description": "Funding time",
          "format": "int64"
        },
        "fundingRate": {
          "description": "Funding rate",
          "type": "number"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["symbol", "fundingTime", "fundingRate", "timestamp"]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

<h3 id="announcement-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                                            |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_fundingFeeSettlement](#schemafutures_futures_public_fundingfeesettlement) |

<aside class="success">
This operation does not require authentication
</aside>

## Symbol Snapshot

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/symbolSnapshot/contractMarket/snapshot:_symbol_", {
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

r = requests.trace('/symbolSnapshot/contractMarket/snapshot:_symbol_', headers = headers)

print(r.json())

```

`TRACE /symbolSnapshot/contractMarket/snapshot:_symbol_`

Get symbol snapshot.

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
    "data": {
      "type": "object",
      "properties": {
        "highPrice": {
          "type": "number"
        },
        "lastPrice": {
          "type": "number"
        },
        "lowPrice": {
          "type": "number"
        },
        "price24HoursBefore": {
          "type": "number"
        },
        "priceChg": {
          "type": "number"
        },
        "priceChgPct": {
          "type": "number"
        },
        "symbol": {
          "type": "string"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        },
        "turnover": {
          "type": "number"
        },
        "volume": {
          "type": "number"
        }
      },
      "required": [
        "highPrice",
        "lastPrice",
        "lowPrice",
        "price24HoursBefore",
        "priceChg",
        "priceChgPct",
        "symbol",
        "ts",
        "turnover",
        "volume"
      ]
    }
  },
  "required": ["topic", "type", "subject", "id", "data"]
}
```

<h3 id="symbol-snapshot-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                                |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Futures_futures_public_symbolSnapshot](#schemafutures_futures_public_symbolsnapshot) |

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Futures_futures_public_tickerv2">Futures_futures_public_tickerv2</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_tickerv2"></a>
<a id="schema_Futures_futures_public_tickerv2"></a>
<a id="tocSfutures_futures_public_tickerv2"></a>
<a id="tocsfutures_futures_public_tickerv2"></a>

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "bestBidSize": {
          "type": "integer"
        },
        "bestBidPrice": {
          "type": "string"
        },
        "bestAskPrice": {
          "type": "string"
        },
        "bestAskSize": {
          "type": "integer"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "sequence",
        "bestBidSize",
        "bestBidPrice",
        "bestAskPrice",
        "bestAskSize",
        "ts"
      ]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

### Properties

| Name           | Type           | Required | Restrictions | Description |
| -------------- | -------------- | -------- | ------------ | ----------- |
| topic          | string         | true     | none         | none        |
| type           | string         | true     | none         | none        |
| subject        | string         | true     | none         | none        |
| sn             | integer        | true     | none         | none        |
| data           | object         | true     | none         | none        |
| » symbol       | string         | true     | none         | none        |
| » sequence     | integer(int64) | true     | none         | none        |
| » bestBidSize  | integer        | true     | none         | none        |
| » bestBidPrice | string         | true     | none         | none        |
| » bestAskPrice | string         | true     | none         | none        |
| » bestAskSize  | integer        | true     | none         | none        |
| » ts           | integer(int64) | true     | none         | none        |

<h2 id="tocS_Futures_futures_public_tickerV1">Futures_futures_public_tickerV1</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_tickerv1"></a>
<a id="schema_Futures_futures_public_tickerV1"></a>
<a id="tocSfutures_futures_public_tickerv1"></a>
<a id="tocsfutures_futures_public_tickerv1"></a>

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "side": {
          "type": "string"
        },
        "size": {
          "type": "integer"
        },
        "price": {
          "type": "string"
        },
        "bestBidSize": {
          "type": "integer"
        },
        "bestBidPrice": {
          "type": "string"
        },
        "bestAskPrice": {
          "type": "string"
        },
        "tradeId": {
          "type": "string"
        },
        "bestAskSize": {
          "type": "integer"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "sequence",
        "side",
        "size",
        "price",
        "bestBidSize",
        "bestBidPrice",
        "bestAskPrice",
        "tradeId",
        "bestAskSize",
        "ts"
      ]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

### Properties

| Name           | Type           | Required | Restrictions | Description |
| -------------- | -------------- | -------- | ------------ | ----------- |
| topic          | string         | true     | none         | none        |
| type           | string         | true     | none         | none        |
| subject        | string         | true     | none         | none        |
| sn             | integer        | true     | none         | none        |
| data           | object         | true     | none         | none        |
| » symbol       | string         | true     | none         | none        |
| » sequence     | integer(int64) | true     | none         | none        |
| » side         | string         | true     | none         | none        |
| » size         | integer        | true     | none         | none        |
| » price        | string         | true     | none         | none        |
| » bestBidSize  | integer        | true     | none         | none        |
| » bestBidPrice | string         | true     | none         | none        |
| » bestAskPrice | string         | true     | none         | none        |
| » tradeId      | string         | true     | none         | none        |
| » bestAskSize  | integer        | true     | none         | none        |
| » ts           | integer(int64) | true     | none         | none        |

<h2 id="tocS_Futures_futures_public_orderbookLevel5">Futures_futures_public_orderbookLevel5</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_orderbooklevel5"></a>
<a id="schema_Futures_futures_public_orderbookLevel5"></a>
<a id="tocSfutures_futures_public_orderbooklevel5"></a>
<a id="tocsfutures_futures_public_orderbooklevel5"></a>

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        },
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        }
      },
      "required": ["bids", "sequence", "timestamp", "ts", "asks"]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| topic       | string         | true     | none         | none        |
| type        | string         | true     | none         | none        |
| subject     | string         | true     | none         | none        |
| sn          | integer        | true     | none         | none        |
| data        | object         | true     | none         | none        |
| » bids      | [array]        | true     | none         | none        |
| » sequence  | integer(int64) | true     | none         | none        |
| » timestamp | integer(int64) | true     | none         | none        |
| » ts        | integer(int64) | true     | none         | none        |
| » asks      | [array]        | true     | none         | none        |

<h2 id="tocS_Futures_futures_public_orderbookLevel50">Futures_futures_public_orderbookLevel50</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_orderbooklevel50"></a>
<a id="schema_Futures_futures_public_orderbookLevel50"></a>
<a id="tocSfutures_futures_public_orderbooklevel50"></a>
<a id="tocsfutures_futures_public_orderbooklevel50"></a>

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        },
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "AnyType"
            },
            "minItems": 2,
            "maxItems": 2
          }
        }
      },
      "required": ["bids", "sequence", "timestamp", "ts", "asks"]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| topic       | string         | true     | none         | none        |
| type        | string         | true     | none         | none        |
| subject     | string         | true     | none         | none        |
| sn          | integer        | true     | none         | none        |
| data        | object         | true     | none         | none        |
| » bids      | [array]        | true     | none         | none        |
| » sequence  | integer(int64) | true     | none         | none        |
| » timestamp | integer(int64) | true     | none         | none        |
| » ts        | integer(int64) | true     | none         | none        |
| » asks      | [array]        | true     | none         | none        |

<h2 id="tocS_Futures_futures_public_orderbookIncrement">Futures_futures_public_orderbookIncrement</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_orderbookincrement"></a>
<a id="schema_Futures_futures_public_orderbookIncrement"></a>
<a id="tocSfutures_futures_public_orderbookincrement"></a>
<a id="tocsfutures_futures_public_orderbookincrement"></a>

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
    "sn": {
      "type": "integer",
      "format": "int64"
    },
    "data": {
      "type": "object",
      "properties": {
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "change": {
          "type": "string"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["sequence", "change", "timestamp"]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

### Properties

| Name        | Type           | Required | Restrictions | Description |
| ----------- | -------------- | -------- | ------------ | ----------- |
| topic       | string         | true     | none         | none        |
| type        | string         | true     | none         | none        |
| subject     | string         | true     | none         | none        |
| sn          | integer(int64) | true     | none         | none        |
| data        | object         | true     | none         | none        |
| » sequence  | integer(int64) | true     | none         | none        |
| » change    | string         | true     | none         | none        |
| » timestamp | integer(int64) | true     | none         | none        |

<h2 id="tocS_Futures_futures_public_klines">Futures_futures_public_klines</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_klines"></a>
<a id="schema_Futures_futures_public_klines"></a>
<a id="tocSfutures_futures_public_klines"></a>
<a id="tocsfutures_futures_public_klines"></a>

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
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) "
        },
        "candles": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Start time, open price, close price, high price, low price, Transaction volume(This value is incorrect, please do not use it, we will fix it in subsequent versions), Transaction amount"
        },
        "time": {
          "type": "integer",
          "description": "timestamp(ms)",
          "format": "int64"
        }
      },
      "required": ["symbol", "candles", "time"]
    },
    "subject": {
      "type": "string"
    }
  },
  "required": ["topic", "type", "data", "subject"]
}
```

### Properties

| Name      | Type           | Required | Restrictions | Description                                                                                                                                                                              |
| --------- | -------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| topic     | string         | true     | none         | none                                                                                                                                                                                     |
| type      | string         | true     | none         | none                                                                                                                                                                                     |
| data      | object         | true     | none         | none                                                                                                                                                                                     |
| » symbol  | string         | true     | none         | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)                                                                       |
| » candles | [string]       | true     | none         | Start time, open price, close price, high price, low price, Transaction volume(This value is incorrect, please do not use it, we will fix it in subsequent versions), Transaction amount |
| » time    | integer(int64) | true     | none         | timestamp(ms)                                                                                                                                                                            |
| subject   | string         | true     | none         | none                                                                                                                                                                                     |

<h2 id="tocS_Futures_futures_public_matchExecution">Futures_futures_public_matchExecution</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_matchexecution"></a>
<a id="schema_Futures_futures_public_matchExecution"></a>
<a id="tocSfutures_futures_public_matchexecution"></a>
<a id="tocsfutures_futures_public_matchexecution"></a>

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
    "sn": {
      "type": "integer"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "sequence": {
          "type": "integer",
          "format": "int64"
        },
        "side": {
          "type": "string"
        },
        "size": {
          "type": "integer"
        },
        "price": {
          "type": "string"
        },
        "takerOrderId": {
          "type": "string"
        },
        "makerOrderId": {
          "type": "string"
        },
        "tradeId": {
          "type": "string"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "symbol",
        "sequence",
        "side",
        "size",
        "price",
        "takerOrderId",
        "makerOrderId",
        "tradeId",
        "ts"
      ]
    }
  },
  "required": ["topic", "type", "subject", "sn", "data"]
}
```

### Properties

| Name           | Type           | Required | Restrictions | Description |
| -------------- | -------------- | -------- | ------------ | ----------- |
| topic          | string         | true     | none         | none        |
| type           | string         | true     | none         | none        |
| subject        | string         | true     | none         | none        |
| sn             | integer        | true     | none         | none        |
| data           | object         | true     | none         | none        |
| » symbol       | string         | true     | none         | none        |
| » sequence     | integer(int64) | true     | none         | none        |
| » side         | string         | true     | none         | none        |
| » size         | integer        | true     | none         | none        |
| » price        | string         | true     | none         | none        |
| » takerOrderId | string         | true     | none         | none        |
| » makerOrderId | string         | true     | none         | none        |
| » tradeId      | string         | true     | none         | none        |
| » ts           | integer(int64) | true     | none         | none        |

<h2 id="tocS_Futures_futures_public_instrument">Futures_futures_public_instrument</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_instrument"></a>
<a id="schema_Futures_futures_public_instrument"></a>
<a id="tocSfutures_futures_public_instrument"></a>
<a id="tocsfutures_futures_public_instrument"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string",
      "enum": ["mark.index.price", "funding.rate"],
      "x-api-enum": [
        {
          "value": "mark.index.price",
          "name": "",
          "description": ""
        },
        {
          "value": "funding.rate",
          "name": "",
          "description": ""
        }
      ]
    },
    "data": {
      "type": "object",
      "properties": {
        "granularity": {
          "type": "integer",
          "description": "Granularity (predicted funding rate: 1-min granularity: 60000; Funding rate: 8-hours granularity: 28800000.)"
        },
        "fundingRate": {
          "type": "number"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "markPrice": {
          "type": "number"
        },
        "indexPrice": {
          "type": "number"
        }
      },
      "required": ["granularity", "timestamp"]
    },
    "type": {
      "type": "string"
    }
  },
  "required": ["topic", "subject", "data", "type"]
}
```

### Properties

| Name          | Type           | Required | Restrictions | Description                                                                                                  |
| ------------- | -------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| topic         | string         | true     | none         | none                                                                                                         |
| subject       | string         | true     | none         | none                                                                                                         |
| data          | object         | true     | none         | none                                                                                                         |
| » granularity | integer        | true     | none         | Granularity (predicted funding rate: 1-min granularity: 60000; Funding rate: 8-hours granularity: 28800000.) |
| » fundingRate | number         | false    | none         | none                                                                                                         |
| » timestamp   | integer(int64) | true     | none         | none                                                                                                         |
| » markPrice   | number         | false    | none         | none                                                                                                         |
| » indexPrice  | number         | false    | none         | none                                                                                                         |
| type          | string         | true     | none         | none                                                                                                         |

#### Enumerated Values

| Property | Value            |
| -------- | ---------------- |
| subject  | mark.index.price |
| subject  | funding.rate     |

<h2 id="tocS_Futures_futures_public_fundingFeeSettlement">Futures_futures_public_fundingFeeSettlement</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_fundingfeesettlement"></a>
<a id="schema_Futures_futures_public_fundingFeeSettlement"></a>
<a id="tocSfutures_futures_public_fundingfeesettlement"></a>
<a id="tocsfutures_futures_public_fundingfeesettlement"></a>

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
          "description": "Symbol",
          "type": "string"
        },
        "fundingTime": {
          "type": "integer",
          "description": "Funding time",
          "format": "int64"
        },
        "fundingRate": {
          "description": "Funding rate",
          "type": "number"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": ["symbol", "fundingTime", "fundingRate", "timestamp"]
    }
  },
  "required": ["type", "topic", "subject", "data"]
}
```

### Properties

| Name          | Type           | Required | Restrictions | Description  |
| ------------- | -------------- | -------- | ------------ | ------------ |
| type          | string         | true     | none         | none         |
| topic         | string         | true     | none         | none         |
| subject       | string         | true     | none         | none         |
| data          | object         | true     | none         | none         |
| » symbol      | string         | true     | none         | Symbol       |
| » fundingTime | integer(int64) | true     | none         | Funding time |
| » fundingRate | number         | true     | none         | Funding rate |
| » timestamp   | integer(int64) | true     | none         | none         |

<h2 id="tocS_Futures_futures_public_symbolSnapshot">Futures_futures_public_symbolSnapshot</h2>
<!-- backwards compatibility -->
<a id="schemafutures_futures_public_symbolsnapshot"></a>
<a id="schema_Futures_futures_public_symbolSnapshot"></a>
<a id="tocSfutures_futures_public_symbolsnapshot"></a>
<a id="tocsfutures_futures_public_symbolsnapshot"></a>

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
    "data": {
      "type": "object",
      "properties": {
        "highPrice": {
          "type": "number"
        },
        "lastPrice": {
          "type": "number"
        },
        "lowPrice": {
          "type": "number"
        },
        "price24HoursBefore": {
          "type": "number"
        },
        "priceChg": {
          "type": "number"
        },
        "priceChgPct": {
          "type": "number"
        },
        "symbol": {
          "type": "string"
        },
        "ts": {
          "type": "integer",
          "format": "int64"
        },
        "turnover": {
          "type": "number"
        },
        "volume": {
          "type": "number"
        }
      },
      "required": [
        "highPrice",
        "lastPrice",
        "lowPrice",
        "price24HoursBefore",
        "priceChg",
        "priceChgPct",
        "symbol",
        "ts",
        "turnover",
        "volume"
      ]
    }
  },
  "required": ["topic", "type", "subject", "id", "data"]
}
```

### Properties

| Name                 | Type           | Required | Restrictions | Description |
| -------------------- | -------------- | -------- | ------------ | ----------- |
| topic                | string         | true     | none         | none        |
| type                 | string         | true     | none         | none        |
| subject              | string         | true     | none         | none        |
| id                   | string         | true     | none         | none        |
| data                 | object         | true     | none         | none        |
| » highPrice          | number         | true     | none         | none        |
| » lastPrice          | number         | true     | none         | none        |
| » lowPrice           | number         | true     | none         | none        |
| » price24HoursBefore | number         | true     | none         | none        |
| » priceChg           | number         | true     | none         | none        |
| » priceChgPct        | number         | true     | none         | none        |
| » symbol             | string         | true     | none         | none        |
| » ts                 | integer(int64) | true     | none         | none        |
| » turnover           | number         | true     | none         | none        |
| » volume             | number         | true     | none         | none        |
