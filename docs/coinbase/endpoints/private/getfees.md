# GET /unknown

**Source:**
[Get fees](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getfees)

## Authentication

Required (Private Endpoint)

This request returns your current maker & taker fee rates, as well as your 30-day trailing volume. Quoted rates are subject to change.

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires the “view” permission.

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
| taker\_fee\_rate | string | required | ​taker\_fee\_ratestringrequired |
| maker\_fee\_rate | string | required | ​maker\_fee\_ratestringrequired |
| usd\_volume | string | optional | The 30 days trailing volume in USD.Example:"43806.92" |

200

application/json

Fees defines taker and maker fees for a given user including the volume in USD.

[​

](#response-taker-fee-rate)

taker\_fee\_rate

string

required

Taker fee rate.

Example:

`"0.0050"`

[​

](#response-maker-fee-rate)

maker\_fee\_rate

string

required

Maker fee rate.

Example:

`"0.0050"`

[​

](#response-usd-volume)

usd\_volume

string

The 30 days trailing volume in USD.

Example:

`"43806.92"`
