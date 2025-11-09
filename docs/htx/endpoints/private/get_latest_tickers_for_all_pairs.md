# GET Latest Tickers for All Pairs

**Source:**
[Get Latest Tickers for All Pairs](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4a808-7773-11ed-9966-0242ac110003)

**Category:** Market Data

## Authentication

Required (Private Endpoint)

### /market/tickers ( Get Latest Tickers for All Pairs)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the latest tickers for all
supported pairs.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                    | Value Range |
| ---------- | --------- | -------- | -------------------------------------------------------------- | ----------- |
| status     | string    | false    | Request Processing Result "ok","error"                         |             |
| ts         | long      | false    | Time of Respond Generation, Unit: Millisecond                  |             |
| DATA_START | object    | false    |                                                                |             |
| amount     | float     | false    | The aggregated trading volume in last 24 hours (rotating 24h)  |             |
| count      | integer   | false    | The number of completed trades of last 24 hours (rotating 24h) |             |
| open       | float     | false    | The opening price of a nature day (Singapore time)             |             |
| close      | float     | false    | The closing price of a nature day (Singapore time)             |             |
| low        | float     | false    | The lowest price of a nature day (Singapore time)              |             |
| high       | float     | false    | The highest price of a nature day (Singapore time)             |             |
| vol        | float     | false    | The aggregated trading value in last 24 hours (rotating 24h)   |             |
| symbol     | string    | false    | The trading symbol of this object, e.g. btcusdt, bccbtc        |             |
| bid        | float     | false    | Best bid price                                                 |             |
| bidSize    | float     | false    | Best bid size                                                  |             |
| ask        | float     | false    | Best ask price                                                 |             |
| askSize    | float     | false    | Best ask size                                                  |             |
| DATA_END   |           | false    |                                                                |             |

#### Request example

`curl"https://api.huobi.pro/market/tickers"`

#### Response Example

##### Success Example

{

"status":

"ok"

"ts":

1629789355531

"data":\[

0:{

"symbol":

"smtusdt"

"open":

0.004659

"high":

0.004696

"low":

0.0046

"close":

0.00468

"amount":

36551302.17544405

"vol":

170526.0643855023

"count":

1709

"bid":

0.004651

"bidSize":

54300.341

"ask":

0.004679

"askSize":

1923.4879

}

1:{

"symbol":

"ltcht"

"open":

12.795626

"high":

12.918053

"low":

12.568926

"close":

12.918053

"amount":

1131.801675005825

"vol":

14506.9381937385

"count":

923

"bid":

12.912687

"bidSize":

0.1068

"ask":

12.927032

"askSize":

5.3228

}

\]

}
