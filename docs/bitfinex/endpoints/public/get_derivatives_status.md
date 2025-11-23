# GET /v2/status/deriv

**Source:** [https://docs.bitfinex.com/reference/rest-public-derivatives-status](https://docs.bitfinex.com/reference/rest-public-derivatives-status)

get

https://api-pub.bitfinex.com/v2/status/deriv

Endpoint used to receive different types of platform information - currently supports derivatives pair status only.

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | KEY | string | Requested key(s) |
| [1] | MTS | int | Millisecond epoch timestamp |
| [3] | DERIV\_PRICE | float | Derivative book mid price |
| [4] | SPOT\_PRICE | float | Book mid price of the underlying Bitfinex spot trading pair |
| [6] | INSURANCE\_FUND\_BALANCE | float | The balance available to the liquidation engine to absorb losses |
| [8] | NEXT\_FUNDING\_EVT\_MTS | int | Millisecond timestamp of next funding event |
| [9] | NEXT\_FUNDING\_ACCRUED | float | Current accrued funding for next 8h period |
| [10] | NEXT\_FUNDING\_STEP | int | Incremental accrual counter |
| [12] | CURRENT\_FUNDING | float | Funding applied in the current 8h period |
| [15] | MARK\_PRICE | float | Price based on the BFX Composite Index |
| [18] | OPEN\_INTEREST | float | Total number of outstanding derivative contracts |
| [22] | CLAMP\_MIN | float | Range in the average spread that does not require a funding payment |
| [23] | CLAMP\_MAX | float | Funding payment cap |

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

Query Params

keys

string

Defaults to tBTCF0:USTF0,tETHF0:USTF0

The key or keys (separate by commas) of the pairs to fetch status information. To fetch information for all pairs use the key value 'ALL'.

Response

curl \--request GET \\

     \--url 'https://api-pub.bitfinex.com/v2/status/deriv?keys=tBTCF0%3AUSTF0%2CtETHF0%3AUSTF0' \\

     \--header 'accept: application/json'
