# GET /unknown

**Source:**
[Get a single account's transfers](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounttransfers)

## Authentication

Not Required (Public Endpoint)

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

Returns list of transfers from this account id.

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| before | string | optional | Used for pagination. Sets start cursor to before date. |
| after | string | optional | Used for pagination. Sets end cursor to after date. |
| limit | integer | optional | ​limitintegerdefault:100 |
| type | string | optional |  |

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

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| type | string | required | ​typeenum<string>default:depositrequired |
| created\_at | string | required | ​created\_atstring<date-time>required |
| completed\_at | string | required | ​completed\_atstring<date-time>required |
| canceled\_at | string | required | ​canceled\_atstring<date-time>required |
| processed\_at | string | required | ​processed\_atstring<date-time>required |
| amount | string | required | ​amountstringrequired |
| details | object | required | ​detailsobjectrequired |
| user\_nonce | string | required | ​user\_noncestring<int64>required |
| currency | string | required | ​currencystringrequired |

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
