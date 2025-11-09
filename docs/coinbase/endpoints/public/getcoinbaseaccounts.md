# GET /unknown

**Source:**
[Get all Coinbase wallets](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getcoinbaseaccounts)

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

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| name | string | required |  |
| balance | string | required | ​balancestringrequired |
| currency | string | required | ​currencystringrequired |
| type | string | required | ​typeenum<string>default:walletrequired |
| primary | boolean | required | ​primarybooleanrequired |
| active | boolean | required | ​activebooleanrequired |
| hold\_balance | string | required | ​hold\_balancestringrequired |
| hold\_currency | string | required | ​hold\_currencystringrequired |
| destination\_tag\_name | string | optional | ​destination\_tag\_namestring |
| destination\_tag\_regex | string | optional | ​destination\_tag\_regexstring |

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

](#response-balance)

balance

string

required

[​

](#response-currency)

currency

string

required

[​

](#response-type)

type

enum<string>

default:wallet

required

Available options:

`wallet`,

`fiat`

[​

](#response-primary)

primary

boolean

required

[​

](#response-active)

active

boolean

required

[​

](#response-hold-balance)

hold\_balance

string

required

[​

](#response-hold-currency)

hold\_currency

string

required

[​

](#response-destination-tag-name)

destination\_tag\_name

string

[​

](#response-destination-tag-regex)

destination\_tag\_regex

string
