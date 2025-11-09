# GET historical market data

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-historical-market-data](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-historical-market-data)

### Get historical market data

**Data availability**  
Historical data backfill is currently in progress. Data availability may vary by
module, instrument, and time period. The dataset will be continuously expanded
to provide more comprehensive historical coverage.

**Legacy data format notice**  
For module 1 (trade history), some old historical files may contain column
headers with both Chinese characters along with English column names. All the
Chinese characters will be removed once the data backfill is done. Please
account for this when parsing the data.

**Data release schedule**  
Most data for modules 1, 2, 3 is typically available on T+2; order book data is
typically available on T+3.

Retrieve historical market data for OKX.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/market-data-history`

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| module    | String | Yes      | Data module type |

`1`: Trade history  
`2`: 1-minute candlestick  
`3`: Funding rate  
`6`: 50-level orderbook | | instType | String | Yes | Instrument type  
`SPOT`  
`FUTURES`  
`SWAP`  
`OPTION` | | instIdList | String | Conditional | List of instrument IDs, e.g.
`BTC-USDT`, or `ANY` for all instruments (`ANY` is only supported for module =
`1`, `2`, `3` & dateAggrType = `daily`)  
Multiple instrument IDs should be separated by commas, e.g.
`BTC-USDT,ETH-USDT`  
Maximum length = 10  
Only applicable when instType = `SPOT` | | instFamilyList | String | Conditional
| List of instrument families, e.g. `BTC-USDT`, or `ANY` for all instruments
(`ANY` is only supported for module = `1`, `2`, `3` & dateAggrType = `daily`)  
Multiple instrument families should be separated by commas, e.g.
`BTC-USDT,ETH-USDT`  
Maximum length = 10 (= 1when module = `6` & instType = `OPTION`)  
Only applicable when instType ≠ `SPOT` | | dateAggrType | String | Yes | Date
aggregation type  
`daily` (not supported for module = `3` & instFamilyList ≠ `ANY`)  
`monthly` (not supported for module = `6`) | | begin | String | Yes | Begin
timestamp. Unix timestamp format in milliseconds (inclusive)  
Maximum range: 20 days for daily, 20 months for monthly | | end | String | Yes |
End timestamp. Unix timestamp format in milliseconds (inclusive)  
When module = `6` & instType = `OPTION`, only returns data for the day specified
by `end` |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                           |
| ------------- | -------- | --------------------------------------------------------- |
| ts            | String   | Response timestamp, Unix timestamp format in milliseconds |
| totalSizeMB   | String   | Total size of all data files in MB                        |
| dateAggrType  | String   | Date aggregation type                                     |

`daily`  
`monthly` | | details | Array | | | \> instId | String | Instrument ID | | \>
instFamily | String | Instrument family | | \> dateRangeStart | String | Data
range start date, Unix timestamp format in milliseconds (inclusive) | | \>
dateRangeEnd | String | Data range end date, Unix timestamp format in
milliseconds (inclusive) | | \> groupSizeMB | String | Data group size in MB | |
\> groupDetails | Array | | | \>> filename | String | Data file name, e.g.
`BTC-USDT-SWAP-trades-2025-05-15.zip` | | \>> dataTs | String | Data date
timestamp, Unix timestamp format in milliseconds | | \>> sizeMB | String | File
size in MB | | \>> url | String | Download URL |

**Data query rules**  
• Only the date portion (yyyy-mm-dd) of timestamps is used; time components are
ignored  
• Both begin and end timestamps are inclusive  
• Data is returned in reverse chronological order (closer to end first)  
• If the query exceeds record limits, data closest to the end timestamp is
returned  
• **Exception:** When module = 6 & instType = OPTION, only data for the day
specified by the end is returned

**Timezone specifications for timestamp parsing**  
When converting Unix timestamps to dates, the following timezone conventions are
applied to all timestamp fields (begin, end, dateRangeStart, dateRangeEnd,
dataTs):  
• **Orderbook data** (module 6): UTC+0  
• **All other data modules** (modules 1, 2, 3): UTC+8
