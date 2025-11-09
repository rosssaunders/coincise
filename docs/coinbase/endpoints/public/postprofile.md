# GET /unknown

**Source:**
[Create a profile](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postprofile)

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

#### Body

application/json

[​

](#body-name)

name

string

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | optional |  |

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-user-id)

user\_id

string

required

[​

](#response-name)

name

string

required

[​

](#response-active)

active

boolean

required

[​

](#response-is-default)

is\_default

boolean

required

[​

](#response-created-at)

created\_at

string<date-time>

required
