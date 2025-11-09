# GET /options/positions/{contract}

**Source:** [/options/positions/{contract}](https://www.gate.io/docs/developers/apiv4/en/#getoptionsposition-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-specified-contract-position) Get specified contract position

`GET /options/positions/{contract}`

_Get specified contract position_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionsposition-parameters](https://www.gate.io/docs/developers/apiv4/en/#getoptionsposition-parameters)

| Name     | In   | Type   | Required | Description |
| -------- | ---- | ------ | -------- | ----------- |
| contract | path | string | true     | none        |

> Example responses

> 200 Response

```
{
  "user": 11027586,
  "underlying": "BTC_USDT",
  "underlying_price": "70000",
  "contract": "BTC_USDT-20211216-5000-P",
  "size": 10,
  "entry_price": "1234",
  "realised_pnl": "120",
  "mark_price": "6000",
  "mark_iv": "0.9638",
  "unrealised_pnl": "-320",
  "pending_orders": 1,
  "close_order": {
    "id": 232323,
    "price": "5779",
    "is_liq": false
  },
  "delta": "-0.0046",
  "gamma": "0",
  "vega": "2.87656",
  "theta": "-1.00247"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionsposition-responses](https://www.gate.io/docs/developers/apiv4/en/#getoptionsposition-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getoptionsposition-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getoptionsposition-responseschema)

Status Code **200**

_Options contract position details_

| Name               | Type           | Description                                 |
| ------------------ | -------------- | ------------------------------------------- | ------------------------------------------------------------ |
| » user             | integer        | User ID                                     |
| » underlying       | string         | Underlying                                  |
| » underlying_price | string         | Underlying price (quote currency)           |
| » contract         | string         | Options contract name                       |
| » size             | integer(int64) | Position size (contract quantity)           |
| » entry_price      | string         | Entry size (quote currency)                 |
| » mark_price       | string         | Current mark price (quote currency)         |
| » mark_iv          | string         | Implied volatility                          |
| » realised_pnl     | string         | Realized PnL                                |
| » unrealised_pnl   | string         | Unrealized PNL                              |
| » pending_orders   | integer        | Current pending order quantity              |
| » close_order      | object         | null                                        | Current close order information, or `null` if no close order |
| »» id              | integer(int64) | Order ID                                    |
| »» price           | string         | Order price (quote currency)                |
| »» is_liq          | boolean        | Whether the close order is from liquidation |
| » delta            | string         | Greek letter delta                          |
| » gamma            | string         | Greek letter gamma                          |
| » vega             | string         | Greek letter vega                           |
| » theta            | string         | Greek letter theta                          |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-liquidation-history-of-specified-underlying) List user's liquidation history of specified underlying

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-user-s-liquidation-history-of-specified-underlying](https://www.gate.io/docs/developers/apiv4/en/#list-user-s-liquidation-history-of-specified-underlying)

> Code samples
