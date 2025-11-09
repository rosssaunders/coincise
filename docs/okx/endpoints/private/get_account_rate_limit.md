# GET / Account rate limit

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-account-rate-limit](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-account-rate-limit)

### GET / Account rate limit

Get account rate limit related information.

Only new order requests and amendment order requests will be counted towards
this limit. For batch order requests consisting of multiple orders, each order
will be counted individually.

For details, please refer to
[Fill ratio based sub-account rate limit](/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit)

#### Rate Limit: 1 request per second

#### Rate limit rule: User ID

#### HTTP Request

`GET /api/v5/trade/account-rate-limit`

#### Request Parameters

None

#### Response Parameters

| Parameter | Type   | Description                                         |
| --------- | ------ | --------------------------------------------------- |
| fillRatio | String | Sub account fill ratio during the monitoring period |

Applicable for users with trading fee level >= VIP 5 and return "" for others  
For accounts with no trading volume during the monitoring period, return "0".
For accounts with trading volume but no order count due to our counting logic,
return "9999". | | mainFillRatio | String | Master account aggregated fill ratio
during the monitoring period  
Applicable for users with trading fee level >= VIP 5 and return "" for others  
For accounts with no trading volume during the monitoring period, return "0" | |
accRateLimit | String | Current sub-account rate limit per two seconds | |
nextAccRateLimit | String | Expected sub-account rate limit (per two seconds) in
the next period  
Applicable for users with trading fee level >= VIP 5 and return "" for others |
| ts | String | Data update time  
For users with trading fee level >= VIP 5, the data will be generated at 08:00
am (UTC)  
For users with trading fee level < VIP 5, return the current timestamp |
