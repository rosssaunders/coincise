# GET /unknown

**Source:**
[Get product trades](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducttrades)

## Authentication

Not Required (Public Endpoint)

## 

[​

](#side)

Side

The `side` of a trade indicates the maker order side. The maker order is the order that was open on the order book. A `buy` side indicates a down-tick because the maker was a buy order and their order was removed. A `sell` side indicates an up-tick.

## 

[​

](#pagination)

Pagination

This request is paginated. See [Pagination](/exchange/rest-api/pagination) for more information.

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| product\_id | string | required | ​product\_idstringrequired |

[​

](#parameter-product-id)

product\_id

string

required

list trades for specific product.

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| limit | integer | optional | ​limitintegerdefault:1000 |
| before | string | optional | Used for pagination. Sets start cursor to before id. |
| after | string | optional | Used for pagination. Sets end cursor to after id. |

[​

](#parameter-limit)

limit

integer

default:1000

Limit on number of results to return.

[​

](#parameter-before)

before

string

Used for pagination. Sets start cursor to `before` id.

[​

](#parameter-after)

after

string

Used for pagination. Sets end cursor to `after` id.

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| trade\_id | integer | required | ​trade\_idintegerrequired |
| side | string | required | ​sideenum<string>default:buyrequired |
| size | string | required |  |
| price | string | required |  |
| time | string | required | ​timestring<date-time>required |

200

application/json

[​

](#response-trade-id)

trade\_id

integer

required

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

](#response-size)

size

string

required

[​

](#response-price)

price

string

required

[​

](#response-time)

time

string<date-time>

required
