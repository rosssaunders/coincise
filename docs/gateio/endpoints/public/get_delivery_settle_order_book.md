# GET /delivery/{settle}/order_book

**Source:** [/delivery/{settle}/order_book](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorderbook-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-futures-market-depth-information-2) Query futures market depth information

`GET /delivery/{settle}/order_book`

_Query futures market depth information_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorderbook-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorderbook-parameters)

| Name     | In    | Type    | Required | Description                                                                                   |
| -------- | ----- | ------- | -------- | --------------------------------------------------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                                                               |
| contract | query | string  | true     | Futures contract                                                                              |
| interval | query | string  | false    | Price precision for depth aggregation, 0 means no aggregation, defaults to 0 if not specified |
| limit    | query | integer | false    | Number of depth levels                                                                        |
| with_id  | query | boolean | false    | Whether to return depth update ID. This ID increments by 1 each time depth changes            |

#### [#](#enumerated-values-88) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |
| interval  | 0     |
| interval  | 0.1   |
| interval  | 0.01  |

> Example responses

> 200 Response

```json
{
  "id": 123456,
  "current": 1623898993.123,
  "update": 1623898993.121,
  "asks": [
    {
      "p": "1.52",
      "s": 100
    },
    {
      "p": "1.53",
      "s": 40
    }
  ],
  "bids": [
    {
      "p": "1.17",
      "s": 150
    },
    {
      "p": "1.16",
      "s": 203
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorderbook-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorderbook-responses)

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Depth query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorderbook-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorderbook-responseschema)

Status Code **200**

| Name                        | Type           | Description                                                                                                    |
| --------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| » id                        | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set `with_id=true` to include this field in response |
| » current                   | number(double) | Response data generation timestamp                                                                             |
| » update                    | number(double) | Order book changed timestamp                                                                                   |
| » asks                      | array          | Ask Depth                                                                                                      |
| »» futures_order_book_item  | object         | none                                                                                                           |
| »»» p                       | string         | Price (quote currency)                                                                                         |
| »»» s                       | integer(int64) | Amount                                                                                                         |
| »» bids                     | array          | Bid Depth                                                                                                      |
| »»» futures_order_book_item | object         | none                                                                                                           |
| »»»» p                      | string         | Price (quote currency)                                                                                         |
| »»»» s                      | integer(int64) | Amount                                                                                                         |

This operation does not require authentication

## [#](#futures-market-transaction-records-2) Futures market transaction records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#futures-market-transaction-records-2](https://www.gate.io/docs/developers/apiv4/en/#futures-market-transaction-records-2)

> Code samples
