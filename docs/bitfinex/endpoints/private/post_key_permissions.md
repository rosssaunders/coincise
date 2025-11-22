# POST /v2/auth/r/permissions

**Source:** [https://docs.bitfinex.com/reference/key-permissions](https://docs.bitfinex.com/reference/key-permissions)

post

https://api.bitfinex.com/v2/auth/r/permissions

Retrieve current api key/token permissions

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | KEY\_PERMISSION\_ARRAY | [Key permission array](#key-permission-arrays-index-0n) | Each index contains one of the current key's permissions |

Key permission arrays (index [0...n]

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| [0] | SCOPE | string | Api scope, ('account', 'history', 'orders', 'positions', 'funding', 'settings', 'wallets', 'withdraw', 'ui\_withdraw', 'bfxpay') |
| [1] | READ | int | Read permission (0 - false, 1 - true) |
| [2] | WRITE | int | Write permission (0 - false, 1 - true) |

**Ratelimit**: 90 req/min

Body Params

RAW\_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/permissions \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
