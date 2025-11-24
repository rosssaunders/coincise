# GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract-top-trader

Source:
[https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio)

### Get top traders contract long/short ratio

Retrieve the account net long/short ratio of a contract for top traders. Top
traders refer to the top 5% of traders with the largest open position value.
This endpoint can retrieve the latest 1,440 data entries. The data time range is
up to March 22, 2024.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/rubik/stat/contracts/long-short-account-ratio-contract-top-trader`

#### Request parameters

| Parameter                            | Type   | Required | Description                                                   |
| ------------------------------------ | ------ | -------- | ------------------------------------------------------------- |
| instId                               | string | Yes      | Instrument ID, eg: BTC-USDT-SWAP                              |
| Only applicable to `FUTURES`, `SWAP` |
| period                               | string | No       | Bar size, the default is `5m`, e.g. \[`5m/15m/30m/1H/2H/4H`\] |

UTC+8 opening price k-line: \[`6H/12H/1D/2D/3D/5D/1W/1M/3M`\]  
UTC+0 opening price k-line:
\[`6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc`\] | | end | string |
No | return records earlier than the requested `ts` | | begin | string | No |
return records newer than the requested `ts` | | limit | string | No | Number of
results per request. The maximum is `100`. The default is `100`. |

#### Response parameters

| Parameter          | Type   | Description                                                           |
| ------------------ | ------ | --------------------------------------------------------------------- |
| ts                 | String | Timestamp, millisecond format of Unix timestamp, e.g. `1597026383085` |
| longShortAcctRatio | String | Long/short account num ratio of top traders                           |

The data returned will be arranged in an array like this: \[ts,
longShortAcctRatio\].
