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

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| cb-access-key | string | required | ​cb-access-keystringheaderrequired |
| cb-access-passphrase | string | required | ​cb-access-passphrasestringheaderrequired |
| cb-access-sign | string | required | ​cb-access-signstringheaderrequired |
| cb-access-timestamp | string | required | ​cb-access-timestampstringheaderrequired |

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

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| account\_id | string | required | ​account\_idstringrequired |

[​

](#parameter-account-id)

account\_id

string

required

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| before | string | optional | Used for pagination. Sets start cursor to before date. |
| after | string | optional | Used for pagination. Sets end cursor to after date. |
| limit | integer | optional | ​limitintegerdefault:100 |

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

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| created\_at | string | required | ​created\_atstring<date-time>required |
| updated\_at | string | required | ​updated\_atstring<date-time>required |
| type | string | required | ​typeenum<string>default:orderrequired |
| ref | string | required |  |

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
