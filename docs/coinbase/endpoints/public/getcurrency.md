# GET /unknown

**Source:**
[Get all known currencies](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcurrency)

## Authentication

Not Required (Public Endpoint)

**Info**Not all currencies may be currently in use for trading.

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
| id | string | optional |  |
| name | string | optional |  |
| status | string | optional |  |
| contract\_address | string | optional | ​contract\_addressstring |
| crypto\_address\_link | string | optional | ​crypto\_address\_linkstring |
| crypto\_transaction\_link | string | optional | ​crypto\_transaction\_linkstring |
| min\_withdrawal\_amount | number | optional | ​min\_withdrawal\_amountnumber |
| max\_withdrawal\_amount | number | optional | ​max\_withdrawal\_amountnumber |
| network\_confirmations | integer | optional | ​network\_confirmationsinteger |
| processing\_time\_seconds | integer | optional | ​processing\_time\_secondsinteger |
| destination\_tag\_regex | string | optional | ​destination\_tag\_regexstring |
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

](#response-supported-networks-id)

id

string

[​

](#response-supported-networks-name)

name

string

[​

](#response-supported-networks-status)

status

string

[​

](#response-supported-networks-contract-address)

contract\_address

string

[​

](#response-supported-networks-crypto-address-link)

crypto\_address\_link

string

[​

](#response-supported-networks-crypto-transaction-link)

crypto\_transaction\_link

string

[​

](#response-supported-networks-min-withdrawal-amount)

min\_withdrawal\_amount

number

[​

](#response-supported-networks-max-withdrawal-amount)

max\_withdrawal\_amount

number

[​

](#response-supported-networks-network-confirmations)

network\_confirmations

integer

[​

](#response-supported-networks-processing-time-seconds)

processing\_time\_seconds

integer

[​

](#response-supported-networks-destination-tag-regex)

destination\_tag\_regex

string

[​

](#response-display-name)

display\_name

string
