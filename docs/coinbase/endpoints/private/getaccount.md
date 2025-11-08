# GET /unknown

**Source:**
[Get a single account by id](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccount)

## Authentication

Required (Private Endpoint)

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires either the “view” or “trade” permission.

#### Authorizations

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

[​

](#parameter-account-id)

account\_id

string

required

#### Response

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-currency)

currency

string

required

[​

](#response-balance)

balance

string

required

[​

](#response-hold)

hold

string

required

[​

](#response-available)

available

string

required

[​

](#response-profile-id)

profile\_id

string

required

[​

](#response-trading-enabled)

trading\_enabled

boolean

required

[​

](#response-pending-deposit)

pending\_deposit

string

Amount in pending deposits transfers.

[​

](#response-display-name)

display\_name

string
