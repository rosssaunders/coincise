# GET /unknown

**Source:**
[Withdraw to crypto address](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawcrypto)

## Authentication

Required (Private Endpoint)

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires the “transfer” permission. API key must belong to default profile.

## 

[​

](#travel-rule)

Travel Rule

The Travel Rule requires financial institutions, including custodial cryptocurrency exchanges, to share basic information about their customers when sending funds over a certain amount. VASPs that are part of the TRUST consortium use the [TRUST solution](https://www.coinbase.com/travelrule) when sharing PII to satisfy the Travel Rule data requirements. For more details and examples, see [Travel Rule for Withdrawals](/exchange/travel-rule/withdrawals).

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

#### Body

application/json

[​

](#body-amount)

amount

string

required

[​

](#body-currency)

currency

string

required

[​

](#body-crypto-address)

crypto\_address

string

required

[​

](#body-profile-id)

profile\_id

string

[​

](#body-destination-tag)

destination\_tag

string

[​

](#body-no-destination-tag)

no\_destination\_tag

boolean

[​

](#body-nonce)

nonce

integer

[​

](#body-network)

network

string

[​

](#body-add-network-fee-to-total)

add\_network\_fee\_to\_total

boolean

A boolean flag to add the network fee on top of the amount. If this is blank, it will default to deducting the network fee from the amount.

[​

](#body-is-intermediary)

is\_intermediary

boolean

default:false

A boolean flag to create a transfer using Coinbase as an intermediary VASP. If `true`, `intermediary_jurisdiction` must be provided. `travel_rule_data` may be necessary if the jurisdiction requires data.

[​

](#body-travel-rule-data)

travel\_rule\_data

object

Show child attributes

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| amount | string | required | ​amountstringrequired |
| currency | string | required | ​currencystringrequired |
| crypto\_address | string | required | ​crypto\_addressstringrequired |
| profile\_id | string | optional |  |
| destination\_tag | string | optional | ​destination\_tagstring |
| no\_destination\_tag | boolean | optional | ​no\_destination\_tagboolean |
| nonce | integer | optional |  |
| network | string | optional |  |
| add\_network\_fee\_to\_total | boolean | optional | ​add\_network\_fee\_to\_totalboolean |
| is\_intermediary | boolean | optional | ​is\_intermediarybooleandefault:false |
| travel\_rule\_data | object | optional | ​travel\_rule\_dataobject |

200

application/json

[​

](#response-id)

id

string

[​

](#response-amount)

amount

string

[​

](#response-currency)

currency

string

[​

](#response-payout-at)

payout\_at

string

[​

](#response-fee)

fee

string

[​

](#response-subtotal)

subtotal

string
