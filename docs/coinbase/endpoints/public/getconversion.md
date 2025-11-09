# GET /unknown

**Source:**
[Get a conversion](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getconversion)

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

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| conversion\_id | string | required | ​conversion\_idstringrequired |

[​

](#parameter-conversion-id)

conversion\_id

string

required

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| profile\_id | string | optional |  |

[​

](#parameter-profile-id)

profile\_id

string

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| amount | string | required | ​amountstringrequired |
| from\_account\_id | string | required | ​from\_account\_idstringrequired |
| to\_account\_id | string | required | ​to\_account\_idstringrequired |
| from | string | required |  |
| to | string | required |  |
| fee\_amount | string | required | ​fee\_amountstringrequired |
| created\_at | string | optional |  |

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-amount)

amount

string

required

[​

](#response-from-account-id)

from\_account\_id

string

required

[​

](#response-to-account-id)

to\_account\_id

string

required

[​

](#response-from)

from

string

required

[​

](#response-to)

to

string

required

[​

](#response-fee-amount)

fee\_amount

string

required

[​

](#response-created-at)

created\_at

string
