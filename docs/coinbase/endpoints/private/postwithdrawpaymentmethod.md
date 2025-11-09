# GET /unknown

**Source:**
[Withdraw to payment method](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawpaymentmethod)

## Authentication

Required (Private Endpoint)

**Withdraw funds to a payment method**See the [Payment Methods](/api-reference/exchange-api/rest-api/transfers/get-all-payment-methods) section for retrieving your payment methods.

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires the “transfer” permission. API key is restricted to the default profile.

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

](#body-payment-method-id)

payment\_method\_id

string

required

[​

](#body-currency)

currency

string

required

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| amount | string | required | ​amountstringrequired |
| payment\_method\_id | string | required | ​payment\_method\_idstringrequired |
| currency | string | required | ​currencystringrequired |

200

application/json

A successful response.

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
