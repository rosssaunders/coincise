# GET 【Public】Funding Rate Channel

**Source:** [【Public】Funding Rate Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】Funding Rate Channel

Return funding Rate data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and updates will be pushed every minute.

### Request

> Subscribe Request

`{   "action":"subscribe",   "args":["futures/fundingRate:BTCUSDT"] }`

> Funding rate data Request

`{   "action": "request",   "args":["futures/fundingRate:BTCUSDT"] }`

Message Format:

`{"action": "<op>", "args": ["<channel:symbol>"]}`

-   op: `subscribe`\=Subscribe, You will receive a message that the subscription is successful, and then you will receive funding rate data pushed every minute. `request`\=Single request for the latest funding rate data, You will receive a funding rate data immediately.
-   channel:Channel name, such as`futures/fundingRate`
-   symbol: Trading pair, such as`BTCUSDT`

### Response

> Funding rate data

`{     "data": {         "symbol": "BTCUSDT",         "fundingRate": "0.000098800809",         "fundingTime": 1732525864000,         "nextFundingRate": "0.0000947",         "nextFundingTime": 1732550400000,         "funding_upper_limit": "0.0375",         "funding_lower_limit": "-0.0375",         "ts": 1732525864601     },     "group": "futures/fundingRate:BTCUSDT" }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract (like `BTCUSDT`) |
| fundingRate | String | Current funding rate |
| fundingTime | Long | Funding time of the upcoming settlement, Unix timestamp format in milliseconds |
| nextFundingRate | String | Forecasted funding rate for the next period |
| nextFundingTime | Long | Forecasted funding time for the next period, Unix timestamp format in milliseconds |
| funding\_upper\_limit | String | The upper limit of the predicted funding rate of the next cycle |
| funding\_lower\_limit | String | The lower limit of the predicted funding rate of the next cycle |
| ts | Long | Data return time, Unix timestamp format in milliseconds |