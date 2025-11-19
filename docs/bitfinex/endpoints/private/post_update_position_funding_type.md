# Update Position Funding Type

post https://api.bitfinex.com/v2/auth/w/position/update/funding/type

Update the funding type of a given position

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | int | Seconds epoch timestamp of notification |
| [1] | TYPE | string | Notification's type ("puft-req") |
[ . . . ]

| [6] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7] | TEXT | string | Additional notification description |

Body Params

symbol

string

Trading pair for which you wish to change the funding type

type

integer

Provide the desired funding type setting (0 for daily and 1 for term funding)

Response

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/position/update/funding/type \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json'

---
Section: Positions
Source: https://docs.bitfinex.com/reference/update-position-funding-type
Path: /v2/auth/w/position/update/funding/type
Method: POST
