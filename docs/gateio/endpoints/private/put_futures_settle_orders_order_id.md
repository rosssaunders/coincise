# PUT /futures/{settle}/orders/{order_id}

**Source:**
[/futures/{settle}/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#amendfuturesorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#amend-single-order-2) Amend single order

`PUT /futures/{settle}/orders/{order_id}`

_Amend single order_

> Body parameter

```
{
  "size": 100,
  "price": "54321"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#amendfuturesorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#amendfuturesorder-parameters)

| Name           | In     | Type           | Required | Description                                                                                                                                      |
| -------------- | ------ | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string         | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | object         | true     | none                                                                                                                                             |
| » size         | body   | integer(int64) | false    | New order size, including filled part.                                                                                                           |
| » price        | body   | string         | false    | New order price                                                                                                                                  |
| » amend_text   | body   | string         | false    | Custom info during order amendment                                                                                                               |
| » text         | body   | string         | false    | 内部User可以在text修改信息。                                                                                                                     |
| settle         | path   | string         | true     | Settle currency                                                                                                                                  |
| order_id       | path   | string         | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                        |

#### [#](#detailed-descriptions-31) Detailed descriptions

**» size**: New order size, including filled part.

- If new size is less than or equal to filled size, the order will be cancelled.
- Order side must be identical to the original one.
- Close order size cannot be changed.
- For reduce only orders, increasing size may leads to other reduce only orders
  being cancelled.
- If price is not changed, decreasing size will not change its precedence in
  order book, while increasing will move it to the last at current price.

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. finished, it can be checked within 60 seconds after the end of the
order. After that, only order ID is accepted.

#### [#](#enumerated-values-66) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#amendfuturesorder-responses](https://www.gate.io/docs/developers/apiv4/en/#amendfuturesorder-responses)

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-personal-trading-records-2) Query personal trading records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-records-2](https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-records-2)

> Code samples
