# GET /unknown

**Source:**
[Withdraw to Coinbase account](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postwithdrawcoinbaseaccount)

## Authentication

Required (Private Endpoint)

**Withdraw funds to a Coinbase account**You can move funds between your Coinbase accounts and your Coinbase Exchange trading accounts within your daily limits. Moving funds between Coinbase and Coinbase Exchange is instant and free. See the [Coinbase Accounts](/api-reference/exchange-api/rest-api/accounts/get-all-account-profile) section for retrieving your Coinbase accounts.

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires the “transfer” permission.

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

](#body-coinbase-account-id)

coinbase\_account\_id

string

required

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

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| coinbase\_account\_id | string | required | ​coinbase\_account\_idstringrequired |
| amount | string | required | ​amountstringrequired |
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
