# GET /options/contracts/{contract}

**Source:**
[/options/contracts/{contract}](https://www.gate.io/docs/developers/apiv4/en/#getoptionscontract-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-specified-contract-details) Query specified contract details

`GET /options/contracts/{contract}`

_Query specified contract details_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionscontract-parameters](https://www.gate.io/docs/developers/apiv4/en/#getoptionscontract-parameters)

| Name     | In   | Type   | Required | Description |
| -------- | ---- | ------ | -------- | ----------- |
| contract | path | string | true     | none        |

> Example responses

> 200 Response

```
{
  "name": "BTC_USDT-20211130-65000-C",
  "tag": "WEEK",
  "create_time": 1636702700,
  "expiration_time": 1637913600,
  "is_call": true,
  "strike_price": "65000",
  "last_price": "13000",
  "mark_price": "14010",
  "orderbook_id": 9,
  "trade_id": 1,
  "trade_size": 10,
  "position_size": 10,
  "underlying": "BTC_USDT",
  "underlying_price": "70000",
  "multiplier": "0.0001",
  "order_price_round": "0.1",
  "mark_price_round": "0.1",
  "maker_fee_rate": "0.0004",
  "taker_fee_rate": "0.0004",
  "price_limit_fee_rate": "0.1",
  "ref_discount_rate": "0",
  "ref_rebate_rate": "0",
  "order_price_deviate": "0.5",
  "order_size_min": 1,
  "order_size_max": 100000,
  "orders_limit": 50
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionscontract-responses](https://www.gate.io/docs/developers/apiv4/en/#getoptionscontract-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionscontract-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getoptionscontract-responseschema)

Status Code **200**

_Options contract details_

| Name                  | Type           | Description                                                                                                                                         |
| --------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| » name                | string         | Options contract name                                                                                                                               |
| » tag                 | string         | Tag                                                                                                                                                 |
| » create_time         | number(double) | Creation time                                                                                                                                       |
| » expiration_time     | number(double) | Expiration time                                                                                                                                     |
| » is_call             | boolean        | `true` means call options, `false` means put options                                                                                                |
| » multiplier          | string         | Multiplier used in converting from invoicing to settlement currency                                                                                 |
| » underlying          | string         | Underlying                                                                                                                                          |
| » underlying_price    | string         | Underlying price (quote currency)                                                                                                                   |
| » last_price          | string         | Last trading price                                                                                                                                  |
| » mark_price          | string         | Current mark price (quote currency)                                                                                                                 |
| » index_price         | string         | Current index price (quote currency)                                                                                                                |
| » maker_fee_rate      | string         | Maker fee rate, negative values indicate rebates                                                                                                    |
| » taker_fee_rate      | string         | Taker fee rate                                                                                                                                      |
| » order_price_round   | string         | Minimum order price increment                                                                                                                       |
| » mark_price_round    | string         | Minimum mark price increment                                                                                                                        |
| » order_size_min      | integer(int64) | Minimum order size allowed by the contract                                                                                                          |
| » order_size_max      | integer(int64) | Maximum order size allowed by the contract                                                                                                          |
| » order_price_deviate | string         | The positive and negative offset allowed between the order price and the current mark price, that `order_price` must meet the following conditions: |

order_price is within the range of mark_price +/- order_price_deviate \*
underlying_price and does not distinguish between buy and sell orders | | »
ref_discount_rate | string | Trading fee discount for referred users | | »
ref_rebate_rate | string | Commission rate for referrers | | » orderbook_id |
integer(int64) | Orderbook update ID | | » trade_id | integer(int64) | Current
trade ID | | » trade_size | integer(int64) | Historical cumulative trading
volume | | » position_size | integer(int64) | Current total long position size |
| » orders_limit | integer | Maximum number of pending orders |

This operation does not require authentication

## [#](#list-settlement-history) List settlement history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-settlement-history](https://www.gate.io/docs/developers/apiv4/en/#list-settlement-history)

> Code samples
