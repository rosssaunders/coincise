# POST /v2/auth/r/alerts

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-alerts](https://docs.bitfinex.com/reference/rest-auth-alerts)

post

https://api.bitfinex.com/v2/auth/r/alerts

Retrieve a list of active price alerts.

Response data

| Index   | Field       | Type                                  | Description                                            |
| ------- | ----------- | ------------------------------------- | ------------------------------------------------------ |
| [0...n] | ALERT_ARRAY | [Alert array](#alert-arrays-index-0n) | Each index contains one of the n current user's alerts |

Alert arrays (Index [0...n])

| Index | Field     | Type   | Description                                                                                                                                                    |
| ----- | --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [0]   | INFO      | String | 'type:pair:price'                                                                                                                                              |
| [1]   | TYPE      | String | Alert type ('price')                                                                                                                                           |
| [2]   | PAIR      | String | Pair on which the price alert is active (tBTCUSD, tBTCUST, ...)                                                                                                |
| [3]   | PRICE     | Float  | Alert price                                                                                                                                                    |
| [4]   | COUNTDOWN | Int    | This is set to 100 when the alert is placed. Each time the alert is triggered, this number will go down. When the countdown reaches 0, the alert gets removed. |

**Ratelimit**: 45 req/min

RAW_BODY
