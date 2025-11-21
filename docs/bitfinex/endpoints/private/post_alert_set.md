# Alert Set

post

https://api.bitfinex.com/v2/auth/w/alert/set

Sets up a price alert at the given value

Response data

| Index | Term      | Type   | Description                                                                                                                                                    |
| ----- | --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [0]   | INFO      | string | 'type:pair:price'                                                                                                                                              |
| [1]   | TYPE      | string | Alert type ('price')                                                                                                                                           |
| [2]   | PAIR      | string | Pair on which the price alert is active (tBTCUSD, tBTCUST, ...)                                                                                                |
| [3]   | PRICE     | float  | Alert price                                                                                                                                                    |
| [4]   | COUNTDOWN | int    | This is set to 100 when the alert is placed. Each time the alert is triggered, this number will go down. When the countdown reaches 0, the alert gets removed. |

**Ratelimit**: 90 req/min

Body Params

type

string

required

Specify the alert type ('price')

symbol

string

required

Specify the alert symbol (ex. 'tBTCUSD')

price

string

required

Specify the alert price (ex. '232.2')

count

integer

Set the number of times an alert can trigger (ex. 100)

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/alert/set \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-alert-set Path:
/v2/auth/w/alert/set Method: POST
