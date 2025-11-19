# Ledgers

post https://api.bitfinex.com/v2/auth/r/ledgers/{Currency}/hist

View your past ledger entries. Most recent entries are returned by default, but a timestamp can be used to retrieve time-specific data.

The endpoint returns data up to 6 years old.

> 🚧
> 
> ### 
> 
> Retrieve all ledgers
> 
> 
> 
> The currency param can be omitted to return a ledger including all currencies. The path for this call is 'v2/auth/r/ledgers/hist'.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | LEDGER\_ENTRY | [Ledger entry](#ledger-entry-arrays) | Each index contains one of the `n` current user's ledger entries. |

Ledger entry arrays

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | int | Ledger identifier |
| [1] | CURRENCY | string | The symbol of the currency (e.g. "BTC") |
| [2] | WALLET | string (or null) | Returns the relevant wallet for the ledger entry ('exchange', 'margin', 'funding', 'contribution') |
| [3] | MTS | int | Timestamp in milliseconds |
| [5] | AMOUNT | float | Amount changed |
| [6] | BALANCE | float | Balance after change |
| [8] | DESCRIPTION | string | Description of ledger transaction |

Possible values for the 'category' filter

This table shows the possible values for the 'category' body param. The table shows the filter followed by the int value that should be entered in the 'category' param to activate the filter.

| Filter | Int Value | Filter | Int Value | Filter | Int Value |
| --- | --- | --- | --- | --- | --- |
| exchange | 5 | canceled withdrawal | 105 | withdrawal fee | 254 |
| position modified, closed, or liquidated | 22 | trading fee | 201 | withdrawal express fee | 255 |
| position claim | 23 | trading rebate | 202 | miner fee | 258 |
| position transfer | 25 | hidden order fee | 204 | staking payment | 262 |
| position swap | 26 | otc trade fee | 207 | adjustment | 401 |
| position funding cost or interest charged | 27 | swap fee | 222 | expense | 501 |
| margin / swap / interest payment | 28 | claiming fee | 224 | currency conversion / computation fee | 905 |
| derivatives funding event | 29 | used margin funding charge | 226 | monthly profit payment | 907 |
| settlement | 31 | unused margin funding fee | 228 | losses | 911 |
| transfer | 51 | earned fee / affiliate rebate | 241 |  |  |
| deposit | 101 | ETHFX loyalty fee | 243 |  |  |
| withdrawal | 104 | deposit fee | 251 |  |  |

**Ratelimit**: 90 req/min

Path Params

Currency

string

required

Currency (BTC, ...) For an up-to-date listing of supported currencies see: [https://api.bitfinex.com/v2/conf/pub:map:currency:label](https://api.bitfinex.com/v2/conf/pub:map:currency:label) (Can be omitted to retrieve Ledgers for all currencies)

Body Params

category

int32

Allows you to filter the ledger response using an int value. For a list of possible values, see the table below.

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Number of records (Max 2500)

wallet

string

Wallet name e.g. exchange, margin, funding

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/ledgers/Currency/hist \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'

---
Section: Orders
Source: https://docs.bitfinex.com/reference/rest-auth-ledgers
Path: /v2/auth/r/ledgers/Currency/hist
Method: POST
