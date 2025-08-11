# OKX API Documentation - Trading Statistics

### Get support coin [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-support-coin "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-support-coin")

Retrieve the currencies supported by the trading statistics endpoints.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/trading-data/support-coin`

#### Response Parameters

| **Parameter** | **Type**         | **Description**                                |
| ------------- | ---------------- | ---------------------------------------------- |
| contract      | Array of strings | Currency supported by derivatives trading data |
| option        | Array of strings | Currency supported by option trading data      |
| spot          | Array of strings | Currency supported by spot trading data        |

---

### Get contract open interest history [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-open-interest-history "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-open-interest-history")

Retrieve the contract open interest statistics of futures and perp. This
endpoint can retrieve the latest 1,440 data entries.

For period=1D, the data time range is up to January 1, 2024; for other periods,
the data time range is up to early February 2024.

#### Rate limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/open-interest-history`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId    | string | Yes      | Instrument ID, eg: BTC-USDT-SWAP<br>Only applicable to <code>FUTURES</code>, <code>SWAP</code>                                                                                                                                                                   |
| period    | string | No       | Bar size, the default is <code>5m</code>, e.g. [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8 opening price k-line: [<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0 opening price k-line: [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>] |
| end       | string | No       | Pagination of data to return records earlier than the requested <code>ts</code>                                                                                                                                                                                  |
| begin     | string | No       | return records newer than the requested <code>ts</code>                                                                                                                                                                                                          |
| limit     | string | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                                                                                                                                 |

#### Response parameters

| Parameter | Type   | Description                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------- |
| ts        | String | Timestamp, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> |
| oi        | String | Open interest in the unit of contracts                                           |
| oiCcy     | String | Open interest in the unit of crypto                                              |
| oiUsd     | String | Open interest in the unit of USD                                                 |

The data returned will be arranged in an array like this: \[ts, oi, oiCcy,
oiUsd\].

---

### Get taker volume [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-volume "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-volume")

Retrieve the taker volume for both buyers and sellers.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/taker-volume`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                    |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ccy       | String | Yes      | Currency                                                                                                                                                                                                                                                                                                                       |
| instType  | String | Yes      | Instrument type<br><code>SPOT</code><br><code>CONTRACTS</code>                                                                                                                                                                                                                                                                 |
| begin     | String | No       | Begin time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                             |
| end       | String | No       | End time, Unix timestamp format in milliseconds, e.g. <code>1597026383011</code>                                                                                                                                                                                                                                               |
| period    | String | No       | Period, the default is <code>5m</code>, e.g. [<code>5m</code>/<code>1H</code>/<code>1D</code>]<br><code>5m</code> granularity can only query data within two days at most<br><code>1H</code> granularity can only query data within 30 days at most<br><code>1D</code> granularity can only query data within 180 days at most |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| ts            | String   | Timestamp       |
| sellVol       | String   | Sell volume     |
| buyVol        | String   | Buy volume      |

The return value array order is: \[ts,sellVol,buyVol\]

---

### Get contract taker volume [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-taker-volume "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-taker-volume")

Retrieve the contract taker volume for both buyers and sellers. This endpoint
can retrieve the latest 1,440 data entries.

For period=1D, the data time range is up to January 1, 2024; for other periods,
the data time range is up to early February 2024.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/rubik/stat/taker-volume-contract`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                     |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId    | string | Yes      | Instrument ID, eg: BTC-USDT-SWAP<br>Only applicable to <code>FUTURES</code>, <code>SWAP</code>                                                                                                                                                                  |
| period    | string | No       | Bar size, the default is <code>5m</code>, e.g. [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8 opening price k-line:[<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0 opening price k-line: [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>] |
| unit      | string | No       | The unit of buy/sell volume, the default is <code>1</code><br><code>0</code>: Crypto<br><code>1</code>: Contracts<br><code>2</code>: U                                                                                                                          |
| end       | string | No       | return records earlier than the requested <code>ts</code>                                                                                                                                                                                                       |
| begin     | string | No       | return records newer than the requested <code>ts</code>                                                                                                                                                                                                         |
| limit     | string | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                                                                                                                                |

#### Response parameters

| Parameter | Type   | Description                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------- |
| ts        | String | Timestamp, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> |
| sellVol   | String | taker sell volume                                                                |
| buyVol    | String | taker buy volume                                                                 |

The data returned will be arranged in an array like this: \[ts, sellVol,
buyVol\].

---

### Get margin long/short ratio [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-margin-long-short-ratio "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-margin-long-short-ratio")

Retrieve the ratio of cumulative amount of quote currency to base currency.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/margin/loan-ratio`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | Currency                                                                                                                                                                                                                                                                                                                                                                                              |
| begin     | String | No       | Begin time, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                           |
| end       | String | No       | End time, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                             |
| period    | String | No       | Period<br><code>m</code>: Minute, <code>H</code>: Hour, <code>D</code>: Day<br>the default is <code>5m</code>, e.g. [<code>5m</code>/<code>1H</code>/<code>1D</code>]<br><code>5m</code> granularity can only query data within two days at most<br><code>1H</code> granularity can only query data within 30 days at most<br><code>1D</code> granularity can only query data within 180 days at most |

#### Response Parameters

| **Parameter** | **Type** | **Description**      |
| ------------- | -------- | -------------------- |
| ts            | String   | Timestamp            |
| ratio         | String   | Margin lending ratio |

The return value array order is: \[ts,ratio\]

---

### Get top traders contract long/short ratio [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio")

Retrieve the account net long/short ratio of a contract for top traders. Top
traders refer to the top 5% of traders with the largest open position value.
This endpoint can retrieve the latest 1,440 data entries. The data time range is
up to March 22, 2024.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract-top-trader`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId    | string | Yes      | Instrument ID, eg: BTC-USDT-SWAP<br>Only applicable to <code>FUTURES</code>, <code>SWAP</code>                                                                                                                                                                   |
| period    | string | No       | Bar size, the default is <code>5m</code>, e.g. [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8 opening price k-line: [<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0 opening price k-line: [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>] |
| end       | string | No       | return records earlier than the requested <code>ts</code>                                                                                                                                                                                                        |
| begin     | string | No       | return records newer than the requested <code>ts</code>                                                                                                                                                                                                          |
| limit     | string | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                                                                                                                                 |

#### Response parameters

| Parameter          | Type   | Description                                                                      |
| ------------------ | ------ | -------------------------------------------------------------------------------- |
| ts                 | String | Timestamp, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> |
| longShortAcctRatio | String | Long/short account num ratio of top traders                                      |

The data returned will be arranged in an array like this: \[ts,
longShortAcctRatio\].

---

### Get top traders contract long/short ratio (by position) [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio-by-position "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio-by-position")

Retrieve the position long/short ratio of a contract for top traders. Top
traders refer to the top 5% of traders with the largest open position value.
This endpoint can retrieve the latest 1,440 data entries. The data time range is
up to March 22, 2024.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/long-short-position-ratio-contract-top-trader`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId    | string | Yes      | Instrument ID, e.g. <code>BTC-USDT-SWAP</code><br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>                                                                                                                                                      |
| period    | string | No       | Bar size, the default is <code>5m</code>, e.g. [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8 opening price k-line: [<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0 opening price k-line: [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>] |
| end       | string | No       | return records earlier than the requested <code>ts</code>                                                                                                                                                                                                        |
| begin     | string | No       | return records newer than the requested <code>ts</code>                                                                                                                                                                                                          |
| limit     | string | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                                                                                                                                 |

#### Response parameters

| Parameter         | Type   | Description                                                                      |
| ----------------- | ------ | -------------------------------------------------------------------------------- |
| ts                | String | Timestamp, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> |
| longShortPosRatio | String | Long/short position ratio of top traders                                         |

The data returned will be arranged in an array like this: \[ts,
longShortPosRatio\].

---

### Get contract long/short ratio [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-long-short-ratio "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-long-short-ratio")

Retrieve the account long/short ratio of a contract. This endpoint can retrieve
the latest 1,440 data entries.

For period=1D, the data time range is up to January 1, 2024; for other periods,
the data time range is up to early February 2024.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                     |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId    | string | Yes      | Instrument ID, eg: BTC-USDT-SWAP<br>Only applicable to <code>FUTURES</code>, <code>SWAP</code>                                                                                                                                                                  |
| period    | string | No       | Bar size, the default is <code>5m</code>, e.g. [<code>5m/15m/30m/1H/2H/4H</code>]<br>UTC+8 opening price k-line:[<code>6H/12H/1D/2D/3D/5D/1W/1M/3M</code>]<br>UTC+0 opening price k-line: [<code>6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc</code>] |
| end       | string | No       | return records earlier than the requested <code>ts</code>                                                                                                                                                                                                       |
| begin     | string | No       | return records newer than the requested <code>ts</code>                                                                                                                                                                                                         |
| limit     | string | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                                                                                                                                |

#### Response parameters

| Parameter          | Type   | Description                                                                      |
| ------------------ | ------ | -------------------------------------------------------------------------------- |
| ts                 | String | Timestamp, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> |
| longShortAcctRatio | String | Long/short position num ratio of all traders                                     |

The data returned will be arranged in an array like this: \[ts,
longAcctPosRatio\].

---

### Get long/short ratio [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-long-short-ratio "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-long-short-ratio")

Retrieve the ratio of users with net long vs net short positions for Expiry
Futures and Perpetual Futures.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                          |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | Currency                                                                                                                                                                                                                                                                                             |
| begin     | String | No       | Begin time, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                          |
| end       | String | No       | End time, e.g. <code>1597026383011</code>                                                                                                                                                                                                                                                            |
| period    | String | No       | Period, the default is <code>5m</code>, e.g. [<code>5m/1H/1D</code>]<br><code>5m</code> granularity can only query data within two days at most<br><code>1H</code> granularity can only query data within 30 days at most<br><code>1D</code> granularity can only query data within 180 days at most |

#### Response Parameters

| **Parameter** | **Type** | **Description**  |
| ------------- | -------- | ---------------- |
| ts            | String   | Timestamp        |
| ratio         | String   | Long/Short ratio |

The return value array order is: \[ts,ratio\]

---

### Get contracts open interest and volume [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contracts-open-interest-and-volume "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contracts-open-interest-and-volume")

Retrieve the open interest and trading volume for Expiry Futures and Perpetual
Futures.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/open-interest-volume`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                          |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | Currency                                                                                                                                                                                                                                                                                             |
| begin     | String | No       | Begin time, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                          |
| end       | String | No       | End time, e.g. <code>1597026383011</code>                                                                                                                                                                                                                                                            |
| period    | String | No       | Period, the default is <code>5m</code>, e.g. [<code>5m/1H/1D</code>]<br><code>5m</code> granularity can only query data within two days at most<br><code>1H</code> granularity can only query data within 30 days at most<br><code>1D</code> granularity can only query data within 180 days at most |

#### Response Parameters

| **Parameter** | **Type** | **Description**             |
| ------------- | -------- | --------------------------- |
| ts            | String   | Timestamp                   |
| oi            | String   | Total open interest（USD）  |
| vol           | String   | Total trading volume（USD） |

The return value array order is: \[ts,oi,vol\]

---

### Get options open interest and volume [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-options-open-interest-and-volume "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-options-open-interest-and-volume")

Retrieve the open interest and trading volume for options.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                            |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | Currency                                                                                                                               |
| period    | String | No       | Period, the default is <code>8H</code>. e.g. [<code>8H/1D</code>]<br>Each granularity can only query 72 pieces of data at the earliest |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                        |
| ------------- | -------- | ---------------------------------------------------------------------- |
| ts            | String   | Timestamp                                                              |
| oi            | String   | Total open interest , unit in <code>ccy</code> (in request parameter)  |
| vol           | String   | Total trading volume , unit in <code>ccy</code> (in request parameter) |

The return value array order is: \[ts,oi,vol\]

---

### Get put/call ratio [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-put-call-ratio "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-put-call-ratio")

Retrieve the open interest ratio and trading volume ratio of calls vs puts.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume-ratio`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                            |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | Currency                                                                                                                               |
| period    | String | No       | Period, the default is <code>8H</code>. e.g. [<code>8H/1D</code>]<br>Each granularity can only query 72 pieces of data at the earliest |

#### Response Parameters

| **Parameter** | **Type** | **Description**                   |
| ------------- | -------- | --------------------------------- |
| ts            | String   | Timestamp of data generation time |
| oiRatio       | String   | Long/Short open interest ratio    |
| volRatio      | String   | Long/Short trading volume ratio   |

The return value array order is: \[ts,oiRatio,volRatio\]

---

### Get open interest and volume (expiry) [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-expiry "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-expiry")

Retrieve the open interest and trading volume of calls and puts for each
upcoming expiration.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume-expiry`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                     |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | Currency                                                                                                                        |
| period    | String | No       | Period, the default is <code>8H</code>. e.g. [<code>8H/1D</code>]<br>Each granularity can provide only one latest piece of data |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                       |
| ------------- | -------- | ------------------------------------------------------------------------------------- |
| ts            | String   | Timestamp                                                                             |
| expTime       | String   | Contract expiry date, the format is <code>YYYYMMDD</code>, e.g. <code>20210623</code> |
| callOI        | String   | Total call open interest (<code>coin</code> as the unit)                              |
| putOI         | String   | Total put open interest (<code>coin</code> as the unit)                               |
| callVol       | String   | Total call trading volume (<code>coin</code> as the unit)                             |
| putVol        | String   | Total put trading volume (<code>coin</code> as the unit)                              |

The return value array order is: \[ts,expTime,callOI,putOI,callVol,putVol\]

---

### Get open interest and volume (strike) [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-strike "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-open-interest-and-volume-strike")

Retrieve the taker volume for both buyers and sellers of calls and puts.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume-strike`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                     |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | Currency                                                                                                                        |
| expTime   | String | Yes      | Contract expiry date, the format is <code>YYYYMMdd</code>, e.g. <code>20210623</code>                                           |
| period    | String | No       | Period, the default is <code>8H</code>. e.g. [<code>8H/1D</code>]<br>Each granularity can provide only one latest piece of data |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                           |
| ------------- | -------- | --------------------------------------------------------- |
| ts            | String   | Timestamp                                                 |
| strike        | String   | Strike price                                              |
| callOI        | String   | Total call open interest (<code>coin</code> as the unit)  |
| putOI         | String   | Total put open interest (<code>coin</code> as the unit)   |
| callVol       | String   | Total call trading volume (<code>coin</code> as the unit) |
| putVol        | String   | Total put trading volume (<code>coin</code> as the unit)  |

The return value array order is: \[ts,strike,callOI,putOI,callVol,putVol\]

---

### Get taker flow [🔗](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-flow "Direct link to: https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-flow")

This shows the relative buy/sell volume for calls and puts. It shows whether
traders are bullish or bearish on price and volatility.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/taker-block-volume`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                     |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | Yes      | currency                                                                                                                        |
| period    | String | No       | period, the default is <code>8H</code>. e.g. [<code>8H/1D</code>]<br>Each granularity can provide only one latest piece of data |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                 |
| ------------- | -------- | ----------------------------------------------- |
| ts            | String   | Timestamp                                       |
| callBuyVol    | String   | call option buy volume, in settlement currency  |
| callSellVol   | String   | call option sell volume, in settlement currency |
| putBuyVol     | String   | put option buy volume, in settlement currency   |
| putSellVol    | String   | put option sell volume, in settlement currency  |
| callBlockVol  | String   | call block volume                               |
| putBlockVol   | String   | put block volume                                |

The return value array order is:
\[ts,callBuyVol,callSellVol,putBuyVol,putSellVol,callBlockVol,putBlockVol\]

---
