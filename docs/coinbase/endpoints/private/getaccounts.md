# GET /unknown

**Source:**
[Get all accounts for a profile](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts)

## Authentication

Required (Private Endpoint)

**Info**Your trading accounts are separate from your Coinbase accounts. See [Deposit from Coinbase account](/api-reference/exchange-api/rest-api/transfers/deposit-from-coinbase-account) for documentation on how to deposit funds to begin trading.

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires either the “view” or “trade” permission.

## 

[​

](#rate-limits)

Rate Limits

This endpoint has a custom rate limit by profile ID: 25 requests per second, up to 50 requests per second in bursts

## 

[​

](#funds-on-hold)

Funds on Hold

When you place an order, the funds for the order are placed on hold. They cannot be used for other orders or withdrawn. Funds will remain on hold until the order is filled or canceled.

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
