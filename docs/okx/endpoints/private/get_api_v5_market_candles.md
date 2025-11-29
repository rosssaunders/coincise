# GET /api/v5/market/candles

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-candlesticks](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-candlesticks)

### GET / Candlesticks

Retrieve the candlestick charts. This endpoint can retrieve the latest 1,440
data entries. Charts are returned in groups based on the requested bar.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/candles`

#### Request Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT` |
| bar       | String | No       | Bar size, the default is `1m`  |

e.g. \[1m/3m/5m/15m/30m/1H/2H/4H\]  
UTC+8 opening price k-line: \[6H/12H/1D/2D/3D/1W/1M/3M\]  
UTC+0 opening price k-line: \[6Hutc/12Hutc/1Dutc/2Dutc/3Dutc/1Wutc/1Mutc/3Mutc\]
| | after | String | No | Pagination of data to return records earlier than the
requested `ts` | | before | String | No | Pagination of data to return records
newer than the requested `ts`. The latest data will be returned when using
`before` individually | | limit | String | No | Number of results per request.
The maximum is `300`. The default is `100`. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                              |
| ------------- | -------- | -------------------------------------------------------------------------------------------- |
| ts            | String   | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| o             | String   | Open price                                                                                   |
| h             | String   | highest price                                                                                |
| l             | String   | Lowest price                                                                                 |
| c             | String   | Close price                                                                                  |
| vol           | String   | Trading volume, with a unit of `contract`.                                                   |

If it is a `derivatives` contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in base currency. | | volCcy
| String | Trading volume, with a unit of `currency`.  
If it is a `derivatives` contract, the value is the number of base currency.  
If it is `SPOT`/`MARGIN`, the value is the quantity in quote currency. | |
volCcyQuote | String | Trading volume, the value is the quantity in quote
currency  
e.g. The unit is USDT for BTC-USDT and BTC-USDT-SWAP;  
The unit is USD for BTC-USD-SWAP | | confirm | String | The state of
candlesticks.  
`0`: K line is uncompleted  
`1`: K line is completed |

The first candlestick data may be incomplete, and should not be polled
repeatedly.

The data returned will be arranged in an array like this:
\[ts,o,h,l,c,vol,volCcy,volCcyQuote,confirm\].

For the current cycle of k-line data, when there is no transaction, the opening
high and closing low default take the closing price of the previous cycle.
