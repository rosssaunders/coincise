# GET /unknown

**Source:**
[Get single order](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getorder)

## Authentication

Required (Private Endpoint)

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires either the “view” or “trade” permission. Orders can be queried using either the exchange assigned `id` or the client assigned `client_oid`. When using `client_oid` it must be preceded by the `client:` namespace. If the order is canceled, and if the order had no matches, the response might return the status code `404`.

Open orders can change state between the request and the response depending on market conditions.

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
| order\_id | string | required | ​order\_idstringrequired |

[​

](#parameter-order-id)

order\_id

string

required

`order_id` is either the exchange assigned id or the client assigned client\_oid. When using client\_oid it must be preceded by the client: namespace.

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| market\_type | string | optional | ​market\_typestringdefault:spot |

[​

](#parameter-market-type)

market\_type

string

default:spot

Market type which the order was traded in.

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| product\_id | string | required | ​product\_idstringrequired |
| side | string | required | ​sideenum<string>default:buyrequired |
| type | string | required | ​typeenum<string>default:limitrequired |
| post\_only | boolean | required | ​post\_onlybooleanrequired |
| created\_at | string | required | ​created\_atstring<date-time>required |
| fill\_fees | string | required | ​fill\_feesstringrequired |
| filled\_size | string | required | ​filled\_sizestringrequired |
| status | string | required | ​statusenum<string>default:openrequired |
| settled | boolean | required | ​settledbooleanrequired |
| price | string | optional | price per unit of base currency |
| size | string | optional | amount of base currency to buy/sell |
| profile\_id | string | optional | profile\_id that placed the order |
| funds | string | optional | amount of quote currency to spend (for market orders) |
| specified\_funds | string | optional | ​specified\_fundsstring |
| time\_in\_force | string | optional | ​time\_in\_forceenum<string>default:GTC |
| expire\_time | string | optional | ​expire\_timestring<date-time> |
| done\_at | string | optional | ​done\_atstring<date-time> |
| done\_reason | string | optional | reason order was done (filled, rejected, or otherwise) |
| reject\_reason | string | optional | reason order was rejected by engine |
| executed\_value | string | optional | ​executed\_valuestring |
| stop | string | optional | ​stopenum<string>default:loss |
| stop\_price | string | optional | price (in quote currency) at which to execute the order |
| funding\_amount | string | optional | ​funding\_amountstring |
| client\_oid | string | optional |  |
| market\_type | string | optional | market type where order was traded |
| max\_floor | string | optional | maximum visible quantity for iceberg order |
| secondary\_order\_id | string | optional | ​secondary\_order\_idstring |
| stop\_limit\_price | string | optional | ​stop\_limit\_pricestring |

200

application/json

[​

](#response-id)

id

string

required

uuid

[​

](#response-product-id)

product\_id

string

required

book the order was placed on

[​

](#response-side)

side

enum<string>

default:buy

required

Available options:

`buy`,

`sell`

[​

](#response-type)

type

enum<string>

default:limit

required

Available options:

`limit`,

`market`,

`stop`

[​

](#response-post-only)

post\_only

boolean

required

if true, forces order to be `maker` only

[​

](#response-created-at)

created\_at

string<date-time>

required

timestamp at which order was placed

[​

](#response-fill-fees)

fill\_fees

string

required

fees paid on current filled amount

[​

](#response-filled-size)

filled\_size

string

required

amount (in base currency) of the order that has been filled

[​

](#response-status)

status

enum<string>

default:open

required

Available options:

`open`,

`pending`,

`rejected`,

`done`,

`active`,

`received`,

`all`

[​

](#response-settled)

settled

boolean

required

true if funds have been exchanged and settled

[​

](#response-price)

price

string

price per unit of base currency

[​

](#response-size)

size

string

amount of base currency to buy/sell

[​

](#response-profile-id)

profile\_id

string

profile\_id that placed the order

[​

](#response-funds)

funds

string

amount of quote currency to spend (for market orders)

[​

](#response-specified-funds)

specified\_funds

string

funds with fees

[​

](#response-time-in-force)

time\_in\_force

enum<string>

default:GTC

Available options:

`GTC`,

`GTT`,

`IOC`,

`FOK`

[​

](#response-expire-time)

expire\_time

string<date-time>

timestamp at which order expires

[​

](#response-done-at)

done\_at

string<date-time>

timestamp at which order was done

[​

](#response-done-reason)

done\_reason

string

reason order was done (filled, rejected, or otherwise)

[​

](#response-reject-reason)

reject\_reason

string

reason order was rejected by engine

[​

](#response-executed-value)

executed\_value

string

[​

](#response-stop)

stop

enum<string>

default:loss

Available options:

`loss`,

`entry`

[​

](#response-stop-price)

stop\_price

string

price (in quote currency) at which to execute the order

[​

](#response-funding-amount)

funding\_amount

string

[​

](#response-client-oid)

client\_oid

string

client order id

[​

](#response-market-type)

market\_type

string

market type where order was traded

[​

](#response-max-floor)

max\_floor

string

maximum visible quantity for iceberg order

[​

](#response-secondary-order-id)

secondary\_order\_id

string

order id for the visible order for iceberg order

[​

](#response-stop-limit-price)

stop\_limit\_price

string

stop limit price for TPSL order
