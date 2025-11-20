# Alert List

# Alert List

post https://api.bitfinex.com/v2/auth/r/alerts

Retrieve a list of active price alerts.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index     | Field       | Type                                  | Description                                            |
| --------- | ----------- | ------------------------------------- | ------------------------------------------------------ |
| \[0...n\] | ALERT_ARRAY | [Alert array](#alert-arrays-index-0n) | Each index contains one of the n current user's alerts |

####

Alert arrays (Index \[0...n\])

[](#alert-arrays-index-0n)

| Index | Field     | Type   | Description                                                                                                                                                    |
| ----- | --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \[0\] | INFO      | String | 'type:pair:price'                                                                                                                                              |
| \[1\] | TYPE      | String | Alert type ('price')                                                                                                                                           |
| \[2\] | PAIR      | String | Pair on which the price alert is active (tBTCUSD, tBTCUST, ...)                                                                                                |
| \[3\] | PRICE     | Float  | Alert price                                                                                                                                                    |
| \[4\] | COUNTDOWN | Int    | This is set to 100 when the alert is placed. Each time the alert is triggered, this number will go down. When the countdown reaches 0, the alert gets removed. |

**Ratelimit**: 45 req/min

[](#body-params)Body Params

RAW_BODY

json

Defaults to {}

{}

[](#response-schemas)Responses

#

200

200

[](#restauthalerts-string-response-body)Response body

json

#

400

400

[](#restauthalerts-object-response-body)Response body

object

Updated 2 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/alerts \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 2 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-alerts Path: /v2/auth/r/alerts
Method: POST
