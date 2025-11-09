# GET Get History K-Line (V3)

**Source:**
[Get History K-Line (V3)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get History K-Line (V3)

`Get k-line data within a specified time range of a specified trading pair. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe KLine channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/klines`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/klines?symbol=BMX_ETH&step=15&limit=10`

| Field                                                   | Type   | Required? | Description                                                                      |
| ------------------------------------------------------- | ------ | --------- | -------------------------------------------------------------------------------- |
| symbol                                                  | String | Yes       | Trading pair (e.g. `BMX_USDT`)                                                   |
| before                                                  | Long   | No        | Query timestamp (unit: second, e.g. 1525760116), query the data before this time |
| after                                                   | Long   | No        | Query timestamp (unit: second, e.g. 1525769116), query the data after this time  |
| step                                                    | Int    | No        | k-line step, value `[1, 5, 15, 30, 60,`                                          |
| `120, 240, 1440, 10080, 43200]` unit: minute, default 1 |
| limit                                                   | Int    | No        | Return number, the maximum value is 200, default is 100                          |

A total of four query modes are supported:  
1\. If only before is passed, check forward according to the time  
2\. If only after is passed, check backward according to the time  
3\. Both before and after need to verify whether the time interval is legal, and
if it is legal, check the interval  
4\. If neither before nor after is passed, the latest K-line will be returned in
reverse order

#### Response Data

> Response

`{   "code":1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data":[     [       "1689736680",  // t       "3.721",  // o       "3.743",  // h       "3.677",  // l       "3.708",  // c       "22698348.04828491",  // v       "12698348.04828491"  // qv     ],     [       "1689736620",       "3.731",       "3.799",       "3.494",       "3.72",       "67632347.24399722",       "37632347.24399722"     ]   ] }`

| Field | Type   | Description                                                                                    |
| ----- | ------ | ---------------------------------------------------------------------------------------------- |
| t     | String | Create timestamp (in seconds), It can be used as the unique identification of K line           |
| o     | String | Open price                                                                                     |
| h     | String | Highest price                                                                                  |
| l     | String | Lowest price                                                                                   |
| c     | String | Close price                                                                                    |
| v     | String | Trading volume, with a unit of currency (If in BTC_USDT, The unit is BTC)                      |
| qv    | String | Trading volume, the value is the quantity in quote currency (If in BTC_USDT, The unit is USDT) |
