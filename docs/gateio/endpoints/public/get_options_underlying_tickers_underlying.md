# GET /options/underlying/tickers/{underlying}

**Source:**
[/options/underlying/tickers/{underlying}](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingtickers-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-underlying-ticker-information) Query underlying ticker information

`GET /options/underlying/tickers/{underlying}`

_Query underlying ticker information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingtickers-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingtickers-parameters)

| Name       | In   | Type   | Required | Description |
| ---------- | ---- | ------ | -------- | ----------- |
| underlying | path | string | true     | Underlying  |

> Example responses

> 200 Response

```
{
  "trade_put": 33505,
  "trade_call": 123,
  "index_price": "76543.3"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingtickers-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingtickers-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingtickers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionsunderlyingtickers-responseschema)

Status Code **200**

_Options underlying detail_

| Name          | Type           | Description                                  |
| ------------- | -------------- | -------------------------------------------- |
| » trade_put   | integer(int64) | Total put options trades amount in last 24h  |
| » trade_call  | integer(int64) | Total call options trades amount in last 24h |
| » index_price | string         | Index price (quote currency)                 |

This operation does not require authentication

## [#](#options-contract-market-candlestick-chart) Options contract market candlestick chart

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#options-contract-market-candlestick-chart](https://www.gate.io/docs/developers/apiv4/en/#options-contract-market-candlestick-chart)

> Code samples
