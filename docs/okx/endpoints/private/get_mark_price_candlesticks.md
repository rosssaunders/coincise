# GET mark price candlesticks

Source: [https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks)

### Get mark price candlesticks

Retrieve the candlestick charts of mark price. This endpoint can retrieve the latest 1,440 data entries. Charts are returned in groups based on the requested bar.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/mark-price-candles`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. `BTC-USD-SWAP` |
| after | String | No | Pagination of data to return records earlier than the requested `ts` |
| before | String | No | Pagination of data to return records newer than the requested `ts`. The latest data will be returned when using `before` individually |
| bar | String | No | Bar size, the default is `1m`  
e.g. \[1m/3m/5m/15m/30m/1H/2H/4H\]  
UTC+8 opening price k-line: \[6H/12H/1D/1W/1M/3M\]  
UTC+0 opening price k-line: \[6Hutc/12Hutc/1Dutc/1Wutc/1Mutc/3Mutc\] |
| limit | String | No | Number of results per request. The maximum is `100`; The default is `100` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| o | String | Open price |
| h | String | highest price |
| l | String | Lowest price |
| c | String | Close price |
| confirm | String | The state of candlesticks.  
`0` represents that it is uncompleted, `1` represents that it is completed. |

The candlestick data may be incomplete, and should not be polled repeatedly.

The data returned will be arranged in an array like this: \[ts,o,h,l,c,confirm\]
