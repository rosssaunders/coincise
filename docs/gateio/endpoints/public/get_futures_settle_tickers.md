# GET /futures/{settle}/tickers

**Source:**
[/futures/{settle}/tickers](https://www.gate.io/docs/developers/apiv4/en/#listfuturestickers-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#get-all-futures-trading-statistics) Get all futures trading statistics

`GET /futures/{settle}/tickers`

_Get all futures trading statistics_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturestickers-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturestickers-parameters)

| Name     | In    | Type   | Required | Description                                             |
| -------- | ----- | ------ | -------- | ------------------------------------------------------- |
| settle   | path  | string | true     | Settle currency                                         |
| contract | query | string | false    | Futures contract, return related data only if specified |

#### [#](#enumerated-values-36) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "contract": "BTC_USDT",
    "last": "6432",
    "low_24h": "6278",
    "high_24h": "6790",
    "change_percentage": "4.43",
    "total_size": "32323904",
    "volume_24h": "184040233284",
    "volume_24h_btc": "28613220",
    "volume_24h_usd": "184040233284",
    "volume_24h_base": "28613220",
    "volume_24h_quote": "184040233284",
    "volume_24h_settle": "28613220",
    "mark_price": "6534",
    "funding_rate": "0.0001",
    "funding_rate_indicative": "0.0001",
    "index_price": "6531",
    "highest_bid": "34089.7",
    "highest_size": "100",
    "lowest_ask": "34217.9",
    "lowest_size": "1000"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturestickers-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturestickers-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturestickers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listfuturestickers-responseschema)

Status Code **200**

| Name                      | Type   | Description                                                                                                            |
| ------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| » contract                | string | Futures contract                                                                                                       |
| » last                    | string | Last trading price                                                                                                     |
| » change_percentage       | string | Price change percentage. Negative values indicate price decrease, e.g. -7.45                                           |
| » total_size              | string | Contract total size                                                                                                    |
| » low_24h                 | string | 24-hour lowest price                                                                                                   |
| » high_24h                | string | 24-hour highest price                                                                                                  |
| » volume_24h              | string | 24-hour trading volume                                                                                                 |
| » volume_24h_btc          | string | 24-hour trading volume in BTC (deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead)     |
| » volume_24h_usd          | string | 24-hour trading volume in USD (deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead)     |
| » volume_24h_base         | string | 24-hour trading volume in base currency                                                                                |
| » volume_24h_quote        | string | 24-hour trading volume in quote currency                                                                               |
| » volume_24h_settle       | string | 24-hour trading volume in settle currency                                                                              |
| » mark_price              | string | Recent mark price                                                                                                      |
| » funding_rate            | string | Funding rate                                                                                                           |
| » funding_rate_indicative | string | Indicative Funding rate in next period. (deprecated. use `funding_rate`)                                               |
| » index_price             | string | Index price                                                                                                            |
| » quanto_base_rate        | string | Exchange rate of base currency and settlement currency in Quanto contract. Does not exists in contracts of other types |
| » lowest_ask              | string | Recent lowest ask                                                                                                      |
| » lowest_size             | string | The latest seller's lowest price order quantity                                                                        |
| » highest_bid             | string | Recent highest bid                                                                                                     |
| » highest_size            | string | The latest buyer's highest price order volume                                                                          |
| » change_utc0             | string | utc0 涨跌百分比，跌用负数标识，如 -7.45                                                                                |
| » change_utc8             | string | utc8 涨跌百分比，跌用负数标识，如 -7.45                                                                                |
| » change_price            | string | 24h 涨跌额，跌用负数标识，如 -7.45                                                                                     |
| » change_utc0_price       | string | utc0 涨跌额，跌用负数标识，如 -7.45                                                                                    |
| » change_utc8_price       | string | utc8 涨跌额，跌用负数标识，如 -7.45                                                                                    |

This operation does not require authentication

## [#](#futures-market-historical-funding-rate) Futures market historical funding rate

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#futures-market-historical-funding-rate](https://www.gate.io/docs/developers/apiv4/en/#futures-market-historical-funding-rate)

> Code samples
