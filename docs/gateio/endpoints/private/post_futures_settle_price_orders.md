# POST /futures/{settle}/price_orders

**Source:**
[/futures/{settle}/price_orders](https://www.gate.io/docs/developers/apiv4/en/#createpricetriggeredorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-price-triggered-order-2) Create price-triggered order

`POST /futures/{settle}/price_orders`

_Create price-triggered order_

> Body parameter

```
{
  "initial": {
    "contract": "BTC_USDT",
    "size": 100,
    "price": "5.03"
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "3000",
    "rule": 1,
    "expiration": 86400
  },
  "order_type": "close-long-order"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createpricetriggeredorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#createpricetriggeredorder-parameters)

| Name             | In   | Type                                                            | Required | Description                                                                                                                                                                        |
| ---------------- | ---- | --------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body             | body | [FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder) | true     | none                                                                                                                                                                               |
| » initial        | body | object                                                          | true     | none                                                                                                                                                                               |
| »» contract      | body | string                                                          | true     | Futures contract                                                                                                                                                                   |
| »» size          | body | integer(int64)                                                  | false    | Represents the number of contracts that need to be closed, full closing: size=0                                                                                                    |
| »» price         | body | string                                                          | true     | Order price. Set to 0 to use market price                                                                                                                                          |
| »» close         | body | boolean                                                         | false    | When all positions are closed in a single position mode, it must be set to true to perform the closing operation                                                                   |
| »» tif           | body | string                                                          | false    | Time in force strategy, default is gtc, market orders currently only support ioc mode                                                                                              |
| »» text          | body | string                                                          | false    | The source of the order, including:                                                                                                                                                |
| »» reduce_only   | body | boolean                                                         | false    | When set to true, perform automatic position reduction operation. Set to true to ensure that the order will not open a new position, and is only used to close or reduce positions |
| »» auto_size     | body | string                                                          | false    | Single position mode: auto_size is not required                                                                                                                                    |
| » trigger        | body | object                                                          | true     | none                                                                                                                                                                               |
| »» strategy_type | body | integer(int32)                                                  | false    | Trigger Strategy                                                                                                                                                                   |
| »» price_type    | body | integer(int32)                                                  | false    | Reference price type. 0 - Latest trade price, 1 - Mark price, 2 - Index price                                                                                                      |
| »» price         | body | string                                                          | false    | Price value for price trigger, or spread value for spread trigger                                                                                                                  |
| »» rule          | body | integer(int32)                                                  | false    | Price Condition Type                                                                                                                                                               |
| »» expiration    | body | integer                                                         | false    | Maximum wait time for trigger condition (in seconds). Order will be cancelled if timeout                                                                                           |
| » order_type     | body | string                                                          | false    | Types of take-profit and stop-loss orders, including:                                                                                                                              |
| settle           | path | string                                                          | true     | Settle currency                                                                                                                                                                    |

#### [#](#detailed-descriptions-38) Detailed descriptions

**»» size**: Represents the number of contracts that need to be closed, full
closing: size=0 Partial closing: plan-close-short-position size>0 Partial
closing: plan-close-long-position size<0

**»» close**: When all positions are closed in a single position mode, it must
be set to true to perform the closing operation When partially closed positions
in single-store mode/double-store mode, you can not set close, or close=false

**»» tif**: Time in force strategy, default is gtc, market orders currently only
support ioc mode

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled

**»» text**: The source of the order, including:

- web: Web
- api: API call
- app: Mobile app

**»» auto_size**: Single position mode: auto_size is not required Dual position
mode full closing (size=0): auto_size must be set, close_long for closing long
positions, close_short for closing short positions Dual position mode partial
closing (size≠0): auto_size is not required

**»» strategy_type**: Trigger Strategy

- 0: Price trigger, triggered when price meets conditions
- 1: Price spread trigger, i.e. the difference between the latest price
  specified in `price_type` and the second-last price Currently only supports 0
  (latest transaction price)

**»» rule**: Price Condition Type

- 1: Trigger when the price calculated based on `strategy_type` and `price_type`
  is greater than or equal to `Trigger.Price`, while Trigger.Price must >
  last_price
- 2: Trigger when the price calculated based on `strategy_type` and `price_type`
  is less than or equal to `Trigger.Price`, and Trigger.Price must < last_price

**» order_type**: Types of take-profit and stop-loss orders, including:

- `close-long-order`: Order take-profit/stop-loss, close long position
- `close-short-order`: Order take-profit/stop-loss, close short position
- `close-long-position`: Position take-profit/stop-loss, used to close all long
  positions
- `close-short-position`: Position take-profit/stop-loss, used to close all
  short positions
- `plan-close-long-position`: Position plan take-profit/stop-loss, used to close
  all or partial long positions
- `plan-close-short-position`: Position plan take-profit/stop-loss, used to
  close all or partial short positions

The two types of order take-profit/stop-loss are read-only and cannot be passed
in requests

#### [#](#enumerated-values-81) Enumerated Values

| Parameter        | Value |
| ---------------- | ----- |
| »» tif           | gtc   |
| »» tif           | ioc   |
| »» strategy_type | 0     |
| »» strategy_type | 1     |
| »» price_type    | 0     |
| »» price_type    | 1     |
| »» price_type    | 2     |
| »» rule          | 1     |
| »» rule          | 2     |
| settle           | btc   |
| settle           | usdt  |

> Example responses

> 201 Response

```
{
  "id": 1432329
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createpricetriggeredorder-responses](https://www.gate.io/docs/developers/apiv4/en/#createpricetriggeredorder-responses)

| Status | Meaning                                                                         | Description                | Schema |
| ------ | ------------------------------------------------------------------------------- | -------------------------- | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order created successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createpricetriggeredorder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createpricetriggeredorder-responseschema)

Status Code **201**

_TriggerOrderResponse_

| Name | Type           | Description   |
| ---- | -------------- | ------------- |
| » id | integer(int64) | Auto order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-auto-order-list) Query auto order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-auto-order-list](https://www.gate.io/docs/developers/apiv4/en/#query-auto-order-list)

> Code samples
