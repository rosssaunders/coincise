# POST /v2/auth/r/settings

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-settings](https://docs.bitfinex.com/reference/rest-auth-settings)

post

https://api.bitfinex.com/v2/auth/r/settings

Allows you to read custom settings by providing a key. You can set or adjust
these settings using the [User Settings Write](/reference#user-settings-set)
endpoint.

**Body Fields**

| Term | Type  | Description                                                                 |
| ---- | ----- | --------------------------------------------------------------------------- |
| Keys | Array | Array of keys requested. Must follow regex pattern `/^api:[A-Za-z0-9_-]*$/` |

**Returned Fields**

| Term  | Type         | Description      |
| ----- | ------------ | ---------------- |
| KEY   | String       | Requested Key    |
| VALUE | Self defined | Returned setting |

**Ratelimit**: 90 req/min

keys

array of strings

required

The keys for which you wish to retrieve the values.

keys\*

Request
