# GET /spot/order_book

**Source:**
[/spot/order_book](https://www.gate.io/docs/developers/apiv4/en/#listorderbook-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#get-market-depth-information) Get market depth information

`GET /spot/order_book`

_Get market depth information_

Market depth buy orders are sorted by price from high to low, sell orders are
sorted from low to high

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listorderbook-parameters](https://www.gate.io/docs/developers/apiv4/en/#listorderbook-parameters)

| Name          | In    | Type    | Required | Description                                                                                   |
| ------------- | ----- | ------- | -------- | --------------------------------------------------------------------------------------------- |
| currency_pair | query | string  | true     | Trading pair                                                                                  |
| interval      | query | string  | false    | Price precision for depth aggregation, 0 means no aggregation, defaults to 0 if not specified |
| limit         | query | integer | false    | Number of depth levels                                                                        |
| with_id       | query | boolean | false    | Return order book update ID                                                                   |

> Example responses

> 200 Response

```json
{
  "id": 123456,
  "current": 1623898993123,
  "update": 1623898993121,
  "asks": [
    ["1.52", "1.151"],
    ["1.53", "1.218"]
  ],
  "bids": [
    ["1.17", "201.863"],
    ["1.16", "725.464"]
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listorderbook-responses](https://www.gate.io/docs/developers/apiv4/en/#listorderbook-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listorderbook-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listorderbook-responseschema)

Status Code **200**

| Name      | Type           | Description                                                                                                    |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| » id      | integer(int64) | Order book ID, which is updated whenever the order book is changed. Valid only when `with_id` is set to `true` |
| » current | integer(int64) | The timestamp of the response data being generated (in milliseconds)                                           |
| » update  | integer(int64) | The timestamp of when the orderbook last changed (in milliseconds)                                             |
| » asks    | array          | Ask Depth                                                                                                      |
| »» _None_ | array          | Price and Quantity Pair                                                                                        |
| » bids    | array          | Bid Depth                                                                                                      |
| »» _None_ | array          | Price and Quantity Pair                                                                                        |

This operation does not require authentication

## [#](#query-market-transaction-records) Query market transaction records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-market-transaction-records](https://www.gate.io/docs/developers/apiv4/en/#query-market-transaction-records)

> Code samples
