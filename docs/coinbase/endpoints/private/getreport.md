# GET /unknown

**Source:**
[Get a report](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getreport)

## Authentication

Required (Private Endpoint)

Once a report request has been accepted for processing, you can poll the report resource endpoint at `/reports/{report_id}` for its status. When status is `ready`, the final report is uploaded and available at `{file_url}`.

## 

[​

](#api-key-permissions)

API Key Permissions

This endpoint requires either the “view” or “trade” permission.

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
| report\_id | string | required | ​report\_idstringrequired |

[​

](#parameter-report-id)

report\_id

string

required

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| type | string | required |  |
| created\_at | string | required | ​created\_atstring<date-time>required |
| completed\_at | string | required | ​completed\_atstring<date-time>required |
| expires\_at | string | required | ​expires\_atstring<date-time>required |
| status | string | required | ​statusenum<string>default:pendingrequired |
| user\_id | string | required | ​user\_idstringrequired |
| file\_url | string | required | ​file\_urlstringrequired |
| params | object | required | ​paramsobjectrequired |
| file\_count | string | optional | ​file\_countstring<uint64> |

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-type)

type

string

required

[​

](#response-created-at)

created\_at

string<date-time>

required

[​

](#response-completed-at)

completed\_at

string<date-time>

required

[​

](#response-expires-at)

expires\_at

string<date-time>

required

[​

](#response-status)

status

enum<string>

default:pending

required

Available options:

`pending`,

`creating`,

`ready`,

`failed`

[​

](#response-user-id)

user\_id

string

required

[​

](#response-file-url)

file\_url

string

required

[​

](#response-params)

params

object

required

Show child attributes

Example:

```
{  "start_date": "2019-06-25T22:13:48.592Z",  "end_date": "2019-07-25T22:13:48.592Z",  "format": "pdf",  "product_id": "ALL",  "account_id": "ALL",  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",  "email": "user1@example.com",  "user": {    "created_at": "2019-06-04T21:22:32.226Z",    "active_at": "2019-06-04T21:27:49.250Z",    "id": "5cf6e115aaf44503db300f1e",    "name": "User One",    "email": "user1@example.com",    "is_banned": false,    "user_type": "individual",    "fulfills_new_requirements": true,    "oauth_client": "pro",    "preferences": {      "preferred_market": "BTC-USD",      "margin_terms_completed_in_utc": "2019-06-13T23:40:17.752Z",      "margin_tutorial_completed_in_utc": "2019-06-19T23:56:59.411Z"    },    "has_default": false  },  "new_york_state": false}
```

[​

](#response-file-count)

file\_count

string<uint64>
