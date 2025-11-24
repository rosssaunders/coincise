# GET /spot/tickers

**Source:**
[/spot/tickers](https://www.gate.io/docs/developers/apiv4/en/#listtickers-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#get-currency-pair-ticker-information) Get currency pair ticker information

`GET /spot/tickers`

_Get currency pair ticker information_

If `currency_pair` is specified, only query that currency pair; otherwise return
all information

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listtickers-parameters](https://www.gate.io/docs/developers/apiv4/en/#listtickers-parameters)

| Name          | In    | Type   | Required | Description  |
| ------------- | ----- | ------ | -------- | ------------ |
| currency_pair | query | string | false    | Trading pair |
| timezone      | query | string | false    | Timezone     |

#### [#](#enumerated-values-12) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| timezone  | utc0  |
| timezone  | utc8  |
| timezone  | all   |

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "BTC3L_USDT",
    "last": "2.46140352",
    "lowest_ask": "2.477",
    "highest_bid": "2.4606821",
    "change_percentage": "-8.91",
    "change_utc0": "-8.91",
    "change_utc8": "-8.91",
    "base_volume": "656614.0845820589",
    "quote_volume": "1602221.66468375534639404191",
    "high_24h": "2.7431",
    "low_24h": "1.9863",
    "etf_net_value": "2.46316141",
    "etf_pre_net_value": "2.43201848",
    "etf_pre_timestamp": 1611244800,
    "etf_leverage": "2.2803019447281203"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listtickers-responses](https://www.gate.io/docs/developers/apiv4/en/#listtickers-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listtickers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listtickers-responseschema)

Status Code **200**

| Name                | Type           | Description                                                                                                            |
| ------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| » currency_pair     | string         | Trading pair                                                                                                           |
| » last              | string         | Last trading price                                                                                                     |
| » lowest_ask        | string         | Recent lowest ask                                                                                                      |
| » lowest_size       | string         | Latest seller's lowest price quantity; not available for batch queries; available for single queries, empty if no data |
| » highest_bid       | string         | Recent highest bid                                                                                                     |
| » highest_size      | string         | Latest buyer's highest price quantity; not available for batch queries; available for single queries, empty if no data |
| » change_percentage | string         | 24h price change percentage (negative for decrease, e.g., -7.45)                                                       |
| » change_utc0       | string         | UTC+0 timezone, 24h price change percentage, negative for decline (e.g., -7.45)                                        |
| » change_utc8       | string         | UTC+8 timezone, 24h price change percentage, negative for decline (e.g., -7.45)                                        |
| » base_volume       | string         | Base currency trading volume in the last 24h                                                                           |
| » quote_volume      | string         | Quote currency trading volume in the last 24h                                                                          |
| » high_24h          | string         | 24h High                                                                                                               |
| » low_24h           | string         | 24h Low                                                                                                                |
| » etf_net_value     | string         | ETF net value                                                                                                          |
| » etf_pre_net_value | string         | null                                                                                                                   | ETF net value at previous rebalancing point |
| » etf_pre_timestamp | integer(int64) | null                                                                                                                   | ETF previous rebalancing time               |
| » etf_leverage      | string         | null                                                                                                                   | ETF current leverage                        |

This operation does not require authentication

## [#](#get-market-depth-information) Get market depth information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-market-depth-information](https://www.gate.io/docs/developers/apiv4/en/#get-market-depth-information)

> Code samples
