# POST /spot/price_orders

**Source:**
[/spot/price_orders](https://www.gate.io/docs/developers/apiv4/en/#createspotpricetriggeredorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-price-triggered-order) Create price-triggered order

`POST /spot/price_orders`

_Create price-triggered order_

> Body parameter

```
{
  "trigger": {
    "price": "100",
    "rule": ">=",
    "expiration": 3600
  },
  "put": {
    "type": "limit",
    "side": "buy",
    "price": "2.15",
    "amount": "2.00000000",
    "account": "normal",
    "time_in_force": "gtc",
    "text": "api"
  },
  "market": "GT_USDT"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createspotpricetriggeredorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#createspotpricetriggeredorder-parameters)

| Name             | In   | Type                                                      | Required | Description                                                                              |
| ---------------- | ---- | --------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| body             | body | [SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder) | true     | none                                                                                     |
| » trigger        | body | object                                                    | true     | none                                                                                     |
| »» price         | body | string                                                    | true     | Trigger price                                                                            |
| »» rule          | body | string                                                    | true     | Price trigger condition                                                                  |
| »» expiration    | body | integer                                                   | true     | Maximum wait time for trigger condition (in seconds). Order will be cancelled if timeout |
| » put            | body | object                                                    | true     | none                                                                                     |
| »» type          | body | string                                                    | false    | Order type，default to `limit`                                                           |
| »» side          | body | string                                                    | true     | Order side                                                                               |
| »» price         | body | string                                                    | true     | Order price                                                                              |
| »» amount        | body | string                                                    | true     | Trading quantity                                                                         |
| »» account       | body | string                                                    | true     | Trading account type. Unified account must be set to `unified`                           |
| »» time_in_force | body | string                                                    | false    | time_in_force                                                                            |
| »» auto_borrow   | body | boolean                                                   | false    | Whether to borrow coins automatically                                                    |
| »» auto_repay    | body | boolean                                                   | false    | Whether to repay the loan automatically                                                  |
| »» text          | body | string                                                    | false    | The source of the order, including:                                                      |
| » market         | body | string                                                    | true     | Market                                                                                   |

#### [#](#detailed-descriptions-20) Detailed descriptions

**»» rule**: Price trigger condition

- `>=`: triggered when market price is greater than or equal to `price`
- `<=`: triggered when market price is less than or equal to `price`

**»» type**: Order type，default to `limit`

- limit : Limit Order
- market : Market Order

**»» side**: Order side

- buy: buy side
- sell: sell side

**»» amount**: Trading quantity When `type` is `limit`, it refers to the base
currency (the currency being traded), such as `BTC` in `BTC_USDT` When `type` is
`market`, it refers to different currencies based on the side:

- `side`: `buy` refers to quote currency, `BTC_USDT` means `USDT`
- `side`: `sell` refers to base currency, `BTC_USDT` means `BTC`

**»» account**: Trading account type. Unified account must be set to `unified`

- normal: spot trading
- margin: margin trading
- unified: unified account

**»» time_in_force**: time_in_force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only

**»» text**: The source of the order, including:

- web: Web
- api: API call
- app: Mobile app

#### [#](#enumerated-values-27) Enumerated Values

| Parameter        | Value   |
| ---------------- | ------- |
| »» rule          | \>=     |
| »» rule          | <=      |
| »» type          | limit   |
| »» type          | market  |
| »» side          | buy     |
| »» side          | sell    |
| »» account       | normal  |
| »» account       | margin  |
| »» account       | unified |
| »» time_in_force | gtc     |
| »» time_in_force | ioc     |

> Example responses

> 201 Response

```
{
  "id": 1432329
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createspotpricetriggeredorder-responses](https://www.gate.io/docs/developers/apiv4/en/#createspotpricetriggeredorder-responses)

| Status | Meaning                                                                         | Description                | Schema |
| ------ | ------------------------------------------------------------------------------- | -------------------------- | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order created successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createspotpricetriggeredorder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createspotpricetriggeredorder-responseschema)

Status Code **201**

_TriggerOrderResponse_

| Name | Type           | Description   |
| ---- | -------------- | ------------- |
| » id | integer(int64) | Auto order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-running-auto-order-list) Query running auto order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-running-auto-order-list](https://www.gate.io/docs/developers/apiv4/en/#query-running-auto-order-list)

> Code samples
