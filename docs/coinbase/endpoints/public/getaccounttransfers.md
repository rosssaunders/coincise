# GET /unknown

**Source:**
[Get a single account's transfers](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounttransfers)

## Authentication

Not Required (Public Endpoint)

#### Authorizations

[​

](#authorization-cb-access-key)

cb-access-key

string

header

required

[​

](#authorization-cb-access-passphrase)

cb-access-passphrase

string

header

required

[​

](#authorization-cb-access-sign)

cb-access-sign

string

header

required

[​

](#authorization-cb-access-timestamp)

cb-access-timestamp

string

header

required

#### Path Parameters

[​

](#parameter-account-id)

account\_id

string

required

Returns list of transfers from this account id.

#### Query Parameters

[​

](#parameter-before)

before

string

Used for pagination. Sets start cursor to `before` date.

[​

](#parameter-after)

after

string

Used for pagination. Sets end cursor to `after` date.

[​

](#parameter-limit)

limit

integer

default:100

Limit on number of results to return.

[​

](#parameter-type)

type

string

#### Response

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-type)

type

enum<string>

default:deposit

required

Available options:

`deposit`,

`withdraw`,

`internal_deposit`,

`internal_withdraw`

[​

](#response-created-at)

created\_at

string<date-time>

required

[​

](#response-completed-at)

completed\_at

string<date-time>

required

[​

](#response-canceled-at)

canceled\_at

string<date-time>

required

[​

](#response-processed-at)

processed\_at

string<date-time>

required

[​

](#response-amount)

amount

string

required

[​

](#response-details)

details

object

required

Show child attributes

[​

](#response-user-nonce)

user\_nonce

string<int64>

required

[​

](#response-currency)

currency

string

required
