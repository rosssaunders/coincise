# POST /v2/auth/w/settings/set

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-settings-set](https://docs.bitfinex.com/reference/rest-auth-settings-set)

post

https://api.bitfinex.com/v2/auth/w/settings/set

Allows you to create custom settings by creating key: value pairs.

**Body Fields**

| Term     | Type   | Description                                                                             |
| -------- | ------ | --------------------------------------------------------------------------------------- |
| Settings | Object | Object of keys and values to be set. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Response Fields**

| Term               | Type   | Description                                                                      |
| ------------------ | ------ | -------------------------------------------------------------------------------- |
| TIMESTAMP          | int    | Timestamp in milliseconds                                                        |
| TYPE               | string | Purpose of notification ('acc_ss' (account settings set))                        |
| NUMBER_OF_SETTINGS | string | Number of settings changed or created with this request                          |
| STATUS             | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |

**Ratelimit**: 90 req/min

Body Params

RAW_BODY

json

Defaults to {}

{}

Responses

Request

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/settings/set \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
