# GET /unknown

**Source:**
[Get address book](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaddressbook)

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
| address | string | required | ​addressstringrequired |
| currency | string | required | ​currencystringrequired |
| label | string | required |  |
| address\_book\_added\_at | string | required | ​address\_book\_added\_atstring<date-time>required |
| destination\_tag | string | optional | ​destination\_tagstring |
| is\_verified\_self\_hosted\_wallet | boolean | optional | ​is\_verified\_self\_hosted\_walletboolean |
| vasp\_id | string | optional | The VASP identifier if the address is owned by one of the supported Virtual Asset Service Providers |
| business\_name | string | optional | Business name of the originator's account - only populated for travel rules regions |
| business\_country\_code | string | optional | ​business\_country\_codestring |
| network | string | optional | Blockchain network of the address. If null or not provided, the address is available on all supported networks compatible with the asset (e.g., both ethereum and arbitrum for an ERC-20 token). |

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-address)

address

string

required

[​

](#response-currency)

currency

string

required

Asset symbol for the saved address (e.g., `BTC`, `ETH`, `USDC`). `_ALL_ASSETS_` indicates that this address is stored globally for all assets, rather than a specific one. The `network` field determines which blockchain network the address applies to.

[​

](#response-label)

label

string

required

[​

](#response-address-book-added-at)

address\_book\_added\_at

string<date-time>

required

[​

](#response-destination-tag)

destination\_tag

string

[​

](#response-is-verified-self-hosted-wallet)

is\_verified\_self\_hosted\_wallet

boolean

Flag to indicate if the crypto addresses has previously been digitally signed and verified when added in the Address Book UI tab

[​

](#response-vasp-id)

vasp\_id

string

The VASP identifier if the address is owned by one of the supported Virtual Asset Service Providers

[​

](#response-business-name)

business\_name

string

Business name of the originator's account - only populated for travel rules regions

[​

](#response-business-country-code)

business\_country\_code

string

The country code (ISO 3166-1 alpha-2) of the originator's account location - only populated for travel rules regions

[​

](#response-network)

network

string

Blockchain network of the address. If `null` or not provided, the address is available on all supported networks compatible with the asset (e.g., both `ethereum` and `arbitrum` for an ERC-20 token).
