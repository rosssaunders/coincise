# Schedule cancel (dead man's switch)

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

####

[](#headers-3)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body-3)

Request Body

Name

Type

Description

action\*

Object

{

"type": "scheduleCancel",

"time": number (optional)

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

vaultAddress

String

If trading on behalf of a vault or subaccount, its address in 42-character
hexadecimal format; e.g. 0x0000000000000000000000000000000000000000

expiresAfter

Number

Timestamp in milliseconds

Schedule a cancel-all operation at a future time. Not including time will remove
the scheduled cancel operation. The time must be at least 5 seconds after the
current time. Once the time comes, all open orders will be canceled and a
trigger count will be incremented. The max number of triggers per day is 10.
This trigger count is reset at 00:00 UTC.
