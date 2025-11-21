# User Settings Delete

post

https://api.bitfinex.com/v2/auth/w/settings/del

Allows you to delete custom settings.

**Body Fields**

| Term     | Type  | Description                                                                     |
| -------- | ----- | ------------------------------------------------------------------------------- |
| Settings | Array | Array of keys to be deleted. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Response Fields**

| Term      | Type   | Description                                                                      |
| --------- | ------ | -------------------------------------------------------------------------------- |
| TIMESTAMP | int    | Timestamp in milliseconds                                                        |
| TYPE      | string | Purpose of notification ('acc_sd' (account settings del))                        |
| STATUS    | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |

**Ratelimit**: 90 req/min

Responses

Request

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/settings/del \\

     \--header 'accept: application/json'

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-settings-del Path:
/v2/auth/w/settings/del Method: POST
