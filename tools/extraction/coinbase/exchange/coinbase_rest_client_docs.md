

# REFERENCE/EXCHANGERESTAPI_GETACCOUNTS

# Get accounts for profile

GET

https://api.exchange.coinbase.com/accounts

Get a list of trading accounts from the profile of the API key.



Info

Your trading accounts are separate from your Coinbase accounts. See [Deposit from Coinbase account](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postdepositcoinbaseaccount) for documentation on how to deposit funds to begin trading.

## API Key Permissions [](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts\#api-key-permissions "Direct link to API Key Permissions")

This endpoint requires either the "view" or "trade" permission.

## Rate Limits [](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts\#rate-limits "Direct link to Rate Limits")

This endpoint has a custom rate limit by profile ID: 25 requests per second, up to 50 requests per second in bursts

## Funds on Hold [](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts\#funds-on-hold "Direct link to Funds on Hold")

When you place an order, the funds for the order are placed on hold. They cannot be used for other orders or withdrawn. Funds will remain on hold until the order is filled or canceled.

### Authentication

cb-access-key

string

required

cb-access-passphrase

string

required

cb-access-sign

string

required

cb-access-timestamp

string

required

### Responses

`` 200

`` 401

Unauthorized.

`` 500

An unexpected error response.