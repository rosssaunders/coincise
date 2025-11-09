# GET /unknown

**Source:**
[Get a currency](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrencies)

## Authentication

Not Required (Public Endpoint)

## 

[​

](#currency-codes)

Currency Codes

Currency codes conform to the ISO 4217 standard where possible. Currencies that have no representation in ISO 4217 can use a custom code.

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| currency\_id | string | required | ​currency\_idstringrequired |

[​

](#parameter-currency-id)

currency\_id

string

required

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| name | string | required |  |
| min\_size | string | required | ​min\_sizestringrequired |
| status | string | required | ​statusstringrequired |
| max\_precision | string | required | ​max\_precisionstringrequired |
| details | object | required | ​detailsobjectrequired |
| details.type | string | optional | ​details.typeenum<string>default:crypto |
| details.symbol | string | optional | ​details.symbolstring |
| details.network\_confirmations | integer | optional | ​details.network\_confirmationsinteger |
| details.sort\_order | integer | optional | ​details.sort\_orderinteger |
| details.crypto\_address\_link | string | optional | ​details.crypto\_address\_linkstring |
| details.crypto\_transaction\_link | string | optional | ​details.crypto\_transaction\_linkstring |
| details.push\_payment\_methods | string | optional | ​details.push\_payment\_methodsstring\[\] |
| details.group\_types | string | optional | ​details.group\_typesstring\[\] |
| details.display\_name | string | optional | ​details.display\_namestring |
| details.processing\_time\_seconds | number | optional | ​details.processing\_time\_secondsnumber |
| details.min\_withdrawal\_amount | number | optional | ​details.min\_withdrawal\_amountnumber |
| details.max\_withdrawal\_amount | number | optional | ​details.max\_withdrawal\_amountnumber |
| message | string | optional |  |
| convertible\_to | string | optional | ​convertible\_tostring\[\] |
| default\_network | string | optional | ​default\_networkstring |
| supported\_networks | object | optional | ​supported\_networksobject\[\] |
| display\_name | string | optional |  |

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-name)

name

string

required

[​

](#response-min-size)

min\_size

string

required

[​

](#response-status)

status

string

required

[​

](#response-max-precision)

max\_precision

string

required

[​

](#response-details)

details

object

required

Show child attributes

[​

](#response-details-type)

details.type

enum<string>

default:crypto

Available options:

`crypto`,

`fiat`

[​

](#response-details-symbol)

details.symbol

string

[​

](#response-details-network-confirmations)

details.network\_confirmations

integer

[​

](#response-details-sort-order)

details.sort\_order

integer

[​

](#response-details-crypto-address-link)

details.crypto\_address\_link

string

[​

](#response-details-crypto-transaction-link)

details.crypto\_transaction\_link

string

[​

](#response-details-push-payment-methods)

details.push\_payment\_methods

string\[\]

[​

](#response-details-group-types)

details.group\_types

string\[\]

[​

](#response-details-display-name)

details.display\_name

string

[​

](#response-details-processing-time-seconds)

details.processing\_time\_seconds

number

[​

](#response-details-min-withdrawal-amount)

details.min\_withdrawal\_amount

number

[​

](#response-details-max-withdrawal-amount)

details.max\_withdrawal\_amount

number

[​

](#response-message)

message

string

[​

](#response-convertible-to)

convertible\_to

string\[\]

[​

](#response-default-network)

default\_network

string

[​

](#response-supported-networks)

supported\_networks

object\[\]

Show child attributes

[​

](#response-display-name)

display\_name

string
