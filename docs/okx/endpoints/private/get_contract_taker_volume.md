# GET contract taker volume

Source: [https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-taker-volume](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-contract-taker-volume)

### Get contract taker volume

Retrieve the contract taker volume for both buyers and sellers. This endpoint can retrieve the latest 1,440 data entries.  

For period=1D, the data time range is up to January 1, 2024; for other periods, the data time range is up to early February 2024.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/rubik/stat/taker-volume-contract`

#### Request parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | string | Yes | Instrument ID, eg: BTC-USDT-SWAP  
Only applicable to `FUTURES`, `SWAP` |
| period | string | No | Bar size, the default is `5m`, e.g. \[`5m/15m/30m/1H/2H/4H`\]  
UTC+8 opening price k-line:\[`6H/12H/1D/2D/3D/5D/1W/1M/3M`\]  
UTC+0 opening price k-line: \[`6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/5Dutc/1Wutc/1Mutc/3Mutc`\] |
| unit | string | No | The unit of buy/sell volume, the default is `1`  
`0`: Crypto  
`1`: Contracts  
`2`: U |
| end | string | No | return records earlier than the requested `ts` |
| begin | string | No | return records newer than the requested `ts` |
| limit | string | No | Number of results per request. The maximum is `100`. The default is `100`. |

#### Response parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ts | String | Timestamp, millisecond format of Unix timestamp, e.g. `1597026383085` |
| sellVol | String | taker sell volume |
| buyVol | String | taker buy volume |

The data returned will be arranged in an array like this: \[ts, sellVol, buyVol\].
