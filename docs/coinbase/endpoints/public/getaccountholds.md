# GET /unknown

**Source:**
[Get a single account's holds](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccountholds)

## Authentication

Not Required (Public Endpoint)

## 

[​

](#pagination)

Pagination

This request is paginated. See [Pagination](/exchange/rest-api/pagination) for more information.

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

#### Response

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-created-at)

created\_at

string<date-time>

required

[​

](#response-updated-at)

updated\_at

string<date-time>

required

[​

](#response-type)

type

enum<string>

default:order

required

Available options:

`order`,

`transfer`,

`funding`,

`profile_transfer`,

`otc_order`,

`launch_sell`,

`launch_buy`,

`engine_credit_operation`

[​

](#response-ref)

ref

string

required
