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

| Parameter            | Type   | Required | Description                               |
| -------------------- | ------ | -------- | ----------------------------------------- |
| cb-access-key        | string | required | ​cb-access-keystringheaderrequired        |
| cb-access-passphrase | string | required | ​cb-access-passphrasestringheaderrequired |
| cb-access-sign       | string | required | ​cb-access-signstringheaderrequired       |
| cb-access-timestamp  | string | required | ​cb-access-timestampstringheaderrequired  |

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

| Parameter  | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| account_id | string | required | ​account_idstringrequired |

[​

](#parameter-account-id)

account_id

string

required

#### Response

| Parameter       | Type    | Required | Description                     |
| --------------- | ------- | -------- | ------------------------------- |
| id              | string  | required |                                 |
| currency        | string  | required | ​currencystringrequired         |
| balance         | string  | required | ​balancestringrequired          |
| hold            | string  | required |                                 |
| available       | string  | required | ​availablestringrequired        |
| profile_id      | string  | required | ​profile_idstringrequired       |
| trading_enabled | boolean | required | ​trading_enabledbooleanrequired |
| pending_deposit | string  | optional | ​pending_depositstring          |
| display_name    | string  | optional |                                 |

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

profile_id

string

required

[​

](#response-trading-enabled)

trading_enabled

boolean

required

[​

](#response-pending-deposit)

pending_deposit

string

Amount in pending deposits transfers.

[​

](#response-display-name)

display_name

string
